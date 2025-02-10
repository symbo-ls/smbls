'use strict'

import { ColorBlock } from '../blocks'

export const Colors = {
  tag: 'article',
  extends: 'Flex',

  props: {
    margin: 'auto',
    minWidth: '100%'
  },

  Banner: {
    tag: 'header',
    props: {},

    Title: { text: 'Colors' },

    Paragraph: {
      props: {},
      P: {},
      Flex: {
        props: {},
        Title: {},
        Paragraph: [{
          props: { text: 'Brand color pallete' }
        }, {
          props: { text: 'Semantic colors' }
        }, {
          props: { text: 'Theming' }
        }]
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

    childExtends: ColorBlock,

    pallete: {
      Title: { text: 'Color pallete' },
      Paragraph: {
        children: ({ context }) => {
          const { COLOR } = context.designSystem
          return Object.keys(COLOR).filter(v => COLOR[v].value)
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
  }
}
