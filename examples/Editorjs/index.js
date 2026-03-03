'use strict'

import domqlConverterLib, {
  editorJsToDOMQL,
  initMutiny
} from '@domql/converter'

import { DomValueInterceptor } from './data/DomValueInterceptor'

export { initMutiny, DomValueInterceptor, editorJsToDOMQL, domqlConverterLib }

export const Editorjs = {
  onInit: () => initMutiny(),
  childExtends: {
    html: (el, s) => {
      const text = el.text || el.props.text
      if (text && text.includes('</')) {
        return text
      }
    },
    childExtends: {
      html: (el, s) => el.props.text || el.text
    }
  },
  define: {
    $editorjs: (param, el, state, ctx) => {
      if (!param) return
      const { isArray, isObject, deepClone } = ctx.utils

      if (isObject(param) && param.blocks) param = param.blocks
      if (!isArray(param)) return

      const system = domqlConverterLib.getSystem()
      if (!system) {
        const { interceptorApi } = domqlConverterLib.getSystem()
        interceptorApi.addInterceptor(DomValueInterceptor, 'before')
      }

      // console.log(param)
      const content = editorJsToDOMQL(param)
      // console.log(content)
      const cloned = deepClone(content.asObjectArray)
      el.removeContent()
      return el.set(cloned)
    }
  }
}

export default Editorjs
