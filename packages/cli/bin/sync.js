#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { loadModule } from './require.js'
import { program } from './program.js'
import { CredentialManager } from './login.js'
import { buildDirectory } from '../helpers/fileUtils.js'
import { showDiffPager } from '../helpers/diffUtils.js'
import { normalizeKeys, generateChanges } from '../helpers/compareUtils.js'
import { getProjectDataFromSymStory, getRemoteChangesFromSymStory, updateProjectOnSymStoryServer, findConflicts } from '../helpers/apiUtils.js'
import { createFs } from './fs.js'

const RC_PATH = process.cwd() + '/symbols.json'
const distDir = path.join(process.cwd(), 'smbls')

async function loadProjectConfiguration() {
  try {
    const config = await loadModule(RC_PATH, { json: true })
    if (!config.key) {
      throw new Error('Missing app key in symbols.json')
    }
    return config
  } catch (e) {
    if (e.message.includes('Missing app key')) {
      console.error(chalk.bold.red('\nInvalid symbols.json configuration:'))
      console.error(chalk.white('The file must contain a valid app key.'))
      console.error(chalk.bold.yellow('\nExample symbols.json:'))
      console.error(chalk.cyan(JSON.stringify({ key: 'your.app.key' }, null, 2)))
    } else {
      console.error(chalk.bold.red('Please include symbols.json in your repository root'))
    }
    process.exit(1)
  }
}

async function buildLocalProject() {
  const outputDirectory = path.join(distDir, 'dist')
  await buildDirectory(distDir, outputDirectory)
  const outputFile = path.join(outputDirectory, 'index.js')
  return normalizeKeys(await loadModule(outputFile, { silent: true }))
}

async function resolveConflicts(conflicts) {
  const choices = conflicts.map(([localChange, remoteChange]) => ({
    name: `${chalk.cyan(localChange[1].join('.'))}:
    ${chalk.red('- Remote:')} ${JSON.stringify(remoteChange[2])}
    ${chalk.green('+ Local:')} ${JSON.stringify(localChange[2])}`,
    value: localChange
  }))

  const { selectedChanges } = await inquirer.prompt([{
    type: 'checkbox',
    name: 'selectedChanges',
    message: 'Select changes to keep (unchecked will use remote version):',
    choices,
    pageSize: 10 // Limit number of visible choices
  }])

  return conflicts.map(([localChange, remoteChange]) =>
    selectedChanges.find(selected =>
      selected[1].join('.') === localChange[1].join('.')
    ) || remoteChange
  )
}

async function confirmChanges(localChanges, remoteChanges) {
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

  const { proceed } = await inquirer.prompt([{
    type: 'confirm',
    name: 'proceed',
    message: 'Proceed with sync?',
    default: false
  }])

  return proceed
}

export async function syncProjectChanges(options) {
  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken()

  if (!authToken) {
    console.error(chalk.red('Please login first using: smbls login'))
    process.exit(1)
  }

  try {
    // Load configuration
    const config = await loadProjectConfiguration()
    const { key: appKey } = config
    const localVersion = config.version || '1.0.0'
    const localBranch = config.branch || 'main'

    if (options.verbose) {
      console.log(chalk.dim('\nSync configuration:'))
      console.log(chalk.gray(`App Key: ${chalk.cyan(appKey)}`))
      console.log(chalk.gray(`Current version: ${chalk.cyan(localVersion)}`))
      console.log(chalk.gray(`Branch: ${chalk.cyan(localBranch)}`))
      console.log(chalk.gray(`Environment: ${chalk.cyan(options.dev ? 'Development' : 'Production')}\n`))
    } else {
      console.log(chalk.dim('\nSyncing project...'))
    }

    // Build and load local project
    console.log(chalk.dim('Building local project...'))
    const localProject = await buildLocalProject()
    console.log(chalk.gray('Local project built successfully'))
    // Get server data
    console.log(chalk.dim('Fetching server data...'))
    const serverProject = await getProjectDataFromSymStory(appKey, authToken, localBranch, localVersion)
    console.log(chalk.gray('Server data fetched successfully'))

    // Generate local and remote changes
    const { changes: localChanges, diffs: localDiffs } = generateChanges(
      normalizeKeys(serverProject),
      localProject
    )

    // Get remote changes since last sync
    const remoteChanges = await getRemoteChangesFromSymStory(appKey, authToken, localVersion, localBranch)

    if (!localChanges.length && !remoteChanges.length) {
      console.log(chalk.bold.green('\nProject is already in sync'))
      return
    }

    // Find conflicts
    const conflicts = findConflicts(localChanges, remoteChanges)

    // Show changes
    if (localChanges.length || remoteChanges.length) {
      if (localChanges.length) {
        console.log('\nLocal changes:')
        await showDiffPager(localDiffs)
      }
    }

    // Handle conflicts if any
    let finalChanges = [...localChanges]
    if (conflicts.length) {
      console.log(chalk.yellow(`\nFound ${conflicts.length} conflicts`))
      finalChanges = await resolveConflicts(conflicts)
    }

    // Confirm sync
    const shouldProceed = await confirmChanges(localChanges, remoteChanges)
    if (!shouldProceed) {
      console.log(chalk.yellow('Sync cancelled'))
      return
    }

    // Update server
    console.log(chalk.dim('\nUpdating server...'))
    const response = await updateProjectOnSymStoryServer(
      appKey,
      authToken,
      finalChanges,
      'Sync from CLI'
    )
    const { id: versionId, value: version } = await response.json()

    // Update symbols.json with new version
    config.version = version
    config.branch = localBranch
    config.versionId = versionId
    await fs.promises.writeFile(RC_PATH, JSON.stringify(config, null, 2))

    // Get latest project data after sync
    console.log(chalk.dim('Fetching latest project data...'))
    const updatedServerData = await getProjectDataFromSymStory(appKey, authToken)

    // Apply changes to local files
    console.log(chalk.dim('Updating local files...'))
    await createFs(updatedServerData, distDir, { update: true, metadata: true })
    console.log(chalk.gray('Local files updated successfully'))

    console.log(chalk.bold.green('\nProject synced successfully!'))
    console.log(chalk.gray(`New version: ${chalk.cyan(version)}`))

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
  .option('-d, --dev', 'Run against local server')
  .option('-v, --verbose', 'Show verbose output')
  .action(syncProjectChanges)
