'use strict'

import { isFunction } from './types.js'

const getOnOrPropsEvent = (param, element) => {
  const onEvent = element.on?.[param]
  if (onEvent) return onEvent
  const props = element.props
  if (!props) return
  const propKey = 'on' + param.charAt(0).toUpperCase() + param.slice(1)
  return props[propKey]
}

export const applyEvent = (param, element, state, context, options) => {
  if (!isFunction(param)) return
  const result = param.call(
    element,
    element,
    state || element.state,
    context || element.context,
    options
  )
  if (result && typeof result.then === 'function') {
    result.catch(() => {})
  }
  return result
}

export const triggerEventOn = (param, element, options) => {
  if (!element) {
    throw new Error('Element is required')
  }
  const appliedFunction = getOnOrPropsEvent(param, element)
  if (appliedFunction) {
    const { state, context } = element
    return applyEvent(appliedFunction, element, state, context, options)
  }
}

export const applyEventUpdate = (
  param,
  updatedObj,
  element,
  state,
  context,
  options
) => {
  if (!isFunction(param)) return
  const result = param.call(
    element,
    updatedObj,
    element,
    state || element.state,
    context || element.context,
    options
  )
  if (result && typeof result.then === 'function') {
    result.catch(() => {})
  }
  return result
}

export const triggerEventOnUpdate = (param, updatedObj, element, options) => {
  const appliedFunction = getOnOrPropsEvent(param, element)
  if (appliedFunction) {
    const { state, context } = element
    return applyEventUpdate(
      appliedFunction,
      updatedObj,
      element,
      state,
      context,
      options
    )
  }
}
