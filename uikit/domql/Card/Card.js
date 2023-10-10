'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Card = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    padding: 'Z2 A',
    gap: 'Z1',
    round: 'Z',
    theme: 'card'
  }
}
