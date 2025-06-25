'use strict'

import { getFontSizeByKey, getFontFamily } from '@symbo.ls/scratch'

export const FONT_PROPS = {
  fontSize: (value) => {
    return getFontSizeByKey(value) || value
  },
  fontFamily: (value) => ({
    fontFamily: getFontFamily(value) || value
  }),
  fontWeight: (value) => ({
    fontWeight: value,
    fontVariationSettings: '"wght" ' + value
  })
}
