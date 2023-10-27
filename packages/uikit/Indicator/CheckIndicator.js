'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Icon } from '@symbo.ls/icon'

export const CheckIndicator = {
  extend: Flex,
  props: {
    align: 'center center',
    padding: 'X',
    boxSize: 'fit-content fit-content',
    round: '100%',
    theme: 'primary',
    aspectRatio: '1 / 1',
    fontSize: 'X'
  },
  Icon: {
    extend: Icon,
    props: { name: 'check' }
  }
}

export const CheckIndicatorWithLabel = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z1'
  },

  CheckIndicator: {
    fontSize: 'D2',
    padding: 'W'
  },
  Caption: {
    text: 'Label',
    fontSize: 'B'
  }
}
