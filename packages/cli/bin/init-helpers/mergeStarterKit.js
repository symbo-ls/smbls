'use strict'

import chalk from 'chalk'
import fs from 'fs'
import os from 'os'
import path from 'path'
import { execSync } from 'child_process'

const STARTER_KIT_REPO = 'https://github.com/symbo-ls/starter-kit'
const STARTER_KIT_BRANCH = 'next'

const ESLINTRC = JSON.stringify({ extends: 'standard' }, null, 2) + '\n'

const BUNDLER_CONFIGS = {
  parcel: {
    file: '.parcelrc',
    content: JSON.stringify({
      extends: '@parcel/config-default',
      transformers: {
        '*.woff2': ['@parcel/transformer-raw'],
        '*.otf': ['@parcel/transformer-raw'],
        '*.svg': ['@parcel/transformer-inline-string'],
        '*.wasm': ['@parcel/transformer-wasm']
      }
    }, null, 2) + '\n'
  },
  vite: {
    file: 'vite.config.js',
    content: `import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist'
  }
})
`
  }
}

function readJsonSafe (filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  } catch { return null }
}

function copyIfMissing (src, dest) {
  if (fs.existsSync(dest)) {
    console.log(chalk.yellow('skip ') + chalk.dim(dest))
    return false
  }
  fs.copyFileSync(src, dest)
  console.log(chalk.green('create ') + dest)
  return true
}

function writeIfMissing (dest, content) {
  if (fs.existsSync(dest)) {
    console.log(chalk.yellow('skip ') + chalk.dim(dest))
    return false
  }
  fs.writeFileSync(dest, content)
  console.log(chalk.green('create ') + dest)
  return true
}

/**
 * Merge starter-kit (next branch) files into an existing project directory.
 * - Updates package.json (merges deps from starter-kit-cli + smbls start/build scripts)
 * - Creates src/{index,designSystem,components,pages}.js if missing
 * - Creates index.html if missing
 * - Merges symbols.json (existing values win) at cwd root
 * - Creates bundler config (.parcelrc / vite.config.js) if missing at cwd root
 * - Creates .eslintrc if missing at cwd root
 */
export async function mergeStarterKit (cwd) {
  // --- clone starter-kit feature/cli into temp dir ---
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'smbls-starter-'))
  console.log(chalk.dim(`Cloning ${STARTER_KIT_REPO}#${STARTER_KIT_BRANCH}...`))
  try {
    execSync(
      `git clone --depth 1 -b ${STARTER_KIT_BRANCH} ${STARTER_KIT_REPO} ${tmpDir}`,
      { stdio: 'pipe' }
    )
  } catch (err) {
    fs.rmSync(tmpDir, { recursive: true, force: true })
    throw new Error(`Failed to clone starter-kit: ${err.message}`)
  }

  try {
    // --- package.json (always at project root) ---
    const pkgPath = path.join(cwd, 'package.json')
    const pkg = readJsonSafe(pkgPath) || {}

    let pkgChanged = false

    pkg.scripts = pkg.scripts || {}
    if (!pkg.scripts.start) { pkg.scripts.start = 'smbls start'; pkgChanged = true }
    if (!pkg.scripts.build) { pkg.scripts.build = 'smbls build'; pkgChanged = true }

    pkg.dependencies = pkg.dependencies || {}
    const templatePkg = readJsonSafe(path.join(tmpDir, 'package.json')) || {}
    const templateDeps = templatePkg.dependencies || {}
    for (const [name, version] of Object.entries(templateDeps)) {
      if (!pkg.dependencies[name]) {
        pkg.dependencies[name] = version
        pkgChanged = true
      }
    }
    if (!pkg.dependencies.smbls) {
      pkg.dependencies.smbls = '^3.2.3'
      pkgChanged = true
    }

    if (pkgChanged) {
      fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
      console.log(chalk.green('update ') + 'package.json')
    } else {
      console.log(chalk.yellow('skip ') + chalk.dim('package.json (already configured)'))
    }

    // --- merge symbols.json at cwd root ---
    const existingSymbols = readJsonSafe(path.join(cwd, 'symbols.json')) || {}
    const templateSymbols = readJsonSafe(path.join(tmpDir, 'symbols.json')) || {}
    const mergedSymbols = { ...templateSymbols, ...existingSymbols }
    const symbolsPath = path.join(cwd, 'symbols.json')
    fs.writeFileSync(symbolsPath, JSON.stringify(mergedSymbols, null, 2) + '\n')
    console.log(chalk.green('update ') + 'symbols.json')

    // --- smbls/ folder from cloned starter-kit (app.js + index.html only if missing) ---
    const smblsDir = path.join(cwd, 'symbols')
    if (!fs.existsSync(smblsDir)) fs.mkdirSync(smblsDir, { recursive: true })
    copyIfMissing(path.join(tmpDir, 'symbols', 'index.js'), path.join(smblsDir, 'index.js'))
    copyIfMissing(path.join(tmpDir, 'symbols', 'index.html'), path.join(smblsDir, 'index.html'))

    // --- bundler config ---
    const bundler = mergedSymbols.bundler || 'parcel'
    const bundlerConfig = BUNDLER_CONFIGS[bundler]
    if (bundlerConfig) {
      writeIfMissing(path.join(cwd, bundlerConfig.file), bundlerConfig.content)
    }

    // --- .eslintrc ---
    writeIfMissing(path.join(cwd, '.eslintrc'), ESLINTRC)

    console.log()
    return cwd
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}
