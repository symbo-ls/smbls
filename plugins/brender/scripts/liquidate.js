'use strict'

/**
 * Liquidation: the reverse of rendering.
 * Simulates what happens in the browser when pre-rendered HTML
 * gets reconnected to live DOMQL elements.
 *
 * Flow:
 *   1. Render project -> HTML with data-br keys
 *   2. Parse that HTML into DOM (simulating browser)
 *   3. Re-create DOMQL element tree (extends-only, no DOM creation)
 *   4. Hydrate: walk DOMQL tree, match data-br keys to real DOM nodes
 *   5. Verify: every DOMQL element now owns its DOM node
 *
 * Usage:
 *   node liquidate.js <project> [route]
 *   node liquidate.js rita /
 *   node liquidate.js rita /about
 */

import { resolve } from 'path'
import { parseHTML } from 'linkedom'
import { renderElement, collectBrNodes, hydrate } from '../index.js'
import { loadProject } from '../load.js'
import createInstance from '@emotion/css/create-instance'

const [projectName, requestedRoute] = process.argv.slice(2)

if (!projectName) {
  console.error('Usage: node liquidate.js <project> [route]')
  process.exit(1)
}

const projectPath = resolve(import.meta.dirname, '..', 'examples', projectName)
const route = requestedRoute || '/'

console.log(`\n  Liquidation experiment: ${projectName} "${route}"\n`)

// ── Step 1: Server render ───────────────────────────────────────────────────

console.log('  Step 1: Render DOMQL -> HTML (server side)\n')

const data = await loadProject(projectPath)
const pageDef = data.pages[route]

if (!pageDef) {
  console.error(`    Route "${route}" not found. Available:`, Object.keys(data.pages))
  process.exit(1)
}

const context = {
  components: data.components,
  snippets: data.snippets || {},
  designSystem: data.designSystem,
  state: data.state,
  functions: data.functions || {},
  methods: data.methods || {}
}

const renderResult = await renderElement(pageDef, { context })
const brKeyCount = Object.keys(renderResult.registry).length

console.log(`    HTML: ${renderResult.html.length} chars`)
console.log(`    data-br keys assigned: ${brKeyCount}`)
console.log()

// ── Step 2: Parse HTML (simulating the browser receiving the page) ────────

console.log('  Step 2: Parse HTML into DOM (simulating browser)\n')

const { document } = parseHTML(`<html><body>${renderResult.html}</body></html>`)
const body = document.body
const brNodes = collectBrNodes(body)
const brNodeKeys = Object.keys(brNodes)

console.log(`    DOM nodes with data-br: ${brNodeKeys.length}`)
console.log(`    Sample: ${brNodeKeys.slice(0, 5).join(', ')}...`)
console.log()

// ── Step 3: Re-create DOMQL tree (extends-only, no DOM) ──────────────────
// In the real browser, this is what happens when the app JS loads:
// DOMQL creates the element tree from the same source definitions,
// but with onlyResolveExtends mode — it resolves the component
// hierarchy without touching the DOM.
//
// For this simulation, we already have the element tree from Step 1.
// In production, you'd call:
//   create(pageDef, parent, 'root', { onlyResolveExtends: true, context })

console.log('  Step 3: DOMQL element tree ready\n')

const elementTree = renderResult.element

// Count elements in the tree
let elementCount = 0
const countElements = (el) => {
  if (!el || !el.__ref) return
  elementCount++
  if (el.__ref.__children) {
    for (const childKey of el.__ref.__children) {
      const child = el[childKey]
      if (child?.__ref) countElements(child)
    }
  }
}
countElements(elementTree)
console.log(`    DOMQL elements: ${elementCount}`)
console.log(`    Root key: ${elementTree.key}`)
console.log(`    Root tag: <${elementTree.tag}>`)
console.log()

// ── Step 4: Hydrate — match data-br keys to DOM nodes ────────────────────

console.log('  Step 4: Hydrate — remap DOMQL elements to DOM nodes\n')

// Initialize emotion for CSS class generation
const emotion = createInstance({ key: 'br' })

const { element: hydrated, linked: hydratedLinked, unlinked: hydratedUnlinked } = hydrate(elementTree, {
  root: body,
  renderEvents: false,
  emotion,
  designSystem: data.designSystem
})

// Walk and verify
let linked = 0
let unlinked = 0
const linkDetails = []

const verifyWalk = (el, path = '') => {
  if (!el || !el.__ref) return
  const currentPath = path ? `${path}.${el.key}` : el.key
  const brKey = el.__ref.__brKey

  if (brKey && el.node) {
    linked++
    const tag = el.node.tagName?.toLowerCase() || '?'
    const textPreview = el.node.textContent?.slice(0, 50) || ''
    linkDetails.push({ brKey, path: currentPath, tag, text: textPreview })
  } else if (brKey) {
    unlinked++
    linkDetails.push({ brKey, path: currentPath, tag: '?', text: 'UNLINKED' })
  }

  if (el.__ref.__children) {
    for (const childKey of el.__ref.__children) {
      const child = el[childKey]
      if (child?.__ref) verifyWalk(child, currentPath)
    }
  }
}
verifyWalk(hydrated)

console.log(`    Linked:   ${linked} elements`)
console.log(`    Unlinked: ${unlinked} elements`)
console.log()

// ── Step 5: Show the mapping ─────────────────────────────────────────────

console.log('  Step 5: data-br -> DOMQL element mapping\n')

const sample = linkDetails.slice(0, 20)
for (const { brKey, path, tag, text } of sample) {
  const preview = text.length > 40 ? text.slice(0, 40) + '...' : text
  console.log(`    ${brKey.padEnd(8)} <${tag.padEnd(8)}> ${path}`)
  if (preview) console.log(`${''.padEnd(22)}${preview}`)
}
if (linkDetails.length > 20) {
  console.log(`    ... and ${linkDetails.length - 20} more`)
}

console.log()

// ── Step 6: Demonstrate live mutation ────────────────────────────────────

console.log('  Step 6: Mutate via DOMQL (proves elements own their nodes)\n')

// Find a text element to mutate
const textEl = linkDetails.find(d => d.text && d.text.length > 5 && d.tag !== 'svg')
if (textEl) {
  const el = Object.values(renderResult.registry).find(
    e => e.__ref?.__brKey === textEl.brKey
  )
  if (el?.node) {
    const before = el.node.textContent?.slice(0, 50)
    el.node.textContent = '[LIQUIDATED] ' + before
    const after = el.node.textContent?.slice(0, 60)
    console.log(`    Target: ${textEl.brKey} (${textEl.path})`)
    console.log(`    Before: "${before}"`)
    console.log(`    After:  "${after}"`)
    console.log()

    // Verify it changed in the actual DOM too
    const domNode = brNodes[textEl.brKey]
    console.log(`    DOM check: "${domNode.textContent?.slice(0, 60)}"`)
    console.log(`    Same ref:  ${domNode === el.node}`)
  }
}

console.log('\n  Liquidation complete.')
console.log('  DOMQL tree owns the DOM. Updates flow through elements, not innerHTML.\n')
