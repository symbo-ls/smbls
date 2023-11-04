'use strict'

import { Img } from '@symbo.ls/atoms'

export const Avatar = {
  extend: Img,
  props: ({ key, props }) => ({
    display: 'block',
    avatarType: 'adventurer-neutral',
    borderRadius: '100%',
    boxSize: 'C+X C+X',
    src: `https://api.dicebear.com/7.x/${props.avatarType || 'initials'}/svg?seed=${props.key || key || 'no-avatar'}`
  })
}
