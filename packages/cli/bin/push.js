'use strict'

import fs from 'fs'
import path from 'path'
import { build } from 'esbuild'
import { loadModule } from './require.js'
import { program } from './program.js'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const RC_PATH = process.cwd() + '/symbols.json'

let rc = {}
try {
  rc = loadModule(RC_PATH) //eslint-disable-line
} catch (e) {
  console.error('Please include symbols.json to your root of repository')
}

export async function fs2js () {
  const distDir = path.join(process.cwd(), 'smbls')
  const outputDirectory = path.join(distDir, 'dist')

  // Ensure output directory exists
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true })
  }

  try {
    // Wait for the build to complete
    await buildDirectory(distDir, outputDirectory)
    console.log('All files built successfully')

    const outputFile = path.join(outputDirectory, 'index.js')
    if (!fs.existsSync(outputFile)) {
      throw new Error(`Built file not found: ${outputFile}`)
    }

    // Use createRequire to load the CommonJS module
    const moduleData = require(outputFile)
    console.log(JSON.stringify(moduleData))
  } catch (error) {
    console.error('Build or import error:', error)
    throw error
  }
}

async function buildDirectory (directoryPath, outputDirectory) {
  try {
    const files = await getFilesRecursively(directoryPath)
    const buildPromises = files.map(async (filePath) => {
      const relativePath = path.relative(directoryPath, filePath)
      const outputFile = path.join(outputDirectory, relativePath)

      // Ensure output subdirectories exist
      const outputDir = path.dirname(outputFile)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      await buildFromFile(filePath, outputFile)
    })
    await Promise.all(buildPromises)
  } catch (error) {
    console.error('Error building directory:', error)
    throw error
  }
}

async function buildFromFile (inputFilePath, outputFilePath) {
  try {
    const fileContents = fs.readFileSync(inputFilePath, 'utf8')
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
      format: 'cjs', // Changed back to CommonJS
      bundle: true,
      mainFields: ['module', 'main'],
      external: ['esbuild'] // Don't bundle esbuild itself
    })
  } catch (error) {
    console.error('Error building file:', error)
    throw error
  }
}

async function getFilesRecursively (directoryPath) {
  const files = []
  async function traverseDirectory (currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === 'dist' || entry.name === 'node_modules') {
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

program
  .command('push')
  .description('Push changes to platform')
  .action(fs2js)
