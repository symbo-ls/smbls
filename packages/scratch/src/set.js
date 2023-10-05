'use strict'

import { FACTORY, getActiveConfig, setActiveConfig } from './factory.js' // eslint-disable-line no-unused-vars
import {
  setColor,
  setGradient,
  setFont,
  setFontFamily,
  setTheme,
  setIcon,
  setSVG,
  applyTypographySequence,
  applySpacingSequence,
  applyReset,
  applyTimingSequence,
  applyDocument
} from './system'

import { isFunction } from '@domql/utils'

const setCases = (val, key) => {
  if (isFunction(val)) return val()
  return val
}

const setSameValue = (val, key) => val

export const VALUE_TRANSFORMERS = {
  color: setColor,
  gradient: setGradient,
  font: setFont,
  font_family: setFontFamily,
  theme: setTheme,
  icons: setIcon,
  svg: setSVG,
  svg_data: setSameValue,
  typography: setSameValue,
  cases: setCases,
  spacing: setSameValue,
  media: setSameValue,
  timing: setSameValue,
  reset: setSameValue,
  unit: setSameValue,
  animation: setSameValue
}

/**
 *
 * @param {Object} FACTORY_NAME Defines which factory it goes to
 * @param {*} value Value of the property
 * @param {String} key Key, or the name of the property
 * @returns {Object} Factory
 */
export const setValue = (FACTORY_NAME, value, key) => {
  const CONFIG = getActiveConfig()
  const factoryName = FACTORY_NAME.toLowerCase()
  const FACTORY = CONFIG[FACTORY_NAME]

  if (VALUE_TRANSFORMERS[factoryName]) {
    const result = VALUE_TRANSFORMERS[factoryName](value, key)
    FACTORY[key] = result
    return FACTORY
  }

  if (CONFIG.verbose) console.warn('Can not find', factoryName, 'method in scratch')
}

export const setEach = (factoryName, props) => {
  const CONFIG = getActiveConfig()
  const FACTORY_NAME = factoryName.toUpperCase()
  const keys = Object.keys(props)
  keys.map(key => setValue(FACTORY_NAME, props[key], key))

  return CONFIG[FACTORY_NAME]
}

const SET_OPTIONS = {}

export const set = (recivedConfig, options = SET_OPTIONS) => {
  let CONFIG = getActiveConfig()
  const {
    version,
    verbose,
    useVariable,
    useReset,
    useSvgSprite,
    useFontImport,
    useIconSprite,
    globalTheme,
    useDocumentTheme,
    defaultConfig,
    ...config
  } = recivedConfig

  if (options.newConfig) {
    CONFIG = setActiveConfig(options.newConfig)
  }

  if (verbose !== undefined) CONFIG.verbose = verbose
  if (useVariable !== undefined) CONFIG.useVariable = useVariable
  if (useReset !== undefined) CONFIG.useReset = useReset
  if (useFontImport !== undefined) CONFIG.useFontImport = useFontImport
  if (useSvgSprite !== undefined) CONFIG.useSvgSprite = useSvgSprite
  if (useIconSprite !== undefined) CONFIG.useIconSprite = useIconSprite
  if (useDocumentTheme !== undefined) CONFIG.useDocumentTheme = useDocumentTheme
  if (globalTheme !== undefined) CONFIG.globalTheme = globalTheme
  if (defaultConfig !== undefined) CONFIG.defaultConfig = defaultConfig
  if (CONFIG.verbose) console.log(CONFIG)

  if (!CONFIG.__svg_cache) CONFIG.__svg_cache = {}

  const keys = Object.keys(config)
  keys.map(key => setEach(key, config[key]))

  // apply generic configs
  applyTypographySequence()
  applySpacingSequence()
  applyTimingSequence()
  applyDocument()
  applyReset()

  return CONFIG
}
