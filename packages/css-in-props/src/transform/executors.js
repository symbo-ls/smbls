'use strict'

import { exec, isArray, isFunction, isObject, isProduction, merge, overwrite, overwriteDeep } from '@domql/utils'
import { CSS_PROPS_REGISTRY } from '../props'
import { DEFAULT_CSS_PROPERTIES_LIST } from '../props/defaults'
import { applyTrueProps, transformersByPrefix } from './transformers'

/**
 * CLASS ASSIGNMENT
 * Main handlers for processing and assigning classes
 */

const isProd = isProduction()

// Process non-setter properties and return remaining props
export const usePropsAsCSS = (sourceObj, element, opts) => {
  let obj = {}
  const rest = {}

  const setToObj = (key, val) => {
    if (opts.unpack) {
      obj = { ...obj, ...val }
      return
    }
    obj[key] = val
  }

  for (const key in sourceObj) {
    const value = sourceObj[key]
    if (key === 'class' && element.call('isString', sourceObj.class)) {
      const val = value.split(' ')
      if (val.length) {
        const CLASS = element.context.designSystem.CLASS
        const result = val
          .reduce((acc, curr) => merge(acc, CLASS[curr]), {})
        obj.designSystemClass = result
      }
    } else if (key === 'true') {
      const val = exec(value, element)
      merge(obj, applyTrueProps(val, element))
    } else if (element.classlist[key]) {
      const originalFromClass = element.classlist[key]
      const result = isFunction(originalFromClass)
        ? originalFromClass(element, element.state, element.context)
        : originalFromClass
      if (result) setToObj(key, result)
      if (!isProd && isObject(obj[key])) obj[key].label = key
    } else if (CSS_PROPS_REGISTRY[key]) {
      let val = exec(value, element)
      if (isArray(val)) {
        val = val.reduce((a, c) => merge(a, c), {})
      }
      const result = CSS_PROPS_REGISTRY[key](val, element, element.state, element.context)
      if (result) setToObj(key, result)
      if (!isProd && isObject(obj[key])) obj[key].label = key
    } else if (DEFAULT_CSS_PROPERTIES_LIST.includes(key)) {
      // they can be grouped
      const result = exec(value, element)
      setToObj(key, { [key]: result })
      if (!isProd && isObject(obj[key])) obj[key].label = key
    } else {
      rest[key] = value
    }
  }

  return [obj, rest]
}

export const useSelectorsAsCSS = (sourceObj, element) => {
  const obj = {}
  for (const key in sourceObj) {
    const selectroSetter = transformersByPrefix[key.slice(0, 1)]
    if (selectroSetter) {
      const result = selectroSetter(key, sourceObj[key], element)
      if (result) overwriteDeep(obj, result)
    }
  }
  return obj
}

export const useCssInProps = (selectorProps, element, opts = { unpack: true }) => {
  const [cssObj, restProps] = usePropsAsCSS(selectorProps, element, opts)
  const selectorsObj = useSelectorsAsCSS(restProps, element)
  if (Object.keys(selectorsObj).length) {
    // console.log(opts.unpack, cssObj, selectorsObj)
    if (opts.unpack) return overwrite(cssObj, selectorsObj)
    cssObj._selectors = selectorsObj
  }
  return cssObj
}

export const exetuteClassPerComponent = (component, element) => {
  const classObj = {}
  if (component.class) {
    for (const classProp in component.class) {
      classObj[classProp] = component.class[classProp](element)
    }
  }
  return classObj
}
