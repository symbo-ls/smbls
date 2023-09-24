'use strict'

import { Flex } from '@symbo.ls/atoms'

export const RadioIndicator = {
  props: {
    padding: 'Z',
    theme: 'primary',
    boxSize: 'fit-content',
    round: '100%',
    ':after': {
      content: '""',
      boxSize: 'Z1',
      background: 'white',
      display: 'block',
      round: '100%'
    }
  }
}

export const RadioIndicatorWithLabel = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z1'
  },

  RadioIndicator: {},
  Caption: {
    text: 'Label',
    fontSize: 'B'
  }
}
