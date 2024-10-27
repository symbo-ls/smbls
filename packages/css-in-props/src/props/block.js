'use strict'

import { isUndefined, isString } from '@domql/utils'

import {
  getSpacingBasedOnRatio,
  transformSize,
  transformSizeRatio,
  transfromGap
} from '@symbo.ls/scratch'

export const BLOCK_PROPS = {
  show: (el, s, ctx) => !!(ctx.utils.exec(el.props.show, el, s) === false) && ({
    display: 'none !important'
  }),

  hide: (el, s, ctx) => !!ctx.utils.exec(el.props.hide, el, s) && ({
    display: 'none !important'
  }),

  height: ({ props }) => transformSizeRatio('height', props),
  width: ({ props }) => transformSizeRatio('width', props),

  boxSizing: ({ props }) => !isUndefined(props.boxSizing)
    ? ({ boxSizing: props.boxSizing })
    : { boxSizing: 'border-box' },

  boxSize: ({ props }) => {
    if (!isString(props.boxSize)) return
    const [height, width] = props.boxSize.split(' ')
    return {
      ...transformSize('height', height),
      ...transformSize('width', width || height)
    }
  },

  inlineSize: ({ props }) => transformSizeRatio('inlineSize', props),
  blockSize: ({ props }) => transformSizeRatio('blockSize', props),

  minWidth: ({ props }) => transformSizeRatio('minWidth', props),
  maxWidth: ({ props }) => transformSizeRatio('maxWidth', props),
  widthRange: ({ props }) => {
    if (!isString(props.widthRange)) return
    const [minWidth, maxWidth] = props.widthRange.split(' ')
    return {
      ...transformSize('minWidth', minWidth),
      ...transformSize('maxWidth', maxWidth || minWidth)
    }
  },

  minHeight: ({ props }) => transformSizeRatio('minHeight', props),
  maxHeight: ({ props }) => transformSizeRatio('maxHeight', props),
  heightRange: ({ props }) => {
    if (!isString(props.heightRange)) return
    const [minHeight, maxHeight] = props.heightRange.split(' ')
    return {
      ...transformSize('minHeight', minHeight),
      ...transformSize('maxHeight', maxHeight || minHeight)
    }
  },

  size: ({ props }) => {
    if (!isString(props.size)) return
    const [inlineSize, blockSize] = props.size.split(' ')
    return {
      ...transformSizeRatio('inlineSize', inlineSize),
      ...transformSizeRatio('blockSize', blockSize || inlineSize)
    }
  },

  minBlockSize: ({ props }) => transformSizeRatio('minBlockSize', props),
  minInlineSize: ({ props }) => transformSizeRatio('minInlineSize', props),

  maxBlockSize: ({ props }) => transformSizeRatio('maxBlockSize', props),
  maxInlineSize: ({ props }) => transformSizeRatio('maxInlineSize', props),

  minSize: ({ props }) => {
    if (!isString(props.minSize)) return
    const [minInlineSize, minBlockSize] = props.minSize.split(' ')
    return {
      ...transformSize('minInlineSize', minInlineSize),
      ...transformSize('minBlockSize', minBlockSize || minInlineSize)
    }
  },

  maxSize: ({ props }) => {
    if (!isString(props.maxSize)) return
    const [maxInlineSize, maxBlockSize] = props.maxSize.split(' ')
    return {
      ...transformSize('maxInlineSize', maxInlineSize),
      ...transformSize('maxBlockSize', maxBlockSize || maxInlineSize)
    }
  },

  borderWidth: ({ props }) => transformSizeRatio('borderWidth', props),

  padding: ({ props }) => transformSizeRatio('padding', props),
  scrollPadding: ({ props }) => transformSizeRatio('scrollPadding', props),
  paddingInline: ({ props }) => {
    if (!isString(props.paddingInline)) return
    const [paddingInlineStart, paddingInlineEnd] = props.paddingInline.split(' ')
    return {
      ...transformSize('paddingInlineStart', paddingInlineStart),
      ...transformSize('paddingInlineEnd', paddingInlineEnd || paddingInlineStart)
    }
  },
  paddingBlock: ({ props }) => {
    if (!isString(props.paddingBlock)) return
    const [paddingBlockStart, paddingBlockEnd] = props.paddingBlock.split(' ')
    return {
      ...transformSize('paddingBlockStart', paddingBlockStart),
      ...transformSize('paddingBlockEnd', paddingBlockEnd || paddingBlockStart)
    }
  },
  paddingInlineStart: ({ props }) => transformSizeRatio('paddingInlineStart', props),
  paddingInlineEnd: ({ props }) => transformSizeRatio('paddingInlineEnd', props),
  paddingBlockStart: ({ props }) => transformSizeRatio('paddingBlockStart', props),
  paddingBlockEnd: ({ props }) => transformSizeRatio('paddingBlockEnd', props),

  margin: ({ props }) => transformSizeRatio('margin', props),
  marginInline: ({ props }) => {
    if (!isString(props.marginInline)) return
    const [marginInlineStart, marginInlineEnd] = props.marginInline.split(' ')
    return {
      ...transformSize('marginInlineStart', marginInlineStart),
      ...transformSize('marginInlineEnd', marginInlineEnd || marginInlineStart)
    }
  },
  marginBlock: ({ props }) => {
    if (!isString(props.marginBlock)) return
    const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
    return {
      ...transformSize('marginBlockStart', marginBlockStart),
      ...transformSize('marginBlockEnd', marginBlockEnd || marginBlockStart)
    }
  },
  marginInlineStart: ({ props }) => transformSizeRatio('marginInlineStart', props),
  marginInlineEnd: ({ props }) => transformSizeRatio('marginInlineEnd', props),
  marginBlockStart: ({ props }) => transformSizeRatio('marginBlockStart', props),
  marginBlockEnd: ({ props }) => transformSizeRatio('marginBlockEnd', props),

  gap: ({ props }) => ({
    gap: transfromGap(props.gap)
  }),

  columnGap: ({ props }) => getSpacingBasedOnRatio(props, 'columnGap'),
  rowGap: ({ props }) => getSpacingBasedOnRatio(props, 'rowGap'),

  flexWrap: ({ props }) => ({
    display: 'flex',
    flexFlow: (props.flexFlow || 'row').split(' ')[0] + ' ' + props.flexWrap
  }),
  flexFlow: ({ props }) => {
    const { flexFlow, reverse } = props
    if (!isString(flexFlow)) return
    let [direction, wrap] = (flexFlow || 'row').split(' ')
    if (flexFlow.startsWith('x') || flexFlow === 'row') direction = 'row'
    if (flexFlow.startsWith('y') || flexFlow === 'column') direction = 'column'
    return {
      display: 'flex',
      flexFlow: (direction || '') + (!direction.includes('-reverse') && reverse ? '-reverse' : '') + ' ' + (wrap || '')
    }
  },
  flexAlign: ({ props }) => {
    if (!isString(props.flexAlign)) return
    const [alignItems, justifyContent] = props.flexAlign.split(' ')
    return {
      display: 'flex',
      alignItems,
      justifyContent
    }
  }

}
