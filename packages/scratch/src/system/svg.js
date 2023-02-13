'use strict'

import { generateSprite, convertSvgToSymbol } from "../utils"
import { getActiveConfig } from '../factory'

const DEF_OPTIONS = {
  document: document
}

export const setSVG = (val, key) => {
  const CONFIG = getActiveConfig()
  if (CONFIG.useSvgSprite) {
    return convertSvgToSymbol(key, val)
  } return val
}

export const appendSVGSprite = (LIBRARY, options = DEF_OPTIONS) => {
  const CONFIG = getActiveConfig()
  const svgSpriteDOM = document.createElement('template')


  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.SVG
  for (let key in LIBRARY) lib[key] = CONFIG.SVG[key]
  
  const SVGsprite = generateSprite(lib)
  svgSpriteDOM.innerHTML = SVGsprite

  const doc = options.document || document
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
  const iconsSpriteDOM = document.createElement('template')
  
  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.ICONS
  for (let key in LIBRARY) lib[key] = CONFIG.ICONS[key]
  
  const SVGsprite = generateSprite(lib)
  iconsSpriteDOM.innerHTML = SVGsprite

  const doc = options.document || document
  doc.body.appendChild(iconsSpriteDOM.content)
}
