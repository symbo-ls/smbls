'use strict'

import {
  deepClone,
  deepMerge,
  isDefined,
  isObject
} from '@domql/utils'
import * as CONF from './defaultConfig'

export const CSS_VARS = {}
export const CSS_MEDIA_VARS = {}

// Build CONFIG with lowercase/camelCase keys as canonical + UPPERCASE backward compat aliases
const _CONF = CONF
const _confLower = {}
const toCamel = (s) => s.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
const toUpper = (s) => s.replace(/([A-Z])/g, '_$1').toUpperCase()
for (const key in _CONF) {
  const lower = key.toLowerCase()
  _confLower[lower] = _CONF[key]
  // camelCase alias (e.g. font_family -> fontFamily, semantic_icons -> semanticIcons)
  const camel = toCamel(lower)
  if (camel !== lower) _confLower[camel] = _CONF[key]
  // keep original key if different from lower
  if (lower !== key) _confLower[key] = _CONF[key]
  // backward compat: add UPPERCASE alias (e.g. typography -> TYPOGRAPHY, fontFamily -> FONT_FAMILY)
  const upper = toUpper(key)
  if (upper !== key) _confLower[upper] = _CONF[key]
}

export const CONFIG = {
  verbose: false,
  useVariable: true,
  useReset: true,
  globalTheme: 'auto',
  CSS_VARS,
  CSS_MEDIA_VARS,
  ..._confLower
}

const cachedConfig = deepClone(CONFIG)

export const FACTORY = {
  active: '0',
  0: CONFIG
}

export const activateConfig = (def) => {
  if (isDefined(def)) { FACTORY.active = def }
  return FACTORY[def || FACTORY.active]
}

export const getActiveConfig = (def) => {
  return FACTORY[def || FACTORY.active] || CONFIG
}

export const setActiveConfig = (newConfig) => {
  if (!isObject(newConfig)) return
  FACTORY.active = '1'
  FACTORY['1'] = deepMerge(newConfig, deepClone(cachedConfig))
  return newConfig
}
