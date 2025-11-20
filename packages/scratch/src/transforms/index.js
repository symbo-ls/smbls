'use strict'

import { isNull, isString, isObject, isUndefined } from '@domql/utils'
import { getActiveConfig } from '../factory'
import {
  getSpacingByKey,
  getColor,
  getShadow,
  getMediaColor,
  getTimingByKey,
  getTimingFunction,
  getSpacingBasedOnRatio
} from '../system'

const isBorderStyle = (str) =>
  [
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
  ].some((v) => str.includes(v))

export const transformBorder = (border) => {
  const arr = (border + '').split(', ')
  return arr
    .map((v) => {
      v = v.trim()
      if (v.slice(0, 2) === '--') return `var(${v})`
      else if (isBorderStyle(v)) return v || 'solid'
      else if (v.slice(-2) === 'px' || v.slice(-2) === 'em')
        return v // TODO: add map spacing
      else if (getColor(v).length > 2) return getColor(v)
      return getSpacingByKey(v, 'border').border
    })
    .join(' ')
}

export const transformTextStroke = (stroke) => {
  return stroke
    .split(', ')
    .map((v) => {
      if (v.slice(0, 2) === '--') return `var(${v})`
      if (v.includes('px')) return v
      else if (getColor(v)) return getColor(v)
      return v
    })
    .join(' ')
}

export const transformShadow = (sh, globalTheme) => getShadow(sh, globalTheme)

export const transformBoxShadow = (shadows, globalTheme) =>
  shadows
    .split('|')
    .map((shadow) => {
      return shadow
        .split(',')
        .map((v) => {
          v = v.trim()
          if (v.slice(0, 2) === '--') return `var(${v})`
          if (getColor(v).length > 2) {
            const color = getMediaColor(v, globalTheme)
            if (isObject(color))
              return Object.values(color).filter((v) =>
                v.includes(': ' + globalTheme)
              )[0]
            return color
          }
          if (v.includes('px') || v.slice(-2) === 'em') return v
          const arr = v.split(' ')
          if (!arr.length) return v
          return arr.map((v) => getSpacingByKey(v, 'shadow').shadow).join(' ')
        })
        .join(' ')
    })
    .join(',')

export const transformBackgroundImage = (backgroundImage, globalTheme) => {
  const CONFIG = getActiveConfig()
  return backgroundImage
    .split(', ')
    .map((v) => {
      if (v.slice(0, 2) === '--') return `var(${v})`
      if (v.includes('url') || v.includes('gradient')) return v
      else if (CONFIG.GRADIENT[backgroundImage]) {
        return {
          backgroundImage: getMediaColor(
            backgroundImage,
            globalTheme || CONFIG.globalTheme
          )
        }
      } else if (v.includes('/') || v.startsWith('http') || v.includes('.'))
        return `url(${v})`
      return v
    })
    .join(' ')
}

export const transfromGap = (gap) =>
  isString(gap) &&
  gap
    .split(' ')
    .map((v) => getSpacingByKey(v, 'gap').gap)
    .join(' ')

export const transformTransition = (transition) => {
  const arr = transition.split(' ')

  if (!arr.length) return transition

  return arr
    .map((v) => {
      if (v.slice(0, 2) === '--') return `var(${v})`
      if (v.length < 3 || v.includes('ms')) {
        const mapWithSequence = getTimingByKey(v)
        return mapWithSequence.timing || v
      }
      if (getTimingFunction(v)) return getTimingFunction(v)
      return v
    })
    .join(' ')
}

export const transformDuration = (duration, props, propertyName) => {
  if (!isString(duration)) return
  return duration
    .split(',')
    .map((v) => getTimingByKey(v).timing || v)
    .join(',')
}

export const splitTransition = (transition) => {
  const arr = transition.split(',')
  if (!arr.length) return
  return arr.map(transformTransition).join(',')
}

export const checkIfBoxSize = (propertyName) => {
  const prop = propertyName.toLowerCase()
  return (
    (prop.includes('width') || prop.includes('height')) &&
    !prop.includes('border')
  )
}

export const transformSize = (propertyName, val, props = {}, opts = {}) => {
  let value = val || props[propertyName]

  if (isUndefined(value) && isNull(value)) return

  const shouldScaleBoxSize = props.scaleBoxSize
  const isBoxSize = checkIfBoxSize(propertyName)

  if (!shouldScaleBoxSize && isBoxSize && isString(value)) {
    value = value
      .split(' ')
      .map((v) => {
        const isSingleLetter = v.length < 3 && /[A-Z]/.test(v)
        const hasUnits = ['%', 'vw', 'vh', 'ch'].some((unit) =>
          value.includes(unit)
        )
        if (isSingleLetter && !hasUnits) return v + '_default'
        return v
      })
      .join(' ')
  }

  if (opts.ratio) {
    return getSpacingBasedOnRatio(props, propertyName, value)
  } else {
    return getSpacingByKey(value, propertyName)
  }
}

export const transformSizeRatio = (propertyName, props) => {
  return transformSize(propertyName, null, props, {
    ratio: true
  })
}
