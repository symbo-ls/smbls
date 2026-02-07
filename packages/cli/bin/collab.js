#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, getConfigPaths } from '../helpers/config.js'
import { stringifyFunctionsForTransport } from '../helpers/transportUtils.js'
import { getCurrentProjectData } from '../helpers/apiUtils.js'
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

async function resolveTopLevelConflicts (conflictsKeys, ours, theirs) {
  const choices = conflictsKeys.map((key) => {
    const ourChange = ours.find((c) => c[1][0] === key)
    const theirChange = theirs.find((c) => c[1][0] === key)
    return {
      name: `${chalk.cyan(key)}  ${chalk.green('Local')} vs ${chalk.red('Remote')}`,
      value: key,
      short: key,
      description: `${chalk.green('+ Local:')} ${JSON.stringify(ourChange?.[2])}
${chalk.red('- Remote:')} ${JSON.stringify(theirChange?.[2])}`
    }
  })

  const { selected } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'selected',
    message: 'Conflicts detected. Select the keys to keep from Local (unchecked will keep Remote):',
    choices,
    pageSize: 10
  }])

  const final = conflictsKeys.map((key) => {
    if (selected.includes(key)) {
      return ours.find((c) => c[1][0] === key)
    }
    return theirs.find((c) => c[1][0] === key)
  }).filter(Boolean)

  return final
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

  const lock = readLock()
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
  let pendingInitialOps = null
  let skipRemoteWrites = false
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

  // Load last persisted snapshot (base) before touching the filesystem.
  const baseSnapshot = (() => {
    try {
      const { projectPath } = getConfigPaths()
      const raw = fs.readFileSync(projectPath, 'utf8')
      return JSON.parse(raw)
    } catch (_) {
      return {}
    }
  })()

  // Prime remote snapshot from server (but do NOT overwrite local files yet).
  const prime = await getCurrentProjectData(
    { projectKey: appKey, projectId: lock.projectId },
    authToken,
    { branch, includePending: true }
  )
  const initialDataRaw = prime?.data || {}
  if (options.verbose) {
    logDesignSystemFlags('collab: prime raw snapshot (from API)', initialDataRaw?.designSystem, { enabled: true })
  }
  const initialData = stringifyFunctionsForTransport(initialDataRaw)
  try {
    ensureSchemaDependencies(initialData)
    if (packageJsonPath && initialData?.dependencies) {
      syncPackageJsonDependencies(packageJsonPath, initialData.dependencies, { overwriteExisting: true })
    }
  } catch (_) {}
  remoteBase = clonePlain(initialData)

  // Build local project for merge detection. If it fails, we will avoid any destructive overwrite.
  const outputDir = path.join(distDir, 'dist')
  const outputFile = path.join(outputDir, 'index.js')
  async function buildLocalForStartup () {
    try {
      const { buildDirectory } = await import('../helpers/fileUtils.js')
      const { loadModule } = await import('./require.js')
      await buildDirectory(distDir, outputDir)
      const loaded = await loadModule(outputFile, { silent: true, noCache: true })
      let local = loaded
      await augmentLocalWithNewFsItems({ local, distDir, outputDir, currentBase: baseSnapshot, options })
      local = augmentProjectWithLocalPackageDependencies(local, packageJsonPath) || local
      return stringifyFunctionsForTransport(local)
    } catch (e) {
      if (options.verbose) {
        console.error(chalk.yellow('Startup build failed; will not overwrite local files:'), e?.message || e)
      }
      return null
    }
  }

  const localBuilt = await buildLocalForStartup()
  if (localBuilt == null) {
    // Safest path: keep local filesystem as-is; treat currentBase as what we last knew.
    currentBase = stringifyFunctionsForTransport(baseSnapshot || {})
    skipRemoteWrites = true
    console.log(chalk.yellow('Local project build failed; remote changes will not be applied to avoid overwriting local files. Fix the build and restart `smbls collab`.'))
  } else {
    const base = stringifyFunctionsForTransport(baseSnapshot || {})
    const local = localBuilt
    const remote = remoteBase
    const { ours, theirs, conflicts } = threeWayRebase(base, local, remote)

    if (ours.length) {
      // Local changes exist; prompt user to merge vs discard.
      const conflictNote = conflicts.length ? chalk.yellow(` (${conflicts.length} conflicts)`) : ''
      const isInteractive = !!(process.stdin && process.stdin.isTTY && process.stdout && process.stdout.isTTY)
      let action = 'merge'
      if (isInteractive) {
        const answer = await inquirer.prompt([{
          type: 'list',
          name: 'action',
          message: `Local changes detected${conflictNote}. How should collab start?`,
          choices: [
            { name: 'Merge: keep local changes (recommended)', value: 'merge' },
            { name: 'Discard: overwrite local files with remote snapshot', value: 'discard' },
            { name: 'Cancel', value: 'cancel' }
          ],
          default: 0
        }])
        action = answer.action
      } else {
        console.log(chalk.yellow(`Local changes detected${conflictNote}. Non-interactive mode: defaulting to merge (keep local).`))
      }

      if (action === 'cancel') {
        console.log(chalk.yellow('Collab cancelled'))
        process.exit(0)
      }

      if (action === 'discard') {
        currentBase = clonePlain(remoteBase)
        await writeProjectAndFs(currentBase)
      } else {
        // Merge local onto remote; for conflicts ask user to choose per top-level key.
        let toApply = ours
        if (conflicts.length) {
          const chosen = isInteractive
            ? await resolveTopLevelConflicts(conflicts, ours, theirs)
            // Non-interactive: prefer local for conflicting top-level keys
            : conflicts.map((k) => ours.find((c) => c[1][0] === k)).filter(Boolean)
          const nonConflictOurs = ours.filter(([_, [k]]) => !conflicts.includes(k))
          toApply = [...nonConflictOurs, ...chosen]
        }

        const merged = clonePlain(remoteBase)
        applyTuples(merged, toApply)
        currentBase = merged
        await writeProjectAndFs(currentBase)

        // Queue initial ops to push local changes up to the server once connected.
        try {
          const changes = computeCoarseChanges(remoteBase, currentBase)
          if (changes.length) {
            const { granularChanges } = preprocessChanges(remoteBase, changes)
            const orders = computeOrdersForTuples(currentBase, granularChanges)
            pendingInitialOps = { changes, granularChanges, orders }
          }
        } catch (_) {}
      }
    } else {
      // No local changes; safe to materialize remote snapshot.
      currentBase = clonePlain(remoteBase)
      await writeProjectAndFs(currentBase)
    }
  }

  // Update lock after we’ve safely established an initial local state.
  const etag = prime?.etag || null
  writeLock({
    etag,
    version: initialDataRaw.version,
    branch,
    projectId: initialDataRaw?.projectInfo?.id || lock.projectId,
    pulledAt: new Date().toISOString()
  })

  // Persist current base snapshot (so restart won’t drop local merged state).
  try {
    const { projectPath } = getConfigPaths()
    await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
    await fs.promises.writeFile(projectPath, JSON.stringify(applyOrderFields(currentBase), null, 2))
  } catch (_) {}

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
    if (pendingInitialOps && pendingInitialOps.changes && pendingInitialOps.changes.length) {
      try {
        socket.emit('ops', {
          changes: pendingInitialOps.changes,
          granularChanges: pendingInitialOps.granularChanges,
          orders: pendingInitialOps.orders,
          branch
        })
        if (options.verbose) {
          console.log(chalk.gray('Pushed startup local changes to server'))
        }
      } catch (e) {
        if (options.verbose) console.error('Failed to push startup ops:', e?.message || e)
      } finally {
        pendingInitialOps = null
      }
    }
  })

  socket.on('disconnect', (reason) => {
    console.log(chalk.yellow(`Disconnected: ${reason}`))
  })

  socket.on('connect_error', (err) => {
    console.log(chalk.red(`Connection error: ${err?.message || err}`))
  })

  // Receive snapshot and update local files + lock/base
  socket.on('snapshot', async ({ version, branch: srvBranch, data, schema }) => {
    if (skipRemoteWrites) {
      // Do not overwrite local files when startup build failed.
      // Still track server state for later retries/restarts.
      try {
        const incomingRaw = { ...(data || {}), schema: schema || {}, version, branch: srvBranch }
        remoteBase = stringifyFunctionsForTransport(incomingRaw)
        writeLock({ version, branch: srvBranch, pulledAt: new Date().toISOString() })
      } catch (_) {}
      return
    }
    const incomingRaw = { ...(data || {}), schema: schema || {}, version, branch: srvBranch }
    const incoming = stringifyFunctionsForTransport(incomingRaw)
    // Merge snapshot with any local edits since the last server base, preferring local.
    try {
      const base = remoteBase || {}
      const local = currentBase || {}
      const remote = incoming
      const { ours } = threeWayRebase(base, local, remote)
      const merged = clonePlain(remote)
      // Apply local changes over remote snapshot (local wins on conflicts)
      applyTuples(merged, ours)
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
      if (skipRemoteWrites) return
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
  .option('-l, --live', 'Enable live collaboration mode', false)
  .option('-d, --debounce-ms <ms>', 'Local changes debounce milliseconds', (v) => parseInt(v, 10), 200)
  .option('-v, --verbose', 'Show verbose output', false)
  .action(startCollab)
