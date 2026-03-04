'use strict'

import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { loadCliConfig, saveCliConfig, updateLegacySymbolsJson } from '../helpers/config.js'

const BUNDLER_CHOICES = [
  { name: 'Parcel   — zero-config bundler (recommended)', value: 'parcel' },
  { name: 'Vite     — fast ES module dev server', value: 'vite' },
  { name: 'Browser  — native ES modules, no bundler', value: 'browser' }
]

const CDN_CHOICES = [
  { name: 'esm.sh      — native ES modules CDN', value: 'esm.sh' },
  { name: 'unpkg       — npm package CDN', value: 'unpkg' },
  { name: 'skypack     — ES module CDN', value: 'skypack' },
  { name: 'jsdelivr    — multi-CDN provider', value: 'jsdelivr' },
  { name: 'pkg.symbo.ls — Symbols CDN', value: 'pkg.symbo.ls' }
]

const PM_CHOICES = [
  { name: 'npm', value: 'npm' },
  { name: 'yarn', value: 'yarn' },
  { name: 'pnpm', value: 'pnpm' },
  { name: 'bun', value: 'bun' }
]

program
  .command('config')
  .description('Interactively configure Symbols project settings')
  .option('--dist-dir <dir>', 'Set distDir non-interactively')
  .action(async (options) => {
    const symbolsConfig =
      (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}
    const cliConfig = loadCliConfig()

    if (options.distDir) {
      const next = { ...symbolsConfig, distDir: options.distDir }
      updateLegacySymbolsJson(next)
      console.log(chalk.green(`Updated symbols.json distDir to "${options.distDir}"`))
      return
    }

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'App key (e.g. myproject.symbo.ls):',
        default: symbolsConfig.key || '',
        filter: (v) => v.trim()
      },
      {
        type: 'input',
        name: 'branch',
        message: 'Default branch:',
        default: cliConfig.branch || symbolsConfig.branch || 'main',
        filter: (v) => v.trim() || 'main'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: symbolsConfig.version || '1.0.0',
        filter: (v) => v.trim() || '1.0.0'
      },
      {
        type: 'input',
        name: 'distDir',
        message: 'Directory for generated files (distDir):',
        default: symbolsConfig.distDir || './smbls',
        filter: (v) => v.trim() || './smbls'
      },
      {
        type: 'list',
        name: 'bundler',
        message: 'Build tool:',
        choices: BUNDLER_CHOICES,
        default: symbolsConfig.bundler || 'parcel'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: (a) => a.bundler === 'browser'
          ? 'CDN provider (dependencies resolved in browser):'
          : 'Package manager:',
        choices: (a) => a.bundler === 'browser' ? CDN_CHOICES : PM_CHOICES,
        default: (a) => {
          if (a.bundler === 'browser') {
            return CDN_CHOICES.find(c => c.value === symbolsConfig.packageManager)
              ? symbolsConfig.packageManager
              : 'esm.sh'
          }
          return PM_CHOICES.find(c => c.value === symbolsConfig.packageManager)
            ? symbolsConfig.packageManager
            : 'npm'
        }
      },
      {
        type: 'input',
        name: 'apiBaseUrl',
        message: 'API base URL:',
        default: cliConfig.apiBaseUrl || 'https://api.symbols.app',
        filter: (v) => v.trim() || 'https://api.symbols.app'
      }
    ])

    updateLegacySymbolsJson({
      ...symbolsConfig,
      key: answers.key || undefined,
      branch: answers.branch,
      version: answers.version,
      distDir: answers.distDir,
      bundler: answers.bundler,
      packageManager: answers.packageManager
    })

    saveCliConfig({
      apiBaseUrl: answers.apiBaseUrl,
      projectKey: answers.key || cliConfig.projectKey,
      branch: answers.branch
    })

    console.log(`\n`)
    console.log(chalk.green('Configuration updated successfully.'))
    const symbolsPath = path.join(process.cwd(), 'symbols.json')
    const cliConfigPath = path.join(process.cwd(), '.symbols', 'config.json')
    console.log(chalk.gray(`symbols.json    ${chalk.cyan(symbolsPath)}`))
    console.log(chalk.gray(`.symbols/config ${chalk.cyan(cliConfigPath)}`))

    if (answers.bundler === 'browser') {
      console.log(chalk.dim(`\nBrowser mode: dependencies will be resolved via ${answers.packageManager} — no npm install needed.`))
    }
  })
