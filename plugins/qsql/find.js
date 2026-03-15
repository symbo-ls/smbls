import { REGISTRY } from './registry.js'

export const find = (key) => {
  const element = REGISTRY[key]
  if (!element) console.warn(`Can't find element "${key}"`)
  return element
}
