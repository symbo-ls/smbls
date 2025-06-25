'use strict'

import {
  getTimingFunction,
  splitTransition,
  transformDuration
} from '@symbo.ls/scratch'

export const TIMING_PROPS = {
  transition: val => ({
    transition: splitTransition(val)
  }),
  transitionDuration: val => ({
    transitionDuration: transformDuration(val)
  }),
  transitionDelay: val => ({
    transitionDelay: transformDuration(val)
  }),
  transitionTimingFunction: val => ({
    transitionTimingFunction: getTimingFunction(val)
  }),
  transitionProperty: val => ({
    transitionProperty: val,
    willChange: val
  })
}
