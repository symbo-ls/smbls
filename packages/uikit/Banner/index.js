'use strict'

import { TitleParagraph } from '@symbo.ls/titleparagraph'
import { DotList } from '@symbo.ls/list'

export const Banner = {
  extend: TitleParagraph,
  props: {
    height: 'fit-content',
    padding: 'D2+Z D+Y2 D D',
    width: '100%',
    theme: 'dialog',
    align: 'flex-start',
    gap: 'B'

  },

  Title: {
    tag: 'h1',
    props: {
      textTransform: 'capitalize',
      fontSize: 'K3',
      fontWeight: '900',
      letterSpacing: '-0.035em',
      lineHeight: '.8em',
      gap: '0',
      // border: '2px solid red',
      maxWidth: 'fit-content'
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
      // border: '2px solid red',
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
        // maxWidth: 'G2_default',
        maxWidth: 'G1_default',
        lineHeight: '1.6em',
        color: 'grey'
      }
    },

    Flex: {
      extend: TitleParagraph,
      props: {
        gap: 'A2',
        '@mobileL<': { alignSelf: 'flex-end' },
        '@mobileL': { margin: 'C1 - -' }
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
