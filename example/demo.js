'use strict'

import { create } from '@symbo.ls/create'
import { Flex } from '@symbo.ls/atoms'
import { DemoPages } from '@symbo.ls/demo-page'

create({
  extend: Flex,

  state: {
    globalTheme: 'dark',
    value: ''
  },

  cnt: {
    extend: DemoPages,
    props: {
      background: 'black',
      position: 'fixed',
      top: '0',
      left: '0',
      zIndex: '10',
      gap: 'C1',
      minWidth: 'calc(100% - 70px)',
      height: '100%',
      margin: '- - - auto'
    }
  }
})
