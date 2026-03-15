const isFunction = (v) => typeof v === 'function'

export const applyEvents = (element, node) => {
  for (const param in element.on) {
    if (param === 'init' || param === 'render') continue

    const appliedFunction = element.on[param]
    if (isFunction(appliedFunction)) {
      node.addEventListener(param, event => {
        appliedFunction.call(element, event, element, node)
      }, true)
    }
  }
}
