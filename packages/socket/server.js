#!/usr/bin/env node

import fs from 'fs'
import chalk from 'chalk'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { createRequire } from 'module'
import * as utils from '@domql/utils'
const { overwriteDeep } = (utils.default || utils)

const require = createRequire(import.meta.url) // construct the require method
const DES_SYS_DEFAULT_FILE = require('@symbo.ls/init/dynamic.json') // Bring in the ability to create the 'require' method

const app = express()
let io

const debugMsg = chalk.dim('Use --verbose to debug the error or open the issue at https://github.com/symbo-ls/smbls')

export const updateDynamycFile = (changes, options = {}) => {
  const { verbose, prettify, verboseCode } = options
  const file = require('@symbo.ls/init/dynamic.json')

  const newMerge = overwriteDeep(file, changes)
  const mergeStr = JSON.stringify(newMerge, null, 2)
  const initPath = process.cwd() + '/node_modules/@symbo.ls/init/dynamic.json'

  console.log(chalk.dim('\n----------------\n'))

  console.log(chalk.dim('Received update:'))
  console.log(Object.keys(changes).join(', '))
  if (verboseCode) console.log(chalk.dim(JSON.stringify(changes, null, prettify ?? 2)))

  try {
    fs.writeFileSync(initPath, mergeStr)
    if (verbose) {
      console.log(chalk.bold.green('\nChanges wrote to the file'))
    }
  } catch (e) {
    console.log('')
    console.log(chalk.bold.red('Error writing file'))
    if (verbose) console.error(e)
    else console.log(debugMsg)
  }
}

export const sync = (desSysFile = DES_SYS_DEFAULT_FILE, options = {}) => {
  const server = http.createServer(app)
  const { key } = options

  io = new Server(server, {
    transports: ['websocket', 'polling', 'flashsocket'],
    cors: {
      origin: '*'
    }
  })

  app.get('/', (req, res) => {
    res.end('open')
  })

  io.on('connection', (socket) => {
    socket.join(key)
    let source

    socket.on('initConnect', (options) => {
      const { clientsCount } = io.engine
      socket.to(key).emit('clientsCount', clientsCount)
      source = options.source
      console.log('Connected', key, source)
      console.log('from', options.location)
    })

    socket.on('components', (data, options) => {
      io.to(key).emit('change', data, options)
    })

    socket.on('route', (data, options) => {
      io.to(key).emit('route', data, options)
    })

    socket.on('change', updateDynamycFile)

    socket.on('disconnect', (changes, options) => {
      const { clientsCount } = io.engine
      socket.to(key).emit('clientsCount', clientsCount)
      console.log('Disconnected', key, source)
    })
  })

  server.listen(13336, () => {
    console.log('listening on *:13336')
  })
}
