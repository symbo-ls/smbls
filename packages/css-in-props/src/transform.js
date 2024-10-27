'use strict'

import { merge, deepMerge, isFunction, isObject, isArray } from '@domql/utils'
import { keySetters } from '@symbo.ls/atoms'

import { CSS_PREPROCS_DEFAULTS } from './registry'
import { DEFAULT_CSS_PROPERTIES_LIST } from './defaults'

export const transformClassname = (
  element,
  restProps = {}
) => {
  const classCss = {}
  const { props, class: elementClass } = element

  if (!isObject(props)) return

  // merge(elementClass, registry)
  // if (registry && Object.keys(registry)[0] !== Object.keys(CSS_PROPS_REGISTRY)[0]) {
  //   merge(elementClass, CSS_PROPS_REGISTRY)
  // }

  for (const key in props) {
    const setter = keySetters[key.slice(0, 1)]
    const hasCSS = elementClass[key]

    if (setter) setter(key, props[key], classCss, element, true)
    else if (isFunction(hasCSS)) {
      // const stack = hasCSS(element)
      const stack = hasCSS(element, element.state, element.context)
      const exec = isArray(stack)
        ? stack.reduce((a, c) => {
          return merge(a, c)
        }, {})
        : stack
      deepMerge(classCss, exec)
    } else if (key === 'style') {
      deepMerge(classCss, props[key])
    } else restProps[key] = props[key]
  }

  return classCss
}

export const extractCSSfromProps = (element) => {
  const { props: defProps } = element
  const css = {}
  const props = {}

  for (const key in defProps) {
    const val = defProps[key]

    const mediaProp = keySetters[key.slice(0, 1)]
    if (mediaProp) {
      mediaProp(key, defProps[key], css, element, true)
      continue
    }

    const preprop = CSS_PREPROCS_DEFAULTS[key]
    if (preprop) {
      // const stack = hasCSS(element)
      const stack = preprop(element, element.state, element.context)
      const exec = isArray(stack)
        ? stack.reduce((a, c) => {
          return merge(a, c)
        }, {})
        : stack
      deepMerge(css, exec)
      continue
    }

    if (key === 'style') {
      deepMerge(css, defProps[key])
      continue
    }

    if (DEFAULT_CSS_PROPERTIES_LIST.includes(key)) {
      css[key] = val
      continue
    }

    props[key] = val
  }

  return { css, props }
}
