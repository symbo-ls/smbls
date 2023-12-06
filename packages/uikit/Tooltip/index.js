'use strict'

import { isDefined } from '@domql/utils'
import { Flex } from '@symbo.ls/atoms'

export const Tooltip = {
  extend: Flex,
  props: {
    theme: 'dialog',
    background: 'black',
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
    if: ({ parent, props }) => isDefined(parent.props.title) || props.text,
    props: ({ parent }) => ({
      width: 'fit-content',
      fontWeight: 500,
      color: 'gray12',
      text: parent.props.title
    })
  },

  P: {
    if: ({ parent, props }) => isDefined(parent.props.description) || props.text,
    props: ({ parent }) => ({
      width: 'fit-content',
      fontSize: 'Z2',
      margin: '0',
      color: 'gray6',
      fontWeight: '400',
      text: parent.props.description
    })
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
    const TooltipActive = TooltipElem && TooltipElem.props['.active']
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
