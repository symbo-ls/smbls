'use strict'

import { deepMerge, isObject } from '@domql/utils'

import * as utils from './utilImports'

import { popStateRouter } from './router'
import { fetchAsync, fetchSync } from './ferchOnCreate'
import { applyInspectListener } from './syncExtend'

import DEFAULT_CREATE_OPTIONS from './options'
import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json'
import { createDomqlElement } from './createDomql'

const SYMBOLS_KEY = process.env.SYMBOLS_KEY

const mergeWithLocalFile = (options, optionsExternalFile) => {
  const rcfile = isObject(optionsExternalFile) ? optionsExternalFile : DYNAMIC_JSON || {}
  return deepMerge(options, rcfile)
}

export const create = (App, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  const redefinedOptions = { ...DEFAULT_CREATE_OPTIONS, ...mergeWithLocalFile(options, optionsExternalFile) }

  const domqlApp = createDomqlElement(App, redefinedOptions)

  applyInspectListener(domqlApp, redefinedOptions)
  popStateRouter(domqlApp, redefinedOptions)

  if (redefinedOptions.on && redefinedOptions.on.create) redefinedOptions.on.create(domqlApp, redefinedOptions)

  return domqlApp
}

export const createAsync = (App, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  const redefinedOptions = { ...DEFAULT_CREATE_OPTIONS, ...mergeWithLocalFile(options, optionsExternalFile) }

  const domqlApp = createDomqlElement(App, redefinedOptions)

  applyInspectListener(domqlApp, redefinedOptions)
  popStateRouter(domqlApp, redefinedOptions)
  if (redefinedOptions.on && redefinedOptions.on.create) redefinedOptions.on.create(domqlApp, redefinedOptions)

  const key = options.key || SYMBOLS_KEY
  fetchAsync(domqlApp, key, { utils, ...redefinedOptions })

  return domqlApp
}

export const createSync = async (App, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  const redefinedOptions = { ...DEFAULT_CREATE_OPTIONS, ...mergeWithLocalFile(options, optionsExternalFile) }

  const key = options.key || SYMBOLS_KEY
  await fetchSync(key, redefinedOptions)

  const domqlApp = createDomqlElement(App, redefinedOptions)
  if (redefinedOptions.on && redefinedOptions.on.create) redefinedOptions.on.create(domqlApp, redefinedOptions)

  return domqlApp
}

export default create
