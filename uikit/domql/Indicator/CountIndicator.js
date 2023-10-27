'use strict'

import { Flex } from '@symbo.ls/atoms'

export const CountIndicator = {
  extend: Flex,
  props: {
    text: '2',
    theme: 'primary',
    boxSize: 'A1',
    minWidth: 'fit-content',
    boxSizing: 'content-box',
    lineHeight: '1em',
    padding: 'X',
    round: '100%',
    align: 'center center',
    aspectRatio: '1 / 1',
    color: 'white'
  }
}
