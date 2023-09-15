'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UnitValue = {
  extend: Flex,
  value: { props: { text: '72' } },
  unit: { props: { text: '%' } },

  props: {
    color: '#818186',
    align: 'center flex-start',
    gap: 'V',
    fontSize: 'Z'
  }
}

export const DoubleUnitValue = {
  extend: Flex,
  unitValue1: {
    extend: UnitValue,
    value: { props: { text: '72' } },
    unit: { props: { text: '%' } }
  },
  dot: {},
  unitValue2: {
    extend: UnitValue,
    value: { props: { text: '2' } },
    unit: { props: { text: 'Second left' } }
  },

  props: {
    align: 'center flex-start',
    gap: 'Y',
    dot: {
      boxSize: 'W W',
      round: '100%',
      background: '#A3A3A8'
    },
    unitValue2: { gap: 'X+W' }
  }
}

export const UnitValueWithtitle = {
  extend: Flex,
  title: {
    tag: 'caption',
    props: { text: 'balance:' }
  },
  unitValue: {
    extend: UnitValue,
    value: { props: { text: '0' } },
    unit: { props: { text: 'bnb' } }
  },

  props: {
    align: 'center flex-start',
    gap: 'Y',
    title: {
      fontSize: 'Z',
      textTransform: 'capitalize',
      color: '#A3A3A8'
    },
    unitValue: {
      textTransform: 'uppercase',
      gap: 'Y'
    }
  }
}
