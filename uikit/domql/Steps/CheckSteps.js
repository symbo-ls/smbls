'use strict'

import { Flex } from '@symbo.ls/atoms'

export const CheckStep = {
  extend: Flex,
  props: {
    boxSize: 'fit-content',
    align: 'center flex-start',
    gap: 'Y2'
  },

  CheckIndicatorWithLabel: {
    CheckIndicator: {
      theme: 'transparent',
      border: '2px solid #1C1C1F',
      '.isActive': {
        theme: 'primary',
        border: 'none'
      }
    }
  },
  ProgressLine: {
    value: 0,
    height: 'W',
    minWidth: 'E',
    maxWidth: 'E',
    '.isActive': {
      value: 1
    }
  }
}

export const CheckSteps = {
  extend: Flex,
  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    gap: 'Y+V',
    childProps: {
      ':last-child > progress': { display: 'none' }
    }
  },

  childExtend: CheckStep,
  ...[
    {
      CheckIndicatorWithLabel: {
        CheckIndicator: { isActive: true }
      },
      ProgressLine: { value: 1 }
    },
    {
      CheckIndicatorWithLabel: {
        CheckIndicator: { isActive: true }
      },
      ProgressLine: { value: 1 }
    },
    {
      CheckIndicatorWithLabel: {
        CheckIndicator: { isActive: true }
      },
      ProgressLine: { value: 1 }
    },
    {},
    {}
  ]
}
