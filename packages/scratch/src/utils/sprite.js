'use strict'

import { isArray, isNotProduction, isString } from '@domql/utils'
import { getActiveConfig } from '../factory'

const isDev = isNotProduction()

export const generateSprite = icons => {
  const CONFIG = getActiveConfig()

  let sprite = ''

  for (const key in icons) {
    if (CONFIG.__svg_cache[key]) continue
    else CONFIG.__svg_cache[key] = true
    sprite += icons[key]
  }

  return sprite
}

const parseRootAttributes = htmlString => {
  const val = htmlString.default || htmlString
  if (!isString(val)) {
    if (isDev) console.warn('parseRootAttributes:', val, 'is not a string')
    return
  }

  const match = val.match(/<svg\s+(.*?)>/)
  if (!match || !match[1]) {
    return {}
  }

  const attrString = match[1]
  const attrs = attrString.match(
    /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gm
  )
  return attrs.reduce((acc, attr) => {
    const [key, value] = attr.split('=')
    acc[key] = value.replace(/['"]/g, '')
    return acc
  }, {})
}

const replaceIdsAndUrls = (code, key) => {
  const idRegex = /id="([^"]*)"/
  const urlRegex = /url\(#([^)]*)\)/g
  const matches = code.match(/id="([^"]*)"/g)
  let replacedCode = code
  if (isArray(matches)) {
    matches.forEach(() => {
      const randomKey = Math.floor(Math.random() * 100000)
      replacedCode = code
        .replace(idRegex, `id="${key}-${randomKey}"`)
        .replace(urlRegex, `url(#${key}-${randomKey})`)
    })
  }
  return replacedCode
}

export const convertSvgToSymbol = (key, code) => {
  const extractAttrs = parseRootAttributes(code)
  const { width, height } = extractAttrs

  const viewBox = extractAttrs.viewBox || `0 0 ${width || 24} ${height || 24}`
  const xmlns = 'http://www.w3.org/2000/svg'

  const replacedCode = replaceIdsAndUrls(code, key)

  let symbol = replacedCode.replace(
    '<svg',
    `<symbol id="${key}" xmlns="${xmlns}" viewBox="${viewBox}"`
  )

  symbol = symbol.replace(/width="[^"]*"/, '')
  symbol = symbol.replace(/height="[^"]*"/, '')
  symbol = symbol.replace('</svg', '</symbol')
  return symbol
}
