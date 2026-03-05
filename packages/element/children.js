'use strict'

import {
  concatAddExtends,
  deepClone,
  exec,
  getChildStateInKey,
  isArray,
  isDefined,
  isNot,
  isNumber,
  isObject,
  isObjectLike,
  isState,
  isString,
  matchesComponentNaming
} from '@domql/utils'

const deepChildrenEqual = (a, b) => {
  if (a === b) return true
  if (!a || !b) return false
  const typeA = typeof a
  const typeB = typeof b
  // Functions in children data are structural definitions (event handlers,
  // conditions) that get new references each call but are logically equal
  if (typeA === 'function' && typeB === 'function') return true
  if (typeA !== typeB) return false
  if (isArray(a) && isArray(b)) {
    if (a.length !== b.length) return false
    for (let i = 0; i < a.length; i++) {
      if (!deepChildrenEqual(a[i], b[i])) return false
    }
    return true
  }
  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a)
    const keysB = Object.keys(b)
    if (keysA.length !== keysB.length) return false
    for (let i = 0; i < keysA.length; i++) {
      const key = keysA[i]
      if (!deepChildrenEqual(a[key], b[key])) return false
    }
    return true
  }
  return a === b
}

/**
 * Apply data parameters on the DOM nodes
 * this should only work if `showOnNode: true` is passed
 */
export function setChildren (param, element, opts) {
  let { children, __ref: ref, state } = element

  let { childrenAs } = element.props || {}
  let execParam = exec(param, element, state)
  let execChildren = exec(children, element, state)
  children = execParam || execChildren

  if (children) {
    if (isState(children)) children = children.parse()
    if (isString(children) || isNumber(children)) {
      if (children === 'state') children = state.parse()
      else {
        const pathInState = getChildStateInKey(children, state)
        if (pathInState) {
          childrenAs = 'state'
          children = getChildStateInKey(children, state) || { value: children }
        } else {
          children = { text: children }
        }
      }
    }

    if (isObject(children)) {
      if (children.$$typeof) {
        return element.call('renderReact', children, element)
      }
      children = Object.keys(children).map(v => {
        const val = children[v]
        if (matchesComponentNaming(v)) return concatAddExtends(v, val)
        return val
      })
    }
  }

  if (!children || isNot(children)('array', 'object')) return

  if (isArray(children) && children.some(v => v?.$$typeof)) {
    const filterReact = []
    const reactComponents = []
    for (let i = 0; i < children.length; i++) {
      if (children[i]?.$$typeof) reactComponents.push(children[i])
      else filterReact.push(children[i])
    }
    if (reactComponents.length) {
      element.call('renderReact', reactComponents, element)
    }
    children = filterReact
  }

  let cloned
  if (ref.__childrenCache) {
    if (deepChildrenEqual(children, ref.__childrenCache)) {
      ref.__noChildrenDifference = true
    } else {
      cloned = deepClone(children)
      ref.__childrenCache = cloned
      delete ref.__noChildrenDifference
    }
  } else {
    cloned = deepClone(children)
    ref.__childrenCache = cloned
    // First evaluation during update - no cache to compare against, so don't
    // assume children match. State-dependent children may have changed since creation.
  }

  if (isObject(children) || isArray(children)) {
    children = cloned || deepClone(children)
  }

  const content = { tag: 'fragment' }

  for (const key in children) {
    const value = Object.prototype.hasOwnProperty.call(children, key) && children[key]
    if (isDefined(value) && value !== null && value !== false) {
      content[key] = isObjectLike(value)
        ? childrenAs
          ? { [childrenAs]: value }
          : value
        : childrenAs
        ? { [childrenAs]: childrenAs === 'state' ? { value } : { text: value } }
        : { text: value }
    }
  }

  return content
}

export default setChildren
