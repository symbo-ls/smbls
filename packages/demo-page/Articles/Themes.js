'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Icon } from '@symbo.ls/icon'
import { ColorSection } from '../Sections'

export const Themes = {
  tag: 'article',
  extend: Flex,

  Banner: {
    Title: { props: { text: 'Themes' } },
    Paragraph: {
      props: {
        alignItems: 'flex-end'
      },
      list: {
        Title: { text: 'What you’ll find' },
        Paragraph: {
          ...[
            { text: 'Dark theme' },
            { text: 'Light theme' }
          ]
        }
      },
      P: {
        text: 'Our color palette is led by a bold, distinct primary color and rounded out by a select set of secondary colors that give depth and diversity to our designs.'
      }
    }
  },

  Flex: {
    props: {
      flow: 'column',
      padding: 'E C1 - C1',
      gap: 'E'
    },
    childExtend: {
      extend: ColorSection,
      Hgroup: {},
      Grid: {
        props: {
          columns: 'repeat(5, 1fr)',
          childProps: {
            theme: 'primary',
            border: 'none !important'
          }
        },
        childExtend: {
          extend: Flex,
          props: {
            flow: 'column',
            align: 'flex-start space-between',
            padding: 'Z1 Z2'
          },
          icons: {
            extend: Flex,
            props: {
              gap: 'B',
              align: 'center space-between',
              minWidth: '100%'
            },
            childExtend: Icon,
            ...[
              { props: { icon: 'sun' } },
              { props: { icon: 'moon' } }
            ]
          },
          title: {
            tag: 'h6',
            props: {
              text: 'primary',
              textTransform: 'capitalize',
              fontWeight: '500'
            }
          }
        },
        ...[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      }

    },
    ...[
      {
        Hgroup: {
          Title: { props: { text: 'Dark Theme' } }
        },
        Grid: {
        }
      }
    ]
  }
}
