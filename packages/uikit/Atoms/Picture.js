'use strict'

import { getSystemGlobalTheme } from './Theme.js'

export const Picture = {
  deps: { getSystemGlobalTheme },
  tag: 'picture',

  childExtends: {
    deps: { getSystemGlobalTheme },
    tag: 'source',
    attr: {
      media: (element) => {
        const { props, key, context, deps } = element
        const { MEDIA } = context.designSystem
        const globalTheme = deps.getSystemGlobalTheme(element)
        const mediaName = (props.media || key).slice(1)

        if (mediaName === globalTheme) return '(min-width: 0px)'
        else if (mediaName === 'dark' || mediaName === 'light')
          return '(max-width: 0px)'

        return MEDIA[mediaName]
      }
    }
  },

  Img: {
    width: 'inherit',
    ignoreChildExtends: true,
    height: 'inherit',
    src: (element, state) => element.parent.props?.src || element.parent.src || state.src
  }
}
