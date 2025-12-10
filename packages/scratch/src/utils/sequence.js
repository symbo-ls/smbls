'use strict'

import { isString } from '@domql/utils'
import { toDashCase } from '@symbo.ls/utils'
import { getActiveConfig } from '../factory.js'
import { CSS_UNITS, isScalingUnit } from './unit.js'

export const numToLetterMap = {
  '-6': 'U',
  '-5': 'V',
  '-4': 'W',
  '-3': 'X',
  '-2': 'Y',
  '-1': 'Z',
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
  7: 'H',
  8: 'I',
  9: 'J',
  10: 'K',
  11: 'L',
  12: 'M',
  13: 'N',
  14: 'O',
  15: 'P',
  16: 'Q',
  17: 'R',
  18: 'S',
  19: 'T'
}

const setSequenceValue = (props, sequenceProps) => {
  const { key, variable, value, scaling, index, scalingVariable } = props
  sequenceProps.sequence[key] = {
    key,
    decimal: ~~(value * 100) / 100,
    val: ~~value,
    scaling,
    index,
    scalingVariable,
    variable
  }
  sequenceProps.scales[key] = scaling
  sequenceProps.vars[variable] = scaling + sequenceProps.unit
}

export const getFnPrefixAndValue = (val) => {
  if (!val.includes('(')) return val
  const prefix = val.split('(')[0]
  const value = val.slice(val.indexOf('(') + 1, val.lastIndexOf(')'))
  return [prefix, value]
}

export const setScalingVar = (key, sequenceProps) => {
  const { base, type, unit } = sequenceProps

  const defaultVal = (isScalingUnit(unit) ? 1 : base) + unit

  if (key === 0) return defaultVal

  const prefix = '--' + (type && type.replace('.', '-'))
  const ratioVar = `${prefix}-ratio`

  if (key > 0) {
    const prevLetterKey = numToLetterMap[key - 1]
    return `calc(var(${prefix}-${prevLetterKey}) * var(${ratioVar}))`
  }
  if (key < 0) {
    const nextLetterKey = numToLetterMap[key + 1]
    return `calc(var(${prefix}-${nextLetterKey}) / var(${ratioVar}))`
  }
}

export const setSubScalingVar = (index, arr, variable, sequenceProps) => {
  const { type } = sequenceProps
  const skipMiddle = index === 2 && arr.length === 2
  const indexMapWithLength = skipMiddle ? index + 1 : index

  const prefix = '--' + (type && type.replace('.', '-'))
  const subRatioVarPrefix = `${prefix}-sub-ratio-`

  return `calc(var(${variable}) * var(${subRatioVarPrefix + indexMapWithLength}))`
}

export const getSubratioDifference = (base, ratio) => {
  const diff = base * ratio - base
  const subRatio = diff / 1.618
  const first = base * ratio - subRatio
  const second = base + subRatio
  const middle = (first + second) / 2
  return [first, middle, second]
}

export const getSubratio = (base, ratio) => {
  return getSubratioDifference(base, ratio).map((v) => v / base)
}

export const generateSubSequence = (props, sequenceProps) => {
  const { key, base, value, ratio, variable, index } = props

  const next = value * ratio
  const diffRounded = ~~next - ~~value

  let arr
  const [first, middle, second] = getSubratioDifference(value, ratio)
  if (diffRounded > 16) arr = [first, middle, second]
  else arr = [first, second]

  arr.forEach((v, k) => {
    const scaling = ~~((v / base) * 1000) / 1000
    const newVar = variable + (k + 1)
    const newIndex = index + (k + 1) / 10
    const scalingVariable = setSubScalingVar(
      k + 1,
      arr,
      variable,
      sequenceProps
    )

    const props = {
      key: key + (k + 1),
      variable: newVar,
      value: v,
      scaling,
      scalingVariable,
      index: newIndex
    }

    setSequenceValue(props, sequenceProps)
  })
}

const switchSequenceOnNegative = (key, base, ratio) => {
  // const values = Object.values(SEQUENCE)
  // const index = values.indexOf(ratio)
  // const diffRatio = ratio / SPACING.ratio
  // const total = values[values.length - 1] - values[0]
  // const avg = total / 2
  // const diff = avg - ratio
  // const scale = total / ratio
  // const finalDiff = avg + avg / diffRatio

  // if (key < 0) return base * Math.pow(avg, key)
  return base * Math.pow(ratio, key)
}

export const generateSequence = (sequenceProps) => {
  const { type, base, ratio, range, subSequence } = sequenceProps
  const n = Math.abs(range[0]) + Math.abs(range[1])
  const prefix = '--' + (type && type.replace('.', '-')) + '-'

  for (let i = 0; i <= n; i++) {
    const key = range[1] - i
    const letterKey = numToLetterMap[key]
    const value = switchSequenceOnNegative(key, base, ratio)
    const scaling = ~~((value / base) * 100) / 100
    const variable = prefix + letterKey
    const scalingVariable = setScalingVar(key, sequenceProps)

    const props = {
      key: letterKey,
      variable,
      value,
      base,
      scaling,
      scalingVariable,
      ratio,
      index: key
    }

    setSequenceValue(props, sequenceProps)

    if (subSequence) generateSubSequence(props, sequenceProps)
  }
  return sequenceProps
}

export const generateSequencePosition = (sequenceProps, position = 0) => {
  const { type, base, ratio, subSequence } = sequenceProps
  const letterKey = isString(position) ? position : numToLetterMap[position]
  const index = isString(position)
    ? Object.entries(numToLetterMap).find(
        ([, value]) => value === position
      )?.[0]
    : position

  if (!letterKey) {
    console.warn(`Position ${position} is out of range in numToLetterMap`)
    return null
  }

  const result = {
    sequence: {},
    scales: {},
    vars: {},
    ...sequenceProps
  }

  const value = base * Math.pow(ratio, index)
  const scaling = ~~((value / base) * 100) / 100
  const prefix = '--' + (type && type.replace('.', '-')) + '-'
  const variable = prefix + letterKey
  const scalingVariable = setScalingVar(index, sequenceProps)

  const props = {
    key: letterKey,
    variable,
    value,
    base,
    scaling,
    scalingVariable,
    ratio,
    index
  }

  setSequenceValue(props, result)

  if (subSequence) {
    generateSubSequence(props, result)
  }

  return result
}

export const getSequenceValue = (value = 'A', sequenceProps) => {
  const CONFIG = getActiveConfig()
  const { UNIT } = CONFIG

  if (isString(value) && value.slice(0, 2) === '--') return `var(${value})`

  const { sequence, unit = UNIT.default, useVariable } = sequenceProps

  const startsWithDashOrLetterRegex = /^-?[a-zA-Z]/i
  const startsWithDashOrLetter = startsWithDashOrLetterRegex.test(value)

  const hasUnits = CSS_UNITS.some((unit) => value.includes(unit))
  if (hasUnits || !startsWithDashOrLetter) return value

  const skipArr = [
    'none',
    'auto',
    'max-content',
    'min-content',
    'fit-content',
    'inherit',
    'initial',
    'unset',
    'revert',
    'revert-layer'
  ]
  if (skipArr.includes(value)) return value

  const prefix = `--${toDashCase(sequenceProps.type.replace('.', '-'))}-`
  const letterVal = value.toUpperCase()
  const isNegative = letterVal.slice(0, 1) === '-' ? '-' : ''
  let absValue = isNegative ? letterVal.slice(1) : letterVal

  let mediaName = ''
  if (absValue.includes('_')) {
    mediaName = '_' + absValue.split('_')[1].toLowerCase()
    absValue = absValue.split('_')[0]
  }

  const varValue = (v) =>
    startsWithDashOrLetterRegex.test(v) ? `var(${prefix}${v}${mediaName})` : v
  if (absValue.includes('+')) {
    const [first, second] = absValue.split('+')
    const joint = `${varValue(first)} + ${varValue(second)}`
    return isNegative ? `calc((${joint}) * -1)` : `calc(${joint})`
  } else if (absValue.includes('*')) {
    const [first, second] = absValue.split('*')
    const joint = `${varValue(first)} * ${varValue(second)}`
    return isNegative ? `calc((${joint}) * -1)` : `calc(${joint})`
  } else if (absValue.includes('-')) {
    // TODO: check this
    // check for the first char
    const [first, second] = absValue.split('-')
    const joint = `${varValue(first)} - ${varValue(second)}`
    return isNegative ? `calc((${joint}) * -1)` : `calc(${joint})`
  }

  // if subsequence is not set but value is applied
  if (!sequence[absValue] && absValue.length === 2) {
    if (CONFIG.verbose)
      console.warn(
        absValue,
        '- value is not found because `subSequence` is set to false'
      )
    absValue = absValue.slice(0, 1)
  }

  if (useVariable || CONFIG.useVariable) {
    const varValue = `var(${prefix}${absValue}${mediaName})`
    return isNegative ? `calc(${varValue} * -1)` : varValue
  }

  const sequenceItem = sequence ? sequence[absValue] : null
  if (!sequenceItem) return console.warn("can't find", sequence, absValue)

  if (unit === 'ms' || unit === 's') {
    return isNegative + sequenceItem.val + unit
  }

  return isNegative + sequenceItem.scaling + unit
}

export const getSequenceValueBySymbols = (value, sequenceProps) => {
  const mathArr = ['+', '-', '*', '/', ','].filter((v) =>
    value.includes(v + ' ')
  )
  if (!mathArr.length) return value

  return mathArr
    .map((symbol) => {
      const valuesArr = value.split(symbol + ' ').map((v) => v.trim())
      const transformedValues = valuesArr.map((v) => {
        return getSequenceValue(v, sequenceProps)
      })
      return transformedValues.join(symbol + ' ')
    })
    .join('')
}

export const getSequenceValuePropertyPair = (
  value,
  propertyName,
  sequenceProps,
  fnPrefix
) => {
  if (typeof value !== 'string') {
    const CONFIG = getActiveConfig()
    if (CONFIG.verbose) console.warn(propertyName, value, 'is not a string')
    return { [propertyName]: value }
  }

  if (value === '-' || value === '') return {}

  if (!fnPrefix && value.includes('(')) {
    const fnArr = getFnPrefixAndValue(value)
    fnPrefix = fnArr[0]
    value = fnArr[1]
  }

  const mathArr = ['+', '-', '*', '/', ','].filter((v) =>
    value.includes(v + ' ')
  )
  if (mathArr.length) {
    value = getSequenceValueBySymbols(value, sequenceProps)
  } else value = getSequenceValue(value, sequenceProps)

  return { [propertyName]: fnPrefix ? `${fnPrefix}(${value})` : value }
}

export const findHeadingLetter = (h1Matches, index) =>
  numToLetterMap[h1Matches - index]

export const findHeadings = (propertyNames) => {
  const { h1Matches, sequence } = propertyNames
  return new Array(6).fill(null).map((_, i) => {
    const findLetter = findHeadingLetter(h1Matches, i)
    return sequence[findLetter]
  })
}
