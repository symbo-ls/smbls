'use strict'

import {
  getTimingFunction,
  splitTransition,
  transformDuration
} from '@symbo.ls/scratch'

export const Timing = {
  class: {
    transition: ({ props }) => props.transition && ({
      transition: splitTransition(props.transition)
    }),
    willChange: ({ props }) => props.willChange && ({
      willChange: props.willChange
    }),
    transitionDuration: ({ props }) => props.transitionDuration && ({
      transitionDuration: transformDuration(props.transitionDuration)
    }),
    transitionDelay: ({ props }) => props.transitionDelay && ({
      transitionDelay: transformDuration(props.transitionDelay)
    }),
    transitionTimingFunction: ({ props }) => props.transitionTimingFunction && ({
      transitionTimingFunction: getTimingFunction(props.transitionTimingFunction)
    }),
    transitionProperty: ({ props }) => props.transitionProperty && ({
      transitionProperty: props.transitionProperty,
      willChange: props.transitionProperty
    })
  }
}
