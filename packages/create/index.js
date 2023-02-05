'use strict'

import DOM from 'domql'

import * as utils from '@symbo.ls/utils'
import * as domqlUtils from '@domql/utils'

import * as uikit from '@symbo.ls/uikit'
import { init, DYNAMIC_JSON } from '@symbo.ls/init' // eslint-disable-line no-unused-vars
import { fetchProject } from '@symbo.ls/fetch'
import { createEmotion } from '@symbo.ls/emotion'

import { defaultDefine } from './define'
import { merge } from '@domql/utils'

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
  initOptions: {
    emotion: createEmotion()
  },
  define: defaultDefine
}

export const create = async (App, options = defaultOptions) => {
  const appIsKey = domqlUtils.isString(App)
  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')

  console.group(key)
  console.log(options)

  if (appIsKey) App = {}
  if (key) await fetchProject(key, options)
  
  const emotion = createEmotion(key, options.document.head)
  const emotionDefine = initDOMQLEmotion(emotion, options)

  const define = { ...defaultDefine, ...emotionDefine }

  const domElem = DOM.create({
    routes: options.pages,
    state: options.state
  }, options.document.body, key, {
    extend: [uikit.Box],
    context: {
      key,
      components: { ...uikit, ...options.components },
      state: options.state || {},
      pages: options.pages || {},
      system: designSystem || {},
      utils: { ...utils, ...domqlUtils }
    },
    define,
    ...options.domqlOptions,
  })

  console.log(domElem)

  const designSystem = init(options.system || {}, null, {
    key,
    initDOMQLDefine: true,
    useReset: true,
    DOM: domElem,
    emotion,
    ...options.initOptions
  })
  
  domElem.set({ extend: App })

  console.groupEnd(key)
  return domElem
}

export default create
