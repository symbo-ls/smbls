'use strict'

import { deepMerge, isObject, isUndefined } from '@domql/utils'

import * as utils from './utilImports'

import { popStateRouter } from './router'
import { fetchAsync, fetchSync } from './ferchOnCreate'
import { applyInspectListener } from './syncExtend'

import DEFAULT_CREATE_OPTIONS from './options'
import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json'
import { createDomqlElement } from './createDomql'

const SYMBOLS_KEY = process?.env.SYMBOLS_KEY

const mergeWithLocalFile = (options, optionsExternalFile) => deepMerge(
  options,
  isObject(optionsExternalFile) ? optionsExternalFile : DYNAMIC_JSON || {}
)

export const create = (App, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  const redefinedOptions = { ...DEFAULT_CREATE_OPTIONS, ...mergeWithLocalFile(options, optionsExternalFile) }

  const domqlApp = createDomqlElement(App, redefinedOptions)

  applyInspectListener(domqlApp, redefinedOptions)
  popStateRouter(domqlApp, redefinedOptions)

  if (redefinedOptions.on && redefinedOptions.on.create) redefinedOptions.on.create(domqlApp, redefinedOptions)

  return domqlApp
}

export const createAsync = (App, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  const domqlApp = create(App, options, optionsExternalFile)

  const redefinedOptions = { ...DEFAULT_CREATE_OPTIONS, ...mergeWithLocalFile(options, optionsExternalFile) }
  const key = redefinedOptions.key || SYMBOLS_KEY
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

export const createSkeleton = (App = {}, options = DEFAULT_CREATE_OPTIONS, optionsExternalFile) => {
  return create(
    {
      deps: { isUndefined },
      ...App
    },
    deepMerge({ domqlOptions: { onlyResolveExtends: true } }, options),
    optionsExternalFile
  )
}

export default create
