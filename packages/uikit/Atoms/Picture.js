'use strict'

import { getSystemTheme } from './Theme'

export const Picture = {
  deps: { getSystemTheme },
  tag: 'picture',

  childExtend: {
    tag: 'source',
    attr: {
      media: (element) => {
        const { props, key, context, deps } = element
        const { MEDIA } = context.designSystem
        const globalTheme = deps.getSystemTheme(element)
        const mediaName = (props.media || key).slice(1)

        if (mediaName === globalTheme) return '(min-width: 0px)'
        else if (mediaName === 'dark' || mediaName === 'light') return '(max-width: 0px)'

        return MEDIA[mediaName]
      },
      srcset: ({ props }) => props.srcset
    }
  },

  Img: ({ props }) => ({
    width: 'inherit',
    ignoreChildExtend: true,
    height: 'inherit',
    src: props.src
  })
}
