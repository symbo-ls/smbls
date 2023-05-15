'use strict'

import * as utils from '@domql/utils'
import * as globals from '@domql/globals'

const { overwriteDeep, deepDestringify, isObject } = utils
const { window } = globals

const IS_DEVELOPMENT = window && window.location ? window.location.host.includes('dev') : process.env.NODE_ENV === 'development'

const SERVER_URL = IS_DEVELOPMENT
  ? 'localhost:13335'
  : 'https://api.symbols.dev'

const defaultOptions = {
  endpoint: SERVER_URL
}

export const fetch = globalThis.fetch

export const fetchRemote = async (key, options = defaultOptions) => {
  const baseUrl = options.endpoint
    ? options.endpoint.includes('http')
      ? options.endpoint
      : `https://${options.endpoint}/`
    : SERVER_URL
  const route = options.serviceRoute
    ? utils.isArray(options.serviceRoute)
      ? options.serviceRoute.join(',')
      : options.serviceRoute
    : ''

  let response
  try {
    response = await fetch(baseUrl + route, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'X-AppKey': key }
    })
  } catch (e) {
    console.error(e)
  }

  return await response.json()
}

export const fetchProject = async (key, options) => {
  const { editor } = options

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor)
    const evalData = IS_DEVELOPMENT
      ? deepDestringify(data)
      : deepDestringify(data.releases[0])

    if (editor.serviceRoute) {
      overwriteDeep(evalData, options[editor.serviceRoute])
    } else {
      const obj = { ...evalData, designSystem: evalData.designsystem }
      delete obj.designsystem
      overwriteDeep(obj, options)
    }
  }

  return options
}

export const fetchStateAsync = async (key, options, callback) => {
  const { editor } = options

  if (editor && editor.remote) {
    const data = await fetchRemote(key, editor)
    const evalData = IS_DEVELOPMENT
      ? deepDestringify(data)
      : deepDestringify(data.releases[0])
    const state = editor.serviceRoute === 'state' ? evalData.state : evalData
    if (isObject(state)) callback(state)
  }
}
