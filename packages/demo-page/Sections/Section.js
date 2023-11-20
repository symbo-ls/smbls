'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const Section = {
  tag: 'section',
  extend: TitleParagraph,
  props: {
    gap: 'A'
  },

  Title: {
    tag: 'h5',
    props: {
      fontSize: 'A',
      fontWeight: '500',
      alignSelf: 'flex-start',
      letterSpacing: '.2em',
      margin: '- - - A1',
      textTransform: 'uppercase',
      style: {
        // writingMode: 'vertical-rl',
        // textOrientation: 'mixed',
        // transform: 'rotate(180deg)'
      }
    }
  },
  Paragraph: { props: { flex: '1' } }
}
