'use strict'

import { isArray, isObject } from '@domql/utils'

import domqlConverterLib, { editorJsToDOMQL, initMutiny } from '@domql/converter'
import { DomValueInterceptor } from './data/DomValueInterceptor'

export const Editorjs = {
  define: {
    $editorjs: (param, el, state) => {
      if (!param) return

      if (isObject(param) && param.blocks) param = param.blocks
      if (!isArray(param)) return

      const system = domqlConverterLib.getSystem()
      if (!system) {
        initMutiny()
        const { interceptorApi } = system
        interceptorApi.addInterceptor(DomValueInterceptor, 'before')
      }

      const content = editorJsToDOMQL(param)
      el.content = content
    }
  }
}
