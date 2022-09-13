'use strict'

import { exec, isString } from '@domql/utils'
import { SHAPES } from './style'
import { getSpacingByKey } from '@symbo.ls/scratch'

const transformBorderRadius = (radius, props) => {
  if (!isString(radius)) return
  return {
    borderRadius: radius.split(' ').map((v, k) => getSpacingByKey(v, 'radius').radius).join(' ')
  }
}

export const Shape = {
  class: {
    shape: (element) => {
      const { props } = element
      const { shape } = props
      return shape ? exec(SHAPES[shape], element) : null
    },
    shapeDirection: ({ props }) => {
      const { shape, shapeDirection } = props
      if (!shape || !shapeDirection) return
      const shapeDir = SHAPES[shape + 'Direction']
      return shape ? shapeDir[shapeDirection || 'top'] : null
    },
    shapeDirectionColor: ({ props, ...el }) => props.shapeDirection ? { '&:before': { borderColor: el.class.backgroundColor } } : null,

    round: ({ props, key, ...el }) => transformBorderRadius(props.round || props.borderRadius, props),
    borderRadius: ({ props, key, ...el }) => transformBorderRadius(props.borderRadius || props.round, props)
  }
}

export default Shape
