import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import utils from '@domql/utils'
import * as smblsUtils from '@symbo.ls/utils'
import inquirer from 'inquirer'
import { createPatch } from 'diff'

const { removeChars, toCamelCase, toTitleCase } = smblsUtils.default
const {
  deepDestringify,
  objectToString,
  joinArrays,
  isString,
  isObject,
  removeValueFromArray
} = utils

let singleFileKeys = ['designSystem', 'state', 'files', 'dependencies', 'packages']
const directoryKeys = ['components', 'snippets', 'pages', 'functions']

const defaultExports = ['pages', 'designSystem', 'state', 'files', 'dependencies', 'packages', 'schema']

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
    await fs.promises.mkdir(cacheDir, { recursive: true })

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
  }

  async function createKeyDirectoryAndFiles (key, body, distDir, update) {
    const dirPath = path.join(distDir, key)
    await fs.promises.mkdir(dirPath, { recursive: true })

    const dirs = []

    if (body[key] && isObject(body[key])) {
      const promises = Object.entries(body[key]).map(
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

  async function createOrUpdateFile (dirPath, childKey, value, update) {
    const itemKey =
      childKey.includes('-') || childKey.includes('/')
        ? removeChars(toCamelCase(childKey))
        : childKey
    const filePath = path.join(dirPath, `${childKey.replace('/', '-')}.js`)

    if (!update && fs.existsSync(filePath)) {
      return
    }

    const itemKeyInvalid = itemKey.includes('.')
    const validKey = itemKeyInvalid ? `const ${removeChars(toTitleCase(itemKey))}` : `export const ${itemKey}`

    let stringifiedContent
    if (isString(value)) {
      stringifiedContent = `${validKey} = ${value}`
    } else {
      const content = deepDestringify(value)
      // console.log('ON DEEPDESTR:')
      // console.log(content.components.Configuration)
      stringifiedContent = `${validKey} = ${objectToString(
        content
      )};`
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
    const content = deepDestringify(data)
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
            } } from './${d.replace('/', '-')}';`
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
          if (defaultExports.includes(d)) {
            return `export { default as ${d} } from './${d}';`
          } else return `export * as ${d} from './${d}';`
        })
        .join('\n') + '\n'
  } else {
    indexContent = dirs.map((d) => `export * from './${d}';`).join('\n') + '\n'
  }
  const indexFilePath = path.join(dirPath, 'index.js')
  await fs.promises.writeFile(indexFilePath, indexContent, 'utf8')
}

async function overrideFiles (targetDir, distDir) {
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
