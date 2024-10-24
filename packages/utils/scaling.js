'use strict'

import { isObject, isArray } from '@domql/utils'

export const findClosestNumber = (number, arr) => {
  return (isArray(arr) ? arr : Object.values(arr)).reduce((prev, curr) => {
    return (Math.abs(curr - number) < Math.abs(prev - number) ? curr : prev)
  })
}

export const findClosestNumberInFactory = (val, factory) => {
  val = parseFloat(val)
  if (isObject(factory)) factory = Object.values(factory)
  return findClosestNumber(val, factory)
}
