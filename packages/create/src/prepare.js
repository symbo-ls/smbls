'use strict'

import {
  isObject,
  deepMerge,
  deepClone,
  merge,
  checkIfKeyIsComponent,
  isDevelopment,
  overwriteShallow
} from '@domql/utils'
import { initEmotion } from './initEmotion.js'

import * as uikit from '@symbo.ls/uikit'
import * as utils from './utilImports.js'
import * as routerUtils from '@domql/router'

// @preserve-env

export const prepareWindow = (context) => {
  if (typeof window === 'undefined') window = globalThis || {} // eslint-disable-line
  if (typeof document === 'undefined') {
    if (!window.document) window.document = globalThis.document || { body: {} }
    document = window.document // eslint-disable-line
  }
  context.document = context.document || document
  context.window = context.window || window
  return context.window
}

function onlyDotsAndNumbers(str) {
  return /^[0-9.]+$/.test(str) && str !== ''
}

const CDN_PROVIDERS = {
  skypack: {
    url: 'https://cdn.skypack.dev',
    formatUrl: (pkg, version) =>
      `${CDN_PROVIDERS.skypack.url}/${pkg}${version !== 'latest' ? `@${version}` : ''}`
  },
  symbols: {
    url: 'https://pkg.symbo.ls',
    formatUrl: (pkg, version) => {
      if (pkg.split('/').length > 2 || !onlyDotsAndNumbers(version)) {
        return `${CDN_PROVIDERS.symbols.url}/${pkg}`
      }
      return `${CDN_PROVIDERS.symbols.url}/${pkg}/${version}.js`
    }
  }
}

export const getCDNUrl = (
  packageName,
  version = 'latest',
  provider = 'skypack'
) => {
  const cdnConfig = CDN_PROVIDERS[provider] || CDN_PROVIDERS.skypack
  return cdnConfig.formatUrl(packageName, version)
}

const UIkitWithPrefix = (prefix = 'smbls') => {
  const newObj = {}
  for (const key in uikit) {
    if (Object.prototype.hasOwnProperty.call(uikit, key)) {
      if (checkIfKeyIsComponent(key)) {
        newObj[`${prefix}.${key}`] = uikit[key]
      } else {
        newObj[key] = uikit[key]
      }
    }
  }
  return newObj
}

export const prepareComponents = (context) => {
  return context.components
    ? { ...UIkitWithPrefix(), ...context.components }
    : UIkitWithPrefix()
}

export const prepareUtils = (context) => {
  return {
    ...utils,
    ...routerUtils,
    ...utils.scratchUtils,
    ...context.utils,
    ...context.snippets,
    ...context.functions
  }
}

export const prepareMethods = (context) => {
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
  preventCaching = false,
  cdnProvider = 'skypack'
}) => {
  if (!dependencies || Object.keys(dependencies).length === 0) {
    return null
  }

  for (const [dependency, version] of Object.entries(dependencies)) {
    if (dependenciesOnDemand && dependenciesOnDemand[dependency]) {
      continue
    }

    const random = isDevelopment() && preventCaching ? `?${Math.random()}` : ''
    const url = getCDNUrl(dependency, version, cdnProvider) + random

    try {
      if (cachedDeps[dependency]) return
      cachedDeps[dependency] = true
      await utils.loadRemoteScript(url, { document, type: 'module' })
    } catch (e) {
      console.error(`Failed to load ${dependency} from ${cdnProvider}:`, e)

      if (cdnProvider !== 'symbols') {
        try {
          const fallbackUrl = getCDNUrl(dependency, version, 'symbols') + random
          await utils.loadRemoteScript(fallbackUrl, { document })
          console.log(
            `Successfully loaded ${dependency} from fallback (symbols.ls)`
          )
        } catch (fallbackError) {
          console.error(
            `Failed to load ${dependency} from fallback:`,
            fallbackError
          )
        }
      }
    }
  }

  return dependencies
}

export const prepareRequire = async (packages, ctx) => {
  const windowOpts = ctx.window || window
  const defaultProvider = ctx.cdnProvider || 'skypack'

  const initRequire = async (ctx) => async (key, provider) => {
    const windowOpts = ctx.window || window
    const pkg = windowOpts.packages[key]
    if (typeof pkg === 'function') return pkg()
    return pkg
  }

  const initRequireOnDemand =
    async (ctx) =>
    async (key, provider = defaultProvider) => {
      const { dependenciesOnDemand } = ctx
      const documentOpts = ctx.document || document
      const windowOpts = ctx.window || window
      if (!windowOpts.packages[key]) {
        const random = isDevelopment() ? `?${Math.random()}` : ''
        if (dependenciesOnDemand && dependenciesOnDemand[key]) {
          const version = dependenciesOnDemand[key]
          const url = getCDNUrl(key, version, provider) + random
          try {
            await ctx.utils.loadRemoteScript(url, {
              window: windowOpts,
              document: documentOpts
            })
          } catch (e) {
            console.error(`Failed to load ${key} from ${provider}:`, e)
            // Fallback to symbo if not already using it
            if (provider !== 'symbols') {
              const fallbackUrl = getCDNUrl(key, version, 'symbols') + random
              await ctx.utils.loadRemoteScript(fallbackUrl, {
                window: windowOpts,
                document: documentOpts
              })
            }
          }
        } else {
          const url = getCDNUrl(key, 'latest', provider) + random
          try {
            await ctx.utils.loadRemoteScript(url, {
              window: windowOpts,
              document: documentOpts
            })
          } catch (e) {
            console.error(`Failed to load ${key} from ${provider}:`, e)
            // Fallback to symbo if not already using it
            if (provider !== 'symbols') {
              const fallbackUrl = getCDNUrl(key, 'latest', 'symbols') + random
              await ctx.utils.loadRemoteScript(fallbackUrl, {
                window: windowOpts,
                document: documentOpts
              })
            }
          }
          windowOpts.packages[key] = 'loadedOnDeman'
        }
      }
      return await windowOpts.require(key, provider)
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
    .filter((v) => !v.startsWith('/'))
    .reduce((pages, v) => {
      const index = v === 'index' ? '' : v
      pages['/' + index] = pages[v]
      delete pages[v]
      return pages
    }, pages)
}

export const prepareSharedLibs = (context) => {
  const sharedLibraries = context.sharedLibraries
  for (let i = 0; i < sharedLibraries.length; i++) {
    const sharedLib = sharedLibraries[i]
    if (context.type === 'template') {
      overwriteShallow(context.designSystem, sharedLib.designSystem)
      deepMerge(context, sharedLib, ['designSystem'], 1)
    } else {
      deepMerge(context, sharedLib, [], 1)
    }
  }
}
