'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const Section = {
  tag: 'section',
  extend: TitleParagraph,
  props: {
    flow: 'row',
    boxSizing: 'border-box',
    // padding: 'E D2 F1 D1',
    // theme: 'secondary',
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
      alignSelf: 'flex-start',
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
