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

  // Storage stubs
  const createStorage = () => {
    const store = {}
    return {
      getItem: (k) => store[k] ?? null,
      setItem: (k, v) => { store[k] = String(v) },
      removeItem: (k) => { delete store[k] },
      clear: () => { for (const k in store) delete store[k] },
      get length () { return Object.keys(store).length },
      key: (i) => Object.keys(store)[i] ?? null
    }
  }
  if (!window.localStorage) window.localStorage = createStorage()
  if (!window.sessionStorage) window.sessionStorage = createStorage()
  if (!globalThis.localStorage) globalThis.localStorage = window.localStorage
  if (!globalThis.sessionStorage) globalThis.sessionStorage = window.sessionStorage

  // Expose linkedom constructors on globalThis so @domql/utils isDOMNode
  // can use instanceof checks (it reads from globalThis.Node, etc.)
  globalThis.window = window
  globalThis.document = document
  globalThis.Node = window.Node || globalThis.Node
  globalThis.HTMLElement = window.HTMLElement || globalThis.HTMLElement
  globalThis.Window = window.constructor

  return { window, document }
}
