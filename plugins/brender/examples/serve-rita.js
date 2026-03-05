'use strict'

/**
 * Dev server for rita — demonstrates full brender SSR pipeline.
 *
 * 1. Loads project data from examples/rita/symbols
 * 2. Pre-renders all routes to complete HTML pages (with CSS, metadata, fonts)
 * 3. Serves them via a simple HTTP router
 *
 * Usage: node serve-rita.js [port]
 */

import { createServer } from 'http'
import { resolve } from 'path'
import { renderPage } from '../index.js'
import { loadProject } from '../load.js'

const DEFAULT_PORT = process.argv[2] || 3456
const projectPath = resolve(import.meta.dirname)

// ── Load project ────────────────────────────────────────────────────────────

console.log('Loading rita project...')
const data = await loadProject(resolve(projectPath, 'rita'))

const routes = Object.keys(data.pages)
console.log('Routes:', routes)

// ── Pre-render all routes ───────────────────────────────────────────────────

const rendered = {}
for (const route of routes) {
  try {
    const result = await renderPage(data, route, {
      themeColor: '#ffffff'
    })
    if (result) {
      rendered[route] = result.html
      console.log(`  ${route} -> ${result.html.length} chars, ${result.brKeyCount} keys`)
    }
  } catch (err) {
    console.error(`  ${route} ERROR:`, err.message)
  }
}

// ── HTTP server ─────────────────────────────────────────────────────────────

const server = createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost')
  const route = url.pathname

  const page = rendered[route] || rendered['/']

  if (page) {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' })
    res.end(page)
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
  }
})

const tryListen = (port) => {
  server.listen(port, () => {
    console.log(`\n  brender dev server running at http://localhost:${port}`)
    console.log(`  routes: ${routes.join(', ')}\n`)
  })
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    const next = parseInt(DEFAULT_PORT) + Math.floor(Math.random() * 100) + 1
    console.log(`  Port ${DEFAULT_PORT} in use, trying ${next}...`)
    tryListen(next)
  } else {
    throw err
  }
})

tryListen(DEFAULT_PORT)
