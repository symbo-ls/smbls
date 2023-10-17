'use strict'

import { isState, getChildStateInKey } from '@domql/state'
import { isString, isNot, isArray, isObject, isObjectLike, deepDiff, deepClone } from '@domql/utils'

export const Collection = {
  define: {
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

    $setStateCollection: (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      const { __ref: ref } = el

      if (ref.__stateCollectionCache) {
        const d = deepDiff(param, ref.__stateCollectionCache) // eslint-disable-line
        if (Object.keys(d).length) {
          ref.__stateCollectionCache = deepClone(param)
          delete ref.__noCollectionDifference
        } else {
          ref.__noCollectionDifference = true
          return
        }
      } else {
        ref.__stateCollectionCache = deepClone(param)
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

    $setPropsCollection: (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      const { __ref: ref } = el

      if (ref.__propsCollectionCache) {
        const d = deepDiff(param, ref.__propsCollectionCache) // eslint-disable-line
        if (Object.keys(d).length) {
          ref.__propsCollectionCache = deepClone(param)
          delete ref.__noCollectionDifference
        } else {
          ref.__noCollectionDifference = true
          return
        }
      } else {
        ref.__propsCollectionCache = deepClone(param)
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
      //   el.set(obj, { preventDefineUpdate: '$setPropsCollection' })
      // }

      // if (el.props && el.props.lazyLoad) {
      //   window.requestAnimationFrame(set)
      // } else set()

      return obj
    }
  }
}
