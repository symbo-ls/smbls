'use strict'

import { isFunction } from '@domql/utils'

export const removeContentElement = function (el) {
  const element = el || this
  const { __ref } = element

  if (element.content) {
    if (element.content.node) {
      if (element.content.tag === 'fragment') element.node.innerHTML = ''
      else element.node.removeChild(element.content.node)
    }

    const { __cached } = __ref
    if (__cached && __cached.content) {
      if (__cached.content.tag === 'fragment') __cached.content.parent.node.innerHTML = ''
      else if (__cached.content && isFunction(__cached.content.remove)) __cached.content.remove()
    }

    delete element.content
  }
}