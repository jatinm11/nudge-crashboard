import { useEffect, useMemo, useRef, useState } from "react"
import {
  Search,
  Download,
  AlertCircle,
  TrendingUp,
  Users,
  Activity,
  X,
  Home,
  BarChart3,
  FileText,
  Menu,
  ChevronRight,
  Calendar,
  Shield,
  Zap,
  Filter,
  Clock,
  Layers,
  Flame,
  ChevronDown,
  Hash,
  Gauge,
  Table2Icon as Table2,
  Grid2X2,
  SplitSquareVertical,
  Info,
  MoreHorizontal,
  Eye,
  Smartphone,
  Globe,
  Upload,
  Moon,
  Sun,
} from "lucide-react"

const initialCrashes = [
  {
    id: "CRH-0001",
    client: "Big Basket",
    clientId: "client-1",
    signal: "SIGTRAP",
    exceptionName: "SIGTRAP",
    timestamp: "2025-11-06T20:15:43Z",
    appVersion: "1.1",
    osVersion: "18.3.1",
    architecture: "arm64",
    sdkVersion: "9.0.20",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "ChallengesUI.clickEvaluater",
      demangledName: "closure #1 in ChallengesUI.clickEvaluater",
    },
    status: "Open",
    severity: "High",
    device: {
      model: "iPhone14,2",
      freeRAMMB: 612,
      freeStorageMB: 2048,
      batteryLevel: 0.64,
      networkType: "WiFi",
    },
    breadcrumbs: [
      { ts: "2025-11-06T20:15:30Z", action: "Navigated: Home → Challenges" },
      { ts: "2025-11-06T20:15:40Z", action: "Tapped: Start Challenge" },
      { ts: "2025-11-06T20:15:42Z", action: "API: /challenge/start 200" },
      { ts: "2025-11-06T20:15:43Z", action: "Crash Triggered" },
    ],
    frames: [
      { moduleName: "Nudgecore_iOS", symbolName: "ChallengesUI.clickEvaluater", instructionPointer: "0x104b204d0", isSDKFrame: true, demangledName: "closure #1 in ChallengesUI.clickEvaluater" },
      { moduleName: "UIKitCore", symbolName: "UIApplication.sendAction", instructionPointer: "0x1850d12e0", isSDKFrame: false },
      { moduleName: "UIKitCore", symbolName: "UIControl.sendAction", instructionPointer: "0x1850d12e0", isSDKFrame: false },
      { moduleName: "Nudgecore_iOS", symbolName: "NudgeButton.touchUpInside", instructionPointer: "0x104b20400", isSDKFrame: true, demangledName: "NudgeButton.touchUpInside" },
    ],
    http: { recentStatusCodes: [200, 200, 500, 200, 503] },
    user: { idHash: "fa82e9b1", region: "US" },
  },
  {
    id: "CRH-0002",
    client: "Jar",
    clientId: "client-2",
    signal: "SIGABRT",
    exceptionName: "NSInvalidArgumentException",
    timestamp: "2025-11-06T18:22:15Z",
    appVersion: "1.0",
    osVersion: "18.2.0",
    architecture: "arm64",
    sdkVersion: "9.0.18",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "DataManager.processData",
      demangledName: "DataManager.processData(with:completion:)",
    },
    status: "Investigating",
    severity: "Critical",
    device: {
      model: "iPhone13,4",
      freeRAMMB: 420,
      freeStorageMB: 1024,
      batteryLevel: 0.34,
      networkType: "5G",
    },
    breadcrumbs: [
      { ts: "2025-11-06T18:21:58Z", action: "Opened: Details" },
      { ts: "2025-11-06T18:22:04Z", action: "Tapped: Save" },
      { ts: "2025-11-06T18:22:06Z", action: "API: /data/save 500" },
      { ts: "2025-11-06T18:22:15Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 500, 500, 200] },
    user: { idHash: "1a2b3c4d", region: "IN" },
  },
  {
    id: "CRH-0003",
    client: "Big Basket",
    clientId: "client-1",
    signal: "SIGSEGV",
    exceptionName: "SIGSEGV",
    timestamp: "2025-11-06T15:45:30Z",
    appVersion: "1.1",
    osVersion: "18.3.1",
    architecture: "arm64",
    sdkVersion: "9.0.20",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "NetworkHandler.fetchData",
      demangledName: "NetworkHandler.fetchData(from:)",
    },
    status: "Resolved",
    severity: "Medium",
    device: {
      model: "iPhone14,5",
      freeRAMMB: 350,
      freeStorageMB: 500,
      batteryLevel: 0.51,
      networkType: "Cellular",
    },
    breadcrumbs: [
      { ts: "2025-11-06T15:45:20Z", action: "Pull-to-Refresh" },
      { ts: "2025-11-06T15:45:22Z", action: "API: /feed 200" },
      { ts: "2025-11-06T15:45:27Z", action: "Parse response" },
      { ts: "2025-11-06T15:45:30Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 200, 200] },
    user: { idHash: "98ab76de", region: "US" },
  },
  {
    id: "CRH-0004",
    client: "Acko",
    clientId: "client-3",
    signal: "SIGABRT",
    exceptionName: "Fatal Error",
    timestamp: "2025-11-06T12:10:05Z",
    appVersion: "1.0",
    osVersion: "18.1.0",
    architecture: "arm64",
    sdkVersion: "9.0.19",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "UIManager.renderView",
      demangledName: "UIManager.renderView(with:animation:)",
    },
    status: "Open",
    severity: "High",
    device: {
      model: "iPhone12,3",
      freeRAMMB: 280,
      freeStorageMB: 800,
      batteryLevel: 0.22,
      networkType: "WiFi",
    },
    breadcrumbs: [
      { ts: "2025-11-06T12:09:40Z", action: "Open Screen: Dashboard" },
      { ts: "2025-11-06T12:10:03Z", action: "Toggle Animation On" },
      { ts: "2025-11-06T12:10:05Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 200, 200, 200] },
    user: { idHash: "0ff1ce02", region: "DE" },
  },
  {
    id: "CRH-0005",
    client: "Jar",
    clientId: "client-2",
    signal: "SIGTRAP",
    exceptionName: "SIGTRAP",
    timestamp: "2025-11-06T09:30:22Z",
    appVersion: "1.1",
    osVersion: "18.2.0",
    architecture: "arm64",
    sdkVersion: "9.0.20",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "ChallengesUI.clickEvaluater",
      demangledName: "closure #1 in ChallengesUI.clickEvaluater",
    },
    status: "Resolved",
    severity: "Low",
    device: {
      model: "iPhone14,2",
      freeRAMMB: 700,
      freeStorageMB: 4096,
      batteryLevel: 0.89,
      networkType: "WiFi",
    },
    breadcrumbs: [
      { ts: "2025-11-06T09:30:18Z", action: "Tap: Challenge Cell" },
      { ts: "2025-11-06T09:30:22Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 200, 200] },
    user: { idHash: "1a2b3c4d", region: "IN" },
  },
  {
    id: "CRH-0006",
    client: "Nykaa",
    clientId: "client-4",
    signal: "SIGSEGV",
    exceptionName: "EXC_BAD_ACCESS",
    timestamp: "2025-11-05T22:15:40Z",
    appVersion: "1.0",
    osVersion: "18.3.0",
    architecture: "arm64",
    sdkVersion: "9.0.18",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "StorageManager.saveData",
      demangledName: "StorageManager.saveData(key:value:)",
    },
    status: "Investigating",
    severity: "Critical",
    device: {
      model: "iPhone12,5",
      freeRAMMB: 256,
      freeStorageMB: 256,
      batteryLevel: 0.18,
      networkType: "Cellular",
    },
    breadcrumbs: [
      { ts: "2025-11-05T22:15:31Z", action: "Write Draft" },
      { ts: "2025-11-05T22:15:33Z", action: "Persist Draft" },
      { ts: "2025-11-05T22:15:40Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [500, 500, 200] },
    user: { idHash: "77c0ffee", region: "GB" },
  },
  {
    id: "CRH-0007",
    client: "Big Basket",
    clientId: "client-1",
    signal: "SIGABRT",
    exceptionName: "NSRangeException",
    timestamp: "2025-11-05T19:45:12Z",
    appVersion: "1.1",
    osVersion: "18.3.1",
    architecture: "arm64",
    sdkVersion: "9.0.20",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "Array.subscript.getter",
      demangledName: "Swift.Array.subscript.getter",
    },
    status: "Open",
    severity: "High",
    device: {
      model: "iPhone14,2",
      freeRAMMB: 512,
      freeStorageMB: 1200,
      batteryLevel: 0.73,
      networkType: "WiFi",
    },
    breadcrumbs: [
      { ts: "2025-11-05T19:45:06Z", action: "Scroll: Feed" },
      { ts: "2025-11-05T19:45:12Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 200, 200] },
    user: { idHash: "fa82e9b1", region: "US" },
  },
  {
    id: "CRH-0008",
    client: "Acko",
    clientId: "client-3",
    signal: "SIGTRAP",
    exceptionName: "Assertion Failed",
    timestamp: "2025-11-05T16:20:55Z",
    appVersion: "1.0",
    osVersion: "18.1.0",
    architecture: "arm64",
    sdkVersion: "9.0.19",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "ValidationHelper.validate",
      demangledName: "ValidationHelper.validate(input:)",
    },
    status: "Resolved",
    severity: "Medium",
    device: {
      model: "iPhone11,8",
      freeRAMMB: 300,
      freeStorageMB: 600,
      batteryLevel: 0.58,
      networkType: "Cellular",
    },
    breadcrumbs: [
      { ts: "2025-11-05T16:20:40Z", action: "Open: Form" },
      { ts: "2025-11-05T16:20:50Z", action: "Submit: invalid email" },
      { ts: "2025-11-05T16:20:55Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 422, 200] },
    user: { idHash: "0ff1ce02", region: "DE" },
  },
  {
    id: "CRH-0009",
    client: "Big Basket",
    clientId: "client-1",
    signal: "SIGABRT",
    exceptionName: "Memory Warning",
    timestamp: "2025-11-05T14:30:18Z",
    appVersion: "1.1",
    osVersion: "18.3.1",
    architecture: "arm64",
    sdkVersion: "9.0.20",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "MemoryManager.allocate",
      demangledName: "MemoryManager.allocate(size:)",
    },
    status: "Open",
    severity: "Medium",
    device: {
      model: "iPhone14,5",
      freeRAMMB: 80,
      freeStorageMB: 400,
      batteryLevel: 0.27,
      networkType: "Cellular",
    },
    breadcrumbs: [
      { ts: "2025-11-05T14:29:58Z", action: "Open: Camera" },
      { ts: "2025-11-05T14:30:18Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 200, 200] },
    user: { idHash: "98ab76de", region: "US" },
  },
  {
    id: "CRH-0010",
    client: "Jar",
    clientId: "client-2",
    signal: "SIGSEGV",
    exceptionName: "Null Pointer",
    timestamp: "2025-11-05T11:15:42Z",
    appVersion: "1.0",
    osVersion: "18.2.0",
    architecture: "arm64",
    sdkVersion: "9.0.18",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "Parser.decode",
      demangledName: "Parser.decode(data:)",
    },
    status: "Resolved",
    severity: "High",
    device: {
      model: "iPhone13,2",
      freeRAMMB: 400,
      freeStorageMB: 1600,
      batteryLevel: 0.41,
      networkType: "WiFi",
    },
    breadcrumbs: [
      { ts: "2025-11-05T11:15:32Z", action: "Open: Notifications" },
      { ts: "2025-11-05T11:15:42Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [200, 200, 200] },
    user: { idHash: "1a2b3c4d", region: "IN" },
  },
  {
    id: "CRH-0011",
    client: "Nykaa",
    clientId: "client-4",
    signal: "SIGTRAP",
    exceptionName: "SIGTRAP",
    timestamp: "2025-12-08T06:59:45Z",
    appVersion: "4.9.8",
    osVersion: "26.1",
    architecture: "arm64",
    sdkVersion: "10.0.3",
    crashLocation: {
      moduleName: "Nudgecore_iOS",
      symbolName: "ProgressBarProps.init",
      demangledName: "Nudgecore_iOS.ProgressBarProps.init(dictionary:)",
    },
    status: "Open",
    severity: "Critical",
    device: {
      model: "N/A",
      freeRAMMB: "N/A",
      freeStorageMB: "N/A",
      batteryLevel: "N/A",
      networkType: "N/A",
    },
    breadcrumbs: [
      { ts: "2025-12-08T06:59:30Z", action: "Navigated: Product Page" },
      { ts: "2025-12-08T06:59:40Z", action: "Scroll: Reviews" },
      { ts: "2025-12-08T06:59:45Z", action: "Crash Triggered" },
    ],
    http: { recentStatusCodes: [] },
    user: { idHash: "a1b2c3d4", region: "IN" },
  },
]

// Fingerprint: exception + top-frame symbol (first two parts) + appVersion major
const fingerprint = (crash) => {
  const sym =
    crash.crashLocation?.symbolName?.split(".").slice(0, 2).join(".") ||
    "unknown"
  const major = (crash.appVersion || "0").split(".")[0]
  return `${crash.exceptionName}|${sym}|${major}`.toLowerCase()
}

const formatTimestamp = (timestamp, useUTC) => {
  const date = new Date(timestamp)
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: useUTC ? "UTC" : undefined,
    hour12: false,
  })
}

const getStatusStyles = (status) => {
  switch (status) {
    case "Open":
      return "bg-red-50 text-red-700 border border-red-200"
    case "Investigating":
      return "bg-amber-50 text-amber-700 border border-amber-200"
    case "Resolved":
      return "bg-green-50 text-green-700 border border-green-200"
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200"
  }
}

const getSeverityStyles = (severity) => {
  switch (severity) {
    case "Critical":
      return "bg-red-50 text-red-700 border border-red-200"
    case "High":
      return "bg-orange-50 text-orange-700 border border-orange-200"
    case "Medium":
      return "bg-amber-50 text-amber-700 border border-amber-200"
    case "Low":
      return "bg-blue-50 text-blue-700 border border-blue-200"
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200"
  }
}

const minmax = (arr) => [Math.min(...arr), Math.max(...arr)]
const clamp = (n, a, b) => Math.max(a, Math.min(b, n))

// Build time buckets (minutes) for 24h decay/series
const build24hSeries = (events, useUTC) => {
  const now = Date.now()
  const bucketCount = 24
  const step = (24 * 60 * 60 * 1000) / bucketCount
  const series = new Array(bucketCount).fill(0)
  events.forEach((e) => {
    const t = new Date(e.timestamp).getTime()
    const age = now - t
    if (age >= 0 && age <= 24 * 60 * 60 * 1000) {
      const idx = bucketCount - 1 - Math.floor(age / step)
      if (idx >= 0 && idx < bucketCount) series[idx]++
    }
  })
  return series
}

// Simple z-score for regression detection
const zscore = (values) => {
  if (values.length < 3) return 0
  const baseline = values.slice(0, -1)
  const mean = baseline.reduce((a, b) => a + b, 0) / baseline.length
  const sd =
    Math.sqrt(
      baseline.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / baseline.length
    ) || 1
  return (values.at(-1) - mean) / sd
}

// Build a daily series for the last 7 days for regression
const build7dDailySeries = (events) => {
  const days = 8 // 7 baseline + today
  const MS = 24 * 60 * 60 * 1000
  const now = Date.now()
  const start = now - (days - 1) * MS
  const series = new Array(days).fill(0)
  events.forEach((e) => {
    const idx = Math.floor((new Date(e.timestamp).getTime() - start) / MS)
    if (idx >= 0 && idx < days) series[idx]++
  })
  return series
}

// Tiny sparkline SVG
const Sparkline = ({ values = [] }) => {
  const max = Math.max(1, ...values)
  const h = 24
  const w = 80
  const stepX = w / Math.max(1, values.length - 1)
  const pts = values
    .map((v, i) => {
      const x = i * stepX
      const y = h - (v / max) * (h - 4) - 2
      return `${x},${y}`
    })
    .join(" ")
  return (
    <svg width={w} height={h} className='opacity-70'>
      <polyline
        fill='none'
        stroke='currentColor'
        strokeWidth='1.5'
        points={pts}
      />
    </svg>
  )
}

// Heat cell color (count-based)
const heatColor = (n, max) => {
  if (max === 0) return "bg-gray-50"
  const t = n / max
  if (t === 0) return "bg-gray-50"
  if (t < 0.25) return "bg-blue-50"
  if (t < 0.5) return "bg-blue-100"
  if (t < 0.75) return "bg-blue-200"
  return "bg-blue-300"
}

/**
 * --------------------
 * MAIN DASHBOARD VIEW
 * --------------------
 */

const parseCSV = (text) => {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, ''))

  // Detect column indices from headers — supports multiple CSV formats
  // Payload/body column: "body", "any(body)", or anything with "payload"/"json"
  let payloadIdx = headers.findIndex((h) => h.toLowerCase() === "body")
  if (payloadIdx === -1) {
    payloadIdx = headers.findIndex((h) => h.includes("any(body)"))
  }
  if (payloadIdx === -1) {
    payloadIdx = headers.findIndex((h) => h.toLowerCase().includes("payload") || h.toLowerCase().includes("json"))
  }

  // ID column: "trace_id" or "id"
  const idIdx = headers.findIndex((h) => h.toLowerCase() === "trace_id" || h.toLowerCase() === "id")
  // App column: "app"
  const appIdx = headers.findIndex((h) => h.toLowerCase() === "app")
  // Timestamp column at CSV level
  const tsIdx = headers.findIndex((h) => h.toLowerCase() === "timestamp" || h.toLowerCase() === "time")

  // State-machine CSV field parser — O(n), no regex backtracking
  const splitCSVLine = (line) => {
    const fields = []
    let i = 0
    while (i <= line.length) {
      if (i === line.length) { fields.push(''); break }
      if (line[i] === '"') {
        // Quoted field: collect until closing quote
        let value = ''
        let j = i + 1
        while (j < line.length) {
          if (line[j] === '"') {
            if (j + 1 < line.length && line[j + 1] === '"') {
              value += '"'   // escaped "" → "
              j += 2
            } else {
              j++            // closing quote
              break
            }
          } else {
            value += line[j]
            j++
          }
        }
        fields.push(value)
        i = j + 1  // skip past comma after closing quote
      } else {
        // Unquoted field
        let j = line.indexOf(',', i)
        if (j === -1) j = line.length
        fields.push(line.substring(i, j))
        i = j + 1
      }
    }
    return fields
  }

  return lines.slice(1).map((line) => {
    const cols = splitCSVLine(line)

    // Extract CSV-level fields
    const csvApp = appIdx !== -1 ? cols[appIdx] : null
    const csvId = idIdx !== -1 ? cols[idIdx] : null

    // Strategy 1: Extract from JSON payload
    if (payloadIdx !== -1 && cols[payloadIdx]) {
      try {
        let rawJson = cols[payloadIdx]
        if (rawJson.startsWith("{} {} ")) {
          rawJson = rawJson.substring(6)
        }

        const root = JSON.parse(rawJson)
        const data = root?.d?.Payload || root

        // Safely extract instruction pointer or use frames
        let symName = "Unsymbolicated"
        const rawFrames = data.crashLocation?.frames || data.frames || []
        const frames = rawFrames.map(f => ({
          ...f,
          isSDKFrame: f.isSDKFrame !== undefined ? f.isSDKFrame : (f.moduleName && (f.moduleName.includes("Nudgecore_iOS") || f.moduleName.includes("CrashReporter")))
        }))
        // Try to find the first SDK frame
        const sdkFrame = frames.find(f => f.isSDKFrame) || frames[0]

        if (sdkFrame && sdkFrame.instructionPointer) {
          symName = sdkFrame.symbolName || sdkFrame.instructionPointer
        } else if (data.crashLocation?.symbolName) {
          symName = data.crashLocation.symbolName
        }

        // Extract symbolication metadata (addresses, loadAddress, uuid) from the payload
        const symbolicationData = data.symbolication || null

        // Use CSV-level app column first, then JSON-level, for client name
        const clientName = csvApp || root.app || data.client || "Unknown Client"

        const crash = {
          id: csvId || data.id || data.crash_id || `CRH-${Math.floor(Math.random() * 10000)}`,
          client: clientName,
          clientId: data.clientId || clientName || "client-unknown",
          signal: data.signal || "UNKNOWN",
          exceptionName: data.exceptionName || data.note || "Unknown Exception",
          timestamp: data.timestamp || new Date().toISOString(),
          appVersion: data.appInfo?.appVersion || data.appVersion || "0.0.0",
          osVersion: data.systemInfo?.osVersion || data.osVersion || "0.0.0",
          architecture: data.systemInfo?.architecture || data.architecture || "arm64",
          sdkVersion: data.sdkVersion || "0.0.0",
          crashLocation: {
            moduleName: sdkFrame?.moduleName || "Unknown",
            symbolName: symName,
            demangledName: "Unknown",
            // Store necessary info for symbolication
            instructionPointer: sdkFrame?.instructionPointer || data.crashLocation?.instructionPointer,
            loadAddress: data.crashLocation?.loadAddress || data.loadAddress // Captured from iOS
          },
          // Store the full symbolication metadata from the payload
          symbolication: symbolicationData,
          frames: frames,
          status: data.status || "Open",
          severity: data.severity || (data.kind === "suspected_crash" ? "Low" : "High"),
          device: data.device || {},
          breadcrumbs: data.breadcrumbs || [],
          http: data.http || {},
          user: data.user || {},
          exceptionReason: data.exceptionReason || ""
        }
        return crash
      } catch (e) {
        console.error("Failed to parse payload", e)
      }
    }

    return {
      id: cols[0] || "CRH-?",
      client: "Imported",
      clientId: "imported",
      signal: "UNKNOWN",
      exceptionName: "Imported Crash",
      timestamp: new Date().toISOString(),
      crashLocation: { symbolName: "Unsymbolicated" },
      status: "Open",
      severity: "Medium"
    }
  }).filter(Boolean)
}

// Batch symbolication
const symbolicateCrashes = async (crashesList, apiUrl) => {
  // Group by SDK version AND Load Address (since ASLR slide varies per session)
  const groups = {}

  crashesList.forEach(c => {
    // Use symbolication object if available, fall back to crashLocation
    const sym = c.symbolication
    const loadAddr = sym?.loadAddress || c.crashLocation?.loadAddress || null
    const sdkVersion = sym?.sdkVersion || c.sdkVersion
    const uuid = sym?.uuid || null

    if (!sdkVersion) return

    // Collect all addresses: prefer symbolication.addresses, fall back to crashLocation IP
    const addresses = sym?.addresses || (c.crashLocation?.instructionPointer ? [c.crashLocation.instructionPointer] : [])
    if (addresses.length === 0) return

    const key = `${sdkVersion}|${loadAddr || 'default'}`

    if (!groups[key]) {
      groups[key] = { sdkVersion, loadAddress: loadAddr, uuid, addresses: new Set(), items: [] }
    }
    addresses.forEach(a => groups[key].addresses.add(a))
    groups[key].items.push(c)
  })

  const updates = new Map()

  for (const grp of Object.values(groups)) {
    const addresses = [...grp.addresses]
    if (addresses.length === 0) continue

    try {
      const payload = { sdkVersion: grp.sdkVersion, addresses }
      if (grp.loadAddress) payload.loadAddress = grp.loadAddress
      if (grp.uuid) payload.uuid = grp.uuid

      const res = await fetch(`${apiUrl}/symbolicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.results) {
        Object.entries(data.results).forEach(([addr, sym]) => {
          updates.set(addr, sym)
        })
      }
    } catch (e) {
      console.error(`Symbolication failed for SDK ${grp.sdkVersion}`, e)
    }
  }

  // Return updated list — update crashLocation AND individual frames
  return crashesList.map(c => {
    let updated = false

    // Update crashLocation symbol
    const addr = c.crashLocation?.instructionPointer
    let newCrashLocation = c.crashLocation
    if (addr && updates.has(addr)) {
      const resolved = updates.get(addr)
      newCrashLocation = {
        ...c.crashLocation,
        symbolName: resolved,
        demangledName: resolved
      }
      updated = true
    }

    // Update individual frames with symbolicated names
    const newFrames = c.frames?.map(f => {
      if (f.instructionPointer && updates.has(f.instructionPointer)) {
        updated = true
        return {
          ...f,
          symbolName: updates.get(f.instructionPointer)
        }
      }
      return f
    })

    if (updated) {
      return {
        ...c,
        crashLocation: newCrashLocation,
        frames: newFrames || c.frames
      }
    }
    return c
  })
}

const CrashDashboard = () => {
  const [crashes, setCrashes] = useState(initialCrashes)
  const [currentView, setCurrentView] = useState("home")
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedCrash, setSelectedCrash] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [peekCrash, setPeekCrash] = useState(null)
  const [manualLoadAddress, setManualLoadAddress] = useState("")
  const [symbolicationApiUrl, setSymbolicationApiUrl] = useState("http://localhost:3001")
  const [darkMode, setDarkMode] = useState(false)

  const handleManualSymbolication = async () => {
    if (!selectedCrash || !manualLoadAddress) return

    const c = selectedCrash
    const addr = c.crashLocation.instructionPointer
    if (!addr) {
      alert("No instruction pointer to symbolicate")
      return
    }

    try {
      const res = await fetch(`${symbolicationApiUrl}/symbolicate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sdkVersion: c.sdkVersion,
          addresses: [addr],
          loadAddress: manualLoadAddress
        })
      })
      const data = await res.json()
      if (data.results && data.results[addr]) {
        const newSymbol = data.results[addr]
        // Update the crash in the list
        setCrashes(prev => prev.map(crash => {
          if (crash.id === c.id) {
            return {
              ...crash,
              crashLocation: {
                ...crash.crashLocation,
                symbolName: newSymbol,
                demangledName: newSymbol
              }
            }
          }
          return crash
        }))
        // Update selected crash as well
        setSelectedCrash(prev => ({
          ...prev,
          crashLocation: {
            ...prev.crashLocation,
            symbolName: newSymbol,
            demangledName: newSymbol
          }
        }))
        alert(`Symbolicated: ${newSymbol}`)
      } else {
        alert("Failed to symbolicate (no result)")
      }
    } catch (e) {
      console.error(e)
      alert("Error invoking symbolication")
    }
  }


  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [filterClients, setFilterClients] = useState([])
  const [filterStatuses, setFilterStatuses] = useState([])
  const [filterSeverities, setFilterSeverities] = useState([])
  const [dateRange, setDateRange] = useState("All")
  const [customRange, setCustomRange] = useState({ start: "", end: "" })
  const [useUTC, setUseUTC] = useState(false)

  // Keyboard shortcuts
  const searchRef = useRef(null)
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/" && !e.metaKey && !e.ctrlKey) {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key.toLowerCase() === "c" && window.__lastKey === "g") {
        setCurrentView("clients")
      }
      if (e.key.toLowerCase() === "a" && window.__lastKey === "g") {
        setCurrentView("analytics")
      }
      window.__lastKey = e.key.toLowerCase()
      setTimeout(() => (window.__lastKey = ""), 600)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (event) => {
      const parsed = parseCSV(event.target.result)
      if (parsed.length > 0) {
        setCrashes(parsed)
        // Trigger symbolication
        const symbolicated = await symbolicateCrashes(parsed, symbolicationApiUrl)
        setCrashes(symbolicated)
        alert(`Loaded ${parsed.length} crashes (and attempted symbolication)`)
      } else {
        alert("No valid crashes found in CSV")
      }
    }
    reader.readAsText(file) // fixed syntax error
  }

  // Unique lists
  const clients = ["Big Basket", "Jar", "Acko", "Nykaa"]
  const statuses = ["Open", "Investigating", "Resolved"]
  const severities = ["Critical", "High", "Medium", "Low"]

  // Date filtering
  const inRange = (ts) => {
    const t = new Date(ts).getTime()
    const now = Date.now()
    if (dateRange === "All") return true
    if (dateRange === "Today") {
      const d = new Date(ts)
      const a = useUTC ? d.toUTCString().slice(0, 16) : d.toDateString()
      const b = useUTC
        ? new Date().toUTCString().slice(0, 16)
        : new Date().toDateString()
      return a === b
    }
    if (dateRange === "24h") return t >= now - 24 * 60 * 60 * 1000
    if (dateRange === "7d") return t >= now - 7 * 24 * 60 * 60 * 1000
    if (dateRange === "Custom" && customRange.start && customRange.end) {
      const s = new Date(customRange.start).getTime()
      const e = new Date(customRange.end).getTime()
      return t >= s && t <= e
    }
    return true
  }

  // Client stats
  const clientStats = useMemo(() => {
    const stats = {}
    crashes.forEach((crash) => {
      if (!stats[crash.clientId]) {
        stats[crash.clientId] = {
          name: crash.client,
          totalCrashes: 0,
          openCrashes: 0,
          criticalCrashes: 0,
          lastCrash: crash.timestamp,
          id: crash.clientId,
        }
      }
      stats[crash.clientId].totalCrashes++
      if (crash.status === "Open") stats[crash.clientId].openCrashes++
      if (crash.severity === "Critical") stats[crash.clientId].criticalCrashes++
      if (
        new Date(crash.timestamp) > new Date(stats[crash.clientId].lastCrash)
      ) {
        stats[crash.clientId].lastCrash = crash.timestamp
      }
    })
    return Object.values(stats)
  }, [crashes])

  // Fingerprinted groups
  const groups = useMemo(() => {
    const map = new Map()
    crashes.forEach((c) => {
      const key = fingerprint(c)
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(c)
    })
    return [...map.entries()].map(([fp, items]) => ({ fp, items }))
  }, [])

  // Filters
  const filteredCrashes = useMemo(() => {
    let list = crashes.filter((c) => inRange(c.timestamp))
    if (selectedClient)
      list = list.filter((c) => c.clientId === selectedClient.id)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (c) =>
          c.id.toLowerCase().includes(q) ||
          c.client.toLowerCase().includes(q) ||
          c.exceptionName.toLowerCase().includes(q) ||
          c.crashLocation.symbolName.toLowerCase().includes(q)
      )
    }
    if (filterClients.length)
      list = list.filter((c) => filterClients.includes(c.client))
    if (filterStatuses.length)
      list = list.filter((c) => filterStatuses.includes(c.status))
    if (filterSeverities.length)
      list = list.filter((c) => filterSeverities.includes(c.severity))
    return list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }, [
    searchQuery,
    selectedClient,
    filterClients,
    filterStatuses,
    filterSeverities,
    dateRange,
    customRange,
    useUTC,
    crashes,
  ])

  // Stats
  const stats = useMemo(
    () => ({
      total: crashes.length,
      open: crashes.filter((c) => c.status === "Open").length,
      critical: crashes.filter((c) => c.severity === "Critical").length,
      affectedClients: new Set(crashes.map((c) => c.client)).size,
    }),
    [crashes]
  ) // Added dependency

  const recentCrashes = useMemo(
    () =>
      [...crashes]
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .slice(0, 5),
    [crashes]
  )  // Added dependency

  // Release health (per appVersion)
  const versions = useMemo(
    () => [...new Set(crashes.map((c) => c.appVersion))],
    [crashes]
  )
  const releaseHealth = useMemo(() => {
    const byVersion = {}
    versions.forEach((ver) => {
      const events = crashes.filter((c) => c.appVersion === ver)
      const first = events.reduce(
        (min, c) => (new Date(c.timestamp) < new Date(min) ? c.timestamp : min),
        events[0]?.timestamp
      )
      const series24 = build24hSeries(events, useUTC)
      const peakIdx = series24.indexOf(Math.max(...series24))
      byVersion[ver] = {
        timeToFirstCrashMinutes: 0,
        peakCrashBucket: peakIdx,
        series24,
        total: events.length,
      }
    })
    return byVersion
  }, [versions, useUTC])

  // Regression detector (per fingerprint)
  const regressions = useMemo(() => {
    return groups
      .map((g) => {
        const series = build7dDailySeries(g.items)
        return { fp: g.fp, series, score: zscore(series) }
      })
      .filter((r) => r.score > 2.5)
      .sort((a, b) => b.score - a.score)
  }, [groups])

  // Heatmaps
  const heat_os_app = useMemo(() => {
    const rowKeys = [...new Set(crashes.map((c) => c.appVersion))].sort()
    const colKeys = [...new Set(crashes.map((c) => c.osVersion))].sort()
    const grid = rowKeys.map((r) => colKeys.map((c) => 0))
    crashes.forEach((x) => {
      const i = rowKeys.indexOf(x.appVersion)
      const j = colKeys.indexOf(x.osVersion)
      if (i >= 0 && j >= 0) grid[i][j]++
    })
    const max = Math.max(0, ...grid.flat())
    return { rows: rowKeys, cols: colKeys, grid, max }
  }, [crashes])

  const heat_client_sev = useMemo(() => {
    const rowKeys = [...new Set(crashes.map((c) => c.client))].sort()
    const colKeys = ["Critical", "High", "Medium", "Low"]
    const grid = rowKeys.map((r) => colKeys.map((c) => 0))
    crashes.forEach((x) => {
      const i = rowKeys.indexOf(x.client)
      const j = colKeys.indexOf(x.severity)
      if (i >= 0 && j >= 0) grid[i][j]++
    })
    const max = Math.max(0, ...grid.flat())
    return { rows: rowKeys, cols: colKeys, grid, max }
  }, [crashes])

  // UI helpers
  const toggleIn = (value, list, setter) => {
    if (list.includes(value)) setter(list.filter((v) => v !== value))
    else setter([...list, value])
  }

  const Sidebar = () => (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"
        } ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-100'} border-r shadow-sm transition-all duration-300 flex flex-col`}
    >
      <div className={`p-6 border-b ${darkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center'>
            <BarChart3 className='text-white' size={20} />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Crashboard</h2>
              <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>Nudge SDK Monitor</p>
            </div>
          )}
        </div>
      </div>

      <nav className='flex-1 p-4 space-y-1'>
        {[
          { key: "home", icon: Home, label: "Dashboard" },
          { key: "crashes", icon: AlertCircle, label: "Crashes" },
          { key: "clients", icon: Users, label: "Clients" },
          { key: "analytics", icon: BarChart3, label: "Analytics" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setCurrentView(item.key)
              setSelectedClient(null)
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === item.key
              ? (darkMode ? "bg-neutral-800 text-white border border-neutral-700" : "bg-gray-900 text-white border border-gray-700")
              : (darkMode ? "text-neutral-300 hover:bg-neutral-800" : "text-gray-900 hover:bg-gray-100")
              }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span className='font-medium'>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className={`p-4 border-t ${darkMode ? 'border-neutral-800' : 'border-gray-100'} space-y-4`}>
        {sidebarOpen && (
          <div>
            <div className={`text-xs font-semibold uppercase tracking-wider mb-2 px-1 ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`}>
              Symbolication Server
            </div>
            <div className='relative'>
              <Globe className={`absolute left-3 top-2.5 h-4 w-4 ${darkMode ? 'text-neutral-600' : 'text-gray-400'}`} />
              <input
                type='text'
                placeholder='Server URL'
                value={symbolicationApiUrl}
                onChange={(e) => setSymbolicationApiUrl(e.target.value)}
                className={`w-full pl-9 pr-3 py-2 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white placeholder-neutral-600' : 'bg-gray-50 border-gray-200'}`}
              />
            </div>
          </div>
        )}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${darkMode ? 'text-neutral-300 hover:bg-neutral-800' : 'text-gray-900 hover:bg-gray-100'}`}
        >
          <Menu size={20} />
          {sidebarOpen && <span className='font-medium'>Collapse</span>}
        </button>
      </div>
    </div>
  )

  const FilterBar = () => (
    <div className={`flex flex-wrap gap-3 items-center p-4 rounded-lg border ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
      <div className={`flex items-center gap-2 text-sm ${darkMode ? 'text-neutral-500' : 'text-gray-600'}`}>
        <Filter size={16} />
        <span>Filters</span>
      </div>

      {/* Date Range */}
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className={`px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-gray-300'}`}
      >
        <option value='24h'>Last 24 hours</option>
        <option value='7d'>Last 7 days</option>
        <option value='Today'>Today</option>
        <option value='All'>All time</option>
      </select>

      {/* Status Filter */}
      <select
        value={filterStatuses[0] || ""}
        onChange={(e) =>
          setFilterStatuses(e.target.value ? [e.target.value] : [])
        }
        className={`px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-white border-gray-300'}`}
      >
        <option value=''>All statuses</option>
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Severity Filter */}
      <select
        value={filterSeverities[0] || ""}
        onChange={(e) =>
          setFilterSeverities(e.target.value ? [e.target.value] : [])
        }
        className='px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
      >
        <option value=''>All severities</option>
        {severities.map((severity) => (
          <option key={severity} value={severity}>
            {severity}
          </option>
        ))}
      </select>

      <div className='ml-auto flex items-center gap-2'>
        <button
          onClick={() => setUseUTC((v) => !v)}
          className={`px-3 py-2 text-sm border rounded-lg transition-colors ${useUTC
            ? "bg-blue-50 border-blue-200 text-blue-700"
            : (darkMode ? "bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700" : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50")
            }`}
        >
          {useUTC ? "UTC" : "Local"}
        </button>
      </div>
    </div>
  )

  const HomeView = () => (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Overview ⚡️</h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
            Current SDK crash metrics
          </p>
        </div>
        <div className='flex items-center gap-3'>
          {crashes.length > 0 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium'
            >
              <Upload size={16} />
              Import CSV
            </button>
          )}
          <div className='relative w-80'>
            <Search
              className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
              size={18}
            />
            <input
              ref={searchRef}
              type='text'
              placeholder='Search crashes, clients... ( / )'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600' : 'bg-white border-gray-300'}`}
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          <div className='flex items-center justify-between mb-4'>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-neutral-500' : 'text-gray-600'}`}>Total Crashes</h3>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
              <AlertCircle className={darkMode ? 'text-blue-400' : 'text-blue-600'} size={20} />
            </div>
          </div>
          <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.total}</p>
        </div>

        <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          <div className='flex items-center justify-between mb-4'>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-neutral-500' : 'text-gray-600'}`}>Open Issues</h3>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-orange-500/10' : 'bg-orange-50'}`}>
              <Activity className={darkMode ? 'text-orange-400' : 'text-orange-600'} size={20} />
            </div>
          </div>
          <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{stats.open}</p>
        </div>

        <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          <div className='flex items-center justify-between mb-4'>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-neutral-500' : 'text-gray-600'}`}>Critical</h3>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
              <Shield className={darkMode ? 'text-red-400' : 'text-red-600'} size={20} />
            </div>
          </div>
          <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {stats.critical}
          </p>
        </div>

        <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          <div className='flex items-center justify-between mb-4'>
            <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Affected Clients
            </h3>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${darkMode ? 'bg-green-500/10' : 'bg-green-50'}`}>
              <Users className={darkMode ? 'text-green-400' : 'text-green-600'} size={20} />
            </div>
          </div>
          <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            {stats.affectedClients}
          </p>
        </div>
      </div>

      {/* Recent Crashes */}
      {/* Recent Crashes or Empty State */}
      {crashes.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${darkMode ? 'bg-neutral-900 border-neutral-800 border-dashed' : 'bg-white border-dashed border-gray-300'}`}>
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-neutral-800' : 'bg-gray-50'}`}>
            <Upload className={darkMode ? 'text-neutral-600' : 'text-gray-400'} size={24} />
          </div>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No crashes loaded yet
          </h3>
          <p className={`text-sm mb-6 max-w-sm mx-auto ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
            Upload a CSV file to populate the dashboard with crash data and start investigating.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-medium ${darkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
          >
            <Upload size={16} />
            Import CSV
          </button>
        </div>
      ) : (
        <div className={`rounded-xl border shadow-sm ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          <div className={`p-6 border-b ${darkMode ? 'border-neutral-800' : 'border-gray-100'}`}>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Recent Crashes
                </h2>
                <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                  Latest reported issues from your SDK
                </p>
              </div>
              <button
                onClick={() => setCurrentView("crashes")}
                className='text-sm text-blue-600 hover:text-blue-700 font-medium'
              >
                View all
              </button>
            </div>
          </div>

          <div className='divide-y divide-gray-100'>
            {recentCrashes.map((crash) => (
              <div
                key={crash.id}
                className={`p-6 transition-colors group ${darkMode ? 'hover:bg-neutral-800' : 'hover:bg-gray-50'}`}
              >
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <div className='flex items-center gap-3 mb-3'>
                      <span className={`font-mono text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {crash.id}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getSeverityStyles(
                          crash.severity
                        )}`}
                      >
                        {crash.severity}
                      </span>
                      <span
                        className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                          crash.status
                        )}`}
                      >
                        {crash.status}
                      </span>
                    </div>

                    <p className={`text-sm mb-2 line-clamp-1 ${darkMode ? 'text-neutral-400' : 'text-gray-600'}`}>
                      {crash.exceptionName} in {crash.crashLocation.symbolName}
                    </p>

                    <div className={`flex items-center gap-4 text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                      <span className='flex items-center gap-1'>
                        <Users size={12} />
                        {crash.client}
                      </span>
                      <span>•</span>
                      <span className='flex items-center gap-1'>
                        <Clock size={12} />
                        {formatTimestamp(crash.timestamp, useUTC)}
                      </span>
                    </div>
                  </div>

                  <div className='flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity'>
                    <button
                      onClick={() => setPeekCrash(crash)}
                      className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors'
                      title='Quick view'
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => setSelectedCrash(crash)}
                      className='px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors'
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const ClientsView = () => (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Client Management 📚
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
            View and manage client crash reports
          </p>
        </div>
        <div className='relative w-96'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='text'
            placeholder='Search clients…'
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600' : 'bg-white border-gray-300'}`}
          />
        </div>
      </div>

      {clientStats.length === 0 ? (
        <div className={`rounded-xl border p-12 text-center ${darkMode ? 'bg-neutral-900 border-neutral-800 border-dashed' : 'bg-white border-dashed border-gray-300'}`}>
          <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${darkMode ? 'bg-neutral-800' : 'bg-gray-50'}`}>
            <Upload className={darkMode ? 'text-neutral-600' : 'text-gray-400'} size={24} />
          </div>
          <h3 className={`text-lg font-semibold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            No clients found
          </h3>
          <p className={`text-sm mb-6 max-w-sm mx-auto ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
            Upload a CSV file to populate the dashboard with crash data and view client information.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-medium ${darkMode ? 'bg-white text-black hover:bg-neutral-200' : 'bg-gray-900 text-white hover:bg-gray-800'}`}
          >
            <Upload size={16} />
            Import CSV
          </button>
        </div>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {clientStats.map((client) => (
            <button
              key={client.id}
              onClick={() => setSelectedClient(client)}
              className={`rounded-xl p-6 border shadow-sm transition-all text-left group ${darkMode ? 'bg-neutral-900 border-neutral-800 hover:shadow-md hover:border-neutral-700' : 'bg-white border-gray-200 hover:shadow-md hover:border-gray-300'}`}
            >
              <div className='flex items-center gap-3 mb-4'>
                {/* <div className='w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center'>
                  <span className='text-lg font-semibold text-white'>
                    {client.name.charAt(0)}
                  </span>
                </div> */}
                <div className='flex-1'>
                  <h3 className={`font-semibold transition-colors ${darkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
                    {client.name}
                  </h3>
                  <p className='text-xs text-gray-500'>Client ID: {client.id}</p>
                </div>
              </div>

              <div className='grid grid-cols-3 gap-4 mb-4'>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Total</p>
                  <p className='text-lg font-semibold text-gray-900'>
                    {client.totalCrashes}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Open</p>
                  <p className='text-lg font-semibold text-red-600'>
                    {client.openCrashes}
                  </p>
                </div>
                <div>
                  <p className='text-xs text-gray-500 mb-1'>Critical</p>
                  <p className='text-lg font-semibold text-orange-600'>
                    {client.criticalCrashes}
                  </p>
                </div>
              </div>

              <div className='pt-4 border-t border-gray-100'>
                <p className='text-xs text-gray-500'>Last crash</p>
                <p className='text-sm text-gray-700 mt-1'>
                  {formatTimestamp(client.lastCrash, useUTC)}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )

  const ClientDetailView = () => {
    const clientCrashes = filteredCrashes.filter(
      (c) => c.clientId === selectedClient.id
    )

    return (
      <div className='space-y-6'>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => setSelectedClient(null)}
            className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900'
          >
            <ChevronRight size={20} className='rotate-180' />
          </button>
          <div>
            <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedClient.name}
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
              Detailed crash analytics
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className={`p-6 rounded-xl border shadow-sm ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
            <p className={`text-sm mb-1 ${darkMode ? 'text-neutral-500' : 'text-gray-600'}`}>Total Crashes</p>
            <p className={`text-3xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {selectedClient.totalCrashes}
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
            <p className='text-sm text-gray-600 mb-1'>Open Issues</p>
            <p className='text-3xl font-semibold text-red-600'>
              {selectedClient.openCrashes}
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
            <p className='text-sm text-gray-600 mb-1'>Critical</p>
            <p className='text-3xl font-semibold text-orange-600'>
              {selectedClient.criticalCrashes}
            </p>
          </div>
          <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
            <p className='text-sm text-gray-600 mb-1'>Resolved</p>
            <p className='text-3xl font-semibold text-green-600'>
              {clientCrashes.filter((c) => c.status === "Resolved").length}
            </p>
          </div>
        </div>

        <CrashesTableView crashes={clientCrashes} />
      </div>
    )
  }

  const CrashesView = () => (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            All Crashes 💥
          </h1>
          <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
            Complete crash history and analytics
          </p>
        </div>
        <div className='relative w-96'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            ref={searchRef}
            type='text'
            placeholder='Search crashes, symbols, exceptions ( / )'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${darkMode ? 'bg-neutral-900 border-neutral-800 text-white placeholder-neutral-600' : 'bg-white border-gray-300'}`}
          />
        </div>
      </div>

      <FilterBar />

      <CrashesTableView crashes={filteredCrashes} />
    </div>
  )

  const AnalyticsView = () => {
    // Top offenders: by fingerprint
    const topOffenders = [...groups]
      .map((g) => ({ ...g, count: g.items.length }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8)

    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className={`text-2xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Analytics ⚒️
            </h1>
            <p className={`text-sm mt-1 ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
              Release health, offenders, heatmaps & regressions
            </p>
          </div>
          <div className='flex items-center gap-2'>
            <Clock size={16} />
            <span className='text-sm text-gray-600'>
              Range: {dateRange === "Custom" ? "Custom" : dateRange}
            </span>
            <span className='text-gray-300'>•</span>
            <button
              onClick={() => setUseUTC((v) => !v)}
              className={`text-xs px-2 py-1 border rounded-md ${darkMode ? 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-700' : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'}`}
            >
              {useUTC ? "UTC" : "Local"}
            </button>
          </div>
        </div>

        {/* Row 1: Release Health + Top Offenders */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className={`border rounded-xl p-6 ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
            <div className='flex items-center gap-2 mb-4'>
              <Gauge size={18} className='text-blue-600' />
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Release Health (24h)
              </h3>
            </div>
            <div className='space-y-4'>
              {versions.map((ver) => (
                <div
                  key={ver}
                  className='flex items-center justify-between gap-4'
                >
                  <div className='min-w-[160px]'>
                    <div className='text-sm font-medium text-gray-900'>
                      {ver}
                    </div>
                    <div className='text-xs text-gray-500'>
                      Peak bucket: {releaseHealth[ver].peakCrashBucket}/23 •
                      Total: {releaseHealth[ver].total}
                    </div>
                  </div>
                  <div className='flex-1 text-gray-700'>
                    <Sparkline values={releaseHealth[ver].series24} />
                  </div>
                </div>
              ))}
              {versions.length === 0 && (
                <div className='text-sm text-gray-500'>No versions found.</div>
              )}
            </div>
          </div>

          <div className='bg-white border border-gray-200 rounded-xl p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <Flame size={18} className='text-orange-600' />
              <h3 className='font-semibold text-gray-900'>Top Offenders</h3>
            </div>
            <div className='divide-y divide-gray-100'>
              {topOffenders.map((g, idx) => {
                const share = ((g.count / crashes.length) * 100).toFixed(0)
                return (
                  <div
                    key={g.fp}
                    className='py-3 flex items-center justify-between gap-4'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-600'>
                        {idx + 1}
                      </span>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {g.fp}
                        </div>
                        <div className='text-xs text-gray-500'>
                          {share}% of crashes
                        </div>
                      </div>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Sparkline values={build24hSeries(g.items, useUTC)} />
                      <span className='font-mono text-sm text-gray-900'>
                        {g.count}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Row 2: Heatmaps */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <HeatmapCard title='OS Version × App Version' model={heat_os_app} />
          <HeatmapCard title='Client × Severity' model={heat_client_sev} />
        </div>

        {/* Row 3: Regression Detector */}
        <div className='bg-white border border-gray-200 rounded-xl p-6'>
          <div className='flex items-center gap-2 mb-4'>
            <TrendingUp size={18} className='text-red-600' />
            <h3 className='font-semibold text-gray-900'>
              Regression Detector (last 7 days → today)
            </h3>
          </div>
          {regressions.length === 0 ? (
            <div className='text-sm text-gray-500'>
              No significant regressions detected (z &gt; 2.5).
            </div>
          ) : (
            <div className='divide-y divide-gray-100'>
              {regressions.map((r) => (
                <div
                  key={r.fp}
                  className='py-3 flex items-center justify-between'
                >
                  <div className='flex items-center gap-3'>
                    <span className='inline-flex items-center px-2 py-0.5 text-xs rounded-md bg-red-50 text-red-700 border border-red-200'>
                      ⚠ Regression
                    </span>
                    <div className='text-sm font-medium text-gray-900'>
                      {r.fp}
                    </div>
                  </div>
                  <div className='flex items-center gap-3 text-gray-700'>
                    <Sparkline values={r.series} />
                    <span className='text-xs text-gray-500'>
                      z={r.score.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  const CrashesTableView = ({ crashes }) => {
    const seriesMap = useMemo(() => {
      const map = new Map()
      groups.forEach((g) => map.set(g.fp, build24hSeries(g.items, useUTC)))
      return map
    }, [groups, useUTC])

    return (
      <div className={`rounded-xl border shadow-sm overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='bg-gray-50 border-b border-gray-200'>
              <tr>
                <Th>ID</Th>
                <Th>Client</Th>
                <Th>Exception</Th>
                <Th>Timestamp</Th>
                <Th>Severity</Th>
                <Th>Status</Th>
                <Th>Trend</Th>
                <Th>Actions</Th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {crashes.map((crash) => {
                const fp = fingerprint(crash)
                const ser = seriesMap.get(fp) || []
                return (
                  <tr
                    key={crash.id}
                    className='hover:bg-gray-50 transition-colors group'
                  >
                    <Td>
                      <div className='flex items-center gap-2'>
                        <span className='font-mono text-sm font-medium text-gray-900'>
                          {crash.id}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div className='flex items-center gap-3'>
                        <div className='w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg flex items-center justify-center'>
                          <span className='text-sm font-medium text-white'>
                            {crash.client.charAt(0)}
                          </span>
                        </div>
                        <span className='text-sm text-gray-900'>
                          {crash.client}
                        </span>
                      </div>
                    </Td>
                    <Td>
                      <div>
                        <div className='text-sm font-medium text-gray-900'>
                          {crash.signal}
                        </div>
                        <div className='text-xs text-gray-500 truncate max-w-[200px]'>
                          {crash.exceptionName}
                        </div>
                      </div>
                    </Td>
                    <Td className='text-sm text-gray-600'>
                      {formatTimestamp(crash.timestamp, useUTC)}
                    </Td>
                    <Td>
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getSeverityStyles(
                          crash.severity
                        )}`}
                      >
                        {crash.severity}
                      </span>
                    </Td>
                    <Td>
                      <span
                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                          crash.status
                        )}`}
                      >
                        {crash.status}
                      </span>
                    </Td>
                    <Td>
                      <div className='text-gray-400'>
                        <Sparkline values={ser} />
                      </div>
                    </Td>
                    <Td>
                      <div className='flex items-center gap-2'>
                        <button
                          onClick={() => setPeekCrash(crash)}
                          className='p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100'
                          title='Quick view'
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setSelectedCrash(crash)}
                          className='text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors'
                        >
                          View
                        </button>
                      </div>
                    </Td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {crashes.length === 0 && (
          <div className='text-center py-12'>
            <AlertCircle className='mx-auto text-gray-300 mb-3' size={48} />
            <p className='text-gray-500'>
              No crashes found matching your filters
            </p>
          </div>
        )}

        <div className='px-6 py-4 border-t border-gray-200 bg-gray-50'>
          <p className='text-sm text-gray-600'>
            Showing {filteredCrashes.length} of {crashes.length} crashes (Total Loaded)
          </p>
        </div>
      </div>
    )
  }

  const CrashDetailModal = () => {
    if (!selectedCrash) return null
    const c = selectedCrash
    const [selectedFrame, setSelectedFrame] = useState(null)

    // Generate a human-readable crash report summary
    const reportSummary = useMemo(() => {
      const sections = []
      const frames = c.frames || []
      const sdkFrames = frames.filter(f => f.isSDKFrame)
      const nonSdkFrames = frames.filter(f => !f.isSDKFrame)
      const device = c.device || {}
      const freeRAM = typeof device.freeRAMMB === 'number' ? device.freeRAMMB : null
      const battery = typeof device.batteryLevel === 'number' ? Math.round(device.batteryLevel * 100) : null
      const exceptionReason = c.exceptionReason || ""

      // --- 1. What Happened ---
      const whatHappened = []
      whatHappened.push(`The app received a ${c.signal || 'crash'} signal with a ${c.exceptionName || 'unknown'} exception.`)
      if (exceptionReason) {
        whatHappened.push(`Exception reason: "${exceptionReason}"`)
      }

      // Detect known crash patterns
      const isOOM = c.exceptionName === 'NSMallocException' || exceptionReason.toLowerCase().includes('allocate')
      const isUnrecognizedSelector = exceptionReason.includes('unrecognized selector')
      const isSIGSEGV = c.signal === 'SIGSEGV'
      const isSIGTRAP = c.signal === 'SIGTRAP'

      if (isOOM) {
        whatHappened.push('This is an Out of Memory (OOM) crash — the system could not allocate memory for an object.')
      } else if (isUnrecognizedSelector) {
        const selectorMatch = exceptionReason.match(/\[(\S+)\s+(\S+)\]/)
        if (selectorMatch) {
          whatHappened.push(`A message "${selectorMatch[2]}" was sent to an object of class "${selectorMatch[1]}" which does not respond to it. This typically indicates type confusion or a dangling pointer.`)
        }
      } else if (isSIGSEGV) {
        whatHappened.push('The process tried to access invalid memory (null pointer dereference or use-after-free).')
      } else if (isSIGTRAP) {
        whatHappened.push('The process hit a trap instruction — typically a Swift runtime assertion failure, a force-unwrap of nil, or an array bounds violation.')
      }

      sections.push({ title: 'What Happened', items: whatHappened })

      // --- 2. Call Flow ---
      if (frames.length > 0) {
        const callFlow = []
        // Build bottom-up call flow from SDK frames
        const isPLCrashReporterFrame = (sym) => {
          if (!sym) return false
          const s = sym.toLowerCase()
          return s.includes('plcrashreporter') || s.includes('_plcrash') || s.includes('uncaught_exception_handler') || s.includes('async_mach_exception')
        }

        const plcrashFrames = sdkFrames.filter(f => isPLCrashReporterFrame(f.symbolName))
        const actualSdkFrames = sdkFrames.filter(f => !isPLCrashReporterFrame(f.symbolName))

        if (actualSdkFrames.length > 0) {
          const flowSteps = actualSdkFrames
            .sort((a, b) => (b.frameIndex || 0) - (a.frameIndex || 0))
            .map(f => f.symbolName || f.instructionPointer)
          callFlow.push('SDK call flow (bottom → top):')
          flowSteps.forEach((step, i) => {
            callFlow.push(`  ${i + 1}. ${step}`)
          })
        }

        if (plcrashFrames.length > 0 && actualSdkFrames.length === 0) {
          callFlow.push('The SDK frames are purely from PLCrashReporter recording the crash (crash reporting infrastructure), not the cause.')
        }

        if (callFlow.length > 0) {
          sections.push({ title: 'Call Flow', items: callFlow })
        }
      }

      // --- 3. Root Cause Attribution ---
      const attribution = []
      const isPLCrashOnly = sdkFrames.every(f => {
        const s = (f.symbolName || '').toLowerCase()
        return s.includes('plcrashreporter') || s.includes('_plcrash') || s.includes('uncaught_exception_handler') || s.includes('async_mach_exception') || s.includes('_plcrash_writer')
      })

      if (sdkFrames.length === 0) {
        attribution.push('⚪ No SDK frames in the stack trace. This crash does not appear related to the Nudgecore SDK.')
      } else if (isPLCrashOnly) {
        attribution.push('✅ SDK frames are only PLCrashReporter (crash recording infrastructure). This is a HOST APP crash, not an SDK issue.')
        attribution.push('The SDK was doing its job — catching and recording the uncaught exception thrown by the app.')
      } else {
        attribution.push('⚠️ SDK frames are present in the crash call flow. This crash appears to originate in or passes through Nudgecore SDK code.')
        const topSdkFrame = sdkFrames.sort((a, b) => (a.frameIndex || 0) - (b.frameIndex || 0))[0]
        if (topSdkFrame) {
          attribution.push(`Top SDK frame: ${topSdkFrame.symbolName || topSdkFrame.instructionPointer} (frame #${topSdkFrame.frameIndex})`)
        }
      }

      sections.push({ title: 'Root Cause Attribution', items: attribution })

      // --- 4. Device Context ---
      const context = []
      if (freeRAM !== null) {
        if (freeRAM < 50) {
          context.push(`🔴 Critically low free RAM: ${freeRAM.toFixed(1)} MB — memory pressure likely contributed to this crash.`)
        } else if (freeRAM < 150) {
          context.push(`🟡 Low free RAM: ${freeRAM.toFixed(1)} MB — the device was under moderate memory pressure.`)
        } else {
          context.push(`🟢 Free RAM: ${freeRAM.toFixed(1)} MB — memory pressure was not a factor.`)
        }
      }
      if (battery !== null && battery <= 15) {
        context.push(`🔋 Low battery: ${battery}% — the OS may throttle background processes.`)
      }
      if (device.model) {
        context.push(`Device: ${device.model}, iOS ${c.osVersion || 'Unknown'}`)
      }

      if (context.length > 0) {
        sections.push({ title: 'Device Context', items: context })
      }

      // --- 5. Verdict ---
      const verdict = []
      if (isOOM && freeRAM !== null && freeRAM < 100) {
        verdict.push('This crash is caused by memory exhaustion on a resource-constrained device. The host app (or one of its dependencies) exceeded available memory.')
        if (isPLCrashOnly) {
          verdict.push('The Nudgecore SDK is not at fault — it was only recording the crash.')
        }
      } else if (isPLCrashOnly && sdkFrames.length > 0) {
        verdict.push('The crash originated in the host app code. The Nudgecore SDK correctly caught and reported the exception.')
      } else if (sdkFrames.length > 0 && !isPLCrashOnly) {
        verdict.push('This crash involves Nudgecore SDK code and should be investigated by the SDK team.')
      }

      if (verdict.length > 0) {
        sections.push({ title: 'Verdict', items: verdict })
      }

      return sections
    }, [c])

    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/40 backdrop-blur-sm'
          onClick={() => setSelectedCrash(null)}
        />

        {/* Modal */}
        <div className={`relative w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border overflow-hidden ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          {/* Header */}
          <div className={`sticky top-0 z-10 border-b px-6 py-4 flex items-center justify-between ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{c.id}</h2>
              <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                {c.client} • {formatTimestamp(c.timestamp, useUTC)}
              </p>
            </div>
            <button
              onClick={() => setSelectedCrash(null)}
              className='p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600 hover:text-gray-900'
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          <div className='p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-64px)]'>
            {/* Overview */}
            <Section title='Overview' icon={Zap}>
              <div className='grid grid-cols-2 gap-3'>
                <KV k='Signal' v={c.signal} />
                <KV k='Exception' v={c.exceptionName} />
                <KV
                  k='Severity'
                  v={
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getSeverityStyles(
                        c.severity
                      )}`}
                    >
                      {c.severity}
                    </span>
                  }
                />
                <KV
                  k='Status'
                  v={
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  }
                />
              </div>
            </Section>

            {/* Report Summary */}
            {reportSummary.length > 0 && (
              <Section title='Report Summary' icon={FileText}>
                <div className={`rounded-xl border divide-y ${darkMode ? 'bg-neutral-800/50 border-neutral-700 divide-neutral-700' : 'bg-gradient-to-br from-slate-50 to-blue-50/30 border-slate-200 divide-slate-200'}`}>
                  {reportSummary.map((section, si) => (
                    <div key={si} className='px-4 py-3'>
                      <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2 ${section.title === 'Verdict'
                        ? (darkMode ? 'text-blue-400' : 'text-blue-700')
                        : section.title === 'Root Cause Attribution'
                          ? (darkMode ? 'text-amber-400' : 'text-amber-700')
                          : (darkMode ? 'text-neutral-400' : 'text-slate-500')
                        }`}>{section.title}</h4>
                      <div className='space-y-1'>
                        {section.items.map((item, ii) => (
                          <p key={ii} className={`text-sm leading-relaxed ${item.startsWith('  ')
                            ? `font-mono text-xs pl-3 ${darkMode ? 'text-neutral-300' : 'text-slate-600'}`
                            : (darkMode ? 'text-neutral-200' : 'text-slate-700')
                            }`}>{item}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {/* System Information */}
            <Section title='System Information' icon={Activity}>
              <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5'>
                <Row a='App Version' b={c.appVersion} />
                <Row a='iOS Version' b={c.osVersion} />
                <Row a='Architecture' b={c.architecture} />
                <Row a='SDK Version' b={c.sdkVersion} />
              </div>
            </Section>

            {/* Device / Env */}
            <Section title='Device & Environment' icon={Smartphone}>
              <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5'>
                <Row a='Model' b={c.device?.model} />
                <Row a='Free RAM' b={`${c.device?.freeRAMMB} MB`} />
                <Row a='Free Storage' b={`${c.device?.freeStorageMB} MB`} />
                <Row
                  a='Battery'
                  b={`${Math.round((c.device?.batteryLevel || 0) * 100)}%`}
                />
                <Row a='Network' b={c.device?.networkType} />
                <Row a='User (hashed)' b={c.user?.idHash} />
                <Row a='Region' b={c.user?.region} />
              </div>
            </Section>



            <Section title='Crash Location' icon={AlertCircle}>
              <div className='bg-red-50 border border-red-200 rounded-xl p-4 space-y-3'>
                <KVMono k='Module' v={c.crashLocation.moduleName} />
                <KVMono k='Symbol' v={selectedFrame?.symbolName || c.crashLocation.symbolName} />
                <KVMono k='File' v={(selectedFrame ? parseLocation(selectedFrame.demangledName || selectedFrame.symbolName)?.filename : parseLocation(c.crashLocation.demangledName || c.crashLocation.symbolName)?.filename) || "-"} />
                <KVMono k='Line' v={(selectedFrame ? parseLocation(selectedFrame.demangledName || selectedFrame.symbolName)?.line : parseLocation(c.crashLocation.demangledName || c.crashLocation.symbolName)?.line) || "-"} />

                {(selectedFrame?.instructionPointer || (c.crashLocation.instructionPointer && c.crashLocation.symbolName !== c.crashLocation.instructionPointer)) && (
                  <KVMono k='Address' v={selectedFrame?.instructionPointer || c.crashLocation.instructionPointer} small />
                )}


                <div className="pt-2 mt-2 border-t border-red-200">
                  <p className="text-xs text-red-600 mb-1.5 font-medium">Manual Symbolication (Load Address)</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. 0x106404000"
                      className="text-sm font-mono flex-1 px-3 py-2 rounded-lg border border-red-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                      value={manualLoadAddress}
                      onChange={(e) => setManualLoadAddress(e.target.value)}
                    />
                    <button
                      onClick={handleManualSymbolication}
                      className="px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              </div>
            </Section>



            {/* Source Code Viewer */}
            {selectedFrame && (
              <div className="mb-6">
                <SourceCodeViewer frame={selectedFrame} sdkVersion={c.sdkVersion} />
              </div>
            )}

            {/* Frames */}
            {c.frames && c.frames.length > 0 && (
              <Section title='Stack Frames' icon={Layers}>
                <div className='bg-gray-50 border border-gray-200 rounded-xl overflow-hidden'>
                  <div className='overflow-x-auto'>
                    <table className='w-full text-sm text-left'>
                      <thead className='bg-gray-100 text-xs uppercase text-gray-500 font-medium'>
                        <tr>
                          <th className='px-4 py-2'>#</th>
                          <th className='px-4 py-2'>Module</th>
                          <th className='px-4 py-2'>Address</th>
                          <th className='px-4 py-2'>Symbol</th>
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {c.frames.map((frame, i) => (
                          <tr
                            key={i}
                            onClick={() => frame.isSDKFrame && setSelectedFrame(frame)}
                            className={`hover:bg-gray-100 cursor-pointer ${frame.isSDKFrame ? "bg-blue-50/50" : ""} ${selectedFrame === frame ? "bg-blue-100 ring-1 ring-blue-500" : ""}`}
                          >
                            <td className='px-4 py-2 text-gray-500 font-mono text-xs'>{i}</td>
                            <td className='px-4 py-2 font-medium text-gray-900'>{frame.moduleName || "?"}</td>
                            <td className='px-4 py-2 font-mono text-xs text-gray-600'>{frame.instructionPointer}</td>
                            <td className='px-4 py-2 font-mono text-xs text-gray-800 break-all'>
                              {frame.symbolName || <span className='text-gray-400 italic'>Unsymbolicated</span>}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>
            )}

            {/* Breadcrumbs */}
            <Section title='Breadcrumbs (last 10)' icon={SplitSquareVertical}>
              <div className='bg-gray-50 border border-gray-200 rounded-xl divide-y divide-gray-100'>
                {(c.breadcrumbs || []).slice(-10).map((b, i) => (
                  <div
                    key={i}
                    className='px-4 py-2 flex items-center justify-between text-sm'
                  >
                    <span className='text-gray-700'>{b.action}</span>
                    <span className='text-xs text-gray-500'>
                      {formatTimestamp(b.ts, useUTC)}
                    </span>
                  </div>
                ))}
              </div>
            </Section>


            {/* Actions */}
            <div className='flex gap-3 pt-2'>
              <button className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm'>
                View Full Stack Trace
              </button>
              <button className='px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2'>
                <Download size={18} />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const PeekDrawer = () => {
    if (!peekCrash) return null
    const c = peekCrash
    return (
      <div className='fixed inset-0 z-50 flex'>
        <div className='flex-1' onClick={() => setPeekCrash(null)} />
        <div className={`w-[520px] max-w-[90vw] h-full border-l shadow-2xl overflow-y-auto ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
          <div className={`sticky top-0 border-b px-6 py-4 flex items-center justify-between ${darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-gray-200'}`}>
            <div>
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{c.id}</h2>
              <p className={`text-xs ${darkMode ? 'text-neutral-500' : 'text-gray-500'}`}>
                {c.client} • {formatTimestamp(c.timestamp, useUTC)}
              </p>
            </div>
            <button
              onClick={() => setPeekCrash(null)}
              className='p-2 hover:bg-gray-100 rounded-lg text-gray-600 hover:text-gray-900'
            >
              <X size={18} />
            </button>
          </div>

          <div className='p-6 space-y-6'>
            {/* Overview */}
            <Section title='Overview' icon={Zap}>
              <div className='grid grid-cols-2 gap-3'>
                <KV k='Signal' v={c.signal} />
                <KV k='Exception' v={c.exceptionName} />
                <KV
                  k='Severity'
                  v={
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getSeverityStyles(
                        c.severity
                      )}`}
                    >
                      {c.severity}
                    </span>
                  }
                />
                <KV
                  k='Status'
                  v={
                    <span
                      className={`px-2.5 py-1 text-xs font-medium rounded-full ${getStatusStyles(
                        c.status
                      )}`}
                    >
                      {c.status}
                    </span>
                  }
                />
              </div>
            </Section>

            {/* System Information */}
            <Section title='System Information' icon={Activity}>
              <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5'>
                <Row a='App Version' b={c.appVersion} />
                <Row a='iOS Version' b={c.osVersion} />
                <Row a='Architecture' b={c.architecture} />
                <Row a='SDK Version' b={c.sdkVersion} />
              </div>
            </Section>

            {/* Device / Env */}
            <Section title='Device & Environment' icon={Smartphone}>
              <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 space-y-2.5'>
                <Row a='Model' b={c.device?.model} />
                <Row a='Free RAM' b={`${c.device?.freeRAMMB} MB`} />
                <Row a='Free Storage' b={`${c.device?.freeStorageMB} MB`} />
                <Row
                  a='Battery'
                  b={`${Math.round((c.device?.batteryLevel || 0) * 100)}%`}
                />
                <Row a='Network' b={c.device?.networkType} />
                <Row a='User (hashed)' b={c.user?.idHash} />
                <Row a='Region' b={c.user?.region} />
              </div>
            </Section>

            {/* Crash Location */}
            <Section title='Crash Location' icon={AlertCircle}>
              <div className='bg-red-50 border border-red-200 rounded-xl p-4 space-y-3'>
                <KVMono k='Module' v={c.crashLocation.moduleName} />
                <KVMono k='Symbol' v={c.crashLocation.symbolName} />
                <KVMono k='Demangled' v={c.crashLocation.demangledName} small />
              </div>
            </Section>

            {/* Breadcrumbs */}
            <Section title='Breadcrumbs (last 10)' icon={SplitSquareVertical}>
              <div className='bg-gray-50 border border-gray-200 rounded-xl divide-y divide-gray-100'>
                {(c.breadcrumbs || []).slice(-10).map((b, i) => (
                  <div
                    key={i}
                    className='px-4 py-2 flex items-center justify-between text-sm'
                  >
                    <span className='text-gray-700'>{b.action}</span>
                    <span className='text-xs text-gray-500'>
                      {formatTimestamp(b.ts, useUTC)}
                    </span>
                  </div>
                ))}
              </div>
            </Section>

            {/* HTTP status codes */}
            <Section title='Recent HTTP status codes' icon={FileText}>
              <div className='flex gap-2 flex-wrap'>
                {(c.http?.recentStatusCodes || []).map((code, i) => (
                  <span
                    key={i}
                    className={`text-xs px-2 py-1 rounded-md border ${code >= 500
                      ? "bg-red-50 border-red-200 text-red-700"
                      : code >= 400
                        ? "bg-amber-50 border-amber-200 text-amber-700"
                        : "bg-green-50 border-green-200 text-green-700"
                      }`}
                  >
                    {code}
                  </span>
                ))}
              </div>
            </Section>

            {/* Actions */}
            <div className='flex gap-3 pt-2'>
              <button className='flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium shadow-sm'>
                View Full Stack Trace
              </button>
              <button className='px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium flex items-center gap-2'>
                <Download size={18} />
                Download Report
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex h-screen w-full overflow-hidden ${darkMode ? 'bg-black' : 'bg-gray-50'}`}>
      <Sidebar />

      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-[1400px] mx-auto px-8 py-8'>
          {currentView === "home" && HomeView()}
          {currentView === "clients" && !selectedClient && ClientsView()}
          {currentView === "clients" && selectedClient && ClientDetailView()}
          {currentView === "crashes" && CrashesView()}
          {currentView === "analytics" && AnalyticsView()}
        </div>
      </div>

      {selectedCrash && <CrashDetailModal />}
      {peekCrash && <PeekDrawer />}

      {/* Hidden File Input */}
      <input
        type='file'
        accept='.csv'
        ref={fileInputRef}
        onChange={handleFileUpload}
        className='hidden'
      />
    </div>
  )
}

/**
 * -----------------
 * SMALL UI COMPONENTS
 * -----------------
 */

const Th = ({ children }) => (
  <th className='px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
    {children}
  </th>
)

const Td = ({ children, className = "" }) => (
  <td className={`px-6 py-4 ${className}`}>{children}</td>
)

const Section = ({ title, icon: Icon, children }) => (
  <div>
    <h3 className='text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2'>
      <Icon size={16} />
      {title}
    </h3>
    {children}
  </div>
)

const KV = ({ k, v }) => (
  <div className='bg-gray-50 p-3 rounded-lg border border-gray-200'>
    <p className='text-[11px] text-gray-500 mb-1'>{k}</p>
    <div className='text-sm font-medium text-gray-900'>{v}</div>
  </div>
)

const KVMono = ({ k, v, small }) => (
  <div>
    <p className='text-xs text-red-600 mb-1.5 font-medium'>{k}</p>
    <p
      className={`font-mono ${small ? "text-xs" : "text-sm"
        } text-red-900 bg-white px-3 py-2 rounded-lg border border-red-200 break-all`}
    >
      {v}
    </p>
  </div>
)

const Row = ({ a, b }) => (
  <div className='flex justify-between items-center'>
    <span className='text-sm text-gray-600'>{a}:</span>
    <span className='text-sm font-medium text-gray-900'>{b}</span>
  </div>
)

const HeatmapCard = ({ title, model }) => {
  const { rows, cols, grid, max } = model
  return (
    <div className='bg-white border border-gray-200 rounded-xl p-6'>
      <div className='flex items-center gap-2 mb-4'>
        <Grid2X2 size={18} className='text-blue-600' />
        <h3 className='font-semibold text-gray-900'>{title}</h3>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-[520px] w-full'>
          <thead>
            <tr>
              <th className='text-xs text-gray-500 text-left py-2 pr-2'>
                Row \ Col
              </th>
              {cols.map((c) => (
                <th
                  key={c}
                  className='text-xs text-gray-500 text-center py-2 px-2 font-normal'
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r}>
                <td className='text-xs text-gray-600 py-1 pr-2'>{r}</td>
                {cols.map((c, j) => {
                  const n = grid[i][j]
                  const color = heatColor(n, max)
                  return (
                    <td key={c} className='p-1'>
                      <div
                        className={`h-8 rounded ${color} border text-[11px] flex items-center justify-center ${n
                          ? "border-blue-300 text-gray-800"
                          : "border-gray-200 text-gray-400"
                          }`}
                      >
                        {n}
                      </div>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
// Helper component for Source Code
const SourceCodeViewer = ({ frame, sdkVersion }) => {
  const [source, setSource] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [repoOwner, setRepoOwner] = useState("nudgenow") // Default suggestion
  const [repoName, setRepoName] = useState("nudge-sdk-ios") // Default suggestion

  // Parse filename and line from symbol name
  const location = useMemo(() => parseLocation(frame.demangledName || frame.symbolName), [frame])

  const handleFetch = async () => {
    if (!location) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('http://localhost:3001/fetch-source', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: location.filename,
          line: location.line,
          sdkVersion: sdkVersion,
          repoOwner,
          repoName
        })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || "Failed to fetch source")
      setSource(data)
    } catch (err) {
      console.error(err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!location) return null

  return (
    <div className="mt-4 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
      <h4 className="text-sm font-medium text-neutral-300 mb-2 flex justify-between items-center">
        <span className="flex items-center gap-2">
          <FileText size={14} />
          Source Preview: <span className="text-blue-400 font-mono">{location.filename}:{location.line}</span>
        </span>

        {!source && (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Owner"
              value={repoOwner}
              onChange={e => setRepoOwner(e.target.value)}
              className="bg-neutral-800 text-xs px-2 py-1 rounded border border-neutral-700 w-24 text-white"
            />
            <input
              type="text"
              placeholder="Repo Name"
              value={repoName}
              onChange={e => setRepoName(e.target.value)}
              className="bg-neutral-800 text-xs px-2 py-1 rounded border border-neutral-700 w-32 text-white"
            />
            <button
              onClick={handleFetch}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1 rounded transition-colors disabled:opacity-50"
            >
              {loading ? "Fetching..." : "Fetch Code"}
            </button>
          </div>
        )}
      </h4>

      {error && (
        <div className="text-red-400 text-xs bg-red-900/20 p-2 rounded border border-red-900/30">
          Failed to load source: {error}. <br />
          Ensure <code>GITHUB_TOKEN</code> is set in <code>.env</code> on the server.
        </div>
      )}

      {source && (
        <div className="bg-neutral-950 rounded p-3 overflow-x-auto border border-neutral-800">
          <div className="text-xs text-neutral-500 mb-2 font-mono flex justify-between">
            <span>{source.filePath} @ {source.ref}</span>
            <button onClick={() => setSource(null)} className="hover:text-neutral-300">Close</button>
          </div>
          <pre className="font-mono text-xs leading-5 text-gray-300">
            {source.snippet.split('\n').map((line, i) => {
              const lineNum = source.startLine + i
              const isTarget = lineNum === source.targetLine
              return (
                <div key={i} className={`${isTarget ? "bg-blue-500/20 text-blue-200 w-full inline-block" : "text-neutral-400"}`}>
                  <span className="select-none text-neutral-600 w-8 inline-block text-right mr-3">{lineNum}</span>
                  {line}
                </div>
              )
            })}
          </pre>
        </div>
      )}
    </div>
  )
}

function parseLocation(symbolString) {
  if (!symbolString) return null
  // Matches "(ChallengesUI.swift:519)" or "(File.m:123)"
  // More robust: look for (filename:line) pattern at the end
  const match = symbolString.match(/\(([^:)]+):(\d+)\)/)
  if (match) {
    return { filename: match[1], line: parseInt(match[2]) }
  }
  return null
}
export default CrashDashboard
