'use strict'

import { getSpacingByKey } from '@symbo.ls/scratch'

export const Position = {
  deps: { getSpacingByKey },

  class: {
    position: ({ props }) => props.position && ({ position: props.position }),
    inset: ({ props, deps }) => {
      const { inset } = props
      if (typeof inset !== 'string') return
      return { inset: inset.split(' ').map(v => deps.getSpacingByKey(v, 'k').k).join(' ') }
    },

    left: ({ props, deps }) => deps.getSpacingByKey(props.left, 'left'),
    top: ({ props, deps }) => deps.getSpacingByKey(props.top, 'top'),
    right: ({ props, deps }) => deps.getSpacingByKey(props.right, 'right'),
    bottom: ({ props, deps }) => deps.getSpacingByKey(props.bottom, 'bottom'),

    verticalInset: ({ props, deps }) => {
      const { verticalInset } = props
      if (typeof verticalInset !== 'string') return
      const vi = verticalInset.split(' ').map(v => deps.getSpacingByKey(v, 'k').k)
      return {
        top: vi[0],
        bottom: vi[1] || vi[0]
      }
    },

    horizontalInset: ({ props, deps }) => {
      const { horizontalInset } = props
      if (typeof horizontalInset !== 'string') return
      const vi = horizontalInset.split(' ').map(v => deps.getSpacingByKey(v, 'k').k)
      return {
        left: vi[0],
        right: vi[1] || vi[0]
      }
    }
  }
}
