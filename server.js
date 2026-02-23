
import express from 'express';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import cors from 'cors'; // For dashboard integration

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const DSYM_DIR = path.resolve('src/dSYM_files');

app.post('/symbolicate', (req, res) => {
    const { sdkVersion, addresses, loadAddress, uuid: expectedUUID } = req.body;

    if (!sdkVersion || !addresses || !Array.isArray(addresses)) {
        return res.status(400).json({ error: 'Missing sdkVersion or addresses array' });
    }

    // Construct dSYM path
    const dsymName = `Nudgecore_iOS_${sdkVersion}.framework.dSYM`;
    // Standard structure: dSYM/Contents/Resources/DWARF/Nudgecore_iOS
    const binaryPath = path.join(DSYM_DIR, dsymName, 'Contents', 'Resources', 'DWARF', 'Nudgecore_iOS');

    if (!fs.existsSync(binaryPath)) {
        return res.status(404).json({ error: `dSYM not found for version ${sdkVersion}`, searchedPath: binaryPath });
    }

    // Validate UUID if provided
    if (expectedUUID) {
        // Run dwarfdump to get local UUID
        const checkCmd = `dwarfdump --uuid "${binaryPath}"`;
        exec(checkCmd, (err, stdout) => {
            if (err) {
                console.error("dwarfdump error:", err);
                // Proceed with warning? Or fail? Let's fail safely or just warn meant to be strict
                // For now, let's just log and continue if dwarfdump fails, but if it succeeds we check.
            }

            // Output format: "UUID: <UUID> (arm64) <path>"
            // We need to parse strict UUID
            const match = stdout.match(/UUID: ([0-9A-F-]+) \(/i);
            if (match && match[1]) {
                const localUUID = match[1].replace(/-/g, '').toLowerCase();
                const remoteUUID = expectedUUID.replace(/-/g, '').toLowerCase();

                if (localUUID !== remoteUUID) {
                    console.error(`❌ UUID Mismatch! Request: ${remoteUUID}, Local: ${localUUID}`);
                    return res.status(409).json({
                        error: 'dSYM UUID Mismatch',
                        expected: expectedUUID,
                        found: match[1],
                        message: "The dSYM file on the server does not match the app binary that crashed. Please upload the correct dSYM."
                    });
                } else {
                    console.log("✅ UUID Verified:", localUUID);
                    runAtos();
                }
            } else {
                // Could not parse, maybe run atos anyway?
                runAtos();
            }
        });
    } else {
        runAtos();
    }

    function runAtos() {
        // Construct atos command
        // atos -arch arm64 -o <binary> [-l <loadAddress>] <addr1> <addr2> ...
        const addrArgs = addresses.join(' ');
        const loadArg = loadAddress ? `-l ${loadAddress}` : '';
        const cmd = `atos -arch arm64 -o "${binaryPath}" ${loadArg} ${addrArgs}`;

        console.log(`Executing: ${cmd}`);

        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`atos error: ${error.message}`);
                return res.status(500).json({ error: 'Symbolication failed', details: error.message });
            }
            if (stderr) {
                console.warn(`atos stderr: ${stderr}`);
            }

            const lines = stdout.trim().split('\n');
            // Map original address to result
            const results = {};
            addresses.forEach((addr, idx) => {
                results[addr] = lines[idx] || 'Unresolved';
            });

            console.log(`✅ Symbolicated ${addresses.length} addresses for SDK ${sdkVersion}`);

            res.json({ results });
        });
    }
});

// GitHub Source Fetching Endpoint
app.post('/fetch-source', async (req, res) => {
    const { filename, line, sdkVersion, repoOwner, repoName } = req.body;
    const token = process.env.GITHUB_TOKEN; // Needed for private repos

    if (!filename || !repoOwner || !repoName) {
        return res.status(400).json({ error: 'Missing filename, repoOwner, or repoName' });
    }

    if (!token) {
        return res.status(500).json({ error: 'Server missing GITHUB_TOKEN environment variable' });
    }

    try {
        console.log(`🔍 Searching for ${filename} in ${repoOwner}/${repoName} @ ${sdkVersion || 'default'}`);

        // 1. Search for the file path
        const searchUrl = `https://api.github.com/search/code?q=filename:${filename}+repo:${repoOwner}/${repoName}`;
        const searchRes = await fetch(searchUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!searchRes.ok) throw new Error(`Search failed: ${searchRes.statusText}`);
        const searchData = await searchRes.json();

        if (!searchData.items || searchData.items.length === 0) {
            return res.status(404).json({ error: 'File not found in repository' });
        }

        // Assuming the first match is correct (or filtering by path if user provided module info)
        const filePath = searchData.items[0].path;
        console.log(`📍 Found path: ${filePath}`);

        // 2. Fetch Content
        // Try exact version tag first, fallback to main/HEAD if it fails (per user request)
        let ref = sdkVersion;
        let contentUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}?ref=${ref}`;

        let contentRes = await fetch(contentUrl, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/vnd.github.v3.raw' // Request raw content
            }
        });

        if (!contentRes.ok && ref) {
            console.warn(`⚠️ Tag ${ref} not found, falling back to default branch`);
            ref = null; // Clear ref to use default
            contentUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`;
            contentRes = await fetch(contentUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/vnd.github.v3.raw'
                }
            });
        }

        if (!contentRes.ok) throw new Error(`Content fetch failed: ${contentRes.statusText}`);

        const fileContent = await contentRes.text();
        const lines = fileContent.split('\n');
        const targetLineIndex = parseInt(line) - 1;

        // Extract snippet (e.g., 5 lines before and after)
        const start = Math.max(0, targetLineIndex - 5);
        const end = Math.min(lines.length, targetLineIndex + 6);
        const snippet = lines.slice(start, end).join('\n');

        // Return full info
        res.json({
            filePath,
            ref: ref || 'HEAD',
            startLine: start + 1,
            targetLine: parseInt(line),
            snippet
        });

    } catch (error) {
        console.error("GitHub API Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Symbolication server running on http://localhost:${port}`);
});
