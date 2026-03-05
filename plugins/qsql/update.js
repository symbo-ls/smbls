import { params } from './params.js'
import { applyEvents } from './on.js'

const isObject = (v) => v !== null && typeof v === 'object' && v.constructor === Object
const isFunction = (v) => typeof v === 'function'

export const update = function (newParams) {
  const element = this
  element.nodes.forEach(node => {
    if (isObject(newParams.on)) applyEvents(element, node)

    for (const param in newParams) {
      const newParam = newParams[param]
      const hasParam = params[param]
      if (hasParam) hasParam(newParam, element, node)
    }
  })

  if (element.on && isFunction(element.on.update)) {
    element.on.update.call(element, element)
  }
}
