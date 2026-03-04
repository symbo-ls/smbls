'use strict'

import { isString, isObject, exec } from '@domql/utils'
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
  isCSSVar,
  CSS_NATIVE_COLOR_REGEX,
  splitTopLevelCommas,
  parseColorToken
} from '../utils'

const BORDER_STYLES = new Set([
  'none', 'hidden', 'dotted', 'dashed', 'solid', 'double',
  'groove', 'ridge', 'inset', 'outset', 'initial'
])

const GRADIENT_KEYWORDS = new Set([
  'to', 'top', 'bottom', 'left', 'right', 'center', 'at',
  'circle', 'ellipse', 'closest-side', 'farthest-side',
  'closest-corner', 'farthest-corner'
])
const isBorderStyle = (str) => BORDER_STYLES.has(str)

export const transformBorder = (border) => {
  const str = border + ''

  // CSS passthrough: native CSS color syntax
  if (CSS_NATIVE_COLOR_REGEX.test(str)) return str

  // Simple CSS keywords
  const trimmed = str.trim()
  if (trimmed === 'none' || trimmed === '0' || trimmed === 'initial' || trimmed === 'inherit' || trimmed === 'unset') return str

  // Space-separated tokens (CSS-like syntax)
  const tokens = str.split(/\s+/)

  return tokens
    .map((v) => {
      v = v.trim()
      if (!v) return ''
      if (isCSSVar(v)) return `var(${v})`
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
      if (isCSSVar(v)) return `var(${v})`
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
          if (isCSSVar(v)) return `var(${v})`
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

/**
 * Resolve Symbols color tokens inside a CSS gradient string.
 * e.g. 'linear-gradient(to bottom, white.97 65%, white.0 100%)'
 * →    'linear-gradient(to bottom, rgba(255, 255, 255, 0.97) 65%, rgba(255, 255, 255, 0.0) 100%)'
 */
export const resolveColorsInGradient = (gradient, globalTheme) => {
  // Find the opening paren after the gradient type
  const parenStart = gradient.indexOf('(')
  if (parenStart === -1) return gradient

  const prefix = gradient.slice(0, parenStart + 1)
  const inner = gradient.slice(parenStart + 1, gradient.lastIndexOf(')'))
  const suffix = ')'

  // Split by top-level commas (respects nested rgba() etc.)
  const segments = splitTopLevelCommas(inner)

  const resolved = segments.map((segment) => {
    segment = segment.trim()
    // Split segment into space-separated tokens
    const tokens = segment.split(/\s+/)

    return tokens.map((token) => {
      if (!token) return token
      // Skip CSS values: percentages, degrees, direction keywords, native colors
      if (/^\d/.test(token) || token === '0') return token
      if (GRADIENT_KEYWORDS.has(token)) return token
      if (token === 'transparent') return token
      if (CSS_NATIVE_COLOR_REGEX.test(token)) return token

      // Try to resolve as a Symbols color token
      const color = getColor(token)
      if (isResolvedColor(color)) return color

      return token
    }).join(' ')
  })

  return prefix + resolved.join(', ') + suffix
}

export const transformBackgroundImage = (backgroundImage, globalTheme) => {
  const CONFIG = getActiveConfig()
  return backgroundImage
    .split(', ')
    .map((v) => {
      if (isCSSVar(v)) return `var(${v})`
      if (v.includes('url')) return v
      if (v.includes('gradient')) return resolveColorsInGradient(v, globalTheme)
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
      if (isCSSVar(v)) return `var(${v})`
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

  if (value === undefined || value === null) return

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
