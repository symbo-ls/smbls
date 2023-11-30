'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Hgroup = {
  extend: Flex,
  tag: 'hgroup',

  props: { flow: 'column', gap: 'Y' },

  Title: {
    extend: Flex,
    props: {
      fontWeight: '700',
      alignItems: 'center'
    }
  },

  Paragraph: {
    extend: Flex,
    props: {
      margin: '0',
      color: 'caption',
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

export const HgroupRows = {
  extend: Hgroup,

  Title: {
    extend: Flex,
    props: { color: 'title', align: 'center space-between' }
  },

  Paragraph: {
    extend: Flex,
    props: { color: 'paragraph', align: 'center space-between' }
  }
}

export const HgroupButton = {
  extend: HgroupRows,

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
