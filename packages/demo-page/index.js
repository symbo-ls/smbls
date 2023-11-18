'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Colors, Typography, Shadows, Icons, Spacing, Shapes } from './Articles'

export const DemoPage = {
  extend: Flex,
  tag: 'main',
  props: {
    theme: 'document',
    position: 'relative',
    flow: 'column',
    // gap: 'Z',
    overflow: 'hidden auto',
    height: '100%',
    width: '100%',
    // border: '1px solid red',
    '> article': {
      // border: '1px solid orange',
      flow: 'column',
      '> header': {
        // border: '1px solid green'
      },
      '> section': {
        // border: '1px solid blue'
      },
      // '> div': { border: '1px solid white' },
      '> div > section': {
        // border: '1px solid blue'
      }
    }
  },

  Colors,
  Typography,
  Shadows,
  Shapes,
  Icons,
  Spacing
}
