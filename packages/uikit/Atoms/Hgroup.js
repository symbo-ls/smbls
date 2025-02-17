'use strict'

export const Hgroup = {
  extends: 'Flex',
  tag: 'hgroup',

  flow: 'y',
  gap: 'Y2',

  H: {
    color: 'title',
    tag: 'h3',
    lineHeight: '1em',
    margin: '0'
  },
  P: {
    margin: '0',
    color: 'paragraph'
  }
}

export const HgroupRows = {
  extends: 'Hgroup',

  Title: {
    extends: 'Flex',
    color: 'title',
    align: 'center space-between'
  },

  Paragraph: {
    extends: 'Flex',
    color: 'paragraph',
    align: 'center space-between'
  }
}

export const HgroupButton = {
  extends: 'HgroupRows',

  Title: {
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

  Paragraph: {}
}
