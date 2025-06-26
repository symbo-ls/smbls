'use strict'

import { ColorBlock } from '../blocks'

export const Themes = {
  tag: 'article',
  display: 'flex',

  Banner: {
    Title: { text: 'Themes' },
    Paragraph: {
      alignItems: 'flex-end',
      List: {
        Title: { text: 'What you’ll find' },
        Paragraph: {
          ...[{ text: 'Dark theme' }, { text: 'Light theme' }]
        }
      },
      P: {
        text: 'Our color palette is led by a bold, distinct primary color and rounded out by a select set of secondary colors that give depth and diversity to our designs.'
      }
    }
  },

  Flex: {
    flow: 'column',
    padding: 'E C1 - C1',
    gap: 'E',
    childExtends: {
      extends: ColorBlock,
      Hgroup: {},
      Grid: {
        columns: 'repeat(5, 1fr)',
        childProps: {
          theme: 'primary',
          border: 'none !important'
        },
        childExtends: {
          display: 'flex',
          flow: 'column',
          align: 'flex-start space-between',
          padding: 'Z1 Z2',
          Icons: {
            display: 'flex',
            gap: 'B',
            align: 'center space-between',
            minWidth: '100%',
            childExtends: 'Icon',
            children: [{ name: 'sun' }, { name: 'moon' }]
          },
          Title: {
            tag: 'h6',
            text: 'primary',
            textTransform: 'capitalize',
            fontWeight: '500'
          }
        },
        ...[{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
      }
    },
    ...[
      {
        Hgroup: {
          Title: { text: 'Dark Theme' }
        },
        Grid: {}
      }
    ]
  }
}
