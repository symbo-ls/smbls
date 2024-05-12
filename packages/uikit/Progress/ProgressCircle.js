'use strict'

export const ProgressCircle = {
  props: {
    widthRange: 'D',
    aspectRatio: '1 / 1',
    position: 'relative',
    ':after': {
      content: '""',
      position: 'absolute',
      width: 'calc(100% - 5px)',
      height: 'calc(100% - 5px)',
      background: 'black',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      round: '100%'
    }
  },

  Progress: {
    tag: 'progress',
    props: {
      boxSize: '100% 100%',
      value: 0.7,
      round: '100%',
      overflow: 'hidden',
      style: {
        '&::-webkit-progress-bar': { background: '#0474F2' },
        '&::-webkit-progress-value': { background: '#252527' }
      }
    },
    attr: {
      max: ({ props }) => props.max,
      progress: ({ props }) => props.progress,
      value: ({ props }) => props.value
    }
  }
}

export const ProgressCircleWithIcon = {
  extend: ProgressCircle,
  Icon: {
    name: 'arrowUp',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    fontSize: 'E'
  }
}

export const ProgressCircleWithUnitValue = {
  extend: ProgressCircle,
  Progress: {},
  UnitValue: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '3',
    fontSize: 'Z'
  }
}

export const ProgressCircleWithSideUnitValue = {
  extend: 'Flex',
  props: {
    align: 'center flex-start',
    boxSize: 'fit-content',
    gap: 'Y'
  },

  ProgressCircle: {
    boxSize: 'A',
    ':after': {
      width: 'calc(100% - 5px)',
      height: 'calc(100% - 5px)'
    }
  },
  UnitValue: {}
}
