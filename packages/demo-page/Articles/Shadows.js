'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Banner } from '@symbo.ls/banner'

import { shadow } from '../Sections'

// import { Color } from '../Sections'

export const Shadows = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,

    Title: { text: 'Shadows' },
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
    extend: shadow
  }
}
