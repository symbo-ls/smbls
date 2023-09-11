'use strict'

import { Img, Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { IndicatorDot } from '@symbo.ls/accessories'
import { InfoSet } from '@symbo.ls/infoset'
import { CardLabel } from '@symbo.ls/label'

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

export const DropDownWithAvatar = {
  extend: Flex,
  avatar: { extend: Avatar },
  list: {
    childExtend: { tag: 'H6' },
    ...[{ props: { text: 'eth' } }]
  },
  downArrow: {
    extend: Button,
    props: { icon: 'chevronDown' }
  },

  props: {
    boxSize: 'fit-content fit-content',
    align: 'center flex-start',
    padding: 'Y Z',
    gap: 'Z',
    round: 'Z',
    background: 'rgba(28, 28, 31, 1)',
    avatar: { boxSize: 'A+Y' },
    list: {
      childProps: {
        fontSize: 'Z',
        textTransform: 'uppercase'
      }
    },
    downArrow: {
      padding: '0',
      background: 'transparent',
      color: 'white',
      fontSize: 'Y'
    }
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
  },
  ...[{}, {}]
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

export const AvatarWithInfoSet = {
  extend: Flex,
  avatar: { extend: AvatarWithIndicator },
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
  avatar: { extend: Avatar },
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
    avatar: { boxSize: 'B' },
    infos: {
      gap: 'X',
      childProps: {
        flow: 'row'
      }
    }
  }
}

export const AvatarInfoSetWithButton = {
  extend: AvatarWithInfoSet,
  avatar: { extend: Avatar },
  infos: {
    ...[
      {
        title: { props: { text: 'Wallet ID' } },
        subTitle: { caption: { props: { text: '0xfb59...d862' } } }
      },
      {
        extend: Button,
        props: { icon: 'copyOutline' }
      }
    ]
  },

  props: {
    padding: 'Y A Y Y',
    border: '1px solid #57575C',
    round: 'Z',
    gap: 'Z',
    avatar: {
      boxSize: 'A+B',
      round: 'Y'
    },
    infos: {
      flow: 'row',
      align: 'center flex-start',
      gap: 'A+X',
      childProps: {
        title: { fontSize: 'Y' },
        ':nth-child(2)': {
          padding: '0',
          color: 'white',
          fontSize: 'C',
          background: 'transparent'
        }
      }
    }
  }
}

export const AvatarBundleInfoSet = {
  extend: AvatarWithInfoSet,
  avatar: { extend: AvatarBundle },
  infos: {
    ...[
      {
        title: { props: { text: 'ETH/BNB' } },
        label: {
          extend: CardLabel,
          props: { text: '1 ETH = 240.7 BNB' }
        },
        subTitle: null
      }
    ]
  },

  props: {
    gap: 'Z',
    background: '#1C1C1F',
    padding: 'A A',
    round: 'Z',
    avatar: {
      childProps: {
        boxSize: 'A+A',
        ':not(:first-child)': {
          border: 'solid, black 0',
          borderWidth: '1px'
        }
        // style: {
        //   '&:not(:first-child)': { border: '1px solid rgba(0, 0, 0, 0)' }
        // }
      }
    },
    infos: {
      childProps: {
        flow: 'row',
        gap: 'Z',
        align: 'center flex-start',
        title: { fontWeight: '700' },
        label: {
          background: 'black',
          padding: 'Y Z'
        }
      }
    }
  }
}
