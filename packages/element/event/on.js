'use strict'

import { DOMQL_EVENTS, isFunction } from '@domql/utils'

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

const registerNodeEvent = (param, element, node, options) => {
  const appliedFunction = getOnOrPropsEvent(param, element)
  if (isFunction(appliedFunction)) {
    node.addEventListener(param, event => {
      const { state, context } = element
      const result = appliedFunction.call(
        element,
        event,
        element,
        state,
        context,
        options
      )
      if (result && typeof result.then === 'function') {
        result.catch(() => {})
      }
    })
  }
}

export const applyEventsOnNode = (element, options) => {
  const { node, on, props } = element
  const handled = new Set()

  // Register events from on: { click: ..., input: ... }
  for (const param in on) {
    if (DOMQL_EVENTS.has(param)) continue
    handled.add(param)
    registerNodeEvent(param, element, node, options)
  }

  // Also pick up props.onClick, props.onInput, etc.
  // These arrive via propertizeElement moving root-level onClick to props
  if (props) {
    for (const key in props) {
      if (key.length > 2 && key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && isFunction(props[key])) {
        const thirdChar = key[2]
        if (thirdChar !== thirdChar.toUpperCase()) continue
        const eventName = thirdChar.toLowerCase() + key.slice(3)
        if (handled.has(eventName) || DOMQL_EVENTS.has(eventName)) continue
        registerNodeEvent(eventName, element, node, options)
      }
    }
  }
}
