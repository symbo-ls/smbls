'use strict'

/**
 * Demonstrates the liquidation flow — the reverse of rendering.
 *
 * 1. Renders a rita page to HTML (with data-br keys)
 * 2. Simulates what the browser does: parses that HTML
 * 3. Uses hydrate() to reconnect data-br nodes back to DomQL elements
 * 4. Verifies that every DomQL element is now linked to its DOM node
 *
 * This is what happens on the client when qsql "liquidates" a
 * pre-rendered page — the static HTML becomes a live DomQL tree
 * that can be queried and updated without re-rendering.
 *
 * Usage: node liquidate.js [route]
 */

import { resolve } from 'path'
import { parseHTML } from 'linkedom'
import { render, loadProject, collectBrNodes, hydrate } from '@domql/brender'

const RITA_PATH = resolve(import.meta.dirname, '../../../../next/rita')
const route = process.argv[2] || '/'

const data = await loadProject(RITA_PATH)

// ── Step 1: Render DomQL → HTML ────────────────────────────────────────────

console.log(`Step 1: Render "${route}" to HTML\n`)

const result = await render(data, { route })
const brKeys = Object.keys(result.registry)

console.log(`  HTML: ${result.html.length} chars`)
console.log(`  data-br keys: ${brKeys.length} elements tagged`)
console.log()

// ── Step 2: Parse HTML (simulating the browser) ────────────────────────────

console.log('Step 2: Parse HTML into DOM (simulating browser)\n')

const { document } = parseHTML(`<html><body>${result.html}</body></html>`)
const body = document.body
const brNodes = collectBrNodes(body)
const brNodeKeys = Object.keys(brNodes)

console.log(`  DOM nodes with data-br: ${brNodeKeys.length}`)
console.log(`  Sample keys: ${brNodeKeys.slice(0, 5).join(', ')}...`)
console.log()

// ── Step 3: Hydrate — reconnect DOM nodes to DomQL elements ───────────────

console.log('Step 3: Hydrate — link DOM nodes back to DomQL elements\n')

const hydrated = hydrate(result.element, { root: body })

// Walk the element tree and count successful links
let linked = 0
let unlinked = 0

const walk = (el) => {
  if (!el || !el.__ref) return
  if (el.__ref.__brKey && el.node) linked++
  else if (el.__ref.__brKey) unlinked++
  if (el.__ref.__children) {
    for (const childKey of el.__ref.__children) {
      if (el[childKey]?.__ref) walk(el[childKey])
    }
  }
}
walk(hydrated)

console.log(`  Linked: ${linked} elements`)
console.log(`  Unlinked: ${unlinked} elements`)
console.log()

// ── Step 4: Verify — show the mapping ──────────────────────────────────────

console.log('Step 4: Verify data-br → DomQL mapping\n')

const entries = Object.entries(result.registry).slice(0, 12)
for (const [key, el] of entries) {
  const tag = el.node?.tagName?.toLowerCase() || '?'
  const text = el.node?.textContent?.slice(0, 40) || ''
  const childCount = el.__ref?.__children?.length || 0
  console.log(`  ${key} → <${tag}> ${childCount ? `(${childCount} children)` : ''} ${text ? `"${text}"` : ''}`)
}
if (brKeys.length > 12) console.log(`  ... and ${brKeys.length - 12} more`)

console.log('\nLiquidation complete — DomQL tree owns the DOM.')
console.log('qsql can now query and update elements without re-rendering.')
