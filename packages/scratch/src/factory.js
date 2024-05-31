'use strict'

import {
  deepClone,
  deepMerge,
  isDefined,
  isObject
} from '@domql/utils'
import * as CONF from './defaultConfig'

export const CSS_VARS = {}
export const CONFIG = {
  verbose: false,
  useVariable: true,
  useReset: true,
  CSS_VARS,
  ...CONF
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
