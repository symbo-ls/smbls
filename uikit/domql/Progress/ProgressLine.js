'use strict'

import { Flex } from '@symbo.ls/atoms'

export const ProgressLine = {
  tag: 'progress',
  props: {
    value: 0.7,
    height: 'Y+V',
    minWidth: 'G+C',
    round: 'W',
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
    gap: 'A'
  },

  ProgressLine: {},
  UnitValue: {}
}
