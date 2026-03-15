'use strict'

import { color, gradient } from './color'
import { theme } from './theme'
import { typography } from './typography'
import { spacing } from './spacing'
import { font, font_family } from './font'
import { media } from './media'
import { timing } from './timing'

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
