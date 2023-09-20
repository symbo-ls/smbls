'use strict'

import { Flex } from '@symbo.ls/atoms'
import { CheckStep } from './CheckSteps'

export const RadioStep = {
  extend: CheckStep,
  CheckIndicatorWithLabel: null,
  RadioIndicatorWithLabel: {
    RadioIndicator: {
      theme: 'transparent',
      border: '2px solid #3F3F43',
      ':after': {
        background: 'transparent'
      },
      '.isActive': {
        theme: 'primary',
        border: 'none',
        ':after': { background: 'white' }
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
    gap: 'Y+V',
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
