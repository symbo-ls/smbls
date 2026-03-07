#!/usr/bin/env node

import 'v8-compile-cache'

import { program } from './program.js'
import { maybeShowCompletionHint } from '../helpers/onboarding.js'
import './completion.js'
import './install.js'
import './init.js'
import './config.js'
import './fetch.js'
import './sync.js'
import './clean.js'
import './convert.js'
import './create.js'
import './project.js'
import './login.js'
import './logout.js'
import './push.js'
import './link-packages.js'
import './collab.js'
import './servers.js'
import './files.js'
import './migrate.js'
import './start.js'
import './build.js'
import './brender.js'
import './deploy.js'
import './ask.js'
import './eject.js'

// Gracefully handle Ctrl+C / ESC in interactive prompts
process.on('uncaughtException', (err) => {
  if (err?.name === 'ExitPromptError' || err?.message?.includes('force closed the prompt')) {
    process.exit(0)
  }
  console.error(err)
  process.exit(1)
})

// ESC key exits interactive mode (unref so it doesn't prevent process exit)
if (process.stdin.isTTY) {
  import('readline').then(({ default: readline }) => {
    readline.emitKeypressEvents(process.stdin)
    process.stdin.on('keypress', (_, key) => {
      if (key && key.name === 'escape') process.exit(0)
    })
    process.stdin.unref()
  })
}

const args = process.argv
program.hook('preAction', (_thisCommand, actionCommand) => {
  maybeShowCompletionHint(actionCommand)
})
program.parse(args)
