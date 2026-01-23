'use strict'

import { DEFAULT_ICONS } from '@symbo.ls/default-icons'
import { COLOR, GRADIENT } from './color.js'
import { THEME } from './theme.js'
import { TYPOGRAPHY } from './typography.js'
import { SPACING } from './spacing.js'
import { FONT, FONT_FAMILY } from './font.js'
import { MEDIA } from './media.js'
import { TIMING } from './timing.js'

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
  ICONS: DEFAULT_ICONS,
  MEDIA,
  RESET: {
    html: {},
    body: {}
  },
  ANIMATION: {
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
  CLASS: {},
  SVG: {} // TODO: Check with @nikoloza on this
}

export default DEFAULT_CONFIG
