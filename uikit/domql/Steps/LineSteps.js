'use strict'

import { Flex } from '@symbo.ls/atoms'
import { ProgressLine } from '@symbo.ls/progress'

export const LineSteps = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    gap: 'Y1'
  },

  childExtend: {
    extend: ProgressLine,
    props: {
      value: 1,
      height: 'Y',
      minWidth: 'F',
      round: 'X'
    }
  },

  ...[
    {},
    {},
    { props: { value: 0 } },
    { props: { value: 0 } }
  ]
}
