'use strict'

import { isObject } from '@domql/utils'
import { emotion } from '@symbo.ls/emotion'
import { getTimingByKey, getTimingFunction } from '@symbo.ls/scratch'

const applyAnimationProps = (animation, element) => {
  const { emotion: ctxEmotion } = element.context
  const { keyframes } = ctxEmotion || emotion
  if (isObject(animation)) return { animationName: keyframes(animation) }
  const { ANIMATION } = element.context && element.context.designSystem
  const record = ANIMATION[animation]
  return keyframes(record)
}

export const ANIMATION_PROPS = {
  animation: (el) => ({
    animationName: applyAnimationProps(el.props.animation, el),
    animationDuration: getTimingByKey(el.props.animationDuration || 'A').timing,
    animationDelay: getTimingByKey(el.props.animationDelay || '0s').timing,
    animationTimingFunction: getTimingFunction(el.props.animationTimingFunction || 'ease'),
    animationFillMode: el.props.animationFillMode || 'both',
    animationPlayState: el.props.animationPlayState,
    animationDirection: el.props.animationDirection
  }),
  animationName: (el) => ({
    animationName: applyAnimationProps(el.props.animationName, el)
  }),
  animationDuration: ({ props, deps }) => ({
    animationDuration: deps.getTimingByKey(props.animationDuration).timing
  }),
  animationDelay: ({ props, deps }) => ({
    animationDelay: deps.getTimingByKey(props.animationDelay).timing
  }),
  animationTimingFunction: ({ props, deps }) => ({
    animationTimingFunction: deps.getTimingFunction(props.animationTimingFunction)
  })
}
