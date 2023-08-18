'use strict'

import { Img, Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'

export const Avatar = {
  extend: Img,
  props: {
    display: 'block',
    avatarType: 'initials',
    borderRadius: '100%',
    boxSize: 'B',
    cursor: 'pointer'
  },
  attr: {
    src: ({ key, props }) => props.src || `https://avatars.dicebear.com/api/${props.avatarType || 'adventurer-neutral'}/${props.key || key}.svg`
  }
}

export const AvatarWithIndicator = {
  avatar: { extend: Avatar },
  indicator: {},

  props: {
    boxSize: 'fit-content fit-content',
    round: '100%',
    position: 'relative',

    avatar: { boxSize: `${32 / 16}em` },
    indicator: {
      boxSize: 'Y+V1',
      background: '#04F214',
      round: '100%',
      position: 'absolute',
      bottom: '0',
      right: '0',
      border: 'solid, black 0',
      borderWidth: '1px'
    }
  }
}

export const AvatarBundle = {
  extend: Flex,
  childExtend: {
    extend: Avatar,
    props: {
      boxSize: 'B1',
      border: '0.1312em, black .85, solid',
      ':not(:last-child)': {
        margin: '0 -Y2 0 0'
      }
    }
  }
}

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

    attr: { name: 'avatar-chooser', id: 'avatar-chooser' },

    childExtend: { tag: 'option' },
    $setPropsCollection: ({ parent }) => parent.props.options,
    on: {
      change: (ev, { parent }) => {
        parent.Avatar.update({ key: ev.target.value })
      }
    }
  }
}
