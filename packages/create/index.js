'use strict'

import DOM from 'domql'
import { transformDOMQLEmotion } from 'domql/packages/emotion'
import { router } from 'domql/packages/router'

import * as utils from '@symbo.ls/utils'
import * as domqlUtils from '@domql/utils'

import * as uikit from '@symbo.ls/uikit'
import { init } from '@symbo.ls/init'
import { fetchProject } from '@symbo.ls/fetch'

import { emotion as defaultEmotion, createEmotion } from '@symbo.ls/emotion'
import { defaultDefine } from './define'

const { SYMBOLS_KEY } = process.env

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
  initOptions: {
    emotion: defaultEmotion
  },
  define: defaultDefine
}

export const create = async (App, options = defaultOptions) => {
  const appIsKey = domqlUtils.isString(App)
  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')

  if (appIsKey) App = {}
  if (key && options.editor) {
    try {
      await fetchProject(key, options)
    } catch (e) {
      console.error(e)
    }
  }

  const emotion = defaultEmotion || createEmotion()
  const initOptions = options.initOptions || { emotion }
  const emotionDefine = options.registry || transformDOMQLEmotion(initOptions.emotion, options)

  const designSystem = init(options.system || {}, null, {
    key,
    verbose: options.verbose,
    useReset: true,
    useVariable: true,
    ...initOptions
  })

  const domqlElement = DOM.create({
    extend: [App],
    routes: options.pages,
    state: options.state,
    context: {
      key,
      components: { ...uikit, ...options.components },
      state: options.state || {},
      pages: options.pages || {},
      system: designSystem || {},
      utils: { ...utils, ...domqlUtils },
      define: defaultDefine,
      registry: emotionDefine,
      router: options.router || router
    }
  }, (options.parent || document).body, key, {
    extend: [uikit.Box],
    verbose: options.verbose,
    ...options.domqlOptions
  })

  return domqlElement
}

export default create
