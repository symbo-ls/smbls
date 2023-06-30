'use strict'

import { isArray, isObject, deepClone } from '@domql/utils'
import domqlConverterLib, { editorJsToDOMQL, initMutiny } from '@domql/converter'

import { DomValueInterceptor } from './data/DomValueInterceptor'

export const Editorjs = {
  on: {
    init: () => initMutiny()
  },
  define: {
    $editorjs: (param, el, state) => {
      if (!param) return
      console.log('removed')
      console.log(param)

      if (isObject(param) && param.blocks) param = param.blocks
      if (!isArray(param)) return

      const system = domqlConverterLib.getSystem()
      if (!system) {
        const { interceptorApi } = domqlConverterLib.getSystem()
        interceptorApi.addInterceptor(DomValueInterceptor, 'before')
      }

      const content = editorJsToDOMQL(param)
      const cloned = deepClone(content.asObjectArray)
      console.log(cloned)
      el.removeContent()
      return el.set(cloned)
    }
  }
}
