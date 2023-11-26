'use strict'

import { Grid } from '@symbo.ls/atoms'
import { DemoSection } from './section'

const ColorTemplate = {
  extend: 'Flex',
  props: {
    gap: 'A'
  },

  Color: {
    boxSize: 'D1',
    aspectRatio: '1 / 1',
    theme: 'dialog',
    round: 'W'
  },

  Description: {
    extend: 'Flex',
    props: { gap: 'X', flow: 'column' },
    Title: { color: 'title' },
    Value: { margin: 'X - -', color: 'paragraph' },
    Var: { color: 'paragraph' }
  }
}

export const ColorSection = {
  extend: DemoSection,

  Title: {
    props: {
      text: 'Primary color',
      padding: 'C1 - B1 -'
    }
  },

  Paragraph: {
    extend: Grid,

    props: {
      columns: 'repeat(4, 1fr)',
      gap: 'D',
      '@tabletS': { columns: 'repeat(3, 1fr)' },
      '@mobileL': { columns: 'repeat(2, 1fr)' },
      '@mobileS': { columns: 'repeat(1, 1fr)' },
      '@mobileXS': { gap: 'A2' }
    },

    childExtend: ColorTemplate
  }
}
