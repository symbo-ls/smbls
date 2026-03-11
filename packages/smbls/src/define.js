'use strict'

import { resolveMetadata, applyMetadata } from '@symbo.ls/helmet'
import {
  isString,
  isNumber,
  isNot,
  isArray,
  isObject,
  isObjectLike,
  isState,
  exec,
  deepClone,
  getChildStateInKey
} from '@domql/utils'

const processCollectionParam = (param, state) => {
  if (isString(param)) {
    if (param === 'state') return state.parse()
    return getChildStateInKey(param, state)
  }
  if (isState(param)) return param.parse()
  if (isNot(param)('array', 'object')) return null
  return deepClone(param)
}

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
  },

  $collection: async (param, el, state) => {
    const { __ref: ref } = el
    const {
      children: childrenProps,
      childrenAs,
      childExtends
    } = el.props || {}
    const children = childrenProps && (await exec(childrenProps, el, state))
    const childrenAsDefault = childrenAs || 'props'

    if (children) {
      if (isObject(children)) {
        param = deepClone(children)
        param = Object.keys(param).map(v => {
          const val = param[v]
          return isObjectLike(val) ? { ...val, extends: v } : { extends: v, value: val }
        })
      } else if (isArray(children)) {
        param = deepClone(children)
        if (childrenAsDefault && childrenAsDefault !== 'element') {
          param = param.map(v => ({
            ...(childExtends && { extends: childExtends }),
            [childrenAsDefault]: isObjectLike(v)
              ? v
              : childrenAsDefault === 'state'
              ? { value: v }
              : { text: v }
          }))
        }
      } else if (isString(children) || isNumber(children)) {
        el.removeContent()
        el.content = { text: param }
        return
      }
    }

    if (!param) return
    param = processCollectionParam(param, state)
    if (!param) return

    if (ref.__collectionCache) {
      const equals = JSON.stringify(param) === JSON.stringify(ref.__collectionCache)
      if (equals) { ref.__noCollectionDifference = true; return }
      ref.__collectionCache = deepClone(param)
      delete ref.__noCollectionDifference
    } else {
      ref.__collectionCache = deepClone(param)
    }

    const obj = { tag: 'fragment', ignoreChildProps: true, childProps: el.props && el.props.childProps }
    for (const key in param) {
      const value = param[key]
      if (value) obj[key] = isObjectLike(value) ? value : { value }
    }
    el.removeContent()
    el.content = obj
  },

  $setCollection: async (param, el, state) => {
    if (!param) return
    param = processCollectionParam(param, state)
    if (!param) return

    const data = (isArray(param) ? param : isObject(param) ? Object.values(param) : [])
      .map(item => (!isObjectLike(item) ? { value: item } : item))

    if (data.length) {
      const t = setTimeout(() => {
        el.set({ tag: 'fragment', ...data }, { preventDefineUpdate: '$setCollection' })
        clearTimeout(t)
      })
    }
    return data
  },

  $stateCollection: async (param, el, state) => {
    const { children, childrenAs } = el.props || {}
    if (!param || children || childrenAs) return
    param = processCollectionParam(param, state)
    if (!param) return

    const { __ref: ref } = el
    if (ref.__stateCollectionCache) {
      const equals = JSON.stringify(param) === JSON.stringify(ref.__stateCollectionCache)
      if (equals) { ref.__noCollectionDifference = true; return }
      ref.__stateCollectionCache = deepClone(param)
      delete ref.__noCollectionDifference
    } else {
      ref.__stateCollectionCache = deepClone(param)
    }

    const obj = { tag: 'fragment', ignoreChildProps: true, childProps: el.props && el.props.childProps }
    for (const key in param) {
      const value = param[key]
      if (value) obj[key] = { state: isObjectLike(value) ? value : { value } }
    }
    el.removeContent()
    el.content = obj
  },

  $propsCollection: async (param, el, state) => {
    const { children, childrenAs } = el.props || {}
    if (!param || children || childrenAs) return
    param = processCollectionParam(param, state)
    if (!param) return

    const { __ref: ref } = el
    if (ref.__propsCollectionCache) {
      const equals = JSON.stringify(param) === JSON.stringify(ref.__propsCollectionCache)
      if (equals) { ref.__noCollectionDifference = true; return }
      ref.__propsCollectionCache = deepClone(param)
      delete ref.__noCollectionDifference
    } else {
      ref.__propsCollectionCache = deepClone(param)
    }

    const obj = { tag: 'fragment', ignoreChildProps: true, childProps: el.props && el.props.childProps }
    for (const key in param) {
      const value = param[key]
      if (value) obj[key] = { props: isObjectLike(value) ? value : { value } }
    }
    el.removeContent()
    el.content = obj
  }
}
