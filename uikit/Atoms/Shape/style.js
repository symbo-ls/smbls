'use strict'

import { UNIT, getColor, getTheme } from '@symbo.ls/scratch' // eslint-disable-line no-unused-vars
import { Timing } from '../Timing'

export const depth = {
  4: { boxShadow: `rgba(0,0,0,.10) 0 2${UNIT.default} 4${UNIT.default}` },
  6: { boxShadow: `rgba(0,0,0,.10) 0 3${UNIT.default} 6${UNIT.default}` },
  10: { boxShadow: `rgba(0,0,0,.10) 0 4${UNIT.default} 10${UNIT.default}` },
  16: { boxShadow: `rgba(0,0,0,.10) 0 8${UNIT.default} 16${UNIT.default}` },
  26: { boxShadow: `rgba(0,0,0,.10) 0 14${UNIT.default} 26${UNIT.default}` },
  42: { boxShadow: `rgba(0,0,0,.10) 0 20${UNIT.default} 42${UNIT.default}` }
}

const getComputedBackgroundColor = ({ props }) => {
  return getColor(props.shapeDirectionColor) ||
    getColor(props.borderColor) ||
    getColor(props.backgroundColor) ||
    getColor(props.background)
}

const inheritTransition = ({ props }) => {
  const exec = Timing.class.transition({ props })
  return exec && exec.transition
}

export const SHAPES = {
  rectangle: {},
  circle: { borderRadius: '100%' },
  bubble: {},
  tv: {
    borderRadius: '1.15em/2.5em'
  },

  tooltip: ({ props }) => ({
    position: props.position || 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      width: '0px',
      height: '0px',
      border: '.35em solid',
      borderColor: getComputedBackgroundColor({ props }),
      transition: inheritTransition({ props }),
      transitionProperty: 'border-color',
      position: 'absolute',
      borderRadius: '.15em'
    }
  }),

  tooltipDirection: {
    top: {
      '&:before': {
        top: '0',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)'
      }
    },
    right: {
      '&:before': {
        top: '50%',
        right: '0',
        transform: 'translate(50%, -50%) rotate(45deg)'
      }
    },
    bottom: {
      '&:before': {
        bottom: '0',
        left: '50%',
        transform: 'translate(-50%, 50%) rotate(45deg)'
      }
    },
    left: {
      '&:before': {
        top: '50%',
        left: '0',
        transform: 'translate(-50%, -50%) rotate(45deg)'
      }
    }
  },

  tag: ({ props }) => ({
    position: 'relative',
    '&:before': {
      content: '""',
      display: 'block',
      background: getComputedBackgroundColor({ props }),
      transition: inheritTransition({ props }),
      transitionProperty: 'background',
      borderRadius: '.25em',
      position: 'absolute',
      zIndex: '-1',
      aspectRatio: '1/1',
      top: '50%',
      transformOrigin: '50% 50%',
      height: '73%'
    }
  }),

  tagDirection: {
    top: {
      '&:before': {
        bottom: '100%',
        left: '50%',
        transform: 'translate(-50%, 50%) rotate(45deg)'
      }
    },
    right: {
      '&:before': {
        top: '50%',
        left: '100%',
        transform: 'translate(-50%, -50%) rotate(45deg)'
      }
    },
    bottom: {
      '&:before': {
        top: '100%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)'
      }
    },
    left: {
      '&:before': {
        top: '50%',
        right: '100%',
        transform: 'translate(50%, -50%) rotate(45deg)'
      }
    }
  },

  hexagon: el => ({
    position: 'relative',
    '&:before, &:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: '-1',
      borderRadius: '.25em',
      aspectRatio: '1/1',
      top: '50%',
      transformOrigin: '50% 50%',
      height: '73%',
      background: getComputedBackgroundColor({ props }),
      transition: inheritTransition({ props }),
      transitionProperty: 'background'
    },
    '&:before': {
      left: '0',
      transform: 'translate3d(-50%, -50%, 1px) rotate(45deg)'
    },
    '&:after': {
      left: '100%',
      transform: 'translate3d(-50%, -50%, 1px) rotate(45deg)'
    }
  }),

  chevron: el => ({
    position: 'relative',
    // overflow: 'hidden',
    '&:before, &:after': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: '-1',
      aspectRatio: '1/1',
      top: '50%',
      transformOrigin: '50% 50%',
      transition: inheritTransition({ props }),
      transitionProperty: 'background'

    },
    '&:before': {
      background: `linear-gradient(225deg, ${getComputedBackgroundColor({ props })} 25%, transparent 25%), linear-gradient(315deg, ${getComputedBackgroundColor({ props })} 25%, transparent 25%)`
    },
    '&:after': {
      background: getComputedBackgroundColor({ props }),
      borderRadius: '.25em'
    }
  }),

  chevronDirection: {
    left: {
      '&:before': {
        height: '100%',
        left: '100%',
        transform: 'translate3d(-1%, -50%, 1px) scale(-1, 1)'
      },
      '&:after': {
        height: '73%',
        left: '0',
        transform: 'translate3d(-50%, -50%, 1px) rotate(45deg)'
      }
    },
    right: {
      '&:before': {
        height: '100%',
        left: '0',
        transform: 'translate3d(-99%, -50%, 1px)'
      },
      '&:after': {
        height: '73%',
        left: '100%',
        transform: 'translate3d(-50%, -50%, 1px) rotate(45deg)'
      }
    }
  }
}
