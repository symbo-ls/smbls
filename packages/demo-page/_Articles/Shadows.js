'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Banner } from '@symbo.ls/banner'
import { shadow } from '../_Sections'

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
