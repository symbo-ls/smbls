'use strict'

import { create } from '@symbo.ls/create'
import { ComponentsView } from './components' // eslint-disable-line
import { StyleguidePage } from '@symbo.ls/preview' // eslint-disable-line

// import designSystem from '@symbo.ls/config' // eslint-disable-line

create({
  extend: StyleguidePage,

  state: {
    globalTheme: 'dark'
  }
}, {
  // designSystem
})
