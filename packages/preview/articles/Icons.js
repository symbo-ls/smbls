'use strict'

import { icon } from '../blocks'

export const Icons = {
  tag: 'article',
  extend: 'Flex',

  Header: {
    tag: 'header',
    extend: 'Banner',
    Title: { text: 'Icons' },
    Paragraph: {
      P: {},
      Flex: {
        Title: {},
        Paragraph: {
          ...[{
            props: { text: 'Brand font' }
          }, {
            props: { text: 'Functional font' }
          }]
        }
      }
    }
  },

  Section: { extend: icon }
}
