'use strict'

import { editorJsToDOMQL } from '@domql/converter'

export const Editorjs = {
  define: {
    $editorjs: (param, el, state) => {
      if (!param) return
      const content = editorJsToDOMQL(param)
      el.content = content
    }
  }
}
