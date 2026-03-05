'use strict'

/**
 * Renders a Symbols project (rita) into static HTML files.
 *
 * Takes the DomQL source — pages, components, designSystem —
 * and produces fully rendered HTML with data-br keys on every element.
 *
 * Usage: node render.js [route]
 *   node render.js          → renders all routes
 *   node render.js /        → renders home only
 *   node render.js /about   → renders about only
 */

import { resolve } from 'path'
import { writeFileSync, mkdirSync } from 'fs'
import { render, generateHeadHtml, loadProject } from '@domql/brender'

const RITA_PATH = resolve(import.meta.dirname, '../../../../next/rita')
const OUT_DIR = resolve(import.meta.dirname, 'dist')

const requestedRoute = process.argv[2]

const data = await loadProject(RITA_PATH)
const routes = requestedRoute ? [requestedRoute] : Object.keys(data.pages)

console.log(`Rendering ${routes.length} route(s) from rita...\n`)

for (const route of routes) {
  if (!data.pages[route]) {
    console.error(`  Route "${route}" not found in pages`)
    continue
  }

  const result = await render(data, { route })
  const headHtml = generateHeadHtml(result.metadata)

  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
${headHtml}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
</head>
<body>
${result.html}
</body>
</html>`

  // Write to dist/
  const fileName = route === '/' ? 'index' : route.slice(1).replace(/\//g, '-')
  const outPath = resolve(OUT_DIR, `${fileName}.html`)
  mkdirSync(OUT_DIR, { recursive: true })
  writeFileSync(outPath, fullHtml, 'utf-8')

  const brKeys = Object.keys(result.registry)
  console.log(`  ${route}`)
  console.log(`    → ${outPath}`)
  console.log(`    → ${result.html.length} chars, ${brKeys.length} data-br keys`)
  console.log()
}

console.log('Done.')
