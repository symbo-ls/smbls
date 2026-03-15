import { params } from './params.js'

export const define = (newParams, options = {}) => {
  const { overwrite } = options
  for (const param in newParams) {
    if (params[param] && !overwrite) {
      console.warn('Can\'t overwrite default params. Use { overwrite: true } to force update')
    } else {
      params[param] = newParams[param]
    }
  }
}
