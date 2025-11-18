'use strict'

import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { loadModule } from './require.js'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { buildDirectory } from '../helpers/fileUtils.js'
import { normalizeKeys } from '../helpers/compareUtils.js'
import { generateDiffDisplay, showDiffPager } from '../helpers/diffUtils.js'
import { getCurrentProjectData, postProjectChanges } from '../helpers/apiUtils.js'
import { computeCoarseChanges, computeOrdersForTuples, preprocessChanges } from '../helpers/changesUtils.js'
import { showAuthRequiredMessages, showProjectNotFoundMessages, showBuildErrorMessages } from '../helpers/buildMessages.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { loadCliConfig, readLock, writeLock, updateLegacySymbolsJson } from '../helpers/config.js'


async function buildLocalProject () {
  try {
    const distDir = path.join(process.cwd(), 'smbls')
    const outputDirectory = path.join(distDir, 'dist')

    await buildDirectory(distDir, outputDirectory)
    const outputFile = path.join(outputDirectory, 'index.js')
    return normalizeKeys(await loadModule(outputFile, { silent: false }))
  } catch (error) {
    // Enhance error with build context
    error.buildContext = {
      command: 'push',
      workspace: process.cwd()
    }
    throw error
  }
}

function getAt(obj, pathArr = []) {
  try {
    return pathArr.reduce((acc, k) => (acc == null ? undefined : acc[k]), obj)
  } catch (_) {
    return undefined
  }
}

function buildDiffsFromChanges(changes, base, local) {
  const diffs = []
  for (const [op, path, value] of changes) {
    const oldVal = getAt(base, path)
    if (op === 'delete') {
      diffs.push(generateDiffDisplay('delete', path, oldVal))
    } else {
      const newVal = value !== undefined ? value : getAt(local, path)
      diffs.push(generateDiffDisplay('update', path, oldVal, newVal))
    }
  }
  return diffs
}

async function confirmChanges (changes, base, local) {
  if (changes.length === 0) {
    console.log(chalk.bold.yellow('No changes detected'))
    return false
  }

  console.log(chalk.bold.white('\nDetected changes:'))
  const changesByType = changes.reduce((acc, [type, path]) => {
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  Object.entries(changesByType).forEach(([type, count]) => {
    console.log(chalk.gray(`- ${type}: ${chalk.cyan(count)} changes`))
  })

  const { view } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'view',
      message: 'View full list of changes?',
      default: false
    }
  ])
  if (view) {
    const diffs = buildDiffsFromChanges(changes, base, local)
    await showDiffPager(diffs)
  }

  const { proceed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Proceed with these changes?',
      default: false
    }
  ])

  return proceed
}

export async function pushProjectChanges(options) {
  const { verbose, message, type = 'patch' } = options
  const credManager = new CredentialManager()
  const authToken = credManager.ensureAuthToken()

  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }

  try {
    const symbolsConfig = await loadSymbolsConfig()
    const cliConfig = loadCliConfig()
    const lock = readLock()
    const appKey = cliConfig.projectKey || symbolsConfig.key
    const branch = cliConfig.branch || symbolsConfig.branch || 'main'

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

    // Get current server state (ETag aware)
    console.log(chalk.dim('Fetching current server state...'))
    const serverResp = await getCurrentProjectData(
      { projectKey: appKey, projectId: lock.projectId },
      authToken,
      { branch, includePending: true, etag: lock.etag }
    )
    const serverProject = serverResp.notModified ? null : serverResp.data

    // Check if server project is empty (not found or no access)
    if (serverProject && Object.keys(serverProject).length === 0) {
      showProjectNotFoundMessages(appKey)
      process.exit(1)
    }

    console.log(chalk.gray('Server state fetched successfully'))

    // Calculate coarse local changes vs server snapshot (or base)
    const base = normalizeKeys(serverProject || {})
    const changes = computeCoarseChanges(base, localProject)

    if (!changes.length) {
      console.log(chalk.bold.yellow('\nNo changes to push'))
      return
    }

    // Show change summary
    console.log('\nLocal changes to push:')
    const byType = changes.reduce((acc, [t]) => ((acc[t] = (acc[t] || 0) + 1), acc), {})
    Object.entries(byType).forEach(([t, c]) => {
      console.log(chalk.gray(`- ${t}: ${chalk.cyan(c)} changes`))
    })

    // Confirm push
    const shouldProceed = await confirmChanges(changes, base, localProject)
    if (!shouldProceed) {
      console.log(chalk.yellow('Push cancelled'))
      return
    }

    // Push changes
    console.log(chalk.dim('\nPushing changes...'))
    const projectId = lock.projectId || serverProject?.projectInfo?.id
    if (!projectId) {
      console.log(chalk.red('Unable to resolve projectId. Please fetch first to initialize lock.'))
      process.exit(1)
    }
    const operationId = `cli-${Date.now()}`
    // Derive granular changes against server base and compute orders using local for pending children
    const { granularChanges } = preprocessChanges(base, changes)
    const orders = computeOrdersForTuples(localProject, granularChanges)
    const result = await postProjectChanges(projectId, authToken, {
      branch,
      type,
      operationId,
      // Send both forms for compatibility with preprocessors
      changes,
      granularChanges,
      orders
    })
    if (result.noOp) {
      console.log(chalk.bold.yellow('\nNo-op on server'))
      return
    }
    const { id: versionId, value: version } = result.data || {}

    // Update symbols.json
    updateLegacySymbolsJson({ ...(symbolsConfig || {}), version, versionId })

    console.log(chalk.bold.green('\nChanges pushed successfully!'))
    console.log(chalk.gray(`New version: ${chalk.cyan(version)}`))

    // Refresh lock with latest ETag by fetching head
    const latest = await getCurrentProjectData(
      { projectKey: appKey, projectId },
      authToken,
      { branch, includePending: true }
    )
    writeLock({
      etag: latest.etag || null,
      version,
      branch,
      projectId,
      pulledAt: new Date().toISOString()
    })

  } catch (error) {
    console.error(chalk.bold.red('\nPush failed:'), chalk.white(error.message))
    if (verbose) console.error(error.stack)
    process.exit(1)
  }
}

program
  .command('push')
  .description('Push changes to platform')
  .option('-m, --message <message>', 'Specify a commit message')
  .action(pushProjectChanges)
