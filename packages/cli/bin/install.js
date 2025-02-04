#!/usr/bin/env node

import chalk from 'chalk'
import { loadModule } from './require.js'
import { exec } from 'child_process'
import { program } from './program.js'

const PACKAGE_PATH = process.cwd() + '/package.json'
const RC_PATH = process.cwd() + '/symbols.json'
const LOCAL_CONFIG_PATH = process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'
const DEFAULT_REMOTE_CONFIG_PATH = 'https://api.symbols.app/' // eslint-disable-line

const pkg = await loadModule(PACKAGE_PATH, { json: true, silent: true })
const rcFile = await loadModule(RC_PATH, { json: true, silent: true })
const localConfig = await loadModule(LOCAL_CONFIG_PATH, { json: true, silent: true })

let rc = {}
try {
  rc = await loadModule(RC_PATH, { json: true })
} catch (e) { console.error('Please include symbols.json to your root of respository') }

const makeCommand = (packageManager, packageName) => {
  return packageManager === 'yarn'
    ? `npm run add ${packageName}`
    : packageManager === 'pnpm'
      ? `pnpm add ${packageName}`
      : `npm i ${packageName} --save`
}

export const installFromCli = async (options) => {
  if (!rcFile || !localConfig) {
    console.error('symbols.json not found in the root of the repository')
    return
  }

  const framework = rcFile.framework || options.framework
  const packageManager = rcFile.packageManager || options.packageManager

  // const packageName = `@symbo.ls/${mode || 'uikit'}`
  const packageName = framework === 'react' ? '@symbo.ls/react' : 'smbls'
  console.log('Adding', chalk.green.bold(packageName))

  const command = makeCommand(packageManager, packageName)
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`)
      return
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`)
      // return;
    }
    console.log('')
    console.log(`stdout: ${stdout}`)
    console.log('\n')
    console.log(chalk.green.bold(packageName), 'successfuly added!')
    console.log('')
    console.log(
      chalk.dim('Now you can import components like:'),
      `import { Button } from '${packageName}'`
    )
  })
}

program
  .version(pkg.version ?? 'unknown')

program
  .command('install')
  .description('Install Symbols')
  .option('-d, --dev', 'Running from local server')
  .option('-v, --verbose', 'Verbose errors and warnings')
  .option('-f, --fetch', 'Verbose errors and warnings', true)
  .option('--framework', 'Which Symbols to install (domql, react)')
  .action(installFromCli)
