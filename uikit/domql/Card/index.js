'use strict'

import { Flex } from '@symbo.ls/atoms'
import { Button } from '@symbo.ls/button'
import { InfoSet } from '@symbo.ls/infoset'
import { Icon } from '@symbo.ls/icon'
import { Avatar } from '@symbo.ls/avatar'
import { BalancesIndicator } from '@symbo.ls/accessories'

export const CardLabel = {
  props: {
    text: '-2.902x',
    fontSize: 'Y',
    background: '#F4454E',
    boxSize: 'fit-content fit-content',
    padding: 'W Y',
    round: 'Y'
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
    props: { icon: 'arrowDown' }
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

export const AmountWithLabel = {
  extend: Flex,
  amount: { props: { text: '240.59' } },
  label: {
    extend: CardLabel,
    props: { text: '-0.25%' }
  },
  props: {
    align: 'center flex-start',
    gap: 'Y+V',
    amount: {
      fontSize: `${20 / 16}em`,
      fontWeight: '700'
    }
  }
}
export const Card = {
  extend: InfoSet,

  heading: {
    title: { props: { text: 'Total crypto assets' } },
    icon: { extend: Icon, props: { name: 'arrowUpRight' } }
  },
  content: {
    extend: AmountWithLabel,
    amount: { props: { text: '$ 12,759' } },
    label: { props: { text: '+ 8.8%' } }
  },
  footer: {
    subTitle: {
      extend: Flex,
      caption: { props: { text: 'Last update:' } },
      span: { props: { text: 'an hour ago' } }
    }
  },

  props: {
    minWidth: 'G',
    maxWidth: 'G',
    padding: 'A',
    round: 'Z+V',
    gap: 'Y',
    style: { background: 'linear-gradient(to right, rgba(4, 116, 242, 1), rgba(0, 48, 103, 1))' },
    childProps: {
      alignItems: 'center',

      title: { fontWeight: '700' },
      icon: { fontSize: 'C', color: '#A3A3A8' },
      amount: { fontSize: `${24 / 16}em` },
      label: { padding: 'Y Z', background: '#04040466' },
      subTitle: {
        gap: 'Y',
        caption: { color: 'rgba(224, 224, 226, 1)' },
        span: { color: 'rgba(233, 233, 234, 1)' }
      }
    },

    heading: { justifyContent: 'space-between' },
    content: { gap: 'Y' }
  }
}

export const ConvertCard = {
  extend: Card,
  heading: {
    title: { props: { text: 'From' } },
    balance: { extend: BalancesIndicator },
    icon: null
  },
  content: {
    amount: { props: { text: '0.00' } },
    label: null,
    currency: { extend: DropDownWithAvatar },
    props: { align: 'center space-between' }
  },
  footer: null,

  props: {
    background: 'rgba(28, 28, 31, .5)',
    gap: 'A',
    childProps: {
      title: {
        color: 'rgba(163, 163, 168, 1)',
        fontWeight: '400'
      },
      amount: { color: 'rgba(163, 163, 168, 1)' }
    }
  }
}

export const ConvertBoard = {
  extend: Flex,
  header: {
    title: {
      tag: 'h6',
      props: { text: 'convert' }
    }
  },

  content: {
    extend: Flex,
    childExtend: ConvertCard,
    ...[
      {},
      {}
    ]
  },

  footer: {
    extend: Button,
    props: { text: 'Convert' }
  },

  props: {
    background: '#1C1C1F',
    maxWidth: 'fit-content',
    padding: 'A',
    round: 'A',
    // gap: 'Z',
    flow: 'column',
    textTransform: 'capitalize',
    header: {
      padding: '- - - Z',
      margin: '- - Y -',
      title: { fontSize: 'Z', fontWeight: '700' }
    },

    content: {
      flow: 'column',
      gap: 'Z',
      childProps: {
        minWidth: 'G+D',
        background: 'black '
      }
    },

    footer: {
      background: '#0474F2',
      color: 'white',
      minWidth: '100%',
      padding: 'A -',
      margin: 'Z - - -',
      fontSize: 'Z',
      round: 'Y+W',
      fontWeight: '500',
      cursor: 'pointer'
    }
  }
}
