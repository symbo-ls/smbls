'use strict'

import { isFunction, isMethod, isObject, isUndefined } from '@domql/utils'
import { applyEventsOnNode, triggerEventOn } from './event/index.js'
import { propagateEventsFromProps, propagateEventsFromElement } from './utils/propEvents.js'
import { cacheNode } from './render/index.js'
import { create } from './create.js'

import {
  throughExecProps,
  throughInitialDefine,
  throughInitialExec
} from './iterate.js'
import { REGISTRY } from './mixins/index.js'
import { applyParam } from './utils/applyParam.js'
import setChildren from './children.js'
import { setContent } from './set.js'
// import { defineSetter } from './methods'

const ENV = process.env.NODE_ENV

export const createNode = (element, opts) => {
  // create and assign a node
  let { node, tag, __ref: ref } = element

  if (!ref.__if) return element

  let isNewNode

  if (!node) {
    isNewNode = true

    if (tag === 'shadow') {
      node = element.node = element.parent.node.attachShadow({ mode: 'open' })
    } else node = element.node = cacheNode(element)

    // trigger `on.attachNode`
    triggerEventOn('attachNode', element, opts)
  }
  // node.dataset // .key = element.key

  if (ENV === 'test' || ENV === 'development' || opts.alowRefReference) {
    node.ref = element
    if (isFunction(node.setAttribute)) node.setAttribute('key', element.key)
  }

  // iterate through exec props
  throughExecProps(element)

  // iterate through define
  throughInitialDefine(element)

  // iterate through exec
  throughInitialExec(element)

  propagateEventsFromProps(element)
  propagateEventsFromElement(element)
  applyEventsOnNode(element, { isNewNode, ...opts })

  for (const param in element) {
    const value = element[param]

    if (
      !Object.prototype.hasOwnProperty.call(element, param) ||
      value === undefined ||
      isMethod(param, element) ||
      isObject(REGISTRY[param]) ||
      (param.length > 2 && param.charCodeAt(0) === 111 && param.charCodeAt(1) === 110 && param.charCodeAt(2) >= 65 && param.charCodeAt(2) <= 90)
    ) {
      continue
    }

    const isElement = applyParam(param, element, opts)
    if (isElement) {
      const { hasDefine, hasContextDefine } = isElement
      if (element[param] && !hasDefine && !hasContextDefine) {
        const createAsync = () => {
          create(value, element, param, opts)
        }

        // TODO: test this with promise
        // handle lazy load
        if ((element.props && element.props.lazyLoad) || opts.lazyLoad) {
          window.requestAnimationFrame(() => {
            createAsync()
            if (!opts.preventUpdateListener) {
              triggerEventOn('lazyLoad', element, opts)
            }
          })
        } else createAsync()
      }
    }
  }

  const content = element.children
    ? setChildren(element.children, element, opts)
    : element.children || element.content

  if (content) {
    setContent(content, element, opts)
  }

  // node.dataset.key = key
  return element
}

export default createNode
