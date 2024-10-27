'use strict'

import { getFontSizeByKey, getFontFamily } from '@symbo.ls/scratch'

export const FONT_PROPS = {
  fontSize: (el) => {
    const { props } = el
    return props.fontSize ? getFontSizeByKey(props.fontSize) : null
  },
  fontFamily: ({ props }) => ({
    fontFamily: getFontFamily(props.fontFamily) || props.fontFamily
  }),
  fontWeight: ({ props }) => ({
    fontWeight: props.fontWeight,
    fontVariationSettings: '"wght" ' + props.fontWeight
  })
}
