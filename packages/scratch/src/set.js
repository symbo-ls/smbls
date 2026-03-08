'use strict'

import { FACTORY, getActiveConfig, setActiveConfig } from './factory.js' // eslint-disable-line no-unused-vars
import {
  setColor,
  setGradient,
  setFont,
  setFontFamily,
  setTheme,
  setSvgIcon,
  setSVG,
  applyTypographySequence,
  applySpacingSequence,
  applyReset,
  applyTimingSequence,
  applyDocument,
  setShadow
} from './system'

import { isFunction, deepMerge } from '@domql/utils'

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
  icons: setSvgIcon,
  semantic_icons: setSameValue,
  svg: setSVG,
  svg_data: setSameValue,
  typography: setSameValue,
  cases: setCases,
  shadow: setShadow,
  spacing: setSameValue,
  media: setSameValue,
  grid: setSameValue,
  class: setSameValue,
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
export const setValue = (factoryName, value, key) => {
  const CONFIG = getActiveConfig()
  const lowerName = factoryName.toLowerCase()
  const FACTORY = CONFIG[lowerName] || CONFIG[factoryName]

  if (VALUE_TRANSFORMERS[lowerName]) {
    try {
      const result = VALUE_TRANSFORMERS[lowerName](value, key)
      FACTORY[key] = result
      return FACTORY
    } catch (error) {
      if (CONFIG.verbose) console.warn('Error setting', lowerName, 'value', value, key, error)
    }
  }

  if (CONFIG.verbose) console.warn('Can not find', lowerName, 'method in scratch')
}

export const setEach = (factoryName, props) => {
  const CONFIG = getActiveConfig()
  const lowerName = factoryName.toLowerCase()
  const keys = Object.keys(props)

  keys.forEach((key) => {
    try {
      return setValue(lowerName, props[key], key)
    } catch (error) {
      if (CONFIG.verbose) console.warn('Error setting', lowerName, 'value', props[key], key, error)
    }
  })

  return CONFIG[lowerName] || CONFIG[factoryName]
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
    useDefaultConfig,
    SEMANTIC_ICONS,
    semantic_icons,
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
  if (recivedConfig.useThemeSuffixedVars !== undefined) CONFIG.useThemeSuffixedVars = recivedConfig.useThemeSuffixedVars
  if (useDefaultConfig !== undefined) CONFIG.useDefaultConfig = useDefaultConfig
  const _semanticIcons = SEMANTIC_ICONS || semantic_icons
  if (_semanticIcons !== undefined) {
    CONFIG.semantic_icons = _semanticIcons
    CONFIG.SEMANTIC_ICONS = CONFIG.semantic_icons // backward compat alias
  }
  if (CONFIG.verbose) console.log(CONFIG)

  if (!CONFIG.__svg_cache) CONFIG.__svg_cache = {}

  const keys = Object.keys(config)
  const keySet = new Set(keys)

  // Pre-merge: fold UPPERCASE default keys into lowercase project keys
  keys.forEach(key => {
    const lower = key.toLowerCase()
    if (lower !== key && keySet.has(lower)) {
      deepMerge(config[lower], config[key])
    }
  })

  // Process only lowercase keys (skip UPPERCASE when lowercase equivalent exists)
  keys.map(key => {
    const lower = key.toLowerCase()
    if (lower !== key && keySet.has(lower)) return
    return setEach(key, config[key])
  })

  // apply generic configs
  if (config.TYPOGRAPHY || config.typography) {
    try { applyTypographySequence() } catch (e) {
      if (CONFIG.verbose) console.warn('Error applying typography sequence', e)
    }
  }
  if (config.SPACING || config.spacing) {
    try { applySpacingSequence() } catch (e) {
      if (CONFIG.verbose) console.warn('Error applying spacing sequence', e)
    }
  }
  if (config.TIMING || config.timing) {
    try { applyTimingSequence() } catch (e) {
      if (CONFIG.verbose) console.warn('Error applying timing sequence', e)
    }
  }
  applyDocument()
  applyReset()

  return CONFIG
}
