'use strict'

import inquirer from 'inquirer'
import { loadCliConfig, saveCliConfig, updateLegacySymbolsJson } from './config.js'
import { detectRuntime, detectPackageManager } from './packageManager.js'

const RUNTIME_CHOICES = [
  { name: 'Node     — standard Node.js runtime', value: 'node' },
  { name: 'Bun      — fast all-in-one JS runtime', value: 'bun' },
  { name: 'Deno     — secure JS/TS runtime', value: 'deno' }
]

const BUNDLER_CHOICES = [
  { name: 'Parcel      — zero-config bundler (recommended)', value: 'parcel' },
  { name: 'Vite        — fast ES module dev server', value: 'vite' },
  { name: 'Turbopack   — Rust-based incremental bundler', value: 'turbopack' },
  { name: 'Webpack     — battle-tested module bundler', value: 'webpack' },
  { name: 'Rollup      — ES module bundler', value: 'rollup' },
  { name: 'Browser     — native ES modules, no bundler', value: 'browser' },
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

/**
 * Run interactive config prompts and save results to symbols.json + .symbols_cache/config.json.
 * @param {object} symbolsConfig - existing symbols.json content
 * @returns {{ bundler: string, packageManager: string }} resolved values
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
      name: 'distDir',
      message: 'Directory for generated files (distDir):',
      default: symbolsConfig.distDir || './symbols',
      filter: (v) => v.trim() || './symbols'
    },
    {
      type: 'list',
      name: 'runtime',
      message: 'JavaScript runtime:',
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
      message: (a) => a.bundler === 'browser'
        ? 'CDN provider (dependencies resolved in browser):'
        : 'Package manager:',
      choices: (a) => a.bundler === 'browser' ? CDN_CHOICES : PM_CHOICES,
      default: (a) => {
        if (a.bundler === 'browser') {
          return CDN_CHOICES.find(c => c.value === symbolsConfig.packageManager)
            ? symbolsConfig.packageManager
            : 'esm.sh'
        }
        return PM_CHOICES.find(c => c.value === symbolsConfig.packageManager)
          ? symbolsConfig.packageManager
          : detectedPm
      },
      when: (a) => a.runtime === 'node'
    },
    {
      type: 'input',
      name: 'apiBaseUrl',
      message: 'API base URL:',
      default: cliConfig.apiBaseUrl || 'https://api.symbols.app',
      filter: (v) => v.trim() || 'https://api.symbols.app'
    }
  ])

  const runtime = answers.runtime
  const rawBundler = runtime === 'node' ? answers.bundler : (runtime === 'bun' ? 'vite' : 'browser')
  const bundler = rawBundler === 'other' ? (answers.bundlerCustom || 'parcel') : rawBundler
  const packageManager = runtime === 'node'
    ? answers.packageManager
    : runtime === 'bun' ? 'bun' : 'deno'

  updateLegacySymbolsJson({
    ...symbolsConfig,
    key: answers.key || undefined,
    branch: answers.branch,
    version: answers.version,
    distDir: answers.distDir,
    runtime,
    bundler,
    packageManager
  })

  saveCliConfig({
    apiBaseUrl: answers.apiBaseUrl,
    projectKey: answers.key || cliConfig.projectKey,
    branch: answers.branch
  })

  return { bundler, packageManager }
}
