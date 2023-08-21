'use strict'

import { Flex } from '@symbo.ls/atoms'

export const IndicatorDot = {
  props: {
    boxSize: 'Y+V1',
    background: '#04F214',
    round: '100%',
    border: 'solid, black 0',
    borderWidth: '1px'
  }
}

export const NotificationAlert = {
  span: { props: { text: '2' } },
  props: {
    background: '#0474F2',
    boxSize: 'fit-content',
    padding: '- X',
    round: 'Y+V',
    span: {
      fontSize: 'Y',
      color: 'white'
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
