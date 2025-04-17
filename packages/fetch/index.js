'use strict'

import * as utils from '@domql/utils'
const { window, overwriteDeep, deepDestringify } = utils

const IS_DEVELOPMENT =
  window && window.location
    ? window.location.host.includes('dev.')
    : utils.isDevelopment()

const SERVER_URL = IS_DEVELOPMENT
  ? 'http://localhost:8080/get'
  : 'https://api.symbols.app/get'

const defaultOptions = {
  endpoint: SERVER_URL
}

export const fetch = globalThis.fetch

export const fetchRemote = async (key, options = defaultOptions) => {
  const baseUrl = options.endpoint || SERVER_URL
  const route = options.serviceRoute
    ? utils.isArray(options.serviceRoute)
      ? options.serviceRoute.map(v => v.toLowerCase() + '=true').join('&')
      : options.serviceRoute
    : ''

  let response
  try {
    response = await fetch(baseUrl + '/' + '?' + route, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-AppKey': key,
        'X-Metadata': options.metadata
      }
    })

    return await response.json()
  } catch (e) {
    if (utils.isFunction(options.onError)) return options.onError(e)
    else console.error(e)
  }
}

export const fetchProject = async (key, options) => {
  const { editor } = options

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor)
    const evalData =
      IS_DEVELOPMENT || options.isDevelopment
        ? deepDestringify(data)
        : deepDestringify(data.releases[0])

    if (editor.serviceRoute) {
      if (utils.isArray(editor.serviceRoute)) {
        editor.serviceRoute.forEach(route => {
          overwriteDeep(options[route], evalData[route.toLowerCase()])
        })
      } else {
        overwriteDeep(options[editor.serviceRoute], evalData)
      }
    } else {
      ;[
        'state',
        'designSystem',
        'components',
        'snippets',
        'pages',
        'utils',
        'files',
        'packages',
        'functions'
      ].forEach(key => {
        overwriteDeep(options[key], evalData[key.toLowerCase()])
      })
    }
  }

  return options
}

export const fetchProjectAsync = async (key, options, callback) => {
  const { editor } = options

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor)
    const evalData =
      IS_DEVELOPMENT || options.isDevelopment
        ? deepDestringify(data)
        : deepDestringify(data.releases[0])
    callback(evalData)
  }
}
