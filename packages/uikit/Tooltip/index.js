'use strict'

import { isDefined } from '@domql/utils'

export const Tooltip = {
  extend: 'Flex',

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
    width: 'fit-content',
    fontWeight: 500,
    color: 'gray12',
    text: ({ parent }) => parent.props.title
  },

  P: {
    if: (el, s) => el.call('isDefined', el.call('exec', el.parent.props.description, el)) || el.props.text,
    width: 'fit-content',
    fontSize: 'Z2',
    margin: '0',
    color: 'gray6',
    fontWeight: '400',
    text: (el, s) => el.call('exec', el.parent.props.description, el)
  }
}

export const TooltipHidden = {
  extend: 'Tooltip',

  props: ({ props }) => ({
    position: 'absolute',
    pointerEvents: 'none',
    opacity: '0',
    visibility: 'hidden',
    transition: 'C defaultBezier opacity, C defaultBezier visibility, B defaultBezier transform',

    ...(!props.shapeDirection || props.shapeDirection === 'top'
      ? {
          top: '112%',
          left: '50%',
          transform: 'translate3d(-50%,10%,0)',

          '.isActive': {
            transform: 'translate3d(-50%,0,0)',
            opacity: 1,
            visibility: 'visible'
          }
        }
      : props.shapeDirection === 'right'
        ? {
            transform: 'translate3d(10%,-50%,0)',
            left: '112%',
            top: '50%',

            '.isActive': {
              transform: 'translate3d(0%,-50%,0)',
              opacity: 1,
              visibility: 'visible'
            }
          }
        : ({ props }) => props.shapeDirection === 'bottom'
            ? {
                transform: 'translate3d(-50%,-10%,0)',
                bottom: '112%',
                left: '50%',

                '.isActive': {
                  transform: 'translate3d(-50%,0,0)',
                  opacity: 1,
                  visibility: 'visible'
                }
              }
            : props.shapeDirection === 'left'
              ? {
                  transform: 'translate3d(10%,-50%,0)',
                  right: '112%',
                  top: '50%',

                  '.isActive': {
                    transform: 'translate3d(0%,-50%,0)',
                    opacity: 1,
                    visibility: 'visible'
                  }
                }
              : {})
  })
}

export const TooltipParent = {
  props: (el) => {
    const { Tooltip, TooltipHidden } = el
    const TooltipElem = (Tooltip || TooltipHidden)
    if (!TooltipElem) return
    const TooltipActive = TooltipElem && TooltipElem.props && TooltipElem.props['.isActive']
    return {
      position: 'relative',
      zIndex: 999,
      ':hover, &:focus-visible': {
        zIndex: 1000,
        '& [tooltip]': TooltipActive || {
          transform: 'translate3d(-50%, 0, 0)',
          opacity: 1,
          visibility: 'visible'
        }
      }
    }
  }
}
