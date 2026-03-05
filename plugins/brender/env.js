import { parseHTML } from 'linkedom'

/**
 * Creates a virtual DOM environment for server-side rendering.
 * Returns window and document that DomQL can use as context.
 */
export const createEnv = (html = '<!DOCTYPE html><html><head></head><body></body></html>') => {
  const { window, document } = parseHTML(html)

  // Stub APIs that DomQL/smbls may call during rendering
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (fn) => setTimeout(fn, 0)
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (id) => clearTimeout(id)
  }
  if (!window.history) {
    window.history = {
      pushState: () => {},
      replaceState: () => {},
      state: null
    }
  }
  if (!window.location) {
    window.location = { pathname: '/', search: '', hash: '', origin: 'http://localhost' }
  }
  if (!window.URL) {
    window.URL = URL
  }
  if (!window.scrollTo) {
    window.scrollTo = () => {}
  }

  // Expose linkedom constructors on globalThis so @domql/utils isDOMNode
  // can use instanceof checks (it reads from globalThis.Node, etc.)
  globalThis.window = window
  globalThis.document = document
  globalThis.Node = window.Node || globalThis.Node
  globalThis.HTMLElement = window.HTMLElement || globalThis.HTMLElement
  globalThis.Window = window.constructor

  return { window, document }
}
