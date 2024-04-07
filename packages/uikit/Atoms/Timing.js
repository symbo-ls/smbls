'use strict'

import {
  getTimingFunction,
  splitTransition,
  transformDuration
} from '@symbo.ls/scratch'

import { isUndefined } from 'smbls'

export const Timing = {
  deps: {
    getTimingFunction,
    splitTransition,
    transformDuration
  },

  class: {
    transition: ({ props, deps }) => !isUndefined(props.transition) && ({
      transition: deps.splitTransition(props.transition)
    }),
    willChange: ({ props }) => !isUndefined(props.willChange) && ({
      willChange: props.willChange
    }),
    transitionDuration: ({ props, deps }) => !isUndefined(props.transitionDuration) && ({
      transitionDuration: deps.transformDuration(props.transitionDuration)
    }),
    transitionDelay: ({ props, deps }) => !isUndefined(props.transitionDelay) && ({
      transitionDelay: deps.transformDuration(props.transitionDelay)
    }),
    transitionTimingFunction: ({ props, deps }) => !isUndefined(props.transitionTimingFunction) && ({
      transitionTimingFunction: deps.getTimingFunction(props.transitionTimingFunction)
    }),
    transitionProperty: ({ props }) => !isUndefined(props.transitionProperty) && ({
      transitionProperty: props.transitionProperty,
      willChange: props.transitionProperty
    })
  }
}
