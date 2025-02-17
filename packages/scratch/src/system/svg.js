'use strict'

import { document } from '@domql/utils'
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

  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.SVG
  for (const key in LIBRARY) lib[key] = CONFIG.SVG[key]

  appendSVG(lib, options)
}

export const setSvgIcon = (val, key) => {
  const CONFIG = getActiveConfig()
  if (CONFIG.useIconSprite && !CONFIG.SEMANTIC_ICONS?.[key]) {
    return setSVG(val, key)
  } return val
}

export const appendSvgIconsSprite = (LIBRARY, options = DEF_OPTIONS) => {
  const CONFIG = getActiveConfig()

  const lib = Object.keys(LIBRARY).length ? {} : CONFIG.ICONS
  for (const key in LIBRARY) lib[key] = CONFIG.ICONS[key]

  appendSVG(lib, options)
}

const createSVGSpriteElement = (options = { isRoot: true }) => {
  if (!document || !document.createElementNS) return
  const svgElem = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  if (options.isRoot) {
    svgElem.setAttribute('aria-hidden', 'true')
    svgElem.setAttribute('width', '0')
    svgElem.setAttribute('height', '0')
    svgElem.setAttribute('style', 'position:absolute')
    svgElem.setAttribute('id', 'svgSprite')
  }
  return svgElem
}

const appendSVG = (lib, options = DEF_OPTIONS) => {
  const CONFIG = getActiveConfig()
  const doc = options.document || document

  if (!doc || !doc.documentElement) {
    if (CONFIG.verbose) {
      console.warn('To append SVG sprites it should be run in browser environment')
    }
    return generateSprite(lib)
  }

  const exists = doc.querySelector('#svgSprite')
  const SVGsprite = generateSprite(lib)

  if (exists) {
    const tempSVG = createSVGSpriteElement({ isRoot: false })
    // const svgSpriteWithoutRoot = doc.createElement('template')
    tempSVG.innerHTML = SVGsprite
    exists.append(...tempSVG.children)
  } else {
    const svgSpriteDOM = createSVGSpriteElement()
    if (svgSpriteDOM && svgSpriteDOM.nodeType) {
      svgSpriteDOM.innerHTML = SVGsprite
      doc.body.prepend(svgSpriteDOM)
    }
  }
}
