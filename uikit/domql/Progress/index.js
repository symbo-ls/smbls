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

export const ProgressCircle = {
  progress: {
    attr: {
      max: ({ props }) => props.max,
      progress: ({ props }) => props.progress,
      value: ({ props }) => props.value
    }
  },

  progressValue: { props: { text: '70%' } },

  props: {
    boxSize: 'D D',
    position: 'relative',
    ':after': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% - 8px)',
      height: 'calc(100% - 8px)',
      background: 'black',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      round: '100%'
    },

    progress: {
      boxSize: '100% 100%',
      value: '.7',
      round: '100%',
      overflow: 'hidden',
      style: {
        '&::-webkit-progress-bar': { background: '#0474F2' },
        '&::-webkit-progress-value': {
          background: '#252527',
          borderRadius: '2px'
        }
      }
    },

    progressValue: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: '3',
      fontSize: 'Z'
    }
  }
}
