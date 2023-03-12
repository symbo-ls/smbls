'use strict'

import * as utils from '@domql/utils'
import * as globals from '@domql/globals'

const { overwriteDeep, deepDestringify, isObject } = utils
const { window } = globals

const SERVER_URL = window && window.location &&
  window.location.host.includes('local')
  ? 'localhost:13335'
  : 'https://api.symbols.dev' ||
  'https://api.symbols.dev'

const defaultOptions = {
  endpoint: SERVER_URL
}

export const fetch = window ? window.fetch : fetch

export const fetchRemote = async (key, options = defaultOptions) => {
  const baseUrl = `https://${options.endpoint || SERVER_URL}/`
  const route = options.serviceRoute || ''

  let response
  try {
    response = await window.fetch(baseUrl + route, {
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
    const evalData = deepDestringify(data)

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
    const state = editor.serviceRoute === 'state' ? data : data.state
    console.log(editor)
    console.log(state)
    if (isObject(state)) callback(state)
  }
}
