import { resolve, join } from 'path'

/**
 * Loads a Symbols project from a filesystem path.
 * Expects the standard symbols/ directory structure.
 *
 * Used for prebuild scenarios where brender runs locally
 * against a project directory (e.g. `smbls build --prerender`).
 *
 * For server runtime rendering, pass the project data
 * directly to render() instead.
 */
export const loadProject = async (projectPath) => {
  const symbolsDir = resolve(projectPath, 'symbols')

  const tryImport = async (modulePath) => {
    try {
      return await import(modulePath)
    } catch {
      return null
    }
  }

  const [
    appModule,
    stateModule,
    configModule,
    depsModule,
    componentsModule,
    snippetsModule,
    pagesModule,
    functionsModule,
    methodsModule,
    designSystemModule,
    filesModule
  ] = await Promise.all([
    tryImport(join(symbolsDir, 'app.js')),
    tryImport(join(symbolsDir, 'state.js')),
    tryImport(join(symbolsDir, 'config.js')),
    tryImport(join(symbolsDir, 'dependencies.js')),
    tryImport(join(symbolsDir, 'components', 'index.js')),
    tryImport(join(symbolsDir, 'snippets', 'index.js')),
    tryImport(join(symbolsDir, 'pages', 'index.js')),
    tryImport(join(symbolsDir, 'functions', 'index.js')),
    tryImport(join(symbolsDir, 'methods', 'index.js')),
    tryImport(join(symbolsDir, 'designSystem', 'index.js')),
    tryImport(join(symbolsDir, 'files', 'index.js'))
  ])

  return {
    app: appModule?.default || {},
    state: stateModule?.default || {},
    dependencies: depsModule?.default || {},
    components: componentsModule || {},
    snippets: snippetsModule || {},
    pages: pagesModule?.default || {},
    functions: functionsModule || {},
    methods: methodsModule || {},
    designSystem: designSystemModule?.default || {},
    files: filesModule?.default || {},
    config: configModule?.default || {}
  }
}

/**
 * Renders all routes from a project directory and returns
 * a map of route -> { html, metadata }.
 * Useful for static prebuilding.
 */
export const loadAndRenderAll = async (projectPath, renderFn) => {
  const data = await loadProject(projectPath)
  const pages = data.pages || {}
  const routes = Object.keys(pages)
  const results = {}

  for (const route of routes) {
    results[route] = await renderFn(data, { route })
  }

  return results
}
