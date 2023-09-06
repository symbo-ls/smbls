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
    checkIcon: {
      fontSize: 'X'
    }
  }
}
