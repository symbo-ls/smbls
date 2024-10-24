'use strict'

import { report } from '@domql/report'
import { registry } from './mixins'

export default (params, options = {}) => {
  const { overwrite } = options
  for (const param in params) {
    if (registry[param] && !overwrite) {
      report('OverwriteToBuiltin', param)
    } else registry[param] = params[param]
  }
}
