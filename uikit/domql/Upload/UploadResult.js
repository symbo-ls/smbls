'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Dialog } from '@symbo.ls/dialog'

const props = {
  border: '1px solid #313141',
  boxSize: 'fit-content fit-content',
  gap: 'Z2',
  padding: 'Y2 Z Y2 Y2',
  round: 'Z',
  content: {
    flow: 'column',
    align: 'flex-start flex-start',
    loadingValues: {
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
    }
  }
}

const loadingValues = {
  extend: Flex,
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
  extend: [Flex, Dialog],
  props,

  FileIcon: {},

  content: {
    extend: Flex,
    H6: {
      color: 'currentColor',
      text: 'Image.jpg',
      fontWeight: '700',
      padding: 'V2 -'
    },
    loadingValues,
    UploadProgress: {
      margin: 'Z2 - X'
    }
  }
}
