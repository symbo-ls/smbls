'use strict'

import { isObject, isArray, isString } from '@domql/utils'
import { getActiveConfig } from '../factory.js'

import {
  colorStringToRgbaArray,
  getRgbTone
} from '../utils'

export const getColor = (value, key, config) => {
  const CONFIG = config || getActiveConfig()
  if (!isString(value)) {
    if (CONFIG.verbose) console.warn(value, '- type for color is not valid')
    return
  }

  if (value.slice(0, 2) === '--') return `var(${value})`

  if (key && value[key]) value = value[key]
  const [name, alpha, tone] = isArray(value) ? value : value.split(' ')
  const { COLOR, GRADIENT } = CONFIG

  let val = (COLOR[name] || GRADIENT[name])

  if (!val) {
    if (CONFIG.verbose) console.warn('Can\'t find color ', name)
    return value
  }

  if (key) {
    if (val[key]) val = val[key]
    else if (CONFIG.verbose) console.warn(value, ' - does not have ', key)
  }

  // TODO: support variables
  // if (alpha) return `rgba(var(${val[shade || ''].var}), ${modifier})`

  let rgb = val.rgb
  if (!rgb) {
    return CONFIG.useVariable ? `var(${val.var})` : val.value
  }
  if (tone && !val[tone]) {
    rgb = getRgbTone(rgb, tone)
    val[tone] = { rgb, var: `${val.var}-${tone}` }
  }
  if (val[tone]) rgb = val[tone].rgb

  if (alpha) return `rgba(${rgb}, ${alpha})`
  return CONFIG.useVariable ? `var(${val.var})` : `rgb(${rgb})`
}

export const getMediaColor = (value, globalTheme, config) => {
  const CONFIG = config || getActiveConfig()
  if (!globalTheme) globalTheme = CONFIG.globalTheme
  if (!isString(value)) {
    if (CONFIG.verbose) console.warn(value, '- type for color is not valid')
    return
  }

  if (value.slice(0, 2) === '--') return `var(${value})`

  const [name] = isArray(value) ? value : value.split(' ')

  const { COLOR, GRADIENT } = CONFIG
  const val = COLOR[name] || GRADIENT[name]
  const isObj = isObject(val)

  if (isObj && val.value) return getColor(value, `@${globalTheme}`, config)
  else if (isObj) {
    if (globalTheme) return getColor(value, `@${globalTheme}`, config)
    else {
      const obj = {}
      for (const mediaName in val) {
        const query = CONFIG.MEDIA[mediaName.slice(1)]
        const media = '@media ' + (query === 'print' ? `${query}` : `screen and ${query}`)
        obj[media] = getColor(value, mediaName, config)
      }
      return obj
    }
  } else {
    if (CONFIG.verbose) console.warn('Can\'t find color', value)
    return value
  }
}

export const setColor = (val, key, suffix) => {
  const CONFIG = getActiveConfig()

  if (isString(val) && val.slice(0, 2) === '--') {
    val = getColor(val.slice(2))
    if (!(
      val.includes('rgb') ||
      val.includes('var') ||
      val.includes('#')
    )) {
      if (CONFIG.verbose) console.warn(val, '- referred but does not exist')
      val = val.split(' ')[0]
    }
  }

  if (isArray(val)) {
    return {
      '@light': setColor(val[0], key, 'light'),
      '@dark': setColor(val[1], key, 'dark')
    }
  }

  if (isObject(val)) {
    const obj = {}
    for (const variant in val) {
      obj[variant] = setColor(
        val[variant],
        key,
        variant.slice(0, 1) === '@' ? variant.slice(1) : variant
      )
    }
    return obj
  }

  const CSSVar = `--color-${key}` + (suffix ? `-${suffix}` : '')
  const colorArr = colorStringToRgbaArray(val.value || val)
  const [r, g, b, a = 1] = colorArr
  const alpha = parseFloat(a.toFixed(2))
  const rgb = `${r}, ${g}, ${b}`
  const value = `rgba(${rgb}, ${alpha})`

  if (CONFIG.useVariable) { CONFIG.CSS_VARS[CSSVar] = value }

  return {
    var: CSSVar,
    rgb,
    alpha,
    value
  }
}

export const setGradient = (val, key, suffix) => {
  const CONFIG = getActiveConfig()
  if (isString(val) && val.slice(0, 2) === '--') val = getColor(val.slice(2))

  if (isArray(val)) {
    return {
      '@light': setGradient(val[0], key, 'light'),
      '@dark': setGradient(val[0], key, 'dark')
    }
  }

  if (isObject(val)) {
    const obj = {}
    for (const variant in val) obj[variant] = setGradient(val[variant], key, variant.slice(0, 1) === '@' ? variant.slice(1) : variant)
    return obj
  }

  const CSSVar = `--gradient-${key}` + (suffix ? `-${suffix}` : '')

  if (CONFIG.useVariable) {
    CONFIG.CSS_VARS[CSSVar] = val.value || val
  }

  return {
    var: CSSVar,
    value: val.value || val
  }
}
