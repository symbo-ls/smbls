'use strict'

import * as utils from '@domql/utils'
import io from 'socket.io-client'

const { window, isFunction, isArray } = utils.default || utils

const defautlOpts = {}

let CONNECT_ATTEPT = 0
const CONNECT_ATTEPT_MAX_ALLOWED = 1

const getIsDev = options => {
  return (
    options.development ||
    (window && window.location && window.location.host.includes('local')) ||
    utils.isNotProduction()
  )
}

const getSocketUrl = (options, isDev) => {
  const SOCKET_BACKEND_URL = isDev
    ? 'http://localhost:13336/'
    : 'https://socket.symbols.app/'

  const socketUrls = isArray(options.socketUrl)
    ? options.socketUrl
    : [options.socketUrl || SOCKET_BACKEND_URL]

  const primaryUrl = socketUrls[0]
  const secondaryUrl = socketUrls[1] || 'socket.symbols.app'

  return {
    primaryUrl: primaryUrl || SOCKET_BACKEND_URL,
    secondaryUrl
  }
}

export const connect = (key, options = {}) => {
  const isDev = getIsDev(options)

  const { primaryUrl, secondaryUrl } = getSocketUrl(options, isDev)
  const socket = io(primaryUrl || secondaryUrl, {
    // withCredentials: true
  })

  socket.on('connect', () => {
    if (isDev) {
      console.warn(
        `Connected to %c${primaryUrl} %c${key} %c${socket.id}`,
        'font-weight: bold; color: green;',
        'font-weight: bold;',
        ''
      )
    }

    socket.emit('initConnect', { key, ...options })

    try {
      if (isFunction(options.onConnect)) {
        options.onConnect(socket.id, socket)
      }
    } catch (e) {
      console.error(e)
    }
  })

  socket.on('connect_error', err => {
    console.log(`event: connect_error | reason: ${err.message}`)
    try {
      if (isFunction(options.onError)) options.onError(err, socket)

      if (CONNECT_ATTEPT < CONNECT_ATTEPT_MAX_ALLOWED) {
        CONNECT_ATTEPT++

        socket.disconnect()

        if (utils.isNotProduction()) {
          console.log(
            'Could not connect to %c' +
              primaryUrl +
              '%c, reconnecting to %c' +
              secondaryUrl,
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
  })

  socket.on('disconnect', reason => {
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
      if (isFunction(options.onChange)) {
        options.onChange(event, args[0], socket)
      }
    } catch (e) {
      console.error(e)
    }
  })

  return socket
}

export function send (event = 'change', changes, options) {
  this.emit(event, changes, { ...options, ...defautlOpts })
}

export function disconnect () {
  this.disconnect()
}
