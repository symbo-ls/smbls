'use strict'

import { UNIT } from '../config'

export const isString = arg => typeof arg === 'string'

export const isArray = arg => Array.isArray(arg)

export const isObject = arg => {
  if (arg === null) return false
  return (typeof arg === 'object') && (arg.constructor === Object)
}

export const isObjectLike = arg => {
  if (arg === null) return false
  return (typeof arg === 'object')
}

export const merge = (obj, original) => {
  for (const e in original) {
    const objProp = obj[e]
    const originalProp = original[e]
    if (objProp === undefined) {
      obj[e] = originalProp
    }
  }
  return obj
}

export const colorStringToRgbaArray = color => {
  if (color === '') return
  if (color.toLowerCase() === 'transparent') return [0, 0, 0, 0]

  // convert #RGB and #RGBA to #RRGGBB and #RRGGBBAA
  if (color[0] === '#') {
    if (color.length < 7) {
      color = '#' + color[1] + color[1] + color[2] + color[2] + color[3] + color[3] + (color.length > 4 ? color[4] + color[4] : '')
    } return [parseInt(color.substr(1, 2), 16),
      parseInt(color.substr(3, 2), 16),
      parseInt(color.substr(5, 2), 16),
      color.length > 7 ? parseInt(color.substr(7, 2), 16) / 255 : 1]
  }

  // convert named colors
  if (color.indexOf('rgb') === -1) {
    // intentionally use unknown tag to lower chances of css rule override with !important
    const elem = document.body.appendChild(document.createElement('fictum'))
    // this flag tested on chrome 59, ff 53, ie9, ie10, ie11, edge 14
    const flag = 'rgb(1, 2, 3)'
    elem.style.color = flag
    // color set failed - some monstrous css rule is probably taking over the color of our object
    if (elem.style.color !== flag) return
    elem.style.color = color
    if (elem.style.color === flag || elem.style.color === '') return // color parse failed
    color = window.getComputedStyle(elem).color
    document.body.removeChild(elem)
  }

  // convert 'rgb(R,G,B)' to 'rgb(R,G,B,A)' which looks awful but will pass the regxep below
  if (color.indexOf('rgb') === 0) {
    if (color.indexOf('rgba') === -1) color = `${color}, 1`
    return color.match(/[\.\d]+/g).map(a => +a) // eslint-disable-line
  }
}

export const mixTwoColors = (colorA, colorB, range = 0.5) => {
  colorA = colorStringToRgbaArray(colorA)
  colorB = colorStringToRgbaArray(colorB)
  return mixTwoRgba(colorA, colorB, range)
}

export const hexToRgb = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  return `rgb(${r},${g},${b})`
}

export const hexToRgbArray = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  return [r, g, b]
}

export const rgbToHex = (r, g, b) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const rgbArrayToHex = ([r, g, b]) => {
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export const hexToRgba = (hex, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

export const mixTwoRgb = (colorA, colorB, range = 0.5) => {
  const arr = []
  for (let i = 0; i < 3; i++) {
    arr[i] = Math.round(
      colorA[i] + (
        (colorB[i] - colorA[i]) * range
      )
    )
  }
  return `rgb(${arr})`
}

export const getColorShade = (col, amt) => {
  const num = parseInt(col, 16)

  let r = (num >> 16) + amt

  if (r > 255) r = 255
  else if (r < 0) r = 0

  let b = ((num >> 8) & 0x00FF) + amt

  if (b > 255) b = 255
  else if (b < 0) b = 0

  let g = (num & 0x0000FF) + amt

  if (g > 255) g = 255
  else if (g < 0) g = 0

  return (g | (b << 8) | (r << 16)).toString(16)
}

export const mixTwoRgba = (colorA, colorB, range = 0.5) => {
  const arr = []
  for (let i = 0; i < 4; i++) {
    const round = (i === 3) ? x => x : Math.round
    arr[i] = round(
      (colorA[i] + (
        (colorB[i] - colorA[i]) * range
      ))
    )
  }
  return `rgba(${arr})`
}

export const opacify = (color, opacity) => {
  const arr = colorStringToRgbaArray(color)
  if (!arr) return console.warn(color + 'color is not rgba')
  arr[3] = opacity
  return `rgba(${arr})`
}

export const getDefaultOrFirstKey = (LIBRARY, key) => {
  if (LIBRARY[key]) return LIBRARY[key].value
  if (LIBRARY.default) return LIBRARY[LIBRARY.default].value
  return LIBRARY[Object.keys(LIBRARY)[0]].value
}

export const getFontFormat = url => url.split(/[#?]/)[0].split('.').pop().trim()

export const setCustomFont = (name, weight, url) => `@font-face {
  font-family: '${name}';
  font-style: normal;
  font-weight: ${weight};
  src: url('${url}') format('${getFontFormat(url)}');
}`
// src: url('${url}') format('${getFontFormat(url)}');

export const getFontFaceEach = (name, weightsObject) => {
  const keys = Object.keys(weightsObject)
  const weightsJoint = keys.map(key => {
    const { fontWeight, url } = weightsObject[key]
    return setCustomFont(name, fontWeight, url)
  })
  return weightsJoint.join('\n')
}

export const getFontFace = LIBRARY => {
  const keys = Object.keys(LIBRARY)
  const fontsJoint = keys.map(key => getFontFaceEach(key, LIBRARY[key].value))
  return fontsJoint.join('\n')
}

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
  15: 'P'
}

const setSequenceValue = ({ key, variable, value, scaling, state, index }) => {
  state.sequence[variable] = {
    key,
    decimal: Math.round(value * 100) / 100,
    val: Math.round(value),
    scaling,
    index
  }
  state.scales[variable] = scaling
}

export const generateSubSequence = ({ key, base, value, ratio, variable, state }) => {
  const next = value * ratio
  const smallscale = (next - value) / ratio

  const valueRounded = Math.round(value)
  const nextRounded = Math.round(next)
  const diffRounded = nextRounded - valueRounded

  let arr = []
  const first = next - smallscale
  const second = value + smallscale
  const middle = (first + second) / 2
  if (diffRounded > 100) arr = [first, middle, second]
  else arr = [first, second]
  // else if (diffRounded > 2) arr = [first, second]
  // else if (diffRounded > 1) arr = [middle]

  arr.map((v, k) => {
    const scaling = Math.round(v / base * 1000) / 1000
    const newVar = variable + (k + 1)

    return setSequenceValue({ key: key + (k + 1), variable: newVar, value: v, scaling, state })
  })
}

export const generateSequence = ({ type, base, ratio, range, subSequence, ...state }) => {
  const n = Math.abs(range[0]) + Math.abs(range[1])
  const prefix = '--' + type + '-'
  for (let i = 0; i <= n; i++) {
    const key = range[1] - i
    const letterKey = numToLetterMap[key]
    const value = base * Math.pow(ratio, key)
    const scaling = Math.round(value / base * 1000) / 1000
    const variable = prefix + letterKey

    setSequenceValue({ key: letterKey, variable, value, scaling, state, index: key })

    if (subSequence) generateSubSequence({ key: letterKey, base, value, ratio, variable, state })
  }
  return state
}

export const fallBack = ({ type, prop, val = 'A', prefix = '--font-size-' }) => {
  if (typeof val !== 'string') console.warn(prop, val, 'is not a string')

  // const startsWithLetterRegex = /^[a-zA-Z]/i
  const startsWithLetterRegex = /^-?[a-zA-Z]/i
  // const hasLetter = /[A-Za-z]+/.test(val)
  const startsWithLetter = startsWithLetterRegex.test(val)
  if (!startsWithLetter) return ({ [prop]: val })

  const letterVal = val.toUpperCase()
  const isNegative = letterVal.slice(0, 1) === '-' ? '-' : ''
  const simplyLetterVal = isNegative ? letterVal.slice(1) : letterVal

  const value = type ? type[prefix + simplyLetterVal] : null
  if (!value) return console.warn('can\'t find', type, prefix + simplyLetterVal, simplyLetterVal)

  return ({
    [prop]: isNegative + value.val + UNIT.default,
    [prop]: isNegative + value.scaling + 'em'
  })
}

export const Arrayize = val => {
  const isString = typeof val === 'string'
  if (isString) return val.split(' ')
  if (isObject(val)) return Object.keys(val).map(v => val[v])
  if (isArray(val)) return val
}

export const findHeadings = (TYPOGRAPHY) => {
  const { h1Matches, type, sequence } = TYPOGRAPHY
  return new Array(6).fill(null).map((_, i) => {
    const findLetter = numToLetterMap[h1Matches - i]
    return sequence[`--${type}-${findLetter}`]
  })
}
