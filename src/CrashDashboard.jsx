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
} from "lucide-react"

/**
 * ---------------------------------------
 * MOCK DATA (extended with device/env/user)
 * ---------------------------------------
 */



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

/**
 * -------------------------
 * HELPERS & DERIVED METRICS
 * -------------------------
 */

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

  // Check if we have a payload column
  let payloadIdx = headers.findIndex((h) => h.toLowerCase().includes("payload") || h.toLowerCase().includes("json"))
  if (payloadIdx === -1) {
    payloadIdx = headers.findIndex((h) => h.includes("any(body)"))
  }

  // Find id column if available
  const idIdx = headers.findIndex((h) => h.includes("trace_id") || h.includes("id"))

  return lines.slice(1).map((line) => {
    // Regex to split by comma but ignore commas inside quotes
    const cols = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(c =>
      c.trim().replace(/^"|"$/g, '').replace(/""/g, '"')
    )

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
        const frames = data.crashLocation?.frames || data.frames || []
        // Try to find the first SDK frame
        const sdkFrame = frames.find(f => f.isSDKFrame) || frames[0]

        if (sdkFrame && sdkFrame.instructionPointer) {
          symName = sdkFrame.symbolName || sdkFrame.instructionPointer
        } else if (data.crashLocation?.symbolName) {
          symName = data.crashLocation.symbolName
        }

        const crash = {
          id: (idIdx !== -1 ? cols[idIdx] : null) || data.id || data.crash_id || `CRH-${Math.floor(Math.random() * 10000)}`,
          client: root.app || data.client || "Unknown Client",
          clientId: data.clientId || root.app || "client-unknown",
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
          frames: frames,
          status: data.status || "Open",
          severity: data.severity || (data.kind === "suspected_crash" ? "Low" : "High"),
          device: data.device || {},
          breadcrumbs: data.breadcrumbs || [],
          http: data.http || {},
          user: data.user || {}
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
const symbolicateCrashes = async (crashesList) => {
  // Group by SDK version AND Load Address (since ASLR slide varies per session)
  const groups = {}

  crashesList.forEach(c => {
    if (c.sdkVersion && c.crashLocation?.instructionPointer) {
      const loadAddr = c.crashLocation.loadAddress || "default"
      const key = `${c.sdkVersion}|${loadAddr}`

      if (!groups[key]) {
        groups[key] = { sdkVersion: c.sdkVersion, loadAddress: loadAddr === "default" ? null : loadAddr, items: [] }
      }
      groups[key].items.push(c)
    }
  })

  const updates = new Map()

  for (const grp of Object.values(groups)) {
    const addresses = [...new Set(grp.items.map(c => c.crashLocation.instructionPointer))]
    if (addresses.length === 0) continue

    try {
      const payload = { sdkVersion: grp.sdkVersion, addresses }
      if (grp.loadAddress) payload.loadAddress = grp.loadAddress

      const res = await fetch('http://localhost:3001/symbolicate', {
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

  // Return updated list
  return crashesList.map(c => {
    const addr = c.crashLocation?.instructionPointer
    if (addr && updates.has(addr)) {
      const resolved = updates.get(addr)
      return {
        ...c,
        crashLocation: {
          ...c.crashLocation,
          symbolName: resolved,
          demangledName: resolved
        }
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

  const handleManualSymbolication = async () => {
    if (!selectedCrash || !manualLoadAddress) return

    const c = selectedCrash
    const addr = c.crashLocation.instructionPointer
    if (!addr) {
      alert("No instruction pointer to symbolicate")
      return
    }

    try {
      const res = await fetch('http://localhost:3001/symbolicate', {
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
  const [dateRange, setDateRange] = useState("24h")
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
        const symbolicated = await symbolicateCrashes(parsed)
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
  }, [])

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
  }, [])

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
  }, [])

  // UI helpers
  const toggleIn = (value, list, setter) => {
    if (list.includes(value)) setter(list.filter((v) => v !== value))
    else setter([...list, value])
  }

  const Sidebar = () => (
    <div
      className={`${sidebarOpen ? "w-64" : "w-20"
        } bg-white border-r border-gray-100 shadow-sm transition-all duration-300 flex flex-col`}
    >
      <div className='p-6 border-b border-gray-100'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center'>
            <BarChart3 className='text-white' size={20} />
          </div>
          {sidebarOpen && (
            <div>
              <h2 className='font-semibold text-gray-900'>Crashboard</h2>
              <p className='text-xs text-gray-500'>Nudge SDK Monitor</p>
            </div>
          )}
        </div>
      </div>

      <nav className='flex-1 p-4 space-y-1'>
        {[
          { key: "home", icon: Home, label: "Dashboard" },
          { key: "clients", icon: Users, label: "Clients" },
          { key: "crashes", icon: AlertCircle, label: "Crashes" },
          { key: "analytics", icon: BarChart3, label: "Analytics" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => {
              setCurrentView(item.key)
              setSelectedClient(null)
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${currentView === item.key
              ? "bg-gray-900 text-white border border-gray-700"
              : "text-gray-900 hover:bg-gray-100"
              }`}
          >
            <item.icon size={20} />
            {sidebarOpen && <span className='font-medium'>{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className='p-4 border-t border-gray-100'>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className='w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
        >
          <Menu size={20} />
          {sidebarOpen && <span className='font-medium'>Collapse</span>}
        </button>
      </div>
    </div>
  )

  const FilterBar = () => (
    <div className='flex flex-wrap gap-3 items-center p-4 bg-white rounded-lg border border-gray-200'>
      <div className='flex items-center gap-2 text-sm text-gray-600'>
        <Filter size={16} />
        <span>Filters</span>
      </div>

      {/* Date Range */}
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className='px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
        className='px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
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
            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
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
          <h1 className='text-2xl font-semibold text-gray-900'>Overview ⚡️</h1>
          <p className='text-sm text-gray-500 mt-1'>
            Current SDK crash metrics
          </p>
        </div>
        <div className='flex items-center gap-3'>
          <button
            onClick={() => fileInputRef.current?.click()}
            className='flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium'
          >
            <Upload size={16} />
            Import CSV
          </button>
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
              className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
            />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-sm font-medium text-gray-600'>Total Crashes</h3>
            <div className='w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center'>
              <AlertCircle className='text-blue-600' size={20} />
            </div>
          </div>
          <p className='text-3xl font-semibold text-gray-900'>{stats.total}</p>
        </div>

        <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-sm font-medium text-gray-600'>Open Issues</h3>
            <div className='w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center'>
              <Activity className='text-orange-600' size={20} />
            </div>
          </div>
          <p className='text-3xl font-semibold text-gray-900'>{stats.open}</p>
        </div>

        <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-sm font-medium text-gray-600'>Critical</h3>
            <div className='w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center'>
              <Shield className='text-red-600' size={20} />
            </div>
          </div>
          <p className='text-3xl font-semibold text-gray-900'>
            {stats.critical}
          </p>
        </div>

        <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-sm font-medium text-gray-600'>
              Affected Clients
            </h3>
            <div className='w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center'>
              <Users className='text-green-600' size={20} />
            </div>
          </div>
          <p className='text-3xl font-semibold text-gray-900'>
            {stats.affectedClients}
          </p>
        </div>
      </div>

      {/* Recent Crashes */}
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm'>
        <div className='p-6 border-b border-gray-100'>
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-gray-900'>
                Recent Crashes
              </h2>
              <p className='text-sm text-gray-500 mt-1'>
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
              className='p-6 hover:bg-gray-50 transition-colors group'
            >
              <div className='flex items-start justify-between'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-3'>
                    <span className='font-mono text-sm font-semibold text-gray-900'>
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

                  <p className='text-sm text-gray-600 mb-2 line-clamp-1'>
                    {crash.exceptionName} in {crash.crashLocation.symbolName}
                  </p>

                  <div className='flex items-center gap-4 text-xs text-gray-500'>
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
    </div>
  )

  const ClientsView = () => (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-semibold text-gray-900'>
            Client Management 📚
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
            View and manage client crash reports
          </p>
        </div>
        <div className='relative w-80'>
          <Search
            className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
            size={18}
          />
          <input
            type='text'
            placeholder='Search clients…'
            className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {clientStats.map((client) => (
          <button
            key={client.id}
            onClick={() => setSelectedClient(client)}
            className='bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition-all text-left group'
          >
            <div className='flex items-center gap-3 mb-4'>
              {/* <div className='w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl flex items-center justify-center'>
                <span className='text-lg font-semibold text-white'>
                  {client.name.charAt(0)}
                </span>
              </div> */}
              <div className='flex-1'>
                <h3 className='font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
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
            <h1 className='text-2xl font-semibold text-gray-900'>
              {selectedClient.name}
            </h1>
            <p className='text-sm text-gray-500 mt-1'>
              Detailed crash analytics
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          <div className='bg-white p-6 rounded-xl border border-gray-200 shadow-sm'>
            <p className='text-sm text-gray-600 mb-1'>Total Crashes</p>
            <p className='text-3xl font-semibold text-gray-900'>
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
          <h1 className='text-2xl font-semibold text-gray-900'>
            All Crashes 💥
          </h1>
          <p className='text-sm text-gray-500 mt-1'>
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
            className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white'
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
            <h1 className='text-2xl font-semibold text-gray-900'>
              Analytics ⚒️
            </h1>
            <p className='text-sm text-gray-500 mt-1'>
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
              className='text-xs px-2 py-1 border rounded-md bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
            >
              {useUTC ? "UTC" : "Local"}
            </button>
          </div>
        </div>

        {/* Row 1: Release Health + Top Offenders */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <div className='bg-white border border-gray-200 rounded-xl p-6'>
            <div className='flex items-center gap-2 mb-4'>
              <Gauge size={18} className='text-blue-600' />
              <h3 className='font-semibold text-gray-900'>
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
      <div className='bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden'>
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
            Showing {crashes.length} of {initialCrashes.length} crashes (Total Loaded)
          </p>
        </div>
      </div>
    )
  }

  const CrashDetailModal = () => {
    if (!selectedCrash) return null
    const c = selectedCrash

    return (
      <div className='fixed inset-0 z-50 flex items-center justify-center'>
        {/* Backdrop */}
        <div
          className='absolute inset-0 bg-black/40 backdrop-blur-sm'
          onClick={() => setSelectedCrash(null)}
        />

        {/* Modal */}
        <div className='relative bg-white w-full max-w-5xl max-h-[90vh] rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
          {/* Header */}
          <div className='sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>{c.id}</h2>
              <p className='text-xs text-gray-500'>
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
                {c.crashLocation.instructionPointer && c.crashLocation.symbolName !== c.crashLocation.instructionPointer && (
                  <KVMono k='Address' v={c.crashLocation.instructionPointer} small />
                )}
                <KVMono k='Demangled' v={c.crashLocation.demangledName} small />

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
                          <tr key={i} className={`hover:bg-gray-100 ${frame.isSDKFrame ? "bg-blue-50/50" : ""}`}>
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

  const PeekDrawer = () => {
    if (!peekCrash) return null
    const c = peekCrash
    return (
      <div className='fixed inset-0 z-50 flex'>
        <div className='flex-1' onClick={() => setPeekCrash(null)} />
        <div className='w-[520px] max-w-[90vw] h-full bg-white border-l border-gray-200 shadow-2xl overflow-y-auto'>
          <div className='sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between'>
            <div>
              <h2 className='text-lg font-semibold text-gray-900'>{c.id}</h2>
              <p className='text-xs text-gray-500'>
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
    <div className='flex h-screen bg-gray-50 w-full overflow-hidden'>
      <Sidebar />

      <div className='flex-1 overflow-y-auto'>
        <div className='max-w-[1400px] mx-auto px-8 py-8'>
          {currentView === "home" && <HomeView />}
          {currentView === "clients" && !selectedClient && <ClientsView />}
          {currentView === "clients" && selectedClient && <ClientDetailView />}
          {currentView === "crashes" && <CrashesView />}
          {currentView === "analytics" && <AnalyticsView />}
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

export default CrashDashboard
