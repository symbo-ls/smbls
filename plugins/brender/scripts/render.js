'use strict'

/**
 * Renders a Symbols project via brender (DOMQL -> HTML).
 * Outputs: HTML file, element tree JSON, and a liquidate.html
 * that demonstrates browser-side hydration.
 *
 * Usage:
 *   node render.js <project>          -> render all routes
 *   node render.js <project> <route>  -> render specific route
 *
 * Examples:
 *   node render.js survey
 *   node render.js rita /
 */

import { resolve } from 'path'
import { writeFileSync, mkdirSync } from 'fs'
import { renderElement } from '../index.js'
import { loadProject } from '../load.js'

const [projectName, requestedRoute] = process.argv.slice(2)

if (!projectName) {
  console.error('Usage: node render.js <project> [route]')
  console.error('  e.g. node render.js survey')
  process.exit(1)
}

const examplesDir = resolve(import.meta.dirname, '..', 'examples')
const projectPath = resolve(examplesDir, projectName)
const outDir = resolve(examplesDir, `${projectName}_built`)

console.log(`Loading ${projectName}...`)
const data = await loadProject(projectPath)

console.log('Project loaded:')
console.log('  pages:', Object.keys(data.pages))
console.log('  components:', Object.keys(data.components))
console.log('  state keys:', Object.keys(data.state).length)
console.log('  designSystem keys:', Object.keys(data.designSystem))
console.log()

const routes = requestedRoute ? [requestedRoute] : Object.keys(data.pages)

console.log(`Rendering ${routes.length} route(s)...\n`)

for (const route of routes) {
  const pageDef = data.pages[route]
  if (!pageDef) {
    console.error(`  Route "${route}" not found`)
    continue
  }

  try {
    const result = await renderElement(pageDef, {
      context: {
        components: data.components,
        snippets: data.snippets || {},
        designSystem: data.designSystem,
        state: data.state,
        functions: data.functions || {},
        methods: data.methods || {}
      }
    })

    const fileName = route === '/' ? 'index' : route.slice(1).replace(/\//g, '-')
    mkdirSync(outDir, { recursive: true })

    // 1. Static HTML
    const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${projectName} - ${route}</title>
</head>
<body>
${result.html}
</body>
</html>`
    const outPath = resolve(outDir, `${fileName}.html`)
    writeFileSync(outPath, fullHtml, 'utf-8')

    // 2. Element tree JSON
    const treePath = resolve(outDir, `${fileName}-tree.json`)
    const tree = extractTree(result.element)
    writeFileSync(treePath, JSON.stringify(tree, null, 2), 'utf-8')

    // 3. Registry map (br-key -> element path) for hydration
    const registryPath = resolve(outDir, `${fileName}-registry.json`)
    const registryMap = {}
    for (const [brKey, el] of Object.entries(result.registry)) {
      registryMap[brKey] = {
        key: el.key,
        tag: el.tag || el.node?.tagName?.toLowerCase(),
        path: el.__ref?.path?.join('.') || el.key,
        text: el.text != null ? String(el.text).slice(0, 60) : undefined
      }
    }
    writeFileSync(registryPath, JSON.stringify(registryMap, null, 2), 'utf-8')

    const brKeys = Object.keys(result.registry)
    console.log(`  ${route}`)
    console.log(`    -> ${outPath}`)
    console.log(`    -> ${result.html.length} chars, ${brKeys.length} data-br keys`)
    console.log(`    -> tree: ${treePath}`)
    console.log(`    -> registry: ${registryPath}`)
    console.log()
  } catch (err) {
    console.error(`  Error rendering ${route}:`, err.message)
    console.error(err.stack)
  }
}

console.log('Done.')

function extractTree(el, depth = 0) {
  if (!el || depth > 15) return null

  const result = {
    tag: el.tag || el.node?.tagName?.toLowerCase(),
    key: el.key,
  }

  if (el.props) result.props = el.props
  if (el.text != null) result.text = el.text
  if (el.__ref?.extends) result.extends = el.__ref.extends
  if (el.__ref?.__brKey) result.brKey = el.__ref.__brKey

  const children = {}
  for (const [key, child] of Object.entries(el)) {
    if (
      child &&
      typeof child === 'object' &&
      child.node &&
      key !== 'parent' &&
      key !== '__ref' &&
      key !== 'context' &&
      key !== 'state' &&
      !key.startsWith('_')
    ) {
      children[key] = extractTree(child, depth + 1)
    }
  }

  if (Object.keys(children).length > 0) {
    result.children = children
  }

  return result
}
