'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { DotList } from '@symbo.ls/list'

export const Banner = {
  extend: TitleParagraph,
  props: {
    height: 'fit-content',
    padding: 'D1 C2 C2 C1',
    width: '100%',
    theme: 'dialog',
    round: '0 0 Z 0'
  },

  Title: {
    tag: 'h1',
    props: {
      textTransform: 'capitalize',
      fontSize: `${120 / 16}em`,
      fontWeight: '900',
      padding: '- - X2 -'
    }
  },

  Paragraph: {
    props: {
      justifyContent: 'space-between',
      // gap: 'I',
      padding: 'B1 - - -',
      position: 'relative',
      ':before': {
        content: '""',
        position: 'absolute',
        boxSize: 'V 100%',
        theme: 'dialog',
        top: '0',
        round: 'C'
      }
    },

    list: {
      extend: TitleParagraph,
      props: {
        gap: 'Z2',
        margin: '0 - - Y',
        Paragraph: {
          childProps: {
            fontSize: 'Z1'
          }

        }

      },

      Title: {
        tag: 'h6',
        props: {
          fontSize: 'B'
        }
      },

      Paragraph: {
        ...DotList,
        ...[{}]
      }
    },
    P: {
      text: 'Our typography system ranges from impactful brand type used in marketing applications to functional type used in product. They come together to create a cohesive approach to how we communicate as a brand.',
      maxWidth: 'G3+C',
      margin: '0',
      letterSpacing: '.1px',
      padding: 'B - - Y',
      fontSize: 'Z2',
      lineHeight: '1.6em'
    }
  }
}
