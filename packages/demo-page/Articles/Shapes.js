'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Banner } from '@symbo.ls/banner'
import { shape } from '../Sections'

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
            props: { text: 'Brant font' }
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
