'use strict'

import { Sync, DevFocus, inspectOnKey } from '@symbo.ls/socket-ui'
import { isProduction, isTest } from '@domql/env'

const { NODE_ENV } = process.env

export const applySyncDebug = (extend, options) => {
  if (options.debug) extend.push[DevFocus]
  if (options.socket) extend.push[Sync]
  return extend
}

export const applyKeyDebugListener = (root, options) => {
  if (options.debug) inspectOnKey(root)
}

const extend = isProduction(NODE_ENV) || isTest(NODE_ENV)  [Sync, DevFocus]
