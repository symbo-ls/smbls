'use strict'

import { DEFAULT_ICONS } from '@symbo.ls/default-icons'
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
  svg: {},
  grid: {},
  shape: {},
  useReset: true,
  useVariable: true,
  useFontImport: true,
  useIconSprite: true,
  useSvgSprite: true,
  useDefaultConfig: true,
  useDocumentTheme: true,
  verbose: false
}

export default DEFAULT_CONFIG
