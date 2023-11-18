'use strict'

import { shadow } from './Shadow'

export const shape = {
  extend: shadow,
  props: { padding: 'E2 D2 F1 D1' },
  Title: {
    props: { text: '' }
  },
  Paragraph: {
    props: {
      gap: 'D',
      childProps: {
        // style: {
        //   boxShadow: 'rgba(38, 57, 77, 0.35) 0px 5px 15px'
        // },
        ':first-child': { round: 'A 0 0 0' },
        ':nth-child(2)': { round: 'E A 0 0' },
        ':nth-child(3)': {
          round: '100%',
          aspectRatio: '1/1'
        },
        ':nth-child(4)': { round: '0 D 0 A' },
        ':nth-child(5)': { round: '0 0 G 0' }
      }
    }

  }
}
