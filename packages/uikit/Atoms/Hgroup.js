'use strict'

export const Hgroup = {
  extends: 'Flex',
  tag: 'hgroup',

  props: {
    flow: 'y',
    gap: 'Y2',

    Title: {
      fontWeight: '700',
      alignItems: 'center'
    },

    Paragraph: {
      margin: '0',
      color: 'caption',
      '> p': { margin: '0' }
    },

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
  },

  H: {},
  P: {},

  Title: {
    extends: 'Flex',
    if: ({ parent }) => parent.props.title,
    props: ({ parent }) => ({
      text: parent.props.title,
      lineHeight: '1em'
    })
  },

  Paragraph: {
    extends: 'Flex',
    if: ({ parent }) => parent.props.paragraph,
    props: ({ parent }) => ({
      text: parent.props.paragraph,
      margin: '0'
    })
  }
}

export const HgroupRows = {
  extends: 'Hgroup',

  Title: {
    extends: 'Flex',
    props: { color: 'title', align: 'center space-between' }
  },

  Paragraph: {
    extends: 'Flex',
    props: { color: 'paragraph', align: 'center space-between' }
  }
}

export const HgroupButton = {
  extends: 'HgroupRows',

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
