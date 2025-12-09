#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, getConfigPaths } from '../helpers/config.js'
import { getCurrentProjectData } from '../helpers/apiUtils.js'
import { computeCoarseChanges, computeOrdersForTuples, preprocessChanges } from '../helpers/changesUtils.js'
import { createFs } from './fs.js'

// Lazy import socket.io-client and chokidar to avoid adding cost for non-collab users
async function importDeps() {
  const [{ default: io }, { default: chokidar }] = await Promise.all([
    import('socket.io-client'),
    import('chokidar')
  ])
  return { io, chokidar }
}

function debounce(fn, wait) {
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

export async function startCollab(options) {
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken()
  if (!authToken) {
    console.log(chalk.yellow('\nAuthentication required. Please run: smbls login\n'))
    process.exit(1)
  }

  const symbolsConfig = await loadSymbolsConfig()
  const cliConfig = loadCliConfig()
  const lock = readLock()
  const branch = options.branch || cliConfig.branch || symbolsConfig.branch || 'main'
  const appKey = cliConfig.projectKey || symbolsConfig.key

  if (!appKey) {
    console.log(chalk.red('Missing project key. Add it to symbols.json or .symbols/config.json'))
    process.exit(1)
  }

  const { io, chokidar } = await importDeps()
  const baseUrl = cliConfig.apiBaseUrl

  console.log(chalk.dim(`\nConnecting to realtime collab on ${baseUrl} ...`))

  // Maintain in-memory base state and a guard to suppress local echoes
  let currentBase = {}
  let suppressLocalChanges = false
  let suppressUntil = 0
  const suppressionWindowMs = Math.max(1500, (options.debounceMs || 200) * 8)

  function isSuppressed() {
    return suppressLocalChanges || Date.now() < suppressUntil
  }

  function setByPath(root, pathArr = [], value) {
    if (!Array.isArray(pathArr) || !pathArr.length) return
    let cur = root
    for (let i = 0; i < pathArr.length - 1; i++) {
      const seg = pathArr[i]
      if (!cur[seg] || typeof cur[seg] !== 'object') cur[seg] = {}
      cur = cur[seg]
    }
    cur[pathArr[pathArr.length - 1]] = value
  }

  function deleteByPath(root, pathArr = []) {
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

  function applyTuples(root, tuples = []) {
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

  function applyOrders(root, orders = []) {
    if (!root || typeof root !== 'object') return
    if (!Array.isArray(orders)) return
    for (let i = 0; i < orders.length; i++) {
      const o = orders[i]
      if (!o || !Array.isArray(o.path) || !Array.isArray(o.keys)) continue
      // Ensure container exists
      setByPath(root, o.path, (function ensure(obj) {
        return obj && typeof obj === 'object' ? obj : {}
      })(pathArrGet(root, o.path)))
      // Now set __order on that container
      const container = pathArrGet(root, o.path)
      if (container && typeof container === 'object') {
        container.__order = o.keys.slice()
      }
    }
  }

  function pathArrGet(root, pathArr = []) {
    if (!Array.isArray(pathArr) || !pathArr.length) return root
    let cur = root
    for (let i = 0; i < pathArr.length; i++) {
      if (!cur || typeof cur !== 'object') return undefined
      cur = cur[pathArr[i]]
    }
    return cur
  }

  async function writeProjectAndFs(fullObj) {
    const { projectPath } = getConfigPaths()
    try {
      await fs.promises.writeFile(projectPath, JSON.stringify(fullObj, null, 2))
    } catch (_) {}
    // Avoid echoing the changes we are about to materialize
    suppressLocalChanges = true
    // Cancel any pending local send
    if (typeof sendLocalChanges.cancel === 'function') {
      sendLocalChanges.cancel()
    }
    try {
      await createFs(fullObj, path.join(process.cwd(), 'smbls'), { update: true, metadata: false })
    } finally {
      // Extend suppression window to allow file events to settle fully
      suppressUntil = Date.now() + suppressionWindowMs
      suppressLocalChanges = false
    }
  }

  // Prime local base with latest snapshot
  const prime = await getCurrentProjectData(
    { projectKey: appKey, projectId: lock.projectId },
    authToken,
    { branch, includePending: true }
  )
  const initialData = prime?.data || {}
  const etag = prime?.etag || null
  writeLock({
    etag,
    version: initialData.version,
    branch,
    projectId: initialData?.projectInfo?.id || lock.projectId,
    pulledAt: new Date().toISOString()
  })

  // Persist base snapshot
  try {
    const { projectPath } = getConfigPaths()
    await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
    await fs.promises.writeFile(projectPath, JSON.stringify(initialData, null, 2))
  } catch (_) {}
  currentBase = { ...(initialData || {}) }

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
    const full = { ...(data || {}), schema: schema || {}, version, branch: srvBranch }
    currentBase = full
    await writeProjectAndFs(currentBase)
    // Update lock’s version; ETag will change next pull
    writeLock({ version, branch: srvBranch, pulledAt: new Date().toISOString() })
    console.log(chalk.gray(`Snapshot applied. Version: ${chalk.cyan(version)}`))
  })

  // Receive granular ops from other clients/commits and apply to local files
  socket.on('ops', async (payload) => {
    // Apply incoming tuples directly to local base; do not re-emit builds triggered by this apply
    try {
      if (typeof sendLocalChanges.cancel === 'function') {
        sendLocalChanges.cancel()
      }
      const tuples = Array.isArray(payload?.granularChanges) && payload.granularChanges.length
        ? payload.granularChanges
        : preprocessChanges(currentBase || {}, payload?.changes || []).granularChanges
      if (!Array.isArray(tuples) || !tuples.length) return
      applyTuples(currentBase, tuples)
      if (Array.isArray(payload?.orders) && payload.orders.length) {
        applyOrders(currentBase, payload.orders)
      }
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
  const distDir = path.join(process.cwd(), 'smbls')
  const outputDir = path.join(distDir, 'dist')
  const outputFile = path.join(outputDir, 'index.js')

  // Build loader
  async function loadLocalProject() {
    try {
      // Reuse build flow from push/sync
      const { buildDirectory } = await import('../helpers/fileUtils.js')
      const { loadModule } = await import('./require.js')
      await buildDirectory(distDir, outputDir)
      const loaded = await loadModule(outputFile, { silent: true })
      return loaded
    } catch (e) {
      if (options.verbose) console.error('Build failed while watching:', e.message)
      return null
    }
  }

  const sendLocalChanges = debounce(async () => {
    if (suppressLocalChanges) return
    const local = await loadLocalProject()
    if (!local) return
    // Base snapshot is our last pulled .symbols/project.json
    const base = currentBase || {}
    const changes = computeCoarseChanges(base, local)
    if (!changes.length) return
    if (options.verbose) {
      const byType = changes.reduce((acc, [t]) => ((acc[t] = (acc[t] || 0) + 1), acc), {})
      console.log(chalk.gray(`Emitting local ops: ${JSON.stringify(byType)}`))
    }
    // Generate granular changes against base to ensure downstream consumers have fine ops
    const { granularChanges } = preprocessChanges(base, changes)
    const orders = computeOrdersForTuples(local, granularChanges)
    console.log(chalk.gray(`Emitting local ops: ${JSON.stringify({ changes, granularChanges, orders, branch })}`))
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
      if (/(^|[\/\\])\./.test(p)) return true
      if (p.includes(`${path.sep}dist${path.sep}`) || p.endsWith(`${path.sep}dist`)) return true
      return false
    },
    ignoreInitial: true,
    persistent: true
  })
  const onFsEvent = () => {
    if (isSuppressed()) return
    sendLocalChanges()
  }
  watcher
    .on('add', onFsEvent)
    .on('change', onFsEvent)
    .on('unlink', onFsEvent)

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


