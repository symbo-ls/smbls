'use strict'

import { exec, isObject, STATE_METHODS } from '@domql/utils'

export function state (params, element, node) {
  const state = exec(params, element)

  if (isObject(state)) {
    for (const param in state) {
      if (STATE_METHODS.has(param)) continue
      if (!Object.prototype.hasOwnProperty.call(state, param)) continue
    }
  }

  return element
}

export default state
