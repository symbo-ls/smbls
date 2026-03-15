'use strict'

import { icon } from '../blocks'

export const Icons = {
  tag: 'article',
  display: 'flex',

  Header: {
    tag: 'header',
    extends: 'Banner',
    Title: { text: 'Icons' },
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

  Section: { extends: icon }
}
