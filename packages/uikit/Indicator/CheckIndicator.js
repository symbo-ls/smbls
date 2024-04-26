'use strict'

export const CheckIndicator = {
  extend: 'Flex',
  props: {
    padding: 'Y1',
    round: '100%',
    theme: 'success'
  },
  Icon: {
    name: 'check',
    fontSize: 'A'
  }
}

export const CheckIndicatorWithLabel = {
  extend: 'Flex',
  props: {
    align: 'center flex-start',
    gap: 'Z'
  },

  CheckIndicator: {},
  Caption: {
    text: 'Step',
    fontWeight: '400'
  }
}
