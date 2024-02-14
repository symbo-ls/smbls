'use strict'

import { isUndefined } from 'smbls'

export const Transform = {
  class: {
    zoom: ({ props }) => !isUndefined(props.zoom) && ({ zoom: props.zoom }),
    transform: ({ props }) => !isUndefined(props.transform) && ({ transform: props.transform }),
    transformOrigin: ({ props }) => !isUndefined(props.transformOrigin) && ({ transformOrigin: props.transformOrigin })
  }
}
