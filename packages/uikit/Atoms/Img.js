'use strict'

export const Img = {
  tag: 'img',

  attr: {
    src: ({ props, context }) => {
      const src = props.src
      const file = context.files[src]
      if (src.startsWith('/') && file) {
        return file.content.src
      }
      return src
    },
    alt: ({ props }) => props.alt,
    title: ({ props }) => props.title || props.alt
  }
}
