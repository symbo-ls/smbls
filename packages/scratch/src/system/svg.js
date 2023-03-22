'use strict'

import { document } from '@domql/globals'
import { generateSprite, convertSvgToSymbol } from "../utils"
import { getActiveConfig } from '../factory.js'

const DEF_OPTIONS = {
  document: document
}

export const setSVG = (val, key) => {
  if (!val) {
    if (CONFIG.verbose) console.warn('setSVG: val is not defined', key)
    return
  }
  const CONFIG = getActiveConfig()
  if (CONFIG.useSvgSprite) {
    return convertSvgToSymbol(key, val)
  } return val
}

export const appendSVGSprite = (LIBRARY, options = DEF_OPTIONS) => {
  const CONFIG = getActiveConfig()
  const doc = options.document || document

  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.SVG
  for (let key in LIBRARY) lib[key] = CONFIG.SVG[key]
  
  if (!doc && CONFIG.verbose) {
    console.warn('To append SVG sprites it should be run in browser environment')
    return  generateSprite(lib)
  }

  appendSVG(lib, options)
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
  for (let key in LIBRARY) lib[key] = CONFIG.ICONS[key]
  
  if (!doc && CONFIG.verbose) {
    console.warn('To append SVG Icon sprites it should be run in browser environment')
    return generateSprite(lib)
  }

  appendSVG(lib, options)
}

const appendSVG = (lib, options = DEF_OPTIONS) => {
  const doc = options.document || document
  const exists = doc.querySelector('#svgSprite')
  if (exists) {
    const SVGsprite = generateSprite(lib, false)
    const svgSpriteWithoutRoot = doc.createElement('template')
    svgSpriteWithoutRoot.innerHTML = SVGsprite
    exists.prepend(svgSpriteWithoutRoot.content)
  } else {
    const SVGsprite = generateSprite(lib, true)
    const svgSpriteDOM = doc.createElement('template')
    svgSpriteDOM.innerHTML = SVGsprite
    doc.body.prepend(svgSpriteDOM.content)
  }
}