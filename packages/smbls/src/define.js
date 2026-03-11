'use strict'

import { resolveMetadata, applyMetadata } from '@symbo.ls/helmet'

export const defaultDefine = {
  routes: param => param,

  metadata: (param, el, state) => {
    if (!param) return
    const doc = el.context?.document || (typeof document !== 'undefined' && document)
    if (!doc) return
    const resolved = resolveMetadata(param, el, state)
    applyMetadata(resolved, doc)
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
