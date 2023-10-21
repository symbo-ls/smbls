'use strict'

import { CommonButton } from '@symbo.ls/button'

export const UploadButton = {
  extend: CommonButton,
  props: {
    position: 'relative',
    theme: 'transparent',
    padding: '0',
    color: '#0474F2',
    boxSize: 'fit-content fit-content',
    overflow: 'hidden',
    cursor: 'pointer'
  },

  caption: {
    props: {
      text: 'Choose file'
    }
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
  }
}

export const UploadButtonWithBackground = {
  extend: UploadButton,
  props: {
    fontFamily: 'Avenir',
    theme: 'primary',
    color: 'white',
    padding: 'Z2 A2'

  },
  caption: { props: { text: 'Browse files' } }
}
