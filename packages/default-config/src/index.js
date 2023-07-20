'use strict'

import { COLOR, GRADIENT } from './color'
import { THEME } from './theme'
import { TYPOGRAPHY } from './typography'
import { SPACING } from './spacing'
import { FONT, FONT_FAMILY } from './font'

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
  ICONS: {},
  MEDIA: {
    tv: '(min-width: 2780px)',

    screenL: '(max-width: 1920px)',
    screenM: '(max-width: 1680px)',
    screenS: '(max-width: 1440px)',
    tabletL: '(max-width: 1366px)',
    tabletM: '(max-width: 1280px)',
    tabletS: '(max-width: 1024px)',
    mobileL: '(max-width: 768px)',
    mobileM: '(max-width: 560px)',
    mobileS: '(max-width: 480px)',
    mobileXS: '(max-width: 375px)',

    light: '(prefers-color-scheme: light)',
    dark: '(prefers-color-scheme: dark)',

    print: 'print'
  },
  DEVICES: {},
  CASES: {},
  SVG: {} // TODO: Check with @nikoloza on this
}

export default DEFAULT_CONFIG
