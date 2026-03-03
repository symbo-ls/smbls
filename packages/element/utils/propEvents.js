'use strict'

import { isFunction, lowercaseFirstLetter } from '@domql/utils'

export const propagateEventsFromProps = (element) => {
  const { props, on } = element
  const eventKeysFromProps = Object.keys(props).filter(key => key.startsWith('on'))
  eventKeysFromProps.forEach(v => {
    const eventName = lowercaseFirstLetter(v.split('on')[1])
    const origEvent = on[eventName]
    const funcFromProps = props[v]
    if (isFunction(origEvent)) {
      on[eventName] = (...args) => {
        const originalEventRetunrs = origEvent(...args)
        if (originalEventRetunrs !== false) return funcFromProps(...args)
      }
    } else on[eventName] = funcFromProps
  })
}

export const propagateEventsFromElement = (element) => {
  const { on } = element
  for (const param in element) {
    if (!param.startsWith('on') || !Object.hasOwnProperty.call(element, param)) continue
    const fn = element[param]
    if (!isFunction(fn)) continue
    const eventName = lowercaseFirstLetter(param.slice(2))
    const origEvent = on[eventName]
    if (isFunction(origEvent)) {
      on[eventName] = (...args) => {
        const ret = origEvent(...args)
        if (ret !== false) return fn(...args)
      }
    } else on[eventName] = fn
  }
}
