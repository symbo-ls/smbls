'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Icon } from '@symbo.ls/icon'

export const IndicatorDot = {
  props: {
    boxSize: 'Y+V1',
    background: '#04F214',
    round: '100%',
    border: 'solid, black 0',
    borderWidth: '1px'
  }
}

export const BalancesIndicator = {
  extend: Flex,
  caption: { props: { text: 'Balance:' } },
  value: { props: { text: '0' } },
  title: { props: { text: 'bnb' } },

  props: {
    fontSize: 'Z',
    color: 'rgba(163, 163, 168, 1)',
    gap: 'X',
    title: { textTransform: 'uppercase' }
  }
}

export const NotificationAlert = {
  span: { props: { text: '2' } },
  props: {
    background: '#0474F2',
    boxSize: 'fit-content',
    padding: '- X',
    round: 'Z',
    color: 'white',
    span: {
      fontSize: 'Y'
    }
  }
}

export const DateIndicator = {
  extend: Flex,

  days: { ...[{ props: { text: 'monday' } }] },
  time: {
    extend: Flex,
    hour: { props: { text: '2' } },
    ':after': { content: ':' },
    minutes: { props: { text: '20' } }
  },
  timeFormat: {
    ...[
      { props: { text: 'am' } },
      { props: { text: 'pm', display: 'none' } }
    ]
  },

  props: {
    gap: 'Y',
    childProps: {
      fontWeight: '400',
      color: '#A3A3A8'
    },
    days: { childProps: { textTransform: 'capitalize' } },
    timeFormat: {
      textTransform: 'uppercase'
    }
  }
}

export const CheckMark = {
  check: {
    extend: Icon,
    props: { name: 'check' }
  },
  props: {
    border: '2px solid #04F214',
    boxSize: 'fit-content',
    color: '#04F214',
    padding: 'Z',
    round: '100%',
    check: { fontSize: 'F' }
  }
}
