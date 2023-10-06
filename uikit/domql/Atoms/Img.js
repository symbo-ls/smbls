'use strict'

export const Img = {
  tag: 'img',

  attr: {
    src: ({ props }) => props.src,
    alt: ({ props }) => props.alt,
    title: ({ props }) => props.title || props.alt
  }
}
