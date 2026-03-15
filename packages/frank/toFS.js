'use strict'

import fs from 'fs'
import path from 'path'
import * as utils from '@domql/utils'
import * as smblsUtils from '@symbo.ls/smbls-utils'

const { removeChars, toCamelCase, toTitleCase } = smblsUtils.default || smblsUtils
const {
  deepDestringifyFunctions,
  objectToString,
  isString,
  isObject
} = utils.default || utils

// Keys materialized as directories with per-entry files (named exports)
const DIRECTORY_KEYS = ['components', 'snippets', 'pages', 'functions', 'methods']

// Keys materialized as directories with default export object + per-entry files
const SPLIT_OBJECT_KEYS = ['designSystem', 'files']

const ALL_DIRECTORY_KEYS = [...DIRECTORY_KEYS, ...SPLIT_OBJECT_KEYS]

// Root keys that use `export default` instead of `export * as`
const DEFAULT_EXPORTS = ['pages', 'designSystem', 'state', 'files', 'dependencies', 'schema', 'sharedLibraries']

// Keys that should never be written as individual files inside directories
const SKIP_ENTRY_KEYS = new Set(['__order', 'schema', 'default', 'class'])

const RESERVED_IDENTIFIERS = new Set(['default', 'class'])

// Design system config flags that go into config.js, not designSystem/
const DS_CONFIG_KEYS = new Set([
  'useReset', 'useVariable', 'useFontImport', 'useIconSprite', 'useSvgSprite',
  'useDefaultConfig', 'useDocumentTheme', 'useDefaultIcons', 'verbose',
  'globalTheme', 'version', 'router'
])

function isReservedIdentifier (name) {
  return RESERVED_IDENTIFIERS.has(name)
}

function shouldSkipEntryKey (name) {
  return SKIP_ENTRY_KEYS.has(name) || isReservedIdentifier(name)
}

function isPlainObjectValue (val) {
  return !!val && typeof val === 'object' && !Array.isArray(val)
}

function isValidIdentifierName (name) {
  return typeof name === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(name) && !isReservedIdentifier(name)
}

function safeDeepDestringify (val) {
  if (val === null || val === undefined) return val
  if (Array.isArray(val)) return val.map(safeDeepDestringify)
  if (typeof val !== 'object') return val
  return deepDestringifyFunctions(val)
}

function reorderWithOrderKeys (input) {
  if (Array.isArray(input)) return input.map(reorderWithOrderKeys)
  if (!input || typeof input !== 'object') return input
  const hasOrder = Array.isArray(input.__order)
  const originalKeys = Object.keys(input)
  const orderedKeys = []
  if (hasOrder) {
    for (const k of input.__order) {
      if (k === '__order') continue
      if (originalKeys.includes(k) && !orderedKeys.includes(k)) orderedKeys.push(k)
    }
  }
  for (const k of originalKeys) {
    if (k === '__order') continue
    if (!orderedKeys.includes(k)) orderedKeys.push(k)
  }
  const out = {}
  for (const k of orderedKeys) out[k] = reorderWithOrderKeys(input[k])
  if (hasOrder) out.__order = input.__order.slice()
  else if (Object.prototype.hasOwnProperty.call(input, '__order')) out.__order = input.__order
  return out
}

function renderInlineValue (val) {
  if (typeof val === 'string') return JSON.stringify(val)
  return objectToString(val)
}

function indentMultiline (str, indent = '  ') {
  return String(str).replaceAll('\n', `\n${indent}`)
}

function upperSnakeToLowerCamel (input) {
  const str = String(input || '')
  if (!/^[A-Z0-9_]+$/u.test(str) || !/[A-Z]/u.test(str)) return null
  const parts = str.split('_').filter(Boolean).map(p => p.toLowerCase())
  if (!parts.length) return null
  return parts[0] + parts.slice(1).map(p => p ? p[0].toUpperCase() + p.slice(1) : '').join('')
}

function toSafeImportName (key, used = new Set()) {
  const asToken = upperSnakeToLowerCamel(key)
  const base = (key && (removeChars(asToken || toCamelCase(String(key))) || '').trim()) || 'item'
  let name = base
  if (!/^[A-Za-z_$]/u.test(name)) name = `_${name}`
  if (isReservedIdentifier(name) || !isValidIdentifierName(name)) {
    name = `_${name.replace(/[^A-Za-z0-9_$]/gu, '') || 'item'}`
  }
  let i = 2
  while (used.has(name)) name = `${base}_${i++}`
  used.add(name)
  return name
}

function normalizeDesignSystemFlags (root) {
  if (!root || typeof root !== 'object') return root
  for (const flagKey of DS_CONFIG_KEYS) {
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

// --- File generators ---

function generateRootIndex (dirs, singleFileKeys) {
  return dirs
    .map((d) => {
      const dirOrSingleJs = ALL_DIRECTORY_KEYS.includes(d) ? d + '/index.js' : d + '.js'
      if (DEFAULT_EXPORTS.includes(d)) {
        return `export { default as ${d} } from './${dirOrSingleJs}';`
      }
      return `export * as ${d} from './${dirOrSingleJs}';`
    })
    .join('\n') + '\n'
}

function generatePagesIndex (dirs) {
  const imports = dirs
    .map(d => {
      const name = d.includes('-') || d.includes('/') ? removeChars(toCamelCase(d)) : d
      return `import { ${name} } from './${d.replaceAll('/', '-')}.js';`
    })
    .join('\n')

  const entries = dirs
    .map(d => {
      const name = d.includes('-') || d.includes('/') ? removeChars(toCamelCase(d)) : d
      return `'/${d === 'main' ? '' : d}': ${name},`
    })
    .join('\n')

  return `${imports}\nexport default {\n      ${entries}\n\n    }`
}

function generateDirectoryIndex (dirs) {
  return dirs.map(d => `export * from './${d}.js';`).join('\n') + '\n'
}

/**
 * Convert a JSON project object into a Symbols filesystem structure.
 *
 * @param {Object} data - The project JSON data
 * @param {string} distDir - Absolute path to write the symbols/ directory
 * @param {Object} [options]
 * @param {boolean} [options.overwrite] - Overwrite existing files (default: false)
 * @returns {Promise<void>}
 */
export async function toFS (data, distDir, options = {}) {
  if (!data) throw new Error('No project data provided')

  const { overwrite = false } = options

  await fs.promises.mkdir(distDir, { recursive: true })

  const singleFileKeys = ['state', 'dependencies']
  if (Array.isArray(data.sharedLibraries) || data.sharedLibraries) {
    singleFileKeys.push('sharedLibraries')
  }

  const promises = [
    ...DIRECTORY_KEYS.map(key => writeDirectory(key, data, distDir, overwrite)),
    ...SPLIT_OBJECT_KEYS.map(key => {
      if (data[key] && typeof data[key] === 'object') {
        return writeSplitObjectDirectory(key, data[key], distDir, overwrite)
      }
    }),
    ...singleFileKeys.map(key => {
      if (data[key] !== undefined) {
        return writeSingleFile(key, data[key], distDir, overwrite)
      }
    })
  ]

  await Promise.all(promises)

  // Generate config.js from designSystem config flags + any existing config fields
  await writeConfigFile(data, distDir, overwrite)

  // Generate root index.js
  const allRootKeys = [...DIRECTORY_KEYS, ...SPLIT_OBJECT_KEYS, ...singleFileKeys]
  const existingKeys = allRootKeys.filter(k => data[k] !== undefined)
  const indexContent = generateRootIndex(existingKeys)
  const indexPath = path.join(distDir, 'index.js')
  if (overwrite || !fs.existsSync(indexPath)) {
    await fs.promises.writeFile(indexPath, indexContent, 'utf8')
  }

  // Generate context.js
  await writeContextFile(existingKeys, distDir, overwrite)
}

async function writeConfigFile (data, distDir, overwrite) {
  const configPath = path.join(distDir, 'config.js')
  const configEntries = {}

  // Extract DS config flags
  if (data.designSystem && typeof data.designSystem === 'object') {
    for (const [k, v] of Object.entries(data.designSystem)) {
      if (DS_CONFIG_KEYS.has(k)) configEntries[k] = v
    }
  }

  // Add top-level config fields
  const TOP_CONFIG = ['useReset', 'useVariable', 'useFontImport', 'useIconSprite',
    'useSvgSprite', 'useDefaultConfig', 'useDocumentTheme', 'verbose', 'globalTheme']
  for (const k of TOP_CONFIG) {
    if (data[k] !== undefined) configEntries[k] = data[k]
  }

  if (!Object.keys(configEntries).length && !overwrite) return

  const lines = Object.entries(configEntries)
    .map(([k, v]) => `  ${k}: ${JSON.stringify(v)}`)
    .join(',\n')

  const content = `export default {\n${lines}\n}\n`
  if (overwrite || !fs.existsSync(configPath)) {
    await fs.promises.writeFile(configPath, content, 'utf8')
  }
}

async function writeContextFile (keys, distDir, overwrite) {
  const contextPath = path.join(distDir, 'context.js')
  if (!overwrite && fs.existsSync(contextPath)) return

  const CONTEXT_MODULES = [
    { name: 'state', path: './state.js', style: 'default' },
    { name: 'dependencies', path: './dependencies.js', style: 'default' },
    { name: 'sharedLibraries', path: './sharedLibraries.js', style: 'default' },
    { name: 'components', path: './components/index.js', style: 'namespace' },
    { name: 'snippets', path: './snippets/index.js', style: 'namespace' },
    { name: 'pages', path: './pages/index.js', style: 'default' },
    { name: 'functions', path: './functions/index.js', style: 'namespace' },
    { name: 'methods', path: './methods/index.js', style: 'namespace' },
    { name: 'designSystem', path: './designSystem/index.js', style: 'default' },
    { name: 'files', path: './files/index.js', style: 'default' },
    { name: 'config', path: './config.js', style: 'default' }
  ]

  const modules = CONTEXT_MODULES.filter(m => keys.includes(m.name) || m.name === 'config')

  const imports = modules.map(m =>
    m.style === 'namespace'
      ? `import * as ${m.name} from '${m.path}'`
      : `import ${m.name} from '${m.path}'`
  ).join('\n')

  const entries = modules.map(m =>
    m.name === 'config' ? '  ...config' : `  ${m.name}`
  ).join(',\n')

  const content = `${imports}\n\nexport default {\n${entries}\n}\n`
  await fs.promises.writeFile(contextPath, content, 'utf8')
}

async function writeDirectory (key, body, distDir, overwrite) {
  const dirPath = path.join(distDir, key)
  await fs.promises.mkdir(dirPath, { recursive: true })

  if (!body[key] || !isObject(body[key])) {
    await fs.promises.writeFile(path.join(dirPath, 'index.js'), '', 'utf8')
    return
  }

  const dirs = []

  // Normalize + dedupe entries (important for pages where /x and x can collide)
  const normalized = new Map()
  for (const [rawKey, value] of Object.entries(body[key])) {
    if (shouldSkipEntryKey(rawKey)) continue

    let entryKey = rawKey
    if (key === 'pages') {
      if (entryKey.startsWith('/')) entryKey = entryKey.slice(1)
      if (entryKey === '') entryKey = 'main'
      if (entryKey.includes('*')) entryKey = 'fallback'
    }

    const priority = key === 'pages' && rawKey.startsWith('/') ? 1 : 0
    const existing = normalized.get(entryKey)
    if (!existing || priority > existing.priority) {
      normalized.set(entryKey, { value, priority })
    }
  }

  const promises = Array.from(normalized.entries()).map(async ([entryKey, info]) => {
    await writeEntryFile(dirPath, entryKey, info.value, overwrite)
    dirs.push(entryKey)
  })

  await Promise.all(promises)

  // Generate index.js for this directory
  let indexContent
  if (key === 'pages') {
    indexContent = generatePagesIndex(dirs)
  } else {
    indexContent = generateDirectoryIndex(dirs)
  }
  await fs.promises.writeFile(path.join(dirPath, 'index.js'), indexContent, 'utf8')
}

async function writeEntryFile (dirPath, childKey, value, overwrite) {
  const itemKey = childKey.includes('-') || childKey.includes('/')
    ? removeChars(toCamelCase(childKey))
    : childKey
  const safeItemKey = isReservedIdentifier(itemKey) ? `_${itemKey}` : itemKey
  const fileStem = String(childKey).replaceAll('/', '-').replaceAll('\\', '-')
  const filePath = path.join(dirPath, `${fileStem}.js`)

  if (!overwrite && fs.existsSync(filePath)) return

  const itemKeyInvalid = itemKey.includes('.')
  const validKey = itemKeyInvalid
    ? `const ${removeChars(toTitleCase(itemKey))}`
    : `export const ${safeItemKey}`

  let content
  if (isString(value)) {
    content = `${validKey} = ${value}`
  } else {
    const decoded = reorderWithOrderKeys(deepDestringifyFunctions(value))
    content = `${validKey} = ${objectToString(decoded)};`
  }

  if (itemKeyInvalid) {
    content += `\n\nexport { ${removeChars(toTitleCase(itemKey))} as '${itemKey}' }`
  }

  await fs.promises.writeFile(filePath, content, 'utf8')
}

async function writeSplitObjectDirectory (key, section, distDir, overwrite) {
  const dirPath = path.join(distDir, key)
  await fs.promises.mkdir(dirPath, { recursive: true })

  const contentRootRaw = reorderWithOrderKeys(deepDestringifyFunctions(section || {}))
  const contentRoot = key === 'designSystem'
    ? normalizeDesignSystemFlags(contentRootRaw)
    : contentRootRaw

  const objectEntries = []
  const simpleEntries = []

  for (const [entryKey, value] of Object.entries(contentRoot || {})) {
    if (key === 'designSystem' && DS_CONFIG_KEYS.has(entryKey)) continue
    if (isPlainObjectValue(value)) {
      const safeStem = String(entryKey).replace(/[/\\]/g, '-').replace(/\s+/g, '-').toLowerCase()
      if (!safeStem) continue
      const rawImportName = safeStem.replace(/[^a-z0-9]/gi, '_')
      const safeName = /^[0-9]/.test(rawImportName) ? `_${rawImportName}` : rawImportName
      const importName = isReservedIdentifier(safeName) ? `_${safeName}` : safeName
      objectEntries.push({ entryKey, value, fileStem: safeStem, importName })
    } else {
      simpleEntries.push([entryKey, value])
    }
  }

  // Write per-entry files
  await Promise.all(objectEntries.map(async ({ fileStem, value }) => {
    const filePath = path.join(dirPath, `${fileStem}.js`)
    if (!overwrite && fs.existsSync(filePath)) return
    const objectValue = reorderWithOrderKeys(deepDestringifyFunctions(value))
    await fs.promises.writeFile(filePath, `export default ${objectToString(objectValue)};`, 'utf8')
  }))

  // Write index.js
  const importLines = objectEntries
    .map(({ importName, fileStem }) => `import ${importName} from './${fileStem}.js'`)
    .join('\n')

  const propLines = []
  for (const { importName, entryKey } of objectEntries) {
    if (isValidIdentifierName(entryKey) && entryKey === importName) {
      propLines.push(`${importName},`)
    } else if (isValidIdentifierName(entryKey)) {
      propLines.push(`${entryKey}: ${importName},`)
    } else {
      propLines.push(`${JSON.stringify(entryKey)}: ${importName},`)
    }
  }

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

  const indexContent = (importLines ? `${importLines}\n\n` : '') +
    `export default {\n  ${propLines.join('\n  ')}\n}\n`

  await fs.promises.writeFile(path.join(dirPath, 'index.js'), indexContent, 'utf8')
}

async function writeSingleFile (key, data, distDir, overwrite) {
  const filePath = path.join(distDir, `${key}.js`)
  if (!overwrite && fs.existsSync(filePath)) return

  if (key === 'sharedLibraries' && Array.isArray(data)) {
    const content = data.length === 0
      ? 'export default []\n'
      : `export default ${objectToString(data.map(v => safeDeepDestringify(v)))};\n`
    await fs.promises.writeFile(filePath, content, 'utf8')
    return
  }

  let content = safeDeepDestringify(data)
  if (isString(content)) content = { default: content }
  content = reorderWithOrderKeys(content)
  await fs.promises.writeFile(filePath, `export default ${objectToString(content)};`, 'utf8')
}
