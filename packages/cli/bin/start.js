import { createServer } from 'http'
import { createReadStream, existsSync, statSync } from 'fs'
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

const serveBrowser = (entry, port, cwd) => {
  const server = createServer((req, res) => {
    let urlPath = req.url.split('?')[0]
    if (urlPath === '/') urlPath = `/${entry}`

    const filePath = join(cwd, urlPath)

    if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      createReadStream(join(cwd, entry)).pipe(res)
      return
    }

    const ext = extname(filePath)
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' })
    createReadStream(filePath).pipe(res)
  })

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
    console.log(`Entry: ${entry} — browser native mode (no bundler)`)
    console.log(`Dependencies resolved from dependencies.js`)
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
      serveBrowser(resolvedEntry, port, cwd)
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
