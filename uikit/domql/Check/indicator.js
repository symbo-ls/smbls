'use strict'

export const CheckIndicator = {
  props: {
    padding: 'V',
    boxSize: 'fit-content fit-content',
    round: '100%',
    background: '#0474F2'
  },
  Icon: {
    fontSize: 'X',
    name: 'check'
  }
}

export const CheckIndicatorWithBorder = {
  extend: CheckIndicator,
  props: {
    border: '2px solid #04F214',
    color: '#04F214',
    padding: 'Y+V',
    background: 'transparent',
    Icon: { fontSize: 'G' }
  }
}
