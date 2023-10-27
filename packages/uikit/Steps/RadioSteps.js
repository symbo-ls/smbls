'use strict'

import { Flex } from '@symbo.ls/atoms'
import { CheckStep } from './CheckSteps'

export const RadioStep = {
  extend: CheckStep,
  CheckIndicatorWithLabel: null,
  RadioIndicatorWithLabel: {
    RadioIndicator: {
      theme: 'dialog',
      ':after': {
      },
      '.isActive': {
        theme: 'dialog',
        border: 'none',
        ':after': { theme: 'primary' }
      }
    }
  },
  ProgressLine: {}
}

export const RadioSteps = {
  extend: Flex,
  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    gap: 'Z',
    childProps: {
      ':last-child > progress': { display: 'none' }
    }
  },

  childExtend: RadioStep,
  ...[
    {
      RadioIndicatorWithLabel: {
        RadioIndicator: { isActive: true }
      },
      ProgressLine: { value: 1 }
    },
    {
      RadioIndicatorWithLabel: {
        RadioIndicator: { isActive: true }
      },
      ProgressLine: { value: 1 }
    },
    {
      RadioIndicatorWithLabel: {
        RadioIndicator: { isActive: true }
      },
      ProgressLine: { value: 1 }
    },
    {},
    {}
  ]
}
