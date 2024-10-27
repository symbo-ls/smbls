'use strict'

import { getSpacingByKey } from '@symbo.ls/scratch'

export const POSITION_PROPS = {
  inset: ({ props, context }) => {
    const { inset } = props
    if (context.utils.isNumber(inset)) return ({ inset })
    if (!context.utils.isString(inset)) return
    return { inset: inset.split(' ').map(v => getSpacingByKey(v, 'k').k).join(' ') }
  },

  left: ({ props }) => getSpacingByKey(props.left, 'left'),
  top: ({ props }) => getSpacingByKey(props.top, 'top'),
  right: ({ props }) => getSpacingByKey(props.right, 'right'),
  bottom: ({ props }) => getSpacingByKey(props.bottom, 'bottom'),

  verticalInset: ({ props }) => {
    const { verticalInset } = props
    if (typeof verticalInset !== 'string') return
    const vi = verticalInset.split(' ').map(v => getSpacingByKey(v, 'k').k)
    return {
      top: vi[0],
      bottom: vi[1] || vi[0]
    }
  },

  horizontalInset: ({ props }) => {
    const { horizontalInset } = props
    if (typeof horizontalInset !== 'string') return
    const vi = horizontalInset.split(' ').map(v => getSpacingByKey(v, 'k').k)
    return {
      left: vi[0],
      right: vi[1] || vi[0]
    }
  }
}
