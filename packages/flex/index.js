'use strict'

import { mapBasedOnRatio } from '@symbo.ls/block'

import style from './style'

export const Flex = {
  style,

  props: {
    flow: 'row'
  },

  class: {
    flow: ({ props }) => ({ flexFlow: props.flow }),
    flexDirection: ({ props }) => ({ flexDirection: props.flexDirection }),
    alignItems: ({ props }) => ({ alignItems: props.alignItems }),
    justifyContent: ({ props }) => ({ justifyContent: props.justifyContent }),
    gap: ({ props }) => mapBasedOnRatio(props, 'gap')
  }
}
