'use strict'

import { DOMQL_EVENTS, isFunction, resolveHandler } from '@domql/utils'

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
  const appliedFunction = resolveHandler(getOnOrPropsEvent(param, element), element)
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
            console.error('[DOMQL] Async DOM event error:', err)
          })
        }
      } catch (err) {
        element.error = err
        console.error('[DOMQL] DOM event error:', err)
        if (context?.strictMode) throw err
      }
    }

    ref.__eventListeners[param] = handler
    node.addEventListener(param, handler)
  }
}

export const applyEventsOnNode = (element, options) => {
  const { node, on } = element

  for (const param in on) {
    if (DOMQL_EVENTS.has(param)) continue
    registerNodeEvent(param, element, node, options)
  }
}
