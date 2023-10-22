'use strict'

import { isObjectLike } from '@domql/utils'
import { getActiveConfig } from '../factory.js'
import { getSubratio } from './sequence.js'

export const setVariables = (result, key) => {
  const CONFIG = getActiveConfig()
  const { CSS_VARS } = CONFIG
  if (isObjectLike(result.value)) {
    // for (const key in result.value) {
    // }
  } else {
    CSS_VARS[result.var] = result.value
  }
}

export const applyGlobalVars = (vars, obj, options) => {
  const CONFIG = getActiveConfig()
  const { UNIT } = CONFIG
  const unit = obj.unit || UNIT.default
  const { base, ratio, type } = obj
  const prefix = '--' + (type && type.replace('.', '-'))
  vars[`${prefix}-base`] = base
  vars[`${prefix}-unit`] = unit
  const ratioVar = `${prefix}-ratio`
  vars[ratioVar] = ratio

  const [first, middle, second] = getSubratio(base, ratio)
  vars[`${prefix}-sub-ratio-1`] = first
  vars[`${prefix}-sub-ratio-2`] = middle
  vars[`${prefix}-sub-ratio-3`] = second
}

export const applySequenceVars = (FACTORY, options = {}) => {
  const CONFIG = getActiveConfig()
  const { UNIT, TIMING, CSS_VARS } = CONFIG

  const unit = FACTORY.unit || UNIT.default
  const { mediaRegenerate, sequence, scales } = FACTORY

  if (!mediaRegenerate) {
    applyGlobalVars(CSS_VARS, FACTORY, options)
  }

  for (const key in sequence) {
    const item = sequence[key]

    const value = (FACTORY.type === TIMING.type
      ? sequence[key].val
      : scales[key]
    ) + unit

    if (!mediaRegenerate) {
      CSS_VARS[item.variable + '_default'] = value
      CSS_VARS[item.variable] = item.scalingVariable
      continue
    }

    if (options.useDefault === false) {
      CSS_VARS[item.variable] = value
    } else {
      CSS_VARS[item.variable + '_default'] = value
      CSS_VARS[item.variable] = `var(${item.variable + '_default'})`
    }
  }
}

export const applyMediaSequenceVars = (FACTORY, media, options = {}) => {
  const CONFIG = getActiveConfig()
  const { UNIT, MEDIA, TIMING, CSS_VARS } = CONFIG

  const mediaName = media.slice(1)

  const unit = FACTORY.unit || UNIT.default
  const { mediaRegenerate } = FACTORY
  const { sequence, scales } = FACTORY[media]

  const query = MEDIA[mediaName]
  if (!query && CONFIG.verbose) console.warn('Can\'t find media query ', query)

  // if mediaRegenerate is not applied ratio and and sequence sizes
  // will be applied using CSS vars
  if (!mediaRegenerate) {
    let underMediaQuery = CSS_VARS[`@media ${query}`]
    if (!underMediaQuery) underMediaQuery = CSS_VARS[`@media ${query}`] = {}
    applyGlobalVars(underMediaQuery, FACTORY[media], options)
    return
  }

  for (const key in sequence) {
    const item = sequence[key]

    const value = (FACTORY.type === TIMING.type
      ? sequence[key].val
      : scales[key]
    ) + unit

    if (!query && CONFIG.verbose) console.warn('Can\'t find query ', query)

    let underMediaQuery = CSS_VARS[`@media ${query}`]
    if (!underMediaQuery) underMediaQuery = CSS_VARS[`@media ${query}`] = {}

    underMediaQuery[item.variable] = `var(${item.variable + '_' + mediaName})`
    CSS_VARS[item.variable + '_' + mediaName] = value
  }

  console.log(CSS_VARS)
}
