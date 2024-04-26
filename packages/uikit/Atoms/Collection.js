'use strict'

import { isState, getChildStateInKey } from '@domql/state'
import { isString, isNot, isArray, isObject, isObjectLike, deepCloneWithExtend } from '@domql/utils'

export const Collection = {
  define: {
    $collection: (param, el, state) => {
      const { __ref: ref } = el
      const hasChildren = isArray(el.props?.children)

      if (hasChildren) {
        param = el.props?.children
        const childrenAs = el.props?.childrenAs
        const extend = el.props?.childrenExtend
        if (childrenAs) param = param.map(v => ({ extend, [childrenAs]: v }))
      } else if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      param = deepCloneWithExtend(param)

      if (ref.__collectionCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__collectionCache)
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__collectionCache = deepCloneWithExtend(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__collectionCache = deepCloneWithExtend(param)
      }

      const obj = {
        tag: 'fragment',
        props: {
          childProps: el.props && el.props.childProps
        }
      }

      for (const key in param) {
        const value = param[key]
        if (value) obj[key] = isObjectLike(value) ? value : { value }
      }

      el.removeContent()
      el.content = obj

      // return deepClone(param)
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
      param = deepCloneWithExtend(param)

      if (ref.__stateCollectionCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__stateCollectionCache)
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__stateCollectionCache = deepCloneWithExtend(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__stateCollectionCache = deepCloneWithExtend(param)
      }

      const obj = {
        tag: 'fragment',
        props: {
          childProps: el.props && el.props.childProps
        }
      }

      for (const key in param) {
        const value = param[key]
        if (value) obj[key] = { state: isObjectLike(value) ? value : { value } }
      }

      el.removeContent()
      el.content = obj

      // return deepClone(param)
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
      param = deepCloneWithExtend(param)

      if (ref.__propsCollectionCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__propsCollectionCache) // eslint-disable-line
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__propsCollectionCache = deepCloneWithExtend(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__propsCollectionCache = deepCloneWithExtend(param)
      }

      const obj = {
        tag: 'fragment',
        props: {
          childProps: el.props && el.props.childProps
        }
      }

      for (const key in param) {
        const value = param[key]
        if (value) obj[key] = { props: isObjectLike(value) ? value : { value } }
      }

      el.removeContent()
      el.content = obj

      // const set = () => {
      //   el.set(obj, { preventDefineUpdate: '$propsCollection' })
      // }

      // if (el.props && el.props.lazyLoad) {
      //   window.requestAnimationFrame(set)
      // } else set()

      // return deepClone(param)
    }
  }
}
