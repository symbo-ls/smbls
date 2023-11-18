'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Banner } from '@symbo.ls/banner'

export const Spacing = {
  tag: 'article',
  extend: Flex,

  Header: {
    tag: 'header',
    extend: Banner,

    Title: {
      props: {
        text: 'Spacing',
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
  }
}
