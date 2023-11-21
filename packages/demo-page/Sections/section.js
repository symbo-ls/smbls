'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const DemoSection = {
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
      '@tabletS<': { alignItems: 'flex-end' },
      letterSpacing: '.2em',
      padding: '- Z1',
      textTransform: 'uppercase',
      style: {
        // writingMode: 'vertical-rl',
        // textOrientation: 'mixed',
        // transform: 'rotate(180deg)'
      }
    }
  },
  Paragraph: {
    props: {
      // flex: '1',

    }
  }
}
