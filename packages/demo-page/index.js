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
    // '> *:not(:nth-child(1))': { display: 'none' },
    '> article': {
      // border: '1px solid orange',
      flow: 'column',
      '> header': {
        border: 'solid, white .15',
        borderWidth: '.5px 0 .5px 0'
      },
      '> section': {
        // border: 'solid, white .15',
        // borderWidth: '0 0 .5px 0'
        // display: 'none'
      },
      // '> div': { border: '1px solid white' },
      '> div > section': {
        // border: 'solid, white .15',
        // borderWidth: '0 0 .5px 0'
        // display: 'none'
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
