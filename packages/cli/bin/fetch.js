#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { spawnSync } from 'child_process'
import { program } from './program.js'
import * as utils from '@domql/utils'
import { convertFromCli } from './convert.js'
import { createFs } from './fs.js'
import { getCurrentProjectData } from '../helpers/apiUtils.js'
import { showAuthRequiredMessages } from '../helpers/buildMessages.js'
import { ensureAuthenticated, isAuthError } from '../helpers/authEnsure.js'
import { toJSON } from '@symbo.ls/frank'
import { loadSymbolsConfig, resolveDistDir, resolveLibrariesDir, normalizeSharedLibrariesConfig, resolveUseKV, kvGet, deepMergeOurs } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, updateLegacySymbolsJson, getConfigPaths } from '../helpers/config.js'
import { ensureSchemaDependencies, findNearestPackageJson, syncPackageJsonDependencies, syncDependenciesJs } from '../helpers/dependenciesUtils.js'
import { applyOrderFields } from '../helpers/orderUtils.js'
import { logDesignSystemFlags } from '../helpers/designSystemDebug.js'
const { isObjectLike } = (utils.default || utils)

const debugMsg = chalk.dim(
  'Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls'
)

function tryGetGitRoot (cwd) {
  const res = spawnSync('git', ['rev-parse', '--show-toplevel'], { cwd, encoding: 'utf8' })
  if (res.status !== 0) return null
  const root = String(res.stdout || '').trim()
  return root || null
}

function hasGitChangesInPath (gitRoot, absPath) {
  const rel = path.relative(gitRoot, absPath) || '.'
  const res = spawnSync('git', ['status', '--porcelain', '--', rel], { cwd: gitRoot, encoding: 'utf8' })
  if (res.status !== 0) return null
  const out = String(res.stdout || '').trim()
  return out.length > 0
}

async function hasFilesModifiedAfter (dir, thresholdMs, { ignore = new Set() } = {}) {
  const stack = [dir]
  while (stack.length) {
    const cur = stack.pop()
    let entries = []
    try {
      entries = await fs.promises.readdir(cur, { withFileTypes: true })
    } catch (_) {
      continue
    }
    for (const ent of entries) {
      const name = ent.name
      if (ignore.has(name)) continue
      const abs = path.join(cur, name)
      if (ent.isDirectory()) {
        stack.push(abs)
        continue
      }
      if (!ent.isFile()) continue
      try {
        const st = await fs.promises.stat(abs)
        if (st.mtimeMs > thresholdMs) return true
      } catch (_) {}
    }
  }
  return false
}

function isInteractiveSession (options = {}) {
  return !!process.stdin?.isTTY && !!process.stdout?.isTTY && !options.nonInteractive
}

async function confirmOverwriteIfLocalChanges ({ distDir, pulledAt, skipConfirm, nonInteractive }) {
  if (skipConfirm) return
  if (!distDir || !fs.existsSync(distDir)) return

  // Prefer git-based detection when available. If not, fall back to mtime heuristic.
  let hasLocalChanges = null
  const gitRoot = tryGetGitRoot(process.cwd())
  if (gitRoot) {
    hasLocalChanges = hasGitChangesInPath(gitRoot, distDir)
  }

  if (hasLocalChanges === null && pulledAt) {
    const t = Date.parse(String(pulledAt))
    if (!Number.isNaN(t)) {
      hasLocalChanges = await hasFilesModifiedAfter(distDir, t, {
        ignore: new Set(['.cache', '.symbols-cache', 'node_modules', '.git'])
      })
    }
  }

  // If we can confidently say "no local changes", proceed silently.
  // If changes are detected OR we cannot determine safely, require confirmation.
  if (hasLocalChanges === false) return

  if (!isInteractiveSession({ nonInteractive })) {
    console.error(chalk.red('Fetch requires --yes when prompts are disabled and local files may be overwritten.'))
    console.error(chalk.dim('Re-run with --yes or use an interactive terminal.'))
    process.exit(1)
  }

  console.log(chalk.yellow(`\nWarning: ${hasLocalChanges === true ? 'local changes detected' : 'local changes may exist'}.\n`))
  console.log(chalk.dim(`Path: ${distDir}`))
  if (hasLocalChanges === null) {
    console.log(chalk.dim('Unable to determine if local changes exist.\n'))
  }
  console.log(chalk.dim('Local files with conflicts will be backed up to .symbols-cache/ before overwriting.\n'))

  const { consent } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'consent',
      message: 'Continue and overwrite local changes?',
      default: false
    }
  ])

  if (!consent) {
    console.log(chalk.yellow('Aborted.'))
    process.exit(1)
  }
}

export const fetchFromCli = async (opts) => {
  const {
    verbose,
    convert: convertOpt,
    update,
    force,
    ignoreEtag,
    yes,
    skipConfirm,
    scope,
    ours,
    lockOnly,
    useKv
  } = opts

  const symbolsConfig = await loadSymbolsConfig()
  const cliConfig = loadCliConfig()
  let authToken
  try {
    const ensured = await ensureAuthenticated({ apiBaseUrl: cliConfig.apiBaseUrl, nonInteractive: opts.nonInteractive })
    authToken = ensured.authToken
  } catch (err) {
    if (isAuthError(err)) {
      showAuthRequiredMessages()
      process.exit(1)
    }
    throw err
  }

  const projectKey = cliConfig.projectKey || symbolsConfig.key
  const branch = cliConfig.branch || symbolsConfig.branch || 'main'
  const { framework } = symbolsConfig

  // Resolve effective distDir from CLI flag or symbols.json, with a sane default
  const distDir =
    resolveDistDir(symbolsConfig, {
      distDirOverride: opts.distDir
    }) ||
    path.join(process.cwd(), 'symbols')

  const librariesDir = resolveLibrariesDir(symbolsConfig)
  const libsConfig = normalizeSharedLibrariesConfig(symbolsConfig.sharedLibraries)
  const kvEnabled = resolveUseKV(symbolsConfig, { useKv })

  console.log('\nFetching project data...\n')

  let payload
  let prevPulledAt = null
  let lockedLibVersions = {}
  try {
    const lock = readLock()
    prevPulledAt = lock?.pulledAt || null
    lockedLibVersions = lock?.sharedLibraryVersions || {}

    if (kvEnabled) {
      // KV mode: fetch pure JSON from KV store
      if (verbose) console.log(chalk.gray('Using KV storage\n'))
      payload = await kvGet(projectKey)
      if (!payload) {
        console.log(chalk.bold.yellow('No data found in KV for:'), projectKey)
        return
      }

      writeLock({
        version: payload.version,
        branch,
        projectId: payload?.id || payload?._id || lock.projectId,
        pulledAt: new Date().toISOString()
      })
    } else {
      // Standard API mode
      const effectiveIgnoreEtag = !!(ignoreEtag || force)
      const result = await getCurrentProjectData(
        { projectKey, projectId: lock.projectId },
        authToken,
        { branch, includePending: true, etag: effectiveIgnoreEtag ? undefined : lock.etag }
      )

      if (result.notModified) {
        if (update || force) {
          try {
            const { projectPath } = getConfigPaths()
            const raw = await fs.promises.readFile(projectPath, 'utf8')
            payload = JSON.parse(raw || '{}') || {}
            if (verbose) {
              console.log(chalk.gray('Remote unchanged (ETag matched); re-applying last saved snapshot to local files.\n'))
            }
          } catch (_) {
            console.log(chalk.bold.green('Already up to date (ETag matched)'))
            return
          }
        } else {
          console.log(chalk.bold.green('Already up to date (ETag matched)'))
          return
        }
      }

      if (!result.notModified) {
        payload = result.data || {}

        const etag = result.etag || null
        logDesignSystemFlags('fetch: raw payload (from API)', payload?.designSystem, { enabled: !!verbose })

        // Build shared library version map from payload
        const sharedLibVersions = {}
        if (Array.isArray(payload.sharedLibraries)) {
          for (const lib of payload.sharedLibraries) {
            const key = lib?.key || lib?.id || lib?._id
            if (!key) continue
            const v = lib?.version
            const versionStr = typeof v === 'string' ? v : (v?.value || null)
            if (versionStr) sharedLibVersions[key] = versionStr
          }
        }

        writeLock({
          etag,
          version: payload.version,
          branch,
          projectId: payload?.projectInfo?.id || payload?.id || payload?._id || lock.projectId,
          pulledAt: new Date().toISOString(),
          sharedLibraryVersions: sharedLibVersions
        })

        if (verbose) {
          console.log(chalk.gray(`Version: ${chalk.cyan(payload.version)}`))
          console.log(chalk.gray(`Branch: ${chalk.cyan(branch)}\n`))
        }
      }
    }

    // --ours: prioritize local data, only fill in missing keys from remote
    if (ours && payload) {
      try {
        const localProject = await toJSON(distDir, { stringify: false })
        if (localProject && typeof localProject === 'object' && Object.keys(localProject).length) {
          payload = deepMergeOurs(localProject, payload)
          if (verbose) console.log(chalk.gray('--ours: merged remote into local (local takes priority)\n'))
        }
      } catch (_) {
        // No local project yet — use remote as-is
      }
    }
  } catch (e) {
    console.log(chalk.red('Failed to fetch:'), projectKey)
    if (verbose) console.error(e)
    else console.log(debugMsg)
    process.exit(1)
  }

  // --lock-only: lock.json is already updated above, skip everything else
  if (lockOnly) {
    console.log(chalk.bold.green('Lock updated successfully'))
    return
  }

  // Persist base snapshot for future rebases
  try {
    const { projectPath } = getConfigPaths()
    await fs.promises.mkdir(path.dirname(projectPath), { recursive: true })
    // Ensure schema.dependencies exists for payload.dependencies
    ensureSchemaDependencies(payload)
    const persisted = applyOrderFields(payload)
    logDesignSystemFlags('fetch: after applyOrderFields (persisted)', persisted?.designSystem, { enabled: !!verbose })
    await fs.promises.writeFile(projectPath, JSON.stringify(persisted, null, 2))
  } catch (e) {
    console.error(chalk.bold.red('\nError writing file'))
    if (verbose) console.error(e)
    else console.log(debugMsg)
    process.exit(1)
  }

  // Sync project dependencies — browser bundler writes to dependencies.js, others to package.json
  try {
    if (String(scope || '') !== 'libs' && payload?.dependencies) {
      if (cliConfig.runtime === 'browser') {
        const depsJsPath = path.join(distDir, 'dependencies.js')
        const res = syncDependenciesJs(depsJsPath, payload.dependencies, { overwriteExisting: true })
        if (verbose && res?.ok && res.changed) {
          console.log(chalk.gray('Updated dependencies.js from fetched project data'))
        }
      } else {
        const packageJsonPath = findNearestPackageJson(process.cwd())
        if (packageJsonPath) {
          const res = syncPackageJsonDependencies(packageJsonPath, payload.dependencies, { overwriteExisting: true })
          if (verbose && res?.ok && res.changed) {
            console.log(chalk.gray('Updated package.json dependencies from fetched project data'))
          }
        }
      }
    }
  } catch (e) {
    if (verbose) console.error('Failed updating dependencies', e)
  }

  const { version: fetchedVersion, ...config } = payload

  for (const t in config) {
    const type = config[t]
    const arr = []
    if (isObjectLike(type)) {
      for (const v in type) arr.push(v)
      if (arr.length) {
        console.log(chalk.dim(t + ':'))
        console.log(chalk.bold(arr.join(', ')))
      } else {
        console.log(chalk.dim(t + ':'), chalk.dim('- empty -'))
      }
    } else console.log(chalk.dim(t + ':'), chalk.bold(type))
  }

  if (payload.components && convertOpt && framework) {
    convertFromCli(payload.components, { ...opts, framework })
  }

  const shouldAutoUpdate = !!(update || force)
  const shouldSkipConfirm = !!(yes || skipConfirm)

  // --force bypasses lib version caching to re-scaffold all shared libraries
  const effectiveLockedLibVersions = force ? {} : lockedLibVersions

  if (shouldAutoUpdate) {
    await confirmOverwriteIfLocalChanges({
      distDir,
      pulledAt: prevPulledAt,
      skipConfirm: shouldSkipConfirm,
      nonInteractive: opts.nonInteractive
    })
    const ordered = applyOrderFields(payload)
    logDesignSystemFlags('fetch: before createFs (update=true)', ordered?.designSystem, { enabled: !!verbose })
    createFs(ordered, distDir, { update: true, schema: false, scope, librariesDir, libsConfig, lockedLibVersions: effectiveLockedLibVersions })
  } else {
    const ordered = applyOrderFields(payload)
    logDesignSystemFlags('fetch: before createFs (update=false)', ordered?.designSystem, { enabled: !!verbose })
    createFs(ordered, distDir, { schema: false, scope, librariesDir, libsConfig, lockedLibVersions: effectiveLockedLibVersions })
  }
}

program
  .command('fetch')
  .description('Fetch Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option('--convert', 'Verbose errors and warnings', true)
  .option('--schema', 'Include schema', false)
  .option('--force', 'Force overriding changes from platform')
  .option('--update', 'Overriding changes from platform')
  .option('--non-interactive', 'Disable prompts (require --yes when overwrite confirmation is needed)', false)
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .option('--verbose-code', 'Verbose errors and warnings')
  .option('--dist-dir <dir>', 'Directory to import files to.')
  .option('--ours', 'Prioritize local data, only merge missing data from remote')
  .option('--lock-only', 'Only update the lock file, skip writing project files')
  .option('--use-kv', 'Use KV storage instead of the platform API')
  .action(fetchFromCli)
