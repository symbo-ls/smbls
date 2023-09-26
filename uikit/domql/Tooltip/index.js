'use strict'

import { Flex } from '@symbo.ls/atoms'

export const Tooltip = {
  extend: Flex,
  props: {
    background: 'black',
    color: 'white',
    flow: 'column',
    shape: 'tooltip',
    shapeDirection: 'left',
    padding: 'Z1 A',
    round: 'Y2',
    width: 'fit-content',
    minWidth: 'D2',
    maxWidth: 'F2',
    gap: 'X',
    textAlign: 'center'
  },

  attr: { tooltip: true },

  Title: {
    props: {
      fontWeight: 500,
      color: 'gray12',
      text: 'And tooltip is coming'
    }
  },

  P: {
    props: {
      fontSize: 'Z2',
      margin: '0',
      color: 'gray6',
      text: 'and winter too',
      fontWeight: '400'
    }
  }
}

export const TooltipHidden = {
  extend: Tooltip,

  props: ({ props }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    opacity: '0',
    visibility: 'hidden',
    transition: 'C defaultBezier opacity, C defaultBezier visibility, B defaultBezier transform',

    ...(props.shapeDirection === 'top'
      ? {
          top: '112%',
          left: '50%',
          transform: 'translate3d(-50%,10%,0)',

          '.active': {
            transform: 'translate3d(-50%,0,0)',
            opacity: 1,
            visibility: 'visible'
          }
        }
      : props.shapeDirection === 'right'
        ? {
            transform: 'translate3d(10%,-50%,0)',
            right: '112%',
            top: '50%',

            '.active': {
              transform: 'translate3d(0%,-50%,0)',
              opacity: 1,
              visibility: 'visible'
            }
          }
        : props.shapeDirection === 'bottom'
          ? {
              transform: 'translate3d(-50%,-10%,0)',
              bottom: '112%',
              left: '50%',

              '.active': {
                transform: 'translate3d(-50%,0,0)',
                opacity: 1,
                visibility: 'visible'
              }
            }
          : {
              transform: 'translate3d(10%,-50%,0)',
              left: '112%',
              top: '50%',

              '.active': {
                transform: 'translate3d(0%,-50%,0)',
                opacity: 1,
                visibility: 'visible'
              }
            })
  })
}

export const TooltipParent = {
  props: ({ Tooltip, TooltipHidden }) => {
    const TooltipElem = (Tooltip || TooltipHidden)
    const TooltipActive = TooltipElem && TooltipElem['.active']
    return {
      position: 'relative',
      zIndex: 999,
      style: {
        '&:hover, &:focus-visible': {
          zIndex: 1000,
          '& [tooltip]': TooltipActive || {
            transform: 'translate3d(-50%,0,0)',
            opacity: 1,
            visibility: 'visible'
          }
        }
      }
    }
  }
}
