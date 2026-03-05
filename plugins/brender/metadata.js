/**
 * Extracts metadata for a given route from project data.
 * Compatible with the server's seo.js getPageMetadata/generateMetaTags.
 *
 * Pages can define metadata via:
 *   - page.metadata (standard)
 *   - page.helmet (legacy)
 *   - page.state (fallback: state-level title/description)
 *
 * Global SEO is merged from data.integrations.seo
 */
export const extractMetadata = (data, route = '/') => {
  const pages = data.pages || {}
  const page = pages[route]

  let metadata = {}

  // Merge global SEO settings first (lower priority)
  if (data.integrations?.seo) {
    metadata = { ...data.integrations.seo }
  }

  if (page) {
    // Page-level metadata (highest priority)
    const pageMeta = page.metadata || page.helmet || {}
    metadata = { ...metadata, ...pageMeta }

    // Fallback: extract title/description from page state if not set
    if (!metadata.title && page.state?.title) {
      metadata.title = page.state.title
    }
    if (!metadata.description && page.state?.description) {
      metadata.description = page.state.description
    }
  }

  // Ensure title always exists
  if (!metadata.title) {
    metadata.title = data.name || 'Symbols'
  }

  return metadata
}

/**
 * Generates an HTML <head> string from metadata.
 * Can be used standalone or alongside the server's existing generateMetaTags.
 */
export const generateHeadHtml = (metadata) => {
  const esc = (text) => {
    if (text === null || text === undefined) return ''
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' }
    return text.toString().replace(/[&<>"']/g, (m) => map[m])
  }

  const tags = [
    '<meta charset="UTF-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">'
  ]

  for (const [key, value] of Object.entries(metadata)) {
    if (!value && value !== 0 && value !== false) continue

    if (key === 'title') {
      tags.push(`<title>${esc(value)}</title>`)
      continue
    }

    if (key === 'canonical') {
      tags.push(`<link rel="canonical" href="${esc(value)}">`)
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

    // Prefixed property tags (og:, twitter:, article:, etc.)
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
    } else if (key !== 'favicon' && key !== 'favicons') {
      // Standard meta name tag
      if (Array.isArray(value)) {
        value.forEach(v => tags.push(`<meta name="${esc(key)}" content="${esc(v)}">`))
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        tags.push(`<meta name="${esc(key)}" content="${esc(value)}">`)
      }
    }
  }

  return tags.join('\n')
}
