'use strict'

import { merge, deepMerge, isFunction, isObject, isArray } from '@domql/utils'
import { keySetters } from '@symbo.ls/atoms'

import { CSS_PROPS_REGISTRY } from './registry'

export const transformClassname = (props, context = {}, registry = CSS_PROPS_REGISTRY, excludedProps = {}, element) => {
  const CLASS_NAMES = {}
  if (!isObject(props)) return

  merge(element.class, registry)
  if (Object.keys(registry)[0] !== Object.keys(CSS_PROPS_REGISTRY)[0]) {
    merge(element.class, CSS_PROPS_REGISTRY)
  }

  for (const key in props) {
    const setter = keySetters[key.slice(0, 1)]
    const hasCSS = registry[key]

    if (setter) setter(key, props[key], CLASS_NAMES, element, true)
    else if (isFunction(hasCSS)) {
      // const stack = hasCSS(element)
      const stack = hasCSS({ ...element, props, context })
      const exec = isArray(stack)
        ? stack.reduce((a, c) => {
          return merge(a, c)
        }, {})
        : stack
      deepMerge(CLASS_NAMES, exec)
    } else if (key === 'style') {
      deepMerge(CLASS_NAMES, props[key])
    } else excludedProps[key] = props[key]
  }

  return CLASS_NAMES
}
