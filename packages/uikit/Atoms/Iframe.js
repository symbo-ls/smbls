'use strict'

export const Iframe = {
  tag: 'iframe',
  props: {
    position: 'relative',
    minWidth: 'H',
    minHeight: 'H'
  },
  attr: {
    src: ({ props }) => props.src,
    srcdoc: ({ props }) => props.srcdoc,
    sandbox: ({ props }) => props.sandbox,
    seamless: ({ props }) => props.seamless,
    loading: ({ props }) => props.loading,
    allowfullscreen: ({ props }) => props.allowfullscreen,
    frameborder: ({ props }) => props.frameborder,
    allow: ({ props }) => props.allow,
    referrerpolicy: ({ props }) => props.referrerpolicy
  }
}
