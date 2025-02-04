'use strict'

export const Hgroup = {
  tag: 'hgroup',
  extend: [
    'Flex'
  ],
  props: {
    flow: 'y',
    gap: 'Z'
  },
  H: {
    tag: 'h3',
    text: 'Heading',
    lineHeight: '1em',
    margin: '0'
  },
  P: {
    text: 'Paragraph',
    margin: '0',
    color: 'paragraph'
  }
}

export const HgroupRows = {
  extend: 'Hgroup',

  H: {
    extends: 'Flex',
    color: 'title',
    align: 'center space-between'
  },

  P: {
    color: 'paragraph', align: 'center space-between'
  }
}

export const HgroupButton = {
  extend: 'HgroupRows',

  H: {
    justifyContent: 'space-between',

    Span: {},

    Button: {
      background: 'transparent',
      color: 'currentColor',
      padding: '0',
      Icon: {
        name: 'x',
        fontSize: 'C'
      }
    }
  },

  P: {}
}
