'use strict'

import { exec, isString } from '@domql/utils'
import { SHAPES } from './style'
import { getSpacingBasedOnRatio, getMediaColor } from '@symbo.ls/scratch'
import { Pseudo } from '../Pseudo'

const transformBorderRadius = (radius, props, propertyName) => {
  if (!isString(radius)) return
  return {
    borderRadius: radius.split(' ').map((v, k) => getSpacingBasedOnRatio(props, propertyName, v)[propertyName]).join(' ')
  }
}

export const Shape = {
  extend: Pseudo,

  deps: { exec, getSpacingBasedOnRatio, getMediaColor, transformBorderRadius },

  class: {
    shape: ({ props, deps }) => {
      const { shape } = props
      return deps.exec(SHAPES[shape], ({ props, deps }))
    },
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
    },

    round: ({ props, key, deps, ...el }) => deps.transformBorderRadius(props.round || props.borderRadius, props, 'round'),
    borderRadius: ({ props, key, deps, ...el }) => deps.transformBorderRadius(props.borderRadius || props.round, props, 'borderRadius')
  }
}

export default Shape
