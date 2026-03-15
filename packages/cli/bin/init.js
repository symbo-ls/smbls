'use strict'

import { existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { spawnSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { mergeStarterKit } from './init-helpers/mergeStarterKit.js'
import { detectPackageManager, detectRuntime, runInstall } from '../helpers/packageManager.js'
import { ensureBundlerDeps } from './bundler.js'
import { detectV2Project } from './init-helpers/v2detect.js'
import { isCdnMode, patchProjectForBrowserMode } from './init-helpers/browserMode.js'

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
  .option('--non-interactive', 'Disable prompts (require flags)', false)
  .option('--name <name>', 'Project name (non-interactive)')
  .option('--location <location>', 'Where to init: root or subfolder')
  .option('--v2-action <action>', 'V2 project action: migrate, root, or subfolder')
  .option('-y, --yes', 'Skip confirmation prompts', false)
  .action(async (dest, opts) => {
    const cwd = dest ? resolve(process.cwd(), dest) : process.cwd()
    const hasPkg = existsSync(resolve(cwd, 'package.json'))
    const interactive = !!(process.stdin?.isTTY && process.stdout?.isTTY && !opts.nonInteractive)

    // No package.json → redirect to smbls create
    if (!hasPkg) {
      console.log(chalk.yellow('No package.json found.'))
      console.log(chalk.dim('Redirecting to `smbls create`...\n'))

      let name = opts.name
      if (!name && interactive) {
        const answers = await inquirer.prompt([{
          type: 'input',
          name: 'name',
          message: 'Project name:',
          default: dest || 'my-symbols-app',
          filter: (v) => v.trim()
        }])
        name = answers.name
      }
      if (!name) name = dest || 'my-symbols-app'

      runCreate(name)
      return
    }

    // Detect v2 project — offer migration instead of plain init
    const v2info = detectV2Project(cwd)
    if (v2info.isV2) {
      console.log(chalk.yellow('\nExisting v2 Symbols project detected.'))
      let action = opts.v2Action
      if (!action && interactive) {
        const answers = await inquirer.prompt([{
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            { name: 'Migrate to v3  — upgrade project structure', value: 'migrate' },
            { name: 'Init anyway    — merge starter-kit files', value: 'root' },
            { name: 'Create subfolder', value: 'subfolder' }
          ],
          default: 'migrate'
        }])
        action = answers.action
      }
      if (!action) action = 'migrate'

      if (action === 'migrate') {
        spawnSync(process.execPath, [CLI_BIN, 'migrate'], { stdio: 'inherit', cwd })
        return
      }

      if (action === 'subfolder') {
        let name = opts.name
        if (!name && interactive) {
          const answers = await inquirer.prompt([{
            type: 'input',
            name: 'name',
            message: 'Subfolder name:',
            default: 'symbols-app',
            filter: (v) => v.trim()
          }])
          name = answers.name
        }
        if (!name) name = 'symbols-app'
        runCreate(name)
        return
      }
      // fall through to root init
    } else {
    // Has package.json → ask: init in root or create in subfolder
    let location = opts.location
    if (!location && interactive) {
      const answers = await inquirer.prompt([{
        type: 'list',
        name: 'location',
        message: 'Where do you want to initialize Symbols?',
        choices: [
          { name: 'Subfolder          — create a new project folder', value: 'subfolder' },
          { name: 'Current directory  — merge config files here', value: 'root' }
        ],
        default: 'subfolder'
      }])
      location = answers.location
    }
    if (!location) location = 'root'

    if (location === 'subfolder') {
      let name = opts.name
      if (!name && interactive) {
        const answers = await inquirer.prompt([{
          type: 'input',
          name: 'name',
          message: 'Subfolder name:',
          default: 'symbols-app',
          filter: (v) => v.trim()
        }])
        name = answers.name
      }
      if (!name) name = 'symbols-app'
      runCreate(name)
      return
    }
    } // end else (non-v2 branch)

    // Init in root: merge starter-kit files then run config
    console.log(chalk.bold('\nInitializing Symbols in current directory...\n'))
    const projectDir = await mergeStarterKit(cwd)

    if (!opts.nonInteractive) console.log(chalk.bold('Configure your project:\n'))
    const configArgs = [CLI_BIN, 'config']
    if (opts.nonInteractive) configArgs.push('--non-interactive')
    spawnSync(process.execPath, configArgs, { stdio: 'inherit', cwd: projectDir })

    // Detect package manager from saved config or environment
    const { loadSymbolsConfig } = await import('../helpers/symbolsConfig.js')
    const savedConfig = (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}
    const runtime = savedConfig.runtime || detectRuntime(projectDir)
    const pm = savedConfig.packageManager || (runtime !== 'node' ? runtime : detectPackageManager(projectDir))

    if (isCdnMode(runtime, pm)) {
      const symbolsDirName = (savedConfig.dir || './symbols').replace(/^\.\//, '')
      patchProjectForBrowserMode(resolve(projectDir, symbolsDirName), pm)
    }

    // Add bundler devDependencies before running install
    const bundler = savedConfig.bundler || 'parcel'
    if (bundler !== 'browser') {
      ensureBundlerDeps(bundler, projectDir)
    }

    if (pm !== 'browser' && !['esm.sh', 'unpkg', 'skypack', 'jsdelivr', 'pkg.symbo.ls'].includes(pm)) {
      console.log(chalk.bold(`\nInstalling dependencies with ${pm}...\n`))
      const result = runInstall(pm, projectDir)
      if (result.status !== 0) {
        console.log(chalk.yellow(`\nInstall exited with code ${result.status}. You can run \`${pm} install\` manually.`))
      }
    } else {
      console.log(chalk.dim('\nBrowser mode — no install needed.'))
    }

    console.log(chalk.green.bold('\nInitialized successfully.'))
    console.log(chalk.dim('Run `smbls start` to start the development server.'))
  })
