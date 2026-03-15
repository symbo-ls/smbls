'use strict'

import { shadow } from '../blocks'

export const Shadows = {
  tag: 'article',
  display: 'flex',

  Header: {
    tag: 'header',
    extends: 'Banner',

    Title: { text: 'Shadow' },
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
    extends: shadow
  }
}
