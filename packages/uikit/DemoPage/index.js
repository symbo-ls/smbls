'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Typography, Colors, Icons, Shapes } from './Articles'

export const DemoPage = {
  extend: Flex,
  props: {
    theme: 'document',
    position: 'relative',
    gap: 'A1',
    overflow: 'hidden auto',
    height: '100%',
    width: '100%'
  },

  Flex: {
    props: {
      flex: '1',
      flow: 'column',
      overflowY: 'auto',
      scrollBehavior: 'smooth',
      maxHeight: '100%',
      gap: 'E1+X',

      '::-webkit-scrollbar': { display: 'none' },

      '> section': {
        minWidth: '100%'
      }
    },

    Typography,
    Colors,
    Icons,
    Shapes
  }
}
