import { createServer } from 'http'
import { createReadStream, existsSync, statSync, readFileSync } from 'fs'
import { resolve, extname, join } from 'path'
import { program } from './program.js'
import { resolveBundler, getRunnerConfig, findBin, spawnBin } from './bundler.js'

const MIME = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.otf': 'font/otf'
}

const CDN_BASE = {
  'esm.sh': pkg => `https://esm.sh/${pkg}`,
  'unpkg': pkg => `https://unpkg.com/${pkg}?module`,
  'skypack': pkg => `https://cdn.skypack.dev/${pkg}`,
  'jsdelivr': pkg => `https://cdn.jsdelivr.net/npm/${pkg}/+esm`,
  'pkg.symbo.ls': pkg => `https://pkg.symbo.ls/${pkg}`
}

const buildImportmap = (packageManager) => {
  const fmt = CDN_BASE[packageManager] || CDN_BASE['esm.sh']
  const imports = { smbls: fmt('smbls') }
  return `<script type="importmap">\n${JSON.stringify({ imports }, null, 2)}\n</script>`
}

const injectImportmap = (html, packageManager) => {
  const tag = buildImportmap(packageManager)
  if (html.includes('</head>')) return html.replace('</head>', `${tag}\n</head>`)
  if (html.includes('<body')) return html.replace('<body', `${tag}\n<body`)
  return tag + '\n' + html
}

const serveBrowser = (entry, port, cwd, packageManager) => {
  const entryPath = join(cwd, entry)
  const server = createServer((req, res) => {
    let urlPath = req.url.split('?')[0]
    if (urlPath === '/') urlPath = `/${entry}`

    const filePath = join(cwd, urlPath)
    const isHtml = !existsSync(filePath) || statSync(filePath).isDirectory() ||
      extname(filePath) === '.html'

    if (isHtml) {
      const html = readFileSync(existsSync(filePath) && !statSync(filePath).isDirectory()
        ? filePath : entryPath, 'utf8')
      const injected = injectImportmap(html, packageManager)
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.end(injected)
      return
    }

    const ext = extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    createReadStream(filePath).pipe(res)
  })

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
}

program
  .command('start [entry]')
  .description('Start development server')
  .option('-p, --port <port>', 'Port to use (default from symbols.json or 1234)')
  .option('--no-cache', 'Disable build cache')
  .option('--open', 'Open browser on start')
  .option('--bundler <bundler>', 'Force bundler: parcel, vite, browser')
  .action(async (entry, opts) => {
    const cwd = process.cwd()
    const config = getRunnerConfig(cwd)
    const resolvedEntry = entry || config.entry
    const port = opts.port ? parseInt(opts.port, 10) : config.port

    if (config.runtime === 'browser') {
      serveBrowser(resolvedEntry, port, cwd, config.packageManager)
      return
    }

    const bundler = opts.bundler || await resolveBundler(cwd)

    if (bundler === 'vite') {
      const args = ['serve', '--port', String(port)]
      if (opts.open) args.push('--open')
      const child = spawnBin(findBin('vite', cwd), args, cwd)
      child.on('exit', code => process.exit(code || 0))
      return
    }

    // parcel (default)
    const args = [resolvedEntry, '--port', String(port)]
    if (!opts.cache) args.push('--no-cache')
    if (opts.open) args.push('--open')
    const child = spawnBin(findBin('parcel', cwd), args, cwd)
    child.on('exit', code => process.exit(code || 0))
  })
