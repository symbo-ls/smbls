'use strict'

import { Flex } from '@symbo.ls/atoms'
import { InfoSet } from '@symbo.ls/infoset'
import { Button } from '@symbo.ls/button'

export const AmountWithLabel = {
  extend: Flex,
  amount: { props: { text: '240.59' } },

  CardLabel: {
    text: '-0.25%'
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

  props: {
    minWidth: 'G',
    maxWidth: 'G',
    padding: 'A',
    round: 'Z+V',
    gap: 'Y',
    style: { background: 'linear-gradient(to right, rgba(4, 116, 242, 1), rgba(0, 48, 103, 1))' },
    childProps: {
      alignItems: 'center',

      amount: { fontSize: `${24 / 16}em` },
      Subtitle: {
        gap: 'Y',
        caption: { color: 'rgba(224, 224, 226, 1)' },
        span: { color: 'rgba(233, 233, 234, 1)' }
      }
    },

    content: { gap: 'Y' }
  },

  Heading: {
    props: {
      justifyContent: 'space-between'
    },
    Title: {
      fontWeight: '700',
      text: 'Total crypto assets'
    },
    Icon: {
      fontSize: 'C',
      color: '#A3A3A8',
      name: 'arrowUpRight'
    }
  },

  AmountWithLabel: {
    props: {
      padding: 'Y Z', background: '#04040466'
    },
    amount: { props: { text: '$ 12,759' } },
    label: { props: { text: '+ 8.8%' } }
  },

  Footer: {
    props: {},
    Flex: {
      props: {},
      caption: { props: { text: 'Last update:' } },
      span: { props: { text: 'an hour ago' } }
    }
  }
}

export const ConvertCard = {
  extend: Card,
  Heading: {
    props: {},
    Title: {
      text: 'From',
      color: 'rgba(163, 163, 168, 1)',
      fontWeight: '400'
    },
    BalancesIndicator: {},
    icon: null
  },

  content: {
    props: { align: 'center space-between' },

    amount: { props: { text: '0.00' } },
    label: null,
    DropDownWithAvatar: {}
  },
  footer: null,

  props: {
    background: 'rgba(28, 28, 31, .5)',
    gap: 'A',
    childProps: {
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
