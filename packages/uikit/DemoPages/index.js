'use strict'

import { Flex } from '@symbo.ls/atoms'

import { Typography, Colors, Icons, Shapes } from './Articles'

export const DemoPages = {
  extend: Flex,
  props: {
    height: '100%',
    width: '100%',
    background: 'black',
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '10',
    // padding: 'E E',
    style: {
      fontFamily: 'Avenir'
    }
  },

  Flex: {
    props: {
      flex: '1',
      background: 'black',
      flow: 'column',
      gap: 'E1+X',
      style: {
        overflowY: 'auto',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': { display: 'none' }
      },
      maxHeight: '100%',
      '> section': {
        minWidth: '100%'

      }
    },

    Typography,
    Colors,
    Icons,
    Shapes
  },

  Sidebar: {
    extend: Flex,
    props: {
      boxSize: '100% D1',
      flow: 'column',
      gap: 'C',
      align: 'center center',
      childProps: {
        boxSize: 'Y2',
        round: '100%'
      }

    },
    childExtend: {
      tag: 'a'
    },
    ...[
      {
        attr: { href: '#typography' },
        props: {
          background: 'red'
        }
      },
      {
        attr: { href: '#colors' },
        props: { background: 'blue' }
      },
      {
        attr: { href: '#icons' },
        props: { background: 'green' }
      },
      { props: { background: 'yellow' } },
      { props: { background: 'purple' } }
    ]
  }
}
