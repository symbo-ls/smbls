'use strict'

import DOM from 'domql'
import { isString } from '@domql/utils'

import * as uikit from '@symbo.ls/uikit'

import { defaultDefine } from './define'
import { initRouter } from './router'
import { applySyncDebug } from './syncExtend'
import { prepareComponents, prepareDesignSystem, prepareDocument, preparePages, prepareState, prepareUtils } from './prepare'

const SYMBOLS_KEY = process.env.SYMBOLS_KEY

export const createDomqlElement = (App, options) => {
  const appIsKey = isString(App)

  const key = options.key || SYMBOLS_KEY || (appIsKey ? App : '')
  const [scratcDesignSystem, emotion, registry] = prepareDesignSystem(options, key)
  if (appIsKey) App = {}

  const doc = prepareDocument(options)
  const state = prepareState(options, App)
  const pages = preparePages(options)
  const components = prepareComponents(options)
  const designSystem = scratcDesignSystem
  const snippets = prepareUtils(options)

  const define = options.define || defaultDefine

  const routerOptions = initRouter(App, options) // eslint-disable-line
  const extend = applySyncDebug([App], options)
  return ((DOM.default && DOM.default.create) || DOM.create)({
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
      routerOptions,
      document: doc
    }
  }, doc.body, key, {
    extend: [uikit.Box],
    verbose: options.verbose,
    ...options.domqlOptions
  })
}
