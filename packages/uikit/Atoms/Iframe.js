'use strict'

export const Iframe = {
  tag: 'iframe',
  position: 'relative',
  minWidth: 'H',
  minHeight: 'H',

  attr: {
    src: (el, s) => {
      let src = el.call('exec', el.props.src, el)

      if (!src) return

      if (el.call('isString', src) && src.includes('{{')) {
        src = el.call('replaceLiteralsWithObjectFields', src)
      }

      return src
    }
  }
}
