'use strict'

import { isNull, isString, isObject, isUndefined, exec } from '@domql/utils'
import { getActiveConfig } from '../factory'
import {
  getSpacingByKey,
  getColor,
  getShadow,
  getMediaColor,
  getTimingByKey,
  getTimingFunction,
  getSpacingBasedOnRatio,
  checkIfBoxSize,
  splitSpacedValue
} from '../system'
import {
  getFnPrefixAndValue,
  isResolvedColor,
  CSS_NATIVE_COLOR_REGEX,
  splitTopLevelCommas,
  parseColorToken
} from '../utils'

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
  const str = border + ''

  // CSS passthrough: native CSS color syntax
  if (CSS_NATIVE_COLOR_REGEX.test(str)) return str

  // Simple CSS keywords
  if (['none', '0', 'initial', 'inherit', 'unset'].includes(str.trim())) return str

  // Space-separated tokens (CSS-like syntax)
  const tokens = str.split(/\s+/)

  return tokens
    .map((v) => {
      v = v.trim()
      if (!v) return ''
      if (v.slice(0, 2) === '--') return `var(${v})`
      if (isBorderStyle(v)) return v
      if (/^\d/.test(v) || v === '0') return v
      // Try color resolution
      const color = getColor(v)
      if (isResolvedColor(color)) return color
      // Try spacing key
      const spacing = getSpacingByKey(v, 'border')
      if (spacing && spacing.border) return spacing.border
      return v
    })
    .join(' ')
}

export const transformTextStroke = (stroke) => {
  // CSS passthrough
  if (CSS_NATIVE_COLOR_REGEX.test(stroke)) return stroke

  return stroke
    .split(/\s+/)
    .map((v) => {
      v = v.trim()
      if (!v) return ''
      if (v.slice(0, 2) === '--') return `var(${v})`
      if (/^\d/.test(v) || v.includes('px') || v === '0') return v
      const color = getColor(v)
      if (isResolvedColor(color)) return color
      return v
    })
    .join(' ')
}

export const transformShadow = (sh, globalTheme) => getShadow(sh, globalTheme)

export const transformBoxShadow = (shadows, globalTheme) => {
  // CSS passthrough: native CSS color syntax
  if (CSS_NATIVE_COLOR_REGEX.test(shadows)) return shadows

  // Split multiple shadows by commas (CSS standard), respecting parentheses
  return splitTopLevelCommas(shadows)
    .map((shadow) => {
      shadow = shadow.trim()
      if (!shadow) return ''

      // Each shadow: space-separated tokens
      return shadow.split(/\s+/)
        .map((v) => {
          v = v.trim()
          if (!v) return ''
          if (v.slice(0, 2) === '--') return `var(${v})`
          if (v === 'inset' || v === 'none') return v

          // Try color resolution
          const color = getColor(v)
          if (isResolvedColor(color)) {
            const mediaColor = getMediaColor(v, globalTheme)
            if (isObject(mediaColor))
              return Object.values(mediaColor).filter((c) =>
                c.includes(': ' + globalTheme)
              )[0]
            return mediaColor
          }

          // CSS unit values
          if (/^\d/.test(v) || v === '0' || v.includes('px') || v.slice(-2) === 'em') return v

          // Spacing key
          const spacing = getSpacingByKey(v, 'shadow')
          if (spacing && spacing.shadow) return spacing.shadow

          return v
        })
        .join(' ')
    })
    .join(', ')
}

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
      } else if (v.includes('/') || v.startsWith('http') || (v.includes('.') && !parseColorToken(v)))
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

export function transformSize(propertyName, val, props = {}, opts = {}) {
  let value = exec.call(this, val || props[propertyName])

  if (isUndefined(value) || isNull(value)) return

  let fnPrefix
  if (isString(value)) {
    // has function prefix
    if (value.includes('(')) {
      const fnArr = getFnPrefixAndValue(value)
      fnPrefix = fnArr[0]
      value = fnArr[1]
    }

    const shouldScaleBoxSize = props.scaleBoxSize
    const isBoxSize = checkIfBoxSize(propertyName)
    if (!shouldScaleBoxSize && isBoxSize) {
      value = splitSpacedValue(value)
    }
  }

  return opts.ratio
    ? getSpacingBasedOnRatio(props, propertyName, value, fnPrefix)
    : getSpacingByKey(value, propertyName, undefined, fnPrefix)
}

export const transformSizeRatio = (propertyName, val = null, props) => {
  return transformSize(propertyName, val, props, {
    ratio: true
  })
}

export const transformBorderRadius = (radius, props, propertyName) => {
  if (!isString(radius)) return
  return {
    borderRadius: radius.split(' ').map((v, k) => getSpacingBasedOnRatio(props, propertyName, v)[propertyName]).join(' ')
  }
}
