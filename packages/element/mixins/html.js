'use strict'

import { exec, isString } from '@domql/utils'

/**
 * Appends raw HTML as content
 * an original one as a child
 */
export function html (param, element, node) {
  let prop = exec(param ?? element?.props?.html, element)
  if (isString(prop) && prop.includes('{{') && element.call) {
    prop = element.call('replaceLiteralsWithObjectFields', prop, element.state)
  }
  const { __ref } = element
  if (prop !== __ref.__html) {
    if (node.nodeName === 'SVG') node.textContent = prop
    else node.innerHTML = prop
    __ref.__html = prop
  }
}

export default html
