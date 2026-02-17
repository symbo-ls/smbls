'use strict'

import { isState, getChildStateInKey } from '@domql/state'
import { emotion } from '@symbo.ls/emotion'

import {
  isString,
  isNumber,
  isNot,
  isArray,
  isObject,
  isObjectLike,
  isUndefined,
  exec,
  deepClone,
  addAdditionalExtend
} from '@domql/utils'

import { depth, SHAPES } from './Shape.js'
import { beforeClassAssign } from './Media.js'

import {
  getTimingFunction,
  splitTransition,
  getSpacingBasedOnRatio,
  getSpacingByKey,
  transfromGap,
  transformSizeRatio,
  transformSize,
  transformDuration,
  getMediaTheme,
  getMediaColor,
  transformTextStroke,
  transformShadow,
  transformBoxShadow,
  transformBorder,
  transformBackgroundImage,
  getTimingByKey
} from '@symbo.ls/scratch'

export const getSystemGlobalTheme = ({ context, state }) => {
  const rootState = state && state.root
  return rootState && rootState.globalTheme
    ? rootState.globalTheme
    : context.designSystem && context.designSystem.globalTheme
}

const transformBorderRadius = (radius, props, propertyName) => {
  if (!isString(radius)) return
  return {
    borderRadius: radius
      .split(' ')
      .map(
        (v, k) => getSpacingBasedOnRatio(props, propertyName, v)[propertyName]
      )
      .join(' ')
  }
}

const applyAnimationProps = (animation, element) => {
  const { emotion: ctxEmotion } = element.context
  const { keyframes } = ctxEmotion || emotion
  if (isObject(animation)) return { animationName: keyframes(animation) }
  const { ANIMATION } = element.context && element.context.designSystem
  const record = ANIMATION[animation]
  return keyframes(record)
}

const PropsCSS = {
  class: {
    style: (el) => el.props && el.props.style
  }
}

export const Box = {
  extend: [PropsCSS, 'Text'],

  deps: {
    getSpacingBasedOnRatio,
    getSpacingByKey,
    transfromGap,
    transformSizeRatio,
    transformSize,
    applyAnimationProps,
    isUndefined,
    isString,
    getTimingFunction,
    getTimingByKey,
    splitTransition,
    transformDuration,
    depth,
    exec,
    getSystemGlobalTheme,
    getMediaTheme,
    getMediaColor,
    transformTextStroke,
    transformShadow,
    transformBoxShadow,
    transformBorder,
    transformBackgroundImage,
    transformBorderRadius,
    applyAnimationProps
  },

  attr: {
    id: (el) => el.call('isString', el.props.id) && el.props.id,
    title: (el) => el.call('isString', el.props.title) && el.props.title,
    contentEditable: (el, s) => {
      const isEditable = el.props.contentEditable || el.props.contenteditable
      if (isEditable) return el.call(isEditable, el, s)
    },
    dir: (el) => el.props.dir,
    draggable: (el) => el.props.draggable,
    hidden: (el) => el.props.hidden,
    lang: (el) => el.props.lang,
    spellcheck: (el) => el.props.spellcheck,
    tabindex: (el) => el.props.tabindex,
    translate: (el) => el.props.translate,
    'data-testid': (el, s) =>
      (s.root.ENV === 'testing' || s.root.ENV === 'staging') &&
      ((el.__ref.path.length > 5
        ? el.__ref.path.slice(1, 4).concat(el.__ref.path.slice(-2))
        : el.__ref.path.slice(1)
      ).join('.') ||
        'root')
  },

  define: {
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
          if (children.$$typeof) return el.call('renderReact', children, el)
          if (childrenAsDefault && childrenAsDefault !== 'state') {
            param = deepClone(children)
            param = Object.keys(param).map((v) => {
              const val = param[v]
              return addAdditionalExtend(v, val)
            })
          }
        } else if (isArray(children)) {
          param = deepClone(children)
          if (childrenAsDefault && childrenAsDefault !== 'element') {
            param = param.map((v) => ({
              ...(childExtends && { extend: childExtends }),
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

      const filterReact = param.filter((v) => !v.$$typeof)
      if (filterReact.length !== param.length) {
        const extractedReactComponents = param.filter((v) => v.$$typeof)
        el.call('renderReact', extractedReactComponents, el)
      }
      param = filterReact

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }
      if (isState(param)) param = param.parse()
      if (isNot(param)('array', 'object')) return

      param = deepClone(param)

      if (ref.__collectionCache) {
        const equals =
          JSON.stringify(param) === JSON.stringify(ref.__collectionCache)
        if (equals) {
          ref.__noCollectionDifference = true
          return
        } else {
          ref.__collectionCache = deepClone(param)
          delete ref.__noCollectionDifference
        }
      } else {
        ref.__collectionCache = deepClone(param)
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
        if (value) obj[key] = isObjectLike(value) ? value : { value }
      }

      el.removeContent()
      el.content = obj

      // return deepClone(param)
    },

    $setCollection: async (param, el, state) => {
      if (!param) return

      if (isString(param)) {
        if (param === 'state') param = state.parse()
        else param = getChildStateInKey(param, state)
      }

      const data = (
        isArray(param) ? param : isObject(param) ? Object.values(param) : []
      ).map((item) => (!isObjectLike(item) ? { props: { value: item } } : item))

      if (data.length) {
        const t = setTimeout(() => {
          el.set(
            { tag: 'fragment', ...data },
            { preventDefineUpdate: '$setCollection' }
          )
          clearTimeout(t)
        })
      }

      return data
    },

    $stateCollection: async (param, el, state, ctx) => {
      const { children, childrenAs } = el.props || {}
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
        const equals =
          JSON.stringify(param) === JSON.stringify(ref.__stateCollectionCache)
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

    $propsCollection: async (param, el, state) => {
      const { children, childrenAs } = el.props || {}
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
        const equals =
          JSON.stringify(param) === JSON.stringify(ref.__propsCollectionCache) // eslint-disable-line
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
  },

  class: {
    // flex
    ...{
      flow: (element) => {
        const { props, deps } = element
        const flow = deps.exec.call(element, props.flow)
        const reverse = deps.exec.call(element, props.reverse)
        if (!isString(flow)) return
        let [direction, wrap] = (flow || 'row').split(' ')
        if (flow.startsWith('x') || flow === 'row') direction = 'row'
        if (flow.startsWith('y') || flow === 'column') direction = 'column'
        return {
          display: 'flex',
          flexFlow:
            (direction || '') +
            (!direction.includes('-reverse') && reverse ? '-reverse' : '') +
            ' ' +
            (wrap || '')
        }
      },
      wrap: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.wrap)
        if (!val) return
        return { display: 'flex', flexWrap: val }
      },
      align: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.align)
        if (!isString(val)) return
        const [alignItems, justifyContent] = val.split(' ')
        return { display: 'flex', alignItems, justifyContent }
      }
    },

    // block
    ...{
      show: (el, s, ctx) =>
        !!(ctx.utils.exec(el.props.show, el, s) === false) && {
          display: 'none !important'
        },

      hide: (el, s, ctx) =>
        !!ctx.utils.exec(el.props.hide, el, s) && {
          display: 'none !important'
        },

      height: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'height', props)
      },
      width: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'width', props)
      },

      boxSizing: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.boxSizing)
        return !deps.isUndefined(val)
          ? { boxSizing: val }
          : { boxSizing: 'border-box' }
      },

      boxSize: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.boxSize)
        if (!deps.isString(val)) return
        const [height, width] = val.split(' ')
        return {
          ...deps.transformSize.call(el, 'height', height),
          ...deps.transformSize.call(el, 'width', width || height)
        }
      },

      inlineSize: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'inlineSize', props)
      },
      blockSize: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'blockSize', props)
      },

      minWidth: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'minWidth', props)
      },
      maxWidth: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'maxWidth', props)
      },
      widthRange: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.widthRange)
        if (!deps.isString(val)) return
        const [minWidth, maxWidth] = val.split(' ')
        return {
          ...deps.transformSize.call(el, 'minWidth', minWidth),
          ...deps.transformSize.call(el, 'maxWidth', maxWidth || minWidth)
        }
      },

      minHeight: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'minHeight', props)
      },
      maxHeight: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'maxHeight', props)
      },
      heightRange: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.heightRange)
        if (!deps.isString(val)) return
        const [minHeight, maxHeight] = val.split(' ')
        return {
          ...deps.transformSize.call(el, 'minHeight', minHeight),
          ...deps.transformSize.call(el, 'maxHeight', maxHeight || minHeight)
        }
      },

      size: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.size)
        if (!deps.isString(val)) return
        const [inlineSize, blockSize] = val.split(' ')
        return {
          ...deps.transformSizeRatio.call(el, 'inlineSize', inlineSize),
          ...deps.transformSizeRatio.call(
            el,
            'blockSize',
            blockSize || inlineSize
          )
        }
      },

      minBlockSize: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'minBlockSize', props)
      },
      minInlineSize: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'minInlineSize', props)
      },

      maxBlockSize: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'maxBlockSize', props)
      },
      maxInlineSize: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'maxInlineSize', props)
      },

      minSize: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.minSize)
        if (!deps.isString(val)) return
        const [minInlineSize, minBlockSize] = val.split(' ')
        return {
          ...deps.transformSize.call(el, 'minInlineSize', minInlineSize),
          ...deps.transformSize.call(
            el,
            'minBlockSize',
            minBlockSize || minInlineSize
          )
        }
      },

      maxSize: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.maxSize)
        if (!deps.isString(val)) return
        const [maxInlineSize, maxBlockSize] = val.split(' ')
        return {
          ...deps.transformSize.call(el, 'maxInlineSize', maxInlineSize),
          ...deps.transformSize.call(
            el,
            'maxBlockSize',
            maxBlockSize || maxInlineSize
          )
        }
      },

      borderWidth: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'borderWidth', props)
      },

      padding: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'padding', props)
      },
      scrollPadding: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'scrollPadding', props)
      },
      paddingInline: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.paddingInline)
        if (!deps.isString(val)) return
        const [paddingInlineStart, paddingInlineEnd] = val.split(' ')
        return {
          ...deps.transformSize.call(
            el,
            'paddingInlineStart',
            paddingInlineStart
          ),
          ...deps.transformSize(
            'paddingInlineEnd',
            paddingInlineEnd || paddingInlineStart
          )
        }
      },
      paddingBlock: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.paddingBlock)
        if (!deps.isString(val)) return
        const [paddingBlockStart, paddingBlockEnd] = val.split(' ')
        return {
          ...deps.transformSize.call(
            el,
            'paddingBlockStart',
            paddingBlockStart
          ),
          ...deps.transformSize(
            'paddingBlockEnd',
            paddingBlockEnd || paddingBlockStart
          )
        }
      },
      paddingInlineStart: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'paddingInlineStart', props)
      },
      paddingInlineEnd: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'paddingInlineEnd', props)
      },
      paddingBlockStart: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'paddingBlockStart', props)
      },
      paddingBlockEnd: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'paddingBlockEnd', props)
      },

      margin: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'margin', props)
      },
      marginInline: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.marginInline)
        if (!deps.isString(val)) return
        const [marginInlineStart, marginInlineEnd] = val.split(' ')
        return {
          ...deps.transformSize.call(
            el,
            'marginInlineStart',
            marginInlineStart
          ),
          ...deps.transformSize(
            'marginInlineEnd',
            marginInlineEnd || marginInlineStart
          )
        }
      },
      marginBlock: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.marginBlock)
        if (!deps.isString(val)) return
        const [marginBlockStart, marginBlockEnd] = val.split(' ')
        return {
          ...deps.transformSize.call(el, 'marginBlockStart', marginBlockStart),
          ...deps.transformSize(
            'marginBlockEnd',
            marginBlockEnd || marginBlockStart
          )
        }
      },
      marginInlineStart: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'marginInlineStart', props)
      },
      marginInlineEnd: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'marginInlineEnd', props)
      },
      marginBlockStart: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'marginBlockStart', props)
      },
      marginBlockEnd: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'marginBlockEnd', props)
      },

      gap: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gap)
        if (deps.isUndefined(val)) return
        return { gap: transfromGap(val) }
      },

      columnGap: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnGap)
        if (deps.isUndefined(val)) return
        return deps.getSpacingBasedOnRatio(
          { ...props, columnGap: val },
          'columnGap'
        )
      },
      rowGap: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.rowGap)
        if (deps.isUndefined(val)) return
        return deps.getSpacingBasedOnRatio({ ...props, rowGap: val }, 'rowGap')
      },

      flexWrap: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.flexWrap)
        if (deps.isUndefined(val)) return
        return {
          display: 'flex',
          flexFlow: (props.flexFlow || 'row').split(' ')[0] + ' ' + val
        }
      },
      flexFlow: (element) => {
        const { props, deps } = element
        const flexFlow = deps.exec.call(element, props.flexFlow)
        const reverse = deps.exec.call(element, props.reverse)
        if (!deps.isString(flexFlow)) return
        let [direction, wrap] = (flexFlow || 'row').split(' ')
        if (flexFlow.startsWith('x') || flexFlow === 'row') direction = 'row'
        if (flexFlow.startsWith('y') || flexFlow === 'column')
          direction = 'column'
        return {
          display: 'flex',
          flexFlow:
            (direction || '') +
            (!direction.includes('-reverse') && reverse ? '-reverse' : '') +
            ' ' +
            (wrap || '')
        }
      },
      flexAlign: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.flexAlign)
        if (!deps.isString(val)) return
        const [alignItems, justifyContent] = val.split(' ')
        return {
          display: 'flex',
          alignItems,
          justifyContent
        }
      },

      // block:css
      display: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.display)
        if (deps.isUndefined(val)) return
        return { display: val }
      },

      direction: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.direction)
        if (deps.isUndefined(val)) return
        return { direction: val }
      },

      objectFit: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.objectFit)
        if (deps.isUndefined(val)) return
        return { objectFit: val }
      },

      aspectRatio: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.aspectRatio)
        if (deps.isUndefined(val)) return
        return { aspectRatio: val }
      },

      gridArea: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridArea)
        if (!val) return
        return { gridArea: val }
      },

      float: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.float)
        if (deps.isUndefined(val)) return
        return { float: val }
      },

      flex: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.flex)
        if (deps.isUndefined(val)) return
        return { flex: val }
      },
      flexDirection: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.flexDirection)
        if (deps.isUndefined(val)) return
        return { flexDirection: val }
      },
      alignItems: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.alignItems)
        if (deps.isUndefined(val)) return
        return { alignItems: val }
      },
      alignContent: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.alignContent)
        if (deps.isUndefined(val)) return
        return { alignContent: val }
      },
      justifyContent: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.justifyContent)
        if (deps.isUndefined(val)) return
        return { justifyContent: val }
      },
      justifyItems: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.justifyItems)
        if (deps.isUndefined(val)) return
        return { justifyItems: val }
      },
      alignSelf: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.alignSelf)
        if (deps.isUndefined(val)) return
        return { alignSelf: val }
      },
      order: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.order)
        if (deps.isUndefined(val)) return
        return { order: val }
      },

      gridColumn: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridColumn)
        if (deps.isUndefined(val)) return
        return { gridColumn: val }
      },
      gridColumnStart: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridColumnStart)
        if (deps.isUndefined(val)) return
        return { gridColumnStart: val }
      },
      gridRow: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridRow)
        if (deps.isUndefined(val)) return
        return { gridRow: val }
      },
      gridRowStart: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridRowStart)
        if (deps.isUndefined(val)) return
        return { gridRowStart: val }
      },

      resize: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.resize)
        if (deps.isUndefined(val)) return
        return { resize: val }
      },

      verticalAlign: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.verticalAlign)
        if (deps.isUndefined(val)) return
        return { verticalAlign: val }
      },

      columns: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columns)
        if (deps.isUndefined(val)) return
        return { columns: val }
      },
      columnRule: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnRule)
        if (deps.isUndefined(val)) return
        return { columnRule: val }
      },
      columnWidth: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnWidth)
        if (deps.isUndefined(val)) return
        return { columnWidth: val }
      },
      columnSpan: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnSpan)
        if (deps.isUndefined(val)) return
        return { columnSpan: val }
      },
      columnFill: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnFill)
        if (deps.isUndefined(val)) return
        return { columnFill: val }
      },
      columnCount: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnCount)
        if (deps.isUndefined(val)) return
        return { columnCount: val }
      }
    },

    // direction
    direction: (element) => {
      const { props, deps } = element
      const val = deps.exec.call(element, props.direction)
      if (!val) return
      return { direction: val }
    },

    // position
    ...{
      position: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.position)
        if (!val) return
        return { position: val }
      },
      inset: (element, s, ctx) => {
        const { props, deps } = element
        const inset = deps.exec.call(element, props.inset)
        if (ctx.utils.isNumber(inset)) return { inset }
        if (!ctx.utils.isString(inset)) return
        return {
          inset: inset
            .split(' ')
            .map((v) => deps.getSpacingByKey(v, 'k').k)
            .join(' ')
        }
      },

      left: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.left)
        if (deps.isUndefined(val)) return
        return deps.getSpacingByKey(val, 'left')
      },
      top: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.top)
        if (deps.isUndefined(val)) return
        return deps.getSpacingByKey(val, 'top')
      },
      right: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.right)
        if (deps.isUndefined(val)) return
        return deps.getSpacingByKey(val, 'right')
      },
      bottom: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.bottom)
        if (deps.isUndefined(val)) return
        return deps.getSpacingByKey(val, 'bottom')
      },

      verticalInset: (element) => {
        const { props, deps } = element
        const verticalInset = deps.exec.call(element, props.verticalInset)
        if (typeof verticalInset !== 'string') return
        const vi = verticalInset
          .split(' ')
          .map((v) => deps.getSpacingByKey(v, 'k').k)
        return {
          top: vi[0],
          bottom: vi[1] || vi[0]
        }
      },

      horizontalInset: (element) => {
        const { props, deps } = element
        const horizontalInset = deps.exec.call(element, props.horizontalInset)
        if (typeof horizontalInset !== 'string') return
        const vi = horizontalInset
          .split(' ')
          .map((v) => deps.getSpacingByKey(v, 'k').k)
        return {
          left: vi[0],
          right: vi[1] || vi[0]
        }
      }
    },

    // overflow
    ...{
      overflow: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.overflow)
        if (deps.isUndefined(val)) return
        return { overflow: val, scrollBehavior: 'smooth' }
      },
      overflowX: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.overflowX)
        if (deps.isUndefined(val)) return
        return { overflowX: val }
      },
      overflowY: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.overflowY)
        if (deps.isUndefined(val)) return
        return { overflowY: val }
      },
      overscrollBehavior: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.overscrollBehavior)
        if (deps.isUndefined(val)) return
        return { overscrollBehavior: val }
      }
    },

    // interaction
    ...{
      userSelect: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.userSelect)
        if (!val) return
        return { userSelect: val }
      },
      pointerEvents: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.pointerEvents)
        if (!val) return
        return { pointerEvents: val }
      },
      cursor: (el, s, ctx) => {
        let val = el.deps.exec.call(el, el.props.cursor)
        if (!val) return

        const file = ctx.files && ctx.files[val]
        if (file && file.content) val = `url(${file.content.src})`

        return { cursor: val }
      }
    },

    // pseudo
    ...{
      content: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.content)
        if (!val) return
        return { content: val }
      }
    },

    // timing
    ...{
      transition: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transition)
        if (isUndefined(val)) return
        return { transition: deps.splitTransition(val) }
      },
      willChange: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.willChange)
        if (isUndefined(val)) return
        return { willChange: val }
      },
      transitionDuration: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transitionDuration)
        if (isUndefined(val)) return
        return { transitionDuration: deps.transformDuration(val) }
      },
      transitionDelay: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transitionDelay)
        if (isUndefined(val)) return
        return { transitionDelay: deps.transformDuration(val) }
      },
      transitionTimingFunction: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transitionTimingFunction)
        if (isUndefined(val)) return
        return { transitionTimingFunction: deps.getTimingFunction(val) }
      },
      transitionProperty: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transitionProperty)
        if (isUndefined(val)) return
        return { transitionProperty: val, willChange: val }
      }
    },

    // transform
    ...{
      zoom: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.zoom)
        if (isUndefined(val)) return
        return { zoom: val }
      },
      transform: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transform)
        if (isUndefined(val)) return
        return { transform: val }
      },
      transformOrigin: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.transformOrigin)
        if (isUndefined(val)) return
        return { transformOrigin: val }
      },
      backfaceVisibility: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.backfaceVisibility)
        if (isUndefined(val)) return
        return { backfaceVisibility: val }
      }
    },

    // xyz
    ...{
      zIndex: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.zIndex)
        if (isUndefined(val)) return
        return { zIndex: val }
      },
      perspective: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.perspective)
        if (isUndefined(val)) return
        return { perspective: val }
      },
      perspectiveOrigin: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.perspectiveOrigin)
        if (isUndefined(val)) return
        return { perspectiveOrigin: val }
      }
    },

    // theme
    ...{
      depth: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.depth)
        if (isUndefined(val)) return
        return deps.depth[val]
      },

      theme: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.theme) return
        const theme = deps.exec.call(element, props.theme)
        const hasSubtheme = theme.includes(' ') && !theme.includes('@')
        const globalThemeForced = `@${props.themeModifier || globalTheme}`
        if (hasSubtheme) {
          const themeAppliedInVal = theme.split(' ')
          themeAppliedInVal.splice(1, 0, globalThemeForced)
          return deps.getMediaTheme(themeAppliedInVal)
        } else if (theme.includes('@{globalTheme}'))
          theme.replace('@{globalTheme}', globalThemeForced)
        return deps.getMediaTheme(
          theme,
          `@${props.themeModifier || globalTheme}`
        )
      },

      color: (element) => {
        const { props, deps } = element
        if (!props.color) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const color = deps.exec.call(element, props.color)
        return {
          color: deps.getMediaColor(color, globalTheme)
        }
      },

      background: (element) => {
        const { props, deps } = element
        if (!props.background) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const background = deps.exec.call(element, props.background)
        return {
          background: deps.getMediaColor(background, globalTheme)
        }
      },

      backgroundColor: (element) => {
        const { props, deps } = element
        if (!props.backgroundColor) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const backgroundColor = deps.exec.call(element, props.backgroundColor)
        return {
          backgroundColor: deps.getMediaColor(backgroundColor, globalTheme)
        }
      },

      backgroundImage: (el, s, ctx) => {
        const { props, deps } = el
        const globalTheme = deps.getSystemGlobalTheme(el)
        let val = ctx.utils.exec.call(el, props.backgroundImage)
        if (!val) return
        if (ctx.utils.isString.call(el, val) && val.includes('{{')) {
          val = ctx.utils.replaceLiteralsWithObjectFields.call(el, val)
        }
        const file = ctx.files && ctx.files[val]
        if (file && file.content) val = file.content.src
        return {
          backgroundImage: deps.transformBackgroundImage(val, globalTheme)
        }
      },
      backgroundSize: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.backgroundSize)
        if (isUndefined(val)) return
        return { backgroundSize: val }
      },
      backgroundPosition: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.backgroundPosition)
        if (isUndefined(val)) return
        return { backgroundPosition: val }
      },
      backgroundRepeat: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.backgroundRepeat)
        if (isUndefined(val)) return
        return { backgroundRepeat: val }
      },

      textStroke: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.textStroke)
        if (isUndefined(val)) return
        return { WebkitTextStroke: deps.transformTextStroke(val) }
      },

      outline: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.outline)
        if (isUndefined(val)) return
        return { outline: deps.transformBorder(val) }
      },
      outlineOffset: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'outlineOffset', props)
      },

      border: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.border)
        if (!isString(val) && !isNumber(val)) return
        return { border: deps.transformBorder(val) }
      },

      borderColor: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.borderColor) return
        const val = deps.exec.call(element, props.borderColor)
        return {
          borderColor: deps.getMediaColor(val, globalTheme)
        }
      },
      borderStyle: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.borderStyle)
        if (isUndefined(val)) return
        return { borderStyle: val }
      },

      borderLeft: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.borderLeft)
        if (isUndefined(val)) return
        return { borderLeft: deps.transformBorder(val) }
      },
      borderTop: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.borderTop)
        if (isUndefined(val)) return
        return { borderTop: deps.transformBorder(val) }
      },
      borderRight: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.borderRight)
        if (isUndefined(val)) return
        return { borderRight: deps.transformBorder(val) }
      },
      borderBottom: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.borderBottom)
        if (isUndefined(val)) return
        return { borderBottom: deps.transformBorder(val) }
      },

      shadow: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        const val = deps.exec.call(element, props.shadow)
        if (!val) return
        return {
          boxShadow: deps.transformShadow(val, globalTheme)
        }
      },

      // boxShadow: ({ props, deps }) => isString(props.boxShadow) && ({
      //   boxShadow: deps.transformBoxShadow(props.boxShadow)
      // }),

      boxShadow: (element, state, context) => {
        const { props, deps } = element
        const boxShadow = deps.exec.call(element, props.boxShadow)
        if (!isString(boxShadow)) return
        const [val, hasImportant] = boxShadow.split('!importan')
        const globalTheme = getSystemGlobalTheme(element)
        const important = hasImportant ? ' !important' : ''
        return {
          boxShadow:
            deps.transformBoxShadow(val.trim(), globalTheme) + important
        }
      },

      textShadow: (element) => {
        const { props, deps, context } = element
        const val = deps.exec.call(element, props.textShadow)
        if (isUndefined(val)) return
        return {
          textShadow: deps.transformBoxShadow(
            val,
            context.designSystem.globalTheme
          )
        }
      },

      backdropFilter: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.backdropFilter)
        if (isUndefined(val)) return
        return { backdropFilter: val }
      },

      caretColor: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.caretColor)
        if (isUndefined(val)) return
        return { caretColor: val }
      },

      opacity: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.opacity)
        if (isUndefined(val)) return
        return { opacity: val }
      },
      visibility: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.visibility)
        if (isUndefined(val)) return
        return { visibility: val }
      },

      columnRule: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.columnRule)
        if (isUndefined(val)) return
        return { columnRule: deps.transformBorder(val) }
      },

      filter: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.filter)
        if (isUndefined(val)) return
        return { filter: val }
      },

      mixBlendMode: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.mixBlendMode)
        if (isUndefined(val)) return
        return { mixBlendMode: val }
      },

      appearance: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.appearance)
        if (isUndefined(val)) return
        return { appearance: val }
      }
    },

    // animation
    ...{
      animation: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.animation)
        if (!val) return
        return {
          animationName: deps.applyAnimationProps(val, el),
          animationDuration: deps.getTimingByKey(
            deps.exec.call(el, props.animationDuration) || 'A'
          ).timing,
          animationDelay: deps.getTimingByKey(
            deps.exec.call(el, props.animationDelay) || '0s'
          ).timing,
          animationTimingFunction: deps.getTimingFunction(
            deps.exec.call(el, props.animationTimingFunction) || 'ease'
          ),
          animationFillMode:
            deps.exec.call(el, props.animationFillMode) || 'both',
          animationPlayState: deps.exec.call(el, props.animationPlayState),
          animationDirection: deps.exec.call(el, props.animationDirection)
        }
      },
      animationName: (el) => {
        const { props, deps } = el
        const val = deps.exec.call(el, props.animationName)
        if (!val) return
        return { animationName: deps.applyAnimationProps(val, el) }
      },
      animationDuration: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationDuration)
        if (!val) return
        return { animationDuration: deps.getTimingByKey(val).timing }
      },
      animationDelay: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationDelay)
        if (!val) return
        return { animationDelay: deps.getTimingByKey(val).timing }
      },
      animationTimingFunction: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationTimingFunction)
        if (!val) return
        return { animationTimingFunction: deps.getTimingFunction(val) }
      },
      // animation:css
      animationFillMode: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationFillMode)
        if (!val) return
        return { animationFillMode: val }
      },
      animationPlayState: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationPlayState)
        if (!val) return
        return { animationPlayState: val }
      },
      animationIterationCount: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationIterationCount)
        if (!val) return
        return { animationIterationCount: val || 1 }
      },
      animationDirection: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.animationDirection)
        if (!val) return
        return { animationDirection: val }
      }
    },

    // shape
    ...{
      shape: (element) => {
        const { props, deps } = element
        const shape = deps.exec.call(element, props.shape)
        return deps.exec(SHAPES[shape], { props, deps })
      },
      shapeDirection: (element) => {
        const { props, deps } = element
        const shape = deps.exec.call(element, props.shape)
        const shapeDirection = deps.exec.call(element, props.shapeDirection)
        if (!shape || !shapeDirection) return
        const shapeDir = SHAPES[shape + 'Direction']
        return shape && shapeDir ? shapeDir[shapeDirection || 'left'] : null
      },
      shapeDirectionColor: (element) => {
        const { props, deps } = element
        const background = deps.exec.call(element, props.background)
        const backgroundColor = deps.exec.call(element, props.backgroundColor)
        const borderColor = {
          borderColor: deps.getMediaColor(background || backgroundColor)
        }
        const shapeDirection = deps.exec.call(element, props.shapeDirection)
        return shapeDirection ? borderColor : null
      },

      round: (element) => {
        const { props, deps } = element
        const round = deps.exec.call(element, props.round)
        const borderRadius = deps.exec.call(element, props.borderRadius)
        return deps.transformBorderRadius(round || borderRadius, props, 'round')
      },
      borderRadius: (element) => {
        const { props, deps } = element
        const borderRadius = deps.exec.call(element, props.borderRadius)
        const round = deps.exec.call(element, props.round)
        return deps.transformBorderRadius(
          borderRadius || round,
          props,
          'borderRadius'
        )
      },
      clip: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.clip)
        if (isUndefined(val)) return
        return { clip: val }
      }
    },

    // scrollbar
    ...{
      scrollbarWidth: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'scrollbarWidth', props)
      }
    },

    // grid
    ...{
      gridTemplate: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridTemplate)
        if (isUndefined(val)) return
        return { gridTemplate: val }
      },
      gridTemplateColumns: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridTemplateColumns)
        if (isUndefined(val)) return
        return { gridTemplateColumns: val }
      },
      gridTemplateRows: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridTemplateRows)
        if (isUndefined(val)) return
        return { gridTemplateRows: val }
      },
      gridTemplateAreas: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridTemplateAreas)
        if (isUndefined(val)) return
        return { gridTemplateAreas: val }
      },
      gridAutoColumns: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridAutoColumns)
        if (isUndefined(val)) return
        return { gridAutoColumns: val }
      },
      gridAutoRows: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridAutoRows)
        if (isUndefined(val)) return
        return { gridAutoRows: val }
      },
      gridAutoFlow: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridAutoFlow)
        if (isUndefined(val)) return
        return { gridAutoFlow: val }
      },
      grid: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.grid)
        if (isUndefined(val)) return
        return { grid: val }
      },
      gridColumnEnd: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridColumnEnd)
        if (isUndefined(val)) return
        return { gridColumnEnd: val }
      },
      gridRowEnd: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.gridRowEnd)
        if (isUndefined(val)) return
        return { gridRowEnd: val }
      }
    },

    // container queries
    ...{
      container: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.container)
        if (!val) return
        return { container: val }
      },
      containerName: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.containerName)
        if (!val) return
        return { containerName: val || 1 }
      },
      containerType: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.containerType)
        if (!val) return
        return { containerType: val }
      }
    },

    // clip
    ...{
      backgroundClip: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.backgroundClip)
        if (isUndefined(val)) return
        return { backgroundClip: val, WebkitBackgroundClip: val }
      },
      clipPath: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.clipPath)
        if (isUndefined(val)) return
        return { clipPath: val }
      }
    },

    // webkit
    ...{
      lineClamp: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.lineClamp)
        if (isUndefined(val)) return
        return {
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: val,
          overflow: 'hidden'
        }
      },
      WebkitBoxOrient: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.webkitBoxOrient)
        if (isUndefined(val)) return
        return { WebkitBoxOrient: val }
      },
      WebkitLineClamp: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.webkitLineClamp)
        if (isUndefined(val)) return
        return { WebkitLineClamp: val }
      },
      WebkitBackgroundClip: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.webkitBackgroundClip)
        if (isUndefined(val)) return
        return { WebkitBackgroundClip: val }
      },
      WebkitTextFillColor: (element) => {
        const { props, deps } = element
        if (!props.webkitTextFillColor) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const val = deps.exec.call(element, props.webkitTextFillColor)
        return { WebkitTextFillColor: deps.getMediaColor(val, globalTheme) }
      },
      WebkitOverflowScrolling: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.webkitOverflowScrolling)
        if (isUndefined(val)) return
        return { WebkitOverflowScrolling: val }
      },
      WebkitFontSmoothing: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.webkitFontSmoothing)
        if (isUndefined(val)) return
        return { WebkitFontSmoothing: val }
      },
      WebkitTapHighlightColor: (element) => {
        const { props, deps } = element
        if (!props.webkitTapHighlightColor) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const val = deps.exec.call(element, props.webkitTapHighlightColor)
        return {
          WebkitTapHighlightColor: deps.getMediaColor(val, globalTheme)
        }
      }
    },

    // missing standard props
    ...{
      objectPosition: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.objectPosition)
        if (isUndefined(val)) return
        return { objectPosition: val }
      },
      isolation: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.isolation)
        if (isUndefined(val)) return
        return { isolation: val }
      },
      touchAction: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.touchAction)
        if (isUndefined(val)) return
        return { touchAction: val }
      },
      flexGrow: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.flexGrow)
        if (isUndefined(val)) return
        return { flexGrow: val }
      },
      flexShrink: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.flexShrink)
        if (isUndefined(val)) return
        return { flexShrink: val }
      },
      flexBasis: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.flexBasis)
        if (isUndefined(val)) return
        return { flexBasis: val }
      },
      justifySelf: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.justifySelf)
        if (isUndefined(val)) return
        return { justifySelf: val }
      },
      placeSelf: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.placeSelf)
        if (isUndefined(val)) return
        return { placeSelf: val }
      },
      placeItems: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.placeItems)
        if (isUndefined(val)) return
        return { placeItems: val }
      },
      placeContent: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.placeContent)
        if (isUndefined(val)) return
        return { placeContent: val }
      },
      scrollSnapType: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.scrollSnapType)
        if (isUndefined(val)) return
        return { scrollSnapType: val }
      },
      scrollSnapAlign: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.scrollSnapAlign)
        if (isUndefined(val)) return
        return { scrollSnapAlign: val }
      },
      writingMode: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.writingMode)
        if (isUndefined(val)) return
        return { writingMode: val }
      },
      tabSize: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.tabSize)
        if (isUndefined(val)) return
        return { tabSize: val }
      },
      listStyle: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.listStyle)
        if (isUndefined(val)) return
        return { listStyle: val }
      },
      listStyleType: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.listStyleType)
        if (isUndefined(val)) return
        return { listStyleType: val }
      },
      accentColor: (element) => {
        const { props, deps } = element
        if (!props.accentColor) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const val = deps.exec.call(element, props.accentColor)
        return { accentColor: deps.getMediaColor(val, globalTheme) }
      },
      outlineColor: (element) => {
        const { props, deps } = element
        if (!props.outlineColor) return
        const globalTheme = deps.getSystemGlobalTheme(element)
        const val = deps.exec.call(element, props.outlineColor)
        return { outlineColor: deps.getMediaColor(val, globalTheme) }
      },
      outlineStyle: (element) => {
        const { props, deps } = element
        const val = deps.exec.call(element, props.outlineStyle)
        if (isUndefined(val)) return
        return { outlineStyle: val }
      },
      outlineWidth: (el) => {
        const { props, deps } = el
        return deps.transformSizeRatio.call(el, 'outlineWidth', props)
      }
    }
  },

  on: { beforeClassAssign }
}

export const Circle = {
  props: {
    round: '100%'
  }
}

export const Hr = {
  tag: 'hr',
  props: { margin: 'C1 0', borderWidth: '0 0 1px 0' }
}
export const Br = { tag: 'br' }
export const Div = { tag: 'div' }
export const Span = { tag: 'span' }
export const Li = { tag: 'li' }
export const Ul = {
  tag: 'ul',
  childExtend: { extend: 'Li' }
}
export const Ol = {
  tag: 'ol',
  childExtend: { extend: 'Li' }
}
// export const Article = { tag: 'article' }

export const Gutter = {
  props: {
    size: 'C1'
  }
}

export const Flex = {
  props: {
    display: 'flex'
  }
}
