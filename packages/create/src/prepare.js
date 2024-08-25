'use strict'

import { isString, deepMerge, deepCloneWithExtend, merge } from '@domql/utils'
import { initEmotion } from './initEmotion'

import * as uikit from '@symbo.ls/uikit'
import * as utils from './utilImports'

const checkIfKeyIsComponent = (key) => {
  const isFirstKeyString = isString(key)
  if (!isFirstKeyString) return
  const firstCharKey = key.slice(0, 1)
  return /^[A-Z]*$/.test(firstCharKey)
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

export const prepareComponents = options => {
  return options.components ? { ...UIkitWithPrefix(), ...options.components } : UIkitWithPrefix()
}

export const prepareUtils = options => {
  return { ...utils, ...utils.scratchUtils, ...(options.snippets || options.utils || options.functions || {}) }
}

export const prepareDependencies = ({ dependencies, document }) => {
  if (!dependencies || Object.keys(dependencies).length === 0) {
    return null
  }

  const ENV = process.env.NODE_ENV

  for (const [dependency, version] of Object.entries(dependencies)) {
    if (version === 'loading' || version === 'error') {
      continue
    }

    const random = ENV === 'development' ? `?${Math.random()}` : ''
    const url = `https://pkg.symbo.ls/${dependency}/${version}.js${random}`

    try {
      utils.loadJavascriptFileSync(url, document)
    } catch (e) {
      console.error(`Failed to load ${dependency}:`, e)
    }
  }
  return dependencies
}

export const preparePackages = (packages, opts) => {
  const windowOpts = opts.window || window

  if (windowOpts.packages) {
    windowOpts.packages = merge(windowOpts.packages, packages)
  } else {
    windowOpts.packages = packages
  }

  if (!windowOpts.require) {
    windowOpts.require = key => {
      const pkg = windowOpts.packages[key]
      if (typeof pkg === 'function') return pkg()
      return pkg
    }
  }

  if (!windowOpts.requireOnDemand) {
    windowOpts.requireOnDemand = key => {
      const { dependenciesOnDemand, document } = opts
      if (!windowOpts.packages[key] && dependenciesOnDemand && dependenciesOnDemand[key]) {
        const version = dependenciesOnDemand[key]
        console.log(key, version)
        const url = `https://pkg.symbo.ls/${key}/${version}.js`
        utils.loadJavascriptFileSync(url, document)
        console.log('loaded', url)
        console.log(windowOpts.packages[key])
      }
      return windowOpts.require(key)
    }
  }
}

export const prepareDesignSystem = (options, key) => {
  const [scratcDesignhSystem, emotion, registry] = initEmotion(key, options)
  return [scratcDesignhSystem, emotion, registry]
}

export const prepareState = (options, App) => {
  const state = {}
  if (options.state) utils.deepMerge(state, options.state)
  if (App && App.state) deepMerge(state, App.state)
  return deepCloneWithExtend(state)
}

export const preparePages = options => {
  const pages = options.pages
  Object.keys(options.pages)
    .filter(v => !v.startsWith('/'))
    .forEach(v => {
      if (v === 'main') pages['/'] = options.pages.main
      else {
        pages['/' + v] = options.pages[v]
      }
    })
  options.pages = pages
  return pages
}

export const prepareDocument = options => {
  if (typeof (document) === 'undefined') {
    if (typeof (window) === 'undefined') window = {} // eslint-disable-line
    if (!window.document) window.document = { body: {} }
    document = window.document // eslint-disable-line
  }
  if (!options.window) options.window = window
  if (!options.document) options.document = document
  return options.parent || options.document || document
}
