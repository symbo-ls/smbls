'use strict'

import { resolvePropValue } from 'attrs-in-props'

export const Img = {
  tag: 'img',

  attr: {
    src: (el) => {
      const { props, context } = el
      let src = (props.preSrc || '') + resolvePropValue(el, props.src)

      let isUrl
      try { isUrl = new URL(src) } catch (e) { }
      if (isUrl) return src
      const fileSrc = src && src.startsWith('/files/') ? src.slice(7) : src
      const file = context.files && (context.files[src] || context.files[fileSrc])
      if (file) return file.content && file.content.src
    },
    title: ({ props }) => props.title || props.alt
  }
}
