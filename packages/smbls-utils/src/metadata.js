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

export function getPageMetadata (data, pathname) {
  const currentPage = data.pages?.[pathname]
  const stateObject = isObject(currentPage?.state) && currentPage?.state
  let pageMetadata = currentPage?.metadata || currentPage?.helmet || stateObject || {}
  const appMetadata = data.app?.metadata || {}
  if (data.integrations?.seo) {
    pageMetadata = { ...data.integrations.seo, ...appMetadata, ...pageMetadata }
  } else if (Object.keys(appMetadata).length) {
    pageMetadata = { ...appMetadata, ...pageMetadata }
  }
  if (!pageMetadata.title) pageMetadata.title = data.name + ' / symbo.ls' || 'Symbols demo'
  pageMetadata = resolveFileReferences(pageMetadata, data.files)
  return pageMetadata
}
