'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,
  props: { flow: 'column' },

  Title: {
    extend: Flex,
    props: { align: 'center space-between' },
    h5: {
      props: {
        text: 'Title',
        color: '#CFCFD1',
        fontSize: 'A'
      }
    }
  },

  Paragraph: {
    extend: Flex,
    p: {
      props: {
        text: 'Paragraph',
        margin: '0',
        color: '#818186',
        fontSize: 'Z'
      }
    }
  }
}

export const TitleParagraphWithButton = {
  extend: TitleParagraph,

  Title: {
    props: { justifyContent: 'space-between' },
    h5: {},
    Button: {
      props: {
        background: 'transparent',
        color: 'white',
        padding: '0',
        icon: {
          name: 'x',
          fontSize: 'C'
        }
      }
    }
  },
  Paragraph: {}
}
