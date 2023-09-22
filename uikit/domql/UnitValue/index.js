'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UnitValue = {
  extend: Flex,
  props: {
    color: '#818186',
    align: 'center flex-start',
    gap: 'V',
    fontSize: 'Z'
  },

  Value: { props: { text: '72' } },
  Unit: { props: { text: '%' } }
}

export const DoubleUnitValue = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Y'
  },

  UnitValue: {
    Value: { text: '72' },
    Unit: { text: '%' }
  },

  dot: {
    props: {
      boxSize: 'W W',
      round: '100%',
      background: '#A3A3A8'
    }
  },

  UnitValue2: {
    extend: UnitValue,
    props: { gap: 'X+W' },
    Value: { text: '2' },
    Unit: { text: 'Second left' }
  }
}

export const UnitValueWithTitle = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Y'
  },

  Title: {
    tag: 'caption',
    props: {
      text: 'balance:',
      fontSize: 'Z',
      textTransform: 'capitalize',
      color: '#A3A3A8'
    }
  },

  UnitValue: {
    textTransform: 'uppercase',
    gap: 'Y',
    Value: { text: '0' },
    Unit: { text: 'bnb' }
  }
}
