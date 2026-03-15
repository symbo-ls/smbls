'use strict'

import { resolveMetadata, applyMetadata } from '@symbo.ls/helmet'
import { executeFetch } from '@symbo.ls/fetch'

const fetchHandler = (param, el, state, context) => {
  if (!param) return
  executeFetch(param, el, state, context)
}

const metadataHandler = (param, el, state) => {
  if (!param) return
  const doc = el.context?.document || (typeof document !== 'undefined' && document)
  if (!doc) return
  const resolved = resolveMetadata(param, el, state)
  applyMetadata(resolved, doc)
}

const routerHandler = async (param, el) => {
  if (!param) return

  const obj = { tag: 'fragment', ...param }

  const set = async () => {
    await el.set(obj, { preventDefineUpdate: '$router' })
  }

  if (el.props && el.props.lazyLoad) {
    window.requestAnimationFrame(set)
  } else await set()

  return obj
}

export const defaultDefine = {
  routes: param => param,
  metadata: metadataHandler,
  fetch: fetchHandler,
  $router: routerHandler
}

/**
 * Create a custom define object with optional features.
 *
 * @param {Object} opts
 * @param {boolean} [opts.fetch=true] - Include fetch handler
 * @param {boolean} [opts.metadata=true] - Include metadata/helmet handler
 * @param {boolean} [opts.router=true] - Include router handler
 * @returns {Object} define handlers
 *
 * @example
 * // Disable fetch:
 * context.define = createDefine({ fetch: false })
 *
 * // Only router:
 * context.define = createDefine({ fetch: false, metadata: false })
 */
export const createDefine = (opts = {}) => {
  const define = { routes: param => param }
  if (opts.metadata !== false) define.metadata = metadataHandler
  if (opts.fetch !== false) define.fetch = fetchHandler
  if (opts.router !== false) define.$router = routerHandler
  return define
}
