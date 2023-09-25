'use strict'
import { Flex } from '@symbo.ls/atoms'
import { Input } from './Input'

export const TextArea = {
  tag: 'textarea',
  extend: [Input, Flex],
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
    style: { resize: 'none' }
  }
}

export const TextAreaWithTitle = {
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
  TextArea: {}
}

export const TextAreaWithButton = {
  extend: Flex,
  props: { gap: 'Y2' },
  TextArea: {
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
