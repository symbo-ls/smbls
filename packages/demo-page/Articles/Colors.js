'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Banner } from '@symbo.ls/banner'
import { ColorSection } from '../Sections'

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

    childExtend: ColorSection,

    pallete: {
      Title: { text: 'Color pallete' },
      Paragraph: {
        $collection: ({ context }) => {
          const { COLOR } = context.designSystem
          console.log(COLOR)
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
