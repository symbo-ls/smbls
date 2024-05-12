'use strict'

import ICONS from '@symbo.ls/default-icons'
import { COLOR, GRADIENT } from './color'
import { THEME } from './theme'
import { TYPOGRAPHY } from './typography'
import { SPACING } from './spacing'
import { FONT, FONT_FAMILY } from './font'
import { MEDIA } from './media'
import { TIMING } from './timing'

export const DEFAULT_CONFIG = {
  version: '0.0.1',
  COLOR,
  GRADIENT,
  THEME,
  TYPOGRAPHY,
  SPACING,
  FONT,
  FONT_FAMILY,
  TIMING,
  ICONS,
  MEDIA,
  ANIMATIONS: {
    fadeIn: {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    }
  },
  DEVICES: {},
  CASES: {},
  SVG: {} // TODO: Check with @nikoloza on this
}

export default DEFAULT_CONFIG
