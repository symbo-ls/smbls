'use strict'

export const Interaction = {
  class: {
    userSelect: ({ props }) => props.userSelect && ({ userSelect: props.userSelect }),
    pointerEvents: ({ props }) => props.pointerEvents && ({ pointerEvents: props.pointerEvents }),
    cursor: (el, s, ctx) => {
      let val = el.props.cursor
      if (!val) return

      const file = ctx.files && ctx.files[val]
      if (file && file.content) val = file.content.src

      return ({ cursor: val })
    }
  }
}
