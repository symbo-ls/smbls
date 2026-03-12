'use strict'

import { resolveMetadata, applyMetadata } from '@symbo.ls/helmet'
import { executeFetch } from '@domql/element/mixins/fetch.js'

export const defaultDefine = {
  routes: param => param,

  metadata: (param, el, state) => {
    if (!param) return
    const doc = el.context?.document || (typeof document !== 'undefined' && document)
    if (!doc) return
    const resolved = resolveMetadata(param, el, state)
    applyMetadata(resolved, doc)
  },

  fetch: (param, el, state, context) => {
    if (!param) return
    executeFetch(param, el, state, context)
  },

  $router: async (param, el) => {
    if (!param) return

    const obj = { tag: 'fragment', ...param }

    const set = async () => {
      await el.set(obj, { preventDefineUpdate: '$router' })
    }

    if (el.props && el.props.lazyLoad) {
      window.requestAnimationFrame(set)
    } else await set()

    return obj
  }
}
