'use strict'

import DOM from 'domql'
import { transformDOMQLEmotion } from '@domql/emotion'
import { router as defaultRouter } from '@domql/router'

import * as utils from './utilImports'

import * as uikit from '@symbo.ls/uikit'
import { init } from '@symbo.ls/init'

import { emotion as defaultEmotion, createEmotion } from '@symbo.ls/emotion'
import { defaultDefine } from './define'

import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json'

import { deepMerge, isObject, isString } from '@domql/utils'
import { initRouter } from './router'
import { fetchAsync, fetchSync } from './ferchOnCreate'

const SYMBOLS_KEY = process.env.SYMBOLS_KEY

const defaultOptions = {
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

export const create = async (App, options = defaultOptions, RC_FILE) => {
  const appIsKey = isString(App)
  options = mergeWithLocalFile(options, RC_FILE)
  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')

  if (appIsKey) App = {}
  await fetchSync(key, options)

  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion || defaultEmotion || createEmotion()
  if (!initOptions.emotion) initOptions.emotion = emotion
  const emotionDefine = options.registry || transformDOMQLEmotion(initOptions.emotion, options)

  const doc = options.parent || options.document || document

  const scratchSystem = init(options.designSystem || {}, {
    key,
    emotion,
    verbose: options.verbose,
    document: doc,
    ...defaultOptions.designSystem,
    ...initOptions
  })

  initRouter(App, options.routerOptions)

  const state = options.state || {}
  const pages =  options.pages || {}
  const components = options.components ? { ...uikit, ...options.components } : uikit
  const designSystem = scratchSystem || {}
  const snippets = { ...utils, ...(options.snippets || {})}
  const router = options.router || defaultRouter
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
      registry: emotionDefine,
      router,
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
