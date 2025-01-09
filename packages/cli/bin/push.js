'use strict'

import fs from 'fs'
import path from 'path'
import { build } from 'esbuild'
import { loadModule } from './require.js'
import { program } from './program.js'
import { CredentialManager } from './login.js'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { spawn } from 'child_process'

const RC_PATH = process.cwd() + '/symbols.json'
const API_URL = 'http://localhost:13335'

// Helper to format value for display
function formatValue(value) {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

// Helper to generate a diff-like display
function generateDiffDisplay(type, path, oldValue, newValue) {
  const pathStr = path.join('.')
  let output = chalk.dim(`@ ${pathStr}\n`)

  switch (type) {
    case 'update':
      if (oldValue !== undefined) {
        output += chalk.red(`- ${formatValue(oldValue)}\n`)
      }
      output += chalk.green(`+ ${formatValue(newValue)}\n`)
      break
    case 'delete':
      output += chalk.red(`- ${formatValue(oldValue)}\n`)
      break
    default:
      output += chalk.green(`+ ${formatValue(newValue)}\n`)
  }

  return output
}

// Helper to generate changes array from diff
function generateChanges(oldData, newData) {
  const changes = []
  const diffs = [] // Store detailed diffs

  // Validate input data
  if (!oldData || !newData) {
    throw new Error('Both oldData and newData must be provided')
  }

  // Helper to recursively find differences
  function compareObjects(oldObj, newObj, currentPath = []) {
    // Skip comparison if values are exactly the same
    if (oldObj === newObj) return

    // Handle primitive values
    if (typeof oldObj !== 'object' || typeof newObj !== 'object' ||
        oldObj === null || newObj === null) {
      if (oldObj !== newObj) {
        changes.push(['update', currentPath, newObj])
        diffs.push(generateDiffDisplay('update', currentPath, oldObj, newObj))
      }
      return
    }

    // Handle both objects and arrays
    const allKeys = Array.isArray(oldObj) && Array.isArray(newObj)
      ? new Set([...Array(Math.max(oldObj.length, newObj.length)).keys()])
      : new Set([...Object.keys(oldObj), ...Object.keys(newObj)])

    for (const key of allKeys) {
      const newValue = newObj[key]
      const oldValue = oldObj[key]
      const keyPath = [...currentPath, key]

      if (!(key in newObj)) {
        changes.push(['delete', keyPath])
        diffs.push(generateDiffDisplay('delete', keyPath, oldValue))
      } else if (!(key in oldObj)) {
        changes.push(['update', keyPath, newValue])
        diffs.push(generateDiffDisplay('add', keyPath, undefined, newValue))
      } else if (
        typeof newValue === 'object' &&
        typeof oldValue === 'object' &&
        newValue !== null &&
        oldValue !== null
      ) {
        compareObjects(oldValue, newValue, keyPath)
      } else if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
        changes.push(['update', keyPath, newValue])
        diffs.push(generateDiffDisplay('update', keyPath, oldValue, newValue))
      }
    }
  }

  compareObjects(oldData, newData)
  return { changes, diffs }
}

// Helper to get project data from server
async function getServerProjectData(appKey, authToken) {
  const response = await fetch(`${API_URL}/get/`, {
    method: 'GET',
    headers: {
      'X-AppKey': appKey,
      'Authorization': `Bearer ${authToken}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch server data: ${response.statusText}`)
  }

  const data = await response.json()
  console.log('Raw server data:', data)
  return data
}

// Helper to show diff in less pager
async function showDiffPager(diffs) {
  return new Promise((resolve, reject) => {
    const formattedDiffs = diffs.join('\n' + chalk.dim('---') + '\n')

    // Create less process
    const less = spawn('less', ['-R'], {
      stdio: ['pipe', process.stdout, process.stderr]
    })

    // Handle potential errors
    less.stdin.on('error', (error) => {
      // Ignore EPIPE errors when less is quit
      if (error.code === 'EPIPE') {
        resolve()
        return
      }
      reject(error)
    })

    // Handle process exit
    less.on('close', () => {
      resolve()
    })

    // Write the diffs to less
    less.stdin.write(formattedDiffs)
    less.stdin.end()
  })
}

// Modified fs2js function
export async function fs2js() {
  // Load credentials
  const credManager = new CredentialManager()
  const authToken = credManager.getAuthToken()
  if (!authToken) {
    console.error(chalk.red('Please login first using: smbls login'))
    process.exit(1)
  }

  // Load symbols.json
  let config
  try {
    config = await loadModule(RC_PATH)
    console.log(config);
  } catch (e) {
    console.error(chalk.red('Please include symbols.json in your repository root'))
    process.exit(1)
  }

  const { key: appKey } = config

  try {
    // Load project.json
    let projectData
    try {
      // Build project data
      const distDir = path.join(process.cwd(), 'smbls')
      const outputDirectory = path.join(distDir, 'dist')

      if (!fs.existsSync(outputDirectory)) {
        fs.mkdirSync(outputDirectory, { recursive: true })
      }

      // Build and get project data
      await buildDirectory(distDir, outputDirectory)
      const outputFile = path.join(outputDirectory, 'index.js')
      projectData = await loadModule(outputFile)
      console.log(chalk.dim('Local project built and loaded successfully'))
    } catch (err) {
      throw new Error('Failed to build project data: ' + err.message)
    }

    // Get server project data
    const serverProjectData = await getServerProjectData(appKey, authToken)
    console.log(chalk.dim('Server data fetched successfully'))

    // Generate changes with diffs
    const { changes, diffs } = generateChanges(serverProjectData, projectData)

    // Log changes summary
    if (changes.length > 0) {
      console.log('\nDetected changes:')
      const changesByType = changes.reduce((acc, [type, path]) => {
        acc[type] = (acc[type] || 0) + 1
        return acc
      }, {})

      Object.entries(changesByType).forEach(([type, count]) => {
        console.log(chalk.dim(`- ${type}: ${count} changes`))
      })

      // Show scrollable diff view
      console.log('\nDetailed changes:')
      await showDiffPager(diffs)

      // Confirm changes
      const answers = await inquirer.prompt([{
        type: 'confirm',
        name: 'proceed',
        message: 'Proceed with these changes?',
        default: false
      }])

      if (!answers.proceed) {
        console.log(chalk.yellow('Operation cancelled'))
        return
      }
    } else {
      console.log(chalk.yellow('No changes detected'))
      return
    }

    // Send update request
    const response = await fetch(`${API_URL}/auth/project/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        appKey,
        changes,
        projectUpdates: projectData
      })
    })
    console.log(response);

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Failed to update project')
    }

    console.log(chalk.green('\nProject updated successfully!'))
    console.log(chalk.dim(`Total changes applied: ${changes.length}`))

  } catch (error) {
    console.error(chalk.red('\nPush failed:'), error.message)
    process.exit(1)
  }
}

async function buildDirectory(directoryPath, outputDirectory) {
  try {
    const files = await getFilesRecursively(directoryPath)
    const buildPromises = files.map(async (filePath) => {
      const relativePath = path.relative(directoryPath, filePath)
      const outputFile = path.join(outputDirectory, relativePath)

      // Ensure output subdirectories exist
      const outputDir = path.dirname(outputFile)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      await buildFromFile(filePath, outputFile)
    })
    await Promise.all(buildPromises)
  } catch (error) {
    console.error('Error building directory:', error)
    throw error
  }
}

async function buildFromFile(inputFilePath, outputFilePath) {
  try {
    const fileContents = fs.readFileSync(inputFilePath, 'utf8')
    await build({
      stdin: {
        contents: fileContents,
        sourcefile: inputFilePath,
        loader: 'js',
        resolveDir: path.dirname(inputFilePath)
      },
      minify: false,
      outfile: outputFilePath,
      target: 'node14',
      platform: 'node',
      format: 'cjs', // Changed back to CommonJS
      bundle: true,
      mainFields: ['module', 'main'],
      external: ['esbuild'] // Don't bundle esbuild itself
    })
  } catch (error) {
    console.error('Error building file:', error)
    throw error
  }
}

async function getFilesRecursively(directoryPath) {
  const files = []
  async function traverseDirectory(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === 'dist' || entry.name === 'node_modules') {
        continue
      }
      const fullPath = path.join(currentPath, entry.name)
      if (entry.isDirectory()) {
        await traverseDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(fullPath)
      }
    }
  }
  await traverseDirectory(directoryPath)
  return files
}

program
  .command('push')
  .description('Push changes to platform')
  .action(fs2js)
