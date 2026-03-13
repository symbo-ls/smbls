import { createEnv } from './env.js'
import { resetKeys, assignKeys, mapKeysToElements } from './keys.js'
import { loadProject, loadAndRenderAll } from './load.js'
import { render, renderElement, renderRoute, renderPage, resetGlobalCSSCache } from './render.js'
import { extractMetadata, generateHeadHtml } from './metadata.js'
import { collectBrNodes, hydrate } from './hydrate.js'
import { generateSitemap } from './sitemap.js'
import { prefetchPageData, injectPrefetchedState } from './prefetch.js'

export {
  createEnv,
  resetKeys,
  assignKeys,
  mapKeysToElements,
  loadProject,
  loadAndRenderAll,
  render,
  renderElement,
  renderRoute,
  renderPage,
  resetGlobalCSSCache,
  extractMetadata,
  generateHeadHtml,
  collectBrNodes,
  hydrate,
  generateSitemap,
  prefetchPageData,
  injectPrefetchedState
}

export default {
  createEnv,
  resetKeys,
  assignKeys,
  mapKeysToElements,
  loadProject,
  loadAndRenderAll,
  render,
  renderElement,
  renderRoute,
  renderPage,
  resetGlobalCSSCache,
  extractMetadata,
  generateHeadHtml,
  collectBrNodes,
  hydrate,
  generateSitemap,
  prefetchPageData,
  injectPrefetchedState
}
