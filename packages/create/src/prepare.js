'use strict'

import {
  isObject,
  deepMerge,
  deepCloneWithExtend,
  merge,
  checkIfKeyIsComponent
} from '@domql/utils'
import { initEmotion } from './initEmotion'

import * as uikit from '@symbo.ls/uikit'
import * as utils from './utilImports'

const ENV = process.env.NODE_ENV

export const prepareWindow = (context) => {
  if (typeof (window) === 'undefined') window = globalThis || {} // eslint-disable-line
  if (typeof (document) === 'undefined') {
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
  return context.components ? { ...UIkitWithPrefix(), ...context.components } : UIkitWithPrefix()
}

export const prepareUtils = context => {
  return { ...utils, ...utils.scratchUtils, ...(context.snippets || context.utils || context.functions || {}) }
}

export const prepareMethods = (context) => {
  return {
    ...(context.methods || {}),
    require: context.utils.require,
    requireOnDemand: context.utils.requireOnDemand,
    call: function (fnKey, ...args) {
      return (context.utils[fnKey] || context.methods[fnKey]).call(this, ...args)
    }
  }
}

const cachedDeps = {}
export const prepareDependencies = ({
  packages: dependencies,
  dependenciesOnDemand,
  document
}) => {
  if (!dependencies || Object.keys(dependencies).length === 0) {
    return null
  }

  for (const [dependency, version] of Object.entries(dependencies)) {
    if (version === 'loading' || version === 'error') {
      continue
    }

    const random = ENV === 'development' ? `?${Math.random()}` : ''
    let url = `https://pkg.symbo.ls/${dependency}/${version}.js${random}`

    if (dependency.split('/').length > 2 || !onlyDotsAndNumbers(version)) {
      url = `https://pkg.symbo.ls/${dependency}${random}`
    }

    if (dependenciesOnDemand && dependenciesOnDemand[dependency]) continue

    try {
      if (cachedDeps[dependency]) return
      cachedDeps[dependency] = true
      utils.loadJavascriptFileEmbedSync(url, document)
    } catch (e) {
      console.error(`Failed to load ${dependency}:`, e)
    }
  }

  return dependencies
}

export const prepareRequire = (packages, ctx) => {
  const windowOpts = ctx.window || window

  const initRequire = ctx => key => {
    const windowOpts = ctx.window || window
    const pkg = windowOpts.packages[key]
    if (typeof pkg === 'function') return pkg()
    return pkg
  }

  const initRequireOnDemand = ctx => key => {
    const { dependenciesOnDemand } = ctx
    const documentOpts = ctx.document || document
    const windowOpts = ctx.window || window
    if (!windowOpts.packages[key]) {
      const random = ENV === 'development' ? `?${Math.random()}` : ''
      if (dependenciesOnDemand && dependenciesOnDemand[key]) {
        const version = dependenciesOnDemand[key]
        const url = `https://pkg.symbo.ls/${key}/${version}.js${random}`
        ctx.utils.loadJavascriptFileEmbedSync(url, documentOpts)
      } else {
        const url = `https://pkg.symbo.ls/${key}${random}`
        ctx.utils.loadJavascriptFileEmbedSync(url, documentOpts, d => {
          windowOpts.packages[key] = 'loadedOnDeman'
          console.log(d)
        })
      }
    }
    return windowOpts.require(key)
  }

  if (windowOpts.packages) {
    windowOpts.packages = merge(windowOpts.packages, packages)
  } else {
    windowOpts.packages = packages
  }

  if (!windowOpts.require) {
    ctx.utils.require = initRequire(ctx)
    windowOpts.require = ctx.utils.require
  }

  if (!windowOpts.requireOnDemand) {
    ctx.utils.requireOnDemand = initRequireOnDemand(ctx)
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
  return deepCloneWithExtend(state)
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

export const initAnimationFrame = () => {
  const frameListeners = new Set()

  function requestFrame () {
    // Iterate over frameListeners
    for (const element of frameListeners) {
      if (!document.body.contains(element.node)) {
        frameListeners.delete(element) // Remove if node has no parent
      } else {
        try {
          (element.on.frame || element.props.onFrame)(element, element.state, element.context)
        } catch (e) {
          console.warn(e)
        }
      }
    }
    window.requestAnimationFrame(requestFrame)
  }

  requestFrame()

  return frameListeners
}
