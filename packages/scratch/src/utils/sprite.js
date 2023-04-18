'use strict'

import { isString } from '@domql/utils'
import { getActiveConfig } from '../factory'

export const generateSprite = (icons) => {
  const CONFIG = getActiveConfig()

  let sprite = ''

  for (const key in icons) {
    if (CONFIG.__svg_cache[key]) continue
    else CONFIG.__svg_cache[key] = true
    sprite += icons[key]
  }

  return sprite
}

const parseRootAttributes = (htmlString) => {
  if (!isString(htmlString)) {
    return console.warn(`parseRootAttributes: ${htmlString} is not a string`)
  }

  const match = htmlString.match(/<svg\s+(.*?)>/)
  if (!match || !match[1]) {
    return {}
  }

  const attrString = match[1]
  const attrs = attrString.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gm)
  return attrs.reduce((acc, attr) => {
    const [key, value] = attr.split('=')
    acc[key] = value.replace(/['"]/g, '')
    return acc
  }, {})
}

export const convertSvgToSymbol = (key, code) => {
  const extractAttrs = parseRootAttributes(code)
  const { width, height } = extractAttrs

  const viewBox = extractAttrs.viewBox || `0 0 ${width || 24} ${height || 24}`
  const xmlns = 'http://www.w3.org/2000/svg'

  let symbol = code.replace('<svg',
    `<symbol id="${key}" xmlns="${xmlns}" viewBox="${viewBox}"`
  )
  symbol = symbol.replace(/width="[^"]*"/, '')
  symbol = symbol.replace(/height="[^"]*"/, '')
  symbol = symbol.replace('</svg', '</symbol')
  return symbol
}
