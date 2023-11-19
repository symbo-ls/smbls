'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { DotList } from '@symbo.ls/list'

export const Banner = {
  extend: TitleParagraph,
  props: {
    height: 'fit-content',
    padding: 'D2+X1 D1+Y D2 C2',
    width: '100%',
    theme: 'dialog',
    align: 'flex-start',
    gap: 'B1'
  },

  Title: {
    tag: 'h1',
    props: {
      textTransform: 'capitalize',
      fontSize: `${170 / 16}em`,
      fontWeight: '900',
      letterSpacing: '-0.035em',
      color: 'white',
      lineHeight: '.8em',
      gap: '0'
    }
  },

  Paragraph: {
    props: {
      flow: 'column',
      justifyContent: 'space-between',
      flex: '1',
      minWidth: '100%',
      position: 'relative',
      gap: 'A',
      ':before': {
        content: '""',
        position: 'absolute',
        boxSize: '0.3px 100%',
        theme: 'dialog',
        top: '0',
        round: 'C',
        background: 'white 0'
      }
    },

    P: {
      props: {
        text: 'Our typography system ranges from impactful brand type used in marketing applications to functional type used in product.',
        maxWidth: 'G1+B',
        letterSpacing: '.2px',
        lineHeight: '1.6em',
        margin: '0',
        padding: '- - - Z2',
        color: 'grey'
      }
    },

    Flex: {
      extend: TitleParagraph,
      props: {
        gap: 'A2',
        alignSelf: 'flex-end'
      },

      Title: {
        tag: 'h6',
        props: {
          text: 'What you’ll find',
          fontWeight: '400',
          color: 'grey',
          fontSize: 'Z2'
        }
      },

      Paragraph: {
        ...DotList,
        ...[{}]
      }
    }
  }
}
