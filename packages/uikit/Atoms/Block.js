'use strict'

import { getSpacingBasedOnRatio, getSpacingByKey, transfromGap } from '@symbo.ls/scratch'

export const Block = {
  deps: { getSpacingBasedOnRatio, getSpacingByKey, transfromGap },

  class: {
    boxSizing: ({ props }) => props.boxSizing
      ? ({ boxSizing: props.boxSizing })
      : {
          boxSizing: 'border-box'
        },

    display: ({ props }) => props.display && ({ display: props.display }),

    hide: ({ props }) => props.hide && ({ display: 'none !important' }),

    width: ({ props, deps }) => props.width && deps.getSpacingBasedOnRatio(props, 'width'),
    height: ({ props, deps }) => props.height && deps.getSpacingBasedOnRatio(props, 'height'),
    boxSize: ({ props, deps }) => {
      if (typeof props.boxSize !== 'string') return
      const [height, width] = props.boxSize.split(' ')
      return {
        ...deps.getSpacingByKey(height, 'height'),
        ...deps.getSpacingByKey(width || height, 'width')
      }
    },

    maxWidth: ({ props, deps }) => props.maxWidth && deps.getSpacingBasedOnRatio(props, 'maxWidth'),
    minWidth: ({ props, deps }) => props.minWidth && deps.getSpacingBasedOnRatio(props, 'minWidth'),
    widthRange: ({ props, deps }) => {
      if (typeof props.widthRange !== 'string') return
      const [minWidth, maxWidth] = props.widthRange.split(' ')
      return {
        ...deps.getSpacingByKey(minWidth, 'minWidth'),
        ...deps.getSpacingByKey(maxWidth || minWidth, 'maxWidth')
      }
    },

    maxHeight: ({ props, deps }) => props.maxHeight && deps.getSpacingBasedOnRatio(props, 'maxHeight'),
    minHeight: ({ props, deps }) => props.minHeight && deps.getSpacingBasedOnRatio(props, 'minHeight'),
    heightRange: ({ props, deps }) => {
      if (typeof props.heightRange !== 'string') return
      const [minHeight, maxHeight] = props.heightRange.split(' ')
      return {
        ...deps.getSpacingByKey(minHeight, 'minHeight'),
        ...deps.getSpacingByKey(maxHeight || minHeight, 'maxHeight')
      }
    },

    direction: ({ props }) => props.direction && ({ direction: props.direction }),

    aspectRatio: ({ props }) => props.aspectRatio && ({ aspectRatio: props.aspectRatio }),

    borderWidth: ({ props, deps }) => props.borderWidth ? deps.getSpacingBasedOnRatio(props, 'borderWidth') : null,

    padding: ({ props, deps }) => props.padding ? deps.getSpacingBasedOnRatio(props, 'padding') : null,
    paddingInline: ({ props, deps }) => {
      if (typeof props.paddingInline !== 'string') return
      const [paddingInlineStart, paddingInlineEnd] = props.paddingInline.split(' ')
      return {
        ...deps.getSpacingByKey(paddingInlineStart, 'paddingInlineStart'),
        ...deps.getSpacingByKey(paddingInlineEnd || paddingInlineStart, 'paddingInlineEnd')
      }
    },
    paddingBlock: ({ props, deps }) => {
      if (typeof props.paddingBlock !== 'string') return
      const [paddingBlockStart, paddingBlockEnd] = props.paddingBlock.split(' ')
      return {
        ...deps.getSpacingByKey(paddingBlockStart, 'paddingBlockStart'),
        ...deps.getSpacingByKey(paddingBlockEnd || paddingBlockStart, 'paddingBlockEnd')
      }
    },
    paddingInlineStart: ({ props, deps }) => props.paddingInlineStart ? deps.getSpacingBasedOnRatio(props, 'paddingInlineStart') : null,
    paddingInlineEnd: ({ props, deps }) => props.paddingInlineEnd ? deps.getSpacingBasedOnRatio(props, 'paddingInlineEnd') : null,
    paddingBlockStart: ({ props, deps }) => props.paddingBlockStart ? deps.getSpacingBasedOnRatio(props, 'paddingBlockStart') : null,
    paddingBlockEnd: ({ props, deps }) => props.paddingBlockEnd ? deps.getSpacingBasedOnRatio(props, 'paddingBlockEnd') : null,

    margin: ({ props, deps }) => props.margin ? deps.getSpacingBasedOnRatio(props, 'margin') : null,
    marginInline: ({ props, deps }) => {
      if (typeof props.marginInline !== 'string') return
      const [marginInlineStart, marginInlineEnd] = props.marginInline.split(' ')
      return {
        ...deps.getSpacingByKey(marginInlineStart, 'marginInlineStart'),
        ...deps.getSpacingByKey(marginInlineEnd || marginInlineStart, 'marginInlineEnd')
      }
    },
    marginBlock: ({ props, deps }) => {
      if (typeof props.marginBlock !== 'string') return
      const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
      return {
        ...deps.getSpacingByKey(marginBlockStart, 'marginBlockStart'),
        ...deps.getSpacingByKey(marginBlockEnd || marginBlockStart, 'marginBlockEnd')
      }
    },
    marginInlineStart: ({ props, deps }) => props.marginInlineStart ? deps.getSpacingBasedOnRatio(props, 'marginInlineStart') : null,
    marginInlineEnd: ({ props, deps }) => props.marginInlineEnd ? deps.getSpacingBasedOnRatio(props, 'marginInlineEnd') : null,
    marginBlockStart: ({ props, deps }) => props.marginBlockStart ? deps.getSpacingBasedOnRatio(props, 'marginBlockStart') : null,
    marginBlockEnd: ({ props, deps }) => props.marginBlockEnd ? deps.getSpacingBasedOnRatio(props, 'marginBlockEnd') : null,

    gap: ({ props }) => props.gap
      ? ({
          gap: transfromGap(props.gap)
        })
      : null,
    gridArea: ({ props, deps }) => props.gridArea && ({ gridArea: props.gridArea }),

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

    gridColumn: ({ props }) => props.gridColumn && ({ gridColumn: props.gridColumn }),
    gridColumnStart: ({ props }) => props.gridColumnStart
      ? ({
          gridColumnStart: props.gridColumnStart
        })
      : null,
    gridRow: ({ props }) => props.gridRow && ({ gridRow: props.gridRow }),
    gridRowStart: ({ props }) => props.gridRowStart ? ({ gridRowStart: props.gridRowStart }) : null,

    size: ({ props, deps }) => {
      if (typeof props.heightRange !== 'string') return
      const [minHeight, maxHeight] = props.heightRange.split(' ')
      return {
        ...deps.getSpacingByKey(minHeight, 'minHeight'),
        ...deps.getSpacingByKey(maxHeight || minHeight, 'maxHeight')
      }
    },

    columns: ({ props }) => props.columns && ({ columns: props.columns }),
    columnRule: ({ props }) => props.columnRule && ({ columnRule: props.columnRule }),
    columnWidth: ({ props }) => props.columnWidth && ({ columnWidth: props.columnWidth }),
    columnGap: ({ props, deps }) => props.columnGap ? deps.getSpacingBasedOnRatio(props, 'columnGap') : null,
    columnSpan: ({ props }) => props.columnSpan && ({ columnSpan: props.columnSpan }),
    columnFill: ({ props }) => props.columnFill && ({ columnFill: props.columnFill }),
    columnCount: ({ props }) => props.columnCount && ({ columnCount: props.columnCount })
  }
}

export const Hr = {
  tag: 'hr',
  props: { margin: 'C1 0' }
}
export const Br = { tag: 'br' }
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
        ...deps.getSpacingByKey(height, 'height'),
        ...deps.getSpacingByKey(width || height, 'width')
      }
    }
  }
}
