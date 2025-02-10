'use strict'

import { exec } from '@domql/utils'
import { SHAPES } from './style'
import { getSpacingBasedOnRatio, getMediaColor } from '@symbo.ls/scratch'

export const Shape = {
  deps: { exec, getSpacingBasedOnRatio, getMediaColor },

  class: {
    shape: ({ props, deps }) => {
      const { shape } = props
      return deps.exec(SHAPES[shape], ({ props, deps }))
    },
    // TODO: replace with this
    // shape: (el) => {
    //   const { shape } = el.props
    //   return el.call('exec', SHAPES[shape], el)
    // },
    shapeDirection: ({ props }) => {
      const { shape, shapeDirection } = props
      if (!shape || !shapeDirection) return
      const shapeDir = SHAPES[shape + 'Direction']
      return shape && shapeDir ? shapeDir[shapeDirection || 'left'] : null
    },
    shapeDirectionColor: ({ props, deps }) => {
      const { background, backgroundColor } = props
      const borderColor = {
        borderColor: deps.getMediaColor(background || backgroundColor)
      }
      return props.shapeDirection ? borderColor : null
    }
  }
}

export const Circle = {
  props: {
    round: '100%'
  }
}

export default Shape
