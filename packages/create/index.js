'use strict'

import DOM from 'domql'
import { initDOMQLEmotion } from 'domql/packages/emotion'

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
  if (key) await fetchProject(key, options)

  const emotion = defaultEmotion || createEmotion()
  const initOptions = options.initOptions || { emotion }
  const emotionDefine = initDOMQLEmotion(initOptions.emotion, options)

  const designSystem = init(options.system || {}, null, {
    key,
    verbose: options.verbose,
    useReset: true,
    useVariable: true,
    ...initOptions
  })

  return DOM.create({
    extend: [App],
    routes: options.pages,
    state: options.state
  }, (options.parent || document).body, key, {
    extend: [uikit.Box],
    context: {
      key,
      components: { ...uikit, ...options.components },
      state: options.state || {},
      pages: options.pages || {},
      system: designSystem || {},
      utils: { ...utils, ...domqlUtils },
      define: defaultDefine,
      registry: emotionDefine
    },
    verbose: options.verbose,
    ...options.domqlOptions
  })
}

export default create
