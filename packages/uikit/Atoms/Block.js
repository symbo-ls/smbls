'use strict'

import { isUndefined, isString } from '@domql/utils'

import {
  getSpacingBasedOnRatio,
  getSpacingByKey,
  transformSize,
  transformSizeRatio,
  transfromGap
} from '@symbo.ls/scratch'

export const Block = {
  deps: {
    getSpacingBasedOnRatio,
    getSpacingByKey,
    transfromGap,
    transformSizeRatio,
    transformSize,
    isUndefined,
    isString
  },

  class: {
    boxSizing: ({ props, deps }) => !deps.isUndefined(props.boxSizing)
      ? ({ boxSizing: props.boxSizing })
      : { boxSizing: 'border-box' },

    display: ({ props, deps }) => !deps.isUndefined(props.display) && ({
      display: props.display
    }),

    show: (el, s, ctx) => (ctx.utils.exec(el.props.show, el, s) === false) && ({
      display: 'none !important'
    }),

    hide: (el, s, ctx) => ctx.utils.exec(el.props.hide, el, s) && ({
      display: 'none !important'
    }),

    height: ({ props, deps }) => deps.transformSizeRatio('height', props),
    width: ({ props, deps }) => deps.transformSizeRatio('width', props),

    boxSize: ({ props, deps }) => {
      if (!deps.isString(props.boxSize)) return
      const [height, width] = props.boxSize.split(' ')
      return {
        ...deps.transformSize('height', height),
        ...deps.transformSize('width', width || height)
      }
    },

    inlineSize: ({ props, deps }) => deps.transformSizeRatio('inlineSize', props),
    blockSize: ({ props, deps }) => deps.transformSizeRatio('blockSize', props),

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

    minHeight: ({ props, deps }) => deps.transformSizeRatio('minHeight', props),
    maxHeight: ({ props, deps }) => deps.transformSizeRatio('maxHeight', props),
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

    minBlockSize: ({ props, deps }) => deps.transformSizeRatio('minBlockSize', props),
    minInlineSize: ({ props, deps }) => deps.transformSizeRatio('minInlineSize', props),

    maxBlockSize: ({ props, deps }) => deps.transformSizeRatio('maxBlockSize', props),
    maxInlineSize: ({ props, deps }) => deps.transformSizeRatio('maxInlineSize', props),

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

    direction: ({ props, deps }) => !deps.isUndefined(props.direction) && ({
      direction: props.direction
    }),

    objectFit: ({ props, deps }) => !deps.isUndefined(props.objectFit) && ({
      objectFit: props.objectFit
    }),

    aspectRatio: ({ props, deps }) => !deps.isUndefined(props.aspectRatio) && ({
      aspectRatio: props.aspectRatio
    }),

    borderWidth: ({ props, deps }) => deps.transformSizeRatio('borderWidth', props),

    padding: ({ props, deps }) => deps.transformSizeRatio('padding', props),
    scrollPadding: ({ props, deps }) => deps.transformSizeRatio('scrollPadding', props),
    paddingInline: ({ props, deps }) => {
      if (!deps.isString(props.paddingInline)) return
      const [paddingInlineStart, paddingInlineEnd] = props.paddingInline.split(' ')
      return {
        ...deps.transformSize('paddingInlineStart', paddingInlineStart),
        ...deps.transformSize('paddingInlineEnd', paddingInlineEnd || paddingInlineStart)
      }
    },
    paddingBlock: ({ props, deps }) => {
      if (!deps.isString(props.paddingBlock)) return
      const [paddingBlockStart, paddingBlockEnd] = props.paddingBlock.split(' ')
      return {
        ...deps.transformSize('paddingBlockStart', paddingBlockStart),
        ...deps.transformSize('paddingBlockEnd', paddingBlockEnd || paddingBlockStart)
      }
    },
    paddingInlineStart: ({ props, deps }) => deps.transformSizeRatio('paddingInlineStart', props),
    paddingInlineEnd: ({ props, deps }) => deps.transformSizeRatio('paddingInlineEnd', props),
    paddingBlockStart: ({ props, deps }) => deps.transformSizeRatio('paddingBlockStart', props),
    paddingBlockEnd: ({ props, deps }) => deps.transformSizeRatio('paddingBlockEnd', props),

    margin: ({ props, deps }) => deps.transformSizeRatio('margin', props),
    marginInline: ({ props, deps }) => {
      if (!deps.isString(props.marginInline)) return
      const [marginInlineStart, marginInlineEnd] = props.marginInline.split(' ')
      return {
        ...deps.transformSize('marginInlineStart', marginInlineStart),
        ...deps.transformSize('marginInlineEnd', marginInlineEnd || marginInlineStart)
      }
    },
    marginBlock: ({ props, deps }) => {
      if (!deps.isString(props.marginBlock)) return
      const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
      return {
        ...deps.transformSize('marginBlockStart', marginBlockStart),
        ...deps.transformSize('marginBlockEnd', marginBlockEnd || marginBlockStart)
      }
    },
    marginInlineStart: ({ props, deps }) => deps.transformSizeRatio('marginInlineStart', props),
    marginInlineEnd: ({ props, deps }) => deps.transformSizeRatio('marginInlineEnd', props),
    marginBlockStart: ({ props, deps }) => deps.transformSizeRatio('marginBlockStart', props),
    marginBlockEnd: ({ props, deps }) => deps.transformSizeRatio('marginBlockEnd', props),

    gap: ({ props, deps }) => !deps.isUndefined(props.gap) && ({
      gap: transfromGap(props.gap)
    }),

    columnGap: ({ props, deps }) => props.columnGap ? deps.getSpacingBasedOnRatio(props, 'columnGap') : null,
    rowGap: ({ props, deps }) => props.rowGap ? deps.getSpacingBasedOnRatio(props, 'rowGap') : null,

    gridArea: ({ props, deps }) => props.gridArea && ({ gridArea: props.gridArea }),

    float: ({ props, deps }) => !deps.isUndefined(props.float) && ({
      float: props.float
    }),

    flex: ({ props, deps }) => !deps.isUndefined(props.flex) && ({
      flex: props.flex
    }),
    flexDirection: ({ props, deps }) => !deps.isUndefined(props.flexDirection) && ({
      flexDirection: props.flexDirection
    }),
    alignItems: ({ props, deps }) => !deps.isUndefined(props.alignItems) && ({
      alignItems: props.alignItems
    }),
    alignContent: ({ props, deps }) => !deps.isUndefined(props.alignContent) && ({
      alignContent: props.alignContent
    }),
    justifyContent: ({ props, deps }) => !deps.isUndefined(props.justifyContent) && ({
      justifyContent: props.justifyContent
    }),
    justifyItems: ({ props, deps }) => !deps.isUndefined(props.justifyItems) && ({
      justifyItems: props.justifyItems
    }),
    alignSelf: ({ props, deps }) => !deps.isUndefined(props.alignSelf) && ({
      alignSelf: props.alignSelf
    }),
    order: ({ props, deps }) => !deps.isUndefined(props.order) && ({
      order: props.order
    }),

    flexWrap: ({ props, deps }) => !deps.isUndefined(props.flexWrap) && ({
      display: 'flex',
      flexFlow: (props.flexFlow || 'row').split(' ')[0] + ' ' + props.flexWrap
    }),
    flexFlow: ({ props, deps }) => {
      const { flexFlow, reverse } = props
      if (!deps.isString(flexFlow)) return
      let [direction, wrap] = (flexFlow || 'row').split(' ')
      if (flexFlow.startsWith('x') || flexFlow === 'row') direction = 'row'
      if (flexFlow.startsWith('y') || flexFlow === 'column') direction = 'column'
      return {
        display: 'flex',
        flexFlow: (direction || '') + (!direction.includes('-reverse') && reverse ? '-reverse' : '') + ' ' + (wrap || '')
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

    gridColumn: ({ props, deps }) => !deps.isUndefined(props.gridColumn) && ({
      gridColumn: props.gridColumn
    }),
    gridColumnStart: ({ props, deps }) => !deps.isUndefined(props.gridColumnStart) && ({
      gridColumnStart: props.gridColumnStart
    }),
    gridRow: ({ props, deps }) => !deps.isUndefined(props.gridRow) && ({
      gridRow: props.gridRow
    }),
    gridRowStart: ({ props, deps }) => !deps.isUndefined(props.gridRowStart) && ({
      gridRowStart: props.gridRowStart
    }),

    resize: ({ props, deps }) => !deps.isUndefined(props.resize) && ({
      resize: props.resize
    }),

    verticalAlign: ({ props, deps }) => !deps.isUndefined(props.verticalAlign) && ({ verticalAlign: props.verticalAlign }),

    columns: ({ props, deps }) => !deps.isUndefined(props.columns) && ({
      columns: props.columns
    }),
    columnRule: ({ props, deps }) => !deps.isUndefined(props.columnRule) && ({
      columnRule: props.columnRule
    }),
    columnWidth: ({ props, deps }) => !deps.isUndefined(props.columnWidth) && ({
      columnWidth: props.columnWidth
    }),
    columnSpan: ({ props, deps }) => !deps.isUndefined(props.columnSpan) && ({
      columnSpan: props.columnSpan
    }),
    columnFill: ({ props, deps }) => !deps.isUndefined(props.columnFill) && ({
      columnFill: props.columnFill
    }),
    columnCount: ({ props, deps }) => !deps.isUndefined(props.columnCount) && ({
      columnCount: props.columnCount
    })
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
  deps: { getSpacingByKey },
  props: {
    size: 'C1'
  },
  class: {
    size: ({ props, deps }) => {
      if (!deps.isString(props.size)) return
      const [height, width] = props.size.split(' ')
      return {
        ...deps.getSpacingByKey('height', height),
        ...deps.getSpacingByKey('width', width || height)
      }
    }
  }
}

// alt approach
// blockProps: (el, s, ctx) => {
//   const { props, deps } = el
//   const styles = {}

//   // Utility to conditionally add a style
//   const addStyle = (key, value) => {
//     if (deps.isObject(value)) deps.merge(styles, value)
//     else if (value) styles[key] = value
//   }

//   // Box sizing
//   addStyle('boxSizing', !deps.isUndefined(props.boxSizing) ? props.boxSizing : 'border-box')

//   // Display
//   addStyle('display', !deps.isUndefined(props.display) ? props.display : undefined)

//   // Show/Hide
//   if (ctx.utils.exec(el.props.show, el, s) === false) {
//     addStyle('display', 'none !important')
//   }
//   if (ctx.utils.exec(el.props.hide, el, s)) {
//     addStyle('display', 'none !important')
//   }

//   // Size transformations
//   const sizeKeys = ['height', 'width', 'inlineSize', 'blockSize', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight', 'minBlockSize', 'maxBlockSize', 'minInlineSize', 'maxInlineSize']
//   sizeKeys.forEach(key => addStyle(key, deps.transformSizeRatio(key, props)))

//   // Box size
//   if (deps.isString(props.boxSize)) {
//     const [height, width] = props.boxSize.split(' ')
//     Object.assign(styles, deps.transformSize('height', height))
//     Object.assign(styles, deps.transformSize('width', width || height))
//   }

//   // Size ranges
//   const rangeKeys = ['widthRange', 'heightRange', 'minSize', 'maxSize']
//   rangeKeys.forEach(key => {
//     if (deps.isString(props[key])) {
//       const [min, max] = props[key].split(' ')
//       addStyle(`min${key.charAt(0).toUpperCase() + key.slice(1)}`, deps.transformSize('min' + key, min))
//       addStyle(`max${key.charAt(0).toUpperCase() + key.slice(1)}`, deps.transformSize('max' + key, max || min))
//     }
//   })

//   // Direction, objectFit, aspectRatio, etc.
//   const simpleProps = ['direction', 'objectFit', 'aspectRatio', 'float', 'flex', 'flexDirection', 'alignItems', 'alignContent', 'justifyContent', 'justifyItems', 'alignSelf', 'order', 'resize', 'verticalAlign', 'columns', 'columnRule', 'columnWidth', 'columnSpan', 'columnFill', 'columnCount']
//   simpleProps.forEach(key => addStyle(key, !deps.isUndefined(props[key]) ? props[key] : undefined))

//   // Flex and grid specific properties
//   if (props.flexWrap) {
//     addStyle('flexWrap', props.flexWrap)
//   }
//   if (deps.isString(props.flexFlow)) {
//     let [direction, wrap] = props.flexFlow.split(' ')
//     direction = direction.startsWith('x') || direction === 'row' ? 'row' : 'column'
//     addStyle('flexFlow', direction + ' ' + (wrap || ''))
//   }

//   if (deps.isString(props.flexAlign)) {
//     const [alignItems, justifyContent] = props.flexAlign.split(' ')
//     addStyle('alignItems', alignItems)
//     addStyle('justifyContent', justifyContent)
//   }

//   // Gap properties
//   if (!deps.isUndefined(props.gap)) {
//     addStyle('gap', transfromGap(props.gap))
//   }
//   if (props.columnGap) {
//     addStyle('columnGap', deps.getSpacingBasedOnRatio(props, 'columnGap'))
//   }
//   if (props.rowGap) {
//     addStyle('rowGap', deps.getSpacingBasedOnRatio(props, 'rowGap'))
//   }

//   // Grid properties
//   const gridProps = ['gridColumn', 'gridColumnStart', 'gridRow', 'gridRowStart']
//   gridProps.forEach(key => addStyle(key, !deps.isUndefined(props[key]) ? props[key] : undefined))

//   console.log(styles)

//   return styles
// }
