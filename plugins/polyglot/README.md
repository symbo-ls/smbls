# @symbo.ls/polyglot

Language switching and translation plugin for DOMQL. Handles static translations, server-backed translations, or both. Stores active language and translations in root state, persists language preference to localStorage, and integrates with the fetch plugin for automatic `lang` param injection.

## Setup

### Static translations (realhome / smartcapital style)

```js
context.polyglot = {
  defaultLang: 'en',
  languages: ['en', 'ka', 'ru'],
  translations: {
    en: { hello: 'Hello', search: 'Search' },
    ka: { hello: 'გამარჯობა', search: 'ძიება' },
    ru: { hello: 'Привет', search: 'Поиск' }
  }
}
context.plugins = [polyglotPlugin]
```

### Server translations (xma style)

```js
context.polyglot = {
  defaultLang: 'ka',
  languages: ['ka', 'en'],
  fetch: {
    rpc: 'get_translations_if_changed',  // RPC function name
    table: 'translations'                // table for upsert (CMS)
  }
}
context.plugins = [polyglotPlugin]
```

The RPC function should accept `p_lang` and `p_cached_version`, returning:
```json
{ "changed": true, "version": 5, "translations": { "key": "value" } }
```

### Custom fetch function

```js
context.polyglot = {
  defaultLang: 'en',
  languages: ['en', 'ka'],
  fetch: async (lang, cachedVersion, element) => {
    const res = await fetch(`/api/translations/${lang}?v=${cachedVersion}`)
    return res.json() // { changed, version, translations }
  }
}
```

### Mixed (static base + server overrides)

```js
context.polyglot = {
  defaultLang: 'en',
  languages: ['en', 'ka'],
  translations: {
    en: { hello: 'Hello', search: 'Search' },
    ka: { hello: 'გამარჯობა', search: 'ძიება' }
  },
  fetch: { rpc: 'get_translations_if_changed' }
}
```

Static translations serve as the base. Server translations override them when loaded. This lets you ship core UI strings in the bundle while managing content translations in the database.

## Using translations

### Via context functions

Register the polyglot functions:

```js
import { polyglotFunctions } from '@symbo.ls/polyglot/functions'

context.functions = { ...context.functions, ...polyglotFunctions }
```

Then use in components:

```js
// Direct translation
{ text: (el) => el.call('t', 'hello') }

// Reactive wrapper (re-evaluates on language change)
{ text: (el) => el.call('tr', 'hello') }

// Switch language
{ on: { click: (_, __, el) => el.call('setLang', 'ka') } }

// Get active language
{ text: (el) => el.call('getLang') }

// Get all languages
{ props: { languages: (el) => el.call('getLanguages') } }
```

### Via direct import

```js
import { translate, tr, setLang, getActiveLang, getLanguages } from '@symbo.ls/polyglot'

// In a component
{
  text: (el) => translate('hello', el),
  Button: {
    text: 'KA',
    on: { click: (_, __, el) => setLang('ka', el) }
  }
}
```

## Language switching

```js
import { setLang } from '@symbo.ls/polyglot'

// Switches language, persists to localStorage, loads server translations if needed
await setLang('en', element)
```

What `setLang` does:
1. Persists language to localStorage (`smbls_lang`)
2. Loads server translations if `polyglot.fetch` is configured
3. Updates `state.root.lang`

## Fetch plugin integration

When polyglot sets `state.root.lang`, the fetch plugin automatically:
- Adds `lang` to query params on every request
- Sets `Accept-Language` header on every request

No extra configuration needed — they integrate through `state.root.lang`.

## CMS / admin

Upsert translations for server-backed setups:

```js
// Via function
el.call('upsertTranslation', 'ui.nav.home', 'en', 'Home')

// Via import
import { upsertTranslation } from '@symbo.ls/polyglot'
await upsertTranslation('ui.nav.home', 'en', 'Home', element)
```

This updates the local state immediately (optimistic) and persists to the database.

## Caching

Server translations use stale-while-revalidate:

1. **Instant** — serves from `state.root.translations` or localStorage
2. **Background** — calls the RPC with `p_cached_version` to check for updates
3. **Smart update** — only downloads translations if server version changed

Cached data:
- `smbls_lang` — active language code
- `smbls_t_{lang}` — translations JSON
- `smbls_tv_{lang}` — version number

### Custom storage prefix

```js
context.polyglot = {
  storagePrefix: 'myapp_t_',
  storageLangKey: 'myapp_lang',
  // ...
}
```

## Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `defaultLang` | string | `'en'` | Default language |
| `languages` | string[] | derived from translations | Available language codes |
| `translations` | object | — | Static translations `{ lang: { key: value } }` |
| `fetch` | object/function | — | Server translation config |
| `fetch.rpc` | string | `'get_translations_if_changed'` | RPC function name |
| `fetch.table` | string | `'translations'` | Table name for upsert |
| `fetch.params` | object | — | Extra params for RPC call |
| `storagePrefix` | string | `'smbls_t_'` | localStorage key prefix for translations |
| `storageLangKey` | string | `'smbls_lang'` | localStorage key for active language |
| `verbose` | boolean | `true` | Log errors to console |

## State shape

Polyglot reads/writes to `state.root`:

```js
state.root.lang          // active language code (e.g. 'en')
state.root.translations  // { en: { key: value }, ka: { key: value } }
```

## domql plugin

```js
import { polyglotPlugin } from '@symbo.ls/polyglot'

context.plugins = [polyglotPlugin]
```

The plugin auto-initializes on the root element's `render` lifecycle — reads persisted language from localStorage, sets `state.root.lang`, and loads server translations if configured.
