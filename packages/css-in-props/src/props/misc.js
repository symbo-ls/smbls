'use strict'

export const MISC_PROPS = {
  overflow: (value) => ({
    overflow: value,
    scrollBehavior: 'smooth'
  }),
  cursor: (value, el, s, ctx) => {
    if (!value) return

    const file = ctx.files && ctx.files[value]
    if (file && file.content) value = `url(${file.content.src})`

    return ({ cursor: value })
  }
}
