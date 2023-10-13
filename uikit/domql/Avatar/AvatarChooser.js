'use strict'

import { Button } from '@symbo.ls/button'

export const AvatarChooser = {
  extend: Button,
  tag: 'label',

  props: {
    round: 'C',
    width: 'fit-content',
    padding: 'W2 Y2 W2 X',
    theme: 'tertiary',
    position: 'relative',
    cursor: 'pointer'
  },

  Avatar: {
    props: ({ state }) => ({
      key: state.key,
      boxSize: 'B1+W2',
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
      padding: '- Y - Y',
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
      fontSize: 'B2'
    }
  }
}
