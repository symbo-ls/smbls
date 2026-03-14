import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import * as smblsUtils from '@symbo.ls/smbls-utils'
import { toFS } from '@symbo.ls/frank'
import inquirer from 'inquirer'
import { createPatch } from 'diff'

const { removeChars, toCamelCase } =
  smblsUtils.default || smblsUtils

// Keys that are materialized as directories with per-entry files.
const directoryKeys = ['components', 'snippets', 'pages', 'functions', 'methods']

// Keys that used to be single files, but are now split into a directory with:
// - `index.js` exporting a default object
// - per-entry `*.js` files for object values (primitives stay in index.js)
const splitObjectKeys = ['designSystem', 'files']

const ALL_DIRECTORY_KEYS = [...directoryKeys, ...splitObjectKeys]

// Minimal reserved identifier set to avoid invalid named exports like "export const default"
const RESERVED_IDENTIFIERS = new Set(['default', 'class'])
function isReservedIdentifier (name) {
  return RESERVED_IDENTIFIERS.has(name)
}

// Keys that should never be materialized as files inside collection directories
const SKIP_ENTRY_KEYS = new Set(['__order', 'schema'])
function shouldSkipEntryKey (name) {
  return SKIP_ENTRY_KEYS.has(name) || isReservedIdentifier(name)
}

async function removeStaleFiles (body, targetDir, { allDirectoryKeys, splitObjectKeys } = {}) {
  const dirs = Array.isArray(allDirectoryKeys) ? allDirectoryKeys : ALL_DIRECTORY_KEYS
  const splitKeys = Array.isArray(splitObjectKeys) ? splitObjectKeys : []

  for (const key of dirs) {
    const dirPath = path.join(targetDir, key)
    if (!fs.existsSync(dirPath)) continue

    const existingFiles = await fs.promises.readdir(dirPath)
    const currentEntries = (() => {
      if (!body[key] || typeof body[key] !== 'object') return []

      // For splitObjectKeys we only materialize object-valued entries as files
      if (splitKeys.includes(key)) {
        const entries = []
        for (const [entryKey, value] of Object.entries(body[key] || {})) {
          if (!value || typeof value !== 'object' || Array.isArray(value)) continue
          const safeStem = String(entryKey).replace(/[/\\]/g, '-')
          if (!safeStem) continue
          entries.push(`${safeStem}.js`)
        }
        return entries
      }

      return Object.keys(body[key])
        // Drop meta/reserved identifiers like "__order" and "default"
        .filter(entry => !shouldSkipEntryKey(entry))
        .map(entry => {
          let fileName = entry
          if (fileName.startsWith('/')) fileName = fileName.slice(1)
          if (fileName === '') fileName = 'main'
          if (fileName.includes('*')) fileName = 'fallback'
          return `${fileName.replaceAll('/', '-').replaceAll('\\', '-')}.js`
        })
    })()

    // Don't remove index.js
    const filesToCheck = existingFiles.filter(file => file !== 'index.js')

    for (const file of filesToCheck) {
      if (!currentEntries.includes(file)) {
        const filePath = path.join(dirPath, file)
        console.log(chalk.yellow(`Removing stale file: ${path.join(key, file)}`))
        await fs.promises.unlink(filePath)
      }
    }
  }
}

function sanitizeFileStem (raw) {
  const s = String(raw || '').trim()
  if (!s) return ''
  return s
    .replace(/[/\\]/g, '-')
    .replace(/[^\w.-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function toLibFileStem (lib, idx) {
  const key = lib?.key ? sanitizeFileStem(lib.key) : ''
  const id = lib?.id || lib?._id ? sanitizeFileStem(lib.id || lib._id) : ''
  return key || id || `lib-${idx}`
}

export async function createFs (
  body,
  distDir = path.join(process.cwd(), 'symbols'),
  opts = {}
) {
  if (!body) {
    console.error('No JSON object provided. Exiting.')
    return
  }

  // Normalize shared libs so the filesystem shape is stable for consumers/diffing.
  if (!Array.isArray(body.sharedLibraries)) {
    body = { ...(body || {}), sharedLibraries: [] }
  }

  const { update, librariesDir, libsConfig, lockedLibVersions } = opts

  const scope = String(opts.scope || 'full')
  const isLibsScope = scope === 'libs' || scope === 'sharedLibraries'

  const scopedAllDirectoryKeys = isLibsScope ? [] : ALL_DIRECTORY_KEYS
  const scopedSplitObjectKeys = isLibsScope ? [] : splitObjectKeys

  const singleFileKeys = isLibsScope
    ? ['sharedLibraries']
    : ['state', 'dependencies', 'sharedLibraries']

  const targetDir = distDir

  const filesExist = fs.existsSync(targetDir)

  // --- Helpers for shared library scaffolding ---

  function isValidIdentifierName (name) {
    return typeof name === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(name) && !isReservedIdentifier(name)
  }

  function upperSnakeToLowerCamel (input) {
    const str = String(input || '')
    if (!/^[A-Z0-9_]+$/u.test(str) || !/[A-Z]/u.test(str)) return null
    const parts = str
      .split('_')
      .filter(Boolean)
      .map(p => p.toLowerCase())
    if (parts.length === 0) return null
    return parts[0] + parts.slice(1).map(p => (p ? p[0].toUpperCase() + p.slice(1) : '')).join('')
  }

  function toSafeImportName (key, used = new Set()) {
    const asToken = upperSnakeToLowerCamel(key)
    const base =
      (key && (removeChars(asToken || toCamelCase(String(key))) || '').trim()) ||
      'item'
    let name = base
    if (!/^[A-Za-z_$]/u.test(name)) name = `_${name}`
    if (isReservedIdentifier(name) || !isValidIdentifierName(name)) {
      name = `_${name.replace(/[^A-Za-z0-9_$]/gu, '') || 'item'}`
    }
    let i = 2
    while (used.has(name)) {
      name = `${base}_${i++}`
    }
    used.add(name)
    return name
  }

  /**
   * Scaffold each shared library as a full project folder under librariesDir.
   * Uses frank's toFS for each library's file structure.
   * Writes sharedLibraries.js in symbolsDir that imports from the external librariesDir.
   */
  async function scaffoldSharedLibraries (sharedLibraries, symbolsDir, librariesDir, update, libsConfig, lockedLibVersions, importBaseDir) {
    const libs = Array.isArray(sharedLibraries) ? sharedLibraries : []
    const libsConfigMap = new Map()
    if (Array.isArray(libsConfig)) {
      for (const lc of libsConfig) {
        if (lc?.key) libsConfigMap.set(lc.key, lc)
      }
    }

    // If no shared libraries, write sharedLibraries.js exporting [] and skip folder creation
    if (!libs.length) {
      const sharedLibsPath = path.join(symbolsDir, 'sharedLibraries.js')
      if (update || !fs.existsSync(sharedLibsPath)) {
        await fs.promises.writeFile(sharedLibsPath, 'export default []\n', 'utf8')
      }
      return
    }

    // Resolve librariesDir — if not provided, default to symbols_libs next to symbolsDir
    const resolvedLibsDir = librariesDir || path.join(path.dirname(symbolsDir), 'symbols_libs')

    await fs.promises.mkdir(resolvedLibsDir, { recursive: true })

    const locked = lockedLibVersions || {}

    const usedImportNames = new Set()
    const entries = libs.map((lib, idx) => {
      const stem = toLibFileStem(lib, idx)
      const importName = toSafeImportName(stem, usedImportNames)
      const libKey = lib?.key || stem
      const config = libsConfigMap.get(libKey) || {}
      return { lib, stem, importName, config, libKey }
    })

    // Scaffold each library as a full project folder using frank's toFS
    await Promise.all(entries.map(async ({ stem, lib, config, libKey }) => {
      const libDir = config.destDir
        ? path.resolve(path.dirname(symbolsDir), config.destDir)
        : path.join(resolvedLibsDir, stem)

      // Skip scaffolding if version hasn't changed and lib directory already exists
      const rawVersion = lib?.version
      const libVersion = typeof rawVersion === 'string' ? rawVersion : (rawVersion?.value || null)
      const rawLocked = locked[libKey]
      const lockedVersion = typeof rawLocked === 'string' ? rawLocked : (rawLocked?.value || null)
      if (libVersion && lockedVersion === libVersion && fs.existsSync(path.join(libDir, 'context.js'))) {
        return
      }

      await toFS(lib, libDir, { overwrite: true })
    }))

    // Remove stale lib directories that no longer exist
    try {
      const existingDirs = await fs.promises.readdir(resolvedLibsDir, { withFileTypes: true })
      const currentStems = new Set(entries.map(e => e.stem))
      for (const ent of existingDirs) {
        if (ent.isDirectory() && !currentStems.has(ent.name)) {
          console.log(chalk.yellow(`Removing stale library: ${ent.name}`))
          await fs.promises.rm(path.join(resolvedLibsDir, ent.name), { recursive: true })
        }
      }
    } catch (_) {}

    // Write sharedLibraries.js that imports context from each lib
    // Use importBaseDir (the final target dir) for relative path calculation when
    // writing to a cache dir, so paths are correct once copied to the target.
    const pathBase = importBaseDir || symbolsDir
    const importLines = entries
      .map(({ importName, stem, config }) => {
        const libDir = config.destDir
          ? path.resolve(path.dirname(pathBase), config.destDir)
          : path.join(resolvedLibsDir, stem)
        const relPath = path.relative(pathBase, libDir)
        return `import ${importName} from '${relPath}/context.js'`
      })
      .join('\n')

    const sharedLibsContent =
      `${importLines}\n\nexport default [${entries.map(e => e.importName).join(', ')}]\n`

    await fs.promises.writeFile(
      path.join(symbolsDir, 'sharedLibraries.js'),
      sharedLibsContent,
      'utf8'
    )
  }

  // --- Migration: clean up legacy files when target dir exists ---
  if (filesExist && !isLibsScope) {
    for (const k of splitObjectKeys) {
      const legacyPath = path.join(targetDir, `${k}.js`)
      try {
        if (fs.existsSync(legacyPath)) await fs.promises.unlink(legacyPath)
      } catch (_) {}
    }

    const legacyLibsDir = path.join(targetDir, 'libs')
    try {
      if (fs.existsSync(legacyLibsDir)) await fs.promises.rm(legacyLibsDir, { recursive: true })
    } catch (_) {}
  }

  // --- Fresh creation ---
  if (!filesExist) {
    await fs.promises.mkdir(targetDir, { recursive: true })

    const promises = [
      scaffoldSharedLibraries(body?.sharedLibraries, targetDir, librariesDir, update, libsConfig, lockedLibVersions)
    ]
    if (!isLibsScope) {
      promises.push(toFS(body, targetDir, { overwrite: !!update }))
    }

    await Promise.all(promises)
  }

  // --- Update with diff ---
  if (filesExist) {
    const cacheDir = path.join(distDir, '.cache')

    try {
      await fs.promises.mkdir(cacheDir, { recursive: true })

      if (update) {
        await removeStaleFiles(body, targetDir, {
          allDirectoryKeys: scopedAllDirectoryKeys,
          splitObjectKeys: scopedSplitObjectKeys
        })
      }

      const cachePromises = [
        scaffoldSharedLibraries(body?.sharedLibraries, cacheDir, librariesDir, true, libsConfig, lockedLibVersions, targetDir)
      ]
      if (!isLibsScope) {
        cachePromises.push(toFS(body, cacheDir, { overwrite: true }))
      }

      await Promise.all(cachePromises)

      const diffs = await findDiff(cacheDir, targetDir, {
        allDirectoryKeys: scopedAllDirectoryKeys,
        singleFileKeys,
        splitObjectKeys: scopedSplitObjectKeys
      })
      if (diffs.length > 0) {
        console.log('Differences found:')
        diffs.forEach((diff) => {
          console.log(chalk.green(`File: ${diff.file}`))
          console.log(chalk.yellow('Diff:'))
          console.log(chalk.yellow(diff.diff))
          console.log('---')
        })
        if (!update) {
          const { consent } = await askForConsent()
          if (consent) {
            // Backup conflicting local files before overwriting
            await backupLocalFiles(targetDir, distDir, diffs)
            await overrideFiles(cacheDir, targetDir, {
              allDirectoryKeys: scopedAllDirectoryKeys,
              singleFileKeys
            })
            // Remove stale files that are no longer produced by the current body snapshot
            try {
              await removeStaleFiles(body, targetDir, {
                allDirectoryKeys: scopedAllDirectoryKeys,
                splitObjectKeys: scopedSplitObjectKeys
              })
            } catch (_) {}
            console.log('Files overridden successfully.')
          } else {
            console.log('Files not overridden.')
          }
        } else {
          // Backup conflicting local files before overwriting
          await backupLocalFiles(targetDir, distDir, diffs)
          await overrideFiles(cacheDir, targetDir, {
            allDirectoryKeys: scopedAllDirectoryKeys,
            singleFileKeys
          })
          console.log('Files overridden successfully.')
          console.log()
          console.log(chalk.dim('\n----------------\n'))
        }
      } else {
        console.log('No differences found.')
        console.log()
        console.log(chalk.dim('\n----------------\n'))
      }

      // Clean up cache directory
      await fs.promises.rm(cacheDir, { recursive: true, force: true })
    } catch (error) {
      // Make sure we clean up even if there's an error
      try {
        await fs.promises.rm(cacheDir, { recursive: true, force: true })
      } catch (cleanupError) {
        // Ignore cleanup errors
      }
      throw error // Re-throw the original error
    }
  }
}

/**
 * Backup conflicting local files to .symbols-cache before overwriting.
 */
async function backupLocalFiles (targetDir, distDir, diffs) {
  if (!diffs.length) return

  const backupDir = path.join(path.dirname(distDir), '.symbols-cache')

  // Clear previous backup
  try {
    if (fs.existsSync(backupDir)) await fs.promises.rm(backupDir, { recursive: true })
  } catch (_) {}

  await fs.promises.mkdir(backupDir, { recursive: true })

  let backedUp = 0
  for (const diff of diffs) {
    const srcPath = path.join(targetDir, diff.file)
    try {
      if (!fs.existsSync(srcPath)) continue
      const destPath = path.join(backupDir, diff.file)
      await fs.promises.mkdir(path.dirname(destPath), { recursive: true })
      await fs.promises.copyFile(srcPath, destPath)
      backedUp++
    } catch (_) {}
  }

  if (backedUp > 0) {
    const relBackup = path.relative(process.cwd(), backupDir)
    console.log(chalk.yellow(`\nBacked up ${backedUp} local file(s) to ${chalk.bold(relBackup)}/`))
    console.log(chalk.dim('You can restore them manually if needed.\n'))
  }
}

async function findDiff (targetDir, distDir, { allDirectoryKeys, singleFileKeys, splitObjectKeys } = {}) {
  const diffs = []
  const dirs = Array.isArray(allDirectoryKeys) ? allDirectoryKeys : ALL_DIRECTORY_KEYS
  const singles = Array.isArray(singleFileKeys) ? singleFileKeys : []
  const splitKeys = Array.isArray(splitObjectKeys) ? splitObjectKeys : []

  for (const key of dirs) {
    const targetDirPath = path.join(targetDir, key)
    const distDirPath = path.join(distDir, key)

    if (!fs.existsSync(targetDirPath)) {
      continue
    }

    const targetFiles = await fs.promises.readdir(targetDirPath)
    for (const file of targetFiles) {
      // Historically we skipped directory index.js diffs, but for split-object
      // directories like `designSystem/` and `files/` the index.js content is
      // the canonical mapping (and needs to update when primitives move in/out).
      if (file === 'index.js' && !splitKeys.includes(key) && key !== 'libs') continue

      const targetFilePath = path.join(targetDirPath, file)
      const distFilePath = path.join(distDirPath, file)

      if (!fs.existsSync(distFilePath)) {
        diffs.push({
          file: path.join(key, file),
          diff: `File ${path.join(
            key,
            file
          )} does not exist in the dist directory.`
        })
        continue
      }

      const targetContent = await fs.promises.readFile(targetFilePath, 'utf8')
      const distContent = await fs.promises.readFile(distFilePath, 'utf8')

      if (targetContent !== distContent) {
        const diff = createPatch(file, distContent, targetContent)
        diffs.push({
          file: path.join(key, file),
          diff
        })
      }
    }
  }

  for (const key of singles) {
    const targetFilePath = path.join(targetDir, `${key}.js`)
    const distFilePath = path.join(distDir, `${key}.js`)

    if (!fs.existsSync(targetFilePath)) {
      continue
    }

    if (!fs.existsSync(distFilePath)) {
      diffs.push({
        file: `${key}.js`,
        diff: `File ${key}.js does not exist in the dist directory.`
      })
      continue
    }

    const targetContent = await fs.promises.readFile(targetFilePath, 'utf8')
    const distContent = await fs.promises.readFile(distFilePath, 'utf8')

    if (targetContent !== distContent) {
      const diff = createPatch(key, distContent, targetContent)
      diffs.push({
        file: `${key}.js`,
        diff
      })
    }
  }

  return diffs
}

async function overrideFiles (targetDir, distDir, { allDirectoryKeys, singleFileKeys } = {}) {
  const dirs = Array.isArray(allDirectoryKeys) ? allDirectoryKeys : ALL_DIRECTORY_KEYS
  const singles = Array.isArray(singleFileKeys) ? singleFileKeys : []

  for (const key of dirs) {
    const targetDirPath = path.join(targetDir, key)
    const distDirPath = path.join(distDir, key)

    if (!fs.existsSync(targetDirPath)) {
      continue
    }

    // Ensure destination directory exists (e.g. new local-only dirs like `libs/`)
    await fs.promises.mkdir(distDirPath, { recursive: true })

    const targetEntries = await fs.promises.readdir(targetDirPath, { withFileTypes: true })
    for (const ent of targetEntries) {
      // Only copy files; ignore directories/symlinks to keep behavior predictable.
      if (!ent.isFile()) continue
      const file = ent.name
      const targetFilePath = path.join(targetDirPath, file)
      const distFilePath = path.join(distDirPath, file)

      await fs.promises.copyFile(targetFilePath, distFilePath)
    }
  }

  for (const key of singles) {
    const targetFilePath = path.join(targetDir, `${key}.js`)
    const distFilePath = path.join(distDir, `${key}.js`)

    if (!fs.existsSync(targetFilePath)) {
      continue
    }

    await fs.promises.mkdir(distDir, { recursive: true })
    await fs.promises.copyFile(targetFilePath, distFilePath)
  }
}

async function askForConsent () {
  const questions = [
    {
      type: 'confirm',
      name: 'consent',
      message: 'Do you want to override the files?',
      default: false
    }
  ]

  return inquirer.prompt(questions)
}
