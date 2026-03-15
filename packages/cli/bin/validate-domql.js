#!/usr/bin/env node

import path from 'path'
import { spawnSync } from 'child_process'
import { fileURLToPath } from 'url'
import { program } from './program.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const runnerPath = path.join(__dirname, 'validate-domql-runner.js')

export function validateDomqlRuntime (target, options = {}) {
  const args = [runnerPath]
  if (target) args.push(target)
  if (options.failFast) args.push('--fail-fast')

  const result = spawnSync(process.execPath, args, {
    cwd: process.cwd(),
    stdio: 'inherit'
  })

  if (result.error) throw result.error
  if (typeof result.status === 'number' && result.status !== 0) {
    process.exit(result.status)
  }
}

program
  .command('validate-domql')
  .description('Validate generated DOMQL pages and components with DOMQL extend-resolution')
  .argument('[target]', 'Generated app directory. Defaults to symbols.json distDir or ./smbls')
  .option('--fail-fast', 'Stop at the first DOMQL behavior failure')
  .action(validateDomqlRuntime)
