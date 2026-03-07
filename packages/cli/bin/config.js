'use strict'

import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { updateSymbolsJson, getConfigPaths } from '../helpers/config.js'
import { runConfigPrompts } from '../helpers/configPrompts.js'

program
  .command('config')
  .description('Interactively configure Symbols project settings')
  .option('--dist-dir <dir>', 'Set dir non-interactively')
  .action(async (options) => {
    const symbolsConfig =
      (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}

    if (options.distDir) {
      updateSymbolsJson({ ...symbolsConfig, dir: options.distDir })
      console.log(chalk.green(`Updated symbols.json dir to "${options.distDir}"`))
      return
    }

    const { bundler, packageManager } = await runConfigPrompts(symbolsConfig)

    console.log('\n')
    console.log(chalk.green('Configuration updated successfully.'))
    const paths = getConfigPaths()
    const symbolsPath = paths.legacySymbolsJson
    const configPath = paths.configPath
    console.log(chalk.gray(`symbols.json              ${chalk.cyan(symbolsPath)}`))
    console.log(chalk.gray(`.symbols_local/config.json ${chalk.cyan(configPath)}`))

    if (bundler === 'browser') {
      console.log(chalk.dim(`\nBrowser mode: dependencies will be resolved via ${packageManager} — no install needed.`))
    }
  })
