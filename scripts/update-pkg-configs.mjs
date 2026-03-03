/**
 * Standardize all package.json files in packages/ and plugins/ for modern
 * ESM, CJS, and IIFE (browser) builds.
 *
 * Targets: Node (CJS/require), Bundlers (ESM/import), CDNs (IIFE unpkg/jsdelivr/esm.sh/skypack)
 */

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve, dirname, relative } from 'path'
import { globSync } from 'glob'
import { readdirSync } from 'fs'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// Packages that should NOT get build scripts (CLI tools, servers, scaffolding, browser-ext, UI-only sources)
const NO_BUILD = new Set([
  '@symbo.ls/cli',
  '@symbo.ls/socket',
  '@symbo.ls/inspect2',
  '@symbo.ls/init',
  'create-smbls',
  // old plugins that have no source build
  '@symbo.ls/helmet',
  '@symbo.ls/markdown',
  '@symbo.ls/scriptjs',
  '@symbo.ls/editorjs',
  '@symbo.ls/google-maps',
  '@symbo.ls/threejs',
  '@symbo.ls/convert',
  // feather/fluent/material icons are plain JS data files
  '@symbo.ls/feather-icons',
  '@symbo.ls/fluent-icons',
  '@symbo.ls/material-icons',
])

// Packages that are pure source pass-through (UI components that consumers bundle)
// They get proper exports/main fields but no build scripts
const SOURCE_PASSTHROUGH = new Set([
  '@symbo.ls/atoms',
  '@symbo.ls/avatar',
  '@symbo.ls/button',
  '@symbo.ls/datepicker',
  '@symbo.ls/dialog',
  '@symbo.ls/dropdown',
  '@symbo.ls/icon',
  '@symbo.ls/input',
  '@symbo.ls/link',
  '@symbo.ls/notification',
  '@symbo.ls/preview',
  '@symbo.ls/range',
  '@symbo.ls/select',
  '@symbo.ls/timepicker',
  '@symbo.ls/tooltip',
  '@symbo.ls/uikit',
  '@symbo.ls/default-config',
  '@symbo.ls/emotion',
  '@domql/parse',
])

// Derive a global IIFE name from a package name
function globalName(pkgName) {
  const name = pkgName.replace(/^@domql\//, 'domql-').replace(/^@symbo\.ls\//, 'smbls-')
  return name
    .replace(/[-_./]([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/^[a-z]/, c => c.toUpperCase())
}

// Detect the entry point JS file relative to pkgDir
function detectEntry(pkgDir, pkg) {
  const candidates = [
    pkg.source,
    'index.js',
    'src/index.js',
  ].filter(Boolean)
  for (const c of candidates) {
    if (existsSync(resolve(pkgDir, c))) return c
  }
  return 'index.js'
}

// Detect all JS glob patterns for esbuild (top-level + known subdirs)
function buildGlobs(pkgDir, entry) {
  const extras = []
  for (const sub of ['methods', 'mixins', 'utils', 'src']) {
    if (existsSync(resolve(pkgDir, sub)) && sub !== 'src') {
      extras.push(`${sub}/*.js`)
    }
  }
  // if entry is in src/, build all src/*.js
  const entryGlob = entry.startsWith('src/') ? 'src/*.js' : '*.js'
  return [entryGlob, ...extras].join(' ')
}

// Relative path from pkgDir to the root build/ dir
function buildRelPath(pkgDir) {
  return relative(pkgDir, resolve(ROOT, 'build')).replace(/\\/g, '/')
}

function processPackage(pkgJsonPath) {
  const pkgDir = dirname(pkgJsonPath)
  const pkg = JSON.parse(readFileSync(pkgJsonPath, 'utf8'))
  const name = pkg.name

  if (!name) return // no name, skip

  const noBuild = NO_BUILD.has(name)
  const passthrough = SOURCE_PASSTHROUGH.has(name)

  const entry = detectEntry(pkgDir, pkg)
  const isInSrc = entry.startsWith('src/')
  const outEntry = 'index.js' // always output as index.js in dist subdirs
  const buildPath = buildRelPath(pkgDir)
  const globs = buildGlobs(pkgDir, entry)
  const gName = globalName(name)

  // ── Standard metadata fields ────────────────────────────────────────────
  pkg.type = 'module'
  pkg.source = entry

  if (noBuild) {
    // Just ensure type:module, don't touch entry points
    writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n')
    console.log(`⏭  skipped (no-build)  ${name}`)
    return
  }

  if (passthrough) {
    // Source pass-through: main/module point to source, simple exports
    pkg.main = entry
    pkg.module = entry
    pkg.exports = {
      '.': {
        import: `./${entry}`,
        default: `./${entry}`
      }
    }
    delete pkg.browser
    delete pkg.unpkg
    delete pkg.jsdelivr
    writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n')
    console.log(`⏩  passthrough          ${name}`)
    return
  }

  // ── Full build package ──────────────────────────────────────────────────
  pkg.main = './dist/cjs/index.js'
  pkg.module = './dist/esm/index.js'
  pkg.browser = './dist/iife/index.js'
  pkg.unpkg = './dist/iife/index.js'
  pkg.jsdelivr = './dist/iife/index.js'
  pkg.sideEffects = false

  // Exports map
  const hasMethodsDir = existsSync(resolve(pkgDir, 'methods'))
  // Packages with multiple top-level JS files expose them as subpaths
  const topLevelFiles = !isInSrc
    ? globSync('*.js', { cwd: pkgDir }).filter(f => f !== 'index.js')
    : []
  const hasMultipleTopLevel = topLevelFiles.length > 0

  pkg.exports = {
    '.': {
      import: './dist/esm/index.js',
      require: './dist/cjs/index.js',
      browser: './dist/iife/index.js',
      default: './dist/esm/index.js'
    }
  }

  // Wildcard for packages with multiple top-level files (e.g. @domql/utils)
  if (hasMultipleTopLevel) {
    pkg.exports['./*.js'] = {
      import: './dist/esm/*.js',
      require: './dist/cjs/*.js',
      default: './dist/esm/*.js'
    }
    // Also add bare subpath (without .js extension) for clean imports
    pkg.exports['./*'] = {
      import: './dist/esm/*.js',
      require: './dist/cjs/*.js',
      default: './dist/esm/*.js'
    }
  }

  // Methods subdir (only if index.js exists inside it)
  if (hasMethodsDir && existsSync(resolve(pkgDir, 'methods/index.js'))) {
    pkg.exports['./methods'] = {
      import: './dist/esm/methods/index.js',
      require: './dist/cjs/methods/index.js',
      default: './dist/esm/methods/index.js'
    }
  }

  // Files
  pkg.files = ['dist', '*.js', ...(isInSrc ? ['src'] : [])]
    .filter((v, i, a) => a.indexOf(v) === i)

  // ── Build scripts ───────────────────────────────────────────────────────
  const target = isInSrc ? 'src/*.js' : globs
  const NODE_ENV = '--define:process.env.NODE_ENV=process.env.NODE_ENV'

  const esmCmd = `npx cross-env NODE_ENV=$NODE_ENV npx esbuild ${target} --target=es2020 --format=esm --outdir=dist/esm ${NODE_ENV}`
  const cjsCmd = `npx cross-env NODE_ENV=$NODE_ENV npx esbuild ${target} --target=node18 --format=cjs --outdir=dist/cjs ${NODE_ENV}`
  const iifeCmd = `npx cross-env NODE_ENV=$NODE_ENV npx esbuild ${entry} --bundle --target=es2020 --format=iife --global-name=${gName} --outfile=dist/iife/index.js ${NODE_ENV}`
  const copyCmd = `cp ${buildPath}/package-cjs.json dist/cjs/package.json`

  pkg.scripts = {
    ...(pkg.scripts || {}),
    'build:esm': esmCmd,
    'build:cjs': cjsCmd,
    'build:iife': iifeCmd,
    'build': 'npx rimraf dist && npm run build:esm && npm run build:cjs && npm run build:iife',
    'copy:package:cjs': copyCmd,
    'prepublish': 'npm run build && npm run copy:package:cjs'
  }

  // Remove stale/conflicting script keys
  delete pkg.scripts['build:cjs:bundle']

  writeFileSync(pkgJsonPath, JSON.stringify(pkg, null, 2) + '\n')
  console.log(`✅ updated               ${name}`)
}

// ── Main ────────────────────────────────────────────────────────────────────
const pkgJsonPaths = globSync(
  [
    'packages/*/package.json',
    'packages/*/*/package.json',
    'plugins/*/package.json',
  ],
  { cwd: ROOT, absolute: true }
).filter(p => !p.includes('/node_modules/') && !p.includes('/dist/'))

let updated = 0, skipped = 0
for (const p of pkgJsonPaths) {
  try {
    processPackage(p)
    updated++
  } catch (e) {
    console.error(`❌ ${p}: ${e.message}`)
    skipped++
  }
}

console.log(`\nDone: ${updated} updated, ${skipped} errors`)
