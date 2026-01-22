import { REGISTRY } from '@domql/element/mixins/registry.js'

export function temporaryDomqlHack(value) {
  if (this && !this.getUserSettings?.('useDomql3')) return value
  if (value.extends) {
    value.extends = value.extend
    delete value.extend
  }
  if (value.childExtends) {
    value.childExtends = value.childExtend
    delete value.childExtend
  }
  return value
}

export function temporaryDomqlHackReverse(value) {
  if (this && !this.getUserSettings?.('useDomql3')) return value
  if (value.extends) {
    value.extend = value.extends
    delete value.extends
  }
  if (value.childExtends) {
    value.childExtend = value.childExtends
    delete value.childExtends
  }
  for (const key in value) {
    const allowed = ['transform', 'class']
    if ((REGISTRY[key] && !allowed.includes(key)) || /^[A-Z]/.test(key))
      continue
    else {
      value.props = value.props || {}
      value.props[key] = value[key]
      delete value[key]
    }
  }
  return value
}
