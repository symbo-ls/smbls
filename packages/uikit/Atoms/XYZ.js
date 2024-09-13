'use strict'

import { isUndefined } from '@domql/utils'

export const XYZ = {
  class: {
    zIndex: ({ props }) => !isUndefined(props.zIndex) && ({ zIndex: props.zIndex }),
    perspective: ({ props }) => !isUndefined(props.perspective) && ({ perspective: props.perspective }),
    perspectiveOrigin: ({ props }) => !isUndefined(props.perspectiveOrigin) && ({ perspectiveOrigin: props.perspectiveOrigin })
  }
}
