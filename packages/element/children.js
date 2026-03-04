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

  if (ref.__childrenCache) {
    const equals =
      JSON.stringify(children) === JSON.stringify(ref.__childrenCache) // make smarter diff
    if (equals) {
      ref.__noChildrenDifference = true
    } else {
      ref.__childrenCache = deepClone(children)
      delete ref.__noChildrenDifference
    }
  } else {
    ref.__childrenCache = deepClone(children)
  }

  if (isObject(children) || isArray(children)) {
    children = deepClone(children)
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
