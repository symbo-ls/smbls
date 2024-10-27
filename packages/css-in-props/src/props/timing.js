'use strict'

import {
  getTimingFunction,
  splitTransition,
  transformDuration
} from '@symbo.ls/scratch'

export const TIMING_PROPS = {
  transition: ({ props }) => ({
    transition: splitTransition(props.transition)
  }),
  transitionDuration: ({ props }) => ({
    transitionDuration: transformDuration(props.transitionDuration)
  }),
  transitionDelay: ({ props }) => ({
    transitionDelay: transformDuration(props.transitionDelay)
  }),
  transitionTimingFunction: ({ props }) => ({
    transitionTimingFunction: getTimingFunction(props.transitionTimingFunction)
  }),
  transitionProperty: ({ props }) => ({
    transitionProperty: props.transitionProperty,
    willChange: props.transitionProperty
  })
}
