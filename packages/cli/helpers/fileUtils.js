import fs from 'fs'
import path from 'path'
import { build } from 'esbuild'

export async function buildDirectory(directoryPath, outputDirectory) {
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

async function buildFromFile(inputFilePath, outputFilePath) {
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
      format: 'cjs',
      bundle: true,
      mainFields: ['module', 'main'],
      external: ['esbuild']
    })
  } catch (error) {
    console.error('Error building file:', error)
    throw error
  }
}

async function getFilesRecursively(directoryPath) {
  const files = []
  async function traverseDirectory(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.name === 'dist' || entry.name === 'node_modules') continue

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