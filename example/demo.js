'use strict'

import { create } from '@symbo.ls/create'
import { StyleguidePage, ComponentsPage } from '@symbo.ls/preview' // eslint-disable-line
import * as data from '../toko'

create({
  state: {
    globalTheme: 'dark'
  }
}, data)
