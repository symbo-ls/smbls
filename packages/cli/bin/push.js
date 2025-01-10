'use strict'

import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { loadModule } from './require.js'
import { program } from './program.js'
import { CredentialManager } from './login.js'
import { buildDirectory } from '../helpers/fileUtils.js'
import { showDiffPager } from '../helpers/diffUtils.js'
import { normalizeKeys, generateChanges } from '../helpers/compareUtils.js'
import { getServerProjectData, updateProjectOnServer } from '../helpers/apiUtils.js'

const RC_PATH = process.cwd() + '/symbols.json'

async function loadProjectConfiguration() {
  try {
    const config = await loadModule(RC_PATH)
    return config
  } catch (e) {
    console.error(chalk.red('Please include symbols.json in your repository root'))
    process.exit(1)
  }
}

async function buildLocalProject() {
  const distDir = path.join(process.cwd(), 'smbls')
  const outputDirectory = path.join(distDir, 'dist')

  await buildDirectory(distDir, outputDirectory)
  const outputFile = path.join(outputDirectory, 'index.js')
  return normalizeKeys(await loadModule(outputFile))
}

async function confirmChanges(changes) {
  if (changes.length === 0) {
    console.log(chalk.yellow('No changes detected'))
    return false
  }

  console.log('\nDetected changes:')
  const changesByType = changes.reduce((acc, [type, path]) => {
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  Object.entries(changesByType).forEach(([type, count]) => {
    console.log(chalk.dim(`- ${type}: ${count} changes`))
  })

  const { proceed } = await inquirer.prompt([{
    type: 'confirm',
    name: 'proceed',
    message: 'Proceed with these changes?',
    default: false
  }])

  return proceed
}

export async function pushProjectChanges() {
  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken()

  if (!authToken) {
    console.error(chalk.red('Please login first using: smbls login'))
    process.exit(1)
  }

  try {
    const config = await loadProjectConfiguration()
    const { key: appKey } = config

    // Build and load local project
    const projectData = await buildLocalProject()
    console.log(chalk.dim('Local project built and loaded successfully'))

    // Get server data
    const serverProjectData = normalizeKeys(await getServerProjectData(appKey, authToken))
    console.log(chalk.dim('Server data fetched successfully'))

    // Compare and get changes
    const { changes, diffs } = generateChanges(serverProjectData, projectData)

    // Show changes and confirm
    if (changes.length > 0) {
      console.log('\nDetailed changes:')
      await showDiffPager(diffs)
    }

    const shouldProceed = await confirmChanges(changes)
    if (!shouldProceed) {
      console.log(chalk.yellow('Operation cancelled'))
      return
    }

    // Update server
    await updateProjectOnServer(appKey, authToken, changes, projectData)

    console.log(chalk.green('\nProject updated successfully!'))
    console.log(chalk.dim(`Total changes applied: ${changes.length}`))

  } catch (error) {
    console.error(chalk.red('\nPush failed:'), error.message)
    process.exit(1)
  }
}

program
  .command('push')
  .description('Push changes to platform')
  .action(pushProjectChanges)
