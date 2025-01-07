#!/usr/bin/env node

import 'v8-compile-cache'

import { program } from './program.js'
import './install.js'
import './init.js'
import './fetch.js'
import './sync.js'
import './clean.js'
import './convert.js'
import './create.js'
import './push.js'
import './link-packages.js'

const args = process.argv
program.parse(args)
