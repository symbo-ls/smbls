'use strict'

/**
 * Dev server for rita — demonstrates full brender liquidation in a real browser.
 *
 * 1. Pre-renders rita "/" to HTML with data-br keys (server)
 * 2. Serves that HTML with an inline <script> (dev server)
 * 3. Browser: creates DomQL tree with onlyResolveExtends (no DOM creation)
 * 4. Browser: hydrates — remaps data-br nodes to DomQL elements
 * 5. Browser: events are bound, lifecycle fires, routing works
 *
 * Usage: node serve.js [port]
 */

import { createServer } from 'http'
import { resolve } from 'path'
import { readFileSync } from 'fs'
import { parseHTML } from 'linkedom'
import createInstance from '@emotion/css/create-instance'
import { renderElement, hydrate } from '../index.js'
import { loadProject } from '../load.js'

const DEFAULT_PORT = process.argv[2] || 3456
const projectPath = resolve(import.meta.dirname)

// ── Load project data ──────────────────────────────────────────────────────

console.log('Loading rita project...')
const data = await loadProject(resolve(projectPath, 'rita'))

const routes = Object.keys(data.pages)
console.log('Routes:', routes)

// Serialize project data for client — strip functions (can't serialize),
// keep the structure so the client can re-build the element tree
const serializeProjectData = () => {
  const serializable = {
    pages: {},
    components: {},
    state: data.state || {},
    designSystem: data.designSystem || {}
  }

  // Deep-serialize, converting functions to markers
  const serialize = (obj, path = '') => {
    if (obj === null || obj === undefined) return obj
    if (typeof obj === 'function') return { __fn: true, name: obj.name || 'anonymous' }
    if (Array.isArray(obj)) return obj.map((v, i) => serialize(v, `${path}[${i}]`))
    if (typeof obj !== 'object') return obj

    const result = {}
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'node' || key === 'parent' || key === 'context' || key === '__ref') continue
      result[key] = serialize(value, `${path}.${key}`)
    }
    return result
  }

  serializable.pages = serialize(data.pages)
  serializable.components = serialize(data.components)
  return serializable
}

// ── CSS generation helpers ──────────────────────────────────────────────────

const CSS_COLOR_PROPS = new Set([
  'color', 'background', 'backgroundColor', 'borderColor',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'fill', 'stroke'
])

// Props that aren't CSS — HTML attributes and internal DomQL keys
const NON_CSS_PROPS = new Set([
  'href', 'src', 'alt', 'title', 'id', 'name', 'type', 'value', 'placeholder',
  'target', 'rel', 'loading', 'srcset', 'sizes', 'media', 'role', 'tabindex',
  'for', 'action', 'method', 'enctype', 'autocomplete', 'autofocus',
  'theme', '__element', 'update'
])

// DomQL shorthand props that expand to multiple CSS properties
const resolveShorhand = (key, val) => {
  if (key === 'flexAlign' && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    return { display: 'flex', 'align-items': alignItems, 'justify-content': justifyContent }
  }
  if (key === 'gridAlign' && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    return { display: 'grid', 'align-items': alignItems, 'justify-content': justifyContent }
  }
  if (key === 'round' && val) {
    return { 'border-radius': typeof val === 'number' ? val + 'px' : val }
  }
  if (key === 'boxSize' && val) {
    return { width: val, height: val }
  }
  return null
}

const camelToKebab = (str) => str.replace(/[A-Z]/g, m => '-' + m.toLowerCase())

const resolveInnerProps = (obj, colorMap) => {
  const result = {}
  for (const k in obj) {
    const v = obj[k]
    const expanded = resolveShorhand(k, v)
    if (expanded) {
      Object.assign(result, expanded)
      continue
    }
    if (typeof v !== 'string' && typeof v !== 'number') continue
    result[camelToKebab(k)] = CSS_COLOR_PROPS.has(k) && colorMap[v] ? colorMap[v] : v
  }
  return result
}

const buildCSSFromProps = (props, colorMap, mediaMap) => {
  const base = {}
  const mediaRules = {}
  const pseudoRules = {}

  for (const key in props) {
    const val = props[key]

    if (key.charCodeAt(0) === 64 && typeof val === 'object') {
      const breakpoint = mediaMap?.[key.slice(1)]
      if (breakpoint) {
        const inner = resolveInnerProps(val, colorMap)
        if (Object.keys(inner).length) mediaRules[breakpoint] = inner
      }
      continue
    }

    if (key.charCodeAt(0) === 58 && typeof val === 'object') {
      const inner = resolveInnerProps(val, colorMap)
      if (Object.keys(inner).length) pseudoRules[key] = inner
      continue
    }

    if (typeof val !== 'string' && typeof val !== 'number') continue
    if (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) continue
    if (NON_CSS_PROPS.has(key)) continue

    // Resolve DomQL shorthands (flexAlign, round, boxSize, etc.)
    const expanded = resolveShorhand(key, val)
    if (expanded) {
      Object.assign(base, expanded)
      continue
    }

    base[camelToKebab(key)] = CSS_COLOR_PROPS.has(key) && colorMap[val] ? colorMap[val] : val
  }

  return { base, mediaRules, pseudoRules }
}

const renderCSSRule = (selector, { base, mediaRules, pseudoRules }) => {
  const lines = []
  const baseDecls = Object.entries(base).map(([k, v]) => `${k}: ${v}`).join('; ')
  if (baseDecls) lines.push(`${selector} { ${baseDecls}; }`)

  for (const [pseudo, props] of Object.entries(pseudoRules)) {
    const decls = Object.entries(props).map(([k, v]) => `${k}: ${v}`).join('; ')
    if (decls) lines.push(`${selector}${pseudo} { ${decls}; }`)
  }

  for (const [query, props] of Object.entries(mediaRules)) {
    const decls = Object.entries(props).map(([k, v]) => `${k}: ${v}`).join('; ')
    const mq = query.startsWith('@') ? query : `@media ${query}`
    if (decls) lines.push(`${mq} { ${selector} { ${decls}; } }`)
  }

  return lines.join('\n')
}

const extractCSS = (element, designSystem) => {
  const colorMap = designSystem?.color || {}
  const mediaMap = designSystem?.media || {}
  const animations = designSystem?.animation || {}
  const rules = []
  const seen = new Set()
  const usedAnimations = new Set()

  const walk = (el) => {
    if (!el || !el.__ref) return
    const { props } = el
    if (props && el.node) {
      const cls = el.node.getAttribute?.('class')
      if (cls && !seen.has(cls)) {
        seen.add(cls)
        const cssResult = buildCSSFromProps(props, colorMap, mediaMap)
        const hasRules = Object.keys(cssResult.base).length || Object.keys(cssResult.mediaRules).length || Object.keys(cssResult.pseudoRules).length
        if (hasRules) rules.push(renderCSSRule('.' + cls.split(' ')[0], cssResult))

        // Track used animations
        const anim = props.animation || props.animationName
        if (typeof anim === 'string') {
          const name = anim.split(' ')[0]
          if (animations[name]) usedAnimations.add(name)
        }
      }
    }
    if (el.__ref.__children) {
      for (const childKey of el.__ref.__children) {
        if (el[childKey]?.__ref) walk(el[childKey])
      }
    }
  }
  walk(element)

  // Generate @keyframes for used animations
  const keyframes = []
  for (const name of usedAnimations) {
    const frames = animations[name]
    const frameRules = Object.entries(frames).map(([step, props]) => {
      const decls = Object.entries(props).map(([k, v]) => `${camelToKebab(k)}: ${v}`).join('; ')
      return `  ${step} { ${decls}; }`
    }).join('\n')
    keyframes.push(`@keyframes ${name} {\n${frameRules}\n}`)
  }

  return [...keyframes, ...rules].join('\n')
}

// ── Pre-render each route ───────────────────────────────────────────────────

const rendered = {}
for (const route of routes) {
  const pageDef = data.pages[route]
  if (!pageDef) continue

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

    // Build the br-key -> element path registry
    const registry = {}
    for (const [brKey, el] of Object.entries(result.registry)) {
      registry[brKey] = {
        key: el.key,
        tag: el.tag,
        path: el.__ref?.path?.join('.') || el.key
      }
    }

    // Generate CSS: parse HTML, run hydration with emotion, extract styles
    const { document: cssDoc } = parseHTML(`<html><head></head><body>${result.html}</body></html>`)
    const emotion = createInstance({ key: 'smbls', container: cssDoc.head })

    const { linked, unlinked } = hydrate(result.element, {
      root: cssDoc.body,
      renderEvents: false,
      events: false,
      emotion,
      designSystem: data.designSystem
    })

    // Get the styled HTML (with class attributes) and any injected <style> tags
    const styledHtml = cssDoc.body.innerHTML
    const cssText = extractCSS(result.element, data.designSystem)

    rendered[route] = {
      html: styledHtml,
      css: cssText,
      registry,
      brKeyCount: Object.keys(result.registry).length,
      linked,
      unlinked
    }

    console.log(`  ${route} -> ${styledHtml.length} chars, ${Object.keys(result.registry).length} keys, ${linked} styled`)
  } catch (err) {
    console.error(`  ${route} ERROR:`, err.message)
  }
}

// ── Build the full HTML page ────────────────────────────────────────────────

const buildPage = (route) => {
  const r = rendered[route]
  if (!r) return null

  const projectJSON = JSON.stringify(serializeProjectData())
  const registryJSON = JSON.stringify(r.registry)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>rita - brender dev</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter Tight', system-ui, -apple-system, sans-serif; }
    [data-br] { transition: outline 0.2s; }
    [data-br]:hover { outline: 1px dashed rgba(79,70,229,0.3); }
    #br-debug { position: fixed; bottom: 0; left: 0; right: 0; background: #0f172a; color: #e2e8f0; font-family: monospace; font-size: 12px; padding: 8px 16px; z-index: 9999; display: flex; gap: 24px; }
    #br-debug .stat { color: #818cf8; font-weight: 700; }
  </style>
  <style data-emotion="smbls">
${r.css}
  </style>
</head>
<body>

${r.html}

<div id="br-debug">
  <span>brender dev</span>
  <span>route: <span class="stat">${route}</span></span>
  <span>data-br keys: <span class="stat">${r.brKeyCount}</span></span>
  <span>status: <span class="stat" id="br-status">loading...</span></span>
</div>

<script type="module">
// ── Project data (serialized from server) ─────────────────────────────────
const PROJECT = ${projectJSON}
const REGISTRY = ${registryJSON}

// ── Step 1: Collect all data-br nodes from the pre-rendered HTML ──────────
const brNodes = {}
document.querySelectorAll('[data-br]').forEach(node => {
  brNodes[node.getAttribute('data-br')] = node
})

const status = document.getElementById('br-status')
status.textContent = Object.keys(brNodes).length + ' nodes found'

// ── Step 2: Build DomQL element tree (no DOM creation) ────────────────────
// This mimics what DomQL create() with onlyResolveExtends does:
// resolve extends, merge props, build parent/child refs — but skip node creation.
// We build a lightweight element tree that mirrors the server's output.

const buildElementTree = (def, parentEl, key) => {
  if (!def || typeof def !== 'object') return null

  const el = {
    key,
    tag: def.tag || 'div',
    __ref: {
      __children: [],
      path: parentEl?.__ref?.path ? [...parentEl.__ref.path, key] : [key]
    },
    parent: parentEl,
    state: parentEl?.state || PROJECT.state || {},
    context: parentEl?.context || { components: PROJECT.components, designSystem: PROJECT.designSystem }
  }

  // Copy text
  if (def.text != null) el.text = def.text

  // Copy props (non-child, non-method keys)
  const props = {}
  const skipKeys = new Set([
    'tag', 'text', 'extends', 'on', 'props', 'state', 'context',
    'parent', 'node', '__ref', 'key', 'childExtends', 'define',
    'attr', 'style', 'data', 'html', 'content', 'children',
    'if', 'scope', 'query', 'component', 'variables'
  ])

  // Collect on handlers
  if (def.on && typeof def.on === 'object') {
    el.on = {}
    for (const [evtName, handler] of Object.entries(def.on)) {
      if (handler && handler.__fn) {
        // Function marker from serialization — can't restore, skip
      } else if (typeof handler === 'function') {
        el.on[evtName] = handler
      }
    }
  }

  // Build children recursively
  for (const [childKey, childDef] of Object.entries(def)) {
    if (skipKeys.has(childKey)) continue
    if (childKey.startsWith('_') || childKey.startsWith('@')) continue
    if (typeof childDef === 'function') continue

    // If it looks like a prop value (string, number, boolean), store as prop
    if (typeof childDef !== 'object' || childDef === null) {
      props[childKey] = childDef
      continue
    }

    // If it's marked as a function, skip
    if (childDef.__fn) continue

    // Looks like a child element (key is PascalCase or has tag/extends)
    const isChildElement = (
      childKey[0] === childKey[0].toUpperCase() ||
      childDef.tag ||
      childDef.extends
    )

    if (isChildElement) {
      // Resolve extends from components
      let resolved = childDef
      if (childDef.extends && typeof childDef.extends === 'string') {
        const comp = PROJECT.components[childDef.extends]
        if (comp) {
          resolved = { ...comp, ...childDef }
        }
      }

      const child = buildElementTree(resolved, el, childKey)
      if (child) {
        el[childKey] = child
        el.__ref.__children.push(childKey)
      }
    } else {
      props[childKey] = childDef
    }
  }

  el.props = props
  return el
}

// Get page definition for current route
const currentRoute = window.location.pathname || '/'
const pageDef = PROJECT.pages[currentRoute] || PROJECT.pages['/']
const elementTree = buildElementTree(pageDef, null, 'root')

status.textContent = 'tree built'

// ── Step 3: Assign data-br keys to the element tree ───────────────────────
// Walk the tree in the same order as the server did, assigning br keys.
// Since both server and client walk depth-first in insertion order,
// the keys match.

let brCounter = 1 // br-0 is skipped since assignKeys starts at body children
const assignBrKeys = (el) => {
  if (!el || !el.__ref) return
  const brKey = 'br-' + brCounter++
  el.__ref.__brKey = brKey
  for (const childKey of el.__ref.__children) {
    const child = el[childKey]
    if (child?.__ref) assignBrKeys(child)
  }
}
assignBrKeys(elementTree)

// ── Step 4: Hydrate — link DOM nodes to DomQL elements ────────────────────
let linked = 0
let unlinked = 0
const linkedElements = []

const hydrateWalk = (el) => {
  if (!el || !el.__ref) return
  const brKey = el.__ref.__brKey
  if (brKey && brNodes[brKey]) {
    el.node = brNodes[brKey]
    el.node.ref = el
    linked++
    linkedElements.push(el)
  } else if (brKey) {
    unlinked++
  }
  for (const childKey of el.__ref.__children) {
    const child = el[childKey]
    if (child?.__ref) hydrateWalk(child)
  }
}
hydrateWalk(elementTree)

status.textContent = linked + '/' + (linked + unlinked) + ' linked'

// ── Step 5: Bind real DOM events ──────────────────────────────────────────
// Now that every element.node is a real DOM node, attach event listeners.

const LIFECYCLE = new Set([
  'render', 'create', 'init', 'start', 'complete', 'done',
  'beforeClassAssign', 'attachNode', 'stateInit', 'stateCreated',
  'renderRouter', 'lazyLoad', 'error'
])

let eventCount = 0

const bindEvents = (el) => {
  if (!el?.node || !el.on) return
  for (const [name, handler] of Object.entries(el.on)) {
    if (LIFECYCLE.has(name) || typeof handler !== 'function') continue
    el.node.addEventListener(name, (event) => {
      handler.call(el, event, el, el.state, el.context)
    })
    eventCount++
  }
}

linkedElements.forEach(bindEvents)

// ── Step 6: Set up client-side routing ────────────────────────────────────
// Intercept link clicks for internal navigation

document.addEventListener('click', (e) => {
  const anchor = e.target.closest('a[href]')
  if (!anchor) return
  const href = anchor.getAttribute('href')
  if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#')) return

  e.preventDefault()
  window.location.href = href // Full reload in dev mode — each route is pre-rendered
})

// ── Step 7: Debug — hover inspection ──────────────────────────────────────

document.addEventListener('mouseover', (e) => {
  const node = e.target.closest('[data-br]')
  if (!node) return
  const el = node.ref
  if (!el) return
  const path = el.__ref?.path?.join('.') || el.key
  status.textContent = path + ' <' + (el.tag || 'div') + '>'
})

document.addEventListener('mouseout', () => {
  status.textContent = linked + '/' + (linked + unlinked) + ' linked, ' + eventCount + ' events'
})

// Final status
status.textContent = linked + '/' + (linked + unlinked) + ' linked, ' + eventCount + ' events'
console.log('[brender] Hydration complete:', { linked, unlinked, eventCount })
console.log('[brender] Element tree:', elementTree)
console.log('[brender] Hover any element to inspect. Access tree via: document.querySelector("[data-br]").ref')

</script>
</body>
</html>`
}

// ── HTTP server ─────────────────────────────────────────────────────────────

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost`)

  const route = url.pathname

  // Try exact route, then fallback to /
  const page = buildPage(route) || buildPage('/')

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
    const next = server.address() ? null : parseInt(DEFAULT_PORT) + Math.floor(Math.random() * 100) + 1
    if (next) {
      console.log(`  Port ${err.port || DEFAULT_PORT} in use, trying ${next}...`)
      tryListen(next)
    }
  } else {
    throw err
  }
})

tryListen(DEFAULT_PORT)
