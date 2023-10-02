'use strict'

import { Button } from '@symbo.ls/button'

export const AvatarChooser = {
  extend: Button,
  tag: 'label',

  props: {
    round: 'C',
    gap: 'Y',
    padding: 'W2 A W2 W2',
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
      pointerEvents: 'all',
      appearance: 'none',
      border: 'none',
      width: '100%',
      height: '100%',
      background: 'none',
      color: 'currentColor',
      fontSize: 'A',
      lineHeight: 1,
      margin: '0 0 0 -B1+X',
      padding: '0 A 0 B1+X',
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
  }
}
