'use strict'

import {
  concatAddExtends,
  deepClone,
  exec,
  getChildStateInKey,
  getParentStateInKey,
  getRootStateInKey,
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

const SELF_STATE_PATHS = new Set(['.', '/', './'])

const resolveChildrenFromState = (path, state) => {
  if (!isString(path) || !state) return

  // children: 'state' | '/' | './' → current state
  if (SELF_STATE_PATHS.has(path)) return state.parse ? state.parse() : state

  // children: '~/path' → from root state
  const rootState = getRootStateInKey(path, state)
  if (rootState) {
    const cleanKey = path.replaceAll('~/', '')
    return getChildStateInKey(cleanKey, rootState)
  }

  // children: '../path' → from ancestor state
  const parentState = getParentStateInKey(path, state)
  if (parentState) {
    const cleanKey = path.replaceAll('../', '')
    return getChildStateInKey(cleanKey, parentState)
  }

  // children: 'key' or 'key/nested' → from current state
  return getChildStateInKey(path, state)
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

  let childrenStatePath

  if (children) {
    if (isState(children)) {
      childrenAs = childrenAs || 'state'
      children = children.parse()
    }
    if (isString(children) || isNumber(children)) {
      const resolved = resolveChildrenFromState(children, state)
      if (resolved !== undefined) {
        childrenStatePath = SELF_STATE_PATHS.has(children) ? '' : children
        children = isState(resolved) ? resolved.parse() : resolved
      } else {
        children = { text: children }
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
      if (childrenStatePath !== undefined && childrenAs !== 'props') {
        // Set inherited state path so DOMQL resolves at runtime with hoisting
        const statePath = childrenStatePath ? `${childrenStatePath}/${key}` : key
        content[key] = { state: statePath }
      } else {
        content[key] = isObjectLike(value)
          ? childrenAs
            ? { [childrenAs]: value }
            : value
          : childrenAs
          ? { [childrenAs]: childrenAs === 'state' ? { value } : { text: value } }
          : { text: value }
      }
    }
  }

  return content
}

export default setChildren
