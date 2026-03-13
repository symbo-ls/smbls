'use strict'

import { evaluate } from './eval.js'
import { compile } from './compile.js'
import { toSchema } from './toSchema.js'
import { get, set, resolveThis } from './resolve.js'
import { exec, RETURN } from './exec.js'
import { funcqlPlugin } from './plugin.js'

export {
  evaluate,
  compile,
  toSchema,
  get,
  set,
  resolveThis,
  exec,
  RETURN,
  funcqlPlugin
}

export default {
  evaluate,
  compile,
  toSchema,
  get,
  set,
  resolveThis,
  exec,
  RETURN,
  funcqlPlugin
}
