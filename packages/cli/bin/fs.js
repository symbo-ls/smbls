import fs from 'fs'
import chalk from 'chalk'
import path from 'path'
import utils from '@domql/utils'
import inquirer from 'inquirer'
import { createPatch } from 'diff'

const { deepDestringify, objectToString, joinArrays, isString } = utils

const LOCAL_CONFIG_PATH =
  process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'

const keys = ['components', 'snippets', 'pages']
const singleFileKeys = ['designSystem', 'state']
const defaultExports = ['pages', 'designSystem', 'state']

export async function createFs (
  body,
  distDir = path.join(process.cwd(), 'dist'),
  update = false
) {
  if (!body) {
    console.error('No JSON object provided. Exiting.')
    return
  }

  const targetDir = distDir

  const filesExist = fs.existsSync(targetDir)

  if (!filesExist || update) {
    await fs.promises.mkdir(targetDir, { recursive: true })

    const promises = [
      ...keys.map((key) =>
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
      })
    ]

    await Promise.all(promises)
    await generateIndexjsFile(joinArrays(keys, singleFileKeys), targetDir, 'root')
  }

  if (filesExist) {
    const cacheDir = path.join(distDir, '.cache')
    await fs.promises.mkdir(cacheDir, { recursive: true })

    const cachePromises = [
      ...keys.map((key) =>
        createKeyDirectoryAndFiles(key, body, cacheDir, true)
      ),
      ...singleFileKeys.map((key) => {
        if (body[key] && typeof body[key] === 'object') {
          return createSingleFileFolderAndFile(key, body[key], cacheDir, true)
        }
      })
    ]

    await Promise.all(cachePromises)
    await generateIndexjsFile(joinArrays(keys, singleFileKeys), cacheDir, 'root')

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
      }
    } else {
      console.log('No differences found.')
    }
  }

  async function createKeyDirectoryAndFiles (key, body, distDir, update) {
    const dirPath = path.join(distDir, key)
    await fs.promises.mkdir(dirPath, { recursive: true })

    const dirs = []

    if (body[key] && typeof body[key] === 'object') {
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
    const filePath = path.join(dirPath, `${childKey}.js`)

    if (!update && fs.existsSync(filePath)) {
      return
    }

    let stringifiedContent
    if (isString(value)) {
      stringifiedContent = `export const ${childKey} = ${value}`
    } else {
      const content = deepDestringify(value)
      stringifiedContent = `export const ${childKey} = ${objectToString(content)};`
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

  await fs.writeFileSync(LOCAL_CONFIG_PATH, '{}')
}

async function findDiff (targetDir, distDir) {
  const diffs = []

  for (const key of keys) {
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

      const targetContent = await fs.promises.readFile(
        targetFilePath,
        'utf8'
      )
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
    dirs.map((d) => `import { ${d} } from './${d}';`).join('\n') + '\n' +
    `export default {
      ${dirs.map((d) => `'/${d === 'main' ? '' : d}': ${d},`).join('\n') + '\n'}
    }`
  } else if (key === 'root') {
    indexContent =
    dirs.map((d) => {
      if (defaultExports.includes(d)) return `export { default as ${d} } from './${d}';`
      else return `export * as ${d} from './${d}';`
    }).join('\n') + '\n'
  } else {
    indexContent =
    dirs.map((d) => `export * from './${d}';`).join('\n') + '\n'
  }
  const indexFilePath = path.join(dirPath, 'index.js')
  await fs.promises.writeFile(indexFilePath, indexContent, 'utf8')
}

async function overrideFiles (targetDir, distDir) {
  for (const key of keys) {
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
