'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'

const Captions = {
  extend: Flex,
  props: {
    gap: 'Y2',
    align: 'center flex-start',
    childProps: {
      fontSize: 'Z1',
      color: '#A3A3A8',
      '&:first-child': { gap: 'V2' },
      '&:last-child': { gap: 'X' },
      '&:nth-child(2)': {
        boxSize: '3px 3px',
        background: '#A3A3A8',
        round: '100%'
      }
    }
  },
  childExtend: Flex,
  ...[
    {
      value: { text: '72' },
      text: '%'
    },
    {},
    {
      value: { text: '2' },
      text: 'Seconds left'
    }
  ]
}

export const UploadResult = {
  extend: [Flex],
  props: {
    // border: '1px solid #313141',
    theme: 'tertiary',
    gap: 'Z2',
    padding: 'Z Z2 Z Z',
    round: 'Z',
  },

  FileIcon: {
    background: 'white .05'
  },

  Flex: {
    props: {
      flow: 'column',
      align: 'flex-start flex-start'
    },
    H6: {
      color: 'currentColor',
      text: 'Image.jpg',
      fontWeight: '700',
      padding: 'V2 -'
    },
    Captions,
    UploadProgress: {
      margin: 'Z2 - X',

      '::-webkit-progress-bar': {
        theme: null,
        background: 'white .05'
      },
    }
  }
}
