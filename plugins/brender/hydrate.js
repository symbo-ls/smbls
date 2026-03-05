/**
 * Client-side hydration — reconnects pre-rendered HTML (with data-br keys)
 * to a live DomQL element tree, attaches events, and fires lifecycle hooks.
 *
 * After hydration the DomQL tree owns every DOM node:
 * - el.node points to the real DOM element
 * - node.ref points back to the DomQL element
 * - DOM events (click, input, etc.) are bound
 * - on.render / on.renderRouter callbacks fire
 */

/**
 * Collects all elements with data-br attributes from the document.
 * Returns a map of brKey -> DOM node.
 */
export const collectBrNodes = (root) => {
  const container = root || document
  const nodes = container.querySelectorAll('[data-br]')
  const map = {}
  nodes.forEach(node => {
    map[node.getAttribute('data-br')] = node
  })
  return map
}

/**
 * Walks a DomQL element tree that was created with onlyResolveExtends.
 * For each element with a __brKey, attaches the matching real DOM node,
 * binds DOM events, and fires lifecycle hooks.
 *
 * @param {object} element - Root DomQL element (from create with onlyResolveExtends)
 * @param {object} [options]
 * @param {Element} [options.root] - Root DOM element to scan for data-br nodes
 * @param {boolean} [options.events=true] - Attach DOM events (click, input, etc.)
 * @param {boolean} [options.renderEvents=true] - Fire on.render / on.renderRouter
 * @returns {{ element: object, linked: number, unlinked: number }}
 */
export const hydrate = (element, options = {}) => {
  const {
    root,
    events: attachEvents = true,
    renderEvents: fireRenderEvents = true
  } = options

  const brNodes = collectBrNodes(root)
  let linked = 0
  let unlinked = 0

  const walk = (el) => {
    if (!el || !el.__ref) return

    const brKey = el.__ref.__brKey
    if (brKey) {
      const node = brNodes[brKey]
      if (node) {
        // Link node <-> element
        el.node = node
        node.ref = el

        // Attach DOM events (click, input, submit, etc.)
        if (attachEvents) {
          bindEvents(el)
        }

        linked++
      } else {
        unlinked++
      }
    }

    // Walk children
    if (el.__ref.__children) {
      for (const childKey of el.__ref.__children) {
        const child = el[childKey]
        if (child && child.__ref) walk(child)
      }
    }
  }

  walk(element)

  // Fire on.render events after all nodes are linked
  if (fireRenderEvents) {
    fireLifecycle(element)
  }

  return { element, linked, unlinked }
}

/**
 * Binds DOM events from element.on and element.props onto the real node.
 * Mirrors what @domql/element node.js applyEventsOnNode does.
 */
const DOMQL_LIFECYCLE = new Set([
  'render', 'create', 'init', 'start', 'complete', 'done',
  'beforeClassAssign', 'attachNode', 'stateInit', 'stateCreated',
  'renderRouter', 'lazyLoad', 'error'
])

const bindEvents = (el) => {
  const { node, on, props } = el
  if (!node) return

  const handled = new Set()

  // Bind from on: { click, input, change, ... }
  if (on) {
    for (const param in on) {
      if (DOMQL_LIFECYCLE.has(param)) continue
      if (typeof on[param] !== 'function') continue
      handled.add(param)
      addListener(node, param, on[param], el)
    }
  }

  // Bind from props: { onClick, onInput, ... }
  if (props) {
    for (const key in props) {
      if (key.length <= 2 || key[0] !== 'o' || key[1] !== 'n') continue
      if (typeof props[key] !== 'function') continue
      const third = key[2]
      if (third !== third.toUpperCase()) continue
      const eventName = third.toLowerCase() + key.slice(3)
      if (handled.has(eventName) || DOMQL_LIFECYCLE.has(eventName)) continue
      addListener(node, eventName, props[key], el)
    }
  }
}

const addListener = (node, eventName, handler, el) => {
  node.addEventListener(eventName, (event) => {
    const result = handler.call(el, event, el, el.state, el.context)
    if (result && typeof result.then === 'function') {
      result.catch(() => {})
    }
  })
}

/**
 * Walks the tree and fires on.render, on.renderRouter, on.done, on.create
 * lifecycle events — the same ones that fire during normal DomQL create.
 */
const fireLifecycle = (el) => {
  if (!el || !el.__ref || !el.node) return

  const on = el.on
  if (on) {
    fireEvent(on.render, el)
    fireEvent(on.renderRouter, el)
    fireEvent(on.done, el)
    fireEvent(on.create, el)
  }

  if (el.__ref.__children) {
    for (const childKey of el.__ref.__children) {
      const child = el[childKey]
      if (child && child.__ref) fireLifecycle(child)
    }
  }
}

const fireEvent = (fn, el) => {
  if (typeof fn !== 'function') return
  try {
    const result = fn.call(el, el, el.state, el.context)
    if (result && typeof result.then === 'function') {
      result.catch(() => {})
    }
  } catch (e) {
    console.warn('[brender hydrate]', el.key, e.message)
  }
}
