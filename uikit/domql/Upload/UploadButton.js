'use strict'

import { Button } from '@symbo.ls/button'

export const UploadButton = {
  extend: Button,
  props: {
    text: 'Choose file',
    position: 'relative',
    padding: '0',
    color: '#0474F2',
    boxSize: 'fit-content fit-content',
    overflow: 'hidden',
    fontWeight: '500',
    background: 'transparent',
    cursor: 'pointer'
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
    text: 'Browse files',
    round: 'A'
  },

  Icon: {
    props: {
      name: 'upload',
      fontSize: 'B'
    }
  }
}
