'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Input } from '@symbo.ls/input'

export const Textarea = {
  extend: [Input],
  tag: 'textarea',
  props: {
    theme: 'tertiary',
    round: 'Z2',
    width: 'G1',
    height: 'E1',
    lineHeight: 1.4
  }
}

export const TextareaWithTitle = {
  extend: Flex,
  title: { tag: 'h5', props: { text: 'Message' } },
  textArea: { extend: Textarea },

  props: {
    flow: 'column',
    gap: 'Y',
    title: {
      fontSize: 'Z',
      color: '#CFCFD1',
      fontWeight: '400'
    },
    textArea: {
      background: 'transparent',
      border: '1px solid #3F3F43',
      round: 'Z',
      minHeight: 'D',
      color: 'white'
    }
  }
}
