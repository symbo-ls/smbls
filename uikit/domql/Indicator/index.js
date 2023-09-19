'use strict'

import { Flex } from '@symbo.ls/atoms'

export const StatusIndicator = {
  props: {
    boxSize: 'Y',
    background: 'green2',
    round: '100%',
    border: 'solid, black 0',
    borderWidth: '1px'
  }
}

export const CountIndicator = {
  props: {
    text: '2',
    theme: 'primary',
    boxSize: 'fit-content',
    lineHeight: '1em',
    padding: 'X X2',
    round: 'Z',
    color: 'white'
  }
}

export const CheckIndicator = {
  props: {
    padding: 'W',
    boxSize: 'fit-content fit-content',
    round: '100%',
    theme: 'primary',
    fontSize: 'X'
  },
  Icon: { name: 'check' }
}

export const RadioIndicator = {
  props: {
    padding: 'Z',
    theme: 'primary',
    boxSize: 'fit-content',
    round: '100%',
    ':after': {
      content: '""',
      boxSize: 'Z1',
      background: 'white',
      display: 'block',
      round: '100%'
    }
  }
}

export const SuccessIndicator = {
  extend: CheckIndicator,
  props: {
    theme: 'success',
    padding: 'X+V2',
    fontSize: 'G2'
  }
}

export const CheckIndicatorWithLabel = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z'
  },

  CheckIndicator: {
    fontSize: 'D2'
  },
  Caption: {
    props: {
      text: 'Label',
      fontSize: 'B'
    }
  }
}
