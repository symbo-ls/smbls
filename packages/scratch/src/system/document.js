'use strict'

import { merge } from '@domql/utils'
import { getActiveConfig } from '../factory.js'
import { getDefaultOrFirstKey } from '../utils'

export const applyDocument = () => {
  const CONFIG = getActiveConfig()
  const { DOCUMENT, FONT_FAMILY, THEME, TYPOGRAPHY } = CONFIG
  return merge(DOCUMENT, {
    theme: THEME.document,
    fontFamily: getDefaultOrFirstKey(FONT_FAMILY),
    fontSize: TYPOGRAPHY.base,
    lineHeight: TYPOGRAPHY.lineHeight
  })
}
