'use strict'

import { Flex } from '@symbo.ls/atoms'

export const CountIndicator = {
  extend: Flex,
  props: {
    text: '2',
    theme: 'primary',
    boxSize: 'fit-content',
    lineHeight: '1em',
    padding: 'X Y1',
    round: '100%',
    align: 'center center',
    aspectRatio: '1 / 1',
    color: 'white'
  }
}
