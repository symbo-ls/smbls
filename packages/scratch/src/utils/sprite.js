'use strict'

import { isString } from '@domql/utils'

export const generateSprite = (icons) => {
  let sprite =
    '<svg aria-hidden="true" width="0" height="0" style="position:absolute">'

  for (let key in icons) {
    sprite += icons[key]
  }

  sprite += "</svg>"

  return sprite
}

const parseRootAttributes = (htmlString) => {
  if (!isString(htmlString)) {
    return console.warn(`parseRootAttributes: ${htmlString} is not a string`)
  }
  
  let match = htmlString.match(/<svg\s+(.*?)>/);
  if (!match || !match[1]) {
    return {};
  }

  let attrString = match[1];
  let attrs = attrString.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)["']?/gm);
  return attrs.reduce((acc, attr) => {
    let [key, value] = attr.split("=");
    acc[key] = value.replace(/['"]/g, "");
    return acc;
  }, {});
}

export const convertSvgToSymbol = (key, code) => {
  const extractAttrs = parseRootAttributes(code)
  const { width, height } = extractAttrs
  
  const viewBox = extractAttrs.viewBox || `0 0 ${width || 24} ${height || 24}`
  const xmlns = 'http://www.w3.org/2000/svg'

  let symbol = code.replace("<svg", 
    `<symbol id="${key}" xmlns="${xmlns}" viewBox="${viewBox}"`
  )
  symbol = symbol.replace(/width="[^\"]*/, "")
  symbol = symbol.replace(/height="[^\"]*/, "")
  symbol = symbol.replace("</svg", "</symbol")
  return symbol
}
