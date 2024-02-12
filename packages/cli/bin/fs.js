'use strict'

import fs from 'fs'
import path from 'path'
import utils from '@domql/utils'
const { deepDestringify, objectToString, joinArrays } = utils

const keys = ['components', 'snippets', 'pages']
const singleFileKeys = ['designSystem', 'state']

export function createDirs (body, distDir) {
  if (!body) {
    console.error('No JSON object provided. Exiting.')
    return
  }

  distDir = distDir || path.join(process.cwd(), 'dist')

  keys.forEach((key) => {
    createKeyDirectoryAndFiles(key, body, distDir)
  })

  singleFileKeys.forEach((key) => {
    if (body[key] && typeof body[key] === 'object') {
      createSingleFileFolderAndFile(key, body[key], distDir)
    }
  })

  generateIndexjsFile(joinArrays(keys, singleFileKeys), distDir)
}

async function generateIndexjsFile (dirs, dirPath) {
  // Generate index.js file
  const indexContent = dirs.map(d => `export * from './${d}'`).join('\n') + '\n'
  const indexFilePath = path.join(dirPath, 'index.js')
  const fh = await fs.promises.open(indexFilePath, 'w')
  await fh.writeFile(indexContent, 'utf8')
  await fh.close()
}

async function createKeyDirectoryAndFiles (key, body, distDir) {
  const dirPath = path.join(distDir, key)
  fs.existsSync(dirPath) || fs.mkdirSync(dirPath, { recursive: true })
  console.log(
    `${fs.existsSync(dirPath) ? 'Found' : 'Created'} directory: ${dirPath}`
  )

  const dirs = []
  if (body[key] && typeof body[key] === 'object') {
    Object.entries(body[key]).forEach(([entryKey, value]) => {
      let childKey = entryKey
      if (childKey.startsWith('/')) {
        childKey = childKey.slice(1)
        if (!childKey.length) childKey = 'main'
      }
      createOrUpdateFile(dirPath, childKey, value)
      dirs.push(childKey)
    })
  }

  generateIndexjsFile(dirs, dirPath)
}

function createOrUpdateFile (dirPath, childKey, value) {
  const filePath = path.join(dirPath, `${childKey}.js`)

  const content = deepDestringify(value)
  const stringifiedContent = `export const ${childKey} = ${objectToString(content)}`

  const fileExists = fs.existsSync(filePath)

  console.log(`${fileExists ? 'Updating' : 'Creating new'} file: ${filePath}`);
  (fileExists && fs.readFileSync(filePath, 'utf8') === content) ||
    fs.writeFileSync(filePath, stringifiedContent)
}

function createSingleFileFolderAndFile (key, data, distDir) {
  const filePath = path.join(distDir, `${key}.js`)
  const content = deepDestringify(data)
  const stringifiedContent = `export default ${objectToString(content)}`
  const fileExists = fs.existsSync(filePath)

  console.log(`${fileExists ? 'Updating' : 'Creating new'} file: ${filePath}`);
  (fileExists && fs.readFileSync(filePath, 'utf8') === content) ||
    fs.writeFileSync(filePath, stringifiedContent)
}
