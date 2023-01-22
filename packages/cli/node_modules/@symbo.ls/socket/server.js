#!/usr/bin/env node

import fs from 'fs'
import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import { dirname } from 'path' // eslint-disable-line
import mergeDeep from 'merge-deep' // use the require method

import { createRequire } from 'module'

const require = createRequire(import.meta.url) // construct the require method
const DES_SYS_DEFAULT_FILE = require('@symbo.ls/init/dynamic.json') // Bring in the ability to create the 'require' method

const app = express()

export const sync = (desSysFile = DES_SYS_DEFAULT_FILE, options = {}) => {
  const server = http.createServer(app)
  const { key, live } = options

  const io = new Server(server, {
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

    socket.on('change', (changes, options) => {
      const file = require('@symbo.ls/init/src/dynamic.json')
      const newMerge = mergeDeep(file, changes)
      const mergeStr = JSON.stringify(newMerge, null, 2)
      const initPath = process.cwd() + '/node_modules/@symbo.ls/init/src/dynamic.json'

      if (live) {
        io.to(key).emit('liveChange', mergeStr)
      } else {
        fs.writeFile(initPath, mergeStr, function (err) {
          if (err) { return console.log(err) }
        })
      }
    })

    socket.on('disconnect', (changes, options) => {
      const { clientsCount } = io.engine
      socket.to(key).emit('clientsCount', clientsCount)
      console.log('Disconnected', key, source)
    })
  })

  server.listen(13335, () => {
    console.log('listening on *:13335')
  })
}
