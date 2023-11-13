'use strict'

import { create } from '@symbo.ls/create'
import { DemoPages } from '@symbo.ls/demo-page'

create({
  extend: DemoPages,

  state: {
    globalTheme: 'dark',
    value: ''
  },

  props: {
    position: 'fixed',
    top: '0',
    left: '0',
    zIndex: '10'
  }
})
