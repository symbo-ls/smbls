'use strict'

import { useCssInProps } from './executors'

/**
 * PROP APPLICATORS
 * Functions that handle different types of property applications
 */

// Media query handler
const applyMediaProps = (key, selectorProps, element) => {
  const { context } = element
  if (!context.designSystem?.MEDIA) return

  // const globalTheme = getSystemGlobalTheme(element)
  const mediaValue = context.designSystem.MEDIA[key.slice(1)]
  const generatedClass = useCssInProps(selectorProps, element)
  // const name = key.slice(1)
  // console.log('==generatedClass', generatedClass)

  // Theme handling
  // if (globalTheme && ['dark', 'light'].includes(name)) {
  //   return name === globalTheme ? merge(result, generatedClass) : undefined
  // }

  // Media query construction
  const mediaKey = mediaValue
    ? '@media ' + (mediaValue === 'print' ? mediaValue : `screen and ${mediaValue}`)
    : key

  // result[mediaKey] = generatedClass
  // console.log(result, mediaKey)
  // return result[mediaKey]
  return { [mediaKey]: generatedClass }
}

// Simple applicators
const applyAndProps = (key, selectorProps, element) => {
  return { [key]: useCssInProps(selectorProps, element) }
}

const applySelectorProps = (key, selectorProps, element) => {
  const selectorKey = `&${key}`
  return { [selectorKey]: useCssInProps(selectorProps, element) }
}

// Conditional applicators
const applyCaseProps = (key, selectorProps, element) => {
  const { CASES } = element.context?.designSystem || {}
  const caseKey = key.slice(1)
  const isCaseTrue = !CASES?.[caseKey] && !element.props[caseKey]
  if (!isCaseTrue) return
  return useCssInProps(selectorProps, element)
}

const applyVariableProps = (key, selectorVal, element) => {
  return { [key]: selectorVal }
}

const applyConditionalCaseProps = (key, selectorProps, element) => {
  const caseKey = key.slice(1)
  const isCaseTrue = element.props[caseKey] === true || element.state[caseKey] || element[caseKey]
  if (!isCaseTrue) return
  return useCssInProps(selectorProps, element)
}

const applyConditionalFalsyProps = (key, selectorProps, element) => {
  const caseKey = key.slice(1)
  const isCaseTrue = element.props[caseKey] === true || element.state[caseKey] || element[caseKey]
  if (isCaseTrue) return
  return useCssInProps(selectorProps, element)
}

export const applyTrueProps = (selectorProps, element) => {
  return useCssInProps(selectorProps, element)
}

/**
 * REGISTRY
 * Mapping of key prefixes to their handler functions
 */
export const transformersByPrefix = {
  // Media and theme handlers
  // key, props, result, element, isSubtree
  '@': applyMediaProps,

  // Selector handlers
  ':': applySelectorProps,
  '[': applySelectorProps,
  '*': applySelectorProps,
  '+': applySelectorProps,
  '~': applySelectorProps,
  '&': applyAndProps,
  '>': applyAndProps,

  // Conditional and variable handlers
  $: applyCaseProps,
  '-': applyVariableProps,
  '.': applyConditionalCaseProps,
  '!': applyConditionalFalsyProps
}
