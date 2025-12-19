import UIKit
@_implementationOnly import CrashReporter
import MachO

final class SDKCrashReporter {
    
    // MARK: - Configuration
    
    static let shared = SDKCrashReporter()
    
    private var crashReporter: PLCrashReporter?
    private let crashReportFile = "sdk_crash_report.json"
    
    // SDK identification
    var sdkName: String = ""
    var sdkVersion: String = ""
    var sdkModulePrefixes: [String] = []
    
    // Track if Firebase is present
    private var firebaseDetected = false
    private var reporterEnabled = false
    
    // Exception handler chaining
    static var previousExceptionHandler: (@convention(c) (NSException) -> Void)?
    
    // Heartbeat timer
    private var heartbeatTimer: Timer?
    
    // MARK: - Initialization
    
    private init() {}
    
    func enable(sdkName: String, sdkVersion: String, modulePrefixes: [String]) {
        
        Logger.info("Crash Reporter's init called!")
        
        self.sdkName = sdkName
        self.sdkVersion = sdkVersion
        self.sdkModulePrefixes = modulePrefixes
        
        // Skip if debugger is attached (prevents LLDB conflicts)
        if isDebuggerAttached() {
            Logger.info("⚠️ Debugger attached - using exception handler only (no signal handlers)")
            setupExceptionHandler()
            return
        }
        
        // Detect Firebase Crashlytics
        firebaseDetected = isFirebaseCrashlyticsPresent()
        
        if firebaseDetected {
            Logger.info("⚠️ Firebase Crashlytics detected")
        }
        
        // Setup NSException handler first (this always works)
        setupExceptionHandler()
        
        // Try to setup PLCrashReporter
        // Even in BSD mode with Firebase, it might catch SOME crashes
        if !setupPLCrashReporter() {
            Logger.error("⚠️ PLCrashReporter setup failed - relying on exception handler")
        }
        
        // Setup periodic stack trace logging for SDK code
        setupPeriodicHealthCheck()
        
        // Process any pending crash from previous run
        processPendingCrashReport()
    }
    
    /// Setup PLCrashReporter with fallback logic
    private func setupPLCrashReporter() -> Bool {
        // Try Mach first (best detection)
        var config = PLCrashReporterConfig(
            signalHandlerType: .mach,
            symbolicationStrategy: .all
        )
        
        if let reporter = PLCrashReporter(configuration: config),
           enableReporter(reporter) {
            self.crashReporter = reporter
            self.reporterEnabled = true
            return true
        }
        
        // Fallback to BSD
        config = PLCrashReporterConfig(
            signalHandlerType: .BSD,
            symbolicationStrategy: .all
        )
        
        if let reporter = PLCrashReporter(configuration: config),
           enableReporter(reporter) {
            self.crashReporter = reporter
            self.reporterEnabled = true
            return true
        }
        
        return false
    }
    
    private func enableReporter(_ reporter: PLCrashReporter) -> Bool {
        do {
            try reporter.enableAndReturnError()
            return true
        } catch {
            Logger.info("❌ Failed to enable crash reporter: \(error)")
            return false
        }
    }
    
    /// Setup NSException handler that chains with Firebase
    private func setupExceptionHandler() {
        // Save the previous handler (Firebase's)
        SDKCrashReporter.previousExceptionHandler = NSGetUncaughtExceptionHandler()
        
        // Set our handler (must be a global function, not a closure)
        NSSetUncaughtExceptionHandler(sdkExceptionHandler)
        
        Logger.info("✅ NSException handler installed (chained)")
    }
    
    /// Handle NSException
    func handleException(_ exception: NSException) {
        let stackTrace = exception.callStackSymbols
        
        // Check if any SDK code is in the stack
        let sdkFramesPresent = stackTrace.contains { symbol in
            sdkModulePrefixes.contains { prefix in
                symbol.contains(prefix)
            }
        }
        
        if !sdkFramesPresent {
            return // Not our problem
        }
        
        Logger.info("🔴 SDK Exception detected: \(exception.name.rawValue)")
        
        // Build crash report
        var report: [String: Any] = [
            "timestamp": ISO8601DateFormatter().string(from: Date()),
            "kind": "exception",
            "sdkName": sdkName,
            "sdkVersion": sdkVersion,
            "exceptionName": exception.name.rawValue,
            "exceptionReason": exception.reason ?? "No reason provided",
            "stackTrace": stackTrace,
            "returnAddresses": exception.callStackReturnAddresses,
            "signature": buildExceptionSignature(exception, stackTrace: stackTrace),
            "userInfo": exception.userInfo as Any,
            "systemInfo": collectSystemInfo(),
            "appInfo": collectAppInfo(),
            "binaryImages": captureBinaryImages(),
            "captureMethod": "NSExceptionHandler"
        ]
        
        
        if let loadAddr = getLoadAddress(for: "Nudgecore_iOS") {
            var location: [String: Any] = ["moduleName": "Nudgecore_iOS"]
            location["loadAddress"] = loadAddr
            report["crashLocation"] = location
            
            // Standardize symbolication payload
            var symbolication: [String: Any] = [
                "sdkVersion": sdkVersion,
                "loadAddress": loadAddr,
                "addresses": exception.callStackReturnAddresses
            ]
            
            // Try to add UUID if available from our binary image capture
            if let images = report["binaryImages"] as? [[String: Any]],
               let sdkImage = images.first(where: { ($0["name"] as? String)?.contains(sdkName) == true || ($0["name"] as? String) == "Nudgecore_iOS" }),
               let uuid = sdkImage["uuid"] {
                symbolication["uuid"] = uuid
            }
            
            report["symbolication"] = symbolication
        }
        
        saveCrashReport(report)
    }
    
    /// Build signature from exception
    private func buildExceptionSignature(_ exception: NSException, stackTrace: [String]) -> String {
        let exceptionName = exception.name.rawValue
        
        // Find first SDK frame
        for symbol in stackTrace {
            for prefix in sdkModulePrefixes {
                if symbol.contains(prefix) {
                    // Extract method name from symbol
                    if let methodName = extractMethodName(from: symbol) {
                        return "\(exceptionName):\(methodName)"
                    }
                }
            }
        }
        
        return "\(exceptionName):Unknown"
    }
    
    /// Extract method name from stack symbol
    private func extractMethodName(from symbol: String) -> String? {
        // Symbol format: "3   MyApp   0x0000000102b4c8a0 MyModule.MyClass.myMethod() + 123"
        
        // Try to extract module.class.method pattern
        if let range = symbol.range(of: #"\b\w+\.\w+\.\w+\b"#, options: .regularExpression) {
            return String(symbol[range])
        }
        
        // Fallback: extract anything between spaces before the + offset
        let components = symbol.components(separatedBy: " ")
        if components.count >= 4 {
            return components[3]
        }
        
        return nil
    }
    
    /// Check if debugger is attached
    private func isDebuggerAttached() -> Bool {
        var info = kinfo_proc()
        var mib: [Int32] = [CTL_KERN, KERN_PROC, KERN_PROC_PID, getpid()]
        var size = MemoryLayout<kinfo_proc>.stride
        let result = sysctl(&mib, UInt32(mib.count), &info, &size, nil, 0)
        return (result == 0) && ((info.kp_proc.p_flag & P_TRACED) != 0)
    }
    
    /// Detect if Firebase Crashlytics is present in the app
    private func isFirebaseCrashlyticsPresent() -> Bool {
        // Check if Firebase Crashlytics classes are available
        if NSClassFromString("FIRCrashlytics") != nil {
            return true
        }
        if NSClassFromString("Crashlytics") != nil {
            return true
        }
        
        return false
    }
    
    /// Setup periodic health check to detect crashes that weren't caught
    private func setupPeriodicHealthCheck() {
        // 1. Check for stale heartbeat first (from previous run)
        checkForStaleCrash()
        
        // 2. Start monitoring
        startHeartbeatMonitoring()
        
        // 3. Register lifecycle observers to handle background/termination
        NotificationCenter.default.addObserver(self, selector: #selector(handleAppForeground), name: UIApplication.willEnterForegroundNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(handleAppBackground), name: UIApplication.didEnterBackgroundNotification, object: nil)
        NotificationCenter.default.addObserver(self, selector: #selector(handleAppTermination), name: UIApplication.willTerminateNotification, object: nil)
    }
    
    // MARK: - Heartbeat Lifecycle
    
    private func startHeartbeatMonitoring() {
        if !Thread.isMainThread {
            DispatchQueue.main.async { [weak self] in
                self?.startHeartbeatMonitoring()
            }
            return
        }
        
        updateHeartbeat()
        
        // Schedule timer to update every 60 seconds
        stopHeartbeatTimer()
        heartbeatTimer = Timer.scheduledTimer(withTimeInterval: 60.0, repeats: true) { [weak self] _ in
            self?.updateHeartbeat()
        }
    }
    
    private func stopHeartbeatTimer() {
        heartbeatTimer?.invalidate()
        heartbeatTimer = nil
    }
    
    @objc private func handleAppForeground() {
        // App coming back to foreground: restart heartbeat
        startHeartbeatMonitoring()
    }
    
    @objc private func handleAppBackground() {
        // App going to background: stop heartbeat and DELETE file
        // We assume background kills (OOM, etc.) are not SDK crashes we want to catch via this method
        stopHeartbeatTimer()
        deleteHeartbeatFile()
    }
    
    @objc private func handleAppTermination() {
        // Clean exit: delete file
        stopHeartbeatTimer()
        deleteHeartbeatFile()
    }
    
    private func updateHeartbeat() {
        let heartbeatURL = heartbeatFileURL()
        let heartbeat: [String: Any] = [
            "lastActive": ISO8601DateFormatter().string(from: Date()),
            "sdkVersion": sdkVersion
        ]
        
        if let data = try? JSONSerialization.data(withJSONObject: heartbeat) {
            try? data.write(to: heartbeatURL)
        }
    }
    
    private func deleteHeartbeatFile() {
        let url = heartbeatFileURL()
        try? FileManager.default.removeItem(at: url)
    }
    
    /// Check if last session ended in a crash (no clean shutdown)
    private func checkForStaleCrash() {
        let heartbeatURL = heartbeatFileURL()
        
        guard let data = try? Data(contentsOf: heartbeatURL),
              let heartbeat = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
              let lastActiveString = heartbeat["lastActive"] as? String,
              let lastActive = ISO8601DateFormatter().date(from: lastActiveString) else {
            return
        }
        
        // If file exists, it means we didn't exit clean or background cleanly
        // We can be stricter now: any existence implies crash, but keeping 5 min buffer is safe
        // Actually, if we delete on BG, existence means CRASHED while FOREGROUND.
        // So checking time is less important, but good for sanity.
        
        // Reporting
        let report: [String: Any] = [
            "timestamp": ISO8601DateFormatter().string(from: Date()),
            "kind": "suspected_crash",
            "sdkName": sdkName,
            "sdkVersion": sdkVersion,
            "lastActive": lastActiveString,
            "note": "Crash detected via stale heartbeat - likely crashed while active",
            "captureMethod": "HeartbeatMonitor"
        ]
        
        saveCrashReport(report)
        
        // Remove the stale file so we don't report it again
        deleteHeartbeatFile()
    }
    
    private func heartbeatFileURL() -> URL {
        let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        return dir.appendingPathComponent("sdk_heartbeat.json")
    }
    
    // MARK: - Crash Report Processing
    
    /// Process any pending crash report from previous run
    private func processPendingCrashReport() {
        guard let reporter = crashReporter,
              reporter.hasPendingCrashReport(),
              let crashData = try? reporter.loadPendingCrashReportDataAndReturnError() else {
            return
        }
        
        Logger.info("📊 Found pending crash report from PLCrashReporter")
        
        // Parse the crash report
        guard let report = try? PLCrashReport(data: crashData) else {
            reporter.purgePendingCrashReport()
            return
        }
        
        // Analyze if crash is from our SDK
        if let processedReport = analyzeCrashReport(report) {
            saveCrashReport(processedReport)
        }
        
        // Always purge after processing
        reporter.purgePendingCrashReport()
    }
    
    /// Analyze crash report to determine if it's SDK-related
    private func analyzeCrashReport(_ report: PLCrashReport) -> [String: Any]? {
        
        guard let crashedThread = findCrashedThread(in: report) else {
            return nil
        }
        
        let frames = extractFrames(from: crashedThread, report: report)
        
        // Check if any frames belong to our SDK
        let sdkFrames = frames.filter { frame in
            guard let moduleName = frame["moduleName"] as? String else { return false }
            return sdkModulePrefixes.contains { prefix in
                moduleName.contains(prefix)
            }
        }
        
        // Only report if SDK is in the stack trace
        guard !sdkFrames.isEmpty else {
            return nil
        }
        
        let sdkAddresses = frames.compactMap { frame -> String? in
            guard frame["isSDKFrame"] as? Bool == true else { return nil }
            return frame["instructionPointer"] as? String
        }
        
        // Find the crash point (first SDK frame after system/runtime frames)
        var crashLocation = determineCrashLocation(frames: frames, sdkFrames: sdkFrames)
        
        if let baseAddr = imageBaseAddressHex(for: "Nudgecore_iOS", in: report) {
            crashLocation?["loadAddress"] = baseAddr
        }
        
        let exceptionInfo = extractExceptionInfo(report)
        let signature = buildSignature(exception: exceptionInfo.name, crashLocation: crashLocation)
        
        #if canImport(UIKit)
        let appState: String = {
            guard Thread.isMainThread else { return "unknown" }
            guard let app = UIApplication.value(forKey: "sharedApplication") as? UIApplication else {
                return "unknown"
            }
            switch app.applicationState {
            case .active: return "active"
            case .inactive: return "inactive"
            case .background: return "background"
            @unknown default: return "unknown"
            }
        }()
        let orientation: Int = {
            guard Thread.isMainThread else { return -1 }
            return UIDevice.current.orientation.rawValue
        }()
        #else
        let appState = "unknown"
        let orientation = -1
        #endif
        
        var fullReport: [String: Any] = [
            "timestamp": ISO8601DateFormatter().string(from: Date()),
            "kind": "crash",
            "sdkName": sdkName,
            "sdkVersion": sdkVersion,
            "exceptionName": exceptionInfo.name,
            "exceptionReason": exceptionInfo.reason,
            "signal": exceptionInfo.signal ?? "N/A",
            "signature": signature,
            "crashLocation": crashLocation ?? [:],
            "frames": frames.prefix(10).map { $0 },
            "sdkFrameCount": sdkFrames.count,
            "systemInfo": extractSystemInfo(report),
            "appInfo": extractAppInfo(report),
            "binaryImages": extractBinaryImages(report),
            "state": [
                "isMainThread": Thread.isMainThread,
                "isLowPowerModeEnabled": ProcessInfo.processInfo.isLowPowerModeEnabled,
                "orientation": orientation,
                "appState": appState
            ]
        ]
        
        if let loadAddr = crashLocation?["loadAddress"] as? String {
            var symbolication: [String: Any] = [
                "sdkVersion": sdkVersion,
                "loadAddress": loadAddr,
                "addresses": sdkAddresses
            ]
            
            // Extract UUID for the SDK image
            if let imageIndex = crashLocation?["frameIndex"] as? Int, // This might not be right way to get image, better to lookup by module name
               let moduleName = crashLocation?["moduleName"] as? String,
               let image = report.images.first(where: {
                   (($0 as? PLCrashReportBinaryImageInfo)?.imageName as NSString?)?.lastPathComponent == moduleName
               }) as? PLCrashReportBinaryImageInfo,
               let uuid = image.imageUUID {
                symbolication["uuid"] = uuid
            }
            
            // Fallback: search in our extracted binaryImages array
            if symbolication["uuid"] == nil {
                 let binaryImages = extractBinaryImages(report)
                 if let sdkImage = binaryImages.first(where: { ($0["name"] as? String) == (crashLocation?["moduleName"] as? String) }),
                    let uuid = sdkImage["uuid"] {
                     symbolication["uuid"] = uuid
                 }
            }
            
            fullReport["symbolication"] = symbolication
        }
        
        return fullReport
    }
    
    // MARK: - Frame Extraction
    
    private func findCrashedThread(in report: PLCrashReport) -> PLCrashReportThreadInfo? {
        for i in 0..<report.threads.count {
            if let thread = report.threads[i] as? PLCrashReportThreadInfo,
               thread.crashed {
                return thread
            }
        }
        return report.threads.first as? PLCrashReportThreadInfo
    }
    
    private func extractFrames(from thread: PLCrashReportThreadInfo, report: PLCrashReport) -> [[String: Any]] {
        var frames: [[String: Any]] = []
        
        for i in 0..<thread.stackFrames.count {
            guard let frame = thread.stackFrames[i] as? PLCrashReportStackFrameInfo else {
                continue
            }
            
            let symbolInfo = frame.symbolInfo
            let moduleName = getModuleName(from: frame, report: report)
            let symbolName = symbolInfo?.symbolName ?? "0x\(String(format: "%llx", frame.instructionPointer))"
            
            var frameDict: [String: Any] = [
                "frameIndex": i,
                "instructionPointer": String(format: "0x%llx", frame.instructionPointer),
                "moduleName": moduleName,
                "symbolName": symbolName
            ]
            
            if let demangled = demangle(symbolName) {
                frameDict["demangledName"] = demangled
            }
            
            frameDict["isSDKFrame"] = sdkModulePrefixes.contains { prefix in
                moduleName.contains(prefix) || symbolName.contains(prefix)
            }
            
            frames.append(frameDict)
        }
        
        return frames
    }
    
    private func getModuleName(from frame: PLCrashReportStackFrameInfo, report: PLCrashReport) -> String {
        for i in 0..<report.images.count {
            guard let image = report.images[i] as? PLCrashReportBinaryImageInfo else {
                continue
            }
            
            let imageStart = image.imageBaseAddress
            let imageEnd = imageStart + image.imageSize
            
            if frame.instructionPointer >= imageStart && frame.instructionPointer < imageEnd {
                return (image.imageName as NSString).lastPathComponent
            }
        }
        
        return "Unknown"
    }
    
    // MARK: - Exception Info
    
    private func extractExceptionInfo(_ report: PLCrashReport) -> (name: String, reason: String, signal: String?) {
        var name = "Unknown"
        var reason = "Crash occurred"
        var signal: String?
        
        if let signalInfo = report.signalInfo {
            let signalName: String
            if let sigName = signalInfo.name {
                signalName = sigName
            } else {
                signalName = signalNameFromCode(signalInfo.code)
            }
            
            signal = signalName
            name = signalName
            reason = "Terminated by \(signalName)"
            
            if signalInfo.address != 0 {
                reason += String(format: " at 0x%llx", signalInfo.address)
            }
        }
        
        if let exception = report.exceptionInfo {
            name = exception.exceptionName ?? "NSException"
            reason = exception.exceptionReason ?? "No reason provided"
        }
        
        return (name, reason, signal)
    }
    
    private func signalNameFromCode(_ code: String) -> String {
        if code.hasPrefix("SIG") {
            return code
        }
        
        if let intCode = Int(code) {
            switch intCode {
            case 5: return "SIGTRAP"
            case 6: return "SIGABRT"
            case 4: return "SIGILL"
            case 8: return "SIGFPE"
            case 10: return "SIGBUS"
            case 11: return "SIGSEGV"
            case 13: return "SIGPIPE"
            default: return "Signal(\(intCode))"
            }
        }
        
        return code
    }
    
    // MARK: - Crash Location Analysis
    
    private func determineCrashLocation(frames: [[String: Any]], sdkFrames: [[String: Any]]) -> [String: Any]? {
        let runtimeKeywords = [
            "_assertionFailure",
            "fatalError",
            "_swift_runtime_on_report",
            "Swift runtime failure"
        ]
        
        var afterRuntime = false
        
        for frame in frames {
            let symbol = (frame["demangledName"] as? String) ?? (frame["symbolName"] as? String) ?? ""
            
            if runtimeKeywords.contains(where: { symbol.contains($0) }) {
                afterRuntime = true
            }
            
            if afterRuntime && (frame["isSDKFrame"] as? Bool == true) {
                return frame
            }
        }
        
        return sdkFrames.first
    }
    
    // MARK: - Signature Generation
    
    private func buildSignature(exception: String, crashLocation: [String: Any]?) -> String {
        
        guard let location = crashLocation else {
            return "\(exception):Unknown"
        }
        
        let symbol = (location["demangledName"] as? String)
                  ?? (location["symbolName"] as? String)
                  ?? "Unknown"
        
        let cleaned = cleanSymbolForSignature(symbol)
        
        return "\(exception):\(cleaned)"
    }
    
    private func cleanSymbolForSignature(_ symbol: String) -> String {
        var cleaned = symbol
        
        if let inRange = cleaned.range(of: " in ") {
            let afterIn = String(cleaned[inRange.upperBound...])
            
            if let parenRange = afterIn.range(of: "(") {
                let methodPart = String(afterIn[..<parenRange.lowerBound])
                
                let components = methodPart.split(separator: ".").map(String.init)
                if components.count >= 2 {
                    cleaned = components.suffix(2).joined(separator: ".")
                } else if components.count == 1 {
                    cleaned = components[0]
                }
                
                return cleaned
            }
        }
        
        if let parenRange = cleaned.range(of: "(") {
            let beforeParen = String(cleaned[..<parenRange.lowerBound])
            let components = beforeParen.split(separator: ".").map(String.init)
            if components.count >= 2 {
                return components.suffix(2).joined(separator: ".")
            }
            return beforeParen
        }
        
        if let regex = try? NSRegularExpression(pattern: #"<[^>]+>"#) {
            cleaned = regex.stringByReplacingMatches(
                in: cleaned,
                range: NSRange(cleaned.startIndex..., in: cleaned),
                withTemplate: ""
            )
        }
        
        if cleaned.count > 100 {
            let index = cleaned.index(cleaned.startIndex, offsetBy: 100)
            cleaned = String(cleaned[..<index]) + "..."
        }
        
        return cleaned
    }
    
    // MARK: - Load Address Capture
    
    private func getLoadAddress(for frameworkName: String) -> String? {
        let count = _dyld_image_count()
        
        for i in 0..<count {
            if let namePtr = _dyld_get_image_name(i) {
                let imageName = String(cString: namePtr)
                if imageName.contains(frameworkName) {
                    let header = _dyld_get_image_header(i)
                    let loadAddress = UInt(bitPattern: header)
                    return String(format: "0x%lx", loadAddress)
                }
            }
        }
        return nil
    }

    // MARK: - Live Binary Image Capture
    
    private func captureBinaryImages() -> [[String: Any]] {
        var images: [[String: Any]] = []
        let count = _dyld_image_count()
        
        for i in 0..<count {
            guard let header = _dyld_get_image_header(i) else { continue }
            guard let namePtr = _dyld_get_image_name(i) else { continue }
            let imageNamePath = String(cString: namePtr)
            let imageName = (imageNamePath as NSString).lastPathComponent
            
            // Filter only relevant images (SDK or App)
            let isSDKImage = sdkModulePrefixes.contains { prefix in
                imageName.contains(prefix)
            }
            // Check if it's the main app executable
            let isAppBinary = imageName == Bundle.main.executableURL?.lastPathComponent
            
            if isSDKImage || isAppBinary {
                var dict: [String: Any] = [
                    "name": imageName,
                    "baseAddress": String(format: "0x%llx", UInt(bitPattern: header)),
                    "size": 0 // Size is difficult to get cheaply, omitting for now
                ]
                
                if let uuid = getBinaryImageUUID(header: header) {
                    dict["uuid"] = uuid
                }
                
                images.append(dict)
            }
        }
        
        return images
    }
    
    private func getBinaryImageUUID(header: UnsafePointer<mach_header>) -> String? {
        var ptr = UnsafeRawPointer(header)
        
        // Move past the header
        let is64bit = header.pointee.magic == MH_MAGIC_64 || header.pointee.magic == MH_CIGAM_64
        if is64bit {
            ptr += MemoryLayout<mach_header_64>.size
        } else {
            ptr += MemoryLayout<mach_header>.size
        }
        
        var commands = header.pointee.ncmds
        
        while commands > 0 {
            let cmd = ptr.load(as: load_command.self)
            
            if cmd.cmd == LC_UUID {
                let uuidCmd = ptr.load(as: uuid_command.self)
                let uuid = uuidCmd.uuid
                return String(format: "%02X%02X%02X%02X%02X%02X%02X%02X-%02X%02X-%02X%02X-%02X%02X-%02X%02X%02X%02X%02X%02X",
                              uuid.0, uuid.1, uuid.2, uuid.3, uuid.4, uuid.5, uuid.6, uuid.7,
                              uuid.8, uuid.9, uuid.10, uuid.11, uuid.12, uuid.13, uuid.14, uuid.15)
            }
            
            ptr += Int(cmd.cmdsize)
            commands -= 1
        }
        
        return nil
    }

    // MARK: - System Info Collection
    
    private func collectSystemInfo() -> [String: Any] {
        return [
            "osVersion": UIDevice.current.systemVersion,
            "deviceModel": UIDevice.current.model,
            "systemName": UIDevice.current.systemName,
            "timestamp": ISO8601DateFormatter().string(from: Date())
        ]
    }
    
    private func collectAppInfo() -> [String: Any] {
        let bundleId = Bundle.main.bundleIdentifier ?? "unknown"
        let version = Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown"
        let build = Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "unknown"
        
        return [
            "bundleIdentifier": bundleId,
            "version": version,
            "build": build
        ]
    }
    
    private func extractSystemInfo(_ report: PLCrashReport) -> [String: Any] {
        guard let systemInfo = report.systemInfo else { return [:] }
        
        let timestamp: String
        if let date = systemInfo.timestamp {
            timestamp = ISO8601DateFormatter().string(from: date)
        } else {
            timestamp = ISO8601DateFormatter().string(from: Date())
        }
        
        let osVersion = systemInfo.operatingSystemVersion ?? "unknown"
        
        let architecture: String
        if let processorInfo = report.systemInfo.processorInfo {
            architecture = architectureStringFrom(type: processorInfo.type, subtype: processorInfo.subtype)
        } else {
            architecture = "unknown"
        }
        
        return [
            "osVersion": osVersion,
            "osBuild": systemInfo.operatingSystemBuild ?? "unknown",
            "architecture": architecture,
            "timestamp": timestamp
        ]
    }
    
    private func imageBaseAddressHex(for moduleName: String, in report: PLCrashReport) -> String? {
        for i in 0..<report.images.count {
            guard let image = report.images[i] as? PLCrashReportBinaryImageInfo else { continue }
            let name = (image.imageName as NSString).lastPathComponent
            if name == moduleName {
                return String(format: "0x%llx", image.imageBaseAddress)
            }
        }
        return nil
    }

    private func extractBinaryImages(_ report: PLCrashReport) -> [[String: Any]] {
        var images: [[String: Any]] = []
        
        for i in 0..<report.images.count {
            guard let image = report.images[i] as? PLCrashReportBinaryImageInfo else { continue }
            
            let imageName = (image.imageName as NSString).lastPathComponent
            let isSDKImage = sdkModulePrefixes.contains { prefix in
                imageName.contains(prefix)
            }
            
            let isAppBinary = imageName == Bundle.main.executableURL?.lastPathComponent
            
            // Only add if it's SDK or app binary
            if isSDKImage || isAppBinary {
                var dict: [String: Any] = [
                    "name": imageName,
                    "baseAddress": String(format: "0x%llx", image.imageBaseAddress),
                    "size": image.imageSize
                ]
                
                if let uuid = image.imageUUID {
                    dict["uuid"] = uuid
                }
                
                images.append(dict)
            }
        }
        
        return images
    }
    
    private func architectureStringFrom(type: UInt64, subtype: UInt64) -> String {
        let CPU_TYPE_ARM: UInt64 = 12
        let CPU_TYPE_ARM64: UInt64 = 16777228
        let CPU_TYPE_X86: UInt64 = 7
        let CPU_TYPE_X86_64: UInt64 = 16777223
        
        switch type {
        case CPU_TYPE_ARM64: return "arm64"
        case CPU_TYPE_ARM: return "arm"
        case CPU_TYPE_X86_64: return "x86_64"
        case CPU_TYPE_X86: return "i386"
        default: return "unknown(\(type))"
        }
    }
    
    private func extractAppInfo(_ report: PLCrashReport) -> [String: Any] {
        guard let appInfo = report.applicationInfo else { return [:] }
        
        return [
            "bundleIdentifier": appInfo.applicationIdentifier ?? "unknown",
            "version": appInfo.applicationVersion ?? "unknown",
            "marketingVersion": appInfo.applicationMarketingVersion ?? "unknown",
            "appBundleID": Bundle.main.bundleIdentifier ?? "unknown",
            "appVersion": Bundle.main.infoDictionary?["CFBundleShortVersionString"] as? String ?? "unknown",
            "appBuild": Bundle.main.infoDictionary?["CFBundleVersion"] as? String ?? "unknown",
        ]
    }
    
    // MARK: - Symbol Demangling
    
    private func demangle(_ symbol: String) -> String? {
        guard symbol.hasPrefix("_T") || symbol.hasPrefix("$s") || symbol.hasPrefix("_$s") else {
            return nil
        }
        
        return symbol.withCString { cString in
            guard let demangled = swift_demangle(cString, UInt(strlen(cString)), nil, nil, 0) else {
                return nil
            }
            defer { free(demangled) }
            return String(cString: demangled)
        }
    }
    
    @_silgen_name("swift_demangle")
    private func swift_demangle(
        _ mangledName: UnsafePointer<CChar>?,
        _ mangledNameLength: UInt,
        _ outputBuffer: UnsafeMutablePointer<CChar>?,
        _ outputBufferSize: UnsafeMutablePointer<UInt>?,
        _ flags: UInt32
    ) -> UnsafeMutablePointer<CChar>?
    
    // MARK: - Persistence
    
    private func saveCrashReport(_ report: [String: Any]) {
        let url = crashReportURL()
        let sanitized = sanitizeForJSON(report)
        
        guard let data = try? JSONSerialization.data(withJSONObject: sanitized, options: .prettyPrinted) else {
            return
        }
        
        do {
            try data.write(to: url, options: .atomic)
        }
        catch {
            return
        }
    }
    
    private func sanitizeForJSON(_ value: Any) -> Any {
        switch value {
        case let date as Date:
            return ISO8601DateFormatter().string(from: date)
        case let dict as [String: Any]:
            return dict.mapValues { sanitizeForJSON($0) }
        case let array as [Any]:
            return array.map { sanitizeForJSON($0) }
        case let string as String:
            return string
        case let number as NSNumber:
            return number
        case is NSNull:
            return NSNull()
        default:
            return "\(value)"
        }
    }
    
    private func crashReportURL() -> URL {
        let dir = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first!
        return dir.appendingPathComponent(crashReportFile)
    }
    
    // MARK: - Public API
    
    func getLastCrashReport() -> [String: Any]? {
        
        let url = crashReportURL()
        
        guard let data = try? Data(contentsOf: url), let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any] else {
            return nil
        }
        
        Logger.info("Found Crash, URL - \(url)")
        
        return json
    }
    
    func clearLastCrashReport() {
        let url = crashReportURL()
        try? FileManager.default.removeItem(at: url)
        
        // Also clear heartbeat
        let heartbeatURL = heartbeatFileURL()
        try? FileManager.default.removeItem(at: heartbeatURL)
    }
    
    func sendLastCrashReport(completion: @escaping (Result<Void, Error>) -> Void) {
        
        guard let report = getLastCrashReport() else {
            completion(.failure(NSError(domain: "SDKCrashReporter", code: 1, userInfo: [NSLocalizedDescriptionKey: "No crash report available"])))
            return
        }
                    
        sendReportWith(payload: report)
        completion(.success(()))
    }
    
    func sendReportWith(payload: [String: Any]) {

        do {
            
            let fullPayload: [String : Any] = ["cat": "Crash",
                                               "subCat": "Core",
                                               "msg": "",
                                               "app": ProcessInfo.processInfo.processName,
                                               "d": ["Payload": payload]
            ]
            
            let body = try JSONSerialization.data(withJSONObject: fullPayload, options: [])

            let headers: [String: String] = [
                "apiKey": NudgeSessionData.publicApiKey,
                "p": String(describing: NudgeSessionData.platformEnum),
                "sdk-ver": NudgeCentralRepository.sdks["core"] ?? "N/A",
                "Content-Type": "application/json",
            ]

            let startTime = CurrentTimestamp.getCurrentTimeInUTCFormat()

            HTTPClient.shared.sendRequest(urlString: NudgeSessionData.globalbaseUrl + "internal/fe/error", method: .POST, headers: headers, body: body, startTime: startTime, apiName: "Error") { result in

                switch result {
                case .success(_):
                    Logger.info("Crash report sent successfully")
                    self.clearLastCrashReport()

                case .failure(let error):
                    Logger.error("Error sending crash report: \(error.localizedDescription)")
                }
            }
        }
        catch {
            return
        }
    }
}

// MARK: - Global Exception Handler

/// Global function to handle uncaught exceptions (can't capture context)
private func sdkExceptionHandler(_ exception: NSException) {
    let shared = SDKCrashReporter.shared
    
    // Process the exception for SDK involvement
    shared.handleException(exception)
    
    // Chain to previous handler (Firebase's handler)
    if let previousHandler = SDKCrashReporter.previousExceptionHandler {
        previousHandler(exception)
    }
}
