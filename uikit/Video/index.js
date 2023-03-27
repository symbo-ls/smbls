'use strict'

export const Video = {
  tag: 'video',

  childExtend: {
    tag: 'source' ,
    attr: {
      src: ({ props }) => props.src,
      controls: ({ props }) => props.controls
    }
  },

  props: {
    controls: true
  },

  attr: {
    controls: ({ props }) => props.controls
  }
}
