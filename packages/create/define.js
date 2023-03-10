'use strict'

import { Collection } from '@symbo.ls/uikit'

export const defaultDefine = {
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
  $setCollection: Collection.define.$setCollection,
  $setStateCollection: Collection.define.$setStateCollection,
  $setPropsCollection: Collection.define.$setPropsCollection
}
