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
    theme: 'transparent',
    border: 'none',
    maxWidth: 'G1_default',
    minHeight: 'E_default',
    width: '100%',
    height: 'E1_default',
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
      background: 'transparent',
      lineHeight: 1.4,
      placeholder: 'Leave us a message...',
      outline: 'none !important',
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
  IconFlexButton: {
    props: {
      background: 'blue',
      Icon: { name: 'send' }
    }
  }
}
