'use strict'

import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { loadCliConfig, saveCliConfig, updateSymbolsJson, writeLock } from './config.js'
import { detectRuntime, detectPackageManager } from './packageManager.js'

const RUNTIME_CHOICES = [
  { name: 'Node     — standard Node.js runtime', value: 'node' },
  { name: 'Bun      — fast all-in-one JS runtime', value: 'bun' },
  { name: 'Deno     — secure JS/TS runtime', value: 'deno' },
  { name: 'Browser  — native ES modules, no bundler', value: 'browser' }
]

const BUNDLER_CHOICES = [
  { name: 'Parcel      — zero-config bundler (recommended)', value: 'parcel' },
  { name: 'Vite        — fast ES module dev server', value: 'vite' },
  { name: 'Turbopack   — Rust-based incremental bundler', value: 'turbopack' },
  { name: 'Webpack     — battle-tested module bundler', value: 'webpack' },
  { name: 'Rollup      — ES module bundler', value: 'rollup' },
  { name: 'Other       — specify manually', value: 'other' }
]

const CDN_CHOICES = [
  { name: 'esm.sh      — native ES modules CDN', value: 'esm.sh' },
  { name: 'unpkg       — npm package CDN', value: 'unpkg' },
  { name: 'skypack     — ES module CDN', value: 'skypack' },
  { name: 'jsdelivr    — multi-CDN provider', value: 'jsdelivr' },
  { name: 'pkg.symbo.ls — Symbols CDN', value: 'pkg.symbo.ls' }
]

const PM_CHOICES = [
  { name: 'npm', value: 'npm' },
  { name: 'yarn', value: 'yarn' },
  { name: 'pnpm', value: 'pnpm' },
  { name: 'bun', value: 'bun' }
]

const DEPLOY_CHOICES = [
  { name: 'Symbols    — push to Symbols platform (default)', value: 'symbols' },
  { name: 'Cloudflare — deploy to Cloudflare Pages', value: 'cloudflare' },
  { name: 'Vercel     — deploy to Vercel', value: 'vercel' },
  { name: 'Netlify    — deploy to Netlify', value: 'netlify' },
  { name: 'GitHub     — deploy to GitHub Pages', value: 'github-pages' }
]

const CDN_VALUES = CDN_CHOICES.map(c => c.value)

const CDN_PACKAGE_MANAGERS = CDN_VALUES

/**
 * Merge packageManager (CDN only) into symbols/config.js without overwriting existing keys.
 */
function writeProjectConfigJs (cwd, { distDir, packageManager }) {
  if (!CDN_PACKAGE_MANAGERS.includes(packageManager)) return
  const configJsPath = path.join(cwd, distDir || 'symbols', 'config.js')
  fs.mkdirSync(path.dirname(configJsPath), { recursive: true })
  if (fs.existsSync(configJsPath)) {
    const src = fs.readFileSync(configJsPath, 'utf8')
    if (/\bpackageManager\b/.test(src)) return
    const merged = src.replace(/\}\s*$/, `  packageManager: '${packageManager}',\n}\n`)
    fs.writeFileSync(configJsPath, merged)
  } else {
    fs.writeFileSync(configJsPath, `export default {\n  packageManager: '${packageManager}',\n}\n`)
  }
}

/**
 * Run config prompts and save results.
 * In non-interactive mode, uses provided options or defaults — no prompts.
 *
 * - Project identity (key, branch, version, dir) → symbols.json
 * - Tooling + API (bundler, pm, runtime, deploy, apiBaseUrl) → .symbols_local/config.json
 *
 * @param {object} symbolsConfig - existing symbols.json content
 * @param {object} [options] - non-interactive overrides
 * @param {boolean} [options.nonInteractive] - skip prompts
 * @param {string}  [options.key] - app key
 * @param {string}  [options.branch] - branch
 * @param {string}  [options.version] - version
 * @param {string}  [options.dir] - symbols source directory
 * @param {string}  [options.runtime] - runtime
 * @param {string}  [options.bundler] - bundler
 * @param {string}  [options.packageManager] - package manager
 * @param {string}  [options.apiBaseUrl] - API base URL
 * @param {string}  [options.deploy] - deploy target
 * @returns {{ runtime: string, bundler: string|null, packageManager: string }}
 */
export async function runConfigPrompts (symbolsConfig = {}, options = {}) {
  const cliConfig = loadCliConfig()
  const detectedRuntime = detectRuntime(process.cwd())
  const detectedPm = detectPackageManager(process.cwd())
  const interactive = !!(process.stdin?.isTTY && process.stdout?.isTTY && !options.nonInteractive)

  let answers

  if (interactive) {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'key',
        message: 'App key (e.g. myproject.symbo.ls):',
        default: symbolsConfig.key || '',
        filter: (v) => v.trim()
      },
      {
        type: 'input',
        name: 'branch',
        message: 'Default branch:',
        default: cliConfig.branch || symbolsConfig.branch || 'main',
        filter: (v) => v.trim() || 'main'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version:',
        default: symbolsConfig.version || '1.0.0',
        filter: (v) => v.trim() || '1.0.0'
      },
      {
        type: 'input',
        name: 'dir',
        message: 'Symbols source directory:',
        default: symbolsConfig.dir || symbolsConfig.distDir || './symbols',
        filter: (v) => v.trim() || './symbols'
      },
      {
        type: 'list',
        name: 'runtime',
        message: 'Environment:',
        choices: RUNTIME_CHOICES,
        default: cliConfig.runtime || symbolsConfig.runtime || detectedRuntime
      },
      {
        type: 'list',
        name: 'bundler',
        message: 'Build tool:',
        choices: BUNDLER_CHOICES,
        default: cliConfig.bundler || symbolsConfig.bundler || 'parcel',
        when: (a) => a.runtime === 'node'
      },
      {
        type: 'input',
        name: 'bundlerCustom',
        message: 'Bundler name:',
        default: (cliConfig.bundler || symbolsConfig.bundler) !== 'other' ? (cliConfig.bundler || symbolsConfig.bundler) : '',
        filter: (v) => v.trim(),
        when: (a) => a.runtime === 'node' && a.bundler === 'other'
      },
      {
        type: 'list',
        name: 'packageManager',
        message: (a) => a.runtime === 'browser'
          ? 'CDN provider:'
          : 'Package manager:',
        choices: (a) => a.runtime === 'browser' ? CDN_CHOICES : PM_CHOICES,
        default: (a) => {
          const currentPm = cliConfig.packageManager || symbolsConfig.packageManager
          if (a.runtime === 'browser') {
            return CDN_VALUES.includes(currentPm) ? currentPm : 'esm.sh'
          }
          return PM_CHOICES.find(c => c.value === currentPm)
            ? currentPm
            : detectedPm
        },
        when: (a) => a.runtime === 'node' || a.runtime === 'browser'
      },
      {
        type: 'input',
        name: 'apiBaseUrl',
        message: 'API base URL:',
        default: cliConfig.apiBaseUrl || 'https://api.symbols.app',
        filter: (v) => v.trim() || 'https://api.symbols.app'
      },
      {
        type: 'list',
        name: 'deploy',
        message: 'Deploy target:',
        choices: DEPLOY_CHOICES,
        default: cliConfig.deploy || symbolsConfig.deploy || 'symbols'
      }
    ])
  } else {
    answers = {
      key: options.key || symbolsConfig.key || '',
      branch: options.branch || cliConfig.branch || symbolsConfig.branch || 'main',
      version: options.version || symbolsConfig.version || '1.0.0',
      dir: options.dir || symbolsConfig.dir || symbolsConfig.distDir || './symbols',
      runtime: options.runtime || cliConfig.runtime || symbolsConfig.runtime || detectedRuntime,
      bundler: options.bundler || cliConfig.bundler || symbolsConfig.bundler || 'parcel',
      packageManager: options.packageManager || cliConfig.packageManager || symbolsConfig.packageManager || detectedPm,
      apiBaseUrl: options.apiBaseUrl || cliConfig.apiBaseUrl || 'https://api.symbols.app',
      deploy: options.deploy || cliConfig.deploy || symbolsConfig.deploy || 'symbols'
    }
  }

  const runtime = answers.runtime
  let bundler = null
  if (runtime === 'node') {
    const raw = answers.bundler
    bundler = raw === 'other' ? (answers.bundlerCustom || 'parcel') : raw
  } else if (runtime === 'bun') {
    bundler = 'vite'
  }

  let packageManager
  if (runtime === 'browser') {
    packageManager = answers.packageManager || 'esm.sh'
  } else if (runtime === 'node') {
    packageManager = answers.packageManager || detectedPm
  } else if (runtime === 'bun') {
    packageManager = 'bun'
  } else {
    packageManager = 'deno'
  }

  // Project identity → symbols.json (git-tracked)
  updateSymbolsJson({
    ...symbolsConfig,
    key: answers.key || undefined,
    dir: answers.dir
  })

  // Tooling + API → .symbols_local/config.json (git-tracked)
  saveCliConfig({
    apiBaseUrl: answers.apiBaseUrl,
    projectKey: answers.key || cliConfig.projectKey,
    runtime,
    bundler,
    packageManager,
    deploy: answers.deploy || cliConfig.deploy
  })

  // Branch + version → .symbols_local/lock.json
  writeLock({
    branch: answers.branch,
    version: answers.version
  })

  writeProjectConfigJs(process.cwd(), {
    distDir: answers.dir,
    packageManager
  })

  return { runtime, bundler, packageManager }
}
