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
import './github.js'
import './validate.js'
import './validate-domql.js'

const args = process.argv
program.hook('preAction', (_thisCommand, actionCommand) => {
  maybeShowCompletionHint(actionCommand)
})
program.parse(args)
