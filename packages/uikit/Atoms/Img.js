'use strict'

export const Img = {
  tag: 'img',

  attr: {
    src: (el) => {
      const { props, context } = el
      const { exec, isString, replaceLiteralsWithObjectFields } = context.utils
      let src = exec(props.src, el)

      if (isString(src) && src.includes('{{')) {
        src = replaceLiteralsWithObjectFields(src, el.state)
      }

      let isUrl
      try { isUrl = new URL(src) } catch (e) {}
      if (isUrl) return src
      const file = context.files && context.files[src]
      if (src?.startsWith('/') && file) {
        return file.content.src
      }
    },
    alt: ({ props }) => props.alt,
    title: ({ props }) => props.title || props.alt
  }
}
