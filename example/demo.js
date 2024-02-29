'use strict'

import { create } from '@symbo.ls/create'
import { StyleguidePage, ComponentsPage } from '@symbo.ls/preview' // eslint-disable-line

create({
  state: {
    globalTheme: 'dark'
  }
}, {
  pages: {
    '/': StyleguidePage,
    '/components': ComponentsPage
  }
})
