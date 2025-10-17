'use strict'

export const Video = {
  tag: 'video',

  childExtend: {
    tag: 'source',
    attr: {
      src: ({ props }) => props.src,
      type: ({ props }) => props.type,
      controls: ({ props }) => props.controls
    }
  },

  props: {
    controls: true
  },

  attr: {
    src: (el, s) => {
      let src = el.call('exec', el.props.src, el)

      if (!src) return

      if (el.call('isString', src) && src.includes('{{')) {
        src = el.call('replaceLiteralsWithObjectFields', src)
      }

      return src
    },
    playsinline: ({ props }) => props.playsinline,
    autoplay: ({ props }) => props.autoplay,
    loop: ({ props }) => props.loop,
    poster: ({ props }) => props.poster,
    muted: ({ props }) => props.muted,
    preload: ({ props }) => props.preload,
    controls: ({ props }) => props.controls
  }
}
