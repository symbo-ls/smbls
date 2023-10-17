'use strict'

import { getActiveConfig } from '../factory.js'
import { getColor } from './color.js'
import { getSpacingByKey } from './spacing.js'

import {
  isObject,
  isString,
  isArray
} from '@domql/utils'

export const setShadow = (value, key, suffix, prefers) => {
  const CONFIG = getActiveConfig()
  // const { CSS_VARS } = CONFIG
  // const theme = { valueue: value }

  if (isArray(value)) {
    return {
      '@light': setShadow(value[0], key, 'light'),
      '@dark': setShadow(value[1], key, 'dark')
    }
  }

  if (isObject(value)) {
    const obj = {}
    for (const variant in value) {
      obj[variant] = setShadow(
        value[variant],
        key,
        variant.startsWith('@') ? variant.slice(1) : variant
      )
    }
    return obj
  }

  if (isString(value) && value.includes(',')) {
    value = value.split(',').map(v => {
      v = v.trim()
      if (v.startsWith('--')) return `var(${v})`
      if (getColor(v).length > 2) return getColor(v)
      if (v.includes('px') || v.slice(-2) === 'em') return v
      const arr = v.split(' ')
      if (!arr.length) return v
      return arr.map(v => getSpacingByKey(v, 'shadow').shadow).join(' ')
    }).join(' ')
  }

  const CSSVar = `--shadow-${key}` + (suffix ? `-${suffix}` : '')

  if (CONFIG.useVariable) { CONFIG.CSS_VARS[CSSVar] = value }

  return {
    var: CSSVar,
    value
  }
}

export const getShadow = (value, globalTheme) => {
  const CONFIG = getActiveConfig()
  if (!globalTheme) globalTheme = CONFIG.globalTheme
  if (!isString(value)) {
    if (CONFIG.verbose) console.warn(value, '- type for color is not valid')
    return
  }

  if (value.slice(0, 2) === '--') return `var(${value})`

  const [name] = isArray(value) ? value : value.split(' ')

  const { SHADOW } = CONFIG
  const val = SHADOW[name]
  const isObj = isObject(val)

  if (!val) {
    if (CONFIG.verbose) console.warn('Can\'t find color ', name)
    return value
  }

  if (globalTheme) {
    if (val[globalTheme]) return val[globalTheme].value
    else if (CONFIG.verbose) console.warn(value, ' - does not have ', globalTheme)
  }

  if (isObj && val.value) return val.value

  if (isObj) {
    const obj = {}
    for (const mediaName in val) {
      const query = CONFIG.MEDIA[mediaName.slice(1)]
      const media = `@media screen and ${query}`
      obj[media] = val.value
    }
    return obj
  }

  if (CONFIG.verbose) console.warn('Can\'t find color', value)
  return value
}
