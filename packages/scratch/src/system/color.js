'use strict'

import { isObject, isArray, isString } from '@domql/utils'
import { getActiveConfig } from '../factory.js'

import {
  colorStringToRgbaArray,
  getRgbTone,
  isCSSVar,
  parseColorToken
} from '../utils'

export const getColor = (value, key, config) => {
  const CONFIG = config || getActiveConfig()
  if (!isString(value)) {
    if (CONFIG.verbose) console.warn(value, '- type for color is not valid')
    return
  }

  if (isCSSVar(value)) return `var(${value})`

  if (key && value[key]) value = value[key]

  let name, alpha, tone
  if (isArray(value)) {
    [name, alpha, tone] = value
  } else {
    const parsed = parseColorToken(value)
    if (!parsed) return value
    if (parsed.passthrough) return parsed.passthrough
    if (parsed.cssVar) return `var(${parsed.cssVar})`
    name = parsed.name
    alpha = parsed.alpha
    tone = parsed.tone
  }

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
  if (tone) return `rgba(${rgb}, 1)`
  return CONFIG.useVariable ? `var(${val.var})` : `rgb(${rgb})`
}

export const getMediaColor = (value, globalTheme, config) => {
  const CONFIG = config || getActiveConfig()
  if (!globalTheme) globalTheme = CONFIG.globalTheme === 'auto' ? null : CONFIG.globalTheme
  if (!isString(value)) {
    if (CONFIG.verbose) console.warn(value, '- type for color is not valid')
    return
  }

  if (isCSSVar(value)) return `var(${value})`

  let name
  if (isArray(value)) {
    name = value[0]
  } else {
    const parsed = parseColorToken(value)
    if (!parsed) return value
    if (parsed.passthrough) return parsed.passthrough
    if (parsed.cssVar) return `var(${parsed.cssVar})`
    name = parsed.name
  }

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

  if (isString(val) && isCSSVar(val)) {
    const rawRef = val.slice(2)
    val = getColor(rawRef)
    if (!(
      val.includes('rgb') ||
      val.includes('var') ||
      val.includes('#')
    )) {
      // Handle space-separated format: '--colorName alpha' (e.g. '--gray1 1')
      const parts = rawRef.split(' ')
      const refColor = CONFIG.COLOR[parts[0]]
      if (refColor && refColor.value) {
        if (parts[1] !== undefined) {
          val = `rgba(${refColor.rgb}, ${parts[1]})`
        } else {
          val = refColor.value
        }
      } else {
        if (CONFIG.verbose) console.warn(val, '- referred but does not exist')
        val = parts[0]
      }
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
  if (isString(val) && isCSSVar(val)) val = getColor(val.slice(2))

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
