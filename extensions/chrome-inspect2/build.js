#!/usr/bin/env node

// try to refactor typical html css files into symbols in smbls/extensions/chrome-inspect2/static
const esbuild = require('esbuild')
const path = require('path')
const fs = require('fs')

const root = __dirname
const srcDir = path.join(root, 'src')
const staticDir = path.join(root, 'static')
const outDir = path.join(root, 'dist')

const ENTRIES = [
  {
    in: path.join(srcDir, 'content.js'),
    out: path.join(outDir, 'content.js'),
    name: 'content'
  },
  {
    in: path.join(srcDir, 'settings', 'settings_ui.js'),
    out: path.join(outDir, 'settings_ui.js'),
    name: 'settings'
  },
  {
    in: path.join(srcDir, 'service_worker.js'),
    out: path.join(outDir, 'service_worker.js'),
    name: 'service_worker'
  },
  {
    in: path.join(srcDir, 'popup.js'),
    out: path.join(outDir, 'popup.js'),
    name: 'popup'
  }
]

const copyRecursive = (src, dest) => {
  if (!fs.existsSync(src)) return
  const stats = fs.statSync(src)
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry))
    }
  } else {
    fs.copyFileSync(src, dest)
  }
}

const copyStatic = () => {
  if (fs.existsSync(staticDir)) {
    for (const entry of fs.readdirSync(staticDir)) {
      const srcEntry = path.join(staticDir, entry)
      const destEntry = path.join(outDir, entry)
      if (fs.existsSync(destEntry)) {
        fs.rmSync(destEntry, { recursive: true, force: true })
      }
      copyRecursive(srcEntry, destEntry)
    }
  }
  console.log('Copied static files.')
}

const syncManifestVersion = () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
  const manifestPath = path.join(outDir, 'manifest.json')
  if (!fs.existsSync(manifestPath)) return
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
  manifest.version = pkg.version
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8')
  console.log(`Manifest version synced to ${pkg.version}`)
}

const makeEsbuildOptions = ({
  entry,
  outfile,
  minify = false,
  sourcemap = false
}) => ({
  entryPoints: [entry],
  bundle: true,
  format: 'esm',
  target: ['esnext'],
  outfile,
  define: { 'process.env.NODE_ENV': '"development"' },
  minify,
  sourcemap
})

const rewriteUrls = (oldDomain, newDomain) => {
  const manifestPath = path.join(outDir, 'manifest.json')
  if (fs.existsSync(manifestPath)) {
    const text = fs.readFileSync(manifestPath, 'utf8')
    fs.writeFileSync(
      manifestPath,
      text.split(oldDomain).join(newDomain),
      'utf8'
    )
  }

  const textExt = ['.js', '.css', '.html', '.json', '.map', '.svg']
  const walkDir = (dir, cb) => {
    if (!fs.existsSync(dir)) return
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry)
      const st = fs.statSync(full)
      if (st.isDirectory()) walkDir(full, cb)
      else cb(full)
    }
  }

  walkDir(outDir, (file) => {
    if (path.basename(file) === 'manifest.json') return
    if (!textExt.includes(path.extname(file))) return
    try {
      const txt = fs.readFileSync(file, 'utf8')
      if (txt.includes(oldDomain)) {
        fs.writeFileSync(file, txt.split(oldDomain).join(newDomain), 'utf8')
      }
    } catch (e) {
      /* ignore */
    }
  })
}

const buildOnce = async ({ minify = false, local = false } = {}) => {
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  await Promise.all(
    ENTRIES.map((e) =>
      esbuild.build(
        makeEsbuildOptions({
          entry: e.in,
          outfile: e.out,
          minify,
          sourcemap: !minify
        })
      )
    )
  )
  console.log('Bundles written: content.js, settings_ui.js, service_worker.js, popup.js')
  copyStatic()
  syncManifestVersion()

  if (local) {
    try {
      rewriteUrls('https://symbols.app', 'http://localhost:1024')
      console.log('Rewrote URLs for local development')
    } catch (e) {
      console.error('Error rewriting URLs:', e)
    }
  }
}

function debounce(fn, ms) {
  let t = null
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}

const run = async () => {
  const args = process.argv.slice(2)
  const watch = args.includes('--watch')
  const minify =
    args.includes('--prod') || process.env.NODE_ENV === 'production'
  const local = args.includes('--local') || args.includes('-l')

  if (!watch) {
    try {
      await buildOnce({ minify, local })
      console.log('Build complete.')
      process.exit(0)
    } catch (err) {
      console.error('Build failed:', err)
      process.exit(1)
    }
  }

  const chokidar = require('chokidar')

  try {
    await buildOnce({ minify: false, local })
    console.log('Watching for changes...')

    const watchPaths = [path.join(srcDir, '**', '*.js'), staticDir]

    const watcher = chokidar.watch(watchPaths, {
      ignoreInitial: true,
      persistent: true
    })

    const debouncedBuild = debounce(async () => {
      try {
        console.log('Change detected — rebuilding...')
        await buildOnce({ minify: false, local })
        console.log('Rebuild complete')
      } catch (e) {
        console.error('Rebuild failed:', e)
      }
    }, 200)

    watcher.on('all', () => debouncedBuild())
  } catch (err) {
    console.error('Watch failed:', err)
    process.exit(1)
  }
}

run()
