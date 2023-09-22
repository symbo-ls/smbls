'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,
  props: {
    flow: 'column',
    gap: 'Y'
  },

  Title: {
    extend: Flex,
    props: { align: 'center space-between' },
    h5: {
      props: {
        text: 'Title',
        fontSize: 'A',
        lineHeight: '1em'
      }
    }
  },

  Paragraph: {
    extend: Flex,
    p: {
      props: {
        text: 'Paragraph',
        fontSize: 'Y',
        lineHeight: '1em',
        margin: '0',
        color: 'gray2'
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
