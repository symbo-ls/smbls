import { REGISTRY } from '@domql/element/mixins/registry.js'

export function temporaryDomqlHack(value) {
  if (this && !this.getUserSettings?.('useDomql3')) return value
  let obj = { ...value }
  const on = obj.on
  if (this.call('isObject', on)) {
    delete obj.on
    const transformedOn = {}
    for (const key in on) {
      const transformedKey = 'on' + key.charAt(0).toUpperCase() + key.slice(1)
      transformedOn[transformedKey] = on[key]
    }
    obj = { ...transformedOn, ...obj }
  }
  const props = obj.props
  if (this.call('isObject', props)) {
    delete obj.props
    obj = { ...props, ...obj }
  }
  const extendObj = {}
  if (obj.extend) {
    extendObj.extends = obj.extend
    delete obj.extend
  }
  if (obj.childExtend) {
    extendObj.childExtends = obj.childExtend
    delete obj.childExtend
  }
  return { ...extendObj, ...obj }
}

export function temporaryDomqlHackReverse(value) {
  if (this && !this.getUserSettings?.('useDomql3')) return value
  const obj = { ...value }
  if (obj.extends) {
    obj.extend = obj.extends
    delete obj.extends
  }
  if (obj.childExtends) {
    obj.childExtend = obj.childExtends
    delete obj.childExtends
  }
  for (const key in obj) {
    const allowed = ['transform', 'class']
    if ((REGISTRY[key] && !allowed.includes(key)) || /^[A-Z]/.test(key))
      continue
    else {
      obj.props = obj.props || {}
      obj.props[key] = obj[key]
      delete obj[key]
    }
  }
  return obj
}
