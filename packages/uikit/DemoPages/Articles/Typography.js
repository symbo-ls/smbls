'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Font } from '../Sections'

export const Typography = {
  tag: 'article',
  extend: Flex,
  attr: { id: 'typography' },
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
      padding: 'D2+Z - - C1'
    },

    childExtend: { extend: Font },
    ...[
      {
        Title: {
          props: { text: 'Avenir' }
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
            ...[
              { text: 'ABCDEFGHIJKLMN' },
              { text: 'OPQRSTUVWXYZ' },
              { text: 'abcdefghijklmop' },
              { text: 'qrstuvwxyz' }
            ]
          }
        }
      },

      {
        Title: {
          props: { text: 'Headliner' }
        },
        Paragraph: {
          p: {
            text: 'Our custom brand font, Headliner, calls back to the strong typography used in vintage concert posters and marquees. It should only be used in brand marketing headlines.'
          },
          letters: {
            ...[
              { text: 'ABCDEFGHIJKLMN' },
              { text: 'OPQRSTUVWXYZ' },
              { text: 'abcdefghijklmopqrs' },
              { text: 'tuvwxyz' }
            ]
          }
        }
      }
    ]
  }
}
