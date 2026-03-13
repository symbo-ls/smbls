'use strict'

import { color, gradient } from './color.js'
import { theme } from './theme.js'
import { typography } from './typography.js'
import { spacing } from './spacing.js'
import { font, font_family } from './font.js'
import { icons } from './icons.js'
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
  icons,
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
  svg: {},
  grid: {},
  shape: {}
}

export default DEFAULT_CONFIG
