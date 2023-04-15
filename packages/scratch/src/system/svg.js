'use strict'

import { document } from '@domql/globals'
import { generateSprite, convertSvgToSymbol } from '../utils'
import { getActiveConfig } from '../factory.js'

const DEF_OPTIONS = {
  document
}

export const setSVG = (val, key) => {
  const CONFIG = getActiveConfig()
  if (!val) {
    if (CONFIG.verbose) console.warn('setSVG: val is not defined', key)
    return
  }
  if (CONFIG.useSvgSprite) {
    return convertSvgToSymbol(key, val)
  } return val
}

export const appendSVGSprite = (LIBRARY, options = DEF_OPTIONS) => {
  const CONFIG = getActiveConfig()
  const doc = options.document || document

  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.SVG
  for (const key in LIBRARY) lib[key] = CONFIG.SVG[key]

  const SVGsprite = generateSprite(lib)
  if (!doc) {
    console.warn('To append SVG sprites it should be run in browser environment')
    return SVGsprite
  }

  const svgSpriteDOM = doc.createElement('template')
  svgSpriteDOM.innerHTML = SVGsprite
  doc.body.appendChild(svgSpriteDOM.content)
}

export const setIcon = (val, key) => {
  const CONFIG = getActiveConfig()
  if (CONFIG.useIconSprite) {
    return setSVG(val, key)
  } return val
}

export const appendIconsSprite = (LIBRARY, options = DEF_OPTIONS) => {
  const CONFIG = getActiveConfig()
  const doc = options.document || document

  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.ICONS
  for (const key in LIBRARY) lib[key] = CONFIG.ICONS[key]

  const SVGsprite = generateSprite(lib)
  if (!doc) {
    console.warn('To append SVG Icon sprites it should be run in browser environment')
    return SVGsprite
  }

  const iconsSpriteDOM = doc.createElement('template')
  iconsSpriteDOM.innerHTML = SVGsprite
  doc.body.appendChild(iconsSpriteDOM.content)
}
