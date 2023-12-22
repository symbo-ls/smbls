'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from './Input'

export const Textarea = {
  tag: 'textarea',
  extend: [Input, Flex],

  props: {
    variant: 'outlined',
    fontfamily: 'Avenir',
    round: 'Z1',
    placeholder: 'Leave us a message...',
    padding: 'A',
    theme: 'field',
    border: 'none',
    maxWidth: 'G1_default',
    minHeight: 'E_default',
    width: '100%',
    height: 'E1_default',
    fontFamily: 'inherit',
    style: { resize: 'none' }
  },

  '.simple': {
    props: {
      theme: 'field',
      round: 'Z2',
      lineHeight: 1.4
    }
  },

  '.outlined': {
    props: {
      theme: 'field',
      borderWidth: '1px',
      borderStyle: 'solid',
      lineHeight: 1.4,
      placeholder: 'Leave us a message...',
      resize: 'none'
    }
  }
}

export const TextareaWithButton = {
  extend: Flex,
  props: { gap: 'Y2' },
  Textarea: {
    height: 'C2+W',
    minWidth: 'H',
    padding: 'A',
    fontSize: 'Z1',
    round: 'Z2',
    minHeight: 'fit-content'
  },
  SquareButton: {
    props: {
      background: 'blue',
      Icon: { name: 'send' }
    }
  }
}
