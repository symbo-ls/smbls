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
      if (isEditable) return el.call('exec', isEditable, el, s)
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

      height: ({ props, deps }) => deps.transformSizeRatio('height', props),
      width: ({ props, deps }) => deps.transformSizeRatio('width', props),

      boxSizing: ({ props, deps }) =>
        !deps.isUndefined(props.boxSizing)
          ? { boxSizing: props.boxSizing }
          : { boxSizing: 'border-box' },

      boxSize: ({ props, deps }) => {
        if (!deps.isString(props.boxSize)) return
        const [height, width] = props.boxSize.split(' ')
        return {
          ...deps.transformSize('height', height),
          ...deps.transformSize('width', width || height)
        }
      },

      inlineSize: ({ props, deps }) =>
        deps.transformSizeRatio('inlineSize', props),
      blockSize: ({ props, deps }) =>
        deps.transformSizeRatio('blockSize', props),

      minWidth: ({ props, deps }) => deps.transformSizeRatio('minWidth', props),
      maxWidth: ({ props, deps }) => deps.transformSizeRatio('maxWidth', props),
      widthRange: ({ props, deps }) => {
        if (!deps.isString(props.widthRange)) return
        const [minWidth, maxWidth] = props.widthRange.split(' ')
        return {
          ...deps.transformSize('minWidth', minWidth),
          ...deps.transformSize('maxWidth', maxWidth || minWidth)
        }
      },

      minHeight: ({ props, deps }) =>
        deps.transformSizeRatio('minHeight', props),
      maxHeight: ({ props, deps }) =>
        deps.transformSizeRatio('maxHeight', props),
      heightRange: ({ props, deps }) => {
        if (!deps.isString(props.heightRange)) return
        const [minHeight, maxHeight] = props.heightRange.split(' ')
        return {
          ...deps.transformSize('minHeight', minHeight),
          ...deps.transformSize('maxHeight', maxHeight || minHeight)
        }
      },

      size: ({ props, deps }) => {
        if (!deps.isString(props.size)) return
        const [inlineSize, blockSize] = props.size.split(' ')
        return {
          ...deps.transformSizeRatio('inlineSize', inlineSize),
          ...deps.transformSizeRatio('blockSize', blockSize || inlineSize)
        }
      },

      minBlockSize: ({ props, deps }) =>
        deps.transformSizeRatio('minBlockSize', props),
      minInlineSize: ({ props, deps }) =>
        deps.transformSizeRatio('minInlineSize', props),

      maxBlockSize: ({ props, deps }) =>
        deps.transformSizeRatio('maxBlockSize', props),
      maxInlineSize: ({ props, deps }) =>
        deps.transformSizeRatio('maxInlineSize', props),

      minSize: ({ props, deps }) => {
        if (!deps.isString(props.minSize)) return
        const [minInlineSize, minBlockSize] = props.minSize.split(' ')
        return {
          ...deps.transformSize('minInlineSize', minInlineSize),
          ...deps.transformSize('minBlockSize', minBlockSize || minInlineSize)
        }
      },

      maxSize: ({ props, deps }) => {
        if (!deps.isString(props.maxSize)) return
        const [maxInlineSize, maxBlockSize] = props.maxSize.split(' ')
        return {
          ...deps.transformSize('maxInlineSize', maxInlineSize),
          ...deps.transformSize('maxBlockSize', maxBlockSize || maxInlineSize)
        }
      },

      borderWidth: ({ props, deps }) =>
        deps.transformSizeRatio('borderWidth', props),

      padding: ({ props, deps }) => deps.transformSizeRatio('padding', props),
      scrollPadding: ({ props, deps }) =>
        deps.transformSizeRatio('scrollPadding', props),
      paddingInline: ({ props, deps }) => {
        if (!deps.isString(props.paddingInline)) return
        const [paddingInlineStart, paddingInlineEnd] =
          props.paddingInline.split(' ')
        return {
          ...deps.transformSize('paddingInlineStart', paddingInlineStart),
          ...deps.transformSize(
            'paddingInlineEnd',
            paddingInlineEnd || paddingInlineStart
          )
        }
      },
      paddingBlock: ({ props, deps }) => {
        if (!deps.isString(props.paddingBlock)) return
        const [paddingBlockStart, paddingBlockEnd] =
          props.paddingBlock.split(' ')
        return {
          ...deps.transformSize('paddingBlockStart', paddingBlockStart),
          ...deps.transformSize(
            'paddingBlockEnd',
            paddingBlockEnd || paddingBlockStart
          )
        }
      },
      paddingInlineStart: ({ props, deps }) =>
        deps.transformSizeRatio('paddingInlineStart', props),
      paddingInlineEnd: ({ props, deps }) =>
        deps.transformSizeRatio('paddingInlineEnd', props),
      paddingBlockStart: ({ props, deps }) =>
        deps.transformSizeRatio('paddingBlockStart', props),
      paddingBlockEnd: ({ props, deps }) =>
        deps.transformSizeRatio('paddingBlockEnd', props),

      margin: ({ props, deps }) => deps.transformSizeRatio('margin', props),
      marginInline: ({ props, deps }) => {
        if (!deps.isString(props.marginInline)) return
        const [marginInlineStart, marginInlineEnd] =
          props.marginInline.split(' ')
        return {
          ...deps.transformSize('marginInlineStart', marginInlineStart),
          ...deps.transformSize(
            'marginInlineEnd',
            marginInlineEnd || marginInlineStart
          )
        }
      },
      marginBlock: ({ props, deps }) => {
        if (!deps.isString(props.marginBlock)) return
        const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
        return {
          ...deps.transformSize('marginBlockStart', marginBlockStart),
          ...deps.transformSize(
            'marginBlockEnd',
            marginBlockEnd || marginBlockStart
          )
        }
      },
      marginInlineStart: ({ props, deps }) =>
        deps.transformSizeRatio('marginInlineStart', props),
      marginInlineEnd: ({ props, deps }) =>
        deps.transformSizeRatio('marginInlineEnd', props),
      marginBlockStart: ({ props, deps }) =>
        deps.transformSizeRatio('marginBlockStart', props),
      marginBlockEnd: ({ props, deps }) =>
        deps.transformSizeRatio('marginBlockEnd', props),

      gap: ({ props, deps }) =>
        !deps.isUndefined(props.gap) && {
          gap: transfromGap(props.gap)
        },

      columnGap: ({ props, deps }) =>
        !deps.isUndefined(props.columnGap)
          ? deps.getSpacingBasedOnRatio(props, 'columnGap')
          : null,
      rowGap: ({ props, deps }) =>
        !deps.isUndefined(props.rowGap)
          ? deps.getSpacingBasedOnRatio(props, 'rowGap')
          : null,

      flexWrap: ({ props, deps }) =>
        !deps.isUndefined(props.flexWrap) && {
          display: 'flex',
          flexFlow:
            (props.flexFlow || 'row').split(' ')[0] + ' ' + props.flexWrap
        },
      flexFlow: ({ props, deps }) => {
        const { flexFlow, reverse } = props
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
      flexAlign: ({ props, deps }) => {
        if (!deps.isString(props.flexAlign)) return
        const [alignItems, justifyContent] = props.flexAlign.split(' ')
        return {
          display: 'flex',
          alignItems,
          justifyContent
        }
      },

      // block:css
      display: ({ props, deps }) =>
        !deps.isUndefined(props.display) && {
          display: props.display
        },

      direction: ({ props, deps }) =>
        !deps.isUndefined(props.direction) && {
          direction: props.direction
        },

      objectFit: ({ props, deps }) =>
        !deps.isUndefined(props.objectFit) && {
          objectFit: props.objectFit
        },

      aspectRatio: ({ props, deps }) =>
        !deps.isUndefined(props.aspectRatio) && {
          aspectRatio: props.aspectRatio
        },

      gridArea: ({ props, deps }) =>
        props.gridArea && { gridArea: props.gridArea },

      float: ({ props, deps }) =>
        !deps.isUndefined(props.float) && {
          float: props.float
        },

      flex: ({ props, deps }) =>
        !deps.isUndefined(props.flex) && {
          flex: props.flex
        },
      flexDirection: ({ props, deps }) =>
        !deps.isUndefined(props.flexDirection) && {
          flexDirection: props.flexDirection
        },
      alignItems: ({ props, deps }) =>
        !deps.isUndefined(props.alignItems) && {
          alignItems: props.alignItems
        },
      alignContent: ({ props, deps }) =>
        !deps.isUndefined(props.alignContent) && {
          alignContent: props.alignContent
        },
      justifyContent: ({ props, deps }) =>
        !deps.isUndefined(props.justifyContent) && {
          justifyContent: props.justifyContent
        },
      justifyItems: ({ props, deps }) =>
        !deps.isUndefined(props.justifyItems) && {
          justifyItems: props.justifyItems
        },
      alignSelf: ({ props, deps }) =>
        !deps.isUndefined(props.alignSelf) && {
          alignSelf: props.alignSelf
        },
      order: ({ props, deps }) =>
        !deps.isUndefined(props.order) && {
          order: props.order
        },

      gridColumn: ({ props, deps }) =>
        !deps.isUndefined(props.gridColumn) && {
          gridColumn: props.gridColumn
        },
      gridColumnStart: ({ props, deps }) =>
        !deps.isUndefined(props.gridColumnStart) && {
          gridColumnStart: props.gridColumnStart
        },
      gridRow: ({ props, deps }) =>
        !deps.isUndefined(props.gridRow) && {
          gridRow: props.gridRow
        },
      gridRowStart: ({ props, deps }) =>
        !deps.isUndefined(props.gridRowStart) && {
          gridRowStart: props.gridRowStart
        },

      resize: ({ props, deps }) =>
        !deps.isUndefined(props.resize) && {
          resize: props.resize
        },

      verticalAlign: ({ props, deps }) =>
        !deps.isUndefined(props.verticalAlign) && {
          verticalAlign: props.verticalAlign
        },

      columns: ({ props, deps }) =>
        !deps.isUndefined(props.columns) && {
          columns: props.columns
        },
      columnRule: ({ props, deps }) =>
        !deps.isUndefined(props.columnRule) && {
          columnRule: props.columnRule
        },
      columnWidth: ({ props, deps }) =>
        !deps.isUndefined(props.columnWidth) && {
          columnWidth: props.columnWidth
        },
      columnSpan: ({ props, deps }) =>
        !deps.isUndefined(props.columnSpan) && {
          columnSpan: props.columnSpan
        },
      columnFill: ({ props, deps }) =>
        !deps.isUndefined(props.columnFill) && {
          columnFill: props.columnFill
        },
      columnCount: ({ props, deps }) =>
        !deps.isUndefined(props.columnCount) && {
          columnCount: props.columnCount
        }
    },

    // direction
    direction: ({ props }) => props.direction && { direction: props.direction },

    // position
    ...{
      position: ({ props }) => props.position && { position: props.position },
      inset: ({ props, deps, context }) => {
        const { inset } = props
        if (context.utils.isNumber(inset)) return { inset }
        if (!context.utils.isString(inset)) return
        return {
          inset: inset
            .split(' ')
            .map((v) => deps.getSpacingByKey(v, 'k').k)
            .join(' ')
        }
      },

      left: ({ props, deps }) => deps.getSpacingByKey(props.left, 'left'),
      top: ({ props, deps }) => deps.getSpacingByKey(props.top, 'top'),
      right: ({ props, deps }) => deps.getSpacingByKey(props.right, 'right'),
      bottom: ({ props, deps }) => deps.getSpacingByKey(props.bottom, 'bottom'),

      verticalInset: ({ props, deps }) => {
        const { verticalInset } = props
        if (typeof verticalInset !== 'string') return
        const vi = verticalInset
          .split(' ')
          .map((v) => deps.getSpacingByKey(v, 'k').k)
        return {
          top: vi[0],
          bottom: vi[1] || vi[0]
        }
      },

      horizontalInset: ({ props, deps }) => {
        const { horizontalInset } = props
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
      overflow: ({ props, deps }) =>
        !deps.isUndefined(props.overflow) && {
          overflow: props.overflow,
          scrollBehavior: 'smooth'
        },
      overflowX: ({ props, deps }) =>
        !deps.isUndefined(props.overflowX) && {
          overflowX: props.overflowX
        },
      overflowY: ({ props, deps }) =>
        !deps.isUndefined(props.overflowY) && {
          overflowY: props.overflowY
        },
      overscrollBehavior: ({ props, deps }) =>
        !deps.isUndefined(props.overscrollBehavior) && {
          overscrollBehavior: props.overscrollBehavior
        }
    },

    // interaction
    ...{
      userSelect: ({ props }) =>
        props.userSelect && { userSelect: props.userSelect },
      pointerEvents: ({ props }) =>
        props.pointerEvents && { pointerEvents: props.pointerEvents },
      cursor: (el, s, ctx) => {
        let val = el.props.cursor
        if (!val) return

        const file = ctx.files && ctx.files[val]
        if (file && file.content) val = `url(${file.content.src})`

        return { cursor: val }
      }
    },

    // pseudo
    ...{
      content: ({ props }) => props.content && { content: props.content }
    },

    // timing
    ...{
      transition: ({ props, deps }) =>
        !isUndefined(props.transition) && {
          transition: deps.splitTransition(props.transition)
        },
      willChange: ({ props }) =>
        !isUndefined(props.willChange) && {
          willChange: props.willChange
        },
      transitionDuration: ({ props, deps }) =>
        !isUndefined(props.transitionDuration) && {
          transitionDuration: deps.transformDuration(props.transitionDuration)
        },
      transitionDelay: ({ props, deps }) =>
        !isUndefined(props.transitionDelay) && {
          transitionDelay: deps.transformDuration(props.transitionDelay)
        },
      transitionTimingFunction: ({ props, deps }) =>
        !isUndefined(props.transitionTimingFunction) && {
          transitionTimingFunction: deps.getTimingFunction(
            props.transitionTimingFunction
          )
        },
      transitionProperty: ({ props }) =>
        !isUndefined(props.transitionProperty) && {
          transitionProperty: props.transitionProperty,
          willChange: props.transitionProperty
        }
    },

    // transform
    ...{
      zoom: ({ props }) => !isUndefined(props.zoom) && { zoom: props.zoom },
      transform: ({ props }) =>
        !isUndefined(props.transform) && { transform: props.transform },
      transformOrigin: ({ props }) =>
        !isUndefined(props.transformOrigin) && {
          transformOrigin: props.transformOrigin
        },
      backfaceVisibility: ({ props }) =>
        !isUndefined(props.backfaceVisibility) && {
          backfaceVisibility: props.backfaceVisibility
        }
    },

    // xyz
    ...{
      zIndex: ({ props }) =>
        !isUndefined(props.zIndex) && { zIndex: props.zIndex },
      perspective: ({ props }) =>
        !isUndefined(props.perspective) && { perspective: props.perspective },
      perspectiveOrigin: ({ props }) =>
        !isUndefined(props.perspectiveOrigin) && {
          perspectiveOrigin: props.perspectiveOrigin
        }
    },

    // theme
    ...{
      depth: ({ props, deps }) =>
        !isUndefined(props.depth) && deps.depth[props.depth],

      theme: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.theme) return
        const hasSubtheme =
          props.theme.includes(' ') && !props.theme.includes('@')
        const globalThemeForced = `@${props.themeModifier || globalTheme}`
        if (hasSubtheme) {
          const themeAppliedInVal = props.theme.split(' ')
          themeAppliedInVal.splice(1, 0, globalThemeForced)
          return deps.getMediaTheme(themeAppliedInVal)
        } else if (props.theme.includes('@{globalTheme}'))
          props.theme.replace('@{globalTheme}', globalThemeForced)
        return deps.getMediaTheme(
          props.theme,
          `@${props.themeModifier || globalTheme}`
        )
      },

      color: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.color) return
        return {
          color: deps.getMediaColor(props.color, globalTheme)
        }
      },

      background: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.background) return
        return {
          background: deps.getMediaColor(props.background, globalTheme)
        }
      },

      backgroundColor: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.backgroundColor) return
        return {
          backgroundColor: deps.getMediaColor(
            props.backgroundColor,
            globalTheme
          )
        }
      },

      backgroundImage: (el, s, context) => {
        const { props, deps } = el
        const globalTheme = deps.getSystemGlobalTheme(el)
        let val = el.call('exec', props.backgroundImage)
        if (!val) return
        if (el.call('isString', val) && val.includes('{{')) {
          val = el.call('replaceLiteralsWithObjectFields', val)
        }
        const file = context.files && context.files[val]
        if (file && file.content) val = file.content.src
        return {
          backgroundImage: deps.transformBackgroundImage(val, globalTheme)
        }
      },
      backgroundSize: ({ props }) =>
        !isUndefined(props.backgroundSize)
          ? {
              backgroundSize: props.backgroundSize
            }
          : null,
      backgroundPosition: ({ props }) =>
        !isUndefined(props.backgroundPosition)
          ? {
              backgroundPosition: props.backgroundPosition
            }
          : null,
      backgroundRepeat: ({ props }) =>
        !isUndefined(props.backgroundRepeat)
          ? {
              backgroundRepeat: props.backgroundRepeat
            }
          : null,

      textStroke: ({ props, deps }) =>
        !isUndefined(props.textStroke)
          ? {
              WebkitTextStroke: deps.transformTextStroke(props.textStroke)
            }
          : null,

      outline: ({ props, deps }) =>
        !isUndefined(props.outline) && {
          outline: deps.transformBorder(props.outline)
        },
      outlineOffset: ({ props, deps }) =>
        deps.transformSizeRatio('outlineOffset', props),

      border: ({ props, deps }) =>
        (isString(props.border) || isNumber(props.border)) && {
          border: deps.transformBorder(props.border)
        },

      borderColor: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.borderColor) return
        return {
          borderColor: deps.getMediaColor(props.borderColor, globalTheme)
        }
      },
      borderStyle: ({ props }) =>
        !isUndefined(props.borderStyle) && {
          borderStyle: props.borderStyle
        },

      borderLeft: ({ props, deps }) =>
        !isUndefined(props.borderLeft) && {
          borderLeft: deps.transformBorder(props.borderLeft)
        },
      borderTop: ({ props, deps }) =>
        !isUndefined(props.borderTop) && {
          borderTop: deps.transformBorder(props.borderTop)
        },
      borderRight: ({ props, deps }) =>
        !isUndefined(props.borderRight) && {
          borderRight: deps.transformBorder(props.borderRight)
        },
      borderBottom: ({ props, deps }) =>
        !isUndefined(props.borderBottom) && {
          borderBottom: deps.transformBorder(props.borderBottom)
        },

      shadow: (element) => {
        const { props, deps } = element
        const globalTheme = deps.getSystemGlobalTheme(element)
        if (!props.backgroundImage) return
        return {
          boxShadow: deps.transformShadow(props.shadow, globalTheme)
        }
      },

      // boxShadow: ({ props, deps }) => isString(props.boxShadow) && ({
      //   boxShadow: deps.transformBoxShadow(props.boxShadow)
      // }),

      boxShadow: (element, state, context) => {
        const { props, deps } = element
        if (!isString(props.boxShadow)) return
        const [val, hasImportant] = props.boxShadow.split('!importan')
        const globalTheme = getSystemGlobalTheme(element)
        const important = hasImportant ? ' !important' : ''
        return {
          boxShadow:
            deps.transformBoxShadow(val.trim(), globalTheme) + important
        }
      },

      textShadow: ({ props, deps, context }) =>
        !isUndefined(props.textShadow) && {
          textShadow: deps.transformBoxShadow(
            props.textShadow,
            context.designSystem.globalTheme
          )
        },

      backdropFilter: ({ props, deps }) =>
        !isUndefined(props.backdropFilter) && {
          backdropFilter: props.backdropFilter
        },

      caretColor: ({ props }) =>
        !isUndefined(props.caretColor) && {
          caretColor: props.caretColor
        },

      opacity: ({ props }) =>
        !isUndefined(props.opacity) && {
          opacity: props.opacity
        },
      visibility: ({ props }) =>
        !isUndefined(props.visibility) && {
          visibility: props.visibility
        },

      columnRule: ({ props, deps }) =>
        !isUndefined(props.columnRule) && {
          columnRule: deps.transformBorder(props.columnRule)
        },

      filter: ({ props, deps }) =>
        !isUndefined(props.filter) && {
          filter: props.filter
        },

      mixBlendMode: ({ props, deps }) =>
        !isUndefined(props.mixBlendMode) && {
          mixBlendMode: props.mixBlendMode
        },

      appearance: ({ props }) =>
        !isUndefined(props.appearance) && {
          appearance: props.appearance
        }
    },

    // animation
    ...{
      animation: (el) =>
        el.props.animation && {
          animationName: el.deps.applyAnimationProps(el.props.animation, el),
          animationDuration: el.deps.getTimingByKey(
            el.props.animationDuration || 'A'
          ).timing,
          animationDelay: el.deps.getTimingByKey(
            el.props.animationDelay || '0s'
          ).timing,
          animationTimingFunction: el.deps.getTimingFunction(
            el.props.animationTimingFunction || 'ease'
          ),
          animationFillMode: el.props.animationFillMode || 'both',
          animationPlayState: el.props.animationPlayState,
          animationDirection: el.props.animationDirection
        },
      animationName: (el) =>
        el.props.animationName && {
          animationName: el.deps.applyAnimationProps(el.props.animationName, el)
        },
      animationDuration: ({ props, deps }) =>
        props.animationDuration && {
          animationDuration: deps.getTimingByKey(props.animationDuration).timing
        },
      animationDelay: ({ props, deps }) =>
        props.animationDelay && {
          animationDelay: deps.getTimingByKey(props.animationDelay).timing
        },
      animationTimingFunction: ({ props, deps }) =>
        props.animationTimingFunction && {
          animationTimingFunction: deps.getTimingFunction(
            props.animationTimingFunction
          )
        },
      // animation:css
      animationFillMode: ({ props }) =>
        props.animationFillMode && {
          animationFillMode: props.animationFillMode
        },
      animationPlayState: ({ props }) =>
        props.animationPlayState && {
          animationPlayState: props.animationPlayState
        },
      animationIterationCount: ({ props }) =>
        props.animationIterationCount && {
          animationIterationCount: props.animationIterationCount || 1
        },
      animationDirection: ({ props }) =>
        props.animationDirection && {
          animationDirection: props.animationDirection
        }
    },

    // shape
    ...{
      shape: ({ props, deps }) => {
        const { shape } = props
        return deps.exec(SHAPES[shape], { props, deps })
      },
      shapeDirection: ({ props }) => {
        const { shape, shapeDirection } = props
        if (!shape || !shapeDirection) return
        const shapeDir = SHAPES[shape + 'Direction']
        return shape && shapeDir ? shapeDir[shapeDirection || 'left'] : null
      },
      shapeDirectionColor: ({ props, deps }) => {
        const { background, backgroundColor } = props
        const borderColor = {
          borderColor: deps.getMediaColor(background || backgroundColor)
        }
        return props.shapeDirection ? borderColor : null
      },

      round: ({ props, key, deps, ...el }) =>
        deps.transformBorderRadius(
          props.round || props.borderRadius,
          props,
          'round'
        ),
      borderRadius: ({ props, key, deps, ...el }) =>
        deps.transformBorderRadius(
          props.borderRadius || props.round,
          props,
          'borderRadius'
        )
    },

    // container queries
    ...{
      container: ({ props }) =>
        props.container && {
          container: props.container
        },
      containerName: ({ props }) =>
        props.containerName && {
          containerName: props.containerName || 1
        },
      containerType: ({ props }) =>
        props.containerType && {
          containerType: props.containerType
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
  props: { margin: 'C1 0' }
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
