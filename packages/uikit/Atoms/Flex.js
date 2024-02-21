'use strict'

import { isString } from '@domql/utils'

export const Flex = {
  props: {
    display: 'flex'
  },

  class: {
    flow: ({ props }) => {
      const { flow, reverse } = props
      if (!isString(flow)) return
      let [direction, wrap] = (flow || 'row').split(' ')
      if (flow.startsWith('x') || flow.startsWith('row')) direction = 'row'
      if (flow.startsWith('y') || flow.startsWith('column')) direction = 'column'
      return {
        flexFlow: (direction || '') + (reverse ? '-reverse' : '') + ' ' + (wrap || '')
      }
    },

    wrap: ({ props }) => props.wrap && ({ flexWrap: props.wrap }),
    align: ({ props }) => {
      if (!isString(props.align)) return
      const [alignItems, justifyContent] = props.align.split(' ')
      return { alignItems, justifyContent }
    }
  }
}
