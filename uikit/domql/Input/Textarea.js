'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from './Input'

export const Textarea = {
  tag: 'textarea',
  extend: [Input, Flex],

  props: {
    variant: 'outlined'
  },

  '.simple': {
    props: {
      theme: 'tertiary',
      round: 'Z2',
      width: 'G1',
      height: 'E1',
      lineHeight: 1.4
    }
  },

  '.outlined': {
    props: {
      border: '1px solid #3F3F43',
      background: 'transparent',
      round: 'Y+W',
      width: 'G1',
      height: 'D2+W',
      lineHeight: 1.4,
      placeholder: 'Leave us a message...',
      fontSize: 'Y2',
      outline: 'none !important',
      color: 'white',
      resize: 'none'
    }
  }
}

export const TextareaWithTitle = {
  extend: Flex,
  props: {
    flow: 'column',
    boxSize: 'fit-content fit-content',
    gap: 'Y+W'
  },
  Title: {
    props: {
      text: 'Label',
      fontSize: 'Z',
      lineHeight: '1em',
      padding: '- - - Z',
      color: 'gray4'
    }
  },
  Textarea: {}
}

export const TextareaWithButton = {
  extend: Flex,
  props: { gap: 'Y2' },
  Textarea: {
    height: '52px',
    padding: 'A',
    fontSize: 'Z1',
    color: 'white',
    placeholder: 'Message',
    round: 'Z2'
    // background: 'gray'

  },
  IconCommonButton: {
    props: {
      background: 'blue',
      icon: { name: 'send' }
    }
  }
}
