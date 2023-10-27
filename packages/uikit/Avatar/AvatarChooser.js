'use strict'

import { Button } from '@symbo.ls/button'

export const AvatarChooser = {
  extend: Button,
  tag: 'label',

  state: { key: 'am' },

  props: {
    round: 'A2',
    width: 'fit-content',
    padding: 'X2 Y2+V X2 X2',
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
      fontSize: 'Z2',
      lineHeight: 1,
      padding: '- B - Y1',
      zIndex: '2',
      flex: '1',
      fontWeight: '500',
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
        console.log(state.key)
        state.update({ key: ev.target.value })
      }
    }
  },

  Icon: {
    props: {
      icon: 'chevronDown',
      fontSize: 'C',
      margin: 'V - - -',
      position: 'absolute',
      right: 'Y1',
      pointerEvents: 'none'
    }
  }
}
