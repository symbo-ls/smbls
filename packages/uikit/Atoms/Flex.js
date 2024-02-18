'use strict'

import { isUndefined } from '@domql/utils'

export const Flex = {
  props: {
    display: 'flex'
  },

  class: {
    flow: ({ props }) => {
      const { flow } = props
      if (isUndefined(flow)) return
      let [direction, wrap] = flow.split(' ')
      if (flow.startsWith('x') || flow.startsWith('row')) direction = 'row'
      if (flow.startsWith('y') || flow.startsWith('column')) direction = 'column'
      return {
        flexFlow: (direction || '') + (props.reverse ? '-reverse' : '') + ' ' + (wrap || '')
      }
    },

    wrap: ({ props }) => props.wrap && ({ flexWrap: props.wrap }),
    align: ({ props }) => {
      if (typeof props.align !== 'string') return
      const [alignItems, justifyContent] = props.align.split(' ')
      return { alignItems, justifyContent }
    }
  }
}
