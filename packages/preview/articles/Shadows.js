'use strict'

import { Flex, Banner } from '@symbo.ls/uikit'
import { shadow } from '../blocks'

export const Shadows = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,

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
    extend: shadow
  }
}
