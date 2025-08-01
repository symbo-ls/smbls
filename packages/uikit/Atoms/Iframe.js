'use strict'

export const Iframe = {
  tag: 'iframe',
  props: {
    position: 'relative',
    minWidth: 'H',
    minHeight: 'H'
  },
  attr: {
    src: (el, s) => {
      let src = el.call('exec', el.props.src, el)

      if (!src) return

      if (el.call('isString', src) && src.includes('{{')) {
        src = el.call('replaceLiteralsWithObjectFields', src)
      }

      let isUrl
      try { isUrl = new URL(src) } catch (e) {
      console.error(e)
      }
      if (isUrl) return src
    },
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
