'use strict'

import { Flex } from '@symbo.ls/atoms'

export const CheckIndicator = {
  props: {
    padding: 'W',
    boxSize: 'fit-content fit-content',
    round: '100%',
    background: '#0474F2',
    fontSize: 'D'
  },
  Icon: { name: 'check' }
}

export const CheckIndicatorWithBorder = {
  extend: CheckIndicator,
  props: {
    border: '2px solid #04F214',
    color: '#04F214',
    padding: 'Y+V',
    background: 'transparent'
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
    props: {
      text: 'Label',
      fontSize: 'B'
    }
  }
}
