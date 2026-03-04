'use strict'

import { isHtmlElement, isNode } from './node.js'

export const isObject = arg => {
  if (arg === null) return false
  return (typeof arg === 'object') && (arg.constructor === Object)
}

export const isString = arg => typeof arg === 'string'

export const isNumber = arg => typeof arg === 'number'

export const isFunction = arg => typeof arg === 'function'

export const isBoolean = arg => arg === true || arg === false

export const isNull = arg => arg === null

export const isArray = arg => Array.isArray(arg)

export const isDate = d => d instanceof Date

export const isObjectLike = arg => {
  if (arg === null) return false
  // if (isArray(arg)) return false
  return (typeof arg === 'object')
}

export const isDefined = arg => arg !== undefined

export const isUndefined = arg => {
  return arg === undefined
}

export const TYPES = {
  boolean: isBoolean,
  array: isArray,
  object: isObject,
  string: isString,
  date: isDate,
  number: isNumber,
  null: isNull,
  function: isFunction,
  objectLike: isObjectLike,
  node: isNode,
  htmlElement: isHtmlElement,
  defined: isDefined
}

export const is = (arg) => {
  return (...args) => args.some(val => TYPES[val](arg))
}

export const isNot = (arg) => {
  return (...args) => !args.some(val => TYPES[val](arg))
}
