'use strict'

import { create } from '@symbo.ls/create'
import { StyleguidePage, ComponentsPage } from '@symbo.ls/preview'

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
