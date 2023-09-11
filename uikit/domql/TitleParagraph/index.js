'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,
  title: {
    extend: Flex,
    h5: { props: { text: 'Title' } }
  },
  paragraph: {
    extend: Flex,
    p: { props: { text: 'Paragraph' } }
  },

  props: {
    flow: 'column',
    title: {
      align: 'center flex-start',
      h5: { color: '#CFCFD1' }
    },
    paragraph: {
      p: {
        margin: '0',
        color: '#818186'
      }
    }
  }
}
