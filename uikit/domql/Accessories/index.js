'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Icon } from '@symbo.ls/icon'

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
    padding: 'Y+V',
    round: '100%',
    check: { fontSize: 'G' }
  }
}

export const OrLines = {
  extend: Flex,
  props: {
    fontSize: 'Z',
    text: 'Or',
    align: 'center space-between',
    gap: 'B',
    ':before': {
      content: '""',
      boxSize: '1px 50%',
      background: '#3F3F43'
    },
    ':after': {
      content: '""',
      boxSize: '1px 50%',
      background: '#3F3F43'
    }
  }
}
