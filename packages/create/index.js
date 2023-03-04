'use strict'

import DOM from 'domql'
import { transformDOMQLEmotion } from 'domql/packages/emotion'
import { router } from 'domql/packages/router'

import * as utils from '@symbo.ls/utils'
import * as domqlUtils from '@domql/utils'

import * as uikit from '@symbo.ls/uikit'
import { init } from '@symbo.ls/init'
import { fetchStateAsync, fetchProject } from '@symbo.ls/fetch'

import { emotion as defaultEmotion, createEmotion } from '@symbo.ls/emotion'
import { defaultDefine } from './define'

import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json'
import { deepMerge, isObject } from '@domql/utils'

const SYMBOLS_KEY = process.env.SYMBOLS_KEY

const defaultOptions = {
  editor: {
    endpoint: 'api.symbols.app'
  },
  state: {},
  pages: {},
  system: {
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
  define: defaultDefine
}

const mergeWithLocalFile = (options, RC_FILE) => {
  const rcfile = isObject(RC_FILE) ? RC_FILE : DYNAMIC_JSON || {}
  return deepMerge(options, rcfile)
}

export const create = async (App, options = defaultOptions, RC_FILE) => {
  const appIsKey = domqlUtils.isString(App)
  options = mergeWithLocalFile(options, RC_FILE)
  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')

  if (appIsKey) App = {}
  if (key && options.editor) {
    try {
      if (!options.async) await fetchProject(key, options)
    } catch (e) {
      console.error(e)
    }
  }

  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion || defaultEmotion || createEmotion()
  if (!initOptions.emotion) initOptions.emotion = emotion
  const emotionDefine = options.registry || transformDOMQLEmotion(initOptions.emotion, options)

  const doc = options.parent || document

  console.log(options)
  
  const designSystem = init(options.system || {}, {
    key,
    emotion,
    verbose: options.verbose,
    document: doc,
    ...defaultOptions.system,
    ...initOptions
  })

  console.log(designSystem)

  const domqlApp = DOM.create({
    extend: [App],
    routes: options.pages,
    state: options.state,
    context: {
      key,
      components: options.components ? { ...uikit, ...options.components } : uikit,
      state: options.state || {},
      pages: options.pages || {},
      system: designSystem || {},
      utils: { ...utils, ...domqlUtils },
      define: defaultDefine,
      registry: emotionDefine,
      router: options.router || router,
      emotion,
      document: doc
    }
  }, doc.body, key, {
    extend: [uikit.Box],
    verbose: options.verbose,
    ...options.domqlOptions
  })

  if (key && options.editor) {
    try {
      if (options.editor.async) fetchStateAsync(key, options, (data) => {
        domqlApp.state.update(data)
      })
    } catch (e) {
      console.error(e)
    }
  }

  return domqlApp
}

export default create
