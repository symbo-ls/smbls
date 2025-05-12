'use strict'

export const Avatar = {
  extend: 'Img',
  props: {
    display: 'block',
    avatarType: 'adventurer-neutral',
    borderRadius: '100%',
    boxSize: 'C+X C+X',
    src: el =>
      `https://avatars.symbo.ls/${el.props.avatarType || 'initials'}/svg?seed=${
        el.props.key || el.key || 'no-avatar'
      }`
  }
}
