'use strict'

import { ProgressLine } from '@symbo.ls/progress'

export const LineSteps = {
  extend: 'Flex',
  props: {
    boxSize: 'fit-content',
    gap: 'Y1'
  },

  childExtend: {
    extend: ProgressLine,
    props: {
      value: 1,
      height: 'X2',
      minWidth: 'F',
      round: 'X'
    }
  },

  ...[
    {},
    {},
    { props: { value: 0 } }
  ]
}

export const LineStepsWithHgroup = {
  extend: 'Flex',
  props: {
    flow: 'column',
    padding: 'A A1',
    theme: 'dialog',
    round: 'A1',
    boxSize: 'fit-content',
    gap: 'A1'
  },

  Hgroup: {
    gap: 'Y1',
    Title: {
      text: 'Symbols',
      fontSize: 'D1'
    },
    Paragraph: {
      text: 'The easiest way to build your own website.',
      fontSize: 'Z1',
      color: 'caption'
    }
  },
  LineSteps: {
    childProps: {
      minWidth: 'E+A',
      maxWidth: 'E+A'
    }
  }
}
