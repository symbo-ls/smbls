'use strict'

import fs from 'fs'
import path from 'path'

/**
 * Detect if a directory is a v2 Symbols project.
 * v2 markers: .symbols/ cache dir, old smbls/ source dir, or symbols/ without app.js / create() call.
 */
export function detectV2Project (cwd = process.cwd()) {
  const symbolsDir = path.join(cwd, 'symbols')
  const legacySmblsDir = path.join(cwd, 'smbls')  // old dir name
  const hasSymbolsJson = fs.existsSync(path.join(cwd, 'symbols.json'))
  const hasLegacyCacheDir = fs.existsSync(path.join(cwd, '.symbols'))
  const hasLegacySmblsDir = fs.existsSync(legacySmblsDir)
  const hasSymbolsDir = fs.existsSync(symbolsDir)

  // Resolve which source dir to inspect
  const srcDir = hasLegacySmblsDir ? legacySmblsDir : symbolsDir
  const hasSrcDir = hasLegacySmblsDir || hasSymbolsDir
  const hasAppJs = hasSrcDir && fs.existsSync(path.join(srcDir, 'app.js'))
  const hasIndexJs = hasSrcDir && fs.existsSync(path.join(srcDir, 'index.js'))
  const hasCreateCall = hasIndexJs && fs.readFileSync(path.join(srcDir, 'index.js'), 'utf8').includes('create(')

  const isV2 = hasLegacyCacheDir || hasLegacySmblsDir || (hasSrcDir && !hasAppJs) || (hasIndexJs && !hasCreateCall)

  return {
    isV2,
    hasLegacyCacheDir,
    hasLegacySmblsDir,
    hasSymbolsJson,
    hasSrcDir,
    srcDir,
    hasAppJs,
    hasIndexJs,
    hasCreateCall
  }
}

/**
 * Context modules that get imported and re-exported from context.js.
 * Each shared library and the main symbols folder share this structure.
 */
export const CONTEXT_MODULES = [
  { name: 'state', path: './state.js', style: 'default' },
  { name: 'dependencies', path: './dependencies.js', style: 'default' },
  { name: 'components', path: './components/index.js', style: 'namespace' },
  { name: 'snippets', path: './snippets/index.js', style: 'namespace' },
  { name: 'pages', path: './pages/index.js', style: 'default' },
  { name: 'functions', path: './functions/index.js', style: 'namespace' },
  { name: 'methods', path: './methods/index.js', style: 'namespace' },
  { name: 'designSystem', path: './designSystem/index.js', style: 'default' },
  { name: 'files', path: './files/index.js', style: 'default' },
  { name: 'sharedLibraries', path: './sharedLibraries.js', style: 'default' },
  { name: 'config', path: './config.js', style: 'default' },
  { name: 'envs', path: './envs.js', style: 'default' }
]

/**
 * Generate context.js content based on which modules exist in srcDir.
 */
export function generateContextJs (srcDir, modules = CONTEXT_MODULES) {
  const present = modules.filter(m => fs.existsSync(path.join(srcDir, m.path.replace('./', ''))))

  if (!present.length) return null

  const imports = present.map(m =>
    m.style === 'namespace'
      ? `import * as ${m.name} from '${m.path}'`
      : `import ${m.name} from '${m.path}'`
  ).join('\n')

  const contextKeys = present.map(m => m.name === 'config' ? '  ...config' : `  ${m.name}`).join(',\n')

  return `${imports}

export default {
${contextKeys}
}
`
}

/**
 * Generate new v3 symbols/index.js content based on which files exist in srcDir.
 */
export function generateV3IndexJs (srcDir, { isCdnMode = false } = {}) {
  const smblsImport = isCdnMode ? '' : "import { create } from 'smbls'\n"

  return `${smblsImport}import app from './app.js'
import context from './context.js'

create(app, context)
`
}
