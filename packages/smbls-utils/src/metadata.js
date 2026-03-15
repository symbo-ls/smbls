'use strict'

import { isObject } from '@domql/utils'

const escapeHtml = (text) => {
  if (text === null || text === undefined) return ''
  const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
  return text.toString().replace(/[&<>"']/g, (m) => map[m])
}

const buildAttrs = (obj) =>
  Object.entries(obj || {})
    .filter(([_, v]) => v !== undefined)
    .map(([k, v]) => `${k}="${escapeHtml(v)}"`)
    .join(' ')

/**
 * Generates HTML meta tags from a flat metadata object.
 * Works on both server (SSR head injection) and client (dynamic meta updates).
 */
export const generateMetaTags = (metadata, isProduction) => {
  if (!isProduction) {
    const faviconTag = (() => {
      const fv = metadata?.favicon || metadata?.favicons
      if (!fv) return '<link rel="icon" href="/favicon.ico">'
      if (typeof fv === 'string') return `<link rel="icon" href="${escapeHtml(fv)}">`
      if (Array.isArray(fv)) {
        return fv
          .map((item) =>
            typeof item === 'string'
              ? `<link rel="icon" href="${escapeHtml(item)}">`
              : `<link ${buildAttrs({ rel: 'icon', ...item })}>`
          )
          .join('\n')
      }
      return `<link ${buildAttrs({ rel: 'icon', ...fv })}>`
    })()

    return [
      '<meta charset="UTF-8">',
      `<title>${escapeHtml(metadata.title || 'Test')}</title>`,
      '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">',
      '<meta name="robots" content="noindex">',
      '<meta name="apple-mobile-web-app-capable" content="yes">',
      faviconTag
    ].join('\n')
  }

  const tags = Object.entries(metadata).reduce(
    (acc, [key, value]) => {
      if (!value && value !== 0 && value !== false) return acc

      if (key === 'title') {
        acc.push(`<title>${escapeHtml(value)}</title>`)
        return acc
      }

      if (key === 'canonical') {
        acc.push(`<link rel="canonical" href="${escapeHtml(value)}">`)
        return acc
      }

      if (key === 'manifest') {
        acc.push(`<link rel="manifest" href="${escapeHtml(value)}">`)
        return acc
      }

      if (key === 'favicon' || key === 'favicons' || key === 'icon' || key === 'icons') {
        const items = Array.isArray(value) ? value : [value]
        items.forEach((item) => {
          if (typeof item === 'string') {
            acc.push(`<link rel="icon" href="${escapeHtml(item)}">`)
          } else if (typeof item === 'object') {
            const attrs = buildAttrs(item)
            if (!/rel=/.test(attrs)) {
              acc.push(`<link rel="icon" ${attrs}>`)
            } else {
              acc.push(`<link ${attrs}>`)
            }
          }
        })
        return acc
      }

      if (key === 'alternate') {
        const alternates = Array.isArray(value) ? value : [value]
        alternates.forEach((alt) => {
          if (typeof alt === 'object') {
            const attrs = Object.entries(alt)
              .filter(([_, attrValue]) => attrValue !== undefined)
              .map(([attrKey, attrValue]) => `${attrKey}="${escapeHtml(attrValue)}"`)
              .join(' ')
            acc.push(`<link rel="alternate" ${attrs}>`)
          }
        })
        return acc
      }

      const processMetaTag = (tagKey, tagValue, attrType = 'name') => {
        if (
          typeof tagValue === 'string' ||
          typeof tagValue === 'number' ||
          typeof tagValue === 'boolean'
        ) {
          acc.push(`<meta ${attrType}="${escapeHtml(tagKey)}" content="${escapeHtml(tagValue)}">`)
        } else if (Array.isArray(tagValue)) {
          tagValue.forEach((item) => {
            if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
              acc.push(`<meta ${attrType}="${escapeHtml(tagKey)}" content="${escapeHtml(item)}">`)
            } else if (typeof item === 'object') {
              const attrs = Object.entries(item)
                .filter(([_, attrValue]) => attrValue !== undefined)
                .map(([attrKey, attrValue]) => `${attrKey}="${escapeHtml(attrValue)}"`)
                .join(' ')
              acc.push(`<meta ${attrs}>`)
            }
          })
        } else if (typeof tagValue === 'object') {
          const attrs = Object.entries(tagValue)
            .filter(([_, attrValue]) => attrValue !== undefined)
            .map(([attrKey, attrValue]) => `${attrKey}="${escapeHtml(attrValue)}"`)
            .join(' ')
          acc.push(`<meta ${attrs}>`)
        }
      }

      if (key.startsWith('http-equiv:')) {
        const httpEquivKey = key.replace('http-equiv:', '')
        processMetaTag(httpEquivKey, value, 'http-equiv')
        return acc
      }

      if (key.startsWith('itemprop:')) {
        const itempropKey = key.replace('itemprop:', '')
        processMetaTag(itempropKey, value, 'itemprop')
        return acc
      }

      const prefixes = [
        'og:', 'twitter:', 'fb:', 'article:', 'profile:', 'book:',
        'business:', 'music:', 'product:', 'video:', 'DC:', 'DCTERMS:'
      ]
      const prefix = prefixes.find((p) => key.startsWith(p))
      if (prefix) {
        const tagKey = key.replace(prefix, '')
        processMetaTag(
          `${prefix.replace(':', '')}:${tagKey}`,
          value,
          prefix === 'twitter:' || prefix === 'DC:' || prefix === 'DCTERMS:' ? 'name' : 'property'
        )
        return acc
      }

      if (key.startsWith('apple:') || key.startsWith('msapplication:')) {
        const pfx = key.startsWith('apple:') ? 'apple-' : 'msapplication-'
        const tagKey = key.replace(/^apple:|^msapplication:/, '')
        processMetaTag(`${pfx}${tagKey}`, value, 'name')
        return acc
      }

      processMetaTag(key, value)
      return acc
    },
    [
      '<meta charset="UTF-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">'
    ]
  )

  return tags.join('\n')
}

/**
 * Extract page-level metadata from project data for a given pathname.
 * Merges global SEO (data.integrations.seo) with page-level metadata/helmet/state.
 */
/**
 * Check if a string looks like a bare filename (not an absolute path or URL).
 * These are references to project files from `data.files`.
 */
const isBareFilename = (val) =>
  typeof val === 'string' && val.length > 0 && !val.startsWith('/') && !val.startsWith('http')

/**
 * Resolve bare filename references in metadata values against `data.files`.
 * If a metadata value is a plain filename (e.g. "logo.png") and a matching
 * entry exists in `data.files`, replace it with the file's `src` URL.
 */
function resolveFileReferences (metadata, files) {
  if (!files || typeof files !== 'object') return metadata

  const resolve = (val) => {
    if (!isBareFilename(val)) return val
    const fileEntry = files[val]
    if (fileEntry?.src) return fileEntry.src
    return val
  }

  const result = { ...metadata }
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'string') {
      result[key] = resolve(value)
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) =>
        typeof item === 'string' ? resolve(item) : item
      )
    }
  }
  return result
}

/**
 * Resolve a dot-path like "item.title_ka" against an object.
 */
function resolveDotPath (obj, path) {
  if (!obj || !path) return undefined
  const parts = path.split('.')
  let v = obj
  for (const p of parts) {
    if (v == null || typeof v !== 'object') return undefined
    v = v[p]
  }
  return v
}

/**
 * Resolve {{ key | polyglot }} and {{ key | getLocalStateLang }} templates
 * in metadata string values using project polyglot translations and SSR state.
 */
function resolveMetadataTemplates (metadata, data, ssrContext) {
  const config = data.config || data.settings || {}
  const polyglot = config.polyglot || data.polyglot
  const defaultLang = ssrContext?.lang || polyglot?.defaultLang || 'en'
  const translations = polyglot?.translations || {}
  const langMap = translations[defaultLang] || {}
  const state = ssrContext?.state || {}

  const result = { ...metadata }
  for (const [key, value] of Object.entries(result)) {
    if (typeof value !== 'string' || !value.includes('{{')) continue

    result[key] = value.replace(/\{\{\s*([^|{}]+?)\s*(?:\|\s*(\w+)\s*)?\}\}/g, (match, k, filter) => {
      const trimmed = k.trim()

      if (filter === 'polyglot') {
        return langMap[trimmed] ?? resolveDotPath(langMap, trimmed) ?? match
      }

      if (filter === 'getLocalStateLang') {
        // key is like "item.title_" — append lang
        const resolved = resolveDotPath(state, trimmed + defaultLang)
        return resolved ?? match
      }

      // No filter — try state lookup, then polyglot
      const fromState = resolveDotPath(state, trimmed)
      if (fromState !== undefined) return fromState

      return langMap[trimmed] ?? resolveDotPath(langMap, trimmed) ?? match
    })
  }
  return result
}

/**
 * Convert function-string metadata values to {{ }} templates.
 * Handles common patterns from Symbols page definitions:
 *   (el, s) => s.item ? el.call("getLocalStateLang", "item.title_") : ""
 *   (el, s) => s.item ? s.item.image_url : ""
 */
function convertFunctionMetaToTemplates (metadata) {
  const result = { ...metadata }
  for (const [key, value] of Object.entries(result)) {
    if (typeof value === 'function') {
      const src = value.toString()
      // Pattern: el.call("getLocalStateLang", "item.title_")
      const langMatch = src.match(/el\.call\(\s*["']getLocalStateLang["']\s*,\s*["']([^"']+)["']\s*\)/)
      if (langMatch) {
        result[key] = `{{ ${langMatch[1]} | getLocalStateLang }}`
        continue
      }
      // Pattern: el.call("polyglot", "item.description")
      const polyMatch = src.match(/el\.call\(\s*["']polyglot["']\s*,\s*["']([^"']+)["']\s*\)/)
      if (polyMatch) {
        result[key] = `{{ ${polyMatch[1]} | polyglot }}`
        continue
      }
      // Pattern: s.item.field or s.item?.field
      const stateMatch = src.match(/s\.(\w+(?:\.\w+)+)/)
      if (stateMatch) {
        result[key] = `{{ ${stateMatch[1]} }}`
        continue
      }
      // Could not parse — drop function value
      delete result[key]
    } else if (typeof value === 'string') {
      // Function-string (not yet destringified)
      const langMatch = value.match(/el\.call\(\s*["']getLocalStateLang["']\s*,\s*["']([^"']+)["']\s*\)/)
      if (langMatch) {
        result[key] = `{{ ${langMatch[1]} | getLocalStateLang }}`
        continue
      }
      const polyMatch = value.match(/el\.call\(\s*["']polyglot["']\s*,\s*["']([^"']+)["']\s*\)/)
      if (polyMatch) {
        result[key] = `{{ ${polyMatch[1]} | polyglot }}`
        continue
      }
      // Function-string with s.item.field
      if (value.includes('=>') && value.includes('s.')) {
        const stateMatch = value.match(/s\.(\w+(?:\.\w+)+)/)
        if (stateMatch) {
          result[key] = `{{ ${stateMatch[1]} }}`
          continue
        }
      }
    }
  }
  return result
}

/**
 * Extract page-level metadata from project data for a given pathname.
 * @param {object} data - Full project data
 * @param {string} pathname - Route path (e.g. '/blog/:id')
 * @param {object} [ssrContext] - SSR context for resolving dynamic metadata
 * @param {object} [ssrContext.state] - Page state with prefetched data
 * @param {string} [ssrContext.lang] - Active language code (e.g. 'ka')
 * @param {string} [ssrContext.actualPathname] - Actual URL pathname (e.g. '/blog/abc-123')
 */
export function getPageMetadata (data, pathname, ssrContext) {
  const currentPage = data.pages?.[pathname]
  const stateObject = isObject(currentPage?.state) && currentPage?.state
  const rawPageMeta = currentPage?.metadata || currentPage?.helmet || stateObject || {}

  // Convert function values to {{ }} templates instead of filtering them out
  const pageMetadata = convertFunctionMetaToTemplates(rawPageMeta)

  // Track which keys the page explicitly sets
  const pageExplicitKeys = new Set(Object.keys(pageMetadata))

  const appMetadata = data.app?.metadata || {}
  const cleanAppMeta = convertFunctionMetaToTemplates(appMetadata)

  let merged = {}
  if (data.integrations?.seo) {
    merged = { ...data.integrations.seo, ...cleanAppMeta, ...pageMetadata }
  } else if (Object.keys(cleanAppMeta).length) {
    merged = { ...cleanAppMeta, ...pageMetadata }
  } else {
    merged = { ...pageMetadata }
  }

  if (!merged.title) merged.title = data.name + ' / symbo.ls' || 'Symbols demo'

  // Resolve {{ }} templates in metadata values (polyglot, state, getLocalStateLang)
  merged = resolveMetadataTemplates(merged, data, ssrContext)

  // Auto-cascade page-level title/description to OG/Twitter tags
  if (merged.title && (pageExplicitKeys.has('title') || !merged['og:title'])) {
    if (!pageExplicitKeys.has('og:title')) {
      merged['og:title'] = merged.title
    }
  }
  if (merged.description && (pageExplicitKeys.has('description') || !merged['og:description'])) {
    if (!pageExplicitKeys.has('og:description')) {
      merged['og:description'] = merged.description
    }
  }
  if (merged.title && !merged['twitter:title']) {
    merged['twitter:title'] = merged.title
  }
  if (merged.description && !merged['twitter:description']) {
    merged['twitter:description'] = merged.description
  }

  // Make og:url route-aware — use actual pathname if available
  const routeForUrl = ssrContext?.actualPathname || pathname
  if (merged['og:url'] || merged.url) {
    const baseUrl = (merged['og:url'] || merged.url || '').replace(/\/$/, '')
    if (baseUrl && routeForUrl && routeForUrl !== '/') {
      const cleanRoute = routeForUrl.startsWith('/') ? routeForUrl : '/' + routeForUrl
      merged['og:url'] = baseUrl + cleanRoute
    }
  }

  merged = resolveFileReferences(merged, data.files)

  // Clean up any unresolved {{ }} templates (when prefetch fails or returns no data)
  const siteName = data.name || data.app?.metadata?.title || data.app?.name || ''
  for (const [key, value] of Object.entries(merged)) {
    if (typeof value === 'string' && value.includes('{{')) {
      const cleaned = value.replace(/\{\{[^}]*\}\}/g, '').trim()
      if (!cleaned) {
        if (key === 'title') merged[key] = siteName
        else delete merged[key]
      } else {
        merged[key] = cleaned
      }
    }
  }

  return merged
}
