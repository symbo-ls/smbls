#!/usr/bin/env node

import { Command } from 'commander'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)

// Monkey-patch Command to suppress option-name clashes (old commander compat)
const origCheckClash = Command.prototype._checkForOptionNameClash
if (origCheckClash) {
  Command.prototype._checkForOptionNameClash = function () {}
}
// Monkey-patch to add .argument() if missing (alias for .arguments())
if (!Command.prototype.argument) {
  Command.prototype.argument = function (...args) { return this.arguments(...args) }
}
// Monkey-patch to add .allowExcessArguments() if missing
if (!Command.prototype.allowExcessArguments) {
  Command.prototype.allowExcessArguments = function () { return this }
}
// Monkey-patch to add .hook() if missing
if (!Command.prototype.hook) {
  Command.prototype.hook = function () { return this }
}

export const program = new Command()

try {
  const pkg = require('../package.json')
  program.version(pkg && pkg.version ? pkg.version : 'unknown')
} catch (_) {
  program.version('unknown')
}
