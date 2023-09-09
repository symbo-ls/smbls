'use strict'

import { Focusable, Flex } from '@symbo.ls/atoms'

export const UploadLabel = {
  extend: [Focusable, Flex],
  tag: 'label',

  props: {
    position: 'relative',
    theme: 'tertiary',
    flow: 'column',
    align: 'center center',
    round: 'A',
    cursor: 'pointer',
    border: '1.6px, dashed, white 0.1',
    padding: 'B B2'
  },

  Input: {
    props: {
      type: 'file',
      position: 'absolute',
      inset: '0 0 0 0',
      opacity: '1',
      visibility: 'hidden'
    }
  },

  Icon: {
    props: {
      name: 'upload',
      fontSize: 'B',
      opacity: '.2'
    }
  },

  P: {
    props: {
      text: ' or click and upload from your computer',
      flexFlow: 'column',
      flexAlign: 'center center',
      opacity: '.22',
      margin: '0'
    },
    Span: {
      text: 'Drag and drop your font file',
      display: 'block'
    }
  }
}
