'use stric'

import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const Font = {
  tag: 'section',
  extend: TitleParagraph,
  props: {
    widthRange: '100%',
    gap: 'B2+Z'
  },

  Title: {
    props: {
      fontSize: 'C1',
      color: 'white .85',
      fontWeight: '900',
      gap: 'Z2',
      padding: '- B1+Z - -',
      ':after': {
        content: '""',
        height: '1px',
        flex: '1',
        display: 'block',
        background: 'white .2',
        round: 'C'
      }
    }
  },

  Paragraph: {
    props: {
      width: '100%',
      round: '0 C C 0',
      gap: 'C2',
      childProps: { flex: 1 }
    },

    p: {
      props: {
        maxWidth: 'G3+B',
        flex: 3,
        flow: 'column',
        gap: 'A',
        fontWeight: '400',
        letterSpacing: '.1px',
        fontSize: 'A',
        padding: 'X2 C C -',
        color: 'white .5'
      }
    },

    letters: {
      props: {
        theme: 'dialog',
        padding: 'B2 C2',
        wordWrap: 'break-word',
        flex: 5,
        overflow: 'hidden'
      }
    }
  }
}
