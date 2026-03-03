'use strict'

import { create } from '../create.js'
import { exec, isString, SVG_TAGS } from '@domql/utils'

/**
 * Creates a text node and appends into
 * an original one as a child
 */
export function text (param, element, node) {
  let prop = exec(element.props.text || param, element)
  if (isString(prop) && prop.includes('{{')) {
    prop = element.call('replaceLiteralsWithObjectFields', prop, element.state)
  }
  if (element.tag === 'string') {
    node.nodeValue = prop
  } else if (param !== undefined && param !== null) {
    // SVG elements don't support appending text nodes as children
    if (SVG_TAGS.has(element.tag)) {
      if (node) node.textContent = prop
      return
    }
    if (element.__text) {
      if (element.__text.text === prop) return
      element.__text.text = prop
      if (element.__text.node) element.__text.node.nodeValue = prop
    } else create({ tag: 'string', text: prop }, element, '__text')
  }
}

export default text
