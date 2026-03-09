'use strict'

import { isObject, isArray } from '@domql/utils'
import { arrayzeValue } from '@symbo.ls/smbls-utils'
import { getActiveConfig } from '../factory.js'

import {
  getDefaultOrFirstKey,
  getFontFaceEach,
  isGoogleFontsUrl,
  setCustomFontMedia,
  setFontImport,
  resolveFileUrl
} from '../utils'

export const setFont = (val, key) => {
  const CONFIG = getActiveConfig()
  const CSSvar = `--font-${key}`

  if (!val || (isArray(val) && !val[0])) return

  let fontFace
  if (val.isVariable) {
    const url = resolveFileUrl(val.url, CONFIG.files) || val.url
    if (isGoogleFontsUrl(url)) {
      fontFace = setFontImport(url)
    } else {
      fontFace = setCustomFontMedia(key, url, val.fontWeight, {
        fontStretch: val.fontStretch,
        fontDisplay: val.fontDisplay || 'swap'
      })
    }
  } else if (val[0]) {
    fontFace = getFontFaceEach(key, val, CONFIG.files)
  } else {
    const url = resolveFileUrl(val.url, CONFIG.files) || val.url
    fontFace = setCustomFontMedia(key, url)
  }

  return { var: CSSvar, value: val, fontFace }
}

export const getFontFamily = (key, factory) => {
  const CONFIG = getActiveConfig()
  const { FONT_FAMILY } = CONFIG
  return getDefaultOrFirstKey(factory || FONT_FAMILY, key)
}

export const setFontFamily = (val, key) => {
  const CONFIG = getActiveConfig()
  const { FONT_FAMILY, FONT_FAMILY_TYPES } = CONFIG
  let { value, type } = val
  if (val.isDefault) FONT_FAMILY.default = key

  if (isObject(value)) value = arrayzeValue(value)

  const CSSvar = `--font-family-${key}`
  const str = `${value.join(', ')}, ${FONT_FAMILY_TYPES[type]}`
  return { var: CSSvar, value: str, arr: value, type }
}
