'use strict'

import { merge, deepMerge, isFunction, isObject, isArray } from '@domql/utils'
import { keySetters } from '@symbo.ls/atoms'

import { CSS_PROPS_REGISTRY } from './registry'

export const transformClassname = (props, context = {}, registry = CSS_PROPS_REGISTRY) => {
  const CLASS_NAMES = {}
  if (!isObject(props)) return

  for (const key in props) {
    const setter = keySetters[key.slice(0, 1)]
    const hasCSS = registry[key]

    if (setter) setter(key, props[key], CLASS_NAMES)
    else if (isFunction(hasCSS)) {
      const stack = hasCSS({ props, context })
      const exec = isArray(stack) ? stack.reduce((a, c) => {
        return merge(a, c)
      }, {}) : stack
      deepMerge(CLASS_NAMES, exec)
    }
    else if (key === 'style') {
      deepMerge(CLASS_NAMES, props[key])
    }
  }
  console.log(CLASS_NAMES)

  return CLASS_NAMES
}
