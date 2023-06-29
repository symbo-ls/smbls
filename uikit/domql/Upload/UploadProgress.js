'use strict'

export const UploadProgress = {
  tag: 'progress',

  props: {
    position: 'relative',
    height: 'Y',
    minWidth: 'G1',
    round: 'A',
    overflow: 'hidden',

    value: 0.5,

    '::-webkit-progress-bar': {
      theme: 'tertiary'
    },

    '::-webkit-progress-value': {
      theme: 'primary',
      round: 'V'
    }
  },

  attr: {
    max: ({ props }) => props.max,
    progress: ({ props }) => props.progress,
    value: ({ props }) => props.value
  }
}
