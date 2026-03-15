import { REGISTRY } from './registry.js'
import { apply } from './apply.js'
import { update } from './update.js'
import { methods } from './methods.js'

const isNode = (obj) => obj instanceof Node

export const query = (config) => {
  for (const key in config) {
    const element = config[key]
    const { query: selector, node } = element
    const nodesArr = []

    if (node && isNode(node)) {
      nodesArr.push(node)
    } else if (selector) {
      const nodes = document.querySelectorAll(selector)
      if (nodes.length === 0) console.warn(`Could not find element "${key}"`)
      nodes.forEach((n) => nodesArr.push(n))
    }

    element.nodes = nodesArr
    element.key = key
    element.update = update

    for (const name in methods) {
      if (key !== name) element[name] = methods[name]
    }

    REGISTRY[key] = element
    apply(element)
  }

  return REGISTRY
}
