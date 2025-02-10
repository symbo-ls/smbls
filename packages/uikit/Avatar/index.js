'use strict'

export const Avatar = {
  extends: 'Img',
  props: {
    display: 'block',
    avatarType: 'adventurer-neutral',
    borderRadius: '100%',
    boxSize: 'C+X C+X',
    src: el => `https://api.dicebear.com/7.x/${el.props.avatarType || 'initials'}/svg?seed=${el.props.key || el.key || 'no-avatar'}`
  }
}
