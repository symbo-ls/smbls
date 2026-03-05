import { createEnv } from './env.js'
import { resetKeys, assignKeys, mapKeysToElements } from './keys.js'
import { extractMetadata } from './metadata.js'

/**
 * Renders a Symbols/DomQL project to HTML on the server.
 *
 * Accepts project data as a plain object (matching what ProjectDataService provides)
 * or as a pre-loaded smbls context. Runs DomQL in a linkedom virtual DOM,
 * assigns data-br keys for hydration, and extracts page metadata for SEO.
 *
 * @param {object} data - Project data object with: pages, components, designSystem,
 *   state, functions, methods, snippets, files, app, config/settings
 * @param {object} [options]
 * @param {string} [options.route='/'] - The route/page to render
 * @param {object} [options.state] - State overrides
 * @param {object} [options.context] - Additional context overrides
 * @returns {Promise<{ html: string, metadata: object, registry: object, element: object }>}
 */
export const render = async (data, options = {}) => {
  const { route = '/', state: stateOverrides, context: contextOverrides } = options

  const { window, document } = createEnv()
  const body = document.body

  // Set route on location so the router picks it up
  window.location.pathname = route

  // Lazily import smbls createDomqlElement — this avoids requiring
  // the whole smbls package at module load time
  // Import from source directly — the smbls package doesn't export this subpath
  const smblsSrc = new URL('../../packages/smbls/src/createDomql.js', import.meta.url)
  const { createDomqlElement } = await import(smblsSrc.href)

  const app = data.app || {}

  const ctx = {
    state: { ...data.state, ...(stateOverrides || {}) },
    dependencies: data.dependencies || {},
    components: data.components || {},
    snippets: data.snippets || {},
    pages: data.pages || {},
    functions: data.functions || {},
    methods: data.methods || {},
    designSystem: data.designSystem || {},
    files: data.files || {},
    ...(data.config || data.settings || {}),
    // Virtual DOM environment
    document,
    window,
    parent: { node: body },
    // Caller overrides
    ...(contextOverrides || {})
  }

  resetKeys()

  const element = await createDomqlElement(app, ctx)

  // Assign data-br keys for hydration
  assignKeys(body)

  const registry = mapKeysToElements(element)

  // Extract metadata for the rendered route
  const metadata = extractMetadata(data, route)

  const html = body.innerHTML

  return { html, metadata, registry, element }
}

/**
 * Renders a single DomQL element definition to HTML.
 * Useful for rendering individual components without a full project.
 *
 * @param {object} elementDef - DomQL element definition
 * @param {object} [options]
 * @param {object} [options.context] - DomQL context (components, designSystem, etc.)
 * @returns {Promise<{ html: string, registry: object, element: object }>}
 */
export const renderElement = async (elementDef, options = {}) => {
  const { context = {} } = options

  const { window, document } = createEnv()
  const body = document.body

  const { create } = await import('@domql/element')

  resetKeys()

  const element = create(elementDef, { node: body }, 'root', {
    context: { document, window, ...context }
  })

  assignKeys(body)
  const registry = mapKeysToElements(element)
  const html = body.innerHTML

  return { html, registry, element }
}
