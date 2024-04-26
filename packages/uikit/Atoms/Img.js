'use strict'

export const Img = {
  tag: 'img',

  attr: {
    src: ({ props, context }) => {
      const src = props.src
      let isUrl
      try { isUrl = new URL(src) } catch (e) {}
      if (isUrl) return src
      const file = context.files && context.files[src]
      if (src.startsWith('/') && file) {
        return file.content.src
      }
    },
    alt: ({ props }) => props.alt,
    title: ({ props }) => props.title || props.alt
  }
}
