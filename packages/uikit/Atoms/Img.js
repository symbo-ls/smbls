'use strict'

export const Img = {
  tag: 'img',

  attr: {
    src: (el) => {
      const { props, context } = el
      let src = (props.preSrc || '') + el.call('exec', props.src, el)

      if (el.call('isString', src) && src.includes('{{')) {
        src = el.call('replaceLiteralsWithObjectFields', src)
      }

      let isUrl
      try { isUrl = new URL(src) } catch (e) {}
      if (isUrl) return src
      const file = context.files && context.files[src]
      if (file) return file.content && file.content.src
    },
    alt: ({ props }) => props.alt,
    title: ({ props }) => props.title || props.alt
  }
}
