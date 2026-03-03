'use strict'

export const getDefaultOrFirstKey = (LIBRARY, key) => {
  if (LIBRARY[key]) return LIBRARY[key].value
  if (LIBRARY.default) return LIBRARY[LIBRARY.default].value
  const hasValue = Object.keys(LIBRARY)[0]
  return hasValue && LIBRARY[hasValue] && LIBRARY[hasValue].value
}

export const getFontFormat = (url) => {
  const ext = url.split(/[#?]/)[0].split('.').pop().trim()
  if (['woff2', 'woff', 'ttf', 'otf', 'eot'].includes(ext)) return ext
  return null
}

export const isGoogleFontsUrl = (url) =>
  url &&
  (url.includes('fonts.googleapis.com') || url.includes('fonts.gstatic.com'))

export const setFontImport = (url) => `@import url('${url}');`

export const setInCustomFontMedia = (str) => `@font-face { ${str} }`

export const setCustomFont = (name, url, weight, options = {}) => {
  const format = getFontFormat(url)
  const formatStr = format ? ` format('${format}')` : ''
  return `
  font-family: '${name}';
  font-style: normal;${
    weight
      ? `
  font-weight: ${weight};`
      : ''
  }${
    options.fontStretch
      ? `
  font-stretch: ${options.fontStretch};`
      : ''
  }${
    options.fontDisplay
      ? `
  font-display: ${options.fontDisplay};`
      : ''
  }
  src: url('${url}')${formatStr};`
}

export const setCustomFontMedia = (
  name,
  url,
  weight,
  options
) => `@font-face {${setCustomFont(name, url, weight, options)}
}`

export const getFontFaceEach = (name, weights) => {
  const keys = Object.keys(weights)
  return keys.map((key) => {
    const { url, fontWeight } = weights[key]
    return setCustomFont(name, url, fontWeight)
  })
}

export const getFontFace = (LIBRARY) => {
  const keys = Object.keys(LIBRARY)
  return keys.map((key) => getFontFaceEach(key, LIBRARY[key].value))
}

export const getFontFaceEachString = (name, weights) => {
  if (weights && weights.isVariable) {
    if (isGoogleFontsUrl(weights.url)) {
      return setFontImport(weights.url)
    }
    return setCustomFontMedia(name, weights.url, weights.fontWeight, {
      fontStretch: weights.fontStretch,
      fontDisplay: weights.fontDisplay || 'swap'
    })
  }
  const isArr = weights[0]
  if (isArr) return getFontFaceEach(name, weights).map(setInCustomFontMedia)
  return setCustomFontMedia(name, weights.url)
}

export const getFontFaceString = (LIBRARY) => {
  const keys = Object.keys(LIBRARY)
  return keys.map((key) => getFontFaceEachString(key, LIBRARY[key].value))
}
