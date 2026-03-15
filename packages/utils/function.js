'use strict'

/**
 * Debounces a function, ensuring that it is only executed after a specified timeout
 * period has elapsed since the last invocation.
 *
 * @param {function} func - The function to be debounced.
 * @param {number} [timeout=300] - The time (in milliseconds) to wait after the last call to
 *     `debounce` before executing the `func`.
 * @returns {function} - A debounced version of the input function `func`.
 * @example
 * // Usage example:
 * const debouncedFunction = debounce(this, myFunction, 500);
 * window.addEventListener('resize', debouncedFunction);
 */
export function debounce (func, wait, immediate) {
  let timeout
  return function () {
    const context = this
    const args = arguments
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/**
 * Debounces a function, ensuring that it is only executed after a specified timeout
 * period has elapsed since the last invocation.
 *
 * @param {Object} element - The context (this) to which the debounced function will be applied.
 * @param {function} func - The function to be debounced.
 * @param {number} [timeout=300] - The time (in milliseconds) to wait after the last call to
 *     `debounce` before executing the `func`.
 * @returns {function} - A debounced version of the input function `func`.
 * @example
 * // Usage example:
 * const debouncedFunction = debounce(this, myFunction, 500);
 * window.addEventListener('resize', debouncedFunction);
 */
export const debounceOnContext = (element, func, timeout = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(element, args)
    }, timeout)
  }
}

export const memoize = fn => {
  const cache = {}
  return (...args) => {
    const n = args[0]
    if (n in cache) {
      return cache[n]
    } else {
      const result = fn(n)
      cache[n] = result
      return result
    }
  }
}

const RE_STRING_FUNCTION = /^((function\s*\([^)]*\)\s*\{[^}]*\})|(\([^)]*\)\s*=>))/

export const isStringFunction = inputString => {
  return RE_STRING_FUNCTION.test(inputString)
}

/**
 * Resolve an event handler through context plugins.
 *
 * If `handler` is already a function it is returned as-is.
 * Otherwise, iterates `context.plugins` looking for a plugin
 * with a `resolveHandler` method that can compile the handler
 * (e.g. a funcql schema) into a callable function.
 *
 * @param {*} handler - event handler (function, object, array, string)
 * @param {object} element - domql element
 * @returns {function|*} resolved handler
 */
/**
 * Check if context has any plugin that can resolve non-function handlers.
 */
export const hasHandlerPlugin = (ctx) => {
  const plugins = ctx?.plugins
  if (!plugins || !plugins.length) return false
  for (const plugin of plugins) {
    if (plugin.resolveHandler) return true
  }
  return false
}

export const resolveHandler = (handler, element) => {
  if (typeof handler === 'function') return handler
  const plugins = element?.context?.plugins
  if (!plugins) return handler
  for (const plugin of plugins) {
    if (plugin.resolveHandler) {
      const resolved = plugin.resolveHandler(handler, element)
      if (typeof resolved === 'function') return resolved
    }
  }
  return handler
}

/**
 * Run a named hook across all context plugins.
 *
 * @param {string} hookName - lifecycle hook name
 * @param {object} element - domql element
 * @param {*[]} args - additional arguments forwarded to each plugin hook
 */
export const runPluginHook = (hookName, element, ...args) => {
  const plugins = element?.context?.plugins
  if (!plugins) return
  for (const plugin of plugins) {
    if (typeof plugin[hookName] === 'function') {
      plugin[hookName](element, ...args)
    }
  }
}

export function cloneFunction (fn, win = window) {
  const temp = function () {
    return fn.apply(win, arguments)
  }

  // Copy properties from original function
  for (const key in fn) {
    if (Object.prototype.hasOwnProperty.call(fn, key)) {
      temp[key] = fn[key]
    }
  }
  return temp
}
