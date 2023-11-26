'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Banner } from '@symbo.ls/banner'
import { color } from '../Sections'

export const Colors = {
  tag: 'article',
  extend: Flex,
  props: {
    margin: 'auto',
    minWidth: '100%'
  },

  Header: {
    tag: 'header',
    extend: Banner,
    Title: { text: 'Colors' },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[{
            props: { text: 'Brand font' }
          }, {
            props: { text: 'Functional font' }
          }]
        }
      }
    }
  },

  Flex: {
    props: {
      flow: 'column',
      overflow: 'auto',
      padding: '- D E D',
      '@mobileM': { padding: '- C' },
      '@mobileS': { padding: '- B' }
    },
    childExtend: color,
    ...[
      {
        Title: { props: { text: 'Color pallete' } },
        Paragraph: {
          $collection: ({ context }) => {
            const { COLOR } = context.designSystem
            return Object.keys(COLOR).map(v => ({
              props: {
                Color: { background: v }
              }
            }))
          }
        }
      },

      {
        Title: { props: { text: 'Themes' } },
        Paragraph: {
          props: {
            childProps: { theme: 'dialog' }
          },
          ...[
            {}, {}, {}, {}, {}, {}, {}, {}
          ]
        }
      }
    ]
  }

  // Flex: {
  //   childExtend: Color,
  //   ...[
  //     {
  //       TitleParagraph: { Title: { props: { text: 'Primary Colors' } } },
  //       Grid: {
  // $collection: ({ context }) => {
  //   const { COLOR } = context.designSystem
  //   return Object.keys(COLOR).map(v => ({
  //     props: {
  //       background: v
  //     }
  //   }))
  // }
  //       }
  //     },

  //     {
  //       TitleParagraph: { Title: { props: { text: 'Secondary Colors' } } },
  //       Grid: { ...[{}, {}, {}, {}, {}, {}] }
  //     }
  //   ]
  // }
}
