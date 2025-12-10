'use strict'

import { arrayzeValue } from '@symbo.ls/utils'
import { isArray, isString, merge } from '@domql/utils'

import { getActiveConfig } from '../factory.js'
import {
  CSS_UNITS,
  applyMediaSequenceVars,
  applySequenceVars,
  generateSequence,
  getFnPrefixAndValue,
  getSequenceValuePropertyPair
} from '../utils'

const runThroughMedia = (FACTORY) => {
  for (const prop in FACTORY) {
    const mediaProps = FACTORY[prop]

    const isMediaName = prop.slice(0, 1) === '@'
    if (!isMediaName) continue

    const { type, base, ratio, range, subSequence, h1Matches, unit } = FACTORY

    merge(mediaProps, {
      type,
      base,
      ratio,
      range,
      subSequence,
      h1Matches,
      unit,
      sequence: {},
      scales: {},
      templates: {},
      vars: {}
    })

    generateSequence(mediaProps)
    applyMediaSequenceVars(FACTORY, prop)
  }
}

export const checkIfBoxSize = (propertyName) => {
  const prop = propertyName.toLowerCase()
  const includesWidth = prop.includes('width') || prop.includes('height')
  const includesBorder = prop.includes('border') || prop.includes('outline')
  return includesWidth && !includesBorder
}

export const applySpacingSequence = () => {
  const CONFIG = getActiveConfig()
  const { SPACING } = CONFIG
  generateSequence(SPACING)
  applySequenceVars(SPACING)
  runThroughMedia(SPACING)
}

const getSequence = (sequenceProps) => {
  const CONFIG = getActiveConfig()
  const { SPACING } = CONFIG
  if (!sequenceProps) return SPACING
  const hasGenerated = Object.keys(sequenceProps.sequence).length > 0
  return hasGenerated ? sequenceProps : generateSequence(sequenceProps)
}

export const getSpacingByKey = (
  value,
  propertyName = 'padding',
  sequenceProps,
  fnPrefix
) => {
  const sequence = getSequence(sequenceProps)

  if (isString(value)) {
    if (!fnPrefix && value.includes('(')) {
      const fnArray = getFnPrefixAndValue(value)
      fnPrefix = fnArray[0]
      value = fnArray[1]
    }
  }

  const stack = fnPrefix ? [value] : arrayzeValue(value)
  if (!isArray(stack)) return

  if (stack.length > 1) {
    let suffix = ''
    if (propertyName === 'borderWidth') {
      propertyName = 'border'
      suffix = 'Width'
    }

    const directions = {
      2: ['Block', 'Inline'],
      3: ['BlockStart', 'Inline', 'BlockEnd'],
      4: ['BlockStart', 'InlineEnd', 'BlockEnd', 'InlineStart']
    }

    const wrapSequenceValueByDirection = (direction, i) =>
      getSequenceValuePropertyPair(
        stack[i],
        propertyName + direction + suffix,
        sequence,
        fnPrefix
      )

    return directions[stack.length].map((dir, key) =>
      wrapSequenceValueByDirection(dir, key)
    )
  }

  return getSequenceValuePropertyPair(value, propertyName, sequence, fnPrefix)
}

export const getSpacingBasedOnRatio = (props, propertyName, val, fnPrefix) => {
  const CONFIG = getActiveConfig()
  const { SPACING } = CONFIG

  let value = val || props[propertyName]

  if (!fnPrefix && isString(value) && value.includes('(')) {
    const fnArr = getFnPrefixAndValue(value)
    fnPrefix = fnArr[0]
    value = fnArr[1]
  }

  if (props.spacingRatio) {
    const sequenceProps = applyCustomSequence(props)
    return getSpacingByKey(value, propertyName, sequenceProps, fnPrefix)
  }

  return getSpacingByKey(value, propertyName, SPACING, fnPrefix)
}

export const splitSpacedValue = (val) => {
  const addDefault = (v) => {
    const isSymbol = ['+', '-', '*', '/'].includes(v)
    const hasUnits = CSS_UNITS.some((unit) => val.includes(unit))
    if (isSymbol || hasUnits) return v
    const isSingleLetter = v.length < 3 && /[A-Z]/.test(v)
    if (isSingleLetter) return v + '_default'
    return v
  }
  return val
    .split(',')
    .map((v) => v.trim())
    .map(addDefault)
    .join(',')
    .split(' ')
    .map(addDefault)
    .join(' ')
}
