#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, getConfigPaths } from '../helpers/config.js'
import { getCurrentProjectData, postProjectChanges } from '../helpers/apiUtils.js'
import { uploadFile, downloadFile, listFiles as listFilesApi } from '../helpers/filesApiUtils.js'
import { showAuthRequiredMessages } from '../helpers/buildMessages.js'
import { createFs } from './fs.js'
import { preprocessChanges } from '../helpers/changesUtils.js'
import { applyOrderFields, stripOrderFields } from '../helpers/orderUtils.js'
import { ensureSchemaDependencies } from '../helpers/dependenciesUtils.js'

function isInteractive () {
  return !!(process.stdin && process.stdin.isTTY && process.stdout && process.stdout.isTTY)
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

function getCollabStatePath () {
  const { symbolsDir } = getConfigPaths()
  return path.join(symbolsDir, 'collab.json')
}

function isCollabRunning () {
  const statePath = getCollabStatePath()
  try {
    if (!fs.existsSync(statePath)) return false
    const raw = fs.readFileSync(statePath, 'utf8')
    const parsed = JSON.parse(raw)
    return isPidAlive(parsed?.pid)
  } catch (_) {
    return false
  }
}

function parseCsv (value) {
  if (!value) return []
  if (Array.isArray(value)) return value
  return String(value)
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
}

function safeJsonParse (value) {
  if (!value) return null
  try {
    return JSON.parse(String(value))
  } catch (_) {
    return null
  }
}

function normalizeFileKey (key) {
  // Keep the key as-is, but trim and avoid empty keys.
  const out = String(key || '').trim()
  return out || null
}

function getFileIdFromEntry (entry) {
  const content = entry?.content || entry?.file || entry
  const id = content?._id || content?.id
  if (id && typeof id === 'string') return id
  const url = content?.urls?.api?.file || content?.urls?.absolute?.file || content?.src
  if (typeof url === 'string') {
    const m = url.match(/\/core\/files\/([0-9a-fA-F]{24})/u)
    if (m && m[1]) return m[1]
  }
  return null
}

function sanitizeFilename (name) {
  const base = String(name || '').trim()
  if (!base) return 'download'
  return base.replace(/[/\\?%*:|"<>]/gu, '-')
}

async function resolveAuthOrExit () {
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)
  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }
  return { cliConfig, authToken }
}

async function resolveProjectIdOrExit ({ authToken, projectKey, branch }) {
  const lock = readLock()
  if (lock.projectId) return { lock, projectId: lock.projectId }

  if (!projectKey) {
    console.error(chalk.red('Missing project key. Add it to symbols.json or .symbols/config.json'))
    process.exit(1)
  }

  const resp = await getCurrentProjectData(
    { projectKey, projectId: null },
    authToken,
    { branch, includePending: true }
  )
  const projectId = resp?.data?.projectInfo?.id
  if (!projectId) {
    console.error(chalk.red('Unable to resolve projectId. Run `smbls fetch` first.'))
    process.exit(1)
  }

  writeLock({
    etag: resp.etag || lock.etag || null,
    branch,
    projectId,
    pulledAt: new Date().toISOString()
  })

  return { lock: readLock(), projectId }
}

async function readBaseSnapshotOrFetch ({ authToken, projectKey, branch }) {
  const { projectPath } = getConfigPaths()
  try {
    if (fs.existsSync(projectPath)) {
      const raw = await fs.promises.readFile(projectPath, 'utf8')
      return JSON.parse(raw)
    }
  } catch (_) {}

  // No base snapshot yet: fetch remote data and persist it as the base.
  const lock = readLock()
  const resp = await getCurrentProjectData(
    { projectKey, projectId: lock.projectId },
    authToken,
    { branch, includePending: true }
  )
  const payload = resp?.data || {}

  try {
    await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
    ensureSchemaDependencies(payload)
    const persisted = applyOrderFields(payload)
    await fs.promises.writeFile(projectPath, JSON.stringify(persisted, null, 2))
  } catch (_) {}

  // Keep lock reasonably fresh
  try {
    writeLock({
      etag: resp.etag || null,
      version: payload.version,
      branch,
      projectId: payload?.projectInfo?.id || lock.projectId,
      pulledAt: new Date().toISOString()
    })
  } catch (_) {}

  return applyOrderFields(payload)
}

async function writeSnapshotAndFs ({ snapshot, distDir }) {
  const { projectPath } = getConfigPaths()
  await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
  await fs.promises.writeFile(projectPath, JSON.stringify(snapshot, null, 2))
  await createFs(snapshot, distDir, { update: true, metadata: false })
}

function getDistDir (symbolsConfig, opts = {}) {
  return (
    resolveDistDir(symbolsConfig, { distDirOverride: opts.distDir }) ||
    path.join(process.cwd(), 'smbls')
  )
}

async function pushProjectPatchIfNeeded ({
  authToken,
  projectId,
  branch,
  updatedSnapshot,
  changes,
  forceRemote
}) {
  if (!forceRemote && isCollabRunning()) {
    return { pushed: false, reason: 'collab-running' }
  }

  const { granularChanges, orders } = preprocessChanges(updatedSnapshot, changes)
  const operationId = `cli-files-${Date.now()}`
  await postProjectChanges(projectId, authToken, {
    branch,
    type: 'patch',
    operationId,
    changes,
    granularChanges,
    orders
  })
  return { pushed: true }
}

async function fetchLatestSnapshot ({ authToken, projectKey, projectId, branch }) {
  const resp = await getCurrentProjectData(
    { projectKey, projectId },
    authToken,
    { branch, includePending: true }
  )
  const payload = resp?.data || {}
  ensureSchemaDependencies(payload)
  return { snapshot: applyOrderFields(payload), etag: resp.etag || null }
}

async function selectProjectFileKey ({ filesMap, message }) {
  const keys = Object.keys(filesMap || {})
  if (!keys.length) return null

  const choices = keys.map((k) => {
    const entry = filesMap[k]
    const c = entry?.content || {}
    const labelParts = [chalk.cyan(k)]
    if (c.originalName) labelParts.push(chalk.gray(`— ${c.originalName}`))
    if (c.humanSize) labelParts.push(chalk.gray(`(${c.humanSize})`))
    return { name: labelParts.join(' '), value: k }
  })

  const { selected } = await inquirer.prompt([{
    type: 'list',
    name: 'selected',
    message: message || 'Select a file',
    choices,
    pageSize: Math.min(20, Math.max(10, choices.length))
  }])
  return selected
}

async function listProjectFiles ({ authToken, projectKey, branch, remote }) {
  if (!remote) {
    try {
      const base = await readBaseSnapshotOrFetch({ authToken, projectKey, branch })
      return base?.files && typeof base.files === 'object' ? base.files : {}
    } catch (_) {
      // fallthrough to remote
    }
  }

  const lock = readLock()
  const resp = await getCurrentProjectData(
    { projectKey, projectId: lock.projectId },
    authToken,
    { branch, includePending: true }
  )
  const payload = resp?.data || {}
  const files = payload?.files && typeof payload.files === 'object' ? payload.files : {}
  return files
}

// -------------------- Commands --------------------

const filesCmd = program
  .command('files')
  .description('Upload/download/manage project files (project `files` map)')

filesCmd
  .command('list')
  .description('List project-linked files')
  .option('--remote', 'Read file list from server project data (no local writes)', false)
  .option('--uploads', 'List raw uploaded files for this project (not the project `files` map)', false)
  .option('--limit <n>', 'Uploads list limit', (v) => parseInt(v, 10), 50)
  .option('--search <q>', 'Uploads search query')
  .action(async (opts) => {
    const symbolsConfig = await loadSymbolsConfig()
    const { cliConfig, authToken } = await resolveAuthOrExit()
    const projectKey = cliConfig.projectKey || symbolsConfig.key
    const branch = cliConfig.branch || symbolsConfig.branch || 'main'

    if (opts.uploads) {
      const { projectId } = await resolveProjectIdOrExit({ authToken, projectKey, branch })
      const result = await listFilesApi({
        authToken,
        query: { projectId, limit: opts.limit, search: opts.search }
      })
      const items = Array.isArray(result) ? result : (result?.data || result?.files || [])
      if (!items.length) {
        console.log(chalk.dim('No uploads found.'))
        return
      }
      items.forEach((f) => {
        console.log(
          `${chalk.cyan(f._id || f.id)}  ${chalk.white(f.originalName || f.filename)}  ${chalk.dim(f.humanSize || '')}`
        )
      })
      return
    }

    const files = await listProjectFiles({ authToken, projectKey, branch, remote: !!opts.remote })
    const keys = Object.keys(files || {})
    if (!keys.length) {
      console.log(chalk.dim('No project files found.'))
      return
    }
    keys.forEach((k) => {
      const entry = files[k]
      const c = entry?.content || {}
      console.log(`${chalk.cyan(k)}  ${chalk.dim(c.originalName || '')} ${chalk.dim(c.humanSize || '')}`)
    })
  })

filesCmd
  .command('upload')
  .description('Upload one or more files and add them to the project `files` map')
  .argument('<paths...>', 'Paths to local files')
  .option('--key <key>', 'Project files map key (only valid when uploading a single file)')
  .option('--visibility <visibility>', 'File visibility (public/private)', 'public')
  .option('--tags <csv>', 'Comma-separated tags')
  .option('--metadata <json>', 'JSON metadata to store on the uploaded file')
  .option('--mime <mime>', 'Override mimeType sent for the upload')
  .option('--dist-dir <dir>', 'Local smbls directory (defaults to ./smbls or symbols.json distDir)')
  .option('--local-only', 'Only update local project files; do not patch server (useful with collab)', false)
  .option('--force-remote', 'Patch server even if collab is running (advanced)', false)
  .option('--overwrite', 'Overwrite existing project file key without prompting', false)
  .action(async (pathsArg, opts) => {
    const symbolsConfig = await loadSymbolsConfig()
    const { cliConfig, authToken } = await resolveAuthOrExit()
    const projectKey = cliConfig.projectKey || symbolsConfig.key
    const branch = cliConfig.branch || symbolsConfig.branch || 'main'
    const distDir = getDistDir(symbolsConfig, { distDir: opts.distDir })

    const paths = Array.isArray(pathsArg) ? pathsArg : [pathsArg]
    if (!paths.length) {
      console.error(chalk.red('No file paths provided.'))
      process.exit(1)
    }
    if (opts.key && paths.length > 1) {
      console.error(chalk.red('--key can only be used when uploading a single file.'))
      process.exit(1)
    }

    const base = await readBaseSnapshotOrFetch({ authToken, projectKey, branch })
    const next = { ...(base || {}) }
    if (!next.files || typeof next.files !== 'object') next.files = {}

    const tags = parseCsv(opts.tags)
    const metadata = safeJsonParse(opts.metadata) || {}

    const uploadedEntries = []
    for (let i = 0; i < paths.length; i++) {
      const p = paths[i]
      const abs = path.isAbsolute(p) ? p : path.join(process.cwd(), p)
      const defaultKey = path.basename(abs)
      const mapKey = normalizeFileKey(opts.key || defaultKey)
      if (!mapKey) {
        console.error(chalk.red(`Invalid key for: ${p}`))
        process.exit(1)
      }

      if (!opts.overwrite && Object.prototype.hasOwnProperty.call(next.files, mapKey) && isInteractive()) {
        const { overwrite } = await inquirer.prompt([{
          type: 'confirm',
          name: 'overwrite',
          message: `Project already has files.${mapKey}. Overwrite?`,
          default: false
        }])
        if (!overwrite) {
          console.log(chalk.dim(`Skipping: ${mapKey}`))
          continue
        }
      }

      console.log(chalk.dim(`Uploading ${chalk.cyan(p)} ...`))
      const fileData = await uploadFile({
        authToken,
        filePath: abs,
        endpoint: '/core/files/upload',
        fieldName: 'file',
        projectKey,
        projectId: readLock().projectId || undefined,
        visibility: opts.visibility,
        tags,
        metadata,
        mimeType: opts.mime
      })

      const format = (fileData?.extension || path.extname(abs).replace(/^\./u, '') || '').toLowerCase()
      const entry = {
        content: fileData,
        code: '',
        key: mapKey,
        type: 'files',
        format
      }

      next.files[mapKey] = entry
      uploadedEntries.push({ key: mapKey, entry })
    }

    if (!uploadedEntries.length) {
      console.log(chalk.dim('No files uploaded.'))
      return
    }

    // Persist locally (always).
    await writeSnapshotAndFs({ snapshot: next, distDir })
    console.log(chalk.gray(`Updated local project files (${uploadedEntries.length} entries).`))

    // Patch server (unless local-only, or collab is running).
    if (opts.localOnly) {
      console.log(chalk.dim('Local-only mode: server not updated.'))
      return
    }

    const { projectId } = await resolveProjectIdOrExit({ authToken, projectKey, branch })
    const changes = uploadedEntries.map(({ key, entry }) => (['update', ['files', key], entry]))

    const result = await pushProjectPatchIfNeeded({
      authToken,
      projectId,
      branch,
      updatedSnapshot: stripOrderFields(next),
      changes,
      forceRemote: !!opts.forceRemote
    })

    if (!result.pushed) {
      console.log(chalk.dim('Collab is running: server update will be handled by the collab process.'))
      return
    }

    const latest = await fetchLatestSnapshot({ authToken, projectKey, projectId, branch })
    writeLock({ etag: latest.etag || null, projectId, branch, pulledAt: new Date().toISOString() })
    await writeSnapshotAndFs({ snapshot: latest.snapshot, distDir })
    console.log(chalk.green('Server updated and local snapshot refreshed.'))
  })

filesCmd
  .command('download')
  .description('Download a project-linked file by selecting from the project `files` map')
  .option('--key <key>', 'Project files map key to download (skip prompt)')
  .option('--out <path>', 'Output path (file or directory). Defaults to current directory.')
  .option('--remote', 'Read the project files map from server project data (no local writes)', false)
  .action(async (opts) => {
    const symbolsConfig = await loadSymbolsConfig()
    const { cliConfig, authToken } = await resolveAuthOrExit()
    const projectKey = cliConfig.projectKey || symbolsConfig.key
    const branch = cliConfig.branch || symbolsConfig.branch || 'main'

    const files = await listProjectFiles({ authToken, projectKey, branch, remote: !!opts.remote })
    const filesMap = files && typeof files === 'object' ? files : {}

    const selectedKey = opts.key
      ? normalizeFileKey(opts.key)
      : (isInteractive() ? await selectProjectFileKey({ filesMap, message: 'Select a file to download' }) : null)
    if (!selectedKey) {
      console.error(chalk.red('No file selected.'))
      process.exit(1)
    }

    const entry = filesMap[selectedKey]
    if (!entry) {
      console.error(chalk.red(`Unknown file key: ${selectedKey}`))
      process.exit(1)
    }

    const fileId = getFileIdFromEntry(entry)
    if (!fileId) {
      console.error(chalk.red(`Unable to resolve file id for files.${selectedKey}`))
      process.exit(1)
    }

    const contentMeta = entry?.content || {}
    const suggestedName = sanitizeFilename(contentMeta.originalName || selectedKey)
    const outArg = opts.out ? String(opts.out) : ''
    const outPath = (() => {
      if (!outArg) return path.join(process.cwd(), suggestedName)
      const abs = path.isAbsolute(outArg) ? outArg : path.join(process.cwd(), outArg)
      try {
        if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) {
          return path.join(abs, suggestedName)
        }
      } catch (_) {}
      // Treat as file path
      return abs
    })()

    console.log(chalk.dim(`Downloading ${chalk.cyan(selectedKey)} ...`))
    const { content } = await downloadFile({ authToken, fileId })
    await fs.promises.mkdir(path.dirname(outPath), { recursive: true })
    await fs.promises.writeFile(outPath, content)
    console.log(chalk.green(`Saved to ${chalk.cyan(outPath)}`))
  })

filesCmd
  .command('rm')
  .description('Remove a file from the project `files` map (does not delete the uploaded file record)')
  .option('--key <key>', 'Project files map key to remove (skip prompt)')
  .option('--dist-dir <dir>', 'Local smbls directory (defaults to ./smbls or symbols.json distDir)')
  .option('--local-only', 'Only update local project files; do not patch server (useful with collab)', false)
  .option('--force-remote', 'Patch server even if collab is running (advanced)', false)
  .action(async (opts) => {
    const symbolsConfig = await loadSymbolsConfig()
    const { cliConfig, authToken } = await resolveAuthOrExit()
    const projectKey = cliConfig.projectKey || symbolsConfig.key
    const branch = cliConfig.branch || symbolsConfig.branch || 'main'
    const distDir = getDistDir(symbolsConfig, { distDir: opts.distDir })

    const base = await readBaseSnapshotOrFetch({ authToken, projectKey, branch })
    const next = { ...(base || {}) }
    const filesMap = next?.files && typeof next.files === 'object' ? next.files : {}
    if (!Object.keys(filesMap).length) {
      console.log(chalk.dim('No project files to remove.'))
      return
    }

    const selectedKey = opts.key
      ? normalizeFileKey(opts.key)
      : (isInteractive() ? await selectProjectFileKey({ filesMap, message: 'Select a file to remove from project' }) : null)
    if (!selectedKey) {
      console.error(chalk.red('No file selected.'))
      process.exit(1)
    }
    if (!filesMap[selectedKey]) {
      console.error(chalk.red(`Unknown file key: ${selectedKey}`))
      process.exit(1)
    }

    delete next.files[selectedKey]
    await writeSnapshotAndFs({ snapshot: next, distDir })
    console.log(chalk.gray(`Removed files.${selectedKey} locally.`))

    if (opts.localOnly) {
      console.log(chalk.dim('Local-only mode: server not updated.'))
      return
    }

    const { projectId } = await resolveProjectIdOrExit({ authToken, projectKey, branch })
    const changes = [['delete', ['files', selectedKey]]]
    const result = await pushProjectPatchIfNeeded({
      authToken,
      projectId,
      branch,
      updatedSnapshot: stripOrderFields(next),
      changes,
      forceRemote: !!opts.forceRemote
    })

    if (!result.pushed) {
      console.log(chalk.dim('Collab is running: server update will be handled by the collab process.'))
      return
    }

    const latest = await fetchLatestSnapshot({ authToken, projectKey, projectId, branch })
    writeLock({ etag: latest.etag || null, projectId, branch, pulledAt: new Date().toISOString() })
    await writeSnapshotAndFs({ snapshot: latest.snapshot, distDir })
    console.log(chalk.green('Server updated and local snapshot refreshed.'))
  })
