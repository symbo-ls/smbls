'use strict'

import { isState, getChildStateInKey } from '@domql/state'
import { isString, isNot, isArray, isObject, isObjectLike, deepClone } from '@domql/utils'

export const Collection = {
  define: {
    $collection: (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      const { __ref: ref } = el
      param = deepClone(param)

      if (ref.__collectionCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__collectionCache)
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__collectionCache = param
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__collectionCache = param
      }

      const obj = {
        tag: 'fragment',
        props: {
          childProps: el.props && el.props.childProps
        }
      }

      for (const key in param) {
        const value = param[key]
        obj[key] = isObjectLike(value) ? value : { value }
      }

      el.removeContent()
      el.content = obj

      return obj
    },

    $setCollection: (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }

      const data = (isArray(param) ? param : isObject(param) ? Object.values(param) : [])
        .map(item => !isObjectLike(item)
          ? { props: { value: item } }
          : item)

      if (data.length) {
        const t = setTimeout(() => {
          el.set({ tag: 'fragment', ...data }, { preventDefineUpdate: '$setCollection' })
          clearTimeout(t)
        })
      }

      return data
    },

    $stateCollection: (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      const { __ref: ref } = el
      param = deepClone(param)

      if (ref.__stateCollectionCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__stateCollectionCache)
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__stateCollectionCache = param
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__stateCollectionCache = param
      }

      const obj = {
        tag: 'fragment',
        props: {
          childProps: el.props && el.props.childProps
        }
      }

      for (const key in param) {
        const value = param[key]
        obj[key] = { state: isObjectLike(value) ? value : { value } }
      }

      el.removeContent()
      el.content = obj

      return obj
    },

    $propsCollection: (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      const { __ref: ref } = el
      param = deepClone(param)

      if (ref.__propsCollectionCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__propsCollectionCache) // eslint-disable-line
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__propsCollectionCache = param
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__propsCollectionCache = param
      }

      const obj = {
        tag: 'fragment',
        props: {
          childProps: el.props && el.props.childProps
        }
      }

      for (const key in param) {
        const value = param[key]
        obj[key] = { props: isObjectLike(value) ? value : { value } }
      }

      el.removeContent()
      el.content = obj

      // const set = () => {
      //   el.set(obj, { preventDefineUpdate: '$propsCollection' })
      // }

      // if (el.props && el.props.lazyLoad) {
      //   window.requestAnimationFrame(set)
      // } else set()

      return obj
    }
  }
}
