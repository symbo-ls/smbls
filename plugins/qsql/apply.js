import { params } from './params.js'
import { applyEvents } from './on.js'

const isObject = (v) => v !== null && typeof v === 'object' && v.constructor === Object
const isFunction = (v) => typeof v === 'function'

export const apply = (element) => {
  element.nodes.forEach(node => {
    if (isObject(element.on)) applyEvents(element, node)

    for (const key in element) {
      const elemParam = element[key]
      const param = params[key]
      if (param) param(elemParam, element, node)
    }

    if (element.on && isFunction(element.on.init)) {
      element.on.init.call(element, element, node)
    }
  })
}
