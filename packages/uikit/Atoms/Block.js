'use strict'

import { isUndefined } from '@domql/utils'

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
    transformSize
  },

  class: {
    boxSizing: ({ props }) => !isUndefined(props.boxSizing)
      ? ({ boxSizing: props.boxSizing })
      : { boxSizing: 'border-box' },

    display: ({ props }) => !isUndefined(props.display) && ({
      display: props.display
    }),

    hide: ({ props }) => props.hide && ({
      display: 'none !important'
    }),

    width: ({ props, deps }) => deps.transformSizeRatio('width', props),
    height: ({ props, deps }) => deps.transformSizeRatio('height', props),

    boxSize: ({ props, deps }) => {
      if (typeof props.boxSize !== 'string') return
      const [height, width] = props.boxSize.split(' ')
      return {
        ...deps.transformSize('height', height),
        ...deps.transformSize('width', width || height)
      }
    },

    minWidth: ({ props, deps }) => deps.transformSizeRatio('minWidth', props),
    maxWidth: ({ props, deps }) => deps.transformSizeRatio('maxWidth', props),
    widthRange: ({ props, deps }) => {
      if (typeof props.widthRange !== 'string') return
      const [minWidth, maxWidth] = props.widthRange.split(' ')
      return {
        ...deps.transformSize('minWidth', minWidth),
        ...deps.transformSize('maxWidth', maxWidth || minWidth)
      }
    },

    minHeight: ({ props, deps }) => deps.transformSizeRatio('minHeight', props),
    maxHeight: ({ props, deps }) => deps.transformSizeRatio('maxHeight', props),
    heightRange: ({ props, deps }) => {
      if (typeof props.heightRange !== 'string') return
      const [minHeight, maxHeight] = props.heightRange.split(' ')
      return {
        ...deps.transformSize('minHeight', minHeight),
        ...deps.transformSize('maxHeight', maxHeight || minHeight)
      }
    },

    direction: ({ props }) => !isUndefined(props.direction) && ({
      direction: props.direction
    }),

    aspectRatio: ({ props }) => !isUndefined(props.aspectRatio) && ({
      aspectRatio: props.aspectRatio
    }),

    borderWidth: ({ props, deps }) => deps.transformSizeRatio('borderWidth', props),

    padding: ({ props, deps }) => deps.transformSizeRatio('padding', props),
    paddingInline: ({ props, deps }) => {
      if (typeof props.paddingInline !== 'string') return
      const [paddingInlineStart, paddingInlineEnd] = props.paddingInline.split(' ')
      return {
        ...deps.transformSize('paddingInlineStart', paddingInlineStart),
        ...deps.transformSize('paddingInlineEnd', paddingInlineEnd || paddingInlineStart)
      }
    },
    paddingBlock: ({ props, deps }) => {
      if (typeof props.paddingBlock !== 'string') return
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
      if (typeof props.marginInline !== 'string') return
      const [marginInlineStart, marginInlineEnd] = props.marginInline.split(' ')
      return {
        ...deps.getSpacingByKey('marginInlineStart', marginInlineStart),
        ...deps.getSpacingByKey('marginInlineEnd', marginInlineEnd || marginInlineStart)
      }
    },
    marginBlock: ({ props, deps }) => {
      if (typeof props.marginBlock !== 'string') return
      const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
      return {
        ...deps.getSpacingByKey('marginBlockStart', marginBlockStart),
        ...deps.getSpacingByKey('marginBlockEnd', marginBlockEnd || marginBlockStart)
      }
    },
    marginInlineStart: ({ props, deps }) => deps.transformSizeRatio('marginInlineStart', props),
    marginInlineEnd: ({ props, deps }) => deps.transformSizeRatio('marginInlineEnd', props),
    marginBlockStart: ({ props, deps }) => deps.transformSizeRatio('marginBlockStart', props),
    marginBlockEnd: ({ props, deps }) => deps.transformSizeRatio('marginBlockEnd', props),

    gap: ({ props }) => !isUndefined(props.gap) && ({
      gap: transfromGap(props.gap)
    }),
    gridArea: ({ props, deps }) => props.gridArea && ({ gridArea: props.gridArea }),

    flex: ({ props }) => props.flex && ({
      flex: props.flex
    }),
    flexDirection: ({ props }) => !isUndefined(props.flexDirection) && ({
      flexDirection: props.flexDirection
    }),
    alignItems: ({ props }) => !isUndefined(props.alignItems) && ({
      alignItems: props.alignItems
    }),
    alignContent: ({ props }) => !isUndefined(props.alignContent) && ({
      alignContent: props.alignContent
    }),
    justifyContent: ({ props }) => !isUndefined(props.justifyContent) && ({
      justifyContent: props.justifyContent
    }),
    justifyItems: ({ props }) => !isUndefined(props.justifyItems) && ({
      justifyItems: props.justifyItems
    }),
    alignSelf: ({ props }) => !isUndefined(props.alignSelf) && ({
      alignSelf: props.alignSelf
    }),
    order: ({ props }) => props.order && ({
      order: props.order
    }),

    flexWrap: ({ props }) => !isUndefined(props.flexWrap) && ({
      display: 'flex',
      flexFlow: props.flexWrap
    }),
    flexFlow: ({ props }) => !isUndefined(props.flexFlow) && ({
      display: 'flex',
      flexFlow: props.flexFlow + (props.reverse ? '-reverse' : '')
    }),
    flexAlign: ({ props }) => {
      if (typeof props.flexAlign !== 'string') return
      const [alignItems, justifyContent] = props.flexAlign.split(' ')
      return {
        display: 'flex',
        alignItems,
        justifyContent
      }
    },

    gridColumn: ({ props }) => !isUndefined(props.gridColumn) && ({
      gridColumn: props.gridColumn
    }),
    gridColumnStart: ({ props }) => !isUndefined(props.gridColumnStart) && ({
      gridColumnStart: props.gridColumnStart
    }),
    gridRow: ({ props }) => !isUndefined(props.gridRow) && ({
      gridRow: props.gridRow
    }),
    gridRowStart: ({ props }) => !isUndefined(props.gridRowStart) && ({
      gridRowStart: props.gridRowStart
    }),

    size: ({ props, deps }) => {
      if (typeof props.heightRange !== 'string') return
      const [minHeight, maxHeight] = props.heightRange.split(' ')
      return {
        ...deps.transformSizeRatio('minHeight', minHeight),
        ...deps.transformSizeRatio('maxHeight', maxHeight || minHeight)
      }
    },

    columns: ({ props }) => !isUndefined(props.columns) && ({
      columns: props.columns
    }),
    columnRule: ({ props }) => !isUndefined(props.columnRule) && ({
      columnRule: props.columnRule
    }),
    columnWidth: ({ props }) => !isUndefined(props.columnWidth) && ({
      columnWidth: props.columnWidth
    }),
    columnGap: ({ props, deps }) => deps.transformSizeRatio('columnGap', props),
    columnSpan: ({ props }) => !isUndefined(props.columnSpan) && ({
      columnSpan: props.columnSpan
    }),
    columnFill: ({ props }) => !isUndefined(props.columnFill) && ({
      columnFill: props.columnFill
    }),
    columnCount: ({ props }) => !isUndefined(props.columnCount) && ({
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
export const Ul = {
  tag: 'ul',
  childExtend: { tag: 'li' }
}
// export const Article = { tag: 'article' }

export const Gutter = {
  deps: { getSpacingByKey },
  props: {
    size: 'C1'
  },
  class: {
    size: ({ props, deps }) => {
      if (typeof props.size !== 'string') return
      const [height, width] = props.size.split(' ')
      return {
        ...deps.getSpacingByKey('height', height),
        ...deps.getSpacingByKey('width', width || height)
      }
    }
  }
}
