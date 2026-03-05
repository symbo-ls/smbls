'use strict'

import {
  applyDependentState,
  checkForStateTypes,
  checkIfInherits,
  createInheritedState,
  isUndefined,
  triggerEventOn
} from '@domql/utils'

import { applyStateMethods } from './methods.js'

export const createState = function (element, parent, options) {
  element.state = applyInitialState(element, parent, options)
  return element.state
}

export const applyInitialState = function (element, parent, options) {
  const objectizeState = checkForStateTypes(element)
  if (objectizeState === false) return parent.state || {}
  else element.state = objectizeState

  const whatInitReturns = triggerEventOn('stateInit', element, options)
  if (whatInitReturns === false) return element.state

  if (checkIfInherits(element)) {
    const inheritedState = createInheritedState(element, parent)
    element.state = isUndefined(inheritedState) ? {} : inheritedState
  }

  const dependentState = applyDependentState(
    element,
    element.state || parent.state || {}
  )
  if (dependentState) element.state = dependentState

  applyStateMethods(element)

  // trigger `on.stateCreated`
  triggerEventOn('stateCreated', element)

  return element.state
}
