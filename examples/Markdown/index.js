'use strict'

import { markdownToDOMQL } from '@domql/converter'

import { remark } from 'remark'
import remarkGfm from 'remark-gfm'

export const Markdown = {
  define: {
    $markdown: (param, el, state) => {
      if (!param) return

      const markdownProcessor = remark().use(remarkGfm)
      const mdast = markdownProcessor.parse(param)

      const content = markdownToDOMQL(mdast)
      el.content = content
    }
  }
}
