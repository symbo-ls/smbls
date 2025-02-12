'use strict'

import { DEFAULT_ICONS } from '@symbo.ls/default-icons'
import { COLOR, GRADIENT } from './color'
import { THEME } from './theme'
import { FONT, FONT_FAMILY } from './font'
import { MEDIA } from './media'
import { TIMING } from './timing'

export const DEFAULT_CONFIG = {
  version: '0.0.1',
  COLOR,
  GRADIENT,
  THEME,
  TYPOGRAPHY: {
    base: 16,
    ratio: 1.25,
    subSequence: true,
    templates: {}
  },
  SPACING: {
    base: 16,
    ratio: 1.618,
    subSequence: true
  },
  FONT,
  FONT_FAMILY,
  TIMING,
  ICONS: DEFAULT_ICONS,
  MEDIA,
  RESET: {
    html: {
    },
    body: {
    }
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
  SVG: {},
  GRID: {},
  SHAPE: {},
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
