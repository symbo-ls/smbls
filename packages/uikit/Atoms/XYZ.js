'use strict'

import { isUndefined } from 'smbls'

export const XYZ = {
  class: {
    zIndex: ({ props }) => !isUndefined(props.zIndex) && ({ zIndex: props.zIndex })
  }
}
