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
      align: 'center space-between',
      h5: {
        color: '#CFCFD1',
        fontSize: 'A'
      }
    },
    paragraph: {
      p: {
        margin: '0',
        color: '#818186',
        fontSize: 'Z'
      }
    }
  }
}

export const TitleParagraphWithButton = {
  extend: TitleParagraph,
  title: {
    h5: {},
    Button: { props: { icon: { name: 'x' } } }
  },
  paragraph: {},

  props: {
    title: {
      alignItems: 'center',
      Button: {
        background: 'transparent',
        color: 'white',
        padding: '0',
        icon: { fontSize: 'C' }
      }
    }

  }
}
