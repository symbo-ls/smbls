'use strict'

import { shadow } from '../blocks'

export const Shadows = {
  tag: 'article',
  extends: 'Flex',

  Header: {
    tag: 'header',
    extends: 'Banner',

    Title: { text: 'Shadow' },
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

  Section: {
    extends: shadow
  }
}
