'use strict'

import { isState, getChildStateInKey } from '@domql/state'
import { isString, isNumber, isNot, isArray, isObject, isObjectLike, exec, deepClone, applyAdditionalExtend } from '@domql/utils'

export const Collection = {
  define: {
    children: (param, el, state) => {
      const { __ref: ref } = el
      const { childrenAs, childExtends } = (el.props || {})
      const children = (param && exec(param, el, state)) || (el.props.children && exec(el.props.children, el, state))

      const childrenAsDefault = childrenAs || 'props'

      // if (children || el.props.children) {
      //   console.log('222---')
      //   console.log(children)
      //   console.log(el.props.children)
      //   console.log(el)
      // }

      if (children) {
        if (isObject(children)) {
          if (children.$$typeof) return el.call('renderReact', children, el)
          param = deepClone(children)
          param = Object.keys(param).map(v => {
            const val = param[v]
            return applyAdditionalExtend(v, val)
          })
        } else if (isArray(children)) {
          param = deepClone(children)
          if (childrenAsDefault || childrenAsDefault !== 'element') {
            param = param.map(v => ({
              extends: childExtends,
              [childrenAsDefault]: isObjectLike(v) ? v : childrenAsDefault === 'state' ? { value: v } : { text: v }
            }))
          }
        } else if (isString(children) || isNumber(children)) {
          el.removeContent()
          el.content = { text: param }
          return
        }
      }

      if (!param) return

      const filterReact = param.filter(v => !v.$$typeof)
      if (filterReact.length !== param.length) {
        const extractedReactComponents = param.filter(v => v.$$typeof)
        el.call('renderReact', extractedReactComponents, el)
      } param = filterReact

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      param = deepClone(param)

      if (ref.__childrenCache) {
        const equals = JSON.stringify(param) === JSON.stringify(ref.__childrenCache)
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__childrenCache = deepClone(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__childrenCache = deepClone(param)
      }

      const obj = {
        tag: 'fragment',
        ignoreChildProps: true,
        childProps: el.props && el.props.childProps
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

    $stateCollection: (param, el, state, ctx) => {
      const { children, childrenAs } = (el.props || {})
      if (!param || children || childrenAs) return

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
          ref.__stateCollectionCache = deepClone(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__stateCollectionCache = deepClone(param)
      }

      const obj = {
        tag: 'fragment',
        props: {
          ignoreChildProps: true,
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
      const { children, childrenAs } = (el.props || {})
      if (!param || children || childrenAs) return

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
          ref.__propsCollectionCache = deepClone(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__propsCollectionCache = deepClone(param)
      }

      const obj = {
        tag: 'fragment',
        props: {
          ignoreChildProps: true,
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
