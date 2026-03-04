'use strict'

import { isObject, isString } from '@domql/utils'
import { emotion } from '@symbo.ls/emotion'
import { getTimingByKey, getTimingFunction } from '@symbo.ls/scratch'

const TIMING_FUNCTIONS = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end']
const FILL_MODES = ['none', 'forwards', 'backwards', 'both']
const DIRECTIONS = ['normal', 'reverse', 'alternate', 'alternate-reverse']
const PLAY_STATES = ['running', 'paused']
const isDuration = v => /^[\d.]+m?s$/.test(v)

const applyAnimationProps = (animation, element) => {
  const { emotion: ctxEmotion } = element.context
  const { keyframes } = ctxEmotion || emotion
  if (isObject(animation)) return { animationName: keyframes(animation) }
  const { ANIMATION } = element.context && element.context.designSystem
  const record = ANIMATION[animation]
  return keyframes(record)
}

/**
 * Parse CSS animation shorthand string into individual properties.
 * Identifies the animation name by looking it up in the ANIMATION registry.
 * Other tokens are classified by type: duration, timing-function, iteration-count, etc.
 */
const parseAnimationShorthand = (val, el) => {
  const { ANIMATION } = el.context && el.context.designSystem || {}
  const tokens = val.split(/\s+/)
  let name = null
  const durations = []
  let timingFunction = null
  let iterationCount = null
  let direction = null
  let fillMode = null
  let playState = null

  for (const token of tokens) {
    if (ANIMATION && ANIMATION[token]) {
      name = token
    } else if (isDuration(token)) {
      durations.push(token)
    } else if (TIMING_FUNCTIONS.includes(token) || token.startsWith('cubic-bezier') || token.startsWith('steps(')) {
      timingFunction = token
    } else if (token === 'infinite' || /^\d+$/.test(token)) {
      iterationCount = token === 'infinite' ? token : Number(token)
    } else if (DIRECTIONS.includes(token)) {
      direction = token
    } else if (FILL_MODES.includes(token)) {
      fillMode = token
    } else if (PLAY_STATES.includes(token)) {
      playState = token
    } else if (!name) {
      // Fallback: treat unknown token as animation name
      name = token
    }
  }

  return { name, durations, timingFunction, iterationCount, direction, fillMode, playState }
}

export const ANIMATION_PROPS = {
  animation: (val, el) => {
    // Support CSS shorthand: 'animationName 2s linear infinite'
    if (isString(val) && val.includes(' ')) {
      const parsed = parseAnimationShorthand(val, el)
      return {
        animationName: applyAnimationProps(parsed.name || val, el),
        animationDuration: parsed.durations[0] || getTimingByKey(el.props.animationDuration || 'A').timing,
        animationDelay: parsed.durations[1] || getTimingByKey(el.props.animationDelay || '0s').timing,
        animationTimingFunction: parsed.timingFunction || getTimingFunction(el.props.animationTimingFunction || 'ease'),
        animationFillMode: parsed.fillMode || el.props.animationFillMode || 'both',
        animationIterationCount: parsed.iterationCount != null ? parsed.iterationCount : (el.props.animationIterationCount || 1),
        animationPlayState: parsed.playState || el.props.animationPlayState,
        animationDirection: parsed.direction || el.props.animationDirection
      }
    }
    // Single name (no spaces) — original behavior
    return {
      animationName: applyAnimationProps(val, el),
      animationDuration: getTimingByKey(el.props.animationDuration || 'A').timing,
      animationDelay: getTimingByKey(el.props.animationDelay || '0s').timing,
      animationTimingFunction: getTimingFunction(el.props.animationTimingFunction || 'ease'),
      animationFillMode: el.props.animationFillMode || 'both',
      animationIterationCount: el.props.animationIterationCount || 1,
      animationPlayState: el.props.animationPlayState,
      animationDirection: el.props.animationDirection
    }
  },
  animationName: (val, el) => ({
    animationName: applyAnimationProps(val, el)
  }),
  animationDuration: (val) => ({
    animationDuration: getTimingByKey(val).timing
  }),
  animationDelay: (val) => ({
    animationDelay: getTimingByKey(val).timing
  }),
  animationTimingFunction: (val) => ({
    animationTimingFunction: getTimingFunction(val)
  }),
  animationIterationCount: (val) => ({
    animationIterationCount: val
  }),
  animationFillMode: (val) => ({
    animationFillMode: val
  }),
  animationPlayState: (val) => ({
    animationPlayState: val
  }),
  animationDirection: (val) => ({
    animationDirection: val
  })
}
