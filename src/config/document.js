'use strict'

import { FONT_FAMILY, THEME, TYPOGRAPHY } from '.'

export const DOCUMENT = {
  theme: THEME.document,
  fontFamily: FONT_FAMILY[Object.keys(FONT_FAMILY)[0]],
  fontSize: TYPOGRAPHY.base,
  lineHeight: TYPOGRAPHY.styles.lineHeight
}
