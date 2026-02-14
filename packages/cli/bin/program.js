#!/usr/bin/env node

import { Command } from 'commander'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export const program = new Command()

try {
  const pkg = require('../package.json')
  program.version(pkg && pkg.version ? pkg.version : 'unknown')
} catch (_) {
  program.version('unknown')
}
