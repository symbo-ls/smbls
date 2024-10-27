'use strict'

import { getTimingByKey, getTimingFunction } from '@symbo.ls/scratch'
import { isObject } from '@domql/utils'
import { emotion } from '@symbo.ls/emotion'

const applyAnimationProps = (animation, element) => {
  const { emotion: ctxEmotion } = element.context
  const { keyframes } = ctxEmotion || emotion
  if (isObject(animation)) return { animationName: keyframes(animation) }
  const { ANIMATION } = element.context && element.context.designSystem
  const record = ANIMATION[animation]
  return keyframes(record)
}

const props = {
  animation: (el) => el.props.animation && {
    animationName: el.deps.applyAnimationProps(el.props.animation, el),
    animationDuration: el.deps.getTimingByKey(el.props.animationDuration || 'A').timing,
    animationDelay: el.deps.getTimingByKey(el.props.animationDelay || '0s').timing,
    animationTimingFunction: el.deps.getTimingFunction(el.props.animationTimingFunction || 'ease'),
    animationFillMode: el.props.animationFillMode || 'both',
    animationPlayState: el.props.animationPlayState,
    animationDirection: el.props.animationDirection
  },
  animationName: (el) => el.props.animationName && {
    animationName: el.deps.applyAnimationProps(el.props.animationName, el)
  },
  animationDuration: ({ props, deps }) => props.animationDuration && ({
    animationDuration: deps.getTimingByKey(props.animationDuration).timing
  }),
  animationDelay: ({ props, deps }) => props.animationDelay && ({
    animationDelay: deps.getTimingByKey(props.animationDelay).timing
  }),
  animationTimingFunction: ({ props, deps }) => props.animationTimingFunction && ({
    animationTimingFunction: deps.getTimingFunction(props.animationTimingFunction)
  })
}

export const Animation = {
  deps: { isObject, getTimingByKey, getTimingFunction, applyAnimationProps },
  class: {
    ...props,
    animationFillMode: ({ props }) => props.animationFillMode && ({
      animationFillMode: props.animationFillMode
    }),
    animationPlayState: ({ props }) => props.animationPlayState && ({
      animationPlayState: props.animationPlayState
    }),
    animationIterationCount: ({ props }) => props.animationIterationCount && ({
      animationIterationCount: props.animationIterationCount || 1
    }),
    animationDirection: ({ props }) => props.animationDirection && ({
      animationDirection: props.animationDirection
    })
  }
}
