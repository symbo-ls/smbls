#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { loadModule } from './require.js'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { buildDirectory } from '../helpers/fileUtils.js'
import { generateDiffDisplay, showDiffPager } from '../helpers/diffUtils.js'
import { getCurrentProjectData, postProjectChanges } from '../helpers/apiUtils.js'
import { threeWayRebase, computeOrdersForTuples, preprocessChanges } from '../helpers/changesUtils.js'
import { createFs } from './fs.js'
import { showAuthRequiredMessages, showBuildErrorMessages } from '../helpers/buildMessages.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, getConfigPaths, updateLegacySymbolsJson } from '../helpers/config.js'
import { applyOrderFields, stripOrderFields } from '../helpers/orderUtils.js'
import { stringifyFunctionsForTransport } from '../helpers/transportUtils.js'
import { stripEmptyDefaultNamespaceEntries } from '../helpers/projectNormalization.js'
import { logDesignSystemFlags } from '../helpers/designSystemDebug.js'
import {
  augmentProjectWithLocalPackageDependencies,
  ensureSchemaDependencies,
  findNearestPackageJson,
  syncPackageJsonDependencies
} from '../helpers/dependenciesUtils.js'

// The platform may omit empty designSystem buckets. The CLI filesystem
// representation uses per-bucket files under `designSystem/`, so we keep
// these keys present (at least as `{}`) to avoid treating missing buckets as
// deletions and to prevent `createFs(update)` from removing local bucket files.
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

async function buildLocalProject (distDir) {
  try {
    const outputDirectory = path.join(distDir, 'dist')
    await buildDirectory(distDir, outputDirectory)
    const outputFile = path.join(outputDirectory, 'index.js')
    return await loadModule(outputFile, { silent: false })
  } catch (error) {
    // Enhance error with build context
    error.buildContext = {
      command: 'sync',
      workspace: process.cwd()
    }
    throw error
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

function getAt (obj, pathArr = []) {
  try {
    return pathArr.reduce((acc, k) => (acc == null ? undefined : acc[k]), obj)
  } catch (_) {
    return undefined
  }
}

function buildDiffsFromChanges (changes, base, target) {
  const diffs = []
  for (const [op, path, value] of changes) {
    const oldVal = getAt(base, path)
    if (op === 'delete') {
      diffs.push(generateDiffDisplay('delete', path, oldVal))
    } else {
      const newVal = value !== undefined ? value : getAt(target, path)
      diffs.push(generateDiffDisplay('update', path, oldVal, newVal))
    }
  }
  return diffs
}

async function confirmChanges (localChanges, remoteChanges, base, local, remote) {
  if (localChanges.length === 0 && remoteChanges.length === 0) {
    console.log(chalk.bold.yellow('No changes detected'))
    return false
  }

  console.log(chalk.bold.white('\nDetected changes:'))

  if (localChanges.length) {
    const localChangesByType = localChanges.reduce((acc, [type]) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
    console.log(chalk.cyan('\nLocal changes:'))
    Object.entries(localChangesByType).forEach(([type, count]) => {
      console.log(chalk.gray(`- ${type}: ${chalk.cyan(count)} changes`))
    })
  }

  if (remoteChanges.length) {
    const remoteChangesByType = remoteChanges.reduce((acc, [type]) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
    console.log(chalk.cyan('\nRemote changes:'))
    Object.entries(remoteChangesByType).forEach(([type, count]) => {
      console.log(chalk.gray(`- ${type}: ${chalk.cyan(count)} changes`))
    })
  }

  const { view } = await inquirer.prompt([{
    type: 'confirm',
    name: 'view',
    message: 'View full list of changes?',
    default: false
  }])
  if (view) {
    const diffs = []
    if (localChanges.length) {
      diffs.push(chalk.bold('\nLocal changes:\n'))
      diffs.push(...buildDiffsFromChanges(localChanges, base, local))
    }
    if (remoteChanges.length) {
      diffs.push(chalk.bold('\nRemote changes:\n'))
      diffs.push(...buildDiffsFromChanges(remoteChanges, base, remote))
    }
    await showDiffPager(diffs)
  }

  const { proceed } = await inquirer.prompt([{
    type: 'confirm',
    name: 'proceed',
    message: 'Proceed with sync?',
    default: false
  }])

  return proceed
}

export async function syncProjectChanges (options) {
  try {
    // Load configuration
    const symbolsConfig = await loadSymbolsConfig()
    const cliConfig = loadCliConfig()
    const credManager = new CredentialManager()
    const authToken = credManager.ensureAuthToken(cliConfig.apiBaseUrl)

    if (!authToken) {
      showAuthRequiredMessages()
      process.exit(1)
    }
    const lock = readLock()
    const { projectPath } = getConfigPaths()
    const { key: legacyKey } = symbolsConfig
    const appKey = cliConfig.projectKey || legacyKey
    const localBranch = options.branch || cliConfig.branch || symbolsConfig.branch || 'main'

    const distDir =
      resolveDistDir(symbolsConfig) ||
      path.join(process.cwd(), 'smbls')

    const packageJsonPath = findNearestPackageJson(process.cwd())

    if (options.verbose) {
      console.log(chalk.dim('\nSync configuration:'))
      console.log(chalk.gray(`App Key: ${chalk.cyan(appKey)}`))
      console.log(chalk.gray(`Current version: ${chalk.cyan(lock.version || 'unknown')}`))
      console.log(chalk.gray(`Branch: ${chalk.cyan(localBranch)}`))
      console.log(chalk.gray(`Environment: ${chalk.cyan(options.dev ? 'Development' : 'Production')}\n`))
    } else {
      console.log(chalk.dim('\nSyncing project...'))
    }

    // Build and load local project
    console.log(chalk.dim('Building local project...'))
    let localProject
    try {
      localProject = await buildLocalProject(distDir)
      // Include local package.json dependencies into the project object for diffing/sync
      localProject = augmentProjectWithLocalPackageDependencies(localProject, packageJsonPath) || localProject
      // Never sync/persist `__order` (platform metadata)
      localProject = stripOrderFields(localProject)
      localProject = stripEmptyDefaultNamespaceEntries(localProject)
      console.log(chalk.gray('Local project built successfully'))
    } catch (buildError) {
      showBuildErrorMessages(buildError)
      process.exit(1)
    }

    // Load base snapshot (last pulled)
    const baseSnapshot = (() => {
      try {
        const raw = fs.readFileSync(projectPath, 'utf8')
        return stripOrderFields(JSON.parse(raw))
      } catch (_) {
        return {}
      }
    })()

    // Get latest server data (ignore ETag to ensure latest)
    console.log(chalk.dim('Fetching server data...'))
    const serverResp = await getCurrentProjectData(
      { projectKey: appKey, projectId: lock.projectId },
      authToken,
      { branch: localBranch, includePending: true }
    )
    const serverProject = serverResp.data || {}
    console.log(chalk.gray('Server data fetched successfully'))

    // Ensure schema.dependencies exists wherever dependencies exist (base/remote/local)
    ensureSchemaDependencies(baseSnapshot)
    ensureSchemaDependencies(serverProject)
    ensureSchemaDependencies(localProject)
    stripEmptyDefaultNamespaceEntries(baseSnapshot)
    stripEmptyDefaultNamespaceEntries(serverProject)
    try { ensureDesignSystemBuckets(baseSnapshot?.designSystem) } catch (_) {}
    try { ensureDesignSystemBuckets(serverProject?.designSystem) } catch (_) {}
    try { ensureDesignSystemBuckets(localProject?.designSystem) } catch (_) {}

    // Generate coarse local and remote changes via simple three-way rebase
    // Prepare safe, JSON-serialisable snapshots for diffing & transport (stringify functions)
    const base = stringifyFunctionsForTransport(stripOrderFields(baseSnapshot || {}))
    const local = stringifyFunctionsForTransport(stripOrderFields(localProject || {}))
    const remote = stringifyFunctionsForTransport(stripOrderFields(serverProject || {}))
    const { ours, theirs, conflicts, finalChanges } = threeWayRebase(base, local, remote)

    const localChanges = ours
    const remoteChanges = theirs

    if (!localChanges.length && !remoteChanges.length) {
      console.log(chalk.bold.green('\nProject is already in sync'))
      return
    }

    // Show change summaries
    if (localChanges.length) {
      const byType = localChanges.reduce((acc, [t]) => {
        acc[t] = (acc[t] || 0) + 1
        return acc
      }, {})
      console.log(chalk.cyan('\nLocal changes:'))
      Object.entries(byType).forEach(([type, count]) => {
        console.log(chalk.gray(`- ${type}: ${chalk.cyan(count)} changes`))
      })
    }
    if (remoteChanges.length) {
      const byType = remoteChanges.reduce((acc, [t]) => {
        acc[t] = (acc[t] || 0) + 1
        return acc
      }, {})
      console.log(chalk.cyan('\nRemote changes:'))
      Object.entries(byType).forEach(([type, count]) => {
        console.log(chalk.gray(`- ${type}: ${chalk.cyan(count)} changes`))
      })
    }

    // Handle conflicts if any
    let toApply = finalChanges && finalChanges.length ? finalChanges : [...localChanges]
    if (conflicts.length) {
      console.log(chalk.yellow(`\nFound ${conflicts.length} conflicts`))
      const chosen = await resolveTopLevelConflicts(conflicts, ours, theirs)
      // Combine non-conflicting ours with chosen resolutions
      const nonConflictOurs = ours.filter(([_, [k]]) => !conflicts.includes(k))
      toApply = [...nonConflictOurs, ...chosen]
    }

    // Confirm sync
    const shouldProceed = await confirmChanges(localChanges, remoteChanges, base, local, remote)
    if (!shouldProceed) {
      console.log(chalk.yellow('Sync cancelled'))
      return
    }

    const isInteractive = !!(process.stdin && process.stdin.isTTY && process.stdout && process.stdout.isTTY)
    let mode = 'merge' // merge | remote | local
    if (isInteractive && localChanges.length && remoteChanges.length) {
      const ans = await inquirer.prompt([{
        type: 'list',
        name: 'mode',
        message: 'Remote changes detected. How should sync proceed?',
        choices: [
          { name: 'Merge: pull remote + push local changes (recommended)', value: 'merge' },
          { name: 'Accept Remote only: overwrite local, discard local changes', value: 'remote' },
          { name: 'Keep Local only: push local, ignore remote updates locally', value: 'local' },
          { name: 'Cancel', value: 'cancel' }
        ],
        default: 0
      }])
      mode = ans.mode
      if (mode === 'cancel') {
        console.log(chalk.yellow('Sync cancelled'))
        return
      }
      if (mode === 'remote') {
        // Discard local changes for this sync run.
        toApply = []
      }
    }

    const projectId = lock.projectId || serverProject?.projectInfo?.id
    if (!projectId) {
      console.log(chalk.red('Unable to resolve projectId. Please fetch first to initialize lock.'))
      process.exit(1)
    }

    let versionId
    let version
    let updated
    let updatedServerData

    if (toApply.length) {
      // Update server (push local changes)
      console.log(chalk.dim('\nUpdating server...'))
      const operationId = `cli-${Date.now()}`
      // Expand into granular changes against remote/server state, compute orders from local
      const { granularChanges } = preprocessChanges(remote, toApply)
      const orders = computeOrdersForTuples(local, granularChanges)
      const result = await postProjectChanges(projectId, authToken, {
        branch: localBranch,
        type: options.type || 'patch',
        operationId,
        changes: toApply,
        granularChanges,
        orders
      })
      const info = result.noOp ? {} : (result.data || {})
      versionId = info.id
      version = info.value

      // Update symbols.json with new version
      if (version) {
        updateLegacySymbolsJson({ ...(symbolsConfig || {}), version, branch: localBranch, versionId })
      }

      // Get latest project data after sync
      console.log(chalk.dim('Fetching latest project data...'))
      updated = await getCurrentProjectData(
        { projectKey: appKey, projectId },
        authToken,
        { branch: localBranch, includePending: true }
      )
      updatedServerData = updated?.data || {}
    } else {
      // No local changes to push (or user chose Remote-only). Avoid posting an
      // empty patch; just use the already-fetched server snapshot.
      updated = serverResp
      updatedServerData = serverProject
      version = serverProject?.version || lock.version || null
    }

    if (options.verbose) {
      logDesignSystemFlags('sync: updatedServerData raw (from API)', updatedServerData?.designSystem, { enabled: true })
    }

    const debugDesignSystemBuckets = (label, designSystem) => {
      if (!options.verbose) return
      const ds = designSystem && typeof designSystem === 'object' ? designSystem : null
      const spacing = ds?.SPACING
      const theme = ds?.THEME
      const typography = ds?.TYPOGRAPHY
      const summary = {
        hasDesignSystem: !!ds,
        SPACING: spacing && typeof spacing === 'object' ? Object.keys(spacing).length : null,
        THEME: theme && typeof theme === 'object' ? Object.keys(theme).length : null,
        TYPOGRAPHY: typography && typeof typography === 'object' ? Object.keys(typography).length : null
      }
      console.log(chalk.gray(`${label} designSystem bucket summary: ${JSON.stringify(summary)}`))
    }

    const debugDesignSystemFiles = async (label) => {
      if (!options.verbose) return
      const dir = path.join(distDir, 'designSystem')
      const files = ['SPACING.js', 'THEME.js', 'TYPOGRAPHY.js']
      const out = []
      for (const f of files) {
        const fp = path.join(dir, f)
        try {
          const stat = await fs.promises.stat(fp)
          const content = await fs.promises.readFile(fp, 'utf8')
          const isEmptyObject =
            content.includes('export default {}') ||
            content.includes('export default {\n}') ||
            content.includes('export default {\n  \n}')
          out.push({ file: f, bytes: stat.size, empty: !!isEmptyObject })
        } catch (e) {
          out.push({ file: f, missing: true, error: e?.code || e?.message || String(e) })
        }
      }
      console.log(chalk.gray(`${label} local designSystem files: ${JSON.stringify(out)}`))
    }

    // Ensure fetched snapshot has dependency schema and sync deps into local package.json
    try {
      ensureSchemaDependencies(updatedServerData)
      if (packageJsonPath && updatedServerData?.dependencies) {
        syncPackageJsonDependencies(packageJsonPath, updatedServerData.dependencies, { overwriteExisting: true })
      }
    } catch (_) {}

    // Apply changes to local files
    console.log(chalk.dim('Updating local files...'))
    const snapshotForLocal = mode === 'local' ? localProject : updatedServerData
    debugDesignSystemBuckets('sync: snapshotForLocal (pre-order)', snapshotForLocal?.designSystem)
    const orderedUpdatedServerData = applyOrderFields(snapshotForLocal)
    debugDesignSystemBuckets('sync: orderedUpdatedServerData (post-order)', orderedUpdatedServerData?.designSystem)
    if (options.verbose) {
      logDesignSystemFlags('sync: after applyOrderFields (before createFs)', orderedUpdatedServerData?.designSystem, { enabled: true })
    }
    await createFs(orderedUpdatedServerData, distDir, { update: true, metadata: false })
    await debugDesignSystemFiles('sync: after createFs')
    console.log(chalk.gray('Local files updated successfully'))

    console.log(chalk.bold.green('\nProject synced successfully!'))
    console.log(chalk.gray(`New version: ${chalk.cyan(version)}`))

    // Update lock and base snapshot
    writeLock({
      etag: updated?.etag || null,
      version: (mode === 'local' ? (lock.version || null) : (version || (lock.version || null))),
      branch: localBranch,
      projectId,
      pulledAt: new Date().toISOString()
    })
    try {
      const { projectPath } = getConfigPaths()
      await fs.promises.writeFile(projectPath, JSON.stringify(orderedUpdatedServerData, null, 2))
    } catch (_) {}
  } catch (error) {
    console.error(chalk.bold.red('\nSync failed:'), chalk.white(error.message))
    if (options.verbose && error.stack) {
      console.error(chalk.dim('\nStack trace:'))
      console.error(chalk.gray(error.stack))
    }
    process.exit(1)
  }
}

program
  .command('sync')
  .description('Sync local changes with remote server')
  .option('-b, --branch <branch>', 'Branch to sync')
  .option('-m, --message <message>', 'Specify a commit message')
  .option('-d, --dev', 'Run against local server')
  .option('-v, --verbose', 'Show verbose output')
  .action(syncProjectChanges)
