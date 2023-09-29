'use strict'

import { Button } from '@symbo.ls/button'

export * from './Avatar'
export * from './AvatarIndicator'
export * from './AvatarBundle'

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
    boxSize: 'B1',
    pointerEvents: 'none'
  },

  select: {
    props: {
      id: 'avatar-chooser',
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
      padding: '0 A 0 B1+X'
    },

    attr: { name: 'avatar-chooser' },

    childExtend: { tag: 'option' },
    $setPropsCollection: ({ parent }) => parent.props.options,
    on: {
      change: (ev, { parent }) => {
        parent.Avatar.update({ key: ev.target.value })
      }
    }
  }
}
