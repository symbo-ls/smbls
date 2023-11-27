'use strict'

import { create } from '@symbo.ls/create'
import { ComponentsView } from './components' // eslint-disable-line
import { DemoPage } from '@symbo.ls/demo-page' // eslint-disable-line

import designSystem from '@symbo.ls/config' // eslint-disable-line

create({
  extend: ComponentsView,

  state: {
    globalTheme: 'dark'
  }
}, {
  // designSystem
})
