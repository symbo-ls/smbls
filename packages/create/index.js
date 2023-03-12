'use strict'

import DOM from 'domql'
import { deepMerge, isObject, isString } from '@domql/utils'

import * as utils from './utilImports'
import * as uikit from '@symbo.ls/uikit'

import { emotion as defaultEmotion } from '@symbo.ls/emotion'

import { defaultDefine } from './define'
import { initRouter } from './router'
import { fetchAsync, fetchSync } from './ferchOnCreate'
import { initEmotion } from './initEmotion'

import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json'
const SYMBOLS_KEY = process.env.SYMBOLS_KEY

export const DEFAULT_CREATE_OPTIONS = {
  editor: {
    endpoint: 'api.symbols.app'
  },
  state: {},
  pages: {},
  designSystem: {
    useReset: true,
    useVariable: true,
    useIconSprite: true,
    useSvgSprite: true,
    useFontImport: true
  },
  components: {},
  initOptions: {
    emotion: defaultEmotion
  },
  router: {
    initRouter: true,
    injectRouterInLinkComponent: true
  },
  define: defaultDefine
}

const mergeWithLocalFile = (options, RC_FILE) => {
  const rcfile = isObject(RC_FILE) ? RC_FILE : DYNAMIC_JSON || {}
  return deepMerge(options, rcfile)
}

export const create = async (App, options = DEFAULT_CREATE_OPTIONS, RC_FILE) => {
  const appIsKey = isString(App)
  options = mergeWithLocalFile(options, RC_FILE)
  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')

  if (appIsKey) App = {}
  await fetchSync(key, options)

  const doc = options.parent || options.document || document

  const [scratchSystem, emotion, registry] = initEmotion(key, options)

  initRouter(App, options.routerOptions)

  const state = options.state || {}
  const pages =  options.pages || {}
  const components = options.components ? { ...uikit, ...options.components } : uikit
  const designSystem = scratchSystem || {}
  const snippets = { ...utils, ...(options.snippets || {})}
  const define = options.define || defaultDefine

  const domqlApp = DOM.create({
    extend: [App],
    routes: options.pages,
    state,
    context: {
      key,
      components,
      state,
      pages,
      designSystem,
      snippets,
      utils: snippets,
      define,
      registry,
      emotion,
      document: doc
    }
  }, doc.body, key, {
    extend: [uikit.Box],
    verbose: options.verbose,
    ...options.domqlOptions
  })

  fetchAsync(domqlApp)

  return domqlApp
}

export default create
