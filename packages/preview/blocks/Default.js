'use strict'

import { Hgroup } from '@symbo.ls/hgroup'

export const DefaultBlock = {
  tag: 'section',
  extend: Hgroup,
  props: {
    flow: 'row',
    boxSizing: 'border-box',
    // padding: 'E D2 F1 D1',
    gap: 'B'
    // border: '2px solid red'
    // minWidth: '100%'
  },

  Title: {
    tag: 'h5',
    props: {
      fontSize: 'B2',
      margin: '- - - B',
      padding: 'X - - -',
      // padding: '- - - X',
      // letterSpacing: '-0.02em',
      // padding: 'Z2 C X -',
      // padding: 'A - A C1+X',
      fontWeight: '900',
      '@tabletS<': { alignItems: 'flex-end' },
      letterSpacing: '0.07em',
      style: {
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)'
      }
    }

  },
  Paragraph: {
    props: { flex: '1' }
  }
}
