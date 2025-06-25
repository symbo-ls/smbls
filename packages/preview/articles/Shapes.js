'use strict'

import { shape } from '../blocks'

export const Shapes = {
  tag: 'article',
  display: 'flex',

  Header: {
    tag: 'header',
    extends: 'Banner',

    Title: {
      props: {
        text: 'Shapes',
        lineHeight: '1.15em'
      }
    },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[
            {
              props: { text: 'Brand font' }
            },
            {
              props: { text: 'Functional font' }
            }
          ]
        }
      }
    }
  },

  Section: {
    extends: shape
  }
}
