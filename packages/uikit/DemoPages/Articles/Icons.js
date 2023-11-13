'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Icons = {
  tag: 'section',
  extend: Flex,
  attr: { id: 'icons' },
  props: {
    flow: 'column',
    margin: '- - G -'
  },

  Banner: {
    props: { round: '0 Z Z 0' },
    Title: {
      props: {
        text: 'Icons',
        padding: '- - W1 -'
      }
    },
    Paragraph: {
      list: {
        Title: { text: 'What you’ll find' },
        Paragraph: {
          ...[{ text: 'Icon library' }]
        }
      },
      P: {
        text: 'Our icons are inspired by the fluid design of our wordmarks and drawn from the same rounded shapes as our functional typeface with which they are most often paried, creating a seamless system from text to icon.',
        maxWidth: 'G2'
      }
    }
  },

  Flex: {
    props: {
      flow: 'column',
      padding: 'E - - C1',
      gap: 'A1'
    },

    TitleParagraph: {
      props: {
        flow: 'row'
      },
      Title: {
        props: {
          text: 'Library',
          fontSize: 'C',
          gap: 'Z2',
          padding: '- C - Y',
          fontWeight: '900',
          ':after': {
            content: '""',
            height: '1px',
            flex: '1',
            display: 'block',
            background: 'white .2',
            round: 'C'
          }

        }
      }
    },

    Grid: {
      props: {
        columns: 'repeat(8, 1fr)',
        height: '1500px',
        gap: 'Z',
        childProps: {
          theme: 'dialog',
          round: 'Z'
        }
      },

      ...[
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},
        {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}
      ]
    }
  }
}
