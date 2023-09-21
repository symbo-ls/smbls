'use strict'

import { Icon } from '@symbo.ls/icon'

export const CheckIndicator = {
  checkIcon: {
    extend: Icon,
    props: { Icon: { name: 'check' } }
  },
  props: {
    padding: 'V',
    boxSize: 'fit-content fit-content',
    round: '100%',
    background: '#0474F2',
    checkIcon: { fontSize: 'X' }
  }
}

export const CheckIconWithBorder = {
  extend: CheckIndicator,
  props: {
    border: '2px solid #04F214',
    color: '#04F214',
    padding: 'Y+V',
    background: 'transparent',
    checkIcon: { fontSize: 'G' }
  }
}
