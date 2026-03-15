'use strict'

import { getSpacingByKey } from '@symbo.ls/scratch'

export const POSITION_PROPS = {
  inset: (val, el) => {
    if (el.call('isNumber', val)) return ({ inset: val })
    if (!el.call('isString', val)) return
    return { inset: val.split(' ').map(v => getSpacingByKey(v, 'k').k).join(' ') }
  },

  left: (val) => getSpacingByKey(val, 'left'),
  top: (val) => getSpacingByKey(val, 'top'),
  right: (val) => getSpacingByKey(val, 'right'),
  bottom: (val) => getSpacingByKey(val, 'bottom'),

  verticalInset: (val) => {
    if (typeof val !== 'string') return
    const vi = val.split(' ').map(v => getSpacingByKey(v, 'k').k)
    return {
      top: vi[0],
      bottom: vi[1] || vi[0]
    }
  },

  horizontalInset: (val) => {
    if (typeof val !== 'string') return
    const vi = val.split(' ').map(v => getSpacingByKey(v, 'k').k)
    return {
      left: vi[0],
      right: vi[1] || vi[0]
    }
  }
}
