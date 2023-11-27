'use strict'

import { FlexButton } from '@symbo.ls/button'

export const UploadButton = {
  extend: FlexButton,

  props: {
    position: 'relative',
    padding: '0',
    theme: 'secondary @{globalTheme} .color-only',
    boxSize: 'fit-content fit-content',
    cursor: 'pointer'
  },

  Input: {
    type: 'file',
    inset: '0 0 0 0',
    position: 'absolute',
    boxSize: '100% 100%',
    top: '0',
    left: '0',
    opacity: '0',
    cursor: 'pointer'
  },
  Text: 'Browse files'
}

export const UploadButtonWithBackground = {
  extend: UploadButton,
  props: {
    theme: 'secondary',
    padding: 'Z2 A1'
  },
  Text: 'Browse files'
}
