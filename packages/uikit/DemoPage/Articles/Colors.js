'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Color } from '../Sections'

export const Colors = {
  tag: 'section',
  extend: Flex,
  attr: { id: 'colors' },
  props: {
    flow: 'column',
    margin: '- - - -'
  },

  Banner: {
    props: { round: '0 Z Z 0' },
    Title: {
      props: {
        text: 'Colors',
        padding: '- - W1 -'
      }
    },
    Paragraph: {
      props: { alignItems: 'flex-end' },
      list: {
        Title: { text: 'What you’ll find' },
        Paragraph: {
          ...[
            { text: 'Primary colors' },
            { text: 'Secondary colors' },
            { text: 'Greyscale' },
            { text: 'System colors' },
            { text: 'Background colors' }
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
      padding: 'E - - C1',
      gap: 'E'
    },
    childExtend: Color,
    ...[
      {
        TitleParagraph: {
          Title: { props: { text: 'Primary Colors' } }
        },
        Grid: {
          ...[{}, {}, {}, {}, {}, {}]
        }
      },
      {
        TitleParagraph: {
          Title: { props: { text: 'Secondary Colors' } }
        },
        Grid: {
          ...[{}, {}, {}, {}, {}, {}]
        }
      },
      {
        TitleParagraph: {
          Title: { props: { text: 'Greyscale' } }
        },
        Grid: {
          props: { columns: 'repeat(4, 1fr)' },
          ...[{}, {}, {}, {}, {}, {}, {}, {}]
        }
      },
      {
        TitleParagraph: {
          Title: { props: { text: 'System Colors' } }
        },
        Grid: {
          props: { columns: 'repeat(4, 1fr)' },
          ...[{}, {}, {}, {}, {}, {}, {}, {}]
        }
      },
      {
        TitleParagraph: {
          Title: { props: { text: 'Background Colors' } }
        },
        Grid: {
          props: {
            columns: 'repeat(2, 1fr)',
            minHeight: '350px'
          },
          ...[{}, {}]
        }
      }
    ]
  }
}
