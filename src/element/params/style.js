'use strict'

import { isObject, map } from '../../utils'
import Err from '../../res/error'

import { css } from 'emotion'

/**
 * Recursively add styles to a DOM node
 */
export default (params, element, node) => {
  if (params) {
    var { key } = element
    if (css) {
      var CSSed = css(params)
      if (isObject(element.class)) element.class.style = CSSed
      else if (typeof params === 'string') element.class += ` ${CSSed}`
      else if (params === true) element.class = { key, style: CSSed }
    } else if (isObject(params)) map(node.style, params, element)
    else Err('HTMLInvalidStyles', params)
  }
}
