import { resolve, join } from 'path'
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
      src: (el) => {
        let src = el.props?.src
        if (typeof src === 'string' && src.includes('{{')) {
          src = el.call('replaceLiteralsWithObjectFields', src, el.state)
        }
        return src
      },
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
  H6: { tag: 'h6' },
  Svg: {
    tag: 'svg',
    attr: {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink'
    }
  },
  Text: { tag: 'span' }
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
  const domqlUtils = await import('@domql/utils')

  // Merge minimal uikit stubs so DOMQL resolves extends chains
  // (e.g. extends: 'Link' → tag: 'a', extends: 'Flex' → display: flex)
  const components = { ...UIKIT_STUBS, ...(context.components || {}) }

  // Register utility functions so element.call() can resolve them
  // (e.g. replaceLiteralsWithObjectFields for {{ }} templates)
  const utils = {
    ...domqlUtils,
    ...(context.utils || {}),
    ...(context.functions || {})
  }

  resetKeys()

  let element
  try {
    element = create(elementDef, { node: body }, 'root', {
      context: { document, window, ...context, components, utils }
    })
  } catch (err) {
    // Lifecycle events (onRender, onDone, etc.) may throw in SSR
    // because they access browser-only APIs. The DOM tree is built
    // before these fire, so we can still extract HTML.
  }

  assignKeys(body)
  const registry = element ? mapKeysToElements(element) : {}
  const html = fixSvgContent(body.innerHTML)

  return { html, registry, element }
}

// ── SVG content post-processing ───────────────────────────────────────────────
// DOMQL's html mixin uses textContent for SVG nodes, which escapes HTML entities.
// This post-processor unescapes content inside <svg> tags so paths/circles render.
const fixSvgContent = (html) => {
  return html.replace(
    /(<svg\b[^>]*>)([\s\S]*?)(<\/svg>)/gi,
    (match, open, content, close) => {
      if (content.includes('&lt;')) {
        const unescaped = content
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&amp;/g, '&')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
        return open + unescaped + close
      }
      return match
    }
  )
}

// ── Global CSS generation ─────────────────────────────────────────────────────

/**
 * Runs the scratch design-system pipeline (via esbuild bundling to work around
 * bare-import issues) to produce CSS variables and reset styles — the same
 * globals that the SPA runtime injects via emotion.injectGlobal.
 */
let _cachedGlobalCSS = null

const generateGlobalCSS = async (ds, config) => {
  if (_cachedGlobalCSS) return _cachedGlobalCSS

  try {
    const { existsSync, writeFileSync, unlinkSync } = await import('fs')
    const { tmpdir } = await import('os')
    const { randomBytes } = await import('crypto')
    const esbuild = await import('esbuild')

    // Write a temporary script that imports scratch, runs set(), and
    // serialises the CSS_VARS + RESET objects as JSON.
    const dsJson = JSON.stringify(ds || {})
    const cfgJson = JSON.stringify(config || {})
    const tmpEntry = join(tmpdir(), `br_global_${randomBytes(6).toString('hex')}.mjs`)
    const tmpOut = join(tmpdir(), `br_global_${randomBytes(6).toString('hex')}_out.mjs`)

    writeFileSync(tmpEntry, `
      import { set, getActiveConfig, getFontFaceString } from '@symbo.ls/scratch'
      import { DEFAULT_CONFIG } from '@symbo.ls/default-config'

      const ds = ${dsJson}
      const cfg = ${cfgJson}

      // Merge with defaults (same as initEmotion)
      const merged = {}
      for (const k in DEFAULT_CONFIG) merged[k] = DEFAULT_CONFIG[k]
      for (const k in ds) {
        if (typeof ds[k] === 'object' && !Array.isArray(ds[k]) && typeof merged[k] === 'object' && !Array.isArray(merged[k])) {
          merged[k] = { ...merged[k], ...ds[k] }
        } else {
          merged[k] = ds[k]
        }
      }

      const conf = set({
        useReset: true,
        useVariable: true,
        useFontImport: true,
        useDocumentTheme: true,
        useDefaultConfig: true,
        globalTheme: 'auto',
        ...merged,
        ...cfg
      }, { newConfig: {} })

      const result = {
        CSS_VARS: conf.CSS_VARS || {},
        CSS_MEDIA_VARS: conf.CSS_MEDIA_VARS || {},
        RESET: conf.RESET || conf.reset || {},
        ANIMATION: conf.animation || conf.ANIMATION || {}
      }
      // Export as globalThis so we can read it
      globalThis.__BR_GLOBAL_CSS__ = result
      export default result
    `)

    // Resolve the monorepo root from the brender plugin location
    // so esbuild can find @symbo.ls/* packages
    const brenderDir = new URL('.', import.meta.url).pathname
    const monorepoRoot = resolve(brenderDir, '../..')

    // Workspace resolve plugin: maps @symbo.ls/* and @domql/* to source paths
    const workspacePlugin = {
      name: 'workspace-resolve',
      setup (build) {
        build.onResolve({ filter: /^@symbo\.ls\// }, args => {
          const pkg = args.path.replace('@symbo.ls/', '')
          // Try packages/ then plugins/
          for (const dir of ['packages', 'plugins']) {
            const src = resolve(monorepoRoot, dir, pkg, 'src', 'index.js')
            if (existsSync(src)) return { path: src }
            const dist = resolve(monorepoRoot, dir, pkg, 'index.js')
            if (existsSync(dist)) return { path: dist }
          }
          // default-config special case
          const blank = resolve(monorepoRoot, 'packages', 'default-config', 'blank', 'index.js')
          if (pkg === 'default-config' && existsSync(blank)) return { path: blank }
        })
        build.onResolve({ filter: /^@domql\// }, args => {
          const pkg = args.path.replace('@domql/', '')
          const src = resolve(monorepoRoot, 'packages', 'domql', 'packages', pkg, 'src', 'index.js')
          if (existsSync(src)) return { path: src }
        })
      }
    }

    await esbuild.build({
      entryPoints: [tmpEntry],
      bundle: true,
      format: 'esm',
      platform: 'node',
      outfile: tmpOut,
      write: true,
      logLevel: 'silent',
      plugins: [workspacePlugin],
      external: ['fs', 'path', 'os', 'crypto', 'url', 'http', 'https', 'stream', 'util', 'events', 'buffer', 'child_process', 'worker_threads', 'net', 'tls', 'dns', 'dgram', 'zlib', 'assert', 'querystring', 'string_decoder', 'readline', 'perf_hooks', 'async_hooks', 'v8', 'vm', 'cluster', 'inspector', 'module', 'process', 'tty', 'color-contrast-checker']
    })

    const mod = await import(`file://${tmpOut}`)
    const data = mod.default || {}
    try { unlinkSync(tmpEntry) } catch {}
    try { unlinkSync(tmpOut) } catch {}

    const cssVars = data.CSS_VARS || {}
    const cssMediaVars = data.CSS_MEDIA_VARS || {}
    const reset = data.RESET || {}
    const animations = data.ANIMATION || {}

    // ── :root CSS variables ──
    const varDecls = Object.entries(cssVars)
      .map(([k, v]) => `  ${k}: ${v}`)
      .join(';\n')
    let rootRule = varDecls ? `:root {\n${varDecls};\n}` : ''

    // ── Theme-switching CSS vars (media queries + data-theme selectors) ──
    const themeVarRules = Object.entries(cssMediaVars)
      .map(([key, vars]) => {
        const decls = Object.entries(vars)
          .map(([k, v]) => `    ${k}: ${v}`)
          .join(';\n')
        if (!decls) return ''
        if (key.startsWith('@media')) {
          // Media query — only when no data-theme forces a theme
          return `${key} {\n  :root:not([data-theme]) {\n${decls};\n  }\n}`
        }
        // Selector ([data-theme="..."]) — apply directly
        return `${key} {\n${decls};\n}`
      })
      .filter(Boolean)
      .join('\n\n')
    if (themeVarRules) rootRule += '\n\n' + themeVarRules

    // ── Reset styles ──
    const resetRules = generateResetCSS(reset)

    // ── @keyframes animations ──
    const keyframeRules = []
    for (const name in animations) {
      const frames = animations[name]
      if (!frames || typeof frames !== 'object') continue
      const frameRules = Object.entries(frames).map(([step, p]) => {
        if (typeof p !== 'object') return ''
        const decls = Object.entries(p).map(([k, v]) => `${camelToKebab(k)}: ${v}`).join('; ')
        return `  ${step} { ${decls}; }`
      }).join('\n')
      keyframeRules.push(`@keyframes ${name} {\n${frameRules}\n}`)
    }

    _cachedGlobalCSS = {
      rootRule,
      resetRules,
      fontFaceCSS: '',
      keyframeRules: keyframeRules.join('\n')
    }
    return _cachedGlobalCSS
  } catch (err) {
    console.warn('generateGlobalCSS failed:', err.message, err.stack)
    _cachedGlobalCSS = { rootRule: '', resetRules: '', fontFaceCSS: '', keyframeRules: '' }
    return _cachedGlobalCSS
  }
}

/**
 * Reset the cached global CSS (useful when rendering multiple projects).
 */
export const resetGlobalCSSCache = () => { _cachedGlobalCSS = null }

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

  // Generate global CSS (variables, reset, keyframes) via scratch pipeline
  const globalCSS = await generateGlobalCSS(ds, data.config || data.settings)

  return {
    html: cssDoc.body.innerHTML,
    css: extractCSS(result.element, ds),
    globalCSS,
    resetCss: globalCSS.resetRules || generateResetCSS(ds.reset),
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
  const { lang = 'en', themeColor, isr } = options

  const result = await renderRoute(data, { route })
  if (!result) return null

  const metadata = { ...result.metadata }
  if (themeColor) metadata['theme-color'] = themeColor
  const headTags = generateHeadHtml(metadata)

  const globalCSS = result.globalCSS || {}

  // ISR: include client SPA bundle for hydration + data fetching
  let isrBody = ''
  if (isr && isr.clientScript) {
    // Calculate relative path from route directory to root
    const depth = route === '/' ? 0 : route.replace(/^\/|\/$/g, '').split('/').length
    const prefix = depth > 0 ? '../'.repeat(depth) : './'
    // Inline handoff script: when the SPA adds its root element to <body>,
    // remove the pre-rendered brender content for a seamless transition.
    isrBody = `<script type="module">
{
  const brEls = document.querySelectorAll('body > :not(script):not(style)')
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      for (const node of m.addedNodes) {
        if (node.nodeType === 1 && node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && !node.hasAttribute('data-br')) {
          brEls.forEach(el => { if (el.hasAttribute('data-br') || el.querySelector('[data-br]')) el.remove() })
          observer.disconnect()
          return
        }
      }
    }
  })
  observer.observe(document.body, { childList: true })
}
</script>
<script type="module" src="${prefix}${isr.clientScript}"></script>`
  }

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
${headTags}
${result.fontLinks}
${globalCSS.fontFaceCSS ? `<style>${globalCSS.fontFaceCSS}</style>` : ''}
<style>
${globalCSS.rootRule || ''}
${result.resetCss}
${globalCSS.keyframeRules || ''}
</style>
<style data-emotion="smbls">
${result.css}
</style>
</head>
<body>
${result.html}
${isrBody}
</body>
</html>`

  return { html, route, brKeyCount: result.brKeyCount }
}

// ── Design system token resolution ──────────────────────────────────────────

const LETTER_TO_INDEX = {
  U: -6, V: -5, W: -4, X: -3, Y: -2, Z: -1,
  A: 0, B: 1, C: 2, D: 3, E: 4, F: 5, G: 6, H: 7, I: 8, J: 9,
  K: 10, L: 11, M: 12, N: 13, O: 14, P: 15
}

const SPACING_PROPS = new Set([
  'padding', 'paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft',
  'paddingBlock', 'paddingInline', 'paddingBlockStart', 'paddingBlockEnd',
  'paddingInlineStart', 'paddingInlineEnd',
  'margin', 'marginTop', 'marginRight', 'marginBottom', 'marginLeft',
  'marginBlock', 'marginInline', 'marginBlockStart', 'marginBlockEnd',
  'marginInlineStart', 'marginInlineEnd',
  'gap', 'rowGap', 'columnGap',
  'top', 'right', 'bottom', 'left',
  'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'flexBasis', 'fontSize', 'lineHeight', 'letterSpacing',
  'borderWidth', 'borderRadius', 'outlineWidth', 'outlineOffset',
  'inset', 'insetBlock', 'insetInline',
  'boxSize', 'round'
])

/**
 * Resolves a spacing token like 'B2', 'A', 'E3' to a px/em value.
 * Uses base * ratio^index for main steps (A=0, B=1, etc.)
 * and sub-ratio interpolation for sub-steps (B1, B2, B3).
 */
const resolveSpacingToken = (token, spacingConfig) => {
  if (!token || typeof token !== 'string') return null
  if (!spacingConfig) return null

  const base = spacingConfig.base || 16
  const ratio = spacingConfig.ratio || 1.618
  const unit = spacingConfig.unit || 'px'
  const hasSubSequence = spacingConfig.subSequence !== false

  // Handle compound values like 'B2 - -' or 'A1 B C1'
  if (token.includes(' ')) {
    const parts = token.split(' ').map(part => {
      if (part === '-' || part === '') return part
      return resolveSpacingToken(part, spacingConfig) || part
    })
    return parts.join(' ')
  }

  // Skip CSS keywords and values with units
  if (/^(none|auto|inherit|initial|unset|0)$/i.test(token)) return null
  if (/\d+(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc|fr|s|ms)$/i.test(token)) return null
  // Skip hex colors, rgb(), etc.
  if (/^(#|rgb|hsl|var\()/i.test(token)) return null

  const isNegative = token.startsWith('-')
  const abs = isNegative ? token.slice(1) : token

  // Match letter + optional digit: A, B, B2, E3, etc.
  const m = abs.match(/^([A-Z])(\d)?$/i)
  if (!m) return null

  const letter = m[1].toUpperCase()
  const subStep = m[2] ? parseInt(m[2]) : 0
  const idx = LETTER_TO_INDEX[letter]
  if (idx === undefined) return null

  let value = base * Math.pow(ratio, idx)

  if (subStep > 0 && hasSubSequence) {
    const next = base * Math.pow(ratio, idx + 1)
    const diff = next - value
    const subRatio = diff / ratio
    // Sub-steps: 1 = value + (diff - subRatio), 2 = midpoint, 3 = value + subRatio
    const first = next - subRatio
    const second = value + subRatio
    const middle = (first + second) / 2
    const subs = (~~next - ~~value > 16) ? [first, middle, second] : [first, second]
    if (subStep <= subs.length) {
      value = subs[subStep - 1]
    }
  }

  const rounded = Math.round(value * 100) / 100
  const sign = isNegative ? '-' : ''
  return `${sign}${rounded}${unit}`
}

// Kebab-case versions of spacing props for post-shorthand resolution
const SPACING_PROPS_KEBAB = new Set(
  [...SPACING_PROPS].map(k => k.replace(/[A-Z]/g, m => '-' + m.toLowerCase()))
)

/**
 * Try to resolve a CSS value through the design system.
 * Returns the resolved value or the original if not a token.
 */
const resolveDSValue = (key, val, ds) => {
  if (typeof val !== 'string') return val

  // Color resolution
  if (CSS_COLOR_PROPS.has(key)) {
    const colorMap = ds?.color || {}
    if (colorMap[val]) return colorMap[val]
  }

  // Spacing resolution (check both camelCase and kebab-case keys)
  if (SPACING_PROPS.has(key) || SPACING_PROPS_KEBAB.has(key)) {
    const spacing = ds?.spacing || {}
    const resolved = resolveSpacingToken(val, spacing)
    if (resolved) return resolved
  }

  return val
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
  'theme', '__element', 'update',
  'childrenAs', 'childExtends', 'childProps', 'children'
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
    const result = { display: 'flex', 'align-items': alignItems }
    if (justifyContent) result['justify-content'] = justifyContent
    return result
  }
  if (key === 'gridAlign' && typeof val === 'string') {
    const [alignItems, justifyContent] = val.split(' ')
    const result = { display: 'grid', 'align-items': alignItems }
    if (justifyContent) result['justify-content'] = justifyContent
    return result
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

  // Background image shorthand
  if (key === 'backgroundImage' && typeof val === 'string' && !val.startsWith('url(') && !val.startsWith('linear-gradient') && !val.startsWith('radial-gradient') && !val.startsWith('none')) {
    return { 'background-image': `url(${val})` }
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

const resolveInnerProps = (obj, ds) => {
  const result = {}
  for (const k in obj) {
    const v = obj[k]
    const expanded = resolveShorthand(k, v)
    if (expanded) {
      for (const ek in expanded) {
        result[ek] = resolveDSValue(ek, expanded[ek], ds)
      }
      continue
    }
    if (typeof v !== 'string' && typeof v !== 'number') continue
    result[camelToKebab(k)] = resolveDSValue(k, v, ds)
  }
  return result
}

const buildCSSFromProps = (props, ds, mediaMap) => {
  const base = {}
  const mediaRules = {}
  const pseudoRules = {}

  for (const key in props) {
    const val = props[key]

    if (key.charCodeAt(0) === 64 && typeof val === 'object') {
      const bp = mediaMap?.[key.slice(1)]
      if (bp) {
        const inner = resolveInnerProps(val, ds)
        if (Object.keys(inner).length) mediaRules[bp] = inner
      }
      continue
    }

    if (key.charCodeAt(0) === 58 && typeof val === 'object') {
      const inner = resolveInnerProps(val, ds)
      if (Object.keys(inner).length) pseudoRules[key] = inner
      continue
    }

    if (typeof val !== 'string' && typeof val !== 'number') continue
    if (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) continue
    if (NON_CSS_PROPS.has(key)) continue

    const expanded = resolveShorthand(key, val)
    if (expanded) {
      for (const ek in expanded) {
        base[ek] = resolveDSValue(ek, expanded[ek], ds)
      }
      continue
    }

    base[camelToKebab(key)] = resolveDSValue(key, val, ds)
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

/**
 * Resolve function-valued CSS props by evaluating them with (element, state).
 * In SSR, this gives correct initial values (e.g. display: 'none' when no auth).
 * Uses fallback mock state if element state is incomplete.
 */
const resolveElementProps = (el) => {
  const { props } = el
  if (!props) return props
  let resolved
  for (const key in props) {
    if (typeof props[key] !== 'function') continue
    // Skip non-CSS props and component children
    if (NON_CSS_PROPS.has(key)) continue
    if (key.charCodeAt(0) >= 65 && key.charCodeAt(0) <= 90) continue
    if (key.startsWith('on')) continue
    if (!resolved) resolved = { ...props }
    let result
    try {
      result = props[key](el, el.state || {})
    } catch {
      // State prototype chain may be incomplete in SSR — try with mock
      try {
        const mockState = { root: {}, ...(el.state || {}) }
        result = props[key](el, mockState)
      } catch { /* skip prop */ }
    }
    if (result !== undefined && result !== null && result !== false) {
      resolved[key] = result
    } else {
      delete resolved[key]
    }
  }
  return resolved || props
}

const extractCSS = (element, ds) => {
  const mediaMap = ds?.media || {}
  const animations = ds?.animation || {}
  const rules = []
  const seen = new Set()
  const usedAnimations = new Set()

  const walk = (el) => {
    if (!el || !el.__ref) return
    const props = resolveElementProps(el)
    if (props && el.node) {
      const cls = el.node.getAttribute?.('class')
      if (cls && !seen.has(cls)) {
        seen.add(cls)
        const cssResult = buildCSSFromProps(props, ds, mediaMap)

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
    if (el.__ref?.__children) {
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
    if (!props || typeof props !== 'object') continue
    const baseDecls = []
    const mediaRules = []
    for (const [k, v] of Object.entries(props)) {
      if (typeof v === 'object' && v !== null) {
        // Nested object: @media query or sub-selector
        if (k.startsWith('@media') || k.startsWith('@')) {
          const inner = Object.entries(v)
            .filter(([, iv]) => typeof iv !== 'object')
            .map(([ik, iv]) => `${camelToKebab(ik)}: ${iv}`)
            .join('; ')
          if (inner) mediaRules.push(`${k} { ${selector} { ${inner}; } }`)
        }
        continue
      }
      baseDecls.push(`${camelToKebab(k)}: ${v}`)
    }
    if (baseDecls.length) rules.push(`${selector} { ${baseDecls.join('; ')}; }`)
    rules.push(...mediaRules)
  }
  return rules.join('\n')
}

const generateFontLinks = (ds) => {
  if (!ds) return ''
  const families = ds.font_family || ds.fontFamily || {}
  const fontNames = new Set()

  // Collect font family names from the design system
  for (const val of Object.values(families)) {
    if (typeof val !== 'string') continue
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
