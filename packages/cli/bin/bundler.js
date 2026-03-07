import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { spawn, spawnSync } from 'child_process'
import chalk from 'chalk'

const BUNDLERS = ['parcel', 'vite', 'browser']

export const BUNDLER_PACKAGES = {
  parcel: ['parcel'],
  vite: ['vite'],
  webpack: ['webpack', 'webpack-cli', 'webpack-dev-server'],
  rollup: ['rollup'],
  turbopack: ['@next/turbo']
}

/**
 * Add bundler devDependencies to package.json if missing.
 * Optionally installs them immediately with the given package manager.
 */
export const ensureBundlerDeps = (bundler, cwd = process.cwd(), { install, pm } = {}) => {
  const pkgs = BUNDLER_PACKAGES[bundler]
  if (!pkgs || !pkgs.length) return false

  const pkgPath = resolve(cwd, 'package.json')
  if (!existsSync(pkgPath)) return false

  let pkg
  try { pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) } catch { return false }

  const devDeps = pkg.devDependencies || {}
  const deps = pkg.dependencies || {}
  const missing = pkgs.filter(p => !devDeps[p] && !deps[p])
  if (!missing.length) return false

  pkg.devDependencies = devDeps
  for (const p of missing) pkg.devDependencies[p] = 'latest'
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')

  if (install && pm) {
    console.log(chalk.dim(`Installing ${missing.join(', ')}...`))
    const cmds = {
      npm: ['npm', ['install', '--save-dev', ...missing]],
      yarn: ['yarn', ['add', '--dev', ...missing]],
      pnpm: ['pnpm', ['add', '-D', ...missing]],
      bun: ['bun', ['add', '--dev', ...missing]],
      deno: ['deno', ['install']]
    }
    const [cmd, args] = cmds[pm] || cmds.npm
    spawnSync(cmd, args, { stdio: 'inherit', cwd })
  }

  return true
}

export const findBin = (name, cwd = process.cwd()) => {
  let dir = resolve(cwd)
  for (let i = 0; i < 10; i++) {
    const bin = resolve(dir, 'node_modules', '.bin', name)
    if (existsSync(bin)) return bin
    const parent = dirname(dir)
    if (parent === dir) break
    dir = parent
  }
  return resolve(cwd, 'node_modules', '.bin', name)
}

export const getSymbols = (cwd = process.cwd()) => {
  const p = resolve(cwd, 'symbols.json')
  if (!existsSync(p)) return {}
  try { return JSON.parse(readFileSync(p, 'utf8')) } catch { return {} }
}

export const saveSymbols = (data, cwd = process.cwd()) => {
  const p = resolve(cwd, 'symbols.json')
  const existing = getSymbols(cwd)
  writeFileSync(p, JSON.stringify({ ...existing, ...data }, null, 2) + '\n')
}

/**
 * Returns runner config from symbols.json with fallback defaults.
 * Keys: runtime, bundler, entry, port, distDir, packageManager
 */
export const getRunnerConfig = (cwd = process.cwd()) => {
  const s = getSymbols(cwd)
  const runtime = s.runtime || 'node'
  const isBrowser = runtime === 'browser'
  const dir = s.dir || 'symbols'
  const distDir = s.distDir || 'dist'
  return {
    runtime,
    bundler: isBrowser ? null : (s.bundler || null),
    entry: s.entry || `${dir}/index.html`,
    port: s.port || 1234,
    dir,
    distDir,
    brender: s.brender !== false,
    packageManager: s.packageManager || 'npm'
  }
}

export const detectBundler = (cwd = process.cwd()) => {
  for (const b of ['parcel', 'vite']) {
    if (existsSync(findBin(b, cwd))) return b
  }
  return null
}

export const promptBundler = async () => {
  const { default: inquirer } = await import('inquirer')
  const { bundler } = await inquirer.prompt([{
    type: 'list',
    name: 'bundler',
    message: 'Which bundler do you want to use?',
    choices: [
      { name: 'Parcel  — zero-config, recommended', value: 'parcel' },
      { name: 'Vite    — fast ES module dev server', value: 'vite' }
    ]
  }])
  return bundler
}

/**
 * Resolve bundler from: symbols.json > auto-detect > prompt.
 * Saves the result to symbols.json for future runs.
 */
export const resolveBundler = async (cwd = process.cwd()) => {
  const symbols = getSymbols(cwd)
  if (symbols.bundler && BUNDLERS.includes(symbols.bundler)) {
    return symbols.bundler
  }

  const detected = detectBundler(cwd)
  if (detected) {
    console.log(chalk.dim(`Using detected bundler: ${detected}`))
    saveSymbols({ bundler: detected }, cwd)
    return detected
  }

  console.log(chalk.yellow('No bundler found. Please choose one to install:'))
  const chosen = await promptBundler()
  saveSymbols({ bundler: chosen }, cwd)

  const { detectPackageManager } = await import('../helpers/packageManager.js')
  const pm = detectPackageManager(cwd)
  ensureBundlerDeps(chosen, cwd, { install: true, pm })

  return chosen
}

export const spawnBin = (binPath, args, cwd = process.cwd()) => {
  if (!existsSync(binPath)) {
    const name = binPath.split('/').pop()
    console.error(
      chalk.red(`${name} is not installed.`) +
      ` Run: npm install --save-dev ${name}`
    )
    process.exit(1)
  }
  const isTTY = process.stdin.isTTY
  const child = spawn(binPath, args, {
    stdio: isTTY ? 'inherit' : ['ignore', 'inherit', 'pipe'],
    cwd,
    shell: process.platform === 'win32'
  })
  if (!isTTY && child.stderr) {
    child.stderr.on('data', (data) => {
      const filtered = data.toString().split('\n')
        .filter(line => !line.includes("Opening `/dev/tty` failed"))
        .join('\n')
      if (filtered.trim()) process.stderr.write(filtered)
    })
  }
  return child
}
