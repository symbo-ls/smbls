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
import { CredentialManager } from '../helpers/credentialManager.js'
import { getCurrentProjectData } from '../helpers/apiUtils.js'
import { showAuthRequiredMessages } from '../helpers/buildMessages.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, updateLegacySymbolsJson, getConfigPaths } from '../helpers/config.js'
import { ensureSchemaDependencies, findNearestPackageJson, syncPackageJsonDependencies } from '../helpers/dependenciesUtils.js'
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

async function confirmOverwriteIfLocalChanges ({ distDir, pulledAt, skipConfirm }) {
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
        ignore: new Set(['.cache', 'node_modules', '.git'])
      })
    }
  }

  // If we can confidently say "no local changes", proceed silently.
  // If changes are detected OR we cannot determine safely, require confirmation.
  if (hasLocalChanges === false) return

  console.log(chalk.yellow(`\nWarning: ${hasLocalChanges === true ? 'local changes detected' : 'local changes may exist'}.\n`))
  console.log(chalk.dim(`Path: ${distDir}`))
  if (hasLocalChanges === null) {
    console.log(chalk.dim('Unable to determine if local changes exist.\n'))
  }
  console.log(chalk.dim('This fetch will overwrite local files without a per-file diff prompt.\n'))

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
    scope
  } = opts

  const symbolsConfig = await loadSymbolsConfig()
  const cliConfig = loadCliConfig()
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)

  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }

  const projectKey = cliConfig.projectKey || symbolsConfig.key
  const branch = cliConfig.branch || symbolsConfig.branch || 'main'
  const { framework } = symbolsConfig

  // Resolve effective distDir from CLI flag or symbols.json, with a sane default
  const distDir =
    resolveDistDir(symbolsConfig, {
      distDirOverride: opts.distDir
    }) ||
    path.join(process.cwd(), 'smbls')

  console.log('\nFetching project data...\n')

  let payload
  let prevPulledAt = null
  try {
    const lock = readLock()
    prevPulledAt = lock?.pulledAt || null
    const result = await getCurrentProjectData(
      { projectKey, projectId: lock.projectId },
      authToken,
      { branch, includePending: true, etag: ignoreEtag ? undefined : lock.etag }
    )

    if (result.notModified) {
      console.log(chalk.bold.green('Already up to date (ETag matched)'))
      return
    }

    payload = result.data || {}
    const etag = result.etag || null
    logDesignSystemFlags('fetch: raw payload (from API)', payload?.designSystem, { enabled: !!verbose })

    // Update lock.json
    writeLock({
      etag,
      version: payload.version,
      branch,
      projectId: payload?.projectInfo?.id || lock.projectId,
      pulledAt: new Date().toISOString()
    })

    // Update legacy symbols.json with version and branch
    updateLegacySymbolsJson({ ...(symbolsConfig || {}), version: payload.version, branch })

    if (verbose) {
      console.log(chalk.gray(`Version: ${chalk.cyan(payload.version)}`))
      console.log(chalk.gray(`Branch: ${chalk.cyan(branch)}\n`))
    }
  } catch (e) {
    console.log(chalk.red('Failed to fetch:'), projectKey)
    if (verbose) console.error(e)
    else console.log(debugMsg)
    process.exit(1)
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

  // Sync project dependencies into local package.json
  try {
    if (String(scope || '') !== 'libs') {
      const packageJsonPath = findNearestPackageJson(process.cwd())
      if (packageJsonPath && payload?.dependencies) {
        const res = syncPackageJsonDependencies(packageJsonPath, payload.dependencies, { overwriteExisting: true })
        if (verbose && res?.ok && res.changed) {
          console.log(chalk.gray('Updated package.json dependencies from fetched project data'))
        }
      }
    }
  } catch (e) {
    if (verbose) console.error('Failed updating package.json dependencies', e)
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

  if (shouldAutoUpdate) {
    await confirmOverwriteIfLocalChanges({
      distDir,
      pulledAt: prevPulledAt,
      skipConfirm: shouldSkipConfirm
    })
    const ordered = applyOrderFields(payload)
    logDesignSystemFlags('fetch: before createFs (update=true)', ordered?.designSystem, { enabled: !!verbose })
    createFs(ordered, distDir, { update: true, metadata: false, scope })
  } else {
    const ordered = applyOrderFields(payload)
    logDesignSystemFlags('fetch: before createFs (update=false)', ordered?.designSystem, { enabled: !!verbose })
    createFs(ordered, distDir, { metadata: false, scope })
  }
}

program
  .command('fetch')
  .description('Fetch Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option('--convert', 'Verbose errors and warnings', true)
  .option('--metadata', 'Include metadata', false)
  .option('--force', 'Force overriding changes from platform')
  .option('--update', 'Overriding changes from platform')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .option('--verbose-code', 'Verbose errors and warnings')
  .option('--dist-dir <dir>', 'Directory to import files to.')
  .action(fetchFromCli)
