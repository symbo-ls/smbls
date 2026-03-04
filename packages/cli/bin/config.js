'use strict'

import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { updateLegacySymbolsJson } from '../helpers/config.js'
import { runConfigPrompts } from '../helpers/configPrompts.js'

program
  .command('config')
  .description('Interactively configure Symbols project settings')
  .option('--dist-dir <dir>', 'Set distDir non-interactively')
  .action(async (options) => {
    const symbolsConfig =
      (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}

    if (options.distDir) {
      updateLegacySymbolsJson({ ...symbolsConfig, distDir: options.distDir })
      console.log(chalk.green(`Updated symbols.json distDir to "${options.distDir}"`))
      return
    }

    const { bundler, packageManager } = await runConfigPrompts(symbolsConfig)

    console.log('\n')
    console.log(chalk.green('Configuration updated successfully.'))
    const symbolsPath = path.join(process.cwd(), 'symbols.json')
    const cliConfigPath = path.join(process.cwd(), '.symbols_cache', 'config.json')
    console.log(chalk.gray(`symbols.json          ${chalk.cyan(symbolsPath)}`))
    console.log(chalk.gray(`.symbols_cache/config ${chalk.cyan(cliConfigPath)}`))

    if (bundler === 'browser') {
      console.log(chalk.dim(`\nBrowser mode: dependencies will be resolved via ${packageManager} — no install needed.`))
    }
  })
