'use strict'

import {
  isObject,
  deepMerge,
  deepClone,
  merge,
  checkIfKeyIsComponent,
  isDevelopment
} from '@domql/utils'
import { initEmotion } from './initEmotion.js'

import * as uikit from '@symbo.ls/uikit'
import * as utils from './utilImports.js'
import * as routerUtils from '@domql/router'

// @preserve-env

export const prepareWindow = context => {
  if (typeof window === 'undefined') window = globalThis || {} // eslint-disable-line
  if (typeof document === 'undefined') {
    if (!window.document) window.document = globalThis.document || { body: {} }
    document = window.document // eslint-disable-line
  }
  context.document = context.document || document
  return (context.window = context.window || window)
}

function onlyDotsAndNumbers (str) {
  return /^[0-9.]+$/.test(str) && str !== ''
}

export const UIkitWithPrefix = () => {
  const newObj = {}
  for (const key in uikit) {
    if (Object.prototype.hasOwnProperty.call(uikit, key)) {
      if (checkIfKeyIsComponent(key)) {
        newObj[`smbls.${key}`] = uikit[key]
      } else {
        newObj[key] = uikit[key]
      }
    }
  }
  return newObj
}

export const prepareComponents = context => {
  return context.components
    ? { ...UIkitWithPrefix(), ...context.components }
    : UIkitWithPrefix()
}

export const prepareUtils = context => {
  return {
    ...utils,
    ...routerUtils,
    ...utils.scratchUtils,
    ...context.utils,
    ...context.snippets,
    ...context.functions
  }
}

export const prepareMethods = context => {
  return {
    ...(context.methods || {}),
    require: context.utils.require,
    requireOnDemand: context.utils.requireOnDemand
  }
}

const cachedDeps = {}
export const prepareDependencies = async ({
  dependencies,
  dependenciesOnDemand,
  document,
  preventCaching = false
}) => {
  if (!dependencies || Object.keys(dependencies).length === 0) {
    return null
  }

  for (const [dependency, version] of Object.entries(dependencies)) {
    if (
      version === 'loading' ||
      version === 'error' ||
      (dependenciesOnDemand && dependenciesOnDemand[dependency])
    ) {
      continue
    }

    const random = isDevelopment() && preventCaching ? `?${Math.random()}` : ''
    let url = `https://pkg.symbo.ls/${dependency}/${version}.js${random}`

    if (dependency.split('/').length > 2 || !onlyDotsAndNumbers(version)) {
      url = `https://pkg.symbo.ls/${dependency}${random}`
    }

    try {
      if (cachedDeps[dependency]) return
      cachedDeps[dependency] = true
      await utils.loadRemoteScript(url, { document })
    } catch (e) {
      console.error(`Failed to load ${dependency}:`, e)
    }
  }

  return dependencies
}

export const prepareRequire = async (packages, ctx) => {
  const windowOpts = ctx.window || window

  const initRequire = ctx => async key => {
    const windowOpts = ctx.window || window
    const pkg = windowOpts.packages[key]
    if (typeof pkg === 'function') return await pkg()
    return pkg
  }

  const initRequireOnDemand = ctx => async key => {
    const { dependenciesOnDemand } = ctx
    const documentOpts = ctx.document || document
    const windowOpts = ctx.window || window
    if (!windowOpts.packages[key]) {
      const random = isDevelopment() ? `?${Math.random()}` : ''
      if (dependenciesOnDemand && dependenciesOnDemand[key]) {
        const version = dependenciesOnDemand[key]
        const url = `https://pkg.symbo.ls/${key}/${version}.js${random}`
        await ctx.utils.loadRemoteScript(url, {
          window: windowOpts,
          document: documentOpts
        })
      } else {
        const url = `https://pkg.symbo.ls/${key}${random}`
        await ctx.utils.loadRemoteScript(url, {
          window: windowOpts,
          document: documentOpts
        })
        windowOpts.packages[key] = 'loadedOnDeman'
      }
    }
    return await windowOpts.require(key)
  }

  if (windowOpts.packages) {
    windowOpts.packages = merge(windowOpts.packages, packages)
  } else {
    windowOpts.packages = packages
  }

  if (!windowOpts.require) {
    ctx.utils.require = await initRequire(ctx)
    windowOpts.require = ctx.utils.require
  }

  if (!windowOpts.requireOnDemand) {
    ctx.utils.requireOnDemand = await initRequireOnDemand(ctx)
    windowOpts.requireOnDemand = ctx.utils.requireOnDemand
  }
}

export const prepareDesignSystem = (key, context) => {
  const [scratcDesignhSystem, emotion, registry] = initEmotion(key, context)
  return [scratcDesignhSystem, emotion, registry]
}

export const prepareState = (app, context) => {
  const state = {}
  if (context.state) utils.deepMerge(state, context.state)
  if (app && app.state) deepMerge(state, app.state)
  return deepClone(state)
}

export const preparePages = (app, context) => {
  if (isObject(app.routes) && isObject(context.pages)) {
    merge(app.routes, context.pages)
  }
  const pages = app.routes || context.pages || {}
  return Object.keys(pages)
    .filter(v => !v.startsWith('/'))
    .reduce((pages, v) => {
      const index = v === 'index' ? '' : v
      pages['/' + index] = pages[v]
      delete pages[v]
      return pages
    }, pages)
}
