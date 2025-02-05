'use strict'

import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { loadModule } from './require.js'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'
import { buildDirectory } from '../helpers/fileUtils.js'
import { showDiffPager } from '../helpers/diffUtils.js'
import { normalizeKeys, generateChanges } from '../helpers/compareUtils.js'
import { getProjectDataFromSymStory, updateProjectOnSymStoryServer } from '../helpers/apiUtils.js'
import fs from 'fs'
import { showAuthRequiredMessages, showProjectNotFoundMessages } from '../helpers/buildMessages.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
const RC_PATH = process.cwd() + '/symbols.json'

async function buildLocalProject () {
  const distDir = path.join(process.cwd(), 'smbls')
  const outputDirectory = path.join(distDir, 'dist')

  await buildDirectory(distDir, outputDirectory)
  const outputFile = path.join(outputDirectory, 'index.js')
  return normalizeKeys(await loadModule(outputFile, { silent: true }))
}

async function confirmChanges (changes) {
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
  const { verbose, message } = options
  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken()

  if (!authToken) {
    showAuthRequiredMessages()
    process.exit(1)
  }

  try {
    const symbolsConfig = await loadSymbolsConfig()
    const { key: appKey, branch, version: versionFromConfig } = symbolsConfig

    // Build and load local project
    console.log(chalk.dim('Building local project...'))
    const localProject = await buildLocalProject()
    console.log(chalk.gray('Local project built successfully'))

    // Get current server state
    console.log(chalk.dim('Fetching current server state...'))
    const serverProject = await getProjectDataFromSymStory(appKey, authToken, branch, versionFromConfig)

    // Check if server project is empty (not found or no access)
    if (!serverProject || Object.keys(serverProject).length === 0) {
      showProjectNotFoundMessages(appKey, CREATE_PROJECT_URL)
      process.exit(1)
    }

    console.log(chalk.gray('Server state fetched successfully'))

    // Calculate local changes
    const { changes, diffs } = generateChanges(
      normalizeKeys(serverProject),
      localProject
    )

    if (!changes.length) {
      console.log(chalk.bold.yellow('\nNo changes to push'))
      return
    }

    // Show changes
    console.log('\nLocal changes to push:')
    await showDiffPager(diffs)

    // Confirm push
    const shouldProceed = await confirmChanges(changes)
    if (!shouldProceed) {
      console.log(chalk.yellow('Push cancelled'))
      return
    }

    // Push changes
    console.log(chalk.dim('\nPushing changes...'))
    const response = await updateProjectOnSymStoryServer(
      appKey,
      authToken,
      changes,
      message || 'Push from CLI'
    )
    const { id: versionId, value: version } = await response.json()

    // Update symbols.json
    symbolsConfig.version = version
    symbolsConfig.versionId = versionId
    await fs.promises.writeFile(RC_PATH, JSON.stringify(symbolsConfig, null, 2))

    console.log(chalk.bold.green('\nChanges pushed successfully!'))
    console.log(chalk.gray(`New version: ${chalk.cyan(version)}`))

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
