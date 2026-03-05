'use strict'

/**
 * Inspects a rendered rita page — shows the element tree,
 * data-br key mapping, and how each DomQL node maps to HTML.
 *
 * Useful for debugging brender output and verifying
 * that the source DomQL structure is preserved in the HTML.
 *
 * Usage: node inspect.js [route]
 */

import { resolve } from 'path'
import { render, loadProject } from '@symbo.ls/brender'

const RITA_PATH = resolve(import.meta.dirname, '../../../../next/rita')
const route = process.argv[2] || '/'

const data = await loadProject(RITA_PATH)
const result = await render(data, { route })

console.log(`Route: ${route}`)
console.log(`HTML: ${result.html.length} chars`)
console.log(`Registry: ${Object.keys(result.registry).length} elements`)
console.log(`Metadata: ${JSON.stringify(result.metadata, null, 2)}`)
console.log()

// ── Element tree ───────────────────────────────────────────────────────────

console.log('Element Tree:\n')

const printTree = (el, depth = 0) => {
  if (!el || !el.__ref) return
  const indent = '  '.repeat(depth)
  const tag = el.node?.tagName?.toLowerCase() || 'div'
  const brKey = el.__ref.__brKey || '—'
  const key = el.key || el.__ref.__key || ''
  const text = el.node?.textContent?.slice(0, 30) || ''
  const extendsName = el.props?.extends || ''

  let line = `${indent}${key} <${tag}> [${brKey}]`
  if (extendsName) line += ` extends:${extendsName}`
  if (text && !el.__ref?.__children?.length) line += ` "${text}"`

  console.log(line)

  if (el.__ref.__children) {
    for (const childKey of el.__ref.__children) {
      if (el[childKey]?.__ref) printTree(el[childKey], depth + 1)
    }
  }
}

printTree(result.element)

// ── Raw HTML preview ───────────────────────────────────────────────────────

console.log('\n\nHTML Preview (first 1500 chars):\n')
console.log(result.html.slice(0, 1500))
if (result.html.length > 1500) console.log('\n...')
