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

export const LineStepsWithTitleParagraph = {
  extend: Flex,
  props: {
    flow: 'column',
    padding: 'A A1',
    theme: 'dialog',
    round: 'A1',
    boxSize: 'fit-content',
    gap: 'A1'
  },

  TitleParagraph: {
    gap: 'Y1',
    Title: {
      text: 'Symbols',
      fontSize: 'D1'
    },
    Paragraph: {
      text: 'The easiest way to build your own website.',
      fontSize: 'Z1',
      color: 'gray4'
    }
  },
  LineSteps: {
    childProps: {
      minWidth: 'E+A',
      maxWidth: 'E+A'
    }
  }
}
