'use strict'

import { createExtendsFromKeys } from './extends.js'
import { isString } from './types.js'

export const matchesComponentNaming = key => {
  if (!isString(key) || !key.length) return false
  const code = key.charCodeAt(0)
  return code >= 65 && code <= 90 // A-Z
}

export function getCapitalCaseKeys (obj) {
  return Object.keys(obj).filter(key => /^[A-Z]/.test(key))
}

export function getSpreadChildren (obj) {
  return Object.keys(obj).filter(key => /^\d+$/.test(key))
}

export function isContextComponent (element, parent, passedKey) {
  const { context } = parent || {}
  const [extendsKey] = createExtendsFromKeys(passedKey)
  const key = passedKey || extendsKey
  return context?.components?.[key] || context?.pages?.[key]
}
