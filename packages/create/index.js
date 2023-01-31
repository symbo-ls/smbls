'use strict'

import DOM from 'domql'
import { isString, overwriteDeep } from '@domql/utils'

import * as smbls from '@symbo.ls/uikit'
import { init, DYNAMIC_JSON } from '@symbo.ls/init'
import { fetch } from '@symbo.ls/fetch'

import { define } from './define'

const { SYMBOLS_KEY } = process.env // eslint-disable-line no-unused-vars

const defaultOptions = {
  state: {},
  pages: {},
  system: {
    useReset: true,
    useVariable: true,
  },
  components: {},
  define
}

export const create = (App, options = defaultOptions) => {
  const { components, define } = options
  const designSystem = init(options.system)

  const appIsKey = isString(App)
  const key = options.key || SYMBOLS_KEY || (appIsKey && App)
  
  if (appIsKey) App = {}
  if (key) {
    if (options.remote) {
      const data = fetch(key)
      overwriteDeep(data, options)
    }
    else options = DYNAMIC_JSON
  }

  if (define) DOM.define(options.define)
  
  return DOM.create({
    extend: App,
    routes: options.pages,
    state: options.state,
  }, null, 'app', {
    extend: [smbls.Box],
    context: {
      components: { ...smbls, ...components },
      system: designSystem
    },
    // TODO: move define here,
  })
}

export default create
