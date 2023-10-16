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
      text: 'Choose file',
      fontSize: 'Z2',
      fontWeight: '500'
    }
  },

  Input: {
    type: 'file',
    inset: '0 0 0 0',
    border: '2px solid red',
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
    padding: 'Z2 A2',
    color: 'white',
    fontWeight: '400'
  },
  caption: { text: 'Browse files' }
}
