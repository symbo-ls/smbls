'use strict'

import { deepMerge, merge } from '@domql/utils'
import { getActiveConfig } from '../factory.js'
import { getMediaTheme } from '.'

export const applyReset = (reset = {}) => {
  const CONFIG = getActiveConfig()
  const { CSS_VARS, RESET, TYPOGRAPHY, DOCUMENT } = CONFIG
  if (RESET) {
    if (RESET[':root']) {
      const configReset = RESET
      const configTemplates = TYPOGRAPHY.templates

      configReset.body = {
        ...getMediaTheme('document', `@${CONFIG.globalTheme}`),
        ...configTemplates.body
      }
      configReset.h1 = configTemplates.h1
      configReset.h2 = configTemplates.h2
      configReset.h3 = configTemplates.h3
      configReset.h4 = configTemplates.h4
      configReset.h5 = configTemplates.h5
      configReset.h6 = configTemplates.h6
    }

    const { body, ...templates } = TYPOGRAPHY.templates

    return deepMerge(merge(RESET, reset), {
      html: {
        position: 'absolute',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
        margin: '0',
        WebkitFontSmoothing: 'antialiased',
        transform: 'translate3d(0, 0, 1px)',
        scrollBehavior: 'smooth',

        fontSize: TYPOGRAPHY.browserDefault + 'px',

        fontFamily: DOCUMENT.fontFamily,
        lineHeight: DOCUMENT.lineHeight
      },

      body: {
        boxSizing: 'border-box',
        height: '100%',
        margin: 0,
        fontFamily: DOCUMENT.fontFamily,

        fontSize: TYPOGRAPHY.base / TYPOGRAPHY.browserDefault + CONFIG.UNIT.default,

        ...(CONFIG.useDocumentTheme ? getMediaTheme('document', `@${CONFIG.globalTheme}`) : {}),

        ...templates,
        ...body
      },

      // form elements
      fieldset: {
        border: 0,
        padding: 0,
        margin: 0
      },

      'select, input': {
        fontFamily: DOCUMENT.fontFamily
      }
    })
  }
}
