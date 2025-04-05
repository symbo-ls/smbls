'use strict'

import { deepMerge, isObject, isUndefined } from '@domql/utils'

import * as utils from './utilImports.js'

import { popStateRouter } from './router.js'
import { fetchAsync, fetchSync } from './ferchOnCreate.js'

import DEFAULT_CREATE_OPTIONS from './options.js'
import DYNAMIC_JSON from '@symbo.ls/init/dynamic.json' with { type: 'json' }
import { createDomqlElement } from './createDomql.js'

const mergeWithLocalFile = (options, optionsExternalFile) =>
  deepMerge(
    options,
    isObject(optionsExternalFile) ? optionsExternalFile : DYNAMIC_JSON || {}
  )

export const create = (
  App,
  options = DEFAULT_CREATE_OPTIONS,
  optionsExternalFile
) => {
  const redefinedOptions = {
    ...DEFAULT_CREATE_OPTIONS,
    ...mergeWithLocalFile(options, optionsExternalFile)
  }

  const domqlApp = createDomqlElement(App, redefinedOptions)

  popStateRouter(domqlApp, redefinedOptions)

  if (redefinedOptions.on && redefinedOptions.on.create)
    redefinedOptions.on.create(
      domqlApp,
      domqlApp.state,
      domqlApp.context,
      redefinedOptions
    )

  return domqlApp
}

export const createAsync = (
  App,
  options = DEFAULT_CREATE_OPTIONS,
  optionsExternalFile
) => {
  const domqlApp = create(App, options, optionsExternalFile)

  const redefinedOptions = {
    ...DEFAULT_CREATE_OPTIONS,
    ...mergeWithLocalFile(options, optionsExternalFile)
  }
  // const SYMBOLS_KEY = process.env.SYMBOLS_KEY
  const key = redefinedOptions.key
  fetchAsync(domqlApp, key, { utils, ...redefinedOptions })

  return domqlApp
}

export const createSync = async (
  App,
  options = DEFAULT_CREATE_OPTIONS,
  optionsExternalFile
) => {
  const redefinedOptions = {
    ...DEFAULT_CREATE_OPTIONS,
    ...mergeWithLocalFile(options, optionsExternalFile)
  }

  // const SYMBOLS_KEY = process.env.SYMBOLS_KEY
  const key = options.key
  await fetchSync(key, redefinedOptions)

  const domqlApp = await createDomqlElement(App, redefinedOptions)
  if (redefinedOptions.on && redefinedOptions.on.create)
    await redefinedOptions.on.create(
      domqlApp,
      domqlApp.state,
      domqlApp.context,
      redefinedOptions
    )

  return domqlApp
}

export const createSkeleton = (
  App = {},
  options = DEFAULT_CREATE_OPTIONS,
  optionsExternalFile
) => {
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
