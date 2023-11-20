'use strict'

import { create } from '@symbo.ls/create'
import { ComponentsView } from './components' // eslint-disable-line
import { DemoPage } from '@symbo.ls/demo-page'

create({
  extend: DemoPage,

  state: {
    globalTheme: 'dark'
  }
})
