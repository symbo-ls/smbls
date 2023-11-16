'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Font } from '../Sections'

export const Typography = {
  tag: 'article',
  extend: Flex,
  props: {
    flow: 'column'
  },

  Banner: {
    Title: { text: 'typography' },
    Paragraph: {
      list: {
        Title: { text: 'What you’ll find' },
        Paragraph: {
          ...[
            { text: 'Brand font' },
            { text: 'Functional font' }
          ]
        }
      }
    }
  },

  Flex: {
    props: {
      gap: 'C',
      flow: 'column',
      padding: 'E C1 - C1'
    },

    childExtend: {
      extend: Font,
      Title: {
        props: { text: '{{ name }}' }
      },
      Paragraph: {
        p: {
          extend: Flex,
          ...[
            { text: 'A dependable, universal font offering functionality and personality across various applications. Whether it\'s team collaboration, marketing endeavors, or product design for iOS, Android, or web, Helvetica Neue delivers consistency and legibility at every size and weight' },
            {
              text: ' When an alternative font, like DM Sans, is needed, Helvetica Neue ensures seamless transitions. Choose this timeless, reliable typeface for a polished, professional look in all your materials.'
            }
          ]
        },

        letters: {
          H1: { text: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
          H3: { text: 'abcdefghijklmopqrstuvwxyz' },
          P: { text: 'Quick brown fox jumps over lazy frog' }
        }
      }
    },

    $setStateCollection: ({ context }) => {
      const { FONT } = context.designSystem
      return Object.keys(FONT).map(v => ({
        name: v
      }))
    }
  }
}
