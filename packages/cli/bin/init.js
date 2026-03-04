'use strict'

import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { mergeStarterKit } from './init-helpers/mergeStarterKit.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CLI_BIN = resolve(__dirname, 'index.js')

const runCreate = (name) => {
  const args = name ? ['create', name] : ['create']
  const result = spawnSync(process.execPath, [CLI_BIN, ...args], { stdio: 'inherit' })
  process.exit(result.status || 0)
}

program
  .command('init [dest]')
  .description('Initialize or add Symbols to a project')
  .action(async (dest) => {
    const cwd = dest ? resolve(process.cwd(), dest) : process.cwd()
    const hasPkg = existsSync(resolve(cwd, 'package.json'))

    // No package.json → redirect to smbls create
    if (!hasPkg) {
      console.log(chalk.yellow('No package.json found.'))
      console.log(chalk.dim('Redirecting to `smbls create`...\n'))

      const { name } = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Project name:',
        default: dest || 'my-symbols-app',
        filter: (v) => v.trim()
      }])

      runCreate(name)
      return
    }

    // Has package.json → ask: init in root or create in subfolder
    const { location } = await inquirer.prompt([{
      type: 'list',
      name: 'location',
      message: 'Where do you want to initialize Symbols?',
      choices: [
        { name: 'Subfolder          — create a new project folder', value: 'subfolder' },
        { name: 'Current directory  — merge config files here', value: 'root' }
      ],
      default: 'subfolder'
    }])

    if (location === 'subfolder') {
      const { name } = await inquirer.prompt([{
        type: 'input',
        name: 'name',
        message: 'Subfolder name:',
        default: 'symbols-app',
        filter: (v) => v.trim()
      }])
      runCreate(name)
      return
    }

    // Init in root: merge starter-kit files then run config
    console.log(chalk.bold('\nInitializing Symbols in current directory...\n'))
    const projectDir = await mergeStarterKit(cwd)

    console.log(chalk.bold('Configure your project:\n'))
    spawnSync(process.execPath, [CLI_BIN, 'config'], { stdio: 'inherit', cwd: projectDir })

    console.log(chalk.green.bold('\nInitialized successfully.'))
    console.log(chalk.dim('Run `smbls start` to start the development server.'))
  })
