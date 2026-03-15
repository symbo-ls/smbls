'use strict'

import path from 'path'
import inquirer from 'inquirer'
import chalk from 'chalk'
import { program } from './program.js'
import { getConfiguredDistDirValue, loadSymbolsConfig, setConfiguredDistDir } from '../helpers/symbolsConfig.js'
import { loadCliConfig, saveCliConfig, updateLegacySymbolsJson } from '../helpers/config.js'

program
  .command('config')
  .description('Interactively configure Symbols project settings')
  .option('--dist-dir <dir>', 'Set distDir non-interactively')
  .action(async (options) => {
    // Load existing configs (do not fail if missing/malformed)
    const symbolsConfig =
      (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}
    const cliConfig = loadCliConfig()
    const configuredDistDir = getConfiguredDistDirValue(symbolsConfig) || './smbls'

    // Fast path: only update distDir when provided explicitly
    if (options.distDir) {
      const next = setConfiguredDistDir(symbolsConfig, options.distDir)
      updateLegacySymbolsJson(next)
      console.log(chalk.green(`Updated symbols.json generated directory to '${options.distDir}'`))
      return
    }

    const questions = [
      {
        type: 'input',
        name: 'key',
        message: 'App key (symbols.json.key):',
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
        name: 'distDir',
        message: 'Directory for generated files (distDir/dir):',
        default: configuredDistDir,
        filter: (v) => v.trim() || './smbls'
      },
      {
        type: 'input',
        name: 'apiBaseUrl',
        message: 'API base URL:',
        default: cliConfig.apiBaseUrl || 'https://api.symbols.app',
        filter: (v) => v.trim() || 'https://api.symbols.app'
      }
    ]

    const answers = await inquirer.prompt(questions)
    const nextSymbolsConfig = setConfiguredDistDir(symbolsConfig, answers.distDir)

    // Update symbols.json (legacy project config)
    const nextSymbols = updateLegacySymbolsJson({
      ...nextSymbolsConfig,
      key: answers.key || undefined,
      branch: answers.branch
    })

    // Update .symbols/config.json (runtime CLI config)
    saveCliConfig({
      apiBaseUrl: answers.apiBaseUrl,
      projectKey: answers.key || cliConfig.projectKey || nextSymbols.key,
      branch: answers.branch
    })

    console.log('\n')
    console.log(chalk.green('Configuration updated successfully.'))
    const symbolsPath = path.join(process.cwd(), 'symbols.json')
    const cliConfigPath = path.join(process.cwd(), '.symbols', 'config.json')
    console.log(chalk.gray(`symbols.json: ${chalk.cyan(symbolsPath)}`))
    console.log(chalk.gray(`.symbols/config.json: ${chalk.cyan(cliConfigPath)}`))
  })
