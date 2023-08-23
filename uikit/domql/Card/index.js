'use strict'

import { Flex } from '@symbo.ls/atoms'
import { InfoSet } from '../InfoSet'
import { Icon } from '../Icon'

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

export const Card = {
  extend: InfoSet,

  heading: {
    title: { props: { text: 'Total crypto assets' } },
    icon: { extend: Icon, props: { name: 'arrowUpRight' } }
  },
  content: {
    extend: Flex,
    amount: { props: { text: '$ 12,759' } },
    percent: {
      extend: CardLabel,
      props: { text: '+ 8.8%' }
    }
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
      amount: { fontSize: `${24 / 16}em`, fontWeight: '700' },
      percent: { padding: 'Y Z', background: '#04040466' },
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
