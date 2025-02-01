'use strict'

import { ANIMATION_PROPS } from './animation'
import { BLOCK_PROPS } from './block'
import { FONT_PROPS } from './font'
import { MISC_PROPS } from './misc'
import { POSITION_PROPS } from './position'
import { THEME_PROPS } from './theme'
import { TIMING_PROPS } from './timing'

export * from './animation'
export * from './block'
export * from './font'
export * from './misc'
export * from './position'
export * from './theme'
export * from './timing'

export const CSS_PROPS_REGISTRY = {
  ...ANIMATION_PROPS,
  ...BLOCK_PROPS,
  ...FONT_PROPS,
  ...MISC_PROPS,
  ...MISC_PROPS,
  ...POSITION_PROPS,
  ...THEME_PROPS,
  ...TIMING_PROPS
}

export default CSS_PROPS_REGISTRY
