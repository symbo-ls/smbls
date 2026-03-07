import { createEnv } from './env.js'
import { resetKeys, assignKeys, mapKeysToElements } from './keys.js'
import { extractMetadata, generateHeadHtml } from './metadata.js'
import { hydrate } from './hydrate.js'
import { parseHTML } from 'linkedom'

// ── Minimal uikit stubs ──────────────────────────────────────────────────────
// Lightweight versions of uikit components so DOMQL can resolve extends chains
// (tag, display, attrs) without importing the full @symbo.ls/uikit package.
const UIKIT_STUBS = {
  Box: {},
  Focusable: {},
  Block: { display: 'block' },
  Inline: { display: 'inline' },
  Flex: { display: 'flex' },
  InlineFlex: { display: 'inline-flex' },
  Grid: { display: 'grid' },
  InlineGrid: { display: 'inline-grid' },
  Link: {
    tag: 'a',
    attr: {
      href: (el) => el.props?.href,
      target: (el) => el.props?.target,
      rel: (el) => el.props?.rel
    }
  },
  A: { extends: 'Link' },
  RouteLink: { extends: 'Link' },
  Img: {
    tag: 'img',
    attr: {
      src: (el) => el.props?.src,
      alt: (el) => el.props?.alt,
      loading: (el) => el.props?.loading
    }
  },
  Image: { extends: 'Img' },
  Button: { tag: 'button' },
  FocusableComponent: { tag: 'button' },
  Form: { tag: 'form' },
  Input: { tag: 'input' },
  TextArea: { tag: 'textarea' },
  Textarea: { tag: 'textarea' },
  Select: { tag: 'select' },
  Label: { tag: 'label' },
  Iframe: { tag: 'iframe' },
  Video: { tag: 'video' },
  Audio: { tag: 'audio' },
  Canvas: { tag: 'canvas' },
  Span: { tag: 'span' },
  P: { tag: 'p' },
  H1: { tag: 'h1' },
  H2: { tag: 'h2' },
  H3: { tag: 'h3' },
  H4: { tag: 'h4' },
  H5: { tag: 'h5' },
  H6: { tag: 'h6' }
}

/**
 * Renders a Symbols/DomQL project to HTML on the server.
 *
 * Accepts project data as a plain object (matching what ProjectDataService provides)
 * or as a pre-loaded smbls context. Runs DomQL in a linkedom virtual DOM,
 * assigns data-br keys for hydration, and extracts page metadata for SEO.
 *
 * @param {object} data - Project data object with: pages, components, designSystem,
 *   state, functions, methods, snippets, files, app, config/settings
 * @param {object} [options]
 * @param {string} [options.route='/'] - The route/page to render
 * @param {object} [options.state] - State overrides
 * @param {object} [options.context] - Additional context overrides
 * @returns {Promise<{ html: string, metadata: object, registry: object, element: object }>}
 */
export const render = async (data, options = {}) => {
  const { route = '/', state: stateOverrides, context: contextOverrides } = options

  const { window, document } = createEnv()
  const body = document.body

  // Set route on location so the router picks it up
  window.location.pathname = route

  // Lazily import smbls createDomqlElement — this avoids requiring
  // the whole smbls package at module load time
  // Import from source directly — the smbls package doesn't export this subpath
  const smblsSrc = new URL('../../packages/smbls/src/createDomql.js', import.meta.url)
  const { createDomqlElement } = await import(smblsSrc.href)

  const app = data.app || {}

  const ctx = {
    state: { ...data.state, ...(stateOverrides || {}) },
    dependencies: data.dependencies || {},
    components: data.components || {},
    snippets: data.snippets || {},
    pages: data.pages || {},
    functions: data.functions || {},
    methods: data.methods || {},
    designSystem: data.designSystem || {},
    files: data.files || {},
    ...(data.config || data.settings || {}),
    // Virtual DOM environment
    document,
    window,
    parent: { node: body },
    // Caller overrides
    ...(contextOverrides || {})
  }

  resetKeys()

  const element = await createDomqlElement(app, ctx)

  // Assign data-br keys for hydration
  assignKeys(body)

  const registry = mapKeysToElements(element)

  // Extract metadata for the rendered route
  const metadata = extractMetadata(data, route)

  const html = body.innerHTML

  return { html, metadata, registry, element }
}

/**
 * Renders a single DomQL element definition to HTML.
 * Useful for rendering individual components without a full project.
 *
 * @param {object} elementDef - DomQL element definition
 * @param {object} [options]
 * @param {object} [options.context] - DomQL context (components, designSystem, etc.)
 * @returns {Promise<{ html: string, registry: object, element: object }>}
 */
export const renderElement = async (elementDef, options = {}) => {
  const { context = {} } = options

  const { window, document } = createEnv()
  const body = document.body

  const { create } = await import('@domql/element')

  // Merge minimal uikit stubs so DOMQL resolves extends chains
  // (e.g. extends: 'Link' → tag: 'a', extends: 'Flex' → display: flex)
  const components = { ...UIKIT_STUBS, ...(context.components || {}) }

  resetKeys()

  const element = create(elementDef, { node: body }, 'root', {
    context: { document, window, ...context, components }
  })

  assignKeys(body)
  const registry = mapKeysToElements(element)
  const html = body.innerHTML

  return { html, registry, element }
}

// ── Route-level SSR ───────────────────────────────────────────────────────────

/**
 * Renders a single route and returns body HTML + CSS separately.
 * Designed for integration with an existing server router that manages
 * its own <head>, template, and bundle injection.
 *
 * @param {object} data - Full project data
 * @param {object} [options]
 * @param {string} [options.route='/'] - Route to render
 * @returns {Promise<{ html: string, css: string, resetCss: string, fontLinks: string, metadata: object, brKeyCount: number }>}
 */
export const renderRoute = async (data, options = {}) => {
  const { route = '/' } = options
  const ds = data.designSystem || {}
  const pageDef = (data.pages || {})[route]
  if (!pageDef) return null

  const result = await renderElement(pageDef, {
    context: {
      components: data.components || {},
      snippets: data.snippets || {},
      designSystem: ds,
      state: data.state || {},
      functions: data.functions || {},
      methods: data.methods || {}
    }
  })

  // Hydrate with emotion → CSS classes on nodes
  const { document: cssDoc } = parseHTML(`<html><head></head><body>${result.html}</body></html>`)
  let emotionInstance
  try {
    const { default: createInstance } = await import('@emotion/css/create-instance')
    emotionInstance = createInstance({ key: 'smbls', container: cssDoc.head })
  } catch {}

  hydrate(result.element, {
    root: cssDoc.body,
    renderEvents: false,
    events: false,
    emotion: emotionInstance,
    designSystem: ds
  })

  return {
    html: cssDoc.body.innerHTML,
    css: extractCSS(result.element, ds),
    resetCss: generateResetCSS(ds.reset),
    fontLinks: generateFontLinks(ds),
    metadata: extractMetadata(data, route),
    brKeyCount: Object.keys(result.registry).length
  }
}

// ── Full page SSR ─────────────────────────────────────────────────────────────

/**
 * Renders a complete HTML page for a route — ready to serve.
 * Includes head, metadata, fonts, reset CSS, component CSS, and body.
 *
 * @param {object} data - Full project data (from loadProject)
 * @param {string} route - Route to render (e.g. '/', '/about')
 * @param {object} [options]
 * @param {string} [options.lang='en'] - HTML lang attribute
 * @param {string} [options.themeColor] - theme-color meta
 * @returns {Promise<{ html: string, route: string, brKeyCount: number }>}
 */
export const renderPage = async (data, route = '/', options = {}) => {
  const { lang = 'en', themeColor } = options

  const result = await renderRoute(data, { route })
  if (!result) return null

  const metadata = { ...result.metadata }
  if (themeColor) metadata['theme-color'] = themeColor
  const headTags = generateHeadHtml(metadata)

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
${headTags}
${result.fontLinks}
<style>${result.resetCss}</style>
<style data-emotion="smbls">
${result.css}
</style>
</head>
<body>
${result.html}
</body>
</html>`

  return { html, route, brKeyCount: result.brKeyCount }
}

// ── CSS helpers ─────────────────────────────────────────────────────────────

const CSS_COLOR_PROPS = new Set([
  'color', 'background', 'backgroundColor', 'borderColor',
  'borderTopColor', 'borderRightColor', 'borderBottomColor', 'borderLeftColor',
  'outlineColor', 'fill', 'stroke'
])

const NON_CSS_PROPS = new Set([
  'href', 'src', 'alt', 'title', 'id', 'name', 'type', 'value', 'placeholder',
  'target', 'rel', 'loading', 'srcset', 'sizes', 'media', 'role', 'tabindex',
  'for', 'action', 'method', 'enctype', 'autocomplete', 'autofocus',
  'theme', '__element', 'update'
])

const camelToKebab = (str) => str.replace(/[A-Z]/g, m => '-' + m.toLowerCase())

const resolveShorthand = (key, val) => {
  if (typeof val === 'undefined' || val === null) return null

  // Flex shorthands
  if (key === 'flow' && typeof val === 'string') {
    let [direction, wrap] = (val || 'row').split(' ')
    if (val.startsWith('x') || val === 'row') direction = 'row'
    if (val.startsWith('y') || val === 'column') direction = 'column'
    return { display: 'flex', 'flex-flow': (direction || '') + ' ' + (wrap || '') }
  }
  if (key === 'wrap') {
    return { display: 'flex', 'flex-wrap': val }
  }
  if ((key === 'align' || key === 'flexAlign') && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    return { display: 'flex', 'align-items': alignItems, 'justify-content': justifyContent }
  }
  if (key === 'gridAlign' && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    return { display: 'grid', 'align-items': alignItems, 'justify-content': justifyContent }
  }
  if (key === 'flexFlow' && typeof val === 'string') {
    let [direction, wrap] = (val || 'row').split(' ')
    if (val.startsWith('x') || val === 'row') direction = 'row'
    if (val.startsWith('y') || val === 'column') direction = 'column'
    return { display: 'flex', 'flex-flow': (direction || '') + ' ' + (wrap || '') }
  }
  if (key === 'flexWrap') {
    return { display: 'flex', 'flex-wrap': val }
  }

  // Box/size shorthands
  if (key === 'round' || (key === 'borderRadius' && val)) {
    return { 'border-radius': typeof val === 'number' ? val + 'px' : val }
  }
  if (key === 'boxSize' && typeof val === 'string') {
    const [height, width] = val.split(' ')
    return { height, width: width || height }
  }
  if (key === 'widthRange' && typeof val === 'string') {
    const [minWidth, maxWidth] = val.split(' ')
    return { 'min-width': minWidth, 'max-width': maxWidth || minWidth }
  }
  if (key === 'heightRange' && typeof val === 'string') {
    const [minHeight, maxHeight] = val.split(' ')
    return { 'min-height': minHeight, 'max-height': maxHeight || minHeight }
  }

  // Grid aliases
  if (key === 'column') return { 'grid-column': val }
  if (key === 'columns') return { 'grid-template-columns': val }
  if (key === 'templateColumns') return { 'grid-template-columns': val }
  if (key === 'row') return { 'grid-row': val }
  if (key === 'rows') return { 'grid-template-rows': val }
  if (key === 'templateRows') return { 'grid-template-rows': val }
  if (key === 'area') return { 'grid-area': val }
  if (key === 'template') return { 'grid-template': val }
  if (key === 'templateAreas') return { 'grid-template-areas': val }
  if (key === 'autoColumns') return { 'grid-auto-columns': val }
  if (key === 'autoRows') return { 'grid-auto-rows': val }
  if (key === 'autoFlow') return { 'grid-auto-flow': val }
  if (key === 'columnStart') return { 'grid-column-start': val }
  if (key === 'rowStart') return { 'grid-row-start': val }

  return null
}

const resolveInnerProps = (obj, colorMap) => {
  const result = {}
  for (const k in obj) {
    const v = obj[k]
    const expanded = resolveShorthand(k, v)
    if (expanded) { Object.assign(result, expanded); continue }
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
      const bp = mediaMap?.[key.slice(1)]
      if (bp) {
        const inner = resolveInnerProps(val, colorMap)
        if (Object.keys(inner).length) mediaRules[bp] = inner
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

    const expanded = resolveShorthand(key, val)
    if (expanded) { Object.assign(base, expanded); continue }

    base[camelToKebab(key)] = CSS_COLOR_PROPS.has(key) && colorMap[val] ? colorMap[val] : val
  }

  return { base, mediaRules, pseudoRules }
}

const renderCSSRule = (selector, { base, mediaRules, pseudoRules }) => {
  const lines = []
  const baseDecls = Object.entries(base).map(([k, v]) => `${k}: ${v}`).join('; ')
  if (baseDecls) lines.push(`${selector} { ${baseDecls}; }`)

  for (const [pseudo, p] of Object.entries(pseudoRules)) {
    const decls = Object.entries(p).map(([k, v]) => `${k}: ${v}`).join('; ')
    if (decls) lines.push(`${selector}${pseudo} { ${decls}; }`)
  }

  for (const [query, p] of Object.entries(mediaRules)) {
    const decls = Object.entries(p).map(([k, v]) => `${k}: ${v}`).join('; ')
    const mq = query.startsWith('@') ? query : `@media ${query}`
    if (decls) lines.push(`${mq} { ${selector} { ${decls}; } }`)
  }

  return lines.join('\n')
}

// Map of component names to their implicit CSS from extends
const EXTENDS_CSS = {
  Flex: { display: 'flex' },
  InlineFlex: { display: 'inline-flex' },
  Grid: { display: 'grid' },
  InlineGrid: { display: 'inline-grid' },
  Block: { display: 'block' },
  Inline: { display: 'inline' }
}

const getExtendsCSS = (el) => {
  const exts = el.__ref?.__extends
  if (!exts || !Array.isArray(exts)) return null
  for (const ext of exts) {
    if (EXTENDS_CSS[ext]) return EXTENDS_CSS[ext]
  }
  return null
}

const extractCSS = (element, ds) => {
  const colorMap = ds?.color || {}
  const mediaMap = ds?.media || {}
  const animations = ds?.animation || {}
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

        // Inject CSS from extends chain (e.g. extends: 'Flex' → display: flex)
        const extsCss = getExtendsCSS(el)
        if (extsCss) {
          for (const [k, v] of Object.entries(extsCss)) {
            const kebab = camelToKebab(k)
            if (!cssResult.base[kebab]) cssResult.base[kebab] = v
          }
        }

        const has = Object.keys(cssResult.base).length || Object.keys(cssResult.mediaRules).length || Object.keys(cssResult.pseudoRules).length
        if (has) rules.push(renderCSSRule('.' + cls.split(' ')[0], cssResult))

        const anim = props.animation || props.animationName
        if (typeof anim === 'string') {
          const name = anim.split(' ')[0]
          if (animations[name]) usedAnimations.add(name)
        }
      }
    }
    if (el.__ref.__children) {
      for (const ck of el.__ref.__children) {
        if (el[ck]?.__ref) walk(el[ck])
      }
    }
  }
  walk(element)

  const keyframes = []
  for (const name of usedAnimations) {
    const frames = animations[name]
    const frameRules = Object.entries(frames).map(([step, p]) => {
      const decls = Object.entries(p).map(([k, v]) => `${camelToKebab(k)}: ${v}`).join('; ')
      return `  ${step} { ${decls}; }`
    }).join('\n')
    keyframes.push(`@keyframes ${name} {\n${frameRules}\n}`)
  }

  return [...keyframes, ...rules].join('\n')
}

const generateResetCSS = (reset) => {
  if (!reset) return ''
  const rules = []
  for (const [selector, props] of Object.entries(reset)) {
    const decls = Object.entries(props)
      .map(([k, v]) => `${camelToKebab(k)}: ${v}`)
      .join('; ')
    if (decls) rules.push(`${selector} { ${decls}; }`)
  }
  return rules.join('\n')
}

const generateFontLinks = (ds) => {
  if (!ds) return ''
  const families = ds.font_family || ds.fontFamily || {}
  const fontNames = new Set()

  // Collect font family names from the design system
  for (const val of Object.values(families)) {
    const match = val.match(/'([^']+)'/)
    if (match) fontNames.add(match[1])
  }

  if (!fontNames.size) return ''

  // Build Google Fonts URL
  const params = [...fontNames].map(name => {
    const slug = name.replace(/\s+/g, '+')
    return `family=${slug}:wght@300;400;500;600;700`
  }).join('&')

  return [
    '<link rel="preconnect" href="https://fonts.googleapis.com">',
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    `<link href="https://fonts.googleapis.com/css2?${params}&display=swap" rel="stylesheet">`
  ].join('\n')
}
