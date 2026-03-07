'use strict'

import { DOMQL_EVENTS, isFunction } from '@domql/utils'

// Re-export event trigger functions from @domql/utils (moved there to break circular dep)
export { applyEvent, triggerEventOn, applyEventUpdate, triggerEventOnUpdate } from '@domql/utils'

const getOnOrPropsEvent = (param, element) => {
  const onEvent = element.on?.[param]
  if (onEvent) return onEvent
  const props = element.props
  if (!props) return
  const propKey = 'on' + param.charAt(0).toUpperCase() + param.slice(1)
  return props[propKey]
}

const registerNodeEvent = (param, element, node, options) => {
  const appliedFunction = getOnOrPropsEvent(param, element)
  if (isFunction(appliedFunction)) {
    const { __ref: ref } = element
    if (!ref.__eventListeners) ref.__eventListeners = {}

    // Remove previous listener for this event to avoid duplicates
    if (ref.__eventListeners[param]) {
      node.removeEventListener(param, ref.__eventListeners[param])
    }

    const handler = event => {
      const { state, context } = element
      try {
        const result = appliedFunction.call(
          element,
          event,
          element,
          state,
          context,
          options
        )
        if (result && typeof result.then === 'function') {
          result.catch((err) => {
            element.error = err
            console.error('[DomQL] Async DOM event error:', err)
          })
        }
      } catch (err) {
        element.error = err
        console.error('[DomQL] DOM event error:', err)
        if (context?.strictMode) throw err
      }
    }

    ref.__eventListeners[param] = handler
    node.addEventListener(param, handler)
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
