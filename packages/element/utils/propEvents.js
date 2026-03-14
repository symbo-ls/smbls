'use strict'

import { isFunction, hasHandlerPlugin, lowercaseFirstLetter } from '@domql/utils'

export const propagateEventsFromProps = (element) => {
  const { props, on } = element
  for (const v in props) {
    if (v.charCodeAt(0) !== 111 || v.charCodeAt(1) !== 110) continue // 'on'
    const eventName = lowercaseFirstLetter(v.slice(2))
    const origEvent = on[eventName]
    const funcFromProps = props[v]
    if (isFunction(origEvent)) {
      on[eventName] = (...args) => {
        const originalEventRetunrs = origEvent(...args)
        if (originalEventRetunrs !== false) {
          if (isFunction(funcFromProps)) return funcFromProps(...args)
        }
      }
    } else on[eventName] = funcFromProps
  }
}

export const propagateEventsFromElement = (element) => {
  const { on } = element
  const pluginActive = hasHandlerPlugin(element.context)
  for (const param in element) {
    if (param.charCodeAt(0) !== 111 || param.charCodeAt(1) !== 110 || !Object.prototype.hasOwnProperty.call(element, param)) continue
    const handler = element[param]
    if (!isFunction(handler) && !(pluginActive && handler != null)) continue
    const eventName = lowercaseFirstLetter(param.slice(2))
    const origEvent = on[eventName]
    if (isFunction(origEvent)) {
      on[eventName] = (...args) => {
        const ret = origEvent(...args)
        if (ret !== false) {
          if (isFunction(handler)) return handler(...args)
        }
      }
    } else on[eventName] = handler
  }
}
