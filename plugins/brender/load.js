import { resolve, join } from 'path'
import { existsSync, mkdirSync, writeFileSync, unlinkSync } from 'fs'
import { tmpdir } from 'os'
import { randomBytes } from 'crypto'

/**
 * Bundles a module entry point with esbuild so that extensionless imports,
 * bare specifiers, and other bundler conventions resolve correctly.
 * Returns the default + named exports of the bundled module, or null on failure.
 */
const bundleAndImport = async (entryPath) => {
  if (!existsSync(entryPath)) return null

  let esbuild
  try {
    esbuild = await import('esbuild')
  } catch {
    // Fallback: try raw import if esbuild is not available
    try { return await import(entryPath) } catch { return null }
  }

  const outFile = join(tmpdir(), `brender_${randomBytes(8).toString('hex')}.mjs`)

  try {
    await esbuild.build({
      entryPoints: [entryPath],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile: outFile,
      write: true,
      logLevel: 'silent',
      // Mark node builtins as external
      external: ['fs', 'path', 'os', 'crypto', 'url', 'http', 'https', 'stream', 'util', 'events', 'buffer', 'child_process', 'worker_threads', 'net', 'tls', 'dns', 'dgram', 'zlib', 'assert', 'querystring', 'string_decoder', 'readline', 'perf_hooks', 'async_hooks', 'v8', 'vm', 'cluster', 'inspector', 'module', 'process', 'tty'],
    })

    const mod = await import(`file://${outFile}`)
    return mod
  } catch {
    // Fallback: try raw import
    try { return await import(entryPath) } catch { return null }
  } finally {
    try { unlinkSync(outFile) } catch {}
  }
}

/**
 * Loads a Symbols project from a filesystem path.
 * Expects the standard symbols/ directory structure.
 *
 * Uses esbuild to bundle each module so that extensionless imports
 * and other bundler conventions work in Node.js.
 *
 * Used for prebuild scenarios where brender runs locally
 * against a project directory (e.g. `smbls build --prerender`).
 *
 * For server runtime rendering, pass the project data
 * directly to render() instead.
 */
export const loadProject = async (projectPath) => {
  const symbolsDir = resolve(projectPath, 'symbols')

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
    bundleAndImport(join(symbolsDir, 'app.js')),
    bundleAndImport(join(symbolsDir, 'state.js')),
    bundleAndImport(join(symbolsDir, 'config.js')),
    bundleAndImport(join(symbolsDir, 'dependencies.js')),
    bundleAndImport(join(symbolsDir, 'components', 'index.js')),
    bundleAndImport(join(symbolsDir, 'snippets', 'index.js')),
    bundleAndImport(join(symbolsDir, 'pages', 'index.js')),
    bundleAndImport(join(symbolsDir, 'functions', 'index.js')),
    bundleAndImport(join(symbolsDir, 'methods', 'index.js')),
    bundleAndImport(join(symbolsDir, 'designSystem', 'index.js')),
    bundleAndImport(join(symbolsDir, 'files', 'index.js'))
  ])

  // Spread into plain objects — ESM module namespaces are non-extensible,
  // which breaks downstream code that adds properties (e.g. polyglot functions).
  return {
    app: { ...(appModule?.default || {}) },
    state: { ...(stateModule?.default || {}) },
    dependencies: { ...(depsModule?.default || {}) },
    components: { ...(componentsModule || {}) },
    snippets: { ...(snippetsModule || {}) },
    pages: { ...(pagesModule?.default || {}) },
    functions: { ...(functionsModule || {}) },
    methods: { ...(methodsModule || {}) },
    designSystem: { ...(designSystemModule?.default || {}) },
    files: { ...(filesModule?.default || {}) },
    config: { ...(configModule?.default || {}) }
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
