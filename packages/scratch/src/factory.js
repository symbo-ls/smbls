'use strict'

import {
  deepClone,
  deepMerge,
  isDefined,
  isObject
} from '@domql/utils'
import * as CONF from './defaultConfig'

export const CSS_VARS = {}

// Build CONFIG with lowercase keys as canonical
const _CONF = CONF
const _confLower = {}
for (const key in _CONF) {
  const lower = key.toLowerCase()
  _confLower[lower] = _CONF[key]
  // backward compat: keep UPPERCASE alias pointing to same object
  if (lower !== key) _confLower[key] = _CONF[key]
}

export const CONFIG = {
  verbose: false,
  useVariable: true,
  useReset: true,
  CSS_VARS,
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
