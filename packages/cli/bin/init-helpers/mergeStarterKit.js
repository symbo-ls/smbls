'use strict'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// starter-kit-cli is at monorepo root: packages/cli/bin/init-helpers → ../../../../.. → root
const STARTER_KIT = path.resolve(__dirname, '../../../../../starter-kit-cli')

const PARCELRC = JSON.stringify({ extends: '@symbo.ls/runner' }, null, 2) + '\n'

const ESLINTRC = JSON.stringify({ extends: 'standard' }, null, 2) + '\n'

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
 * Merge starter-kit-cli (feature/cli) files into an existing project directory.
 * - Updates package.json (merges deps from starter-kit-cli + smbls start/build scripts)
 * - Creates src/{index,designSystem,components,pages}.js if missing
 * - Creates index.html if missing
 * - Merges symbols.json (existing values win) → placed in distDir folder
 * - Creates .parcelrc, .eslintrc if missing → placed in distDir folder
 */
export async function mergeStarterKit (cwd) {
  // --- package.json (always at project root) ---
  const pkgPath = path.join(cwd, 'package.json')
  const pkg = readJsonSafe(pkgPath) || {}

  let pkgChanged = false

  pkg.scripts = pkg.scripts || {}
  if (!pkg.scripts.start) { pkg.scripts.start = 'smbls start'; pkgChanged = true }
  if (!pkg.scripts.build) { pkg.scripts.build = 'smbls build'; pkgChanged = true }

  pkg.dependencies = pkg.dependencies || {}
  const templatePkg = readJsonSafe(path.join(STARTER_KIT, 'package.json')) || {}
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

  // --- resolve distDir ---
  const existingSymbols = readJsonSafe(path.join(cwd, 'symbols.json')) || {}
  const templateSymbols = readJsonSafe(path.join(STARTER_KIT, 'symbols.json')) || {}
  const mergedSymbols = { ...templateSymbols, ...existingSymbols }
  const distDir = mergedSymbols.distDir || 'smbls'
  const dest = path.join(cwd, distDir)
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true })

  // --- src/ files from starter-kit-cli ---
  const srcDir = path.join(dest, 'src')
  if (!fs.existsSync(srcDir)) fs.mkdirSync(srcDir, { recursive: true })
  const srcFiles = ['index.js', 'designSystem.js', 'components.js', 'pages.js']
  for (const f of srcFiles) {
    copyIfMissing(path.join(STARTER_KIT, 'src', f), path.join(srcDir, f))
  }

  // --- index.html ---
  copyIfMissing(path.join(STARTER_KIT, 'index.html'), path.join(dest, 'index.html'))

  // --- symbols.json ---
  const symbolsPath = path.join(dest, 'symbols.json')
  fs.writeFileSync(symbolsPath, JSON.stringify(mergedSymbols, null, 2) + '\n')
  console.log(chalk.green('update ') + path.join(distDir, 'symbols.json'))

  // --- .parcelrc ---
  writeIfMissing(path.join(dest, '.parcelrc'), PARCELRC)

  // --- .eslintrc ---
  writeIfMissing(path.join(dest, '.eslintrc'), ESLINTRC)

  console.log()
  return dest
}
