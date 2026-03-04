import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join, dirname, resolve } from 'path'
import { spawn } from 'child_process'
import { createServer } from 'net'
import { program } from './program.js'
import { resolveBundler, getRunnerConfig, findBin, spawnBin } from './bundler.js'

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

const GLOBALS_SCRIPT = `  <script type="module">
    import * as smbls from 'smbls'
    Object.assign(globalThis, smbls)
  </script>`

const injectImportmap = (html, packageManager) => {
  const tag = buildImportmap(packageManager) + '\n' + GLOBALS_SCRIPT
  if (html.includes('</head>')) return html.replace('</head>', `${tag}\n</head>`)
  if (html.includes('<body')) return html.replace('<body', `${tag}\n<body`)
  return tag + '\n' + html
}

const findFreePort = (port) => new Promise((resolve) => {
  const server = createServer()
  server.listen(port, () => { server.close(() => resolve(port)) })
  server.on('error', () => resolve(findFreePort(port + 1)))
})

const startBrowser = (entry, port, cwd, packageManager, open) => {
  const entryPath = join(cwd, entry)
  if (existsSync(entryPath)) {
    const html = readFileSync(entryPath, 'utf8')
    const cdnUrl = (CDN_BASE[packageManager] || CDN_BASE['esm.sh'])('smbls')
    if (!html.includes('type="importmap"')) {
      writeFileSync(entryPath, injectImportmap(html, packageManager))
    } else if (!html.includes(cdnUrl)) {
      const updated = html.replace(/<script type="importmap">[\s\S]*?<\/script>/, buildImportmap(packageManager))
      writeFileSync(entryPath, updated)
    }
  }

  const root = dirname(resolve(cwd, entry))
  const liveServerArgs = [root, `--port=${port}`]
  if (!open) liveServerArgs.push('--no-browser')

  const bin = findBin('live-server', cwd)
  const [cmd, args] = existsSync(bin)
    ? [bin, liveServerArgs]
    : ['npx', ['--yes', 'live-server', ...liveServerArgs]]

  const child = spawn(cmd, args, { stdio: 'inherit', cwd, shell: process.platform === 'win32' })
  child.on('exit', code => process.exit(code || 0))
}

program
  .command('start [entry]')
  .description('Start development server')
  .option('-p, --port <port>', 'Port to use (default from symbols.json or 1234)')
  .option('--no-cache', 'Disable build cache')
  .option('--open', 'Open browser on start')
  .option('--bundler <bundler>', 'Force bundler: parcel, vite, browser')
  .allowUnknownOption()
  .action(async (entry, opts, cmd) => {
    const cwd = process.cwd()
    const config = getRunnerConfig(cwd)
    const resolvedEntry = (entry && !entry.startsWith('-') ? entry : null) || config.entry
    const port = await findFreePort(opts.port ? parseInt(opts.port, 10) : config.port)

    // Collect unknown/pass-through args for the underlying bundler
    const KNOWN_FLAGS = new Set(['--no-cache', '--cache', '--open', '--bundler', '-p', '--port'])
    const KNOWN_VALUE_FLAGS = new Set(['--bundler', '-p', '--port'])
    const startIdx = process.argv.indexOf('start')
    const rawArgs = startIdx >= 0 ? process.argv.slice(startIdx + 1) : []
    const extraArgs = []
    for (let i = 0; i < rawArgs.length; i++) {
      const a = rawArgs[i]
      if (!a.startsWith('-')) continue
      const key = a.includes('=') ? a.split('=')[0] : a
      if (KNOWN_FLAGS.has(key)) {
        if (KNOWN_VALUE_FLAGS.has(key) && !a.includes('=')) i++ // skip value
      } else {
        extraArgs.push(a)
        // if space-separated value (not another flag), include it too
        if (!a.includes('=') && i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
          extraArgs.push(rawArgs[++i])
        }
      }
    }

    if (config.runtime === 'browser') {
      startBrowser(resolvedEntry, port, cwd, config.packageManager, opts.open)
      return
    }

    const bundler = opts.bundler || await resolveBundler(cwd)

    if (bundler === 'vite') {
      const args = ['serve', '--port', String(port)]
      if (opts.open) args.push('--open')
      args.push(...extraArgs)
      const child = spawnBin(findBin('vite', cwd), args, cwd)
      child.on('exit', code => process.exit(code || 0))
      return
    }

    // parcel (default)
    const args = ['serve', resolvedEntry, '--port', String(port)]
    if (!opts.cache) args.push('--no-cache')
    if (opts.open) args.push('--open')
    args.push(...extraArgs)
    const child = spawnBin(findBin('parcel', cwd), args, cwd)
    child.on('exit', code => process.exit(code || 0))
  })
