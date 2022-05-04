'use strict'

import * as CONFIG from './config'
import { deepMerge, merge } from './utils'

export const RESET = {}

export const applyReset = (reset = {}) => deepMerge(merge(RESET, reset), {
  html: {
    position: 'absolute',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    top: '0',
    left: '0',
    margin: '0',
    WebkitFontSmoothing: 'antialiased',

    fontFamily: CONFIG.DOCUMENT.fontFamily,

    fontSize: CONFIG.DOCUMENT.fontSize / CONFIG.TYPOGRAPHY.default + CONFIG.UNIT.default,
    lineHeight: CONFIG.DOCUMENT.lineHeight
  },

  body: {
    boxSizing: 'border-box',
    height: '100%',
    margin: 0
  },

  ...CONFIG.TYPOGRAPHY.styles,

  // form elements
  fieldset: {
    border: 0,
    padding: 0,
    margin: 0
  }
})
