import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import * as utils from '@domql/utils'
import * as smblsUtils from '@symbo.ls/smbls-utils'
import { CONTEXT_MODULES, generateContextJs } from './init-helpers/v2detect.js'
import inquirer from 'inquirer'
import { createPatch } from 'diff'

const { removeChars, toCamelCase, toTitleCase } =
  smblsUtils.default || smblsUtils
const {
  deepDestringifyFunctions,
  objectToString,
  joinArrays,
  isString,
  isObject,
  removeValueFromArray
} = utils.default || utils

// Keys that are materialized as directories with per-entry files.
const directoryKeys = ['components', 'snippets', 'pages', 'functions', 'methods']

// Keys that used to be single files, but are now split into a directory with:
// - `index.js` exporting a default object
// - per-entry `*.js` files for object values (primitives stay in index.js)
const splitObjectKeys = ['designSystem', 'files']

const ALL_DIRECTORY_KEYS = [...directoryKeys, ...splitObjectKeys]

const defaultExports = ['pages', 'designSystem', 'state', 'files', 'dependencies', 'schema', 'sharedLibraries']

/**
 * Generate context.js content from a list of CONTEXT_MODULES entries.
 */
function generateContextJsContent (modules) {
  if (!modules.length) return 'export default {}\n'

  const imports = modules.map(m =>
    m.style === 'namespace'
      ? `import * as ${m.name} from '${m.path}'`
      : `import ${m.name} from '${m.path}'`
  ).join('\n')

  const keys = modules.map(m => m.name === 'config' ? '  ...config' : `  ${m.name}`).join(',\n')

  return `${imports}\n\nexport default {\n${keys}\n}\n`
}

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

function reorderWithOrderKeys (input) {
  if (Array.isArray(input)) {
    return input.map(reorderWithOrderKeys)
  }
  if (!input || typeof input !== 'object') return input
  const hasOrder = Array.isArray(input.__order)
  const originalKeys = Object.keys(input)
  const orderedKeys = []
  if (hasOrder) {
    for (let i = 0; i < input.__order.length; i++) {
      const k = input.__order[i]
      if (k === '__order') continue
      if (originalKeys.includes(k) && !orderedKeys.includes(k)) {
        orderedKeys.push(k)
      }
    }
  }
  for (let i = 0; i < originalKeys.length; i++) {
    const k = originalKeys[i]
    if (k === '__order') continue
    if (!orderedKeys.includes(k)) orderedKeys.push(k)
  }
  const out = {}
  for (let i = 0; i < orderedKeys.length; i++) {
    const k = orderedKeys[i]
    out[k] = reorderWithOrderKeys(input[k])
  }
  if (hasOrder) {
    out.__order = input.__order.slice()
  } else if (Object.prototype.hasOwnProperty.call(input, '__order')) {
    // Preserve explicit empty/non-array __order semantics at the end
    out.__order = input.__order
  }
  return out
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
          // Apply the same transformations as in createKeyDirectoryAndFiles
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
  // Keep it filesystem friendly and deterministic.
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

  const { update, metadata, librariesDir, libsConfig } = opts

  // `designSystem` and `files` are now directories (splitObjectKeys)
  const scope = String(opts.scope || 'full')
  const isLibsScope = scope === 'libs' || scope === 'sharedLibraries'

  const scopedDirectoryKeys = isLibsScope ? [] : directoryKeys
  const scopedSplitObjectKeys = isLibsScope ? [] : splitObjectKeys
  const scopedAllDirectoryKeys = [...scopedDirectoryKeys, ...scopedSplitObjectKeys]

  const scopedRootExportDirectoryKeys = isLibsScope ? [] : [...scopedDirectoryKeys, ...scopedSplitObjectKeys]

  const singleFileKeys = isLibsScope
    ? ['sharedLibraries']
    : (() => {
        let keys = ['state', 'dependencies', 'sharedLibraries']
        keys = removeValueFromArray(keys, 'schema')
        if (metadata) keys.push('schema')
        return keys
      })()

  const targetDir = distDir

  const filesExist = fs.existsSync(targetDir)

  if (!filesExist || update) {
    await fs.promises.mkdir(targetDir, { recursive: true })

    if (!isLibsScope) {
      // Migration: `designSystem.js` and `files.js` used to be generated as single files.
      // Now that they're directories, remove legacy single files to avoid ambiguity.
      for (const k of splitObjectKeys) {
        const legacyPath = path.join(targetDir, `${k}.js`)
        try {
          if (fs.existsSync(legacyPath)) await fs.promises.unlink(legacyPath)
        } catch (_) {}
      }

      // Migration: remove legacy libs/ directory inside symbols dir
      const legacyLibsDir = path.join(targetDir, 'libs')
      try {
        if (fs.existsSync(legacyLibsDir)) await fs.promises.rm(legacyLibsDir, { recursive: true })
      } catch (_) {}
    }

    const promises = [
      // Scaffold shared libraries into librariesDir (separate from symbols dir)
      scaffoldSharedLibraries(body?.sharedLibraries, targetDir, librariesDir, update, libsConfig),
      ...scopedDirectoryKeys.map((key) =>
        createKeyDirectoryAndFiles(key, body, targetDir, update)
      ),
      ...scopedSplitObjectKeys.map((key) => {
        if (body[key] && typeof body[key] === 'object') {
          return createSplitObjectDirectoryAndFiles(
            key,
            body[key],
            targetDir,
            update
          )
        }
        return undefined
      }),
      ...singleFileKeys.filter(k => k !== 'sharedLibraries').map((key) => {
        if (body[key] !== undefined) {
          return createSingleFileFolderAndFile(
            key,
            body[key],
            targetDir,
            update
          )
        }
        return undefined
      })
    ]

    await Promise.all(promises)
    if (!isLibsScope) {
      await generateIndexjsFile(
        joinArrays(singleFileKeys, scopedRootExportDirectoryKeys),
        targetDir,
        'root'
      )

      // Generate context.js if missing (never overwrite user edits)
      const contextPath = path.join(targetDir, 'context.js')
      if (!fs.existsSync(contextPath)) {
        const contextContent = generateContextJs(targetDir)
        if (contextContent) {
          await fs.promises.writeFile(contextPath, contextContent, 'utf8')
        }
      }
    }
  }

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
        scaffoldSharedLibraries(body?.sharedLibraries, cacheDir, librariesDir, true, libsConfig),
        ...scopedDirectoryKeys.map((key) =>
          createKeyDirectoryAndFiles(key, body, cacheDir, true)
        ),
        ...scopedSplitObjectKeys.map((key) => {
          if (body[key] && typeof body[key] === 'object') {
            return createSplitObjectDirectoryAndFiles(key, body[key], cacheDir, true)
          }
          return undefined
        }),
        ...singleFileKeys.filter(k => k !== 'sharedLibraries').map((key) => {
          if (body[key] !== undefined) {
            return createSingleFileFolderAndFile(key, body[key], cacheDir, true)
          }
          return undefined
        })
      ]

      await Promise.all(cachePromises)
      if (!isLibsScope) {
        await generateIndexjsFile(
          joinArrays(scopedRootExportDirectoryKeys, singleFileKeys),
          cacheDir,
          'root'
        )
      }

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
            await overrideFiles(cacheDir, targetDir, {
              allDirectoryKeys: scopedAllDirectoryKeys,
              singleFileKeys
            })
            // When the user consents to overriding, also remove stale files that
            // are no longer produced by the current body snapshot. This is
            // crucial for split directories like `designSystem/` where a previous
            // run might have produced per-flag files (e.g. useReset.js) that
            // should not persist once the value is a primitive.
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

  async function createKeyDirectoryAndFiles (key, body, distDir, update) {
    const dirPath = path.join(distDir, key)
    await fs.promises.mkdir(dirPath, { recursive: true })

    const dirs = []

    if (body[key] && isObject(body[key])) {
      // Normalize + dedupe entries before writing files. This is especially
      // important for `pages` where both "/node" and "node" can otherwise map
      // to the same filename and cause concurrent writes / corrupted output.
      const normalized = new Map()
      for (const [rawEntryKey, value] of Object.entries(body[key])) {
        if (shouldSkipEntryKey(rawEntryKey)) continue

        let entryKey = rawEntryKey
        if (key === 'pages') {
          if (entryKey.startsWith('/')) entryKey = entryKey.slice(1)
          if (entryKey === '') entryKey = 'main'
          if (entryKey.includes('*')) entryKey = 'fallback'
        }

        // Prefer the canonical slash-prefixed route form when there are collisions
        const priority = key === 'pages' && rawEntryKey.startsWith('/') ? 1 : 0
        const existing = normalized.get(entryKey)
        if (!existing || priority > existing.priority) {
          normalized.set(entryKey, { value, priority })
        }
      }

      const promises = Array.from(normalized.entries()).map(async ([entryKey, info]) => {
        await createOrUpdateFile(dirPath, entryKey, info.value, update)
        dirs.push(entryKey)
      })

      await Promise.all(promises)
    }

    // Ensure deterministic + unique index generation
    await generateIndexjsFile(Array.from(new Set(dirs)), dirPath, key)
  }

  function isPlainObjectValue (val) {
    return !!val && typeof val === 'object' && !Array.isArray(val)
  }

  function safeDeepDestringify (val) {
    // `deepDestringifyFunctions` expects plain objects. If called with a primitive
    // (e.g. boolean) it can coerce it into `{}`; if called with an array it can
    // coerce it into an object with numeric keys. We must preserve primitives
    // and arrays as-is.
    if (val === null || val === undefined) return val
    if (Array.isArray(val)) return val.map(safeDeepDestringify)
    if (typeof val !== 'object') return val
    return deepDestringifyFunctions(val)
  }

  function normalizeDesignSystemOptionFlags (root) {
    // Normalize boolean-like designSystem flags when they are explicitly
    // provided as booleans or boolean strings. We intentionally DO NOT coerce
    // empty objects `{}` into booleans, because `{}` is a valid "object bucket"
    // value that should be split into its own file and populated later.
    if (!root || typeof root !== 'object') return root

    const FLAG_KEYS = new Set([
      'useReset',
      'useVariable',
      'useFontImport',
      'useIconSprite',
      'useSvgSprite',
      'useDefaultConfig',
      'useDocumentTheme',
      'useDefaultIcons',
      'verbose'
    ])

    for (const flagKey of FLAG_KEYS) {
      if (!Object.prototype.hasOwnProperty.call(root, flagKey)) continue

      const cur = root[flagKey]
      if (typeof cur === 'boolean') continue

      if (typeof cur === 'string') {
        const lowered = cur.trim().toLowerCase()
        if (lowered === 'true') { root[flagKey] = true; continue }
        if (lowered === 'false') { root[flagKey] = false; continue }
      }

      if (isPlainObjectValue(cur) && Object.prototype.hasOwnProperty.call(cur, 'value')) {
        const v = cur.value
        if (typeof v === 'boolean') { root[flagKey] = v; continue }
        if (typeof v === 'string') {
          const lowered = v.trim().toLowerCase()
          if (lowered === 'true') { root[flagKey] = true; continue }
          if (lowered === 'false') { root[flagKey] = false; continue }
        }
      }
    }

    return root
  }

  function renderInlineValue (val) {
    // `objectToString` only quotes strings reliably when they are within an
    // object/array. For top-level primitive strings, it returns the raw string.
    if (typeof val === 'string') return JSON.stringify(val)
    return objectToString(val)
  }

  function isValidIdentifierName (name) {
    return typeof name === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(name) && !isReservedIdentifier(name)
  }

  function upperSnakeToLowerCamel (input) {
    const str = String(input || '')
    // Only convert strict UPPER_SNAKE_CASE / ALLCAPS tokens (designSystem sections).
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
    // Identifiers cannot start with a digit
    if (!/^[A-Za-z_$]/u.test(name)) name = `_${name}`
    if (isReservedIdentifier(name) || !isValidIdentifierName(name)) {
      // Last resort: remove anything unsafe, prefix underscore
      name = `_${name.replace(/[^A-Za-z0-9_$]/gu, '') || 'item'}`
    }
    let i = 2
    while (used.has(name)) {
      name = `${base}_${i++}`
    }
    used.add(name)
    return name
  }

  function indentMultiline (str, indent = '  ') {
    return String(str).replaceAll('\n', `\n${indent}`)
  }

  /**
   * Scaffold each shared library as a full project folder under librariesDir.
   * Writes sharedLibraries.js in symbolsDir that imports from the external librariesDir.
   */
  async function scaffoldSharedLibraries (sharedLibraries, symbolsDir, librariesDir, update, libsConfig) {
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

    const usedImportNames = new Set()
    const entries = libs.map((lib, idx) => {
      const stem = toLibFileStem(lib, idx)
      const importName = toSafeImportName(stem, usedImportNames)
      const libKey = lib?.key || stem
      const config = libsConfigMap.get(libKey) || {}
      return { lib, stem, importName, config }
    })

    // Scaffold each library as a full project folder
    await Promise.all(entries.map(async ({ stem, lib, config }) => {
      // Per-lib destDir override from symbols.json config
      const libDir = config.destDir
        ? path.resolve(path.dirname(symbolsDir), config.destDir)
        : path.join(resolvedLibsDir, stem)
      await fs.promises.mkdir(libDir, { recursive: true })

      const decoded = safeDeepDestringify(lib)
      const content = reorderWithOrderKeys(decoded)

      // Scaffold the lib with the same directory structure as symbols/
      const libDirectoryKeys = directoryKeys.filter(k => content[k] && typeof content[k] === 'object')
      const libSplitObjectKeys = splitObjectKeys.filter(k => content[k] && typeof content[k] === 'object')
      const libSingleFileKeys = ['state', 'dependencies'].filter(k => content[k] !== undefined)

      const libPromises = [
        ...libDirectoryKeys.map(key =>
          createKeyDirectoryAndFiles(key, content, libDir, update)
        ),
        ...libSplitObjectKeys.map(key =>
          createSplitObjectDirectoryAndFiles(key, content[key], libDir, update)
        ),
        ...libSingleFileKeys.map(key =>
          createSingleFileFolderAndFile(key, content[key], libDir, update)
        )
      ]

      await Promise.all(libPromises)

      // Generate context.js for this lib (same pattern as main symbols/context.js)
      // Use body keys to determine which modules exist (files written in parallel)
      const allLibKeys = new Set([...libDirectoryKeys, ...libSplitObjectKeys, ...libSingleFileKeys])
      const contextModules = CONTEXT_MODULES
        .filter(m => m.name !== 'sharedLibraries' && m.name !== 'config' && m.name !== 'envs')
        .filter(m => allLibKeys.has(m.name))

      const contextContent = generateContextJsContent(contextModules)
      await fs.promises.writeFile(path.join(libDir, 'context.js'), contextContent, 'utf8')
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
    const importLines = entries
      .map(({ importName, stem, config }) => {
        const libDir = config.destDir
          ? path.resolve(path.dirname(symbolsDir), config.destDir)
          : path.join(resolvedLibsDir, stem)
        const relPath = path.relative(symbolsDir, libDir)
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

  async function createSplitObjectDirectoryAndFiles (key, section, distDir, update) {
    const dirPath = path.join(distDir, key)
    await fs.promises.mkdir(dirPath, { recursive: true })

    // Normalize ordering and decode any stringified functions.
    const contentRootRaw = reorderWithOrderKeys(deepDestringifyFunctions(section || {}))
    const contentRoot = key === 'designSystem'
      ? normalizeDesignSystemOptionFlags(contentRootRaw)
      : contentRootRaw

    const DS_CONFIG_KEYS = new Set([
      'useReset', 'useVariable', 'useFontImport', 'useIconSprite', 'useSvgSprite',
      'useDefaultConfig', 'useDocumentTheme', 'useDefaultIcons', 'verbose',
      'globalTheme', 'version', 'router'
    ])

    const objectEntries = []
    const simpleEntries = []
    const configEntries = []

    for (const [entryKey, value] of Object.entries(contentRoot || {})) {
      // Config options inside designSystem go to config.js, not designSystem/index.js
      if (key === 'designSystem' && DS_CONFIG_KEYS.has(entryKey)) {
        configEntries.push([entryKey, value])
        continue
      }
      // Only split plain objects into individual files.
      if (isPlainObjectValue(value)) {
        const safeStem = String(entryKey).replace(/[/\\]/g, '-').toLowerCase()
        if (!safeStem) continue
        const rawImportName = safeStem.replace(/[-.]/g, '_')
        const safeName = /^[0-9]/.test(rawImportName) ? `_${rawImportName}` : rawImportName
        const importName = isReservedIdentifier(safeName) ? `_${safeName}` : safeName
        objectEntries.push({
          entryKey,
          value,
          fileStem: safeStem,
          importName,
          exportKey: rawImportName
        })
      } else {
        simpleEntries.push([entryKey, value])
      }
    }

    // Write config keys to config.js (merge with existing)
    if (configEntries.length) {
      const configPath = path.join(distDir, 'config.js')
      let existing = {}
      if (fs.existsSync(configPath)) {
        const src = fs.readFileSync(configPath, 'utf8')
        // Extract existing keys to avoid overwriting user config
        const match = src.match(/export default\s*\{([\s\S]*)\}/)
        if (match) {
          for (const line of match[1].split('\n')) {
            const m = line.match(/^\s*(\w+)\s*:/)
            if (m) existing[m[1]] = true
          }
        }
      }
      const newEntries = configEntries.filter(([k]) => !existing[k])
      if (newEntries.length) {
        const lines = newEntries.map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
        const body = Object.keys(existing).length
          ? fs.readFileSync(configPath, 'utf8').replace(/\}\s*$/, `  ${lines.join(',\n  ')},\n}\n`)
          : `export default {\n${lines.join(',\n')}\n}\n`
        fs.writeFileSync(configPath, body)
      }
    }

    // Write per-entry object files.
    const fileWrites = objectEntries.map(async ({ fileStem, value }) => {
      const filePath = path.join(dirPath, `${fileStem}.js`)
      if (!update && fs.existsSync(filePath)) return
      const objectValue = reorderWithOrderKeys(deepDestringifyFunctions(value))
      const stringified = `export default ${objectToString(objectValue)};`
      await fs.promises.writeFile(filePath, stringified, 'utf8')
    })
    await Promise.all(fileWrites)

    // Write index.js as a default-exported object that references split modules
    const importLines = objectEntries
      .map(({ importName, fileStem }) => `import ${importName} from './${fileStem}.js'`)
      .join('\n')

    const propLines = []

    // Object entries first (in order) — use original key for property name
    for (const { importName, entryKey } of objectEntries) {
      if (isValidIdentifierName(entryKey) && entryKey === importName) {
        propLines.push(`${importName},`)
      } else if (isValidIdentifierName(entryKey)) {
        propLines.push(`${entryKey}: ${importName},`)
      } else {
        propLines.push(`${JSON.stringify(entryKey)}: ${importName},`)
      }
    }

    // Then primitives/arrays/etc inline
    for (const [entryKey, value] of simpleEntries) {
      const decoded = safeDeepDestringify(value)
      const normalized = reorderWithOrderKeys(decoded)
      const rendered = renderInlineValue(normalized)
      const rhs = indentMultiline(rendered, '  ')
      if (isValidIdentifierName(entryKey)) {
        propLines.push(`${entryKey}: ${rhs},`)
      } else {
        propLines.push(`${JSON.stringify(entryKey)}: ${rhs},`)
      }
    }

    const indexContent =
      (importLines ? `${importLines}\n\n` : '') +
      `export default {\n  ${propLines.join('\n  ')}\n}\n`

    await fs.promises.writeFile(path.join(dirPath, 'index.js'), indexContent, 'utf8')
  }

  async function createOrUpdateFile (dirPath, childKey, value, update) {
    const itemKey =
      childKey.includes('-') || childKey.includes('/')
        ? removeChars(toCamelCase(childKey))
        : childKey
    // Avoid reserved identifiers that break ESM syntax, e.g. "export const default"
    const safeItemKey = isReservedIdentifier(itemKey) ? `_${itemKey}` : itemKey
    const fileStem = String(childKey).replaceAll('/', '-').replaceAll('\\', '-')
    const filePath = path.join(dirPath, `${fileStem}.js`)

    if (!update && fs.existsSync(filePath)) {
      return
    }

    const itemKeyInvalid = itemKey.includes('.')
    const validKey = itemKeyInvalid
      ? `const ${removeChars(toTitleCase(itemKey))}`
      : `export const ${safeItemKey}`

    let stringifiedContent
    if (isString(value)) {
      stringifiedContent = `${validKey} = ${value}`
    } else {
      const content = reorderWithOrderKeys(deepDestringifyFunctions(value))
      // console.log('ON DEEPDESTR:')
      // console.log(content.components.Configuration)
      stringifiedContent = `${validKey} = ${objectToString(content)};`
    }

    if (itemKeyInvalid) {
      stringifiedContent += `

export { ${removeChars(toTitleCase(itemKey))} as '${itemKey}' }`
    }

    await fs.promises.writeFile(filePath, stringifiedContent, 'utf8')
  }

  async function createSingleFileFolderAndFile (key, data, distDir, update) {
    const filePath = path.join(distDir, `${key}.js`)

    if (!update && fs.existsSync(filePath)) {
      return
    }

    // Preserve arrays/primitives as-is while decoding stringified functions inside objects.
    let content = safeDeepDestringify(data)
    if (isString(content)) {
      // `objectToString` can omit quotes for top-level strings; enforce proper quoting.
      content = { default: content }
    }
    content = reorderWithOrderKeys(content)
    const stringifiedContent = `export default ${objectToString(content)};`

    await fs.promises.writeFile(filePath, stringifiedContent, 'utf8')
  }

  // Generate final package.json string
  // function createPackageJson (key, data, distDir, update) {
  // const genStr = JSON.stringify({
  //   name: `@symbo.ls/${desiredFormat}-${packageName}`,
  //   version: packageStruct.version ?? '1.0.0',
  //   license: packageStruct.license ?? 'UNLICENSED',
  //   dependencies: deps,
  //   peerDependencies: {
  //     smbls: '^18.2.0',
  //     'react-dom': '^18.2.0'
  //   },
  //   main: 'index.js',
  //   source: 'index.js'
  // }, undefined, 2)

  // fs.writeFileSync(destPath, genStr)
  // }
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

async function generateIndexjsFile (dirs, dirPath, key) {
  let indexContent
  if (key === 'pages') {
    indexContent =
      dirs
        .map(
          (d) =>
            `import { ${
              d.includes('-') || d.includes('/')
                ? removeChars(toCamelCase(d))
                : d
            } } from './${d.replaceAll('/', '-')}.js';`
        )
        .join('\n') +
      '\n' +
      `export default {
      ${
        dirs
          .map(
            (d) =>
              `'/${d === 'main' ? '' : d}': ${
                d.includes('-') || d.includes('/')
                  ? removeChars(toCamelCase(d))
                  : d
              },`
          )
          .join('\n') + '\n'
      }
    }`
  } else if (key === 'root') {
    indexContent =
      dirs
        .map((d) => {
          const dirOrSingleJs = ALL_DIRECTORY_KEYS.includes(d)
            ? d + '/index.js'
            : d + '.js'
          if (defaultExports.includes(d)) {
            return `export { default as ${d} } from './${dirOrSingleJs}';`
          } else return `export * as ${d} from './${dirOrSingleJs}';`
        })
        .join('\n') + '\n'
  } else {
    indexContent =
      dirs.map((d) => `export * from './${d}.js';`).join('\n') + '\n'
  }
  const indexFilePath = path.join(dirPath, 'index.js')
  await fs.promises.writeFile(indexFilePath, indexContent, 'utf8')
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
