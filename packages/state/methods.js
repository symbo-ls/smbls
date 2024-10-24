'use strict'

import { isArray, deepCloneWithExtend, isFunction, isObject, isString } from '@domql/utils'

import { IGNORE_STATE_PARAMS } from './ignore'

export const parse = function () {
  const state = this
  if (isObject(state)) {
    const obj = {}
    for (const param in state) {
      if (!IGNORE_STATE_PARAMS.includes(param)) {
        obj[param] = state[param]
      }
    }
    return obj
  } else if (isArray(state)) {
    return state.filter(item => !IGNORE_STATE_PARAMS.includes(item))
  }
}

export const clean = function (options = {}) {
  const state = this
  for (const param in state) {
    if (!IGNORE_STATE_PARAMS.includes(param) && Object.hasOwnProperty.call(state, param)) {
      delete state[param]
    }
  }
  if (!options.preventStateUpdate) {
    state.update(state, { replace: true, ...options })
  }
  return state
}

export const destroy = function (options = {}) {
  const state = this
  const element = state.__element

  const stateKey = element.__ref.__state
  if (isString(stateKey)) {
    element.parent.state.remove(stateKey, { isHoisted: true, ...options })
    return element.state
  }

  delete element.state
  element.state = state.parent

  if (state.parent) {
    delete state.parent.__children[element.key]
  }

  if (state.__children) {
    for (const key in state.__children) {
      const child = state.__children[key]
      if (child.state) {
        if (isArray(child.state)) {
          Object.defineProperty(child.state, 'parent', {
            value: state.parent,
            enumerable: false, // Set this to true if you want the method to appear in for...in loops
            configurable: true, // Set this to true if you want to allow redefining/removing the property later
            writable: true // Set this to true if you want to allow changing the function later
          })
        } else {
          Object.setPrototypeOf(child, { parent: state.parent })
        }
      }
    }
  }

  element.state.update({}, { isHoisted: true, ...options })
  return element.state
}

export const parentUpdate = function (obj, options = {}) {
  const state = this
  if (!state || !state.parent) return
  return state.parent.update(obj, { isHoisted: true, ...options })
}

export const rootUpdate = function (obj, options = {}) {
  const state = this
  if (!state) return
  const rootState = (state.__element.__ref.root).state
  return rootState.update(obj, { isHoisted: false, ...options })
}

export const add = function (value, options = {}) {
  const state = this
  if (isArray(state)) {
    state.push(value)
    state.update(state.parse(), { overwrite: true, ...options })
  } else if (isObject(state)) {
    const key = Object.keys(state).length
    state.update({ [key]: value }, options)
  }
}

export const toggle = function (key, options = {}) {
  const state = this
  state.update({ [key]: !state[key] }, options)
}

export const remove = function (key, options = {}) {
  const state = this
  // if (isArray(state)) removeFromArray(state, key)
  // if (isObject(state)) removeFromObject(state, key)
  state[key] = null
  return state.set(state.parse(), { replace: true, ...options })
}

export const set = function (val, options = {}) {
  const state = this
  const value = deepCloneWithExtend(val)
  return state.clean({ preventStateUpdate: true, ...options })
    .update(value, { replace: true, ...options })
}

export const reset = function (options = {}) {
  const state = this
  const value = deepCloneWithExtend(state.parse())
  return state.set(value, { replace: true, ...options })
}

export const apply = function (func, options = {}) {
  const state = this
  if (isFunction(func)) {
    const value = func(state)
    return state.update(value, { replace: true, ...options })
  }
}

export const applyReplace = function (func, options = {}) {
  const state = this
  if (isFunction(func)) {
    const value = func(state)
    return state.replace(value, options)
  }
}

export const applyFunction = function (func, options = {}) {
  const state = this
  if (isFunction(func)) {
    func(state)
    return state.update(state.parse(), { replace: true, ...options })
  }
}

export const quietUpdate = function (obj, options = {}) {
  const state = this
  return state.update(obj, { preventUpdate: true, ...options })
}

export const replace = function (obj, options = {}) {
  const state = this

  for (const param in obj) {
    state[param] = obj[param]
  }

  return state.update(obj, options)
}

export const quietReplace = function (obj, options = {}) {
  const state = this
  return state.replace(obj, { preventUpdate: true, ...options })
}

export const keys = function (obj, options = {}) {
  const state = this
  return Object.keys(state)
}

export const values = function (obj, options = {}) {
  const state = this
  return Object.values(state)
}
