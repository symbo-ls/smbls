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
import { appendIconsSVGSprite } from '@symbo.ls/scratch'

const { SYMBOLS_KEY } = process.env

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

  const initOptions = options.initOptions || {}
  const emotion = initOptions.emotion || defaultEmotion || createEmotion()
  const emotionDefine = options.registry || transformDOMQLEmotion(initOptions.emotion, options)

  const doc = options.parent || document

  const designSystem = init(options.system || {}, null, {
    key,
    emotion,
    verbose: options.verbose,
    document: doc,
    ...defaultOptions.system,
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
      router: options.router || router,
      emotion: emotion,
      document: doc
    }
  }, doc.body, key, {
    extend: [uikit.Box],
    verbose: options.verbose,
    ...options.domqlOptions
  })

  return domqlElement
}

export default create
