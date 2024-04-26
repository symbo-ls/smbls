'use strict'

export const Pills = {
  extend: 'Flex',

  props: {
    gap: 'Y2'
  },

  childExtend: {
    extend: {
      props: ({ key, state, parent }) => ({
        boxSize: 'Y2',
        round: 'A',
        background: 'currentColor',
        active: parseInt(key) === parseInt(state.active || parent.props.active),
        '!active': { opacity: 0.35 }
      })
    },
    on: {
      click: (e, el) => {
        el.state.update({ active: parseInt(el.key) })
      }
    }
  },

  $propsCollection: ({ props, state }) => new Array(props.qty).fill({})
}
