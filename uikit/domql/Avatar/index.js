'use strict'

import { Img, Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { IndicatorDot } from '@symbo.ls/accessories'
import { InfoSet } from '@symbo.ls/infoset'
import { CardLabel } from '@symbo.ls/card'

export const Avatar = {
  extend: Img,
  props: {
    display: 'block',
    avatarType: 'initials',
    borderRadius: '100%',
    boxSize: 'A+A',
    cursor: 'pointer'
  },
  attr: {
    src: ({ key, props }) => props.src || `https://avatars.dicebear.com/api/${props.avatarType || 'adventurer-neutral'}/${props.key || key}.svg`
  }
}

export const AvatarWithIndicator = {
  avatar: { extend: Avatar },
  indicator: { extend: IndicatorDot },

  props: {
    boxSize: 'fit-content fit-content',
    round: '100%',
    position: 'relative',
    indicator: {
      position: 'absolute',
      bottom: '0',
      right: '0'
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

export const AvatarWithInfoSet = {
  extend: Flex,
  image: { extend: AvatarWithIndicator },
  infos: {
    extend: InfoSet,
    ...[
      {
        title: { props: { text: 'Erin Schleifer' } },
        subTitle: { caption: { props: { text: 'email@symbols.com' } } }
      }
    ]
  },

  props: {
    boxSize: 'fit-content',
    align: 'center flex-start',
    gap: 'A',
    infos: {
      childProps: {
        flow: 'column',
        subTitle: { caption: { whiteSpace: 'nowrap' } }
      }
    }
  }
}

export const AvatarInfoSetWithLabel = {
  extend: AvatarWithInfoSet,
  image: { extend: Avatar },
  infos: {
    ...[
      {
        title: { props: { text: 'ETHDOWN' } },
        label: { extend: CardLabel },
        subTitle: null,
        props: { gap: 'Z' }
      },
      {
        subTitle: { props: { text: 'Short ADA with up to 4x Leverage' } }
      }
    ]
  },

  props: {
    image: { boxSize: 'B' },
    infos: {
      gap: 'X',
      childProps: {
        flow: 'row'
      }
    }
  }
}
