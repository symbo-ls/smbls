'use strict'

export const resolveFileUrl = (url, files) => {
  if (!url || !files) return null
  try { new URL(url); return null } catch (e) { }
  const file = files[url]
  if (file) return file.content && file.content.src
  return null
}

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

export const getFontFaceEach = (name, weights, files) => {
  const keys = Object.keys(weights)
  return keys.map((key) => {
    const { url, fontWeight } = weights[key]
    const resolvedUrl = resolveFileUrl(url, files) || url
    return setCustomFont(name, resolvedUrl, fontWeight)
  })
}

export const getFontFace = (LIBRARY) => {
  const keys = Object.keys(LIBRARY)
  return keys.map((key) => getFontFaceEach(key, LIBRARY[key].value))
}

export const getFontFaceEachString = (name, weights, files) => {
  if (weights && weights.isVariable) {
    const url = resolveFileUrl(weights.url, files) || weights.url
    if (isGoogleFontsUrl(url)) {
      return setFontImport(url)
    }
    return setCustomFontMedia(name, url, weights.fontWeight, {
      fontStretch: weights.fontStretch,
      fontDisplay: weights.fontDisplay || 'swap'
    })
  }
  const isArr = weights[0]
  if (isArr) return getFontFaceEach(name, weights, files).map(setInCustomFontMedia)
  const url = resolveFileUrl(weights.url, files) || weights.url
  return setCustomFontMedia(name, url)
}

export const getFontFaceString = (LIBRARY, files) => {
  const keys = Object.keys(LIBRARY)
  return keys.map((key) => getFontFaceEachString(key, LIBRARY[key].value, files))
}
