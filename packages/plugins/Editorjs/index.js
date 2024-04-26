'use strict'

import domqlConverterLib, { editorJsToDOMQL, initMutiny } from '@domql/converter'

import { DomValueInterceptor } from './data/DomValueInterceptor'

export { initMutiny, DomValueInterceptor, editorJsToDOMQL, domqlConverterLib }

export const Editorjs = {
  on: {
    init: () => initMutiny()
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

      const content = editorJsToDOMQL(param)
      const cloned = deepClone(content.asObjectArray)
      el.removeContent()
      return el.set(cloned)
    }
  }
}

export default Editorjs
