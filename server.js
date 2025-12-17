
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
    const { sdkVersion, addresses, loadAddress } = req.body;

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

        res.json({ results });
    });
});

app.listen(port, () => {
    console.log(`Symbolication server running on http://localhost:${port}`);
});
