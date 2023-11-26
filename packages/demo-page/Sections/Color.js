'use strict'

import { Grid } from '@symbo.ls/atoms'
import { DemoSection } from './section'

const ColorTemplate = {
  extend: 'Flex',

  Color: {
    aspectRatio: '1 / 1',
    theme: 'dialog',
    round: 'W'
  },

  Description: {}
}

export const color = {
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
      '@tabletS': { gap: 'C2' },
      '@mobileL': { gap: 'C1' },
      '@mobileM': { gap: 'B1' },
      '@mobileXS': { gap: 'A2' }
    },

    childExtend: ColorTemplate
  }
}
