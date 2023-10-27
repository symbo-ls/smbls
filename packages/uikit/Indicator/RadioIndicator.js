'use strict'

import { Flex } from '@symbo.ls/atoms'

export const RadioIndicator = {
  props: {
    padding: 'Z+V',
    theme: 'tertiary',
    boxSize: 'fit-content',
    round: '100%',
    ':after': {
      content: '""',
      boxSize: 'Z',
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
    gap: 'Z'
  },

  RadioIndicator: {},
  Caption: {
    text: 'Step',
    fontWeight: '500',
    fontSize: 'Z2'
  }
}
