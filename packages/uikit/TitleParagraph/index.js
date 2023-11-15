'use strict'

import { Flex } from '@symbo.ls/atoms'

export const TitleParagraph = {
  extend: Flex,
  props: { flow: 'column', gap: 'Y' },

  Title: {
    extend: Flex,
    props: {
      lineHeight: '1em',
      fontWeight: '700',
      alignItems: 'center'
    }
  },

  Paragraph: {
    extend: Flex,
    props: {
      margin: '0',
      fontWeight: '400',
      color: 'gray4',
      '> p': { margin: '0' }
    }
  }

  // Title: {
  //   extend: Flex,
  //   props: ({ scope, parent }) => ({
  //     text: parent.props.title,
  //     lineHeight: '1em'
  //   })
  // },

  // Paragraph: {
  //   extend: Flex,
  //   props: ({ scope, parent }) => ({
  //     text: parent.props.paragraph,
  //     margin: '0'
  //   })
  // }
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
        color: 'currentColor',
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
