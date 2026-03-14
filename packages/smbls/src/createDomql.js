'use strict'

import DOM from 'domql'
import * as uikit from '@symbo.ls/uikit'
import { CSS_PROPS_REGISTRY } from 'css-in-props'

import { isString, isNode, isObject } from '@domql/utils'
import { initAnimationFrame } from '@domql/element'
import { defaultDefine } from './define.js'
import { initRouter } from './router.js'
import {
  initializeExtend,
  initializeNotifications,
  initializeSync
} from './syncExtend.js'

import {
  prepareComponents,
  prepareDependencies,
  prepareDesignSystem,
  prepareWindow,
  prepareRequire,
  preparePages,
  prepareState,
  prepareUtils,
  prepareMethods,
  prepareSharedLibs,
  PACKAGE_MANAGER_TO_CDN
} from './prepare.js'

import { polyglotPlugin } from '@symbo.ls/polyglot'
import { polyglotFunctions } from '@symbo.ls/polyglot/functions'
import { helmetPlugin } from '@symbo.ls/helmet'
import { fetchPlugin } from '@symbo.ls/fetch'

export const prepareContext = async (app, context = {}) => {
  const key = (context.key = context.key || (isString(app) ? app : 'smblsapp'))
  context.define = context.define || defaultDefine
  context.cssPropsRegistry = CSS_PROPS_REGISTRY
  context.window = prepareWindow(context)

  if (context.sharedLibraries && context.sharedLibraries.length) {
    prepareSharedLibs(context)
  }

  const [scratcDesignSystem, emotion, registry] = prepareDesignSystem(
    key,
    context
  )
  context.designSystem = scratcDesignSystem
  context.registry = registry
  context.emotion = emotion
  const state = prepareState(app, context)
  context.state = state
  context.pages = preparePages(app, context)
  context.components = prepareComponents(context)
  context.utils = prepareUtils(context)
  if (PACKAGE_MANAGER_TO_CDN[context.packageManager]) {
    context.dependencies = await prepareDependencies(context)
  }
  context.methods = prepareMethods(context)
  context.routerOptions = initRouter(app, context)
  context.defaultExtends = [uikit.Box]
  context.snippets = context.snippets || {}
  context.functions = context.functions || {}
  context.plugins = context.plugins || []

  // Auto-register plugins based on context config
  const hasPlugin = (name) => context.plugins.some(p => p.name === name)

  if (context.polyglot && !hasPlugin('polyglot')) {
    context.plugins.push(polyglotPlugin)
    for (const k in polyglotFunctions) {
      if (!(k in context.functions)) context.functions[k] = polyglotFunctions[k]
    }
  }

  if (!hasPlugin('helmet')) {
    context.plugins.push(helmetPlugin)
  }

  if (context.fetch && !hasPlugin('fetch')) {
    context.plugins.push(fetchPlugin)
  }

  return context
}

export const createDomqlElement = async (app, ctx) => {
  if (!isObject(ctx)) ctx = {}
  if (isNode(app)) {
    app = {}
    ctx.parent = app
  } else if (isString(app)) {
    app = {}
    ctx.key = app
  } else if (!isObject(app)) {
    app = {}
  }

  await prepareContext(app, ctx)

  app.extends = initializeExtend(app, ctx)
  app.routes = ctx.pages
  app.state = ctx.state
  app.context = ctx
  app.data = app.data || {}
  app.data.frameListeners = initAnimationFrame(ctx)

  await prepareRequire(
    {
      functions: ctx.functions,
      utils: ctx.utils,
      snippets: ctx.snippets,
      ...ctx.files
    },
    ctx
  )

  initializeSync(app, ctx)
  // initializeInspect(app, ctx)
  initializeNotifications(app, ctx)

  const doc = ctx.document
  if (!doc || !doc.createElement) return app

  const parentNode = ctx.parent || doc.body
  const domqlCreate = (DOM.default && DOM.default.create) || DOM.create
  const smblsApp = await domqlCreate(app, parentNode, ctx.key, {
    verbose: ctx.verbose,
    ...ctx.domqlOptions
  })

  return smblsApp
}
