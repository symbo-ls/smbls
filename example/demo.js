'use strict'

import { create } from '@symbo.ls/create'
import { StyleguidePage, ComponentsPage } from '@symbo.ls/preview' // eslint-disable-line

// import designSystem from '@symbo.ls/config' // eslint-disable-line

create({
  extend: StyleguidePage,

  state: {
    globalTheme: 'dark'
  }
}, {
  // designSystem
})
