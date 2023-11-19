'use strict'

import { Section } from './Section'

import { shadow } from './Shadow'

export const shape = {
  extend: shadow,
  props: {
    padding: 'F D1 F C2'
  },
  // props: { padding: 'G2 D2 F1 D1' },
  Title: {
    props: { text: '' }
  },
  Paragraph: {
    props: {
      gap: 'D',
      columns: 'repeat(4, 1fr)',
      childProps: {
        ':first-child': { round: 'A 0 0 0' },
        ':nth-child(2)': { round: 'E A 0 0' },
        ':nth-child(3)': {
          round: '100%',
          aspectRatio: '1/1'
        },
        ':nth-child(4)': { round: '0 D 0 A' },
        ':nth-child(5)': { round: '0 0 G 0' },
        ':nth-child(7)': { round: '0 0 E1 E1' },
        ':nth-child(8)': { round: 'G 0 0 0' }
      }
    },
    ...[
      {}, {}, {}, {}, {}, {}, {}, {}
    ]
  }
}
