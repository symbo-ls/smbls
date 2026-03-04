'use strict'

import { depth } from './Shape'
import { isUndefined } from '@domql/utils'

export const getSystemGlobalTheme = ({ context, state }) => {
  const rootState = state && state.root
  const theme = (rootState && rootState.globalTheme) || (context.designSystem && context.designSystem.globalTheme)
  return theme === 'auto' ? null : theme
}

export const Theme = {
  deps: {
    depth
  },

  classlist: {
    depth: ({ props, deps }) => !isUndefined(props.depth) && deps.depth[props.depth]
  }
}
