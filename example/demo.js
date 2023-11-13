'use strict'

import { create } from '@symbo.ls/create'
import { DemoPage } from '@symbo.ls/demo-page'

create({
  extend: DemoPage,

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
