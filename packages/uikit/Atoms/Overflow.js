'use strict'

export const Overflow = {
  class: {
    overflow: ({ props }) => props.overflow && ({ overflow: props.overflow }),
    overflowX: ({ props }) => props.overflowX && ({ overflowX: props.overflowX }),
    overflowY: ({ props }) => props.overflowY && ({ overflowY: props.overflowY })
  }
}
