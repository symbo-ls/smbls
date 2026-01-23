'use strict'

import DOM from 'domql'
import * as uikit from '@symbo.ls/uikit'

import { isString, isNode, isObject } from '@domql/utils'
import { initAnimationFrame } from '@domql/event'
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
  prepareMethods
} from './prepare.js'

import { temporaryDomqlHackReverse } from '@symbo.ls/utils'

export const prepareContext = async (app, context = {}) => {
  const key = (context.key = context.key || (isString(app) ? app : 'smblsapp'))
  context.define = context.define || defaultDefine
  context.window = prepareWindow(context)
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
  context.dependencies = await prepareDependencies(context)
  context.methods = prepareMethods(context)
  context.routerOptions = initRouter(app, context)
  context.defaultExtends = [uikit.Box]

  // Iterate over components and pages to run domql3hack
  if (context.forceDomql3) {
    for (const key in context.components) {
      if (!key.includes('smbls.') && context.components.hasOwnProperty(key)) {
        context.components[key] = temporaryDomqlHackReverse(
          context.components[key]
        )
      }
    }
    for (const key in context.pages) {
      if (context.pages.hasOwnProperty(key)) {
        context.pages[key] = temporaryDomqlHackReverse(context.pages[key])
      }
    }
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
  } else {
    // app = temporaryDomqlHackReverse(app)
  }

  await prepareContext(app, ctx)

  app.extend = initializeExtend(app, ctx)
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

  const parentNode = ctx.parent || ctx.document.body
  const domqlCreate = (DOM.default && DOM.default.create) || DOM.create
  const smblsApp = await domqlCreate(app, parentNode, ctx.key, {
    verbose: ctx.verbose,
    ...ctx.domqlOptions
  })

  return smblsApp
}
