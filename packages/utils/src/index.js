'use strict'

import { isString, isObject, isArray, isNumber } from '@domql/utils'

export * from './scaling'
export * from './date'

export const copyStringToClipboard = str => {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style = { position: 'absolute', left: '-9999px' }
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}

export const toCamelCase = str => {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index === 0 ? word.toLowerCase() : word.toUpperCase()
  }).replaceAll(/\s+/g, '')
}

export const toTitleCase = str => str.replace(
  /\w\S*/g, txt => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  }
)

export const toDashCase = val => val
  .replace(/[^a-zA-Z0-9]/g, ' ') // Replace non-alphanumeric characters with spaces
  .trim() // Remove leading and trailing spaces
  .toLowerCase() // Convert to lowercase
  .replace(/\s+/g, '-') // Replace spaces with dashes
  .replace(/-+/g, '-') // Replace consecutive dashes with a single dash
  .replace(/^-|-$/g, '') // Remove leading and trailing dashes

export const toDescriptionCase = str => {
  const result = str.replace(/([A-Z])/g, ' $1')
  return result.charAt(0).toUpperCase() + result.slice(1)
}

export const arrayzeValue = val => {
  if (isArray(val)) return val
  if (isString(val)) return val.split(' ')
  if (isObject(val)) return Object.values(val)
  if (isNumber(val)) return [val]
}
