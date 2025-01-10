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
const CREATE_PROJECT_URL = 'https://symbols.app/create'

function printProjectNotFoundGuidance(appKey) {
  console.error(chalk.bold.red('\nProject not found or access denied.'))
  console.error(chalk.bold.yellow('\nPossible reasons:'))
  console.error(chalk.gray('1. The project does not exist'))
  console.error(chalk.gray('2. You don\'t have access to this project'))
  console.error(chalk.gray('3. The app key in symbols.json might be incorrect'))

  console.error(chalk.bold.yellow('\nTo resolve this:'))
  console.error(chalk.white(`1. Visit ${chalk.cyan.underline(CREATE_PROJECT_URL)} to create a new project`))
  console.error(chalk.white('2. After creating the project, update your symbols.json with the correct information:'))
  console.error(chalk.gray(`   - Verify the app key: ${chalk.cyan(appKey)}`))
  console.error(chalk.gray('   - Make sure you have the correct permissions'))

  console.error(chalk.bold.yellow('\nThen try again:'))
  console.error(chalk.cyan('$ smbls push'))
}

async function loadProjectConfiguration() {
  try {
    const config = await loadModule(RC_PATH)
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
  const distDir = path.join(process.cwd(), 'smbls')
  const outputDirectory = path.join(distDir, 'dist')

  await buildDirectory(distDir, outputDirectory)
  const outputFile = path.join(outputDirectory, 'index.js')
  return normalizeKeys(await loadModule(outputFile))
}

async function confirmChanges(changes) {
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
    console.log(chalk.dim('Building local project...'))
    const projectData = await buildLocalProject()
    console.log(chalk.gray('Local project built and loaded successfully'))

    // Get server data
    try {
      console.log(chalk.dim('Fetching server data...'))
      const serverProjectData = await getServerProjectData(appKey, authToken)

      if (!serverProjectData) {
        throw new Error('Failed to fetch server data: Empty response')
      }

      const normalizedServerData = normalizeKeys(serverProjectData)
      console.log(chalk.gray('Server data fetched successfully'))

      // Compare and get changes
      const { changes, diffs } = generateChanges(normalizedServerData, projectData)

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
      console.log(chalk.dim('Updating server...'))
      await updateProjectOnServer(appKey, authToken, changes, projectData)

      console.log(chalk.bold.green('\nProject updated successfully!'))
      console.log(chalk.gray(`Total changes applied: ${chalk.cyan(changes.length)}`))

    } catch (error) {
      if (error.message.includes('Failed to fetch server data') ||
          (error.response && error.response.status === 404) ||
          Object.keys(error.response?.data || {}).length === 0) {
        printProjectNotFoundGuidance(appKey)
      } else {
        throw error // Re-throw other errors to be caught by outer catch block
      }
      process.exit(1)
    }

  } catch (error) {
    console.error(chalk.bold.red('\nPush failed:'), chalk.white(error.message))
    process.exit(1)
  }
}

program
  .command('push')
  .description('Push changes to platform')
  .action(pushProjectChanges)
