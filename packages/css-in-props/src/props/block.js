'use strict'

import { isUndefined, isString } from '@domql/utils'

import {
  getSpacingBasedOnRatio,
  transformSize,
  transformBorderRadius,
  transformSizeRatio,
  transfromGap
} from '@symbo.ls/scratch'

export const BLOCK_PROPS = {
  show: (val, el, s, ctx) => !!(ctx.utils.exec(val, el, s) === false) && ({
    display: 'none !important'
  }),

  hide: (val, el, s, ctx) => !!ctx.utils.exec(val, el, s) && ({
    display: 'none !important'
  }),

  height: (val, { props }) => transformSizeRatio('height', val, props),
  width: (val, { props }) => transformSizeRatio('width', val, props),

  boxSizing: (val) => !isUndefined(val)
    ? ({ boxSizing: val })
    : { boxSizing: 'border-box' },

  boxSize: (val) => {
    if (!isString(val)) return
    const [height, width] = val.split(' ')
    return {
      ...transformSize('height', height),
      ...transformSize('width', width || height)
    }
  },

  inlineSize: (val, { props }) => transformSizeRatio('inlineSize', val, props),
  blockSize: (val, { props }) => transformSizeRatio('blockSize', val, props),

  minWidth: (val, { props }) => transformSizeRatio('minWidth', val, props),
  maxWidth: (val, { props }) => transformSizeRatio('maxWidth', val, props),
  widthRange: (val) => {
    if (!isString(val)) return
    const [minWidth, maxWidth] = val.split(' ')
    return {
      ...transformSize('minWidth', minWidth),
      ...transformSize('maxWidth', maxWidth || minWidth)
    }
  },

  minHeight: (val, { props }) => transformSizeRatio('minHeight', val, props),
  maxHeight: (val, { props }) => transformSizeRatio('maxHeight', val, props),
  heightRange: (val) => {
    if (!isString(val)) return
    const [minHeight, maxHeight] = val.split(' ')
    return {
      ...transformSize('minHeight', minHeight),
      ...transformSize('maxHeight', maxHeight || minHeight)
    }
  },

  size: (val) => {
    if (!isString(val)) return
    const [inlineSize, blockSize] = val.split(' ')
    return {
      ...transformSizeRatio('inlineSize', inlineSize),
      ...transformSizeRatio('blockSize', blockSize || inlineSize)
    }
  },

  minBlockSize: (val, { props }) => transformSizeRatio('minBlockSize', val, props),
  minInlineSize: (val, { props }) => transformSizeRatio('minInlineSize', val, props),

  maxBlockSize: (val, { props }) => transformSizeRatio('maxBlockSize', val, props),
  maxInlineSize: (val, { props }) => transformSizeRatio('maxInlineSize', val, props),

  minSize: (val) => {
    if (!isString(val)) return
    const [minInlineSize, minBlockSize] = val.split(' ')
    return {
      ...transformSize('minInlineSize', minInlineSize),
      ...transformSize('minBlockSize', minBlockSize || minInlineSize)
    }
  },

  maxSize: (val) => {
    if (!isString(val)) return
    const [maxInlineSize, maxBlockSize] = val.split(' ')
    return {
      ...transformSize('maxInlineSize', maxInlineSize),
      ...transformSize('maxBlockSize', maxBlockSize || maxInlineSize)
    }
  },

  borderWidth: (val, { props }) => transformSizeRatio('borderWidth', val, props),

  padding: (val, { props }) => transformSizeRatio('padding', val, props),
  scrollPadding: (val, { props }) => transformSizeRatio('scrollPadding', val, props),
  paddingInline: (val) => {
    if (!isString(val)) return
    const [paddingInlineStart, paddingInlineEnd] = val.split(' ')
    return {
      ...transformSize('paddingInlineStart', paddingInlineStart),
      ...transformSize('paddingInlineEnd', paddingInlineEnd || paddingInlineStart)
    }
  },
  paddingBlock: (val) => {
    if (!isString(val)) return
    const [paddingBlockStart, paddingBlockEnd] = val.split(' ')
    return {
      ...transformSize('paddingBlockStart', paddingBlockStart),
      ...transformSize('paddingBlockEnd', paddingBlockEnd || paddingBlockStart)
    }
  },
  // Traditional directional padding
  paddingTop: (val, { props }) => transformSizeRatio('paddingBlockStart', val, props),
  paddingBottom: (val, { props }) => transformSizeRatio('paddingBlockEnd', val, props),
  paddingLeft: (val, { props }) => transformSizeRatio('paddingInlineStart', val, props),
  paddingRight: (val, { props }) => transformSizeRatio('paddingInlineEnd', val, props),

  // Logical properties (for reference)
  paddingBlockStart: (val, { props }) => transformSizeRatio('paddingBlockStart', val, props), // maps to top
  paddingBlockEnd: (val, { props }) => transformSizeRatio('paddingBlockEnd', val, props), // maps to bottom
  paddingInlineStart: (val, { props }) => transformSizeRatio('paddingInlineStart', val, props), // maps to left
  paddingInlineEnd: (val, { props }) => transformSizeRatio('paddingInlineEnd', val, props), // maps to right

  margin: (val, { props }) => transformSizeRatio('margin', val, props),
  marginInline: (val) => {
    if (!isString(val)) return
    const [marginInlineStart, marginInlineEnd] = val.split(' ')
    return {
      ...transformSize('marginInlineStart', marginInlineStart),
      ...transformSize('marginInlineEnd', marginInlineEnd || marginInlineStart)
    }
  },
  marginBlock: (val, { props }) => {
    if (!isString(props.marginBlock)) return
    const [marginBlockStart, marginBlockEnd] = props.marginBlock.split(' ')
    return {
      ...transformSize('marginBlockStart', marginBlockStart),
      ...transformSize('marginBlockEnd', marginBlockEnd || marginBlockStart)
    }
  },
  marginInlineStart: (val, { props }) => transformSizeRatio('marginInlineStart', val, props),
  marginInlineEnd: (val, { props }) => transformSizeRatio('marginInlineEnd', val, props),
  marginBlockStart: (val, { props }) => transformSizeRatio('marginBlockStart', val, props),
  marginBlockEnd: (val, { props }) => transformSizeRatio('marginBlockEnd', val, props),

  gap: (val) => ({
    gap: transfromGap(val)
  }),

  columnGap: (val, { props }) => getSpacingBasedOnRatio(props, 'columnGap', val),
  rowGap: (val, { props }) => getSpacingBasedOnRatio(props, 'rowGap', val),

  flexWrap: (val, { props }) => ({
    display: 'flex',
    flexFlow: (val || 'row').split(' ')[0] + ' ' + props.flexWrap
  }),
  flexFlow: (val, { props }) => {
    const { reverse } = props
    if (!isString(val)) return
    let [direction, wrap] = (val || 'row').split(' ')
    if (val.startsWith('x') || val === 'row') direction = 'row'
    if (val.startsWith('y') || val === 'column') direction = 'column'
    return {
      display: 'flex',
      flexFlow: (direction || '') + (!direction.includes('-reverse') && reverse ? '-reverse' : '') + ' ' + (wrap || '')
    }
  },
  flexAlign: (val) => {
    if (!isString(val)) return
    const [alignItems, justifyContent] = val.split(' ')
    return {
      display: 'flex',
      alignItems,
      justifyContent
    }
  },

  round: (val, { props }) => transformBorderRadius(val || props.borderRadius, props, 'round'),
  borderRadius: (val, { props }) => transformBorderRadius(val || props.round, props, 'borderRadius')
}
