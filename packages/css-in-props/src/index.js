'use strict'

export * from './transform'
export * from './set'
export * from './emotion'
export * from './props'
export * from './props/defaults'

export const exetuteClassPerComponent = (component, element) => {
  const classObj = {}
  if (component.class) {
    for (const classProp in component.class) {
      classObj[classProp] = component.class[classProp](element)
    }
  }
  return classObj
}
