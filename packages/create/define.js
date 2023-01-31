'use strict'

import { Collection } from '@symbo.ls/uikit'

export const define = {
  routes: param => param,

  $router: (param, el) => {
    if (!param) return

    const obj = { tag: 'fragment', ...param }

    const set = () => {
      el.set(obj, { preventDefineUpdate: '$router' })
    }

    if (el.props.lazyLoad) {
      window.requestAnimationFrame(set)
    } else set()

    return obj
  },

  __filepath: param => param,
  __collectionCache: param => param,
  $setCollection: Collection.define.$setCollection,
  __stateCollectionCache: param => param,
  $setStateCollection: Collection.define.$setStateCollection,
  __propsCollectionCache: param => param,
  $setPropsCollection: Collection.define.$setPropsCollection
}
