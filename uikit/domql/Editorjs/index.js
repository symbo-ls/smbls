'use strict'

import domqlConverterLib, { editorJsToDOMQL, initMutiny } from '@domql/converter'

import { DomValueInterceptor } from './data/DomValueInterceptor'

export const Editorjs = {
  define: {
    $editorjs: (param, el, state) => {
      if (!param) return
      initMutiny()

      const system = domqlConverterLib.getSystem()
      if (!system) {
        const { interceptorApi } = system
        interceptorApi.addInterceptor(DomValueInterceptor, 'before')
      }

      const content = editorJsToDOMQL(param)
      el.content = content
    }
  }
}
