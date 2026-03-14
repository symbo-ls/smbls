'use strict'

import { isFunction, isObject } from '@domql/utils'

// --- Storage helpers ---

const STORAGE_KEY_LANG = 'smbls_lang'
const STORAGE_KEY_TRANSLATIONS = 'smbls_t_'
const STORAGE_KEY_VERSION = 'smbls_tv_'

const storage = {
  get (key) {
    try { return window?.localStorage.getItem(key) } catch (e) { return null }
  },
  set (key, val) {
    try { window?.localStorage.setItem(key, val) } catch (e) {}
  },
  remove (key) {
    try { window?.localStorage.removeItem(key) } catch (e) {}
  }
}

// --- In-flight deduplication ---

const loading = {}

// --- Core API ---

/**
 * Get the active language.
 * Resolution: state.root.lang > polyglot.defaultLang > 'en'
 */
export function getActiveLang () {
  const ctx = this?.context
  const poly = ctx?.polyglot
  const root = this?.state?.root || ctx?.state?.root
  return root?.lang || poly?.defaultLang || 'en'
}

/**
 * Get all configured languages.
 * Returns array of language codes.
 */
export function getLanguages () {
  const poly = this?.context?.polyglot
  if (!poly) return []
  if (poly.languages) return poly.languages
  // Derive from static translations keys
  if (poly.translations) return Object.keys(poly.translations)
  return []
}

/**
 * Resolve a value from an object by key.
 * Supports direct lookup and dot-path resolution (e.g. 'nav.about').
 */
const resolve = (obj, key) => {
  if (!obj || !key) return undefined
  // Direct lookup first (fast path)
  if (obj[key] !== undefined) return obj[key]
  // Dot-path resolution (e.g. 'nav.about' → obj.nav.about)
  if (key.indexOf('.') === -1) return undefined
  const parts = key.split('.')
  let result = obj
  for (let i = 0; i < parts.length; i++) {
    if (result == null) return undefined
    result = result[parts[i]]
  }
  return result
}

/**
 * Resolve a language-suffixed field from state.
 * e.g. resolveSuffixed(state, 'item.title', 'ka') → state.item.title_ka
 */
const resolveSuffixed = (obj, key, lang) => {
  const dotIdx = key.lastIndexOf('.')
  if (dotIdx === -1) return obj[key + '_' + lang]
  const parent = resolve(obj, key.substring(0, dotIdx))
  if (parent == null) return undefined
  return parent[key.substring(dotIdx + 1) + '_' + lang]
}

/**
 * Translate a key using the current language.
 * Priority: element state (suffixed) > context translations (static + server) > fallback.
 * Supports dot-path keys (e.g. 'item.title') for nested objects.
 */
export function translate (key, lang) {
  if (!key) return ''
  const ctx = this?.context
  const poly = ctx?.polyglot
  const activeLang = lang || this.call('getActiveLang')
  const state = this?.state

  // 1. Language-suffixed fields in element state (e.g. title_ka, item.description_en)
  if (state) {
    const val = resolveSuffixed(state, key, activeLang)
    if (val !== undefined) return val
  }

  // 2. Static translations from context
  if (poly?.translations) {
    const langMap = poly.translations[activeLang]
    if (langMap) {
      const val = resolve(langMap, key)
      if (val !== undefined) return val
    }
  }

  // 3. Server-loaded translations in root state
  const root = state?.root || ctx?.state?.root
  const serverTranslations = root?.translations
  if (serverTranslations) {
    const langMap = serverTranslations[activeLang]
    if (langMap) {
      const val = resolve(langMap, key)
      if (val !== undefined) return val
    }
  }

  // 4. Fallback: defaultLang state > defaultLang static > key itself
  const defaultLang = poly?.defaultLang || 'en'
  if (state) {
    const val = resolveSuffixed(state, key, defaultLang)
    if (val !== undefined) return val
  }
  if (poly?.translations) {
    const fallback = poly.translations[defaultLang]
    if (fallback) {
      const val = resolve(fallback, key)
      if (val !== undefined) return val
    }
  }

  return key
}

/**
 * Load translations for a language.
 * Handles both static (immediate) and server (async with caching).
 */
export async function loadTranslations (lang) {
  const ctx = this?.context
  const poly = ctx?.polyglot
  const root = this?.state?.root || ctx?.state?.root

  if (!poly || !root) return

  const prefix = poly.storagePrefix || STORAGE_KEY_TRANSLATIONS
  const versionPrefix = poly.storageVersionPrefix || (poly.storagePrefix ? poly.storagePrefix.replace(/_$/, 'v_') : STORAGE_KEY_VERSION)

  // Static translations — already in poly.translations, nothing to load
  if (poly.translations && poly.translations[lang] && !poly.fetch) return

  // No server fetch configured — nothing to do
  if (!poly.fetch) return

  // Skip if a previous fetch for this lang already failed (e.g. missing RPC)
  if (poly._fetchFailed?.[lang]) return

  // 1. Serve cached immediately (localStorage > state)
  if (!root.translations?.[lang]) {
    const raw = storage.get(prefix + lang)
    if (raw) {
      try {
        const cached = JSON.parse(raw)
        const patch = { translations: { ...(root.translations || {}) } }
        patch.translations[lang] = cached
        if (root.update) root.update(patch)
      } catch (e) {}
    }
  }

  // 2. Deduplicate in-flight requests
  const loadingKey = (poly.storagePrefix || 'smbls') + ':' + lang
  if (loading[loadingKey]) return loading[loadingKey]

  const self = this

  // 3. Background revalidation
  loading[loadingKey] = (async () => {
    try {
      const fetchConfig = poly.fetch
      const cachedVersion = parseInt(storage.get(versionPrefix + lang), 10) || 0

      let translations, version, changed

      if (isFunction(fetchConfig)) {
        // Custom fetch function: (lang, cachedVersion, element) => { translations, version, changed }
        const result = await fetchConfig(lang, cachedVersion, self)
        if (!result || result.changed === false) return
        translations = result.translations || result.data || result
        version = result.version || 0
        changed = true
      } else if (isObject(fetchConfig)) {
        // RPC-style fetch via db adapter (xma pattern)
        const getDB = self.getDB || (() => ctx.fetch)
        const db = isFunction(getDB) ? await getDB.call(self) : ctx.fetch
        if (!db) return

        const rpcName = fetchConfig.rpc || fetchConfig.from || 'get_translations_if_changed'
        const params = {
          p_lang: lang,
          p_cached_version: cachedVersion,
          ...(fetchConfig.params || {})
        }

        const res = await db.rpc({ from: rpcName, params })
        if (res.error) {
          // Mark as failed to avoid repeated calls for missing RPCs
          if (!poly._fetchFailed) poly._fetchFailed = {}
          poly._fetchFailed[lang] = true
          throw res.error
        }

        const result = res.data
        if (!result || !result.changed) return
        translations = result.translations || {}
        version = result.version || 0
        changed = true
      } else {
        return
      }

      if (!changed || !translations) return

      // Persist to localStorage
      storage.set(prefix + lang, JSON.stringify(translations))
      if (version) storage.set(versionPrefix + lang, String(version))

      // Update state
      const patch = { translations: { ...(root.translations || {}) } }
      patch.translations[lang] = translations
      if (root.update) root.update(patch)
    } catch (err) {
      if (poly.verbose !== false) {
        const msg = err?.message || err?.details || (typeof err === 'object' ? JSON.stringify(err) : String(err))
        console.warn('[polyglot] Failed to load translations for', lang, '-', msg)
      }
    } finally {
      delete loading[loadingKey]
    }
  })()

  return loading[loadingKey]
}

/**
 * Switch the active language.
 * Persists preference, loads translations, updates state + context.
 */
export async function setLang (lang) {
  const ctx = this?.context
  const poly = ctx?.polyglot
  const root = this?.state?.root || ctx?.state?.root

  if (!root) return
  if (this.call('getActiveLang') === lang) return

  // Persist to localStorage
  const storageKey = poly?.storageLangKey || STORAGE_KEY_LANG
  storage.set(storageKey, lang)

  // Load server translations if needed
  if (poly?.fetch) {
    await this.call('loadTranslations', lang)
  }

  // Update root state
  if (root.update) root.update({ lang })
}

/**
 * Upsert a translation (CMS/admin use).
 * Works with server-backed translations.
 */
export async function upsertTranslation (key, lang, text) {
  const ctx = this?.context
  const poly = ctx?.polyglot
  const root = this?.state?.root || ctx?.state?.root

  // Update local state immediately (optimistic)
  if (root?.translations?.[lang]) {
    root.translations[lang][key] = text
  }

  // Also update static translations if present
  if (poly?.translations?.[lang]) {
    poly.translations[lang][key] = text
  }

  // Persist to server if fetch is configured
  if (poly?.fetch && isObject(poly.fetch)) {
    const getDB = this.getDB || (() => ctx.fetch)
    const db = isFunction(getDB) ? await getDB.call(this) : ctx.fetch
    if (!db) return

    const table = poly.fetch.table || 'translations'
    const result = await db.upsert({ from: table, data: { key, lang, text } })
    if (result?.error) throw result.error
    return result.data
  }
}

/**
 * Initialize polyglot on app start.
 * Reads persisted language, loads translations.
 */
export async function initPolyglot () {
  const ctx = this?.context
  const poly = ctx?.polyglot
  if (!poly) return

  const root = this?.state?.root || ctx?.state?.root
  if (!root) return

  // Read persisted language
  const storageKey = poly.storageLangKey || STORAGE_KEY_LANG
  const persisted = storage.get(storageKey)
  const lang = persisted || poly.defaultLang || root.lang || 'en'

  // Set active language in root state
  if (root.update && root.lang !== lang) {
    root.update({ lang })
  }

  // Load translations
  if (poly.fetch) {
    await this.call('loadTranslations', lang)
  }
}

/**
 * Resolve a language-suffixed field from element state.
 * {{ title_ | getLocalStateLang }} → state.title_ka
 * {{ item.title_ | getLocalStateLang }} → state.item.title_ka
 */
export function getLocalStateLang (key) {
  try {
    const poly = this?.context?.polyglot
    const root = this?.state?.root || this?.context?.state?.root
    const lang = root?.lang || poly?.defaultLang || 'en'
    const state = this?.state
    if (!state) return ''
    const dotIdx = key.lastIndexOf('.')
    if (dotIdx === -1) return state[key + lang] ?? ''
    const parts = key.substring(0, dotIdx).split('.')
    let obj = state
    for (let i = 0; i < parts.length; i++) {
      if (obj == null) return ''
      obj = obj[parts[i]]
    }
    if (obj == null) return ''
    return obj[key.substring(dotIdx + 1) + lang] ?? ''
  } catch (e) { return '' }
}

// --- domql plugin ---

/**
 * Polyglot plugin for domql.
 *
 * Configuration via context.polyglot:
 *
 * Static translations (realhome/smartcapital):
 *   context.polyglot = {
 *     defaultLang: 'en',
 *     languages: ['en', 'ka', 'ru'],
 *     translations: {
 *       en: { hello: 'Hello', bye: 'Goodbye' },
 *       ka: { hello: 'გამარჯობა', bye: 'ნახვამდის' }
 *     }
 *   }
 *
 * Server translations (xma):
 *   context.polyglot = {
 *     defaultLang: 'ka',
 *     languages: ['ka', 'en'],
 *     fetch: {
 *       rpc: 'get_translations_if_changed',
 *       table: 'translations'
 *     }
 *   }
 *
 * Custom fetch function:
 *   context.polyglot = {
 *     defaultLang: 'en',
 *     languages: ['en', 'ka'],
 *     fetch: async (lang, cachedVersion, element) => {
 *       const res = await fetch(`/api/translations/${lang}?v=${cachedVersion}`)
 *       return res.json() // { changed, version, translations }
 *     }
 *   }
 *
 * Mixed (static base + server overrides):
 *   context.polyglot = {
 *     defaultLang: 'en',
 *     languages: ['en', 'ka'],
 *     translations: { en: { ... }, ka: { ... } },
 *     fetch: { rpc: 'get_translations_if_changed' }
 *   }
 */
export const polyglotPlugin = {
  name: 'polyglot',

  // Initialize on app render — load persisted language + translations
  render (element) {
    // Only init once on the root element
    if (element.parent && element.parent.parent) return
    if (element.__polyglotInitialized) return
    element.__polyglotInitialized = true
    initPolyglot.call(element)
  }
}

export default polyglotPlugin
