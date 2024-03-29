'use strict'

import { Collection } from '@symbo.ls/atoms'

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

  $collection: Collection.define.$collection,
  $setCollection: Collection.define.$setCollection,
  $stateCollection: Collection.define.$stateCollection,
  $propsCollection: Collection.define.$propsCollection
}
