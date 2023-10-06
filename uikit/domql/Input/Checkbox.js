'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Checkbox = {
  tag: 'label',

  props: {
    boxSize: 'fit-content fit-content',
    cursor: 'pointer',
    round: 'Y'
  },

  Input: {
    type: 'checkbox',
    display: 'none',
    ':checked + div': {
      background: '#0474F2',
      border: '1px solid transparent'
    },
    ':checked + div > svg': { opacity: '1' }
  },

  Flex: {
    props: {
      align: 'center center',
      fontSize: 'B1',
      padding: 'V',
      border: '1px solid #57575C',
      round: 'X2',
      transition: 'background .15s ease-in-out'
    },
    Icon: {
      props: {
        icon: 'check',
        opacity: '0',
        transition: 'opacity .15s ease-in-out'
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
  TitleParagraph: {
    gap: 'Z1',
    margin: 'Y - - -'
  }
}
