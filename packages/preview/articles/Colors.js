'use strict'

import { ColorBlock } from '../blocks'

export const Colors = {
  tag: 'article',
  display: 'flex',

  margin: 'auto',
  minWidth: '100%',

  Banner: {
    tag: 'header',

    Title: { text: 'Colors' },

    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: [
          {
            text: 'Brand color pallete'
          },
          {
            text: 'Semantic colors'
          },
          {
            text: 'Theming'
          }
        ]
      }
    }
  },

  Flex: {
    flow: 'column',
    overflow: 'auto',
    padding: '- D E D',
    '@mobileM': { padding: '- C' },
    '@mobileS': { padding: '- B' },

    childExtends: ColorBlock,

    pallete: {
      Title: { text: 'Color pallete' },
      Paragraph: {
        children: ({ context }) => {
          const { COLOR } = context.designSystem
          return Object.keys(COLOR)
            .filter(v => COLOR[v].value)
            .map(v => ({
              Color: { background: v },
              Description: {
                Title: { text: v },
                Value: { text: COLOR[v].value },
                Var: { text: COLOR[v].var }
              }
            }))
        }
      }
    },

    semantics: {
      Title: { text: 'Themes' },
      Paragraph: {
        childProps: { theme: 'dialog' },
        ...[{}, {}, {}, {}, {}, {}, {}, {}]
      }
    }
  }
}
