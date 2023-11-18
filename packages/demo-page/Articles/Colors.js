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
            props: { text: 'Brant font' }
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
      theme: 'secondary',
      padding: 'D D1 E1 D1',
      gap: 'D1',
      childProps: {
        theme: 'transparent',
        padding: '0',
        ':not(:last-child)': {
          // background: 'red'
        }
      }
    },
    childExtend: color,
    ...[
      {
        Title: { props: { text: 'Primary' } },
        Paragraph: {
          $collection: ({ context }) => {
            const { COLOR } = context.designSystem
            return Object.keys(COLOR).map(v => ({
              props: {
                background: v
              }
            }))
          }
        }
      },
      {
        Title: { props: { text: 'Secondary' } },
        Paragraph: {
          props: {
            childProps: { theme: 'dialog' }
          },
          ...[
            {}, {}, {},
            {}, {}
          ]
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
