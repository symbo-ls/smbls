import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { resolveBundler, getRunnerConfig, findBin, spawnBin } from './bundler.js'

const copyDir = (src, dest) => {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src)) {
    if (entry === 'node_modules' || entry.startsWith('.')) continue
    const s = join(src, entry)
    const d = join(dest, entry)
    statSync(s).isDirectory() ? copyDir(s, d) : copyFileSync(s, d)
  }
}

const runBrender = async (cwd, outDir) => {
  try {
    const { loadProject } = await import('@domql/brender/load')
    const { renderPage } = await import('@domql/brender')

    console.log(chalk.dim('Pre-rendering pages with brender...'))
    const data = await loadProject(cwd)
    const pages = data.pages || {}
    const routes = Object.keys(pages)

    if (!routes.length) {
      console.log(chalk.dim('  No pages found, skipping brender'))
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

    console.log(chalk.green('✓') + ' Brender pre-rendering complete')
  } catch (err) {
    console.error(chalk.yellow('Brender pre-rendering failed:'), err.message)
  }
}

const waitForExit = (child) => new Promise(resolve => {
  child.on('exit', code => resolve(code || 0))
})

program
  .command('build [entry]')
  .description('Build project for production')
  .option('--no-cache', 'Disable build cache')
  .option('--no-optimize', 'Disable optimization')
  .option('--no-brender', 'Skip brender pre-rendering')
  .option('--out-dir <dir>', 'Output directory (default from symbols.json or dist)')
  .option('--bundler <bundler>', 'Force bundler: parcel, vite, browser')
  .action(async (entry, opts) => {
    const cwd = process.cwd()
    const config = getRunnerConfig(cwd)
    const bundler = opts.bundler || await resolveBundler(cwd)
    const resolvedEntry = entry || config.entry
    const outDir = opts.outDir || config.distDir
    const shouldBrender = opts.brender !== false && config.brender

    if (bundler === 'browser') {
      const dest = resolve(cwd, outDir)
      console.log(chalk.dim(`Copying files to ${outDir}/ (browser native mode)...`))
      copyDir(cwd, dest)
      console.log(chalk.green('✓') + ` Built to ${outDir}/`)
      if (shouldBrender) await runBrender(cwd, outDir)
      return
    }

    if (bundler === 'vite') {
      const args = ['build', '--outDir', outDir]
      if (!opts.optimize) args.push('--minify=false')
      const child = spawnBin(findBin('vite', cwd), args, cwd)
      const code = await waitForExit(child)
      if (code !== 0) return process.exit(code)
      if (shouldBrender) await runBrender(cwd, outDir)
      return
    }

    // parcel (default)
    const args = ['build', resolvedEntry, '--dist-dir', outDir]
    if (!opts.cache) args.push('--no-cache')
    if (!opts.optimize) args.push('--no-optimize')
    const child = spawnBin(findBin('parcel', cwd), args, cwd)
    const code = await waitForExit(child)
    if (code !== 0) return process.exit(code)
    if (shouldBrender) await runBrender(cwd, outDir)
  })
