'use stric'

import { TitleParagraph } from '@symbo.ls/titleparagraph'

export const Font = {
  tag: 'section',
  extend: TitleParagraph,
  props: { gap: 'B2+Z' },

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
      gap: 'C2'
    },

    p: {
      props: {
        maxWidth: 'G3+B',
        flow: 'column',
        gap: 'A',
        fontWeight: '400',
        letterSpacing: '.1px',
        fontSize: 'A',
        padding: 'Y - - -',
        color: 'white .5'
      }
    },

    letters: {
      props: {
        theme: 'dialog',
        padding: 'C2',
        round: 'Z',
        flex: '1',
        lineHeight: '3.8em',
        childProps: {
          ':first-child': {
            fontSize: 'L1',
            fontWeight: '900'
          },
          ':nth-child(2)': {
            fontSize: 'K2',
            fontWeight: '700'
          },
          ':nth-child(3)': {
            fontSize: 'J1',
            fontWeight: '500'
          },
          ':last-child': {
            fontSize: 'I',
            fontWeight: '100'
          }
        }
      }
    }
  }
}
