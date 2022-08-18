'use strict'

import { isArray, isObject } from '@domql/utils'
import { mapSpacing, getTheme, getColor } from '@symbo.ls/scratch'

import { depth } from './Shape/style'

const isBorderStyle = str =>
  ['none', 'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset', 'initial'].some(v => str.includes(v))

const transformBorder = (border, key = 'border') => {
  const obj = {}
  const arr = isObject(border) ? Object.values(border) : isArray(border) ? border : border.split(', ')
  arr.map(v => {
    if (v.includes('px')) obj[`${key}Width`] = v // TODO: add map spacing
    else if (isBorderStyle(v)) obj[`${key}Style`] = v || 'solid'
    else if (getColor(v)) obj[`${key}Color`] = getColor(v)
  })
  return obj
}

const transformTextStroke = stroke => ({
  WebkitTextStroke: stroke.split(', ').map(v => {
    if (v.includes('px')) return v
    else if (getColor(v)) return getColor(v)
  }).join(' ')
})

const transformShadow = shadow => ({
  boxShadow: shadow.split(', ').map(v => {
    if (v !== getColor(v)) return getColor(v)
    if (v.includes('px')) return v

    const arr = v.split(' ')
    if (!arr.length) return v
    return arr.map(v => mapSpacing(v, 'shadow').shadow).join(' ')
  }).join(' ')
})

export const Theme = {
  class: {
    depth: ({ props }) => depth[props.depth],
    round: ({ props, key, ...el }) => props.round ? (mapSpacing(props.round, 'borderRadius') || ({ borderRadius: props.round })) : null,
    borderRadius: ({ props, key, ...el }) => props.borderRadius ? (mapSpacing(props.borderRadius, 'borderRadius') || ({ borderRadius: props.borderRadius })) : null,

    theme: ({ props, key }) => {
      if (!props.theme) return
      return getTheme(props.theme, props.themeModifier)
    },

    color: ({ props }) => props.color ? ({ color: getColor(props.color) }) : null,
    background: ({ props }) => props.background ? ({ background: getColor(props.background) }) : null,
    backgroundColor: ({ props }) => props.backgroundColor ? ({ backgroundColor: getColor(props.backgroundColor) }) : null,
    backgroundImage: ({ props }) => props.backgroundImage ? ({ backgroundImage: getColor(props.backgroundImage) }) : null,
    backgroundSize: ({ props }) => props.backgroundSize ? ({ backgroundSize: getColor(props.backgroundSize) }) : null,

    textStroke: ({ props }) => props.textStroke ? transformTextStroke(props.textStroke) : null,

    border: ({ props }) => props.border ? transformBorder(props.border) : null,
    borderColor: ({ props }) => props.borderColor ? ({ borderColor: getColor(props.borderColor) }) : null,
    borderStyle: ({ props }) => props.borderStyle && ({ borderStyle: props.borderStyle }),

    borderLeft: ({ props }) => props.borderLeft ? transformBorder(props.borderLeft, 'borderLeft') : null,
    borderTop: ({ props }) => props.borderTop ? transformBorder(props.borderTop, 'borderTop') : null,
    borderRight: ({ props }) => props.borderRight ? transformBorder(props.borderRight, 'borderRight') : null,
    borderBottom: ({ props }) => props.borderBottom ? transformBorder(props.borderBottom, 'borderBottom') : null,

    boxShadow: ({ props }) => props.boxShadow ? transformShadow(props.boxShadow) : null,

    opacity: ({ props }) => props.opacity && ({ opacity: props.opacity }),
    visibility: ({ props }) => props.visibility && ({ visibility: props.visibility })
  }
}
