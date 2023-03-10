#!/usr/bin/env node

import 'v8-compile-cache'

import { program } from './program.js'
import './init.js'
import './fetch.js'
import './sync.js'
import './clean.js'
import './convert.js'

const args = process.argv
program.parse(args)
