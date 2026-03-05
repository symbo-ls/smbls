'use strict'

import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer'
import { loadCliConfig, saveCliConfig, updateLegacySymbolsJson } from './config.js'
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
 * bundler is stored in symbols.json only; config.js is a browser-safe runtime file.
 */
function writeProjectConfigJs (cwd, { distDir, packageManager }) {
  if (!CDN_PACKAGE_MANAGERS.includes(packageManager)) return
  const configJsPath = path.join(cwd, distDir || 'symbols', 'config.js')
  fs.mkdirSync(path.dirname(configJsPath), { recursive: true })
  if (fs.existsSync(configJsPath)) {
    const src = fs.readFileSync(configJsPath, 'utf8')
    if (/\bpackageManager\b/.test(src)) return // already present, don't overwrite
    const merged = src.replace(/\}\s*$/, `  packageManager: '${packageManager}',\n}\n`)
    fs.writeFileSync(configJsPath, merged)
  } else {
    fs.writeFileSync(configJsPath, `export default {\n  packageManager: '${packageManager}',\n}\n`)
  }
}

/**
 * Run interactive config prompts and save results to symbols.json + .symbols_cache/config.json.
 * Also rewrites symbols/config.js if present.
 * @param {object} symbolsConfig - existing symbols.json content
 * @returns {{ runtime: string, bundler: string|null, packageManager: string }}
 */
export async function runConfigPrompts (symbolsConfig = {}) {
  const cliConfig = loadCliConfig()
  const detectedRuntime = detectRuntime(process.cwd())
  const detectedPm = detectPackageManager(process.cwd())

  const answers = await inquirer.prompt([
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
      default: symbolsConfig.runtime || detectedRuntime
    },
    {
      type: 'list',
      name: 'bundler',
      message: 'Build tool:',
      choices: BUNDLER_CHOICES,
      default: symbolsConfig.bundler || 'parcel',
      when: (a) => a.runtime === 'node'
    },
    {
      type: 'input',
      name: 'bundlerCustom',
      message: 'Bundler name:',
      default: symbolsConfig.bundler !== 'other' ? symbolsConfig.bundler : '',
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
        if (a.runtime === 'browser') {
          return CDN_VALUES.includes(symbolsConfig.packageManager)
            ? symbolsConfig.packageManager
            : 'esm.sh'
        }
        return PM_CHOICES.find(c => c.value === symbolsConfig.packageManager)
          ? symbolsConfig.packageManager
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
      default: symbolsConfig.deploy || 'symbols'
    }
  ])

  const runtime = answers.runtime
  let bundler = null
  if (runtime === 'node') {
    const raw = answers.bundler
    bundler = raw === 'other' ? (answers.bundlerCustom || 'parcel') : raw
  } else if (runtime === 'bun') {
    bundler = 'vite'
  }
  // deno and browser: no bundler

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

  updateLegacySymbolsJson({
    ...symbolsConfig,
    key: answers.key || undefined,
    branch: answers.branch,
    version: answers.version,
    dir: answers.dir,
    runtime,
    bundler,
    packageManager,
    deploy: answers.deploy || symbolsConfig.deploy
  })

  saveCliConfig({
    apiBaseUrl: answers.apiBaseUrl,
    projectKey: answers.key || cliConfig.projectKey,
    branch: answers.branch
  })

  writeProjectConfigJs(process.cwd(), {
    distDir: answers.dir,
    packageManager
  })

  return { runtime, bundler, packageManager }
}
