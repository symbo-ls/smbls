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
const directoryKeys = ['components', 'snippets', 'pages', 'functions', 'methods']

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

async function removeStaleFiles(body, targetDir) {
  for (const key of directoryKeys) {
    const dirPath = path.join(targetDir, key)
    if (!fs.existsSync(dirPath)) continue

    const existingFiles = await fs.promises.readdir(dirPath)
    const currentEntries = body[key] ? Object.keys(body[key])
      // Drop meta/reserved identifiers like "__order" and "default"
      .filter(entry => !shouldSkipEntryKey(entry))
      .map(entry => {
      // Apply the same transformations as in createKeyDirectoryAndFiles
      let fileName = entry
      if (fileName.startsWith('/')) fileName = fileName.slice(1)
      if (fileName === '') fileName = 'main'
      if (fileName.includes('*')) fileName = 'fallback'
      return `${fileName.replace('/', '-')}.js`
    }) : []

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

  singleFileKeys = removeValueFromArray(singleFileKeys, 'schema')
  if (metadata) singleFileKeys.push('schema')

  const targetDir = distDir

  const filesExist = fs.existsSync(targetDir)

  if (!filesExist || update) {
    await fs.promises.mkdir(targetDir, { recursive: true })

    const promises = [
      ...directoryKeys.map((key) =>
        createKeyDirectoryAndFiles(key, body, targetDir, update)
      ),
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
      joinArrays(singleFileKeys, directoryKeys),
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
        ...singleFileKeys.map((key) => {
          if (body[key] && typeof body[key] === 'object') {
            return createSingleFileFolderAndFile(key, body[key], cacheDir, true)
          }
          return undefined
        })
      ]

      await Promise.all(cachePromises)
      await generateIndexjsFile(
        joinArrays(directoryKeys, singleFileKeys),
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

  async function createKeyDirectoryAndFiles(key, body, distDir, update) {
    const dirPath = path.join(distDir, key)
    await fs.promises.mkdir(dirPath, { recursive: true })

    const dirs = []

    if (body[key] && isObject(body[key])) {
      const promises = Object.entries(body[key])
        // Skip meta/reserved identifier entries (e.g. "__order", "default")
        .filter(([entryKey]) => !shouldSkipEntryKey(entryKey))
        .map(
        async ([entryKey, value]) => {
          // if pages
          if (entryKey.startsWith('/')) entryKey = entryKey.slice(1)
          if (entryKey === '') entryKey = 'main'
          if (entryKey.includes('*')) entryKey = 'fallback'

          await createOrUpdateFile(dirPath, entryKey, value, update)
          dirs.push(entryKey)
        }
      )

      await Promise.all(promises)
    }

    await generateIndexjsFile(dirs, dirPath, key)
  }

  async function createOrUpdateFile(dirPath, childKey, value, update) {
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

  async function createSingleFileFolderAndFile(key, data, distDir, update) {
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

async function findDiff(targetDir, distDir) {
  const diffs = []

  for (const key of directoryKeys) {
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

async function generateIndexjsFile(dirs, dirPath, key) {
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
          const dirOrSingleJs = directoryKeys.includes(d)
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

async function overrideFiles(targetDir, distDir) {
  for (const key of directoryKeys) {
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

async function askForConsent() {
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
