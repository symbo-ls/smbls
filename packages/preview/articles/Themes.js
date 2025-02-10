'use strict'

import { ColorBlock } from '../blocks'

export const Themes = {
  tag: 'article',
  extends: 'Flex',

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
    childExtends: {
      extends: ColorBlock,
      Hgroup: {},
      Grid: {
        props: {
          columns: 'repeat(5, 1fr)',
          childProps: {
            theme: 'primary',
            border: 'none !important'
          }
        },
        childExtends: {
          extends: 'Flex',
          props: {
            flow: 'column',
            align: 'flex-start space-between',
            padding: 'Z1 Z2'
          },
          icons: {
            extends: 'Flex',
            props: {
              gap: 'B',
              align: 'center space-between',
              minWidth: '100%'
            },
            childExtends: 'Icon',
            $propsCollection: [
              { name: 'sun' },
              { name: 'moon' }
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
