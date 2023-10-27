'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Icon } from '@symbo.ls/icon'

export const CheckIndicator = {
  props: {
    padding: 'Y1',
    boxSize: 'fit-content fit-content',
    round: '100%',
    theme: 'primary'
  },
  Icon: {
    extend: Icon,
    props: {
      name: 'check',
      fontSize: 'B1'
    }
  }
}

export const CheckIndicatorWithLabel = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z'
  },

  CheckIndicator: {},
  Caption: {
    text: 'Step',
    fontWeight: '400',
    fontSize: 'Z2'
  }
}
