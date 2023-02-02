'use strict'

import DOM from 'domql'

import { isString } from '@domql/utils'

import * as smbls from '@symbo.ls/uikit'
import { init, DYNAMIC_JSON } from '@symbo.ls/init' // eslint-disable-line no-unused-vars
import { fetchProject } from '@symbo.ls/fetch'

import { define } from './define'

const { SYMBOLS_KEY } = process.env // eslint-disable-line no-unused-vars

const defaultOptions = {
  editor: {
    endpoint: 'api.symbols.app'
  },
  state: {},
  pages: {},
  system: {
    useReset: true,
    useVariable: true
  },
  components: {},
  define
}

export const create = async (App, options = defaultOptions) => {
  const appIsKey = isString(App)
  const key = options.key || SYMBOLS_KEY || (appIsKey && App)

  if (appIsKey) App = {}
  if (key) await fetchProject(key, options)

  console.log(options)

  const designSystem = init(options.system || {})

  DOM.define(options.define || define)

  return DOM.create({
    extend: [App, {
      routes: options.pages,
      state: options.state
    }]
  }, null, 'app', {
    extend: [smbls.Box],
    context: {
      key,
      components: { ...smbls, ...options.components },
      state: options.state || {},
      pages: options.pages || {},
      system: designSystem || {}
    }
    // TODO: move define here,
  })
}

export default create
