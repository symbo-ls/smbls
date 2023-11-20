'use strict'

import { shadow } from './shadow'

export const shape = {
  extend: shadow,
  Title: null,
  Paragraph: {
    props: {
      gap: 'E',
      columns: 'repeat(4, 1fr)',
      childProps: {
        // border: 'solid, white .1',
        // borderWidth: '1px',
        style: {
          boxShadow: 'rgba(38, 57, 77, 0.12) 0px 2px 4px 0px, rgba(38, 57, 77, 0.32) 0px 2px 16px 0px'
        },
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
