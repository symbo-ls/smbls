#!/usr/bin/env node

import 'v8-compile-cache'

import { program } from './program.js'
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
import './push.js'
import './link-packages.js'
import './collab.js'
import './servers.js'
import './files.js'

const args = process.argv
program.parse(args)
