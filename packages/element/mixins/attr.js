'use strict'

import { deepMerge, exec, isNot, isString } from '@domql/utils'
import { report } from '@domql/report'

/**
 * Recursively add attributes to a DOM node
 */
export function attr (params, element, node) {
  const { __ref: ref, props } = element
  const { __attr } = ref
  if (isNot(params)('object')) report('HTMLInvalidAttr', params)
  if (params) {
    const attrs = exec(params, element)
    if (props.attr) deepMerge(attrs, props.attr)
    for (const attr in attrs) {
      let val = exec(attrs[attr], element)
      if (isString(val) && val.includes('{{') && element.call) {
        val = element.call('replaceLiteralsWithObjectFields', val, element.state)
      }
      if (val === __attr[attr]) continue
      if (
        val !== false &&
        val !== undefined &&
        val !== null &&
        node.setAttribute
      ) {
        node.setAttribute(attr, val)
      } else if (node.removeAttribute) node.removeAttribute(attr)
      __attr[attr] = val
    }
  }
}

export default attr
