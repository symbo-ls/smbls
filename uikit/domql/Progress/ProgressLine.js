'use strict'

import { Flex } from '@symbo.ls/atoms'

export const ProgressLine = {
  tag: 'progress',
  props: {
    value: 0.7,
    height: 'X1',
    minWidth: 'F2+B1',
    round: '2px',
    overflow: 'hidden',
    theme: 'primary @dark .inactive',
    '::-webkit-progress-bar': {
      theme: 'primary @dark .inactive'
    },
    '::-webkit-progress-value': {
      theme: 'primary',
      borderRadius: '2px'
    }
  },
  attr: {
    max: ({ props }) => props.max,
    progress: ({ props }) => props.progress,
    value: ({ props }) => props.value
  }
}

export const ProgressLineWithUnitValue = {
  extend: Flex,
  props: {
    align: 'center flex-start',
    gap: 'Z1'
  },

  ProgressLine: {
    minWidth: 'F2+B1'
  },
  UnitValue: {}
}
