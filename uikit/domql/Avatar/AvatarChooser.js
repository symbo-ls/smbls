'use strict'

import { Button } from '@symbo.ls/button'

export const AvatarChooser = {
  extend: Button,
  tag: 'label',

  props: {
    round: 'C',
    width: 'fit-content',
    padding: 'W2 - W2 X',
    theme: 'tertiary',
    position: 'relative',
    cursor: 'pointer'
  },

  Avatar: {
    props: ({ state }) => ({
      key: state.key,
      boxSize: 'B1',
      pointerEvents: 'none'
    })
  },

  Select: {
    props: {
      outline: 'none',
      pointerEvents: 'All',
      appearance: 'none',
      height: '100%',
      background: 'none',
      color: 'currentColor',
      fontSize: 'A',
      lineHeight: 1,
      padding: '- B2 - Y1',
      zIndex: '2',
      flex: '1',
      ':focus-visible': {
        outline: 'none'
      }
    },

    childExtend: { tag: 'option' },
    $setPropsCollection: ({ parent, state }) => {
      if (!parent.props.options) return []
      return parent.props.options.map(v => {
        if (v.text === state.key) return { ...v, selected: true }
        return v
      })
    },

    on: {
      change: (ev, { state }) => {
        state.update({ key: ev.target.value })
        console.log(state.key)
      }
    }
  },

  Icon: {
    props: {
      icon: 'chevronDown',
      fontSize: 'B2',
      margin: 'V1 - - -',
      position: 'absolute',
      right: 'Y1',
      pointerEvents: 'none'
    }
  }
}
