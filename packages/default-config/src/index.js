'use strict'

import { COLOR, GRADIENT } from './color'
import { THEME } from './theme'
import { TYPOGRAPHY } from './typography'
import { SPACING } from './spacing'
import { FONT, FONT_FAMILY } from './font'

import FEATHER_ICONS from '@symbo-ls/feather-icons'

export const DEFAULT_CONFIG = {
  version: '0.0.1',
  COLOR,
  GRADIENT,
  THEME,
  TYPOGRAPHY,
  SPACING,
  FONT,
  FONT_FAMILY,
  TIMING: {},
  ICONS: FEATHER_ICONS,
  MEDIA: {},
  DEVICES: {},
  CASES: {},
  SVG: {} // TODO: Check with @nikoloza on this
}

export default DEFAULT_CONFIG
