'use strict'

import { exec, isObject } from '@domql/utils'
import { report } from '@domql/report'

/**
 * Recursively add styles to a DOM node
 */
export function style (params, element, node) {
  if (params) {
    if (isObject(params)) {
      const { __ref } = element
      if (!__ref.__style) __ref.__style = {}
      const cache = __ref.__style
      for (const prop in params) {
        const val = exec(params[prop], element)
        if (val === cache[prop]) continue
        cache[prop] = val
        node.style[prop] = val
      }
    } else report('HTMLInvalidStyles', params)
  }
}

export default style
