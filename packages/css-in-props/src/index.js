'use strict'

export * from './transform'
export * from './set'
export * from './emotion'
export * from './registry'

export const exetutePerComponent = (component, element) => {
  const classObj = {}
  if (component.class) {
    for (const classProp in component.class) {
      classObj[classProp] = component.class[classProp](element)
    }
  }
  return classObj
}
