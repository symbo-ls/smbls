'use strict'

import { Box } from '@symbo.ls/atoms'

export const defaultDefine = {
  routes: param => param,
  // deps: (param, el) => param || el.parent.deps,

  $router: (param, el) => {
    if (!param) return

    const obj = { tag: 'fragment', ...param }

    const set = () => {
      el.set(obj, { preventDefineUpdate: '$router' })
    }

    if (el.props && el.props.lazyLoad) {
      window.requestAnimationFrame(set)
    } else set()

    return obj
  },

  $collection: Box.define.$collection,
  $setCollection: Box.define.$setCollection,
  $stateCollection: Box.define.$stateCollection,
  $propsCollection: Box.define.$propsCollection
}
