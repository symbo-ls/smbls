'use strict'

import { Flex } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const Field = {
  extend: 'Flex',
  tag: 'label',
  props: {
    minWidth: 'F2+Z2',
    maxWidth: 'F2+Z2',
    minHeight: 'C+V',
    align: 'center flex-start',
    gap: 'Y',
    boxSizing: 'border-box',
    position: 'relative',

    Input: {
      padding: 'Z2 B2 Z2 B',
      flex: '1'
    },

    Button: {
      padding: '0',
      background: 'transparent',
      margin: '- - - auto',
      fontSize: 'Z2'
    }
  },

  Input: {
    placeholder: 'Placeholder'
  },

  Icon: {
    props: ({ parent }) => ({
      name: parent.props.icon,
      minWidth: 'A',
      margin: '- Z1 - -C',
      position: 'relative'
    })
  }
}

export const FieldTemplate = {
  extend: Field,
  Icon: { props: { name: 'info' } },
  Input: {},
  Button: { Icon: { name: 'eye' } }
}

export const FieldWithTitle = {
  extend: 'Flex',
  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    gap: 'Y1',
    // border: '.05px solid red',
    Hint: {
      color: 'gray 1 +64',
      align: 'center flex-start',
      fontSize: 'Z2',
      gap: 'Y',
      padding: 'W Y2 - Y2'
    }
  },

  Title: {
    props: {
      text: 'Label',
      lineHeight: '1em',
      color: 'title',
      fontWeight: '400',
      padding: '- Y1'
    }
  },

  Field: {
    extend: Field
  }
}

export const FieldWithTitleTemplate = {
  extend: FieldWithTitle,
  Title: {},
  Field: {
    Icon: { props: { name: 'info' } },
    Input: {},
    Button: { icon: 'eye' }
  },
  Hint: {
    extend: IconText,
    props: {
      icon: 'info',
      text: 'Description'
    }
  }
}
