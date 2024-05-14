import fs from 'fs'
import path from 'path'
import { build } from 'esbuild'
import { loadModule } from './require.js'

const RC_PATH = process.cwd() + '/symbols.json'

let rc = {}
try {
  rc = loadModule(RC_PATH); // eslint-disable-line
} catch (e) {
  console.error('Please include symbols.json to your root of respository')
}

export async function fs2js () {
  const directoryPath = './toko'
  const outputDirectory = './toko/dist'
  buildDirectory(directoryPath, outputDirectory)
    .then(() => {
      console.log('All files built successfully')
    })
    .catch((error) => {
      console.error('Error:', error)
    })
  const kleo = await import(process.cwd() + '/toko/dist/index.js')
  console.log(JSON.stringify(kleo))
}

async function buildDirectory (directoryPath, outputDirectory) {
  try {
    const files = await getFilesRecursively(directoryPath)
    const buildPromises = files.map(async (filePath) => {
      const relativePath = path.relative(directoryPath, filePath)
      const outputFile = path.join(outputDirectory, relativePath)
      await buildFromFile(filePath, outputFile)
    })
    await Promise.all(buildPromises)
    console.log('All files built successfully')
  } catch (error) {
    console.error('Error building directory:', error)
    throw error
  }
}

async function buildFromFile (inputFilePath, outputFilePath) {
  try {
    const fileContents = await fs.readFileSync(inputFilePath, 'utf8')
    await build({
      stdin: {
        contents: fileContents,
        sourcefile: inputFilePath,
        loader: 'js',
        resolveDir: path.dirname(inputFilePath)
      },
      minify: false,
      outfile: outputFilePath,
      target: 'node14',
      platform: 'node',
      format: 'cjs'
    })
  } catch (error) {
    console.error('Error building file:', error)
    throw error
  }
}

async function getFilesRecursively (directoryPath) {
  const files = []
  async function traverseDirectory (currentPath) {
    const entries = await fs.readdirSync(currentPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name.startsWith('dist')) {
        continue
      }
      const fullPath = path.join(currentPath, entry.name)
      if (entry.isDirectory()) {
        await traverseDirectory(fullPath)
      } else if (entry.isFile() && entry.name.endsWith('.js')) {
        files.push(fullPath)
      }
    }
  }
  await traverseDirectory(directoryPath)
  return files
}
