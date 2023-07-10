'use strict'

import { getSpacingBasedOnRatio, getSpacingByKey, transfromGap } from '@symbo.ls/scratch'

export const Block = {
  class: {
    boxSizing: ({ props }) => props.boxSizing
      ? ({ boxSizing: props.boxSizing })
      : {
          boxSizing: 'border-box'
        },

    display: ({ props }) => props.display && ({ display: props.display }),

    hide: ({ props }) => props.hide && ({ display: 'none !important' }),

    width: ({ props }) => props.width && getSpacingBasedOnRatio(props, 'width'),
    height: ({ props }) => props.height && getSpacingBasedOnRatio(props, 'height'),
    boxSize: ({ props }) => {
      if (typeof props.boxSize !== 'string') return
      const [height, width] = props.boxSize.split(' ')
      return {
        ...getSpacingByKey(height, 'height'),
        ...getSpacingByKey(width || height, 'width')
      }
    },

    maxWidth: ({ props }) => props.maxWidth && getSpacingBasedOnRatio(props, 'maxWidth'),
    minWidth: ({ props }) => props.minWidth && getSpacingBasedOnRatio(props, 'minWidth'),
    widthRange: ({ props }) => {
      if (typeof props.widthRange !== 'string') return
      const [minWidth, maxWidth] = props.widthRange.split(' ')
      return {
        ...getSpacingByKey(minWidth, 'minWidth'),
        ...getSpacingByKey(maxWidth || minWidth, 'maxWidth')
      }
    },

    maxHeight: ({ props }) => props.maxHeight && getSpacingBasedOnRatio(props, 'maxHeight'),
    minHeight: ({ props }) => props.minHeight && getSpacingBasedOnRatio(props, 'minHeight'),
    heightRange: ({ props }) => {
      if (typeof props.heightRange !== 'string') return
      const [minHeight, maxHeight] = props.heightRange.split(' ')
      return {
        ...getSpacingByKey(minHeight, 'minHeight'),
        ...getSpacingByKey(maxHeight || minHeight, 'maxHeight')
      }
    },

    direction: ({ props }) => props.direction && ({ direction: props.direction }),

    aspectRatio: ({ props }) => props.aspectRatio && ({ aspectRatio: props.aspectRatio }),

    borderWidth: ({ props }) => props.borderWidth ? getSpacingBasedOnRatio(props, 'borderWidth') : null,

    padding: ({ props }) => props.padding ? getSpacingBasedOnRatio(props, 'padding') : null,
    paddingInline: ({ props }) => {
      if (typeof props.paddingInline !== 'string') return
      const [paddingInlineStart, paddingInlineEnd] = props.paddingInline.split(' ')
      return {
        ...getSpacingByKey(paddingInlineStart, 'paddingInlineStart'),
        ...getSpacingByKey(paddingInlineEnd || paddingInlineStart, 'paddingInlineEnd')
      }
    },
    paddingBlock: ({ props }) => {
      if (typeof props.paddingBlock !== 'string') return
      const [paddingBlockStart, paddingBlockEnd] = props.paddingBlock.split(' ')
      return {
        ...getSpacingByKey(paddingBlockStart, 'paddingBlockStart'),
        ...getSpacingByKey(paddingBlockEnd || paddingBlockStart, 'paddingBlockEnd')
      }
    },
    paddingInlineStart: ({ props }) => props.paddingInlineStart ? getSpacingBasedOnRatio(props, 'paddingInlineStart') : null,
    paddingInlineEnd: ({ props }) => props.paddingInlineEnd ? getSpacingBasedOnRatio(props, 'paddingInlineEnd') : null,
    paddingBlockStart: ({ props }) => props.paddingBlockStart ? getSpacingBasedOnRatio(props, 'paddingBlockStart') : null,
    paddingBlockEnd: ({ props }) => props.paddingBlockEnd ? getSpacingBasedOnRatio(props, 'paddingBlockEnd') : null,

    margin: ({ props }) => props.margin ? getSpacingBasedOnRatio(props, 'margin') : null,
    marginInline: ({ props }) => {
      if (typeof props.marginInline !== 'string') return
      const [marginInlineStart, marginInlineEnd] = props.marginInline.split(' ')
      return {
        ...getSpacingByKey(marginInlineStart, 'marginInlineStart'),
        ...getSpacingByKey(marginInlineEnd || marginInlineStart, 'marginInlineEnd')
      }
    },
    marginBlock: ({ props }) => {
      if (typeof props.marginBlock !== 'string') return
      const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
      return {
        ...getSpacingByKey(marginBlockStart, 'marginBlockStart'),
        ...getSpacingByKey(marginBlockEnd || marginBlockStart, 'marginBlockEnd')
      }
    },
    marginInlineStart: ({ props }) => props.marginInlineStart ? getSpacingBasedOnRatio(props, 'marginInlineStart') : null,
    marginInlineEnd: ({ props }) => props.marginInlineEnd ? getSpacingBasedOnRatio(props, 'marginInlineEnd') : null,
    marginBlockStart: ({ props }) => props.marginBlockStart ? getSpacingBasedOnRatio(props, 'marginBlockStart') : null,
    marginBlockEnd: ({ props }) => props.marginBlockEnd ? getSpacingBasedOnRatio(props, 'marginBlockEnd') : null,

    gap: ({ props }) => props.gap
      ? ({
          gap: transfromGap(props.gap)
        })
      : null,
    gridArea: ({ props }) => props.gridArea && ({ gridArea: props.gridArea }),

    flex: ({ props }) => props.flex && ({ flex: props.flex }),
    flexDirection: ({ props }) => props.flexDirection && ({ flexDirection: props.flexDirection }),
    alignItems: ({ props }) => props.alignItems && ({ alignItems: props.alignItems }),
    alignContent: ({ props }) => props.alignContent && ({ alignContent: props.alignContent }),
    justifyContent: ({ props }) => props.justifyContent && ({ justifyContent: props.justifyContent }),
    justifyItems: ({ props }) => props.justifyItems && ({ justifyItems: props.justifyItems }),
    alignSelf: ({ props }) => props.alignSelf && ({ alignSelf: props.alignSelf }),
    order: ({ props }) => props.order && ({ order: props.order }),

    flexWrap: ({ props }) => props.flexWrap && ({
      display: 'flex',
      flexFlow: props.flexWrap
    }),
    flexFlow: ({ props }) => props.flexFlow && ({
      display: 'flex',
      flexFlow: props.flexFlow
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

    gridColumn: ({ props }) => props.gridColumn && ({ gridColumn: props.gridColumn }),
    gridColumnStart: ({ props }) => props.gridColumnStart
      ? ({
          gridColumnStart: props.gridColumnStart
        })
      : null,
    gridRow: ({ props }) => props.gridRow && ({ gridRow: props.gridRow }),
    gridRowStart: ({ props }) => props.gridRowStart ? ({ gridRowStart: props.gridRowStart }) : null,

    size: ({ props }) => {
      if (typeof props.heightRange !== 'string') return
      const [minHeight, maxHeight] = props.heightRange.split(' ')
      return {
        ...getSpacingByKey(minHeight, 'minHeight'),
        ...getSpacingByKey(maxHeight || minHeight, 'maxHeight')
      }
    },

    columns: ({ props }) => props.columns && ({ columns: props.columns }),
    columnGap: ({ props }) => props.columnGap ? getSpacingBasedOnRatio(props, 'columnGap') : null,
    columnSpan: ({ props }) => props.columnSpan && ({ columns: props.columnSpan }),
    columnFill: ({ props }) => props.columnFill && ({ columns: props.columnFill }),
    columnCount: ({ props }) => props.columnCount && ({ columns: props.columnCount })
  }
}

export const Hr = {
  tag: 'hr',
  props: { margin: 'C1 0' }
}
export const Br = { tag: 'br' }
export const Span = { tag: 'span' }
export const List = {
  tag: 'ul',
  childExtend: { tag: 'li' }
}
// export const Article = { tag: 'article' }

export const Gutter = {
  props: {
    size: 'C1'
  },
  class: {
    size: ({ props }) => {
      if (typeof props.size !== 'string') return
      const [height, width] = props.size.split(' ')
      return {
        ...getSpacingByKey(height, 'height'),
        ...getSpacingByKey(width || height, 'width')
      }
    }
  }
}
