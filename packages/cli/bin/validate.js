#!/usr/bin/env node

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { transform } from 'esbuild'
import { pathToFileURL } from 'url'
import { program } from './program.js'
import { loadSymbolsConfig, resolveDistDir } from '../helpers/symbolsConfig.js'

const SOURCE_EXTENSIONS = new Set(['.js', '.mjs', '.cjs', '.jsx', '.ts', '.tsx'])
const IGNORE_DIRS = new Set(['.cache', 'node_modules', '.git'])

function resolveTargetPath (inputTarget, symbolsConfig) {
  if (inputTarget) {
    return path.isAbsolute(inputTarget)
      ? inputTarget
      : path.resolve(process.cwd(), inputTarget)
  }

  return (
    resolveDistDir(symbolsConfig, { cwd: process.cwd() }) ||
    path.join(process.cwd(), 'smbls')
  )
}

function getLoaderForFile (filePath) {
  switch (path.extname(filePath).toLowerCase()) {
    case '.js':
    case '.mjs':
    case '.cjs':
      return 'js'
    case '.jsx':
      return 'jsx'
    case '.ts':
      return 'ts'
    case '.tsx':
      return 'tsx'
    default:
      return null
  }
}

async function collectSourceFiles (targetPath) {
  const stat = await fs.promises.stat(targetPath)
  if (stat.isFile()) return [targetPath]

  const files = []

  async function walk (dirPath) {
    const entries = await fs.promises.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue
        await walk(fullPath)
        continue
      }

      if (!entry.isFile()) continue
      if (!SOURCE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) continue
      files.push(fullPath)
    }
  }

  await walk(targetPath)
  files.sort()
  return files
}

function formatLocation (location) {
  if (!location || !location.file) return ''
  const line = location.line || 0
  const column = location.column !== undefined ? location.column + 1 : 0
  return `${location.file}:${line}:${column}`
}

async function syntaxCheckFile (filePath) {
  const loader = getLoaderForFile(filePath)
  if (!loader) return { ok: true, filePath }

  const source = await fs.promises.readFile(filePath, 'utf8')
  try {
    await transform(source, {
      loader,
      format: 'esm',
      sourcefile: filePath,
      target: 'es2020',
      logLevel: 'silent'
    })
    return { ok: true, filePath }
  } catch (error) {
    const first = error?.errors?.[0]
    return {
      ok: false,
      filePath,
      message: first?.text || error.message,
      location: first?.location
    }
  }
}

function parseEntriesOption (value) {
  if (!value) return []
  return String(value)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
}

function looksLikeGeneratedSmblsDir (targetPath) {
  const markers = [
    'pages',
    'components',
    'designSystem',
    'files',
    'libs',
    'state.js',
    'dependencies.js',
    'sharedLibraries.js'
  ]

  return markers.some((marker) => fs.existsSync(path.join(targetPath, marker)))
}

function resolveSmokeEntries ({ targetPath, isDirectory, explicitEntries }) {
  if (explicitEntries.length > 0) {
    return explicitEntries.map((entry) =>
      path.isAbsolute(entry) ? entry : path.resolve(process.cwd(), entry)
    )
  }

  if (!isDirectory) return [targetPath]
  if (!looksLikeGeneratedSmblsDir(targetPath)) return []

  const defaultEntries = []
  const rootIndex = path.join(targetPath, 'index.js')
  const libsIndex = path.join(targetPath, 'libs', 'index.js')

  if (fs.existsSync(rootIndex)) defaultEntries.push(rootIndex)
  if (fs.existsSync(libsIndex)) defaultEntries.push(libsIndex)

  return defaultEntries
}

async function smokeImportFile (filePath) {
  try {
    const url = new URL(pathToFileURL(filePath).href)
    url.searchParams.set('smbls_validate', String(Date.now()))
    await import(url.href)
    return { ok: true, filePath }
  } catch (error) {
    return {
      ok: false,
      filePath,
      message: error?.message || String(error)
    }
  }
}

export async function validateGeneratedCode (target, options = {}) {
  const symbolsConfig = await loadSymbolsConfig({
    required: false,
    validateKey: false,
    silent: true
  })

  const targetPath = resolveTargetPath(target, symbolsConfig)
  if (!fs.existsSync(targetPath)) {
    console.error(chalk.red(`Target not found: ${targetPath}`))
    process.exit(1)
  }

  const targetStat = await fs.promises.stat(targetPath)
  if (targetStat.isFile() && !SOURCE_EXTENSIONS.has(path.extname(targetPath).toLowerCase())) {
    console.error(chalk.red(`Unsupported file type: ${targetPath}`))
    process.exit(1)
  }

  const sourceFiles = await collectSourceFiles(targetPath)
  if (sourceFiles.length === 0) {
    console.error(chalk.red(`No source files found in ${targetPath}`))
    process.exit(1)
  }

  console.log(chalk.cyan(`Validating ${sourceFiles.length} file(s) in ${targetPath}`))

  const syntaxResults = await Promise.all(sourceFiles.map(syntaxCheckFile))
  const syntaxFailures = syntaxResults.filter((result) => !result.ok)

  if (syntaxFailures.length > 0) {
    console.error(chalk.red(`\nSyntax validation failed in ${syntaxFailures.length} file(s):`))
    for (const failure of syntaxFailures) {
      const location = formatLocation(failure.location)
      console.error(chalk.yellow(`- ${location || failure.filePath}`))
      console.error(chalk.gray(`  ${failure.message}`))
    }
    process.exit(1)
  }

  console.log(chalk.green(`Syntax validation passed for ${sourceFiles.length} file(s).`))

  if (!options.smokeImport) return

  const smokeEntries = resolveSmokeEntries({
    targetPath,
    isDirectory: targetStat.isDirectory(),
    explicitEntries: parseEntriesOption(options.entry)
  })

  if (smokeEntries.length === 0) {
    console.log(chalk.yellow('No smoke-import entrypoints found. Skipping import pass.'))
    return
  }

  console.log(chalk.cyan(`Running smoke import for ${smokeEntries.length} entr${smokeEntries.length === 1 ? 'y' : 'ies'}.`))
  const smokeResults = await Promise.all(smokeEntries.map(smokeImportFile))
  const smokeFailures = smokeResults.filter((result) => !result.ok)

  if (smokeFailures.length > 0) {
    console.error(chalk.red(`\nSmoke import failed for ${smokeFailures.length} entr${smokeFailures.length === 1 ? 'y' : 'ies'}:`))
    for (const failure of smokeFailures) {
      console.error(chalk.yellow(`- ${failure.filePath}`))
      console.error(chalk.gray(`  ${failure.message}`))
    }
    process.exit(1)
  }

  console.log(chalk.green('Smoke import passed.'))
}

program
  .command('validate')
  .description('Validate generated Symbols/DOMQL code in a file or generated directory')
  .argument('[target]', 'File or directory to validate. Defaults to symbols.json distDir or ./smbls')
  .option('--smoke-import', 'Also try importing generated entry modules after syntax validation')
  .option('--entry <paths>', 'Comma-separated entry files for --smoke-import')
  .action(validateGeneratedCode)
