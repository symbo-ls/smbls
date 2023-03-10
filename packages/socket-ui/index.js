'use strict'

import DOM from 'domql'

import designSystem from './init'

import { Box } from 'smbls'
import { Extend } from './extend'

export const SymbolsDebugger = DOM.create(Extend, undefined, 'app', {
  extend: [Box],
  components: {},
  context: { designSystem }
})
