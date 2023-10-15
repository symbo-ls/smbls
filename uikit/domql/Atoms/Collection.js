'use strict'

import { isState, getChildStateInKey } from '@domql/state'
import { isString, isNot, isArray, isObject, isObjectLike, diff, deepClone, deepContains } from '@domql/utils'

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

      if (el.key === 'cnt') {
        if (el.__ref.__stateCollectionCache) {
          const d = diff(param, el.__ref.__stateCollectionCache) // eslint-disable-line
        } else {
          el.__ref.__stateCollectionCache = deepClone(param)
        }
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

      if (!deepContains(obj, el.content)) {
        el.removeContent()
        el.content = obj
      }

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

      if (!deepContains(obj, el.content)) {
        el.removeContent()
        el.content = obj
      }

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
