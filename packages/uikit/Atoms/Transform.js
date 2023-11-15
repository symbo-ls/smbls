'use strict'

export const Transform = {
  class: {
    zoom: ({ props }) => props.zoom && ({ zoom: props.zoom }),
    transform: ({ props }) => props.transform && ({ transform: props.transform }),
    transformOrigin: ({ props }) => props.transformOrigin && ({ transformOrigin: props.transformOrigin })
  }
}
