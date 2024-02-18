'use strict'

import { DotList } from '@symbo.ls/list'

export const Banner = {
  extend: 'Hgroup',

  props: {
    height: 'fit-content',
    padding: 'D2+Z D+Y2 D D',
    width: '100%',
    theme: 'dialog',
    align: 'flex-start',
    gap: 'B',
    '@mobileL': { padding: 'C1 C' },
    '@mobileS': { padding: 'C1 B' }

  },

  Title: {
    tag: 'h1',
    props: {
      textTransform: 'capitalize',
      fontSize: 'L',
      fontWeight: '900',
      letterSpacing: '-0.035em',
      lineHeight: '.8em',
      gap: '0',
      '@mobileL': { fontSize: 'J2' },
      '@mobileM': { fontSize: 'J' },
      '@mobileS': { fontSize: 'I' },
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
      '@mobileL': {
        display: 'none'
      },
      // '@tabletS': { display: 'none' },
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
        color: 'grey',
        padding: '- Z',
        '@mobileL': {
          display: 'none'
        }
      }
    },

    Flex: {
      extend: 'Hgroup',
      props: {
        gap: 'A2',
        alignSelf: 'flex-end',
        '@mobileL': {
          alignSelf: 'flex-start',
          padding: '- A2'
        }
        // '@tabletS': { alignSelf: 'flex-start', padding: '- - - Z2' }
        // '@mobileL<': { alignSelf: 'flex-end' },
        // '@mobileL': { margin: 'C1 - -' }
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
