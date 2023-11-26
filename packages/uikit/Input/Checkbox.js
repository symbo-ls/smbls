'use strict'

import { Flex, Focusable } from '@symbo.ls/atoms'

export const Checkbox = {
  extend: Focusable,

  tag: 'label',

  props: {
    boxSize: 'fit-content fit-content',
    cursor: 'pointer',
    round: 'Y'
  },

  Input: {
    props: {
      type: 'checkbox',
      display: 'none',
      ':checked + div': { theme: 'primary' },
      ':checked + div > svg': {
        transform: 'none',
        opacity: '1'
      }
    },
    attr: {
      checked: ({ parent }) => parent.props.checked
    }
  },

  Flex: {
    props: {
      align: 'center center',
      fontSize: 'B1',
      padding: 'V',
      theme: 'tertiary .outline',
      round: 'X2',
      transition: 'background A defaultBezier'
    },
    Icon: {
      props: {
        icon: 'check',
        opacity: '0',
        transform: 'scale(0.9) rotate(-15deg)',
        transition: 'opacity B defaultBezier'
      }
    }
  }
}

export const CheckboxTitleParagraph = {
  extend: Flex,
  tag: 'label',

  props: {
    boxSize: 'fit-content',
    align: 'flex-start flex-start',
    gap: 'A'
  },

  Checkbox: { tag: 'div' },
  TitleParagraphRows: {
    gap: 'Z1',
    margin: 'Y - - -'
  }
}
