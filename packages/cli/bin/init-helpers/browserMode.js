'use strict'

import fs from 'fs'
import path from 'path'

const CDN_BASE = {
  'esm.sh': pkg => `https://esm.sh/${pkg}`,
  'unpkg': pkg => `https://unpkg.com/${pkg}?module`,
  'skypack': pkg => `https://cdn.skypack.dev/${pkg}`,
  'jsdelivr': pkg => `https://cdn.jsdelivr.net/npm/${pkg}/+esm`,
  'pkg.symbo.ls': pkg => `https://pkg.symbo.ls/${pkg}`
}

export const CDN_PMs = new Set(['esm.sh', 'unpkg', 'skypack', 'jsdelivr', 'pkg.symbo.ls'])

export function isCdnMode (runtime, packageManager) {
  return runtime === 'browser' || CDN_PMs.has(packageManager)
}

/**
 * Patch symbols/index.js and symbols/index.html for browser/CDN mode:
 * - Removes `import { create } from 'smbls'` (create is exposed as a global via HTML)
 * - Injects importmap + globals script into the HTML
 */
export function patchProjectForBrowserMode (symbolsDir, packageManager) {
  // 1. Strip smbls import from index.js
  const indexJsPath = path.join(symbolsDir, 'index.js')
  if (fs.existsSync(indexJsPath)) {
    const src = fs.readFileSync(indexJsPath, 'utf8')
    const patched = src.replace(/^import \{ create \} from 'smbls'\n\n?/m, '')
    if (patched !== src) fs.writeFileSync(indexJsPath, patched)
  }

  // 2. Inject importmap + globals into index.html
  const indexHtmlPath = path.join(symbolsDir, 'index.html')
  if (!fs.existsSync(indexHtmlPath)) return
  const html = fs.readFileSync(indexHtmlPath, 'utf8')
  if (html.includes('type="importmap"')) return

  const fmt = CDN_BASE[packageManager] || CDN_BASE['esm.sh']
  const importmap = `<script type="importmap">\n${JSON.stringify({ imports: { smbls: fmt('smbls') } }, null, 2)}\n</script>`
  const globalsScript = `  <script type="module">
    import * as smbls from 'smbls'
    Object.assign(globalThis, smbls)
  </script>`
  const tag = `  ${importmap}\n${globalsScript}`
  const injected = html.includes('</head>')
    ? html.replace('</head>', `${tag}\n</head>`)
    : html.replace('<body', `${tag}\n<body`)
  fs.writeFileSync(indexHtmlPath, injected)
}
