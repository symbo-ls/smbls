'use strict'

import { markdownToDOMQL } from '@domql/converter'

export const Markdown = {
  define: {
    $markdown: (param, el, state) => {
      if (!param) return
      const content = markdownToDOMQL(param)
      el.content = content
    }
  }
}
