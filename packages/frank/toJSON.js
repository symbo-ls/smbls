'use strict'

import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import { build } from 'esbuild'
import { getBannerCode } from './stubs.js'

const require = createRequire(import.meta.url)

const FUNCTION_META_KEYS = new Set([
  '__fn', '__fnMeta', '__handler', '__meta'
])

/**
 * Recursively clone a value, stringifying functions for JSON transport.
 */
export function stringifyFunctions (value, seen = new WeakMap()) {
  if (value === null || typeof value !== 'object') {
    return typeof value === 'function' ? value.toString() : value
  }
  if (seen.has(value)) return seen.get(value)

  const clone = Array.isArray(value) ? [] : {}
  seen.set(value, clone)

  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      clone[i] = stringifyFunctions(value[i], seen)
    }
    return clone
  }

  const keys = Object.keys(value)
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (!FUNCTION_META_KEYS.has(key)) {
      clone[key] = stringifyFunctions(value[key], seen)
    }
  }
  return clone
}

/**
 * Strip empty `default: {}` namespace entries produced by CJS bundling.
 */
function stripEmptyDefaults (project) {
  if (!project || typeof project !== 'object') return project
  const SECTIONS = ['functions', 'methods', 'snippets', 'pages', 'components', 'files', 'dependencies']
  for (const key of SECTIONS) {
    const section = project[key]
    if (!section || typeof section !== 'object' || Array.isArray(section)) continue
    if (!Object.prototype.hasOwnProperty.call(section, 'default')) continue
    const def = section.default
    if (def && typeof def === 'object' && !Array.isArray(def) && Object.keys(def).length === 0) {
      try { delete section.default } catch (_) {
        const clone = {}
        for (const k of Object.keys(section)) {
          if (k !== 'default') clone[k] = section[k]
        }
        project[key] = clone
      }
    }
  }
  return project
}

// Runtime packages that should not be bundled — we only need the data, not executors.
const EXTERNAL_PACKAGES = [
  'esbuild',
  'smbls',
  '@symbo.ls/*',
  '@domql/*',
  '@emotion/*',
  '@supabase/*',
  'react',
  'react-dom',
  'lodash',
  'lodash/*',
  'motion'
]

/**
 * esbuild plugin that stubs externalized packages as empty modules
 * instead of emitting require() calls that fail at runtime.
 */
function stubExternalsPlugin (patterns) {
  const wildcards = patterns.filter(p => p.endsWith('/*')).map(p => p.slice(0, -2))
  const exact = new Set(patterns.filter(p => !p.endsWith('/*')))

  function isMatch (id) {
    if (exact.has(id)) return true
    return wildcards.some(prefix => id === prefix || id.startsWith(prefix + '/'))
  }

  return {
    name: 'stub-externals',
    setup (build) {
      build.onResolve({ filter: /.*/ }, args => {
        if (args.kind !== 'import-statement' && args.kind !== 'require-call') return
        if (isMatch(args.path)) {
          return { path: args.path, namespace: 'stub-external' }
        }
      })
      build.onLoad({ filter: /.*/, namespace: 'stub-external' }, () => ({
        contents: 'module.exports = { __esModule: true, __isStub: true }',
        loader: 'js'
      }))
    }
  }
}

/**
 * Bundle a JS entry file using esbuild into a single CJS module loadable in Node.
 */
async function bundleEntry (entryPath, outFile, external = []) {
  const source = await fs.promises.readFile(entryPath, 'utf8')
  const allExternals = [...EXTERNAL_PACKAGES, ...external]
  await build({
    stdin: {
      contents: source,
      sourcefile: entryPath,
      loader: 'js',
      resolveDir: path.dirname(entryPath)
    },
    minify: false,
    outfile: outFile,
    target: 'node18',
    platform: 'node',
    format: 'cjs',
    bundle: true,
    mainFields: ['module', 'main'],
    plugins: [stubExternalsPlugin(allExternals)],
    define: { global: 'globalThis' },
    banner: { js: getBannerCode() },
    loader: {
      '.png': 'dataurl',
      '.jpg': 'dataurl',
      '.jpeg': 'dataurl',
      '.gif': 'dataurl',
      '.webp': 'dataurl',
      '.svg': 'dataurl',
      '.woff2': 'dataurl',
      '.woff': 'dataurl',
      '.ttf': 'dataurl',
      '.otf': 'dataurl',
      '.eot': 'dataurl'
    },
    logLevel: 'warning'
  })
}

/**
 * Load a CJS module, busting the require cache.
 */
function loadCjs (filePath) {
  const absPath = path.resolve(filePath)
  try {
    const resolved = require.resolve(absPath)
    delete require.cache[resolved]
  } catch (_) {}
  const mod = require(absPath)
  return mod?.default || mod
}

// Standard modules that compose a Symbols project context.
const CONTEXT_MODULES = [
  { name: 'state', path: './state.js', style: 'default' },
  { name: 'dependencies', path: './dependencies.js', style: 'default' },
  { name: 'sharedLibraries', path: './sharedLibraries.js', style: 'default' },
  { name: 'components', path: './components/index.js', style: 'namespace' },
  { name: 'snippets', path: './snippets/index.js', style: 'namespace' },
  { name: 'pages', path: './pages/index.js', style: 'default' },
  { name: 'functions', path: './functions/index.js', style: 'namespace' },
  { name: 'methods', path: './methods/index.js', style: 'namespace' },
  { name: 'designSystem', path: './designSystem/index.js', style: 'default' },
  { name: 'files', path: './files/index.js', style: 'default' },
  { name: 'config', path: './config.js', style: 'default' },
  { name: 'envs', path: './envs.js', style: 'default' }
]

/**
 * Detect the entry file for a symbols project directory.
 * Prefers context.js. If missing, generates a temporary one from discovered modules.
 */
function findEntry (projectDir) {
  const contextPath = path.join(projectDir, 'context.js')
  if (fs.existsSync(contextPath)) return { path: contextPath, generated: false }

  return { path: null, generated: true }
}

/**
 * Generate a temporary context entry that re-exports all available project modules
 * without executing any runtime code (unlike index.js which calls create()).
 */
function generateContextEntry (projectDir) {
  const available = CONTEXT_MODULES.filter(m => {
    const fullPath = path.join(projectDir, m.path)
    return fs.existsSync(fullPath)
  })

  if (!available.length) return null

  const imports = available.map(m =>
    m.style === 'namespace'
      ? `import * as ${m.name} from '${m.path}'`
      : `import ${m.name} from '${m.path}'`
  ).join('\n')

  const entries = available.map(m =>
    m.name === 'config' ? '  ...config' : `  ${m.name}`
  ).join(',\n')

  return `${imports}\n\nexport default {\n${entries}\n}\n`
}

/**
 * Convert a Symbols filesystem project to a JSON-serialisable object.
 *
 * @param {string} projectDir - Absolute path to the symbols/ directory
 * @param {Object} [options]
 * @param {string} [options.entry] - Custom entry file (default: context.js or index.js)
 * @param {boolean} [options.stringify] - Also stringify functions (default: true)
 * @param {string} [options.tmpDir] - Custom temp directory for bundled output
 * @param {string[]} [options.external] - Additional packages to externalize
 * @returns {Promise<Object>} The project as a plain JSON-serialisable object
 */
export async function toJSON (projectDir, options = {}) {
  const { entry, stringify = true, tmpDir, external = [] } = options
  const absProjectDir = path.resolve(projectDir)

  // Bundle into a temp CJS file
  const buildDir = tmpDir || path.join(absProjectDir, '.frank_tmp')
  const outFile = path.join(buildDir, 'bundle.cjs')

  let entryPath
  let generatedEntryPath = null

  if (entry) {
    entryPath = path.resolve(absProjectDir, entry)
  } else {
    const found = findEntry(absProjectDir)
    if (found.generated) {
      // Generate a temporary context entry that just aggregates data
      const contextSource = generateContextEntry(absProjectDir)
      if (!contextSource) {
        throw new Error(`No recognizable project modules found in ${absProjectDir}`)
      }
      await fs.promises.mkdir(buildDir, { recursive: true })
      generatedEntryPath = path.join(buildDir, '_context.js')
      // Write temp context with paths relative to project dir
      const rewritten = contextSource.replace(
        /from '(\.\/[^']+)'/g,
        (_, rel) => `from '${path.join(absProjectDir, rel)}'`
      )
      await fs.promises.writeFile(generatedEntryPath, rewritten, 'utf8')
      entryPath = generatedEntryPath
    } else {
      entryPath = found.path
    }
  }

  if (!entryPath || (!generatedEntryPath && !fs.existsSync(entryPath))) {
    throw new Error(`No entry file found in ${absProjectDir}. Expected context.js or index.js`)
  }

  try {
    await fs.promises.mkdir(buildDir, { recursive: true })
    await bundleEntry(entryPath, outFile, external)

    // Patch __toESM in the bundle so stub-external modules return a Proxy
    // that makes any property access return a no-op function
    let code = await fs.promises.readFile(outFile, 'utf8')
    code = code.replace(
      /var __toESM\s*=\s*([^;]+);/,
      'var __origToESM = $1; var __toESM = function(mod) { var r = __origToESM.apply(null, arguments); if (mod && mod.__isStub) return new Proxy(r, { get: function(t,p) { return p in t ? t[p] : function() {} } }); return r; };'
    )
    await fs.promises.writeFile(outFile, code, 'utf8')

    const project = loadCjs(outFile)
    const cleaned = stripEmptyDefaults(project)

    // Also capture app.js if it exists (root element: onRender, metadata, etc.)
    const appPath = path.join(absProjectDir, 'app.js')
    if (fs.existsSync(appPath)) {
      const appOutFile = path.join(buildDir, 'app_bundle.cjs')
      try {
        await bundleEntry(appPath, appOutFile, external)
        let appCode = await fs.promises.readFile(appOutFile, 'utf8')
        appCode = appCode.replace(
          /var __toESM\s*=\s*([^;]+);/,
          'var __origToESM = $1; var __toESM = function(mod) { var r = __origToESM.apply(null, arguments); if (mod && mod.__isStub) return new Proxy(r, { get: function(t,p) { return p in t ? t[p] : function() {} } }); return r; };'
        )
        await fs.promises.writeFile(appOutFile, appCode, 'utf8')
        const appModule = loadCjs(appOutFile)
        if (appModule && Object.keys(appModule).length > 0) {
          cleaned.app = stripEmptyDefaults(appModule)
        }
      } catch (e) {
        // app.js bundle failed — skip silently, context still works
      }
    }

    return stringify ? stringifyFunctions(cleaned) : cleaned
  } finally {
    try {
      await fs.promises.rm(buildDir, { recursive: true, force: true })
    } catch (_) {}
  }
}
