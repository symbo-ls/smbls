'use strict'

import { shape } from '../blocks'

export const Shapes = {
  tag: 'article',
  display: 'flex',

  Header: {
    tag: 'header',
    extends: 'Banner',

    Title: {
      text: 'Shapes',
      lineHeight: '1.15em'
    },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[
            {
              text: 'Brand font'
            },
            {
              text: 'Functional font'
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
