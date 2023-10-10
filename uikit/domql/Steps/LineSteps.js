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
    { props: { value: 0 } }
  ]
}

export const LineStepsWithTitleParagraphRows = {
  extend: Flex,
  props: {
    flow: 'column',
    padding: 'A1 B B',
    background: 'gray',
    round: 'A',
    boxSize: 'fit-content',
    gap: 'B'
  },

  TitleParagraphRows: {
    gap: 'Z1',
    Title: {
      h5: {
        text: 'Symbols',
        fontSize: 'B'
      }
    },
    Paragraph: {
      p: {
        text: 'The easiest way to build your own website.',
        fontSIze: 'A'
      }
    }
  },
  LineSteps: {
    childProps: {
      minWidth: 'E+A',
      maxWidth: 'E+A'
    }
  }
}
