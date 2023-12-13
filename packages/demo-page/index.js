'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Colors, Typography, Shadows, Icons, Spacing, Shapes } from './articles'

export const DemoPage = {
  extend: Flex,
  tag: 'main',
  props: {
    theme: 'document',
    position: 'relative',
    flow: 'column',
    overflow: 'hidden auto',
    height: '100%',
    width: '100%',
    '@tabletM': {
      fontSize: 'Z1'
    },
    '> article': {
      flow: 'column',
      '> header': {
        border: 'solid, white .15',
        borderWidth: '.5px 0 .5px 0'
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
