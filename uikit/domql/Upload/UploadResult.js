'use strict'

import { Flex } from '@symbo.ls/atoms'

const props = {
  border: '.5px solid #57575C',
  boxSize: 'fit-content fit-content',
  gap: 'Y2',
  padding: 'Y2 Z Y2 Y2',
  background: '#141416',
  round: 'Z',
  content: {
    flow: 'column',
    align: 'flex-start flex-start',
    caption: {
      fontWeight: '700',
      padding: 'V2 - V2 -'
    },
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
  extend: Flex,
  props,

  FileIcon: {},

  content: {
    extend: Flex,
    caption: { text: 'Image.jpg' },
    loadingValues,
    UploadProgress: {}
  }
}
