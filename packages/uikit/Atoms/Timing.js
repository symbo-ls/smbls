'use strict'

import {
  getTimingFunction,
  splitTransition,
  transformDuration
} from '@symbo.ls/scratch'

export const Timing = {
  deps: {
    getTimingFunction,
    splitTransition,
    transformDuration
  },

  class: {
    transition: ({ props, deps }) => props.transition && ({
      transition: deps.splitTransition(props.transition)
    }),
    willChange: ({ props }) => props.willChange && ({
      willChange: props.willChange
    }),
    transitionDuration: ({ props, deps }) => props.transitionDuration && ({
      transitionDuration: deps.transformDuration(props.transitionDuration)
    }),
    transitionDelay: ({ props, deps }) => props.transitionDelay && ({
      transitionDelay: deps.transformDuration(props.transitionDelay)
    }),
    transitionTimingFunction: ({ props, deps }) => props.transitionTimingFunction && ({
      transitionTimingFunction: deps.getTimingFunction(props.transitionTimingFunction)
    }),
    transitionProperty: ({ props }) => props.transitionProperty && ({
      transitionProperty: props.transitionProperty,
      willChange: props.transitionProperty
    })
  }
}
