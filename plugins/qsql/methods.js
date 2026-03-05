export const methods = {}

export const setMethod = (newMethods) => {
  for (const param in newMethods) {
    methods[param] = newMethods[param]
  }
  return methods
}
