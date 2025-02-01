'use strict'

export const MISC_PROPS = {
  overflow: ({ props }) => ({
    overflow: props.overflow,
    scrollBehavior: 'smooth'
  }),
  cursor: (el, s, ctx) => {
    let val = el.props.cursor
    if (!val) return

    const file = ctx.files && ctx.files[val]
    if (file && file.content) val = `url(${file.content.src})`

    return ({ cursor: val })
  }
}
