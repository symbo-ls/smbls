'use strict'

import { Grid } from '@symbo.ls/uikit'
import { DefaultBlock } from './section'

export const icon = {
  extend: DefaultBlock,
  props: {
    padding: 'E D E1 D',
    '@mobileL': { padding: 'D C' },
    '@mobileS': { padding: 'D B' }
  },

  Title: null,
  Paragraph: {
    extend: Grid,
    props: {
      columns: 'repeat(7, 1fr)',
      gap: 'C',
      '@tabletS': { gap: 'B1' },
      '@mobileL': { gap: 'A2' },
      '@mobileM': { gap: 'A' },
      '@mobileS': { gap: 'Z' }
      // padding: 'E D E2 D'
    },
    childExtend: {
      extend: 'Flex',
      props: {
        align: 'center',
        aspectRatio: '1/1',
        theme: 'dialog',
        round: 'Z'
        // padding: 'D B'
      },
      Icon: {
        margin: 'auto',
        fontSize: 'D',
        '@mobileM': { fontSize: 'C' },
        '@mobileS': {
          fontSize: 'B1',
          round: 'X'
        }
      }
    },

    $collection: ({ context }) => {
      const { ICONS } = context.designSystem
      return Object.keys(ICONS).map(name => ({
        Icon: { name }
      }))
    }

  }
}
