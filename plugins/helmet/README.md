# @symbo.ls/helmet

SEO metadata plugin for Symbols apps. Shared between runtime (browser) and SSR (brender).

## Usage

### On pages and app

Define `metadata` on your app or any page/component. It's registered as a global define, so it works on any element:

```javascript
// app.js — app-level defaults
export default {
  metadata: {
    title: 'My App',
    description: 'Built with Symbols',
    'og:image': '/social.png'
  }
}

// pages/about.js — page-level (overrides app-level)
export const about = {
  metadata: {
    title: 'About Us',
    description: 'Learn more about us'
  }
}
```

### Dynamic metadata

Both the metadata object and individual properties can be functions receiving `(element, state)`:

```javascript
// Whole object as function
export const product = {
  metadata: (el, s) => ({
    title: s.product.name,
    description: s.product.description,
    'og:image': s.product.image
  })
}

// Individual properties as functions
export const profile = {
  metadata: {
    title: (el, s) => `${s.user.name} — My App`,
    description: (el, s) => s.user.bio,
    'og:image': '/default-avatar.png'
  }
}
```

### Helmet component

For explicit use without the global define, extend the `Helmet` component:

```javascript
import { Helmet } from '@symbo.ls/helmet'

export const MyPage = {
  extends: Helmet,
  metadata: { title: 'My Page' }
}
```

## How it works

### Runtime (browser)

When `metadata` is set on an element, the define handler:

1. Resolves any function values via `resolveMetadata()`
2. Finds or creates `<title>`, `<meta>`, and `<link>` tags in `<head>` via `applyMetadata()`
3. Updates their content/attributes

### SSR (brender)

Brender calls `extractMetadata(data, route)` which:

1. Merges metadata from `data.integrations.seo` (lowest priority)
2. Merges `data.app.metadata` (medium priority)
3. Merges `page.metadata` or `page.helmet` (highest priority)
4. Falls back to `page.state.title` / `page.state.description` if not set
5. Resolves bare filenames against `data.files`

Then `generateHeadHtml(metadata)` produces the `<head>` HTML string.

## API

### `resolveMetadata(metadata, element, state)`

Resolves metadata values. If `metadata` is a function, executes it with `(element, state)`. Then executes any function values in the resulting object.

### `applyMetadata(metadata, doc)`

Applies a resolved metadata object to the live DOM. Creates or updates `<title>`, `<meta>`, and `<link>` tags.

### `extractMetadata(data, route, element?, state?)`

Extracts and merges metadata from project data for a given route. When `element` and `state` are provided, function values are resolved.

### `generateHeadHtml(metadata)`

Generates an HTML `<head>` string from a flat metadata object. Used by brender for SSR.

### `Helmet`

DOMQL component with a `define.metadata` handler. Use when you need the define on a specific component rather than globally.

## Supported keys

Standard keys with shorthand support:

| Key | Tag |
|-----|-----|
| `title` | `<title>` |
| `description` | `<meta name="description">` |
| `keywords` | `<meta name="keywords">` |
| `robots` | `<meta name="robots">` |
| `author` | `<meta name="author">` |
| `canonical` | `<link rel="canonical">` |
| `image` | `<meta property="og:image">` |
| `url` | `<meta property="og:url">` |
| `siteName` | `<meta property="og:site_name">` |
| `type` | `<meta property="og:type">` |
| `locale` | `<meta property="og:locale">` |
| `theme-color` | `<meta name="theme-color">` |

Any `og:*` or `twitter:*` key is also supported directly:

```javascript
metadata: {
  'og:title': 'Social Title',
  'og:description': 'Social description',
  'twitter:card': 'summary_large_image',
  'twitter:site': '@myapp'
}
```

The `generateHeadHtml()` function also handles `article:*`, `product:*`, `fb:*`, `DC:*`, `http-equiv:*`, `itemprop:*`, `alternate`, and `favicon`/`favicons` keys.

## domql plugin

Helmet works out of the box via the `define` system (`context.define` or `element.define`). It can also be used as a domql plugin to hook into the element lifecycle:

```js
import { helmetPlugin } from '@symbo.ls/helmet'

context.plugins = [helmetPlugin]
```

This registers helmet as a lifecycle plugin alongside other plugins like `funcqlPlugin` or `shorthandPlugin`:

```js
context.plugins = [funcqlPlugin, helmetPlugin]
```

### Plugin interface

```js
{
  name: 'helmet',
  render (element) { ... }  // applies metadata on render
}
```
