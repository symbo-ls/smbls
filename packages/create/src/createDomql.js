'use strict'

import DOM from 'domql'
import { isString } from '@domql/utils'

import * as uikit from '@symbo.ls/uikit'

import { defaultDefine } from './define'
import { initRouter } from './router'
import { applySyncDebug } from './syncExtend'
import {
  prepareAnimationFrame,
  prepareComponents,
  prepareDependencies,
  prepareDesignSystem,
  prepareDocument,
  preparePackages,
  preparePages,
  prepareState,
  prepareUtils
} from './prepare'

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
  const dependencies = prepareDependencies(options)
  preparePackages({ functions: snippets, utils: snippets, snippets, ...options.files }, options)

  const frameListeners = prepareAnimationFrame(options)

  const define = options.define || defaultDefine

  const routerOptions = initRouter(App, options) // eslint-disable-line
  const extend = applySyncDebug([App], options)

  return ((DOM.default && DOM.default.create) || DOM.create)({
    extend,
    routes: options.pages,
    state,
    data: {
      frameListeners
    },
    context: {
      key,
      components,
      state,
      pages,
      designSystem,
      snippets,
      dependencies,
      functions: options.functions,
      files: options.files,
      utils: snippets,
      define,
      registry,
      emotion,
      routerOptions,
      socket: options.socket,
      editor: options.editor,
      window: options.window || window,
      document: doc
    }
  }, options.parent || doc.body, key, {
    extend: [uikit.Box],
    verbose: options.verbose,
    ...options.domqlOptions
  })
}
