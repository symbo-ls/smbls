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
import { normalizeKeys } from '../helpers/compareUtils.js'
import { getCurrentProjectData, postProjectChanges } from '../helpers/apiUtils.js'
import { computeCoarseChanges, threeWayRebase, computeOrdersForTuples, preprocessChanges } from '../helpers/changesUtils.js'
import { createFs } from './fs.js'
import { showAuthRequiredMessages, showBuildErrorMessages } from '../helpers/buildMessages.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, getConfigPaths, updateLegacySymbolsJson } from '../helpers/config.js'
const RC_PATH = process.cwd() + '/symbols.json'
const distDir = path.join(process.cwd(), 'smbls')

async function buildLocalProject() {
  try {
    const outputDirectory = path.join(distDir, 'dist')
    await buildDirectory(distDir, outputDirectory)
    const outputFile = path.join(outputDirectory, 'index.js')
    return normalizeKeys(await loadModule(outputFile, { silent: false }))
  } catch (error) {
    // Enhance error with build context
    error.buildContext = {
      command: 'sync',
      workspace: process.cwd()
    }
    throw error
  }
}

async function resolveTopLevelConflicts(conflictsKeys, ours, theirs) {
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

function getAt(obj, pathArr = []) {
  try {
    return pathArr.reduce((acc, k) => (acc == null ? undefined : acc[k]), obj)
  } catch (_) {
    return undefined
  }
}

function buildDiffsFromChanges(changes, base, target) {
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

async function confirmChanges(localChanges, remoteChanges, base, local, remote) {
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

export async function syncProjectChanges(options) {
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
    const localBranch = cliConfig.branch || symbolsConfig.branch || 'main'

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
      localProject = await buildLocalProject()
      console.log(chalk.gray('Local project built successfully'))
    } catch (buildError) {
      showBuildErrorMessages(buildError)
      process.exit(1)
    }

    // Load base snapshot (last pulled)
    const baseSnapshot = (() => {
      try {
        const raw = fs.readFileSync(projectPath, 'utf8')
        return JSON.parse(raw)
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

    // Generate coarse local and remote changes via simple three-way rebase
    const base = normalizeKeys(baseSnapshot || {})
    const local = normalizeKeys(localProject || {})
    const remote = normalizeKeys(serverProject || {})
    const { ours, theirs, conflicts, finalChanges } = threeWayRebase(base, local, remote)

    const localChanges = ours
    const remoteChanges = theirs

    if (!localChanges.length && !remoteChanges.length) {
      console.log(chalk.bold.green('\nProject is already in sync'))
      return
    }

    // Show change summaries
    if (localChanges.length) {
      const byType = localChanges.reduce((acc, [t]) => ((acc[t] = (acc[t] || 0) + 1), acc), {})
      console.log(chalk.cyan('\nLocal changes:'))
      Object.entries(byType).forEach(([type, count]) => {
        console.log(chalk.gray(`- ${type}: ${chalk.cyan(count)} changes`))
      })
    }
    if (remoteChanges.length) {
      const byType = remoteChanges.reduce((acc, [t]) => ((acc[t] = (acc[t] || 0) + 1), acc), {})
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

    // Update server
    console.log(chalk.dim('\nUpdating server...'))
    const projectId = lock.projectId || serverProject?.projectInfo?.id
    if (!projectId) {
      console.log(chalk.red('Unable to resolve projectId. Please fetch first to initialize lock.'))
      process.exit(1)
    }
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
    const { id: versionId, value: version } = result.noOp ? {} : (result.data || {})

    // Update symbols.json with new version
    if (version) {
      updateLegacySymbolsJson({ ...(symbolsConfig || {}), version, branch: localBranch, versionId })
    }

    // Get latest project data after sync
    console.log(chalk.dim('Fetching latest project data...'))
    const updated = await getCurrentProjectData(
      { projectKey: appKey, projectId },
      authToken,
      { branch: localBranch, includePending: true }
    )
    const updatedServerData = updated?.data || {}

    // Apply changes to local files
    console.log(chalk.dim('Updating local files...'))
    await createFs(updatedServerData, distDir, { update: true, metadata: false })
    console.log(chalk.gray('Local files updated successfully'))

    console.log(chalk.bold.green('\nProject synced successfully!'))
    console.log(chalk.gray(`New version: ${chalk.cyan(version)}`))

    // Update lock and base snapshot
    writeLock({
      etag: updated.etag || null,
      version: version || (lock.version || null),
      branch: localBranch,
      projectId,
      pulledAt: new Date().toISOString()
    })
    try {
      const { projectPath } = getConfigPaths()
      await fs.promises.writeFile(projectPath, JSON.stringify(updatedServerData, null, 2))
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
  .option('-m, --message <message>', 'Specify a commit message')
  .option('-d, --dev', 'Run against local server')
  .option('-v, --verbose', 'Show verbose output')
  .action(syncProjectChanges)
