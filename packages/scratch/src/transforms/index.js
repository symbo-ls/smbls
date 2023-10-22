'use strict'

import { isString } from '@domql/utils'
import { getActiveConfig } from '../factory'
import {
  getSpacingByKey,
  getColor,
  getShadow,
  getMediaColor,
  getTimingByKey,
  getTimingFunction
} from '../system'

const isBorderStyle = str => [
  'none',
  'hidden',
  'dotted',
  'dashed',
  'solid',
  'double',
  'groove',
  'ridge',
  'inset',
  'outset',
  'initial'
].some(v => str.includes(v))

export const transformBorder = border => {
  const arr = border.split(', ')
  return arr.map(v => {
    v = v.trim()
    if (v.slice(0, 2) === '--') return `var(${v})`
    else if (isBorderStyle(v)) return v || 'solid'
    else if (v.slice(-2) === 'px' || v.slice(-2) === 'em') return v // TODO: add map spacing
    else if (getColor(v).length > 2) return getColor(v)
    return getSpacingByKey(v, 'border').border
  }).join(' ')
}

export const transformTextStroke = stroke => {
  return stroke.split(', ').map(v => {
    if (v.slice(0, 2) === '--') return `var(${v})`
    if (v.includes('px')) return v
    else if (getColor(v)) return getColor(v)
    return v
  }).join(' ')
}

export const transformShadow = (sh, globalTheme) => getShadow(sh, globalTheme)

export const transformBoxShadow = shadows => shadows.split('|').map(shadow => {
  return shadow.split(', ').map(v => {
    v = v.trim()
    if (v.slice(0, 2) === '--') return `var(${v})`
    if (getColor(v).length > 2) return getColor(v)
    if (v.includes('px') || v.slice(-2) === 'em') return v
    const arr = v.split(' ')
    if (!arr.length) return v
    return arr.map(v => getSpacingByKey(v, 'shadow').shadow).join(' ')
  }).join(' ')
}).join(',')

export const transformBackgroundImage = (backgroundImage, globalTheme) => {
  const CONFIG = getActiveConfig()
  return backgroundImage.split(', ').map(v => {
    if (v.slice(0, 2) === '--') return `var(${v})`
    if (v.includes('url') || v.includes('gradient')) return v
    else if (CONFIG.GRADIENT[backgroundImage]) {
      return {
        backgroundImage: getMediaColor(backgroundImage, globalTheme || CONFIG.globalTheme)
      }
    } else if (v.includes('/') || v.includes('http')) return `url(${v})`
    return v
  }).join(' ')
}

export const transfromGap = gap => isString(gap) && (
  gap.split(' ').map(v => getSpacingByKey(v, 'gap').gap).join(' ')
)

export const transformTransition = transition => {
  const arr = transition.split(' ')

  if (!arr.length) return transition

  return arr.map(v => {
    if (v.slice(0, 2) === '--') return `var(${v})`
    if (v.length < 3 || v.includes('ms')) {
      const mapWithSequence = getTimingByKey(v)
      return mapWithSequence.timing || v
    }
    if (getTimingFunction(v)) return getTimingFunction(v)
    return v
  }).join(' ')
}

export const transformDuration = (duration, props, propertyName) => {
  if (!isString(duration)) return
  return duration.split(',').map(v => getTimingByKey(v).timing || v).join(',')
}

export const splitTransition = transition => {
  const arr = transition.split(',')
  if (!arr.length) return
  return arr.map(transformTransition).join(',')
}
