import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import * as utils from '@domql/utils'
import * as smblsUtils from '@symbo.ls/utils'
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

let singleFileKeys = ['designSystem', 'state', 'files', 'dependencies']
// Keys that are materialized as directories with per-entry files.
const directoryKeys = ['components', 'snippets', 'pages', 'functions', 'methods']

// Keys that used to be single files, but are now split into a directory with:
// - `index.js` exporting a default object
// - per-entry `*.js` files for object values (primitives stay in index.js)
const splitObjectKeys = ['designSystem', 'files']

const ALL_DIRECTORY_KEYS = [...directoryKeys, ...splitObjectKeys]

const defaultExports = ['pages', 'designSystem', 'state', 'files', 'dependencies', 'schema']

// Minimal reserved identifier set to avoid invalid named exports like "export const default"
const RESERVED_IDENTIFIERS = new Set(['default'])
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

async function removeStaleFiles (body, targetDir) {
  for (const key of ALL_DIRECTORY_KEYS) {
    const dirPath = path.join(targetDir, key)
    if (!fs.existsSync(dirPath)) continue

    const existingFiles = await fs.promises.readdir(dirPath)
    const currentEntries = (() => {
      if (!body[key] || typeof body[key] !== 'object') return []

      // For splitObjectKeys we only materialize object-valued entries as files
      if (splitObjectKeys.includes(key)) {
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
          return `${fileName.replace('/', '-')}.js`
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

export async function createFs (
  body,
  distDir = path.join(process.cwd(), 'smbls'),
  opts = {}
) {
  if (!body) {
    console.error('No JSON object provided. Exiting.')
    return
  }

  const { update, metadata } = opts

  // `designSystem` and `files` are now directories (splitObjectKeys)
  singleFileKeys = ['state', 'dependencies']
  singleFileKeys = removeValueFromArray(singleFileKeys, 'schema')
  if (metadata) singleFileKeys.push('schema')

  const targetDir = distDir

  const filesExist = fs.existsSync(targetDir)

  if (!filesExist || update) {
    await fs.promises.mkdir(targetDir, { recursive: true })

    // Migration: `designSystem.js` and `files.js` used to be generated as single files.
    // Now that they're directories, remove legacy single files to avoid ambiguity.
    for (const k of splitObjectKeys) {
      const legacyPath = path.join(targetDir, `${k}.js`)
      try {
        if (fs.existsSync(legacyPath)) await fs.promises.unlink(legacyPath)
      } catch (_) {}
    }

    const promises = [
      ...directoryKeys.map((key) =>
        createKeyDirectoryAndFiles(key, body, targetDir, update)
      ),
      ...splitObjectKeys.map((key) => {
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
      ...singleFileKeys.map((key) => {
        if (body[key] && typeof body[key] === 'object') {
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
    await generateIndexjsFile(
      joinArrays(singleFileKeys, ALL_DIRECTORY_KEYS),
      targetDir,
      'root'
    )
  }

  if (filesExist) {
    const cacheDir = path.join(distDir, '.cache')

    try {
      await fs.promises.mkdir(cacheDir, { recursive: true })

      if (update) {
        await removeStaleFiles(body, targetDir)
      }

      const cachePromises = [
        ...directoryKeys.map((key) =>
          createKeyDirectoryAndFiles(key, body, cacheDir, true)
        ),
        ...splitObjectKeys.map((key) => {
          if (body[key] && typeof body[key] === 'object') {
            return createSplitObjectDirectoryAndFiles(key, body[key], cacheDir, true)
          }
          return undefined
        }),
        ...singleFileKeys.map((key) => {
          if (body[key] && typeof body[key] === 'object') {
            return createSingleFileFolderAndFile(key, body[key], cacheDir, true)
          }
          return undefined
        })
      ]

      await Promise.all(cachePromises)
      await generateIndexjsFile(
        joinArrays(ALL_DIRECTORY_KEYS, singleFileKeys),
        cacheDir,
        'root'
      )

      const diffs = await findDiff(cacheDir, targetDir)
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
            await overrideFiles(cacheDir, targetDir)
            console.log('Files overridden successfully.')
          } else {
            console.log('Files not overridden.')
          }
        } else {
          await overrideFiles(cacheDir, targetDir)
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

  function isValidIdentifierName (name) {
    return typeof name === 'string' && /^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(name) && !isReservedIdentifier(name)
  }

  function toSafeImportName (key, used = new Set()) {
    const base =
      (key && (removeChars(toCamelCase(String(key))) || '').trim()) ||
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

  async function createSplitObjectDirectoryAndFiles (key, section, distDir, update) {
    const dirPath = path.join(distDir, key)
    await fs.promises.mkdir(dirPath, { recursive: true })

    // Normalize ordering and decode any stringified functions.
    const contentRoot = reorderWithOrderKeys(deepDestringifyFunctions(section || {}))

    const usedImportNames = new Set()
    const objectEntries = []
    const simpleEntries = []

    for (const [entryKey, value] of Object.entries(contentRoot || {})) {
      // Only split plain objects into individual files.
      if (isPlainObjectValue(value)) {
        const safeStem = String(entryKey).replace(/[/\\]/g, '-')
        if (!safeStem) continue
        objectEntries.push({
          entryKey,
          value,
          fileStem: safeStem,
          importName: toSafeImportName(entryKey, usedImportNames)
        })
      } else {
        simpleEntries.push([entryKey, value])
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

    // Object entries first (in order)
    for (const { entryKey, importName } of objectEntries) {
      if (isValidIdentifierName(entryKey) && entryKey === importName) {
        propLines.push(`${entryKey},`)
      } else if (isValidIdentifierName(entryKey)) {
        propLines.push(`${entryKey}: ${importName},`)
      } else {
        propLines.push(`${JSON.stringify(entryKey)}: ${importName},`)
      }
    }

    // Then primitives/arrays/etc inline
    for (const [entryKey, value] of simpleEntries) {
      const rendered = objectToString(reorderWithOrderKeys(deepDestringifyFunctions(value)))
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
    const filePath = path.join(dirPath, `${childKey.replace('/', '-')}.js`)

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

    if (isString(data)) data = { default: data }
    const content = reorderWithOrderKeys(deepDestringifyFunctions(data))
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

async function findDiff (targetDir, distDir) {
  const diffs = []

  for (const key of ALL_DIRECTORY_KEYS) {
    const targetDirPath = path.join(targetDir, key)
    const distDirPath = path.join(distDir, key)

    if (!fs.existsSync(targetDirPath)) {
      continue
    }

    const targetFiles = await fs.promises.readdir(targetDirPath)
    for (const file of targetFiles) {
      if (file === 'index.js') {
        continue // Skip comparing index.js files
      }

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

  for (const key of singleFileKeys) {
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
            } } from './${d.replaceAll('/', '-')}';`
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

async function overrideFiles (targetDir, distDir) {
  for (const key of ALL_DIRECTORY_KEYS) {
    const targetDirPath = path.join(targetDir, key)
    const distDirPath = path.join(distDir, key)

    if (!fs.existsSync(targetDirPath)) {
      continue
    }

    const targetFiles = await fs.promises.readdir(targetDirPath)
    for (const file of targetFiles) {
      const targetFilePath = path.join(targetDirPath, file)
      const distFilePath = path.join(distDirPath, file)

      await fs.promises.copyFile(targetFilePath, distFilePath)
    }
  }

  for (const key of singleFileKeys) {
    const targetFilePath = path.join(targetDir, `${key}.js`)
    const distFilePath = path.join(distDir, `${key}.js`)

    if (!fs.existsSync(targetFilePath)) {
      continue
    }

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
