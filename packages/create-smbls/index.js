#!/usr/bin/env node

// Invoked via: npx create-smbls [dest] [options]
// Delegates to:  smbls create [dest] [options]

process.argv.splice(2, 0, 'create')

await import('@symbo.ls/cli/bin/index.js')
