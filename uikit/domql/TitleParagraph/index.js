'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,
  props: {
    flow: 'column',
    gap: 'Y'
  },

  Title: {
    tag: 'h3',
    props: ({ scope, parent }) => ({ text: parent.props.title })
  },

  Paragraph: {
    props: ({ scope, parent }) => ({ text: parent.props.paragraph })
  }
}

export const TitleParagraphRows = {
  extend: TitleParagraph,

  Title: {
    extend: Flex,
    props: { align: 'center space-between' }
  },

  Paragraph: {
    extend: Flex
  }
}

export const TitleParagraphButton = {
  extend: TitleParagraphRows,

  Title: {
    props: { justifyContent: 'space-between' },

    Span: {},
    Button: {
      props: {
        background: 'transparent',
        color: 'white',
        padding: '0',
        Icon: {
          name: 'x',
          fontSize: 'C'
        }
      }
    }
  },

  Paragraph: {}
}
