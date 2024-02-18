'use strict'

import { Colors, Typography, Shadows, Icons, Spacing, Shapes } from '../articles'

export const StyleguidePage = {
  extend: 'Flex',
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
    }
  },

  childExtend: {
    props: {
      flow: 'column',
      '> header': {
        border: 'solid, white .15',
        borderWidth: '.5px 0 .5px 0'
      },
      theme: null
    }
  },

  Colors,
  Typography,
  Shadows,
  Shapes,
  Icons,
  Spacing
}
