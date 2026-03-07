import { mkdirSync, writeFileSync, watch } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { getRunnerConfig, getSymbols } from './bundler.js'

const renderAll = async (cwd, outDir) => {
  const { loadProject } = await import('@symbo.ls/brender/load')
  const { renderPage } = await import('@symbo.ls/brender')

  const data = await loadProject(cwd)
  const pages = data.pages || {}
  const routes = Object.keys(pages)

  if (!routes.length) {
    console.log(chalk.dim('  No pages found, nothing to render'))
    return
  }

  const dest = resolve(cwd, outDir)
  mkdirSync(dest, { recursive: true })

  for (const route of routes) {
    try {
      const result = await renderPage(data, route)
      if (!result) continue

      const fileName = route === '/' ? 'index.html' : route.replace(/^\//, '').replace(/\/$/, '') + '.html'
      const filePath = resolve(dest, fileName)
      mkdirSync(resolve(filePath, '..'), { recursive: true })
      writeFileSync(filePath, result.html)
      console.log(chalk.dim(`  ${route} -> ${fileName} (${result.brKeyCount} keys)`))
    } catch (err) {
      console.error(chalk.yellow(`  ${route} failed: ${err.message}`))
    }
  }
}

program
  .command('brender')
  .description('Pre-render pages with brender')
  .option('--out-dir <dir>', 'Output directory (default from symbols.json or dist)')
  .option('-w, --watch', 'Watch for changes and re-render')
  .action(async (opts) => {
    const cwd = process.cwd()
    const config = getRunnerConfig(cwd)
    const symbols = getSymbols(cwd)
    const outDir = opts.outDir || config.distDir
    const symbolsDir = resolve(cwd, symbols.dir || 'symbols')

    try {
      console.log(chalk.dim('Pre-rendering pages with brender...'))
      await renderAll(cwd, outDir)
      console.log(chalk.green('✓') + ` Brender complete -> ${outDir}/`)

      if (opts.watch) {
        console.log(chalk.dim(`\nWatching ${symbols.dir || 'symbols'}/ for changes...\n`))
        let debounce = null
        watch(symbolsDir, { recursive: true }, (event, filename) => {
          if (debounce) clearTimeout(debounce)
          debounce = setTimeout(async () => {
            console.log(chalk.dim(`\n${filename} changed, re-rendering...`))
            try {
              await renderAll(cwd, outDir)
              console.log(chalk.green('✓') + ` Brender complete -> ${outDir}/`)
            } catch (err) {
              console.error(chalk.red('Brender failed:'), err.message)
            }
          }, 300)
        })
      }
    } catch (err) {
      console.error(chalk.red('Brender failed:'), err.message)
      process.exit(1)
    }
  })
