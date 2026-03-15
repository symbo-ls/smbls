'use strict'

import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { updateSymbolsJson, getConfigPaths } from '../helpers/config.js'
import { runConfigPrompts } from '../helpers/configPrompts.js'

program
  .command('config')
  .description('Configure Symbols project settings')
  .option('--non-interactive', 'Disable prompts (use flags or defaults)', false)
  .option('--dist-dir <dir>', 'Set dir non-interactively')
  .option('--key <key>', 'App key')
  .option('--branch <branch>', 'Default branch')
  .option('--version <version>', 'Version')
  .option('--dir <dir>', 'Symbols source directory')
  .option('--runtime <runtime>', 'Environment: node, bun, deno, browser')
  .option('--bundler <bundler>', 'Build tool: parcel, vite, turbopack, webpack, rollup')
  .option('--package-manager <pm>', 'Package manager: npm, yarn, pnpm, bun')
  .option('--api-base-url <url>', 'API base URL')
  .option('--deploy <target>', 'Deploy target: symbols, cloudflare, vercel, netlify, github-pages')
  .action(async (options) => {
    const symbolsConfig =
      (await loadSymbolsConfig({ required: false, validateKey: false, silent: true })) || {}

    if (options.distDir) {
      updateSymbolsJson({ ...symbolsConfig, dir: options.distDir })
      console.log(chalk.green(`Updated symbols.json dir to "${options.distDir}"`))
      return
    }

    const { bundler, packageManager } = await runConfigPrompts(symbolsConfig, {
      nonInteractive: options.nonInteractive,
      key: options.key,
      branch: options.branch,
      version: options.version,
      dir: options.dir,
      runtime: options.runtime,
      bundler: options.bundler,
      packageManager: options.packageManager,
      apiBaseUrl: options.apiBaseUrl,
      deploy: options.deploy
    })

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
