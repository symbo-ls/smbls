'use strict'

import { merge, isArray, overwriteDeep, overwriteShallow } from '@domql/utils'
import { getSystemGlobalTheme } from './Theme'

export const keySetters = {
  '@': (key, props, result, element, isSubtree) => applyMediaProps(
    key, props, isSubtree ? result : (result && result.media), element
  ),
  ':': (key, props, result, element, isSubtree) => applySelectorProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  '[': (key, props, result, element, isSubtree) => applySelectorProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  '*': (key, props, result, element, isSubtree) => applySelectorProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  '+': (key, props, result, element, isSubtree) => applySelectorProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  '~': (key, props, result, element, isSubtree) => applySelectorProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  '&': (key, props, result, element, isSubtree) => applyAndProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  '>': (key, props, result, element, isSubtree) => applyAndProps(
    key, props, isSubtree ? result : (result && result.selector), element
  ),
  $: (key, props, result, element, isSubtree) => applyCaseProps(
    key, props, isSubtree ? result : (result && result.case), element
  ),
  '-': (key, props, result, element, isSubtree) => applyVariableProps(
    key, props, isSubtree ? result : (result && result.variable), element
  ),
  '.': (key, props, result, element, isSubtree) => applyConditionalCaseProps(
    key, props, isSubtree ? result : (result && result.case), element
  ),
  '!': (key, props, result, element, isSubtree) => applyConditionalFalsyProps(
    key, props, isSubtree ? result : (result && result.case), element
  )
}

const execClass = (key, props, result, element) => {
  const { class: className } = element
  const classnameExec = className[key]

  if (typeof classnameExec !== 'function') return

  let classExec = classnameExec({
    props,
    context: element.context,
    state: element.state,
    deps: element.deps
  }, element.state, element.context)

  if (isArray(classExec)) classExec = classExec.reduce((a, c) => merge(a, c), {})

  for (const finalProp in classExec) {
    result[finalProp] = classExec[finalProp]
  }

  return classExec
}

const convertPropsToClass = (props, result, element) => {
  const propsClassObj = {}

  for (const key in props) {
    const setter = keySetters[key.slice(0, 1)]
    if (setter) {
      setter(key, props[key], propsClassObj, element, true)
      continue
    } else {
      execClass(key, props, propsClassObj, element)
    }
  }

  return propsClassObj
}

const applyMediaProps = (key, props, result, element) => {
  const { context } = element
  if (!context.designSystem || !context.designSystem.MEDIA) return
  const globalTheme = getSystemGlobalTheme(element)
  const { MEDIA } = context.designSystem
  const mediaValue = MEDIA[key.slice(1)]
  const generatedClass = convertPropsToClass(props, result, element)

  const name = key.slice(1)
  const isTheme = ['dark', 'light'].includes(name)
  const matchesGlobal = name === globalTheme

  if (globalTheme && isTheme) {
    if (matchesGlobal) return merge(result, generatedClass)
    return
  }

  const printValue = '@media ' + (mediaValue === 'print' ? `${mediaValue}` : `screen and ${mediaValue}`)
  const mediaKey = mediaValue ? printValue : key
  result[mediaKey] = generatedClass
  return result[mediaKey]
}

const applyAndProps = (key, props, result, element) => {
  result[key] = convertPropsToClass(props, result, element)
  return result[key]
}

const applySelectorProps = (key, props, result, element) => {
  const selectorKey = `&${key}`
  result[selectorKey] = convertPropsToClass(props, result, element)
  return result[selectorKey]
}

const applyCaseProps = (key, props, result, element) => {
  const { CASES } = element.context && element.context.designSystem
  const caseKey = key.slice(1)
  const isPropTrue = element.props[caseKey]
  if (!CASES[caseKey] && !isPropTrue) return
  return merge(result, convertPropsToClass(props, result, element))
}

const applyVariableProps = (key, props, result, element) => {
  result[key] = props
  return result
}

const applyConditionalCaseProps = (key, props, result, element) => {
  const caseKey = key.slice(1)
  const isPropTrue = element.props[caseKey] || element.state[caseKey] || element[caseKey]
  if (!isPropTrue) return // remove classname if not here
  return overwriteDeep(result, convertPropsToClass(props, result, element))
}

const applyConditionalFalsyProps = (key, props, result, element) => {
  const caseKey = key.slice(1)
  const isPropTrue = element.props[caseKey] || element.state[caseKey] || element[caseKey]
  if (!isPropTrue) return overwriteDeep(result, convertPropsToClass(props, result, element))
}

const applyTrueProps = (props, result, element) => merge(result, convertPropsToClass(props, result, element))

const beforeClassAssign = (element, s) => {
  const { props, class: className, context } = element

  const CLASS_NAMES = {
    media: {},
    selector: {},
    case: {},
    variable: {}
  }

  if (!context) return
  const globalTheme = context.designSystem.globalTheme

  for (const key in props) {
    const setter = keySetters[key.slice(0, 1)]
    if (globalTheme) {
      if (key === 'theme' && !props.themeModifier) {
        props.update({
          themeModifier: globalTheme
        }, {
          preventListeners: true,
          preventRecursive: true,
          isForced: true,
          preventDefineUpdate: true
        })
      }
    }
    if (setter) setter(key, props[key], CLASS_NAMES, element)
    else if (key === 'true') applyTrueProps(props[key], CLASS_NAMES, element)
  }

  // override props
  // if (props['^']) {
  //   for (const key in props['^']) {
  //     execClass(key, props, CLASS_NAMES, element)
  //   }
  // }

  const parentProps = element.parent && element.parent.props
  if (parentProps && parentProps.spacingRatio && parentProps.inheritSpacingRatio) {
    element.setProps({
      spacingRatio: parentProps.spacingRatio,
      inheritSpacingRatio: true
    }, {
      preventListeners: true,
      preventRecursive: true,
      isForced: true,
      preventDefineUpdate: true
    })
  }

  overwriteShallow(className, CLASS_NAMES)
}

export const Media = {
  class: {
    case: (el, s) => {
      return {
        //
      }
    }
  },
  on: { beforeClassAssign }
}
