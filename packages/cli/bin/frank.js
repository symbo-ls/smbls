'use strict'

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'

const frankCmd = program
  .command('frank')
  .description('Transform between Symbols JSON and filesystem formats')

frankCmd
  .command('to-json')
  .description('Convert a Symbols filesystem project to JSON')
  .arguments('[src]')
  .option('-o, --output <path>', 'Output JSON file path')
  .option('--no-stringify', 'Keep functions as-is (not stringified)')
  .option('-v, --verbose', 'Verbose output')
  .action(async (src, opts) => {
    try {
      const { toJSON } = await import('@symbo.ls/frank')

      const symbolsConfig = await loadSymbolsConfig().catch(() => ({}))
      const distDir = src
        ? path.resolve(src)
        : resolveDistDir(symbolsConfig) || path.join(process.cwd(), 'symbols')

      if (!fs.existsSync(distDir)) {
        console.error(chalk.red(`Directory not found: ${distDir}`))
        process.exit(1)
      }

      console.log(chalk.dim(`Reading project from ${distDir}...`))

      const result = await toJSON(distDir, {
        stringify: opts.stringify !== false
      })

      if (opts.output) {
        const outPath = path.resolve(opts.output)
        await fs.promises.mkdir(path.dirname(outPath), { recursive: true })
        await fs.promises.writeFile(outPath, JSON.stringify(result, null, 2), 'utf8')
        console.log(chalk.green(`Written to ${outPath}`))
      } else {
        process.stdout.write(JSON.stringify(result, null, 2) + '\n')
      }
    } catch (error) {
      console.error(chalk.red('Failed:'), error.message)
      if (opts.verbose) console.error(error.stack)
      process.exit(1)
    }
  })

frankCmd
  .command('to-fs')
  .description('Convert a Symbols JSON file to filesystem project')
  .arguments('<json> [dest]')
  .option('--overwrite', 'Overwrite existing files')
  .option('-v, --verbose', 'Verbose output')
  .action(async (jsonPath, dest, opts) => {
    try {
      const { toFS } = await import('@symbo.ls/frank')

      const resolvedJson = path.resolve(jsonPath)
      if (!fs.existsSync(resolvedJson)) {
        console.error(chalk.red(`JSON file not found: ${resolvedJson}`))
        process.exit(1)
      }

      const symbolsConfig = await loadSymbolsConfig().catch(() => ({}))
      const distDir = dest
        ? path.resolve(dest)
        : resolveDistDir(symbolsConfig) || path.join(process.cwd(), 'symbols')

      console.log(chalk.dim(`Reading JSON from ${resolvedJson}...`))
      const data = JSON.parse(await fs.promises.readFile(resolvedJson, 'utf8'))

      console.log(chalk.dim(`Writing filesystem to ${distDir}...`))
      await toFS(data, distDir, { overwrite: !!opts.overwrite })

      console.log(chalk.green('Done.'))

      const sections = ['components', 'pages', 'functions', 'methods', 'snippets', 'designSystem', 'files']
      for (const key of sections) {
        if (data[key] && typeof data[key] === 'object') {
          const count = Object.keys(data[key]).length
          if (count) console.log(chalk.dim(`  ${key}: ${chalk.white(count)} entries`))
        }
      }
    } catch (error) {
      console.error(chalk.red('Failed:'), error.message)
      if (opts.verbose) console.error(error.stack)
      process.exit(1)
    }
  })
