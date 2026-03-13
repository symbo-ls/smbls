'use strict'

import { DEFAULT_ICONS } from '@symbo.ls/default-icons'
import { color, gradient } from './color.js'
import { theme } from './theme.js'
import { typography } from './typography.js'
import { spacing } from './spacing.js'
import { font, font_family } from './font.js'
import { media } from './media.js'
import { timing } from './timing.js'

export const DEFAULT_CONFIG = {
  version: '0.0.1',
  color,
  gradient,
  theme,
  typography,
  spacing,
  font,
  font_family,
  timing,
  icons: DEFAULT_ICONS,
  media,
  reset: {
    html: {},
    body: {}
  },
  animation: {
    fadeIn: {
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      }
    }
  },
  devices: {},
  cases: {},
  class: {},
  svg: {} // TODO: Check with @nikoloza on this
}

export default DEFAULT_CONFIG
