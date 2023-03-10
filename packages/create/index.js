'use strict'

import DOM from 'domql'
import { deepMerge, isObject, isString } from '@domql/utils'

import * as utils from './utilImports'
import * as uikit from '@symbo.ls/uikit'

import { defaultDefine } from './define'
import { initRouter, popStateRouter } from './router'
import { fetchAsync, fetchSync } from './ferchOnCreate'
import { initEmotion } from './initEmotion'
import { applyInspectListener, applySyncDebug } from './syncExtend'

import DEFAULT_CREATE_OPTIONS from './options'
import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json'

const SYMBOLS_KEY = process.env.SYMBOLS_KEY

const mergeWithLocalFile = (options, optionsExternalFile) => {
  const rcfile = isObject(optionsExternalFile) ? optionsExternalFile : DYNAMIC_JSON || {}
  return deepMerge(options, rcfile)
}

export const create = async (App, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  const appIsKey = isString(App)
  options = mergeWithLocalFile(options, optionsExternalFile)

  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')

  if (appIsKey) App = {}
  await fetchSync(key, options)

  const doc = options.parent || options.document || document
  const [scratchSystem, emotion, registry] = initEmotion(key, options)

  const router = initRouter(App, options)

  const state = options.state || {}
  const pages = options.pages || {}
  const components = options.components ? { ...uikit, ...options.components } : uikit
  const designSystem = scratchSystem || {}
  const snippets = { ...utils, ...(options.snippets || {}) }
  const define = options.define || defaultDefine

  const extend = applySyncDebug([App], options)

  const domqlApp = DOM.create({
    extend,
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

  applyInspectListener(domqlApp, options)
  popStateRouter(domqlApp, options)

  fetchAsync(domqlApp, key, options)

  return domqlApp
}

export default create
