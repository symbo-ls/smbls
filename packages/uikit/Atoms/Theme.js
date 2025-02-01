'use strict'

import { depth } from './Shape/style'
import { isUndefined } from '@domql/utils'

export const getSystemGlobalTheme = ({ context, state }) => {
  const rootState = state && state.root
  return rootState && rootState.globalTheme ? rootState.globalTheme : context.designSystem && context.designSystem.globalTheme
}

export const Theme = {
  deps: {
    depth
  },

  class: {
    depth: ({ props, deps }) => !isUndefined(props.depth) && deps.depth[props.depth]
  }
}
