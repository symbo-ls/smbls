'use strict'

import { evaluate } from './eval.js'

/**
 * domql plugin for funcql.
 *
 * Resolves object/array/string schemas into callable functions
 * that evaluate within the domql element context.
 *
 * Usage:
 *   context.plugins = [funcqlPlugin]
 */
export const funcqlPlugin = {
  name: 'funcql',

  resolveHandler (handler, element) {
    if (
      handler == null ||
      typeof handler === 'function' ||
      typeof handler === 'boolean' ||
      typeof handler === 'number'
    ) return handler

    return function (...args) {
      const event = args[0]
      const ctx = {
        el: this,
        element: this,
        event,
        state: this.state,
        context: this.context,
        scope: this.scope,
        props: this.props,
        parent: this.parent,
        root: this.context?.root || this.parent?.root
      }
      return evaluate(handler, ctx)
    }
  }
}

export default funcqlPlugin
