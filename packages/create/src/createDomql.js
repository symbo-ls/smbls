'use strict'

import DOM from 'domql'
import { isString } from '@domql/utils'

import * as uikit from '@symbo.ls/uikit'

import { defaultDefine } from './define'
import { initRouter } from './router'
import { applySyncDebug } from './syncExtend'
import { prepareComponents, prepareDesignSystem, prepareDocument, preparePackages, preparePages, prepareState, prepareUtils } from './prepare'

const SYMBOLS_KEY = process.env.SYMBOLS_KEY

export const createDomqlElement = (App, options) => {
  const key = options.key || SYMBOLS_KEY || (isString(App) ? App : '')
  const [scratcDesignSystem, emotion, registry] = prepareDesignSystem(options, key)
  if (isString(App)) App = {}

  const doc = prepareDocument(options)
  const state = prepareState(options, App)
  const pages = preparePages(options)
  const components = prepareComponents(options)
  const designSystem = scratcDesignSystem
  const snippets = prepareUtils(options)
  preparePackages({ functions: snippets, ...options.files })

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
      functions: options.functions,
      files: options.files,
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
