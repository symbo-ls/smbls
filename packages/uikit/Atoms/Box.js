'use strict'

import { useCssInProps } from 'css-in-props'

// Main class assignment handler
const onBeforeClassAssign = (element) => {
  if (!element.context) return
  const { props, __ref: ref } = element
  ref.__class = useCssInProps(props, element, { unpack: false })
}

export const Box = {
  extends: [
    'Shape',
    'Theme'
  ],

  boxSizing: 'border-box',

  onBeforeClassAssign
}

export const Hr = {
  tag: 'hr',
  margin: 'C1 0'
}
export const Br = { tag: 'br' }
export const Li = { tag: 'li' }
export const Ul = {
  tag: 'ul',
  childExtends: { extends: 'Li' }
}
export const Ol = {
  tag: 'ol',
  childExtends: { extends: 'Li' }
}
