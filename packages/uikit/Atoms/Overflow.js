'use strict'

export const Overflow = {
  class: {
    overflow: ({ props, deps }) => !deps.isUndefined(props.overflow) && ({
      overflow: props.overflow,
      scrollBehavior: 'smooth'
    }),
    overflowX: ({ props, deps }) => !deps.isUndefined(props.overflowX) && ({
      overflowX: props.overflowX
    }),
    overflowY: ({ props, deps }) => !deps.isUndefined(props.overflowY) && ({
      overflowY: props.overflowY
    }),
    overscrollBehavior: ({ props, deps }) => !deps.isUndefined(props.overscrollBehavior) && ({
      overscrollBehavior: props.overscrollBehavior
    })
  }
}
