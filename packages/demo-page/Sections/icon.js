'use strict'

import { Section } from './Section'

import { Grid } from '@symbo.ls/atoms'

export const icon = {
  extend: Section,

  Title: {
    props: { text: '' }
  },
  Paragraph: {
    extend: Grid,
    props: {
      columns: 'repeat(7, 1fr)',
      gap: 'Y'
    },
    childExtend: {
      extend: 'Flex',
      props: {
        align: 'center',
        // aspectRatio: '1/1',
        theme: 'dialog',
        round: 'Z',
        padding: 'D B'
      },
      Icon: {
        margin: 'auto',
        fontSize: 'D'
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
