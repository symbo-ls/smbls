'use strict'

import { CommonButton } from '@symbo.ls/button'

export const UploadButton = {
  extend: CommonButton,
  props: {
    position: 'relative',
    padding: '0',
    color: '#0474F2',
    boxSize: 'fit-content fit-content',
    overflow: 'hidden',
    fontWeight: '500',
    background: 'transparent',
    cursor: 'pointer',
    Caption: { text: 'Choose file' }
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

export const UploadButtonWithIcon = {
  extend: UploadButton,
  props: {
    gap: 'Z',
    color: 'white',
    background: '#0474F2',
    padding: 'A B',
    round: 'A'
  },

  Icon: {
    props: {
      name: 'upload',
      fontSize: 'B'
    }
  },
  Caption: { text: 'Browse files' }
}
