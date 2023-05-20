'use strict'

import { Flex } from '@symbo.ls/atoms'

const props = {
  flow: 'column',
  gap: 'Y2',
  childProps: { textTransform: 'capitalize' },
  subCaption: {
    fontSize: 'Z',
    color: '#A3A3A8'
  }
}

export const FieldLabel = {
  extend: Flex,
  props,
  caption: {
    tag: 'span',
    text: 'text'
  },
  subCaption: {
    tag: 'span',
    text: 'description'
  }
}
