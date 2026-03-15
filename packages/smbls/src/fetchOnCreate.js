'use strict'

import { isArray, isFunction, isObject, window, isDevelopment, overwriteDeep, deepDestringifyFunctions } from '@domql/utils'

const IS_DEVELOPMENT =
  window && window.location
    ? window.location.host.includes('dev.')
    : isDevelopment()

const SERVER_URL = IS_DEVELOPMENT
  ? 'http://localhost:8080/get'
  : 'https://api.symbols.app/get'

const defaultOptions = {
  endpoint: SERVER_URL
}

const fetchRemote = async (key, options = defaultOptions) => {
  const baseUrl = options.endpoint || SERVER_URL
  const route = options.serviceRoute
    ? isArray(options.serviceRoute)
      ? options.serviceRoute.map((v) => v.toLowerCase() + '=true').join('&')
      : options.serviceRoute
    : ''

  let response
  try {
    response = await globalThis.fetch(baseUrl + '/' + '?' + route, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-AppKey': key,
        'X-Metadata': options.metadata
      }
    })

    return await response.json()
  } catch (e) {
    if (isFunction(options.onError)) return options.onError(e)
    else console.error(e)
  }
}

const fetchProject = async (key, options) => {
  const { editor } = options

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor)
    const evalData =
      IS_DEVELOPMENT || options.isDevelopment
        ? deepDestringifyFunctions(data)
        : deepDestringifyFunctions(data.releases[0])

    if (editor.serviceRoute) {
      if (isArray(editor.serviceRoute)) {
        editor.serviceRoute.forEach((route) => {
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
      ].forEach((key) => {
        overwriteDeep(options[key], evalData[key.toLowerCase()])
      })
    }
  }

  return options
}

const fetchProjectAsync = async (key, options, callback) => {
  const { editor } = options

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor)
    const evalData =
      IS_DEVELOPMENT || options.isDevelopment
        ? deepDestringifyFunctions(data)
        : deepDestringifyFunctions(data.releases[0])
    callback(evalData)
  }
}

export const fetchSync = async (key, options) => {
  if (key && options.editor) {
    try {
      if (!options.editor.async) await fetchProject(key, options)
    } catch (e) {
      console.error(e)
    }
  }
}

export const fetchAsync = (app, key, options, callback) => {
  if (key && options.editor) {
    try {
      if (options.editor.async) {
        fetchProjectAsync(key, options, callback || ((data) => {
          const designSystem = data.designSystem
          if (isObject(designSystem)) {
            options.utils.init(designSystem)
          }
          if (isObject(data.state)) {
            app.state.set(data.state)
          }
        }))
      }
    } catch (e) {
      console.error(e)
    }
  }
}
