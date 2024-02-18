'use strict'

import { Flex, Banner } from '@symbo.ls/uikit'
import { shape } from '../blocks'

export const Shapes = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,

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
    extend: shape
  }
}
