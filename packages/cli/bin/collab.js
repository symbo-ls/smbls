#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { syncProjectChanges } from './sync.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, getConfigPaths } from '../helpers/config.js'
import { stringifyFunctionsForTransport } from '../helpers/transportUtils.js'
import { computeCoarseChanges, computeOrdersForTuples, preprocessChanges, threeWayRebase } from '../helpers/changesUtils.js'
import { createFs } from './fs.js'
import { applyOrderFields } from '../helpers/orderUtils.js'
import { logDesignSystemFlags } from '../helpers/designSystemDebug.js'
import {
  augmentProjectWithLocalPackageDependencies,
  ensureSchemaDependencies,
  findNearestPackageJson,
  syncPackageJsonDependencies
} from '../helpers/dependenciesUtils.js'

function getCollabStatePath () {
  const { symbolsDir } = getConfigPaths()
  return path.join(symbolsDir, 'collab.json')
}

function isPidAlive (pid) {
  if (!pid || typeof pid !== 'number') return false
  try {
    process.kill(pid, 0)
    return true
  } catch (_) {
    return false
  }
}

async function writeCollabState (partial) {
  const statePath = getCollabStatePath()
  const next = {
    pid: process.pid,
    startedAt: new Date().toISOString(),
    ...(partial || {})
  }
  try {
    await fs.promises.mkdir(path.dirname(statePath), { recursive: true })
    await fs.promises.writeFile(statePath, JSON.stringify(next, null, 2))
  } catch (_) {}
}

async function clearCollabState () {
  const statePath = getCollabStatePath()
  try {
    if (fs.existsSync(statePath)) await fs.promises.unlink(statePath)
  } catch (_) {}
}

// Lazy import socket.io-client and chokidar to avoid adding cost for non-collab users
async function importDeps () {
  const [{ default: io }, { default: chokidar }] = await Promise.all([
    import('socket.io-client'),
    import('chokidar')
  ])
  return { io, chokidar }
}

function clonePlain (obj) {
  try {
    // Node 18+ typically supports structuredClone
    // eslint-disable-next-line no-undef
    if (typeof structuredClone === 'function') return structuredClone(obj)
  } catch (_) {}
  try {
    return JSON.parse(JSON.stringify(obj || {}))
  } catch (_) {
    // Best effort; at least return a shallow copy
    return { ...(obj || {}) }
  }
}

// The platform may omit empty designSystem buckets. The CLI filesystem
// representation uses per-bucket files under `designSystem/`, so we keep
// these keys present (at least as `{}`) to avoid removing local bucket files.
const DESIGN_SYSTEM_BUCKET_KEYS = [
  'ANIMATION',
  'CASES',
  'CLASS',
  'COLOR',
  'FONT',
  'FONT_FAMILY',
  'GRADIENT',
  'GRID',
  'ICONS',
  'MEDIA',
  'RESET',
  'SHAPE',
  'SPACING',
  'THEME',
  'TIMING',
  'TYPOGRAPHY'
]

function ensureDesignSystemBuckets (designSystem) {
  if (!designSystem || typeof designSystem !== 'object' || Array.isArray(designSystem)) return designSystem
  for (let i = 0; i < DESIGN_SYSTEM_BUCKET_KEYS.length; i++) {
    const k = DESIGN_SYSTEM_BUCKET_KEYS[i]
    if (!Object.prototype.hasOwnProperty.call(designSystem, k)) designSystem[k] = {}
  }
  return designSystem
}

function toExportNameFromFileStem (stem) {
  // Mirror fs.js behavior loosely: kebab/snake/path -> camelCase export name.
  // e.g. "add-network" -> "addNetwork"
  if (!stem || typeof stem !== 'string') return stem
  const parts = stem.split(/[^a-zA-Z0-9]+/).filter(Boolean)
  if (!parts.length) return stem
  const first = parts[0]
  return (
    first +
    parts
      .slice(1)
      .map((p) => (p ? p[0].toUpperCase() + p.slice(1) : ''))
      .join('')
  )
}

function toPagesRouteKeyFromFileStem (stem) {
  // createFs writes `/foo` -> pages/foo.js and `/` -> pages/main.js
  if (!stem || typeof stem !== 'string') return stem
  if (stem === 'main') return '/'
  return `/${stem}`
}

function debounce (fn, wait) {
  let t = null
  const debounced = (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), wait)
  }
  debounced.cancel = () => {
    clearTimeout(t)
    t = null
  }
  return debounced
}

/**
 * Augment the loaded project object with any new items that exist as filesystem
 * files (e.g. newly created component/page/method/function/snippet files) but
 * are not yet present in the in-memory data object.
 *
 * This bridges the gap between the one-way createFs → files mapping so that
 * adding a new file like components/MainFooter.js is seen as a new
 * `components.MainFooter` data item and can be sent/merged.
 */
async function augmentLocalWithNewFsItems ({ local, distDir, outputDir, currentBase, options }) {
  if (!local || typeof local !== 'object') return

  const TYPES = ['components', 'pages', 'snippets', 'methods', 'functions', 'designSystem', 'files']

  for (let i = 0; i < TYPES.length; i++) {
    const type = TYPES[i]
    const srcDir = path.join(distDir, type)

    let entries
    try {
      entries = await fs.promises.readdir(srcDir)
    } catch {
      continue
    }
    if (!Array.isArray(entries) || !entries.length) continue

    const container = local[type] && typeof local[type] === 'object' && !Array.isArray(local[type])
      ? local[type]
      : (local[type] = {})
    const baseSection = currentBase && currentBase[type] && typeof currentBase[type] === 'object'
      ? currentBase[type]
      : {}

    for (let j = 0; j < entries.length; j++) {
      const filename = entries[j]
      if (!filename.endsWith('.js') || filename === 'index.js') continue

      const fileStem = filename.slice(0, -3)
      const key = type === 'pages'
        ? toPagesRouteKeyFromFileStem(fileStem)
        : fileStem
      const altKey = type === 'pages' ? fileStem : null

      // Skip if already present (support legacy/broken non-slash page keys too)
      if (Object.prototype.hasOwnProperty.call(container, key)) continue
      if (altKey && Object.prototype.hasOwnProperty.call(container, altKey)) continue
      if (Object.prototype.hasOwnProperty.call(baseSection, key)) continue
      if (altKey && Object.prototype.hasOwnProperty.call(baseSection, altKey)) continue

      const compiledPath = path.join(outputDir, type, filename)
      let mod
      try {
        const { loadModule } = await import('./require.js')
        mod = await loadModule(compiledPath, { silent: true })
      } catch {
        if (options?.verbose) {
          console.error(`Failed to load new ${type} item from`, compiledPath)
        }
        continue
      }

      if (!mod) continue

      let value = null
      if (mod && typeof mod === 'object') {
        const exportName = toExportNameFromFileStem(fileStem)
        value =
          mod.default ||
          mod[exportName] ||
          mod[fileStem] ||
          mod[key] ||
          (altKey ? mod[altKey] : null) ||
          null
      }
      if (!value || typeof value !== 'object') continue

      container[key] = value
    }
  }
}

export async function startCollab (options) {
  const symbolsConfig = await loadSymbolsConfig()
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)
  if (!authToken) {
    console.log(chalk.yellow('\nAuthentication required. Please run: smbls login\n'))
    process.exit(1)
  }

  const branch = options.branch || cliConfig.branch || symbolsConfig.branch || 'main'
  const appKey = cliConfig.projectKey || symbolsConfig.key

  // Write a runtime marker so other CLI commands can avoid double-syncing
  // when collab is running. Clear any stale marker (e.g. after a crash).
  try {
    const statePath = getCollabStatePath()
    if (fs.existsSync(statePath)) {
      const raw = await fs.promises.readFile(statePath, 'utf8')
      const prev = JSON.parse(raw)
      if (!isPidAlive(prev?.pid)) {
        await clearCollabState()
      }
    }
  } catch (_) {}

  const distDir =
    resolveDistDir(symbolsConfig) ||
    path.join(process.cwd(), 'smbls')

  const packageJsonPath = findNearestPackageJson(process.cwd())

  if (!appKey) {
    console.log(chalk.red('Missing project key. Add it to symbols.json or .symbols/config.json'))
    process.exit(1)
  }

  // Optionally run a full `sync` first. This keeps `collab` focused on realtime
  // socket + filesystem watching, and delegates all startup reconciliation to
  // the battle-tested sync logic.
  if (options.syncFirst !== false) {
    console.log(chalk.dim('\nRunning initial sync before starting collab...'))
    // `syncProjectChanges` manages its own prompts and will exit on fatal errors.
    // We pass the branch so startup sync aligns with the collab branch.
    await syncProjectChanges({ ...options, branch })
  }

  // Re-read lock after sync (it may have updated projectId/version/etag).
  const lock = readLock()

  const { io, chokidar } = await importDeps()
  const baseUrl = cliConfig.apiBaseUrl

  console.log(chalk.dim(`\nConnecting to realtime collab on ${baseUrl} ...`))

  await writeCollabState({
    branch,
    projectKey: appKey,
    projectId: lock.projectId || null,
    apiBaseUrl: baseUrl
  })

  const cleanup = async () => {
    await clearCollabState()
  }
  // Best-effort cleanup on normal exit and signals.
  process.once('exit', () => {
    try {
      const statePath = getCollabStatePath()
      if (fs.existsSync(statePath)) fs.unlinkSync(statePath)
    } catch (_) {}
  })
  process.once('SIGINT', () => cleanup().finally(() => process.exit(0)))
  process.once('SIGTERM', () => cleanup().finally(() => process.exit(0)))

  // Maintain in-memory base state and a guard to suppress local echoes
  // `remoteBase` tracks the latest known server snapshot (used for safe merges)
  let currentBase = {}
  let remoteBase = {}
  let suppressLocalChanges = false
  let suppressUntil = 0
  const suppressionWindowMs = Math.max(1500, (options.debounceMs || 200) * 8)
  // Debounced sender is initialized later (after startup merge/write),
  // but we may need to cancel it during startup writes.
  // Declare early to avoid TDZ crashes.
  let sendLocalChanges = null

  function isSuppressed () {
    return suppressLocalChanges || Date.now() < suppressUntil
  }

  function setByPath (root, pathArr = [], value) {
    if (!Array.isArray(pathArr) || !pathArr.length) return
    let cur = root
    for (let i = 0; i < pathArr.length - 1; i++) {
      const seg = pathArr[i]
      if (!cur[seg] || typeof cur[seg] !== 'object') cur[seg] = {}
      cur = cur[seg]
    }
    cur[pathArr[pathArr.length - 1]] = value
  }

  function deleteByPath (root, pathArr = []) {
    if (!Array.isArray(pathArr) || !pathArr.length) return
    let cur = root
    for (let i = 0; i < pathArr.length - 1; i++) {
      const seg = pathArr[i]
      if (!cur || typeof cur !== 'object') return
      cur = cur[seg]
    }
    if (cur && typeof cur === 'object') {
      delete cur[pathArr[pathArr.length - 1]]
    }
  }

  function applyTuples (root, tuples = []) {
    if (!root || typeof root !== 'object') return root
    if (!Array.isArray(tuples)) return root
    for (let i = 0; i < tuples.length; i++) {
      const t = tuples[i]
      if (!Array.isArray(t) || t.length < 2) continue
      const [action, pathArr, value] = t
      if (action === 'update' || action === 'set') {
        setByPath(root, pathArr, value)
      } else if (action === 'delete' || action === 'del') {
        deleteByPath(root, pathArr)
      }
    }
    return root
  }

  function applyOrders (root, orders = []) {
    if (!root || typeof root !== 'object') return
    if (!Array.isArray(orders)) return
    for (let i = 0; i < orders.length; i++) {
      const o = orders[i]
      if (!o || !Array.isArray(o.path) || !Array.isArray(o.keys)) continue
      // Ensure container exists
      setByPath(root, o.path, (function ensure (obj) {
        return obj && typeof obj === 'object' ? obj : {}
      })(pathArrGet(root, o.path)))
      // Now set __order on that container
      const container = pathArrGet(root, o.path)
      if (container && typeof container === 'object') {
        container.__order = o.keys.slice()
      }
    }
  }

  function pathArrGet (root, pathArr = []) {
    if (!Array.isArray(pathArr) || !pathArr.length) return root
    let cur = root
    for (let i = 0; i < pathArr.length; i++) {
      if (!cur || typeof cur !== 'object') return undefined
      cur = cur[pathArr[i]]
    }
    return cur
  }

  async function writeProjectAndFs (fullObj) {
    // Apply platform ordering while avoiding persisting `__order` locally
    const persistedObj = applyOrderFields(fullObj)
    if (options.verbose) {
      logDesignSystemFlags('collab: after applyOrderFields (before createFs)', persistedObj?.designSystem, { enabled: true })
    }
    try { ensureDesignSystemBuckets(persistedObj?.designSystem) } catch (_) {}
    // Keep schema.dependencies consistent and sync dependencies into local package.json
    try {
      ensureSchemaDependencies(persistedObj)
      if (packageJsonPath && persistedObj?.dependencies) {
        syncPackageJsonDependencies(packageJsonPath, persistedObj.dependencies, { overwriteExisting: true })
      }
    } catch (_) {}

    const { projectPath } = getConfigPaths()
    try {
      await fs.promises.writeFile(projectPath, JSON.stringify(persistedObj, null, 2))
    } catch (_) {}
    // Avoid echoing the changes we are about to materialize
    suppressLocalChanges = true
    // Cancel any pending local send
    if (typeof sendLocalChanges?.cancel === 'function') {
      sendLocalChanges.cancel()
    }
    try {
      await createFs(persistedObj, distDir, { update: true, metadata: false })
    } finally {
      // Extend suppression window to allow file events to settle fully
      suppressUntil = Date.now() + suppressionWindowMs
      suppressLocalChanges = false
    }
  }

  // Load the last persisted snapshot (the same snapshot `sync` writes).
  // This is our initial base for both local diffs and socket snapshot merges.
  const baseSnapshot = (() => {
    try {
      const { projectPath } = getConfigPaths()
      const raw = fs.readFileSync(projectPath, 'utf8')
      return JSON.parse(raw)
    } catch (_) {
      return {}
    }
  })()
  try { ensureDesignSystemBuckets(baseSnapshot?.designSystem) } catch (_) {}
  try {
    ensureSchemaDependencies(baseSnapshot)
    if (packageJsonPath && baseSnapshot?.dependencies) {
      syncPackageJsonDependencies(packageJsonPath, baseSnapshot.dependencies, { overwriteExisting: true })
    }
  } catch (_) {}

  currentBase = stringifyFunctionsForTransport(baseSnapshot || {})
  remoteBase = clonePlain(currentBase)

  // Paths for local build/watch loop
  const outputDir = path.join(distDir, 'dist')
  const outputFile = path.join(outputDir, 'index.js')

  // Connect to the collab namespace with required auth fields
  const socket = io(`${baseUrl}`, {
    path: '/collab-socket',
    transports: ['websocket', 'polling'],
    // Server expects these fields on handshake.auth
    auth: {
      token: authToken,
      projectId: (lock.projectId || null),
      projectKey: appKey,
      key: appKey,
      branch,
      live: !!options.live,
      clientType: 'cli'
    },
    // Some servers verify headers; keep Authorization for completeness
    extraHeaders: { Authorization: `Bearer ${authToken}` },
    reconnection: true,
    reconnectionAttempts: Infinity,
    reconnectionDelay: 1000,
    timeout: 10000
  })

  socket.on('connect', () => {
    console.log(chalk.green('Connected to collab server'))
  })

  socket.on('disconnect', (reason) => {
    console.log(chalk.yellow(`Disconnected: ${reason}`))
  })

  socket.on('connect_error', (err) => {
    console.log(chalk.red(`Connection error: ${err?.message || err}`))
  })

  // Receive snapshot and update local files + lock/base
  socket.on('snapshot', async ({ version, branch: srvBranch, data, schema }) => {
    const incomingRaw = { ...(data || {}), schema: schema || {}, version, branch: srvBranch }
    const incoming = stringifyFunctionsForTransport(incomingRaw)
    try { ensureDesignSystemBuckets(incoming?.designSystem) } catch (_) {}
    // Merge snapshot with any local edits since the last server base, preferring local.
    try {
      const base = remoteBase || {}
      const local = currentBase || {}
      const remote = incoming
      const { ours } = threeWayRebase(base, local, remote)
      const merged = clonePlain(remote)
      // Apply local changes over remote snapshot (local wins on conflicts)
      applyTuples(merged, ours)
      try { ensureDesignSystemBuckets(merged?.designSystem) } catch (_) {}
      remoteBase = clonePlain(remote)
      currentBase = merged
      await writeProjectAndFs(currentBase)
      writeLock({ version, branch: srvBranch, pulledAt: new Date().toISOString() })
      console.log(chalk.gray(`Snapshot applied (merged). Version: ${chalk.cyan(version)}`))
    } catch (e) {
      // Fallback: do not clobber local state on snapshot errors.
      if (options.verbose) console.error('Failed to merge snapshot:', e?.message || e)
    }
  })

  // Receive granular ops from other clients/commits and apply to local files
  socket.on('ops', async (payload) => {
    // Apply incoming tuples directly to local base; do not re-emit builds triggered by this apply
    try {
      if (typeof sendLocalChanges?.cancel === 'function') {
        sendLocalChanges.cancel()
      }
      const tuples = Array.isArray(payload?.granularChanges) && payload.granularChanges.length
        ? payload.granularChanges
        : preprocessChanges(currentBase || {}, payload?.changes || []).granularChanges
      if (!Array.isArray(tuples) || !tuples.length) return
      // Track server-side evolution separately for safer snapshot merges
      try { applyTuples(remoteBase, tuples) } catch (_) {}
      applyTuples(currentBase, tuples)
      // Apply server-provided ordering metadata so newly added keys don't just
      // append to the end locally.
      let orders = payload?.orders
      if (typeof orders === 'string') {
        try { orders = JSON.parse(orders) } catch (_) {}
      }
      applyOrders(currentBase, orders)
      // If server omits schema.dependencies updates, ensure it's present locally
      ensureSchemaDependencies(currentBase)
      await writeProjectAndFs(currentBase)
      writeLock({ pulledAt: new Date().toISOString() })
      if (options.verbose) console.log(chalk.gray('Applied incoming ops to local workspace'))
    } catch (e) {
      if (options.verbose) console.error('Failed to apply incoming ops', e)
    }
  })

  socket.on('commit', ({ version }) => {
    writeLock({ version, pulledAt: new Date().toISOString() })
    console.log(chalk.gray(`Server committed new version: ${chalk.cyan(version)}`))
  })

  // Watch local dist output and push coarse per-key changes
  // Build loader
  async function loadLocalProject () {
    try {
      // Reuse build flow from push/sync
      const { buildDirectory } = await import('../helpers/fileUtils.js')
      const { loadModule } = await import('./require.js')
      await buildDirectory(distDir, outputDir)
      const loaded = await loadModule(outputFile, { silent: true, noCache: true })
      // `loadModule` returns the module's default export (a plain object)
      return loaded
    } catch (e) {
      if (options.verbose) console.error('Build failed while watching:', e.message)
      return null
    }
  }

  sendLocalChanges = debounce(async () => {
    if (suppressLocalChanges) return
    let local = await loadLocalProject()
    if (!local) return
    await augmentLocalWithNewFsItems({ local, distDir, outputDir, currentBase, options })
    // Include package.json deps into local snapshot so dependency edits can be synced
    local = augmentProjectWithLocalPackageDependencies(local, packageJsonPath) || local
    // Prepare safe, JSON-serialisable snapshots for diffing & transport
    const base = currentBase || {}
    const safeBase = stringifyFunctionsForTransport(base)
    const safeLocal = stringifyFunctionsForTransport(local)
    // Base snapshot is our last pulled .symbols/project.json
    const changes = computeCoarseChanges(safeBase, safeLocal)
    if (!changes.length) return
    if (options.verbose) {
      const byType = changes.reduce((acc, [t]) => {
        acc[t] = (acc[t] || 0) + 1
        return acc
      }, {})
      console.log(chalk.gray(`Emitting local ops: ${JSON.stringify(byType)}`))
    }
    // Generate granular changes against base to ensure downstream consumers have fine ops
    const { granularChanges } = preprocessChanges(safeBase, changes)
    const orders = computeOrdersForTuples(safeLocal, granularChanges)
    console.log(chalk.gray(`Emitting local ops: ${JSON.stringify({ changes, granularChanges, orders, branch })}`))

    // Optimistically apply our own ops to the in-memory base so that
    // subsequent diffs are computed against the latest local state.
    // This avoids repeatedly re-emitting the same changes when the
    // server does not immediately send back a fresh snapshot.
    try {
      const tuplesToApply = Array.isArray(granularChanges) && granularChanges.length
        ? granularChanges
        : changes
      applyTuples(currentBase, tuplesToApply)
    } catch (e) {
      if (options.verbose) {
        console.error('Failed to apply local ops to in-memory base', e)
      }
    }

    socket.emit('ops', {
      changes,
      granularChanges,
      orders,
      branch
    })
  }, options.debounceMs || 200)

  const watcher = chokidar.watch(distDir, {
    ignored: (p) => {
      // Ignore hidden files, build output directory, and temporary files
      if (/(^|[/\\])\./.test(p)) return true
      if (p.includes(`${path.sep}dist${path.sep}`) || p.endsWith(`${path.sep}dist`)) return true
      return false
    },
    ignoreInitial: true,
    persistent: true
  })
  const onFsEvent = () => {
    if (isSuppressed()) return
    if (typeof sendLocalChanges === 'function') sendLocalChanges()
  }
  watcher
    .on('add', onFsEvent)
    .on('change', onFsEvent)
    .on('unlink', onFsEvent)

  // Also watch package.json for dependency changes
  if (packageJsonPath) {
    const pkgWatcher = chokidar.watch(packageJsonPath, {
      ignoreInitial: true,
      persistent: true
    })
    pkgWatcher
      .on('add', onFsEvent)
      .on('change', onFsEvent)
      .on('unlink', onFsEvent)
  }

  console.log(chalk.green('Watching local changes and syncing over socket...'))
  console.log(chalk.gray('Press Ctrl+C to exit'))
}

program
  .command('collab')
  .description('Connect to realtime collaboration socket and live-sync changes')
  .option('-b, --branch <branch>', 'Branch to collaborate on')
  .option('--no-sync-first', 'Skip initial sync (not recommended)')
  .option('-l, --live', 'Enable live collaboration mode', false)
  .option('-d, --debounce-ms <ms>', 'Local changes debounce milliseconds', (v) => parseInt(v, 10), 200)
  .option('-v, --verbose', 'Show verbose output', false)
  .action(startCollab)
