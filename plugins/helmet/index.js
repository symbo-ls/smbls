'use strict'

import { exec, isFunction, isObject, isString } from '@domql/utils'

// ── Meta tag registry ──────────────────────────────────────────────────────

const META_TAGS = {
  title: { tag: 'title' },
  description: { tag: 'meta', attr: 'name', key: 'description' },
  keywords: { tag: 'meta', attr: 'name', key: 'keywords' },
  robots: { tag: 'meta', attr: 'name', key: 'robots' },
  author: { tag: 'meta', attr: 'name', key: 'author' },
  canonical: { tag: 'link', attr: 'rel', key: 'canonical', valueAttr: 'href' },
  image: { tag: 'meta', attr: 'property', key: 'og:image' },
  url: { tag: 'meta', attr: 'property', key: 'og:url' },
  siteName: { tag: 'meta', attr: 'property', key: 'og:site_name' },
  type: { tag: 'meta', attr: 'property', key: 'og:type' },
  locale: { tag: 'meta', attr: 'property', key: 'og:locale' },
  'og:title': { tag: 'meta', attr: 'property', key: 'og:title' },
  'og:description': { tag: 'meta', attr: 'property', key: 'og:description' },
  'og:image': { tag: 'meta', attr: 'property', key: 'og:image' },
  'og:url': { tag: 'meta', attr: 'property', key: 'og:url' },
  'og:type': { tag: 'meta', attr: 'property', key: 'og:type' },
  'og:site_name': { tag: 'meta', attr: 'property', key: 'og:site_name' },
  'og:locale': { tag: 'meta', attr: 'property', key: 'og:locale' },
  'twitter:card': { tag: 'meta', attr: 'name', key: 'twitter:card' },
  'twitter:title': { tag: 'meta', attr: 'name', key: 'twitter:title' },
  'twitter:description': { tag: 'meta', attr: 'name', key: 'twitter:description' },
  'twitter:image': { tag: 'meta', attr: 'name', key: 'twitter:image' },
  'twitter:site': { tag: 'meta', attr: 'name', key: 'twitter:site' },
  'theme-color': { tag: 'meta', attr: 'name', key: 'theme-color' }
}

// ── Shared utilities ────────────────────────────────────────────────────────

const createQuery = (obj) => {
  if (obj.tag === 'link') return `link[${obj.attr}="${obj.key}"]`
  if (obj.tag && !obj.attr && !obj.key) return obj.tag
  if (obj.tag && obj.attr && obj.key) return `${obj.tag}[${obj.attr}="${obj.key}"]`
}

/**
 * Resolve metadata values — supports functions receiving (element, state)
 */
export const resolveMetadata = (metadata, element, state) => {
  if (!metadata) return {}

  const resolved = isFunction(metadata)
    ? exec(metadata, element, state)
    : { ...metadata }

  if (!isObject(resolved)) return {}

  for (const key in resolved) {
    let val = resolved[key]
    if (isFunction(val)) {
      val = exec(val, element, state)
    }
    if (isString(val) && val.includes('{{') && element?.call) {
      val = element.call('replaceLiteralsWithObjectFields', val, state)
    }
    resolved[key] = val
  }

  return resolved
}

/**
 * Extract metadata from project data for a given route.
 * Merge priority (lowest → highest):
 *   1. data.integrations.seo
 *   2. data.app.metadata
 *   3. page.metadata / page.helmet / page.state
 *
 * When `element` is provided, function values are executed.
 */
export const extractMetadata = (data, route = '/', element, state) => {
  const pages = data.pages || {}
  const page = pages[route]

  let metadata = {}

  if (data.integrations?.seo) {
    metadata = { ...data.integrations.seo }
  }

  if (data.app?.metadata) {
    const appMeta = resolveMetadata(data.app.metadata, element, state)
    metadata = { ...metadata, ...appMeta }
  }

  if (page) {
    const pageMeta = page.metadata || page.helmet || {}
    const resolved = resolveMetadata(pageMeta, element, state)
    metadata = { ...metadata, ...resolved }

    if (!metadata.title && page.state?.title) {
      metadata.title = page.state.title
    }
    if (!metadata.description && page.state?.description) {
      metadata.description = page.state.description
    }
  }

  if (!metadata.title) {
    metadata.title = data.name || 'Symbols'
  }

  // Resolve bare filenames
  if (data.files) {
    for (const key in metadata) {
      const val = metadata[key]
      if (typeof val === 'string' && val.length > 0 &&
          !val.startsWith('/') && !val.startsWith('http')) {
        const fileEntry = data.files[val]
        if (fileEntry?.src) metadata[key] = fileEntry.src
      }
    }
  }

  return metadata
}

// ── DOM runtime (browser) ───────────────────────────────────────────────────

const createMetaElement = (metaObj, doc) => {
  const domElement = doc.createElement(metaObj.tag)
  if (metaObj.attr) {
    domElement.setAttribute(metaObj.attr, metaObj.key)
  }
  const head = doc.head || doc.querySelector('head')
  head.appendChild(domElement)
  return domElement
}

/**
 * Apply a resolved metadata object to the live DOM.
 */
export const applyMetadata = (metadata, doc) => {
  if (!isObject(metadata) || !doc) return

  for (const key in metadata) {
    const value = metadata[key]
    if (value === undefined || value === null) continue

    const metaObj = META_TAGS[key]
    if (!metaObj) continue

    const query = createQuery(metaObj)
    const domElement = doc.querySelector(query) || createMetaElement(metaObj, doc)
    if (!domElement) continue

    if (key === 'title') {
      domElement.textContent = value
    } else if (metaObj.valueAttr) {
      domElement.setAttribute(metaObj.valueAttr, value)
    } else {
      domElement.setAttribute('content', value)
    }
  }
}

// ── SSR (brender) ───────────────────────────────────────────────────────────

const esc = (text) => {
  if (text === null || text === undefined) return ''
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return text.toString().replace(/[&<>"']/g, (m) => map[m])
}

/**
 * Generate HTML string of <head> tags from metadata.
 * Used by brender for SSR output.
 */
export const generateHeadHtml = (metadata) => {
  const tags = [
    '<meta charset="UTF-8">'
  ]

  // Track which keys we've already handled via the hardcoded tags above
  const SKIP_KEYS = new Set(['charset'])
  let hasViewport = false

  for (const [key, value] of Object.entries(metadata)) {
    if (!value && value !== 0 && value !== false) continue
    if (SKIP_KEYS.has(key)) continue

    if (key === 'title') {
      tags.push(`<title>${esc(value)}</title>`)
      continue
    }

    // Viewport — emit once, prefer metadata value over default
    if (key === 'viewport') {
      if (!hasViewport) {
        tags.push(`<meta name="viewport" content="${esc(value)}">`)
        hasViewport = true
      }
      continue
    }

    if (key === 'canonical') {
      tags.push(`<link rel="canonical" href="${esc(value)}">`)
      continue
    }

    // Icon / favicon → <link rel="icon">
    if (key === 'icon' || key === 'favicon') {
      const href = esc(value)
      const type = href.endsWith('.svg') ? ' type="image/svg+xml"' : href.endsWith('.png') ? ' type="image/png"' : ''
      tags.push(`<link rel="icon" href="${href}"${type}>`)
      continue
    }

    // Multiple favicons (different sizes)
    if (key === 'favicons' && Array.isArray(value)) {
      value.forEach(fav => {
        if (typeof fav === 'object') {
          const attrs = Object.entries(fav)
            .map(([k, v]) => `${k}="${esc(v)}"`)
            .join(' ')
          tags.push(`<link rel="icon" ${attrs}>`)
        } else if (typeof fav === 'string') {
          tags.push(`<link rel="icon" href="${esc(fav)}">`)
        }
      })
      continue
    }

    if (key === 'alternate' && Array.isArray(value)) {
      value.forEach(alt => {
        if (typeof alt === 'object') {
          const attrs = Object.entries(alt)
            .map(([k, v]) => `${k}="${esc(v)}"`)
            .join(' ')
          tags.push(`<link rel="alternate" ${attrs}>`)
        }
      })
      continue
    }

    const propertyPrefixes = ['og:', 'article:', 'product:', 'fb:', 'profile:', 'book:', 'business:', 'music:', 'video:']
    const namePrefixes = ['twitter:', 'DC:', 'DCTERMS:']
    const isProperty = propertyPrefixes.some(p => key.startsWith(p))
    const isName = namePrefixes.some(p => key.startsWith(p))

    if (key.startsWith('http-equiv:')) {
      const httpKey = key.replace('http-equiv:', '')
      tags.push(`<meta http-equiv="${esc(httpKey)}" content="${esc(value)}">`)
    } else if (key.startsWith('itemprop:')) {
      const itemKey = key.replace('itemprop:', '')
      tags.push(`<meta itemprop="${esc(itemKey)}" content="${esc(value)}">`)
    } else if (isProperty) {
      if (Array.isArray(value)) {
        value.forEach(v => tags.push(`<meta property="${esc(key)}" content="${esc(v)}">`))
      } else {
        tags.push(`<meta property="${esc(key)}" content="${esc(value)}">`)
      }
    } else if (isName) {
      tags.push(`<meta name="${esc(key)}" content="${esc(value)}">`)
    } else {
      if (Array.isArray(value)) {
        value.forEach(v => tags.push(`<meta name="${esc(key)}" content="${esc(v)}">`))
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        tags.push(`<meta name="${esc(key)}" content="${esc(value)}">`)
      }
    }
  }

  // Ensure viewport is always present
  if (!hasViewport) {
    tags.splice(1, 0, '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">')
  }

  return tags.join('\n')
}

// ── DOMQL component ─────────────────────────────────────────────────────────

/**
 * Helmet component — extend your app or page with this to enable
 * runtime metadata via the `metadata` property.
 *
 * Usage:
 *   { extends: Helmet, metadata: { title: 'My Page' } }
 *   { extends: Helmet, metadata: (el, s) => ({ title: s.pageTitle }) }
 *   { extends: Helmet, metadata: { title: (el, s) => s.pageTitle } }
 */
export const Helmet = {
  define: {
    metadata: (param, el, state) => {
      const doc = el.context?.document || (typeof document !== 'undefined' && document)
      if (!doc) return

      const resolved = resolveMetadata(param, el, state)
      applyMetadata(resolved, doc)

      // Store on root state for interop
      const rootState = el.state?.root
      if (isObject(rootState)) rootState.$helmet = resolved
    }
  }
}

// ── domql plugin ─────────────────────────────────────────────────────────

/**
 * Helmet as a domql plugin.
 *
 * Applies metadata on element create/update lifecycle.
 * Use instead of (or alongside) the define system.
 *
 * Usage:
 *   context.plugins = [helmetPlugin]
 */
export const helmetPlugin = {
  name: 'helmet',

  create (element) {
    const param = element.metadata || element.props?.metadata
    if (!param) return
    const doc = element.context?.document || (typeof document !== 'undefined' && document)
    if (!doc) return
    const resolved = resolveMetadata(param, element, element.state)
    applyMetadata(resolved, doc)
  },

  update (element) {
    const param = element.metadata || element.props?.metadata
    if (!param) return
    const doc = element.context?.document || (typeof document !== 'undefined' && document)
    if (!doc) return
    const resolved = resolveMetadata(param, element, element.state)
    applyMetadata(resolved, doc)
  }
}

export default Helmet
