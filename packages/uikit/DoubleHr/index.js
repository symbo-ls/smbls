'use strict'

import { Flex } from '@symbo.ls/atoms'

export const DoubleHr = {
  extend: 'Flex',
  props: {
    gap: 'B',
    fontSize: 'Z1',
    fontWeight: '500',
    alignItems: 'center',
    ':before': {
      content: '""',
      height: 'V',
      flex: '1',
      background: 'gray3'
    },
    text: 'Or',
    ':after': {
      content: '""',
      height: 'V',
      flex: '1',
      background: 'gray3'
    }
  }
}
