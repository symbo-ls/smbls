'use strict'

import { Flex } from '@symbo.ls/atoms'

export const UnitValue = {
  extend: Flex,
  props: {
    color: 'title',
    align: 'center flex-start',
    gap: 'V',
    fontWeight: '400',
    '> *': { lineHeight: '1em' }
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

export const UnitValueWithLabel = {
  extend: DoubleUnitValue,
  props: { gap: 'Y2' },

  UnitValue: {
    flow: 'row-reverse',
    fontSize: 'D1',
    fontWeight: '700',
    color: 'white',
    Value: { text: '12,759' },
    Unit: { text: '$' }
  },
  dot: null,
  UnitValue2: {
    props: {
      background: 'purple',
      padding: 'Z',
      round: 'Y1',
      fontSize: 'Y2',
      gap: '0',
      color: 'white'
    },
    Value: { text: '+8.8' },
    Unit: { text: '%' }
  }

}

export const UnitValueWithTitle = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Y',
    fontSize: 'Z1'
  },

  Title: {
    tag: 'caption',
    props: {
      text: 'balance :',
      textTransform: 'capitalize'
    }
  },

  UnitValue: {
    textTransform: 'uppercase',
    gap: 'Y',
    color: 'currentColor',
    Value: { text: '0' },
    Unit: { text: 'bnb' }
  }
}
