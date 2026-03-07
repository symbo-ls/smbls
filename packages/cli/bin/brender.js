import { existsSync, readFileSync, mkdirSync, writeFileSync, watch } from 'fs'
import { resolve } from 'path'
import chalk from 'chalk'
import { program } from './program.js'
import { getRunnerConfig, getSymbols } from './bundler.js'

/**
 * Bundle the SPA entry point for the browser using esbuild.
 * Produces a single client.js that can be included in pre-rendered HTML
 * for ISR hydration, SPA navigation, and data fetching.
 */
const bundleClient = async (cwd, outDir) => {
  const entry = resolve(cwd, 'symbols', 'index.js')
  if (!existsSync(entry)) return null

  const esbuild = await import('esbuild')
  const outFile = resolve(cwd, outDir, 'client.js')

  // Resolve the smbls monorepo root for workspace packages
  const cliDir = new URL('.', import.meta.url).pathname
  const monorepoRoot = resolve(cliDir, '../../..')

  const workspacePlugin = {
    name: 'workspace-resolve',
    setup (build) {
      // Resolve smbls bare import → monorepo source
      build.onResolve({ filter: /^smbls$/ }, (args) => {
        const src = resolve(monorepoRoot, 'packages', 'smbls', 'src', 'index.js')
        if (existsSync(src)) return { path: src }
      })
      // Handle JSON imports (package.json with { type: 'json' })
      build.onResolve({ filter: /\.json$/ }, args => {
        if (args.resolveDir) {
          const full = resolve(args.resolveDir, args.path)
          if (existsSync(full)) return { path: full }
        }
      })
      // Fix source issues: import attributes and circular imports
      build.onLoad({ filter: /smbls\/src\/options\.js$/ }, async (args) => {
        let contents = readFileSync(args.path, 'utf8')
        contents = contents.replace(
          /import\s*\{[^}]*version[^}]*\}\s*from\s*['"][^'"]*package\.json['"][^;\n]*/,
          `const version = '${smblsVersion}'`
        )
        return { contents, loader: 'js' }
      })
      build.onLoad({ filter: /smbls\/src\/router\.js$/ }, async (args) => {
        let contents = readFileSync(args.path, 'utf8')
        // Break circular: smbls/router imports Link from smbls (itself)
        contents = contents.replace(
          /import\s*\{\s*Link\s*\}\s*from\s*['"]smbls['"]/,
          `const Link = { tag: 'a', attr: { href: (el) => el.props?.href } }`
        )
        return { contents, loader: 'js' }
      })
      // Resolve @symbo.ls/* packages
      build.onResolve({ filter: /^@symbo\.ls\// }, args => {
        const pkg = args.path.replace('@symbo.ls/', '')
        for (const dir of ['packages', 'plugins']) {
          const src = resolve(monorepoRoot, dir, pkg, 'src', 'index.js')
          if (existsSync(src)) return { path: src }
          const dist = resolve(monorepoRoot, dir, pkg, 'index.js')
          if (existsSync(dist)) return { path: dist }
        }
        const blank = resolve(monorepoRoot, 'packages', 'default-config', 'blank', 'index.js')
        if (pkg === 'default-config' && existsSync(blank)) return { path: blank }
      })
      // Resolve @domql/* packages
      build.onResolve({ filter: /^@domql\// }, args => {
        const pkg = args.path.replace('@domql/', '')
        const src = resolve(monorepoRoot, 'packages', 'domql', 'packages', pkg, 'src', 'index.js')
        if (existsSync(src)) return { path: src }
        // Try without src/
        const dist = resolve(monorepoRoot, 'packages', 'domql', 'packages', pkg, 'index.js')
        if (existsSync(dist)) return { path: dist }
      })
      // Resolve @emotion/* packages
      build.onResolve({ filter: /^@emotion\// }, args => {
        // Try monorepo node_modules first
        const nm = resolve(monorepoRoot, 'node_modules', args.path)
        if (existsSync(nm)) return { path: nm }
        const nmPkg = resolve(nm, 'package.json')
        if (existsSync(nmPkg)) {
          try {
            const pkg = JSON.parse(readFileSync(nmPkg, 'utf8'))
            const main = pkg.module || pkg.main || 'index.js'
            return { path: resolve(nm, main) }
          } catch {}
        }
      })
      // Resolve monorepo packages (css-in-props, etc.)
      build.onResolve({ filter: /^css-in-props/ }, args => {
        const base = resolve(monorepoRoot, 'packages', 'css-in-props')
        const subpath = args.path.replace(/^css-in-props\/?/, '')
        if (subpath) {
          const full = resolve(base, subpath)
          // Try as directory with index.js first, then as .js file
          const idx = resolve(full, 'index.js')
          if (existsSync(idx)) return { path: idx }
          if (existsSync(full + '.js')) return { path: full + '.js' }
          if (existsSync(full)) return { path: full }
        }
        const src = resolve(base, 'src', 'index.js')
        if (existsSync(src)) return { path: src }
        const idx = resolve(base, 'index.js')
        if (existsSync(idx)) return { path: idx }
      })
      // Resolve npm deps from project or monorepo node_modules
      build.onResolve({ filter: /^[^./]/ }, args => {
        // Skip already handled packages
        if (/^(smbls|@symbo\.ls\/|@domql\/|@emotion\/|css-in-props)/.test(args.path)) return
        // Try project node_modules
        const projNm = resolve(cwd, 'node_modules', args.path)
        if (existsSync(projNm)) return { path: projNm }
        // Try monorepo node_modules
        const monoNm = resolve(monorepoRoot, 'node_modules', args.path)
        if (existsSync(monoNm)) return { path: monoNm }
      })
    }
  }

  // Read smbls version for define
  let smblsVersion = '0.0.0'
  const smblsPkgPath = resolve(monorepoRoot, 'packages', 'smbls', 'package.json')
  if (existsSync(smblsPkgPath)) {
    try {
      smblsVersion = JSON.parse(readFileSync(smblsPkgPath, 'utf8')).version
    } catch {}
  }

  await esbuild.build({
    entryPoints: [entry],
    bundle: true,
    format: 'esm',
    platform: 'browser',
    outfile: outFile,
    write: true,
    logLevel: 'warning',
    minify: false,
    splitting: false,
    treeShaking: true,
    plugins: [workspacePlugin],
    supported: { 'import-attributes': false },
    define: {
      'process.env.NODE_ENV': '"production"',
      'global': 'globalThis'
    }
  })

  return 'client.js'
}

const renderAll = async (cwd, outDir, { isr } = {}) => {
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

  // ISR: bundle client SPA JavaScript
  let isrOpts = {}
  if (isr) {
    try {
      const clientScript = await bundleClient(cwd, outDir)
      if (clientScript) {
        isrOpts = { isr: { clientScript } }
        console.log(chalk.dim(`  Client bundle -> ${clientScript}`))
      }
    } catch (err) {
      console.error(chalk.yellow(`  Client bundle failed: ${err.message}`))
    }
  }

  // Suppress console noise during SSR — lifecycle handlers often log
  // errors about missing browser APIs / services (supabase, auth, etc.)
  const _warn = console.warn
  const _error = console.error
  const _log = console.log

  for (const route of routes) {
    try {
      // Suppress during render, restore for our own output
      console.warn = () => {}
      console.error = () => {}
      console.log = () => {}

      const result = await renderPage(data, route, isrOpts)

      // Allow async microtasks to flush with console still suppressed
      await new Promise(r => setTimeout(r, 0))

      console.warn = _warn
      console.error = _error
      console.log = _log

      if (!result) continue

      // Use directory structure so static servers resolve clean URLs:
      // /about → about/index.html, / → index.html
      const fileName = route === '/' ? 'index.html' : route.replace(/^\//, '').replace(/\/$/, '') + '/index.html'
      const filePath = resolve(dest, fileName)
      mkdirSync(resolve(filePath, '..'), { recursive: true })
      writeFileSync(filePath, result.html)
      _log(chalk.dim(`  ${route} -> ${fileName} (${result.brKeyCount} keys)`))
    } catch (err) {
      console.warn = _warn
      console.error = _error
      console.log = _log
      _error(chalk.yellow(`  ${route} failed: ${err.message}`))
    }
  }
}

program
  .command('brender')
  .description('Pre-render pages with brender')
  .option('--out-dir <dir>', 'Output directory (default from symbols.json or dist)')
  .option('--no-isr', 'Disable ISR (skip client SPA bundle for hydration + data fetching)')
  .option('-w, --watch', 'Watch for changes and re-render')
  .action(async (opts) => {
    const cwd = process.cwd()
    const config = getRunnerConfig(cwd)
    const symbols = getSymbols(cwd)
    const outDir = opts.outDir || config.distDir
    const symbolsDir = resolve(cwd, symbols.dir || 'symbols')

    const pkgPath = resolve(cwd, 'package.json')
    if (existsSync(pkgPath)) {
      try {
        const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))
        if (pkg.type !== 'module') {
          console.warn(chalk.yellow('⚠') + ` Add ${chalk.bold('"type": "module"')} to your package.json to avoid module resolution warnings`)
        }
      } catch {}
    }

    try {
      console.log(chalk.dim('Pre-rendering pages with brender...'))
      const isr = opts.isr !== false
      if (isr) console.log(chalk.dim('  ISR enabled — bundling client SPA'))
      await renderAll(cwd, outDir, { isr })
      console.log(chalk.green('✓') + ` Brender complete -> ${outDir}/`)

      if (opts.watch) {
        console.log(chalk.dim(`\nWatching ${symbols.dir || 'symbols'}/ for changes...\n`))
        let debounce = null
        watch(symbolsDir, { recursive: true }, (event, filename) => {
          if (debounce) clearTimeout(debounce)
          debounce = setTimeout(async () => {
            console.log(chalk.dim(`\n${filename} changed, re-rendering...`))
            try {
              await renderAll(cwd, outDir, { isr })
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
