'use strict'

import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'
import { addToJson } from './addToJson.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const SYMBOLS_FILE_PATH = path.join(
  __dirname, 'symbols.json')
const DESIGN_SYSTEM_FILE_PATH = path.join(
  __dirname, 'DesignSystem.js')

export async function initRepo (dest, framework) {
  const cwd = process.cwd()

  // Init NPM if necessary
  if (!fs.existsSync(path.join(dest, 'package.json'))) {
    process.chdir(dest)
    console.log('Running npm init')
    execSync('npm init -y')
    process.chdir(cwd)
  }

  // Determine framework
  let pkg = 'smbls'
  if (framework === 'react') {
    pkg = '@symbo.ls/react'
  } else if (framework === 'angular') {
    pkg = '@symbo.ls/react'
  } else if (framework === 'vue2') {
    pkg = '@symbo.ls/vue2'
  } else if (framework === 'vue3') {
    pkg = '@symbo.ls/vue3'
  }

  // TODO: inject smbls dependencies into package.json

  // Install
  console.log(`Installing \`${pkg}\` from NPM...`)
  process.chdir(dest)
  // execSync(`npm i ${pkg} --save`)
  process.chdir(cwd)

  // Copy design system file
  console.log()
  const dsfilePath = path.join(dest, 'DesignSystem.js')
  console.log('Creating', chalk.bold(dsfilePath))
  await fs.promises.copyFile(DESIGN_SYSTEM_FILE_PATH, dsfilePath)

  // Copy design system file
  const rcfilePath = path.join(dest, 'symbols.json')
  console.log('Creating', chalk.bold(rcfilePath))
  await fs.promises.copyFile(SYMBOLS_FILE_PATH, rcfilePath)
  if (framework !== 'domql') addToJson(SYMBOLS_FILE_PATH, 'framework', framework)
  console.log()

  console.log(chalk.green.bold('Initialized project successfully.'))
}
