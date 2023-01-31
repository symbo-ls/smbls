'use strict'

import { Collection } from '@symbo.ls/uikit'

export const define = {
  __filepath: param => param,
  routes: param => param,
  __collectionCache: param => param,
  $setCollection: Collection.define.$setCollection,
  __stateCollectionCache: param => param,
  $setStateCollection: Collection.define.$setStateCollection,
  __propsCollectionCache: param => param,
  $setPropsCollection: Collection.define.$setPropsCollection
}
