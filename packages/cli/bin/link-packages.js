#!/usr/bin/env node

import fs from 'fs'
import { exec, execSync } from 'child_process'
import { program } from './program.js'

import packages from './linking/packages.js'

const COMMAND = 'npx lerna exec -- cat package.json | jq \'.name\''
const capture = (opts) => {
  exec(COMMAND, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`)
      return
    }

    const packageNames = stdout
      .split('\n')
      .map((line) => line.trim().replaceAll('"', '\''))
      .filter(Boolean)

    const output = `export default [
  ${packageNames.map((name) => `${name}`).join(',\n  ')}
]\n`

    try {
      fs.writeFileSync(process.cwd() + '/packages/cli/bin/linking/packages.js', output)
      console.log(`Packages list with ${packageNames.length} items successfully created\n`)
    } catch (e) {
      console.error('Error writing to file:')
      console.error(e)
    }
  })
}

program
  .command('link-packages')
  .description('Run "yarn link" on specified packages')
  .option('-c, --capture', 'Capture and write all package names.')
  .action((opts) => {
    if (opts.capture) return capture(opts)
    try {
      for (const packageName of packages) {
        console.log(`Linking ${packageName}...`)
        execSync(`yarn link ${packageName} --force`, { stdio: 'inherit' })
      }
      console.log('All packages linked successfully.')
    } catch (error) {
      console.error('Error linking packages:', error.message)
      process.exit(1)
    }
  })
