let _keyCounter = 0

export const resetKeys = () => {
  _keyCounter = 0
}

/**
 * Recursively assigns `data-br` attributes to all element nodes.
 * These keys allow qsql to remap static HTML back onto DOMQL elements.
 */
export const assignKeys = (node) => {
  if (!node) return

  if (node.nodeType === 1) {
    const key = `br-${_keyCounter++}`
    node.setAttribute('data-br', key)
  }

  const children = node.childNodes
  if (children) {
    for (let i = 0; i < children.length; i++) {
      assignKeys(children[i])
    }
  }
}

/**
 * Walks a DOMQL element tree and builds a registry
 * mapping data-br keys to DOMQL elements.
 */
export const mapKeysToElements = (element, registry = {}) => {
  if (!element) return registry

  const node = element.node
  if (node && node.getAttribute) {
    const brKey = node.getAttribute('data-br')
    if (brKey) {
      if (!element.__ref) element.__ref = {}
      element.__ref.__brKey = brKey
      registry[brKey] = element
    }
  }

  if (element.__ref && element.__ref.__children) {
    for (const childKey of element.__ref.__children) {
      const child = element[childKey]
      if (child && child.__ref) {
        mapKeysToElements(child, registry)
      }
    }
  }

  return registry
}
