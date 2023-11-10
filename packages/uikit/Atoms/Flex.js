'use strict'

export const Flex = {
  props: {
    display: 'flex'
  },

  class: {
    flow: ({ props }) => props.flow && ({ flexFlow: props.flow + (props.reverse ? '-reverse' : '') }),
    wrap: ({ props }) => props.wrap && ({ flexWrap: props.wrap }),
    align: ({ props }) => {
      if (typeof props.align !== 'string') return
      const [alignItems, justifyContent] = props.align.split(' ')
      return { alignItems, justifyContent }
    }
  }
}
