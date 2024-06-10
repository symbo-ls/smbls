'use strict'

import { isUndefined } from '@domql/utils'

export const XYZ = {
  class: {
    zIndex: ({ props }) => !isUndefined(props.zIndex) && ({ zIndex: props.zIndex })
  }
}
