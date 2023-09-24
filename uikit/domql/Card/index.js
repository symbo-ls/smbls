'use strict'

import { Flex } from '@symbo.ls/atoms'
import { InfoSet } from '@symbo.ls/infoset'
import { Label } from '@symbo.ls/label'
import { Icon } from '@symbo.ls/icon'
// import { BalancesIndicator } from '@symbo.ls/accessories'

export const AmountWithLabel = {
  extend: Flex,
  amount: { props: { text: '240.59' } },
  label: {
    extend: Label,
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

  props: {
    minWidth: 'G',
    maxWidth: 'G',
    padding: 'A',
    round: 'Z+V',
    // theme: 'secondary',
    // theme: 'secondary @dark .color-only',
    // childProps: {
    //   theme: 'secondary .child'
    // }
    gap: 'Y',
    '@dark': { theme: 'primary @dark .gradient' },
    '@light': { theme: 'primary @light .gradient' },
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
  heading: {
    title: { props: { text: 'From' } },
    // balance: { extend: BalancesIndicator },
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

  Button: {
    text: 'Convert'
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
        background: 'black'
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

export const StepCard = {
  props: {
    boxSize: 'fit-content',
    padding: 'F E2+A2 G E2+A2',
    position: 'relative',
    overflow: 'hidden',
    round: 'A2',
    backgroundColor: '#FF3CAC',
    background: 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)'

  },
  Icon: {
    extend: Icon,
    props: {
      icon: 'dribbble',
      boxSize: 'E'
    }
  },
  LineStepsWithTitleParagraph: {
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '100%',
    round: '0',
    background: 'black .2'
  }

}
