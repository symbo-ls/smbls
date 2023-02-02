'use strict'

import { isFunction, isArray } from '@domql/utils'
import io from 'socket.io-client'

const ENV = process.env.NODE_ENV

const SOCKET_BACKEND_URL = window.location
  .host.includes('local')
  ? 'localhost:13335'
  : 'https://socket.symbols.app'

let socket
const defautlOpts = {}

export const connect = (key, options = {}) => {
  const socketUrls = isArray(options.socketUrl) 
    ? options.socketUrl : [options.socketUrl || SOCKET_BACKEND_URL]
  const primaryUrl = socketUrls[0]
  const secondaryUrl = socketUrls[1] || 'socket.symbols.app'

  socket = io(primaryUrl || SOCKET_BACKEND_URL)

  socket.on('connect', () => {
    if (ENV === 'test' || ENV === 'development') {
      console.log(
        `Connected to %c${primaryUrl || SOCKET_BACKEND_URL} %c${key} %c${socket.id}`,
        'font-weight: bold; color: green;',
        'font-weight: bold;',
        ''
      )
    }

    socket.emit('initConnect', options)

    try {
      if (isFunction(options.onConnect)) options.onConnect(socket.id, socket)
    } catch (e) {
      console.error(e)
    }
  })

  let tryConnect = 0
  const tryConnectMax = 1
  socket.on('connect_error', (err) => {
    console.log(`event: connect_error | reason: ${err.message}`)
    try {
      if (isFunction(options.onError)) options.onError(err, socket)
      if (tryConnect === tryConnectMax) {
        socket.disconnect()

        if (ENV === 'test' || ENV === 'development') {
          console.log(
            'Could not connect to %c' + primaryUrl + '%c, reconnecting to %c' + secondaryUrl,
            'font-weight: bold; color: red;',
            '',
            'font-weight: bold; color: green;'
          )
        }

        connect(key, { ...options, socketUrl: secondaryUrl })
      }
    } catch (e) {
      console.error(e)
    }
    tryConnect++
  })

  socket.on('disconnect', (reason) => {
    console.log(`event: disconnect | reason: ${reason}`)
    try {
      if (isFunction(options.onDisconnect)) options.onDisconnect(reason, socket)
    } catch (e) {
      console.error(e)
    }
  })

  socket.onAny((event, ...args) => {
    if (event === 'connect') return

    try {
      if (isFunction(options.onChange)) options.onChange(event, args[0], socket)
    } catch (e) {
      console.error(e)
    }
  })
}

export const send = (event = 'change', changes, options) => {
  socket.emit(event, changes, { ...options, ...defautlOpts })
}

export const disconnect = () => {
  socket.disconnect()
}
