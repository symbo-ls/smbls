'use strict'

import { window } from '@domql/globals'
import { TREE } from '@domql/tree'
import { create, parse, set, define } from './element'
import { isDevelopment, isTest } from '@domql/env'

if (isTest() || isDevelopment()) window.tree = TREE

export default {
  TREE,
  create: create.default || create,
  parse: parse.default || parse,
  set: set.default || set,
  define: define.default || define
}
