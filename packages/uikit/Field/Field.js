'use strict'

import { Flex, Focusable } from '@symbo.ls/atoms'
import { IconText } from '@symbo.ls/icon'

export const Field = {
  tag: 'label',
  extend: [Focusable, IconText],
  props: {
    minWidth: 'F2+Z2',
    maxWidth: 'F2+Z2',
    minHeight: 'C+V',
    align: 'center flex-start',
    gap: 'Y',
    boxSizing: 'border-box',
    padding: '- A - Z2',
    round: 'Z1',
    border: 'solid, gray .45 +80',
    borderWidth: '.8px',
    position: 'relative',
    ':focus-within': { outline: '1px solid #0474F2' },

    Icon: {
      fontSize: 'Z2'
    },

    Button: {
      padding: '0',
      background: 'transparent',
      margin: '- - - auto',
      fontSize: 'Z2'
    }
  },

  Input: {
    props: {
      fontSize: 'Z',
      fontWeight: '400',
      padding: '0',
      background: 'rgba(0, 0, 0, 0)',
      round: '0',
      color: 'title',
      fontFamily: 'avenir',
      placeholder: 'Placeholder',
      flex: '1',
      minHeight: '100%',
      outline: 'none !important',
      '::placeholder': { color: 'gray 1 +64' }
    }
  }
}

export const FieldTemplate = {
  extend: Field,
  Icon: { props: { name: 'info' } },
  Input: {},
  Button: { Icon: { name: 'eye' } }
}

export const FieldWithTitle = {
  extend: Flex,
  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    gap: 'Y1',
    // border: '.05px solid red',
    Hint: {
      color: 'gray 1 +64',
      align: 'center flex-start',
      fontSize: 'Y',
      gap: 'Y',
      padding: 'W Y2 - Y2'
    }
  },

  Title: {
    props: {
      text: 'Label',
      fontSize: 'Z',
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
