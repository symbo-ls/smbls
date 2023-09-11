'use strict'

export const ProgressLine = {
  tag: 'progress',
  attr: {
    max: ({ props }) => props.max,
    progress: ({ props }) => props.progress,
    value: ({ props }) => props.value
  },
  props: {
    value: 0.7,
    height: 'Y+V',
    minWidth: 'G+C',
    background: '#252527',
    round: 'W',
    overflow: 'hidden',
    style: {
      '&::-webkit-progress-bar': { background: '#252527' },
      '&::-webkit-progress-value': {
        background: '#0474F2',
        borderRadius: '2px'
      }
    }
  }
}
