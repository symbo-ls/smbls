# smbls

[![npm version](https://img.shields.io/npm/v/smbls.svg)](https://www.npmjs.com/package/smbls)
[![npm downloads](https://img.shields.io/npm/dm/smbls.svg)](https://www.npmjs.com/package/smbls)
[![bundle size](https://img.shields.io/bundlephobia/minzip/smbls)](https://bundlephobia.com/package/smbls)
[![license](https://img.shields.io/npm/l/smbls.svg)](https://github.com/symbo-ls/smbls/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/smbls.svg)](https://nodejs.org)
[![ESM](https://img.shields.io/badge/module-ESM%20%7C%20CJS%20%7C%20IIFE-blue)](https://www.npmjs.com/package/smbls)

> The main Symbols package — bundles the entire design system ecosystem into a single import.

## Installation

```bash
npm install smbls
```

## What's Included

This package re-exports everything from:

| Package | Description |
|---------|-------------|
| `@domql/utils` | Utility functions |
| `@symbo.ls/scratch` | CSS framework and methodology |
| `@symbo.ls/emotion` | Emotion CSS-in-JS integration |
| `@symbo.ls/default-config` | Default design system configuration |
| `@symbo.ls/uikit` | Complete UI component library |
| `@symbo.ls/smbls-utils` | Symbols-specific utilities |
| `css-in-props` | CSS properties as props |
| `attrs-in-props` | HTML attributes as props |

It also includes the `@symbo.ls/cli` binary, `@symbo.ls/fetch`, `@symbo.ls/sync`, `@symbo.ls/helmet`, and `@domql/router`.

## Quick Start

### Initialize Design System

```javascript
import { init } from 'smbls'

init({
  color: {
    primary: '#3B82F6',
    gray: ['#1F2937', '#9CA3AF']  // [light, dark]
  },
  theme: {
    primary: {
      color: 'white',
      background: 'primary',
      ':hover': { opacity: '0.85' }
    }
  }
})
```

### Theme Switching

Themes switch automatically via CSS — no JavaScript re-renders needed:

```javascript
init({
  theme: {
    document: {
      '@dark': { color: 'white', background: 'black' },
      '@light': { color: 'black', background: 'white' }
    }
  }
})

// Auto: system preference drives switching
// Force: document.documentElement.dataset.theme = 'dark'
// Custom: add @ocean, @sunset, etc. — activate with data-theme="ocean"
```

### Create an Application

```javascript
import { create } from 'smbls'

const App = {
  extends: 'Flex',
  flow: 'column',

  Header: {
    extends: 'Flex',
    H1: { text: 'Hello Symbols!' }
  },

  Main: {
    extends: 'Flex',
    Button: {
      text: 'Get Started',
      theme: 'primary'
    }
  }
}

create(App, {
  key: 'your-project-key'
})
```

### Create Variants

```javascript
import { create, createAsync, createSync, createSkeleton } from 'smbls'

// Standard — renders immediately
create(App, options)

// Async — renders first, then fetches remote config
createAsync(App, options)

// Sync — fetches remote config first, then renders
await createSync(App, options)

// Skeleton — resolves extends only, no full rendering
createSkeleton(App, options)
```

## Init Options

```javascript
init(config, {
  emotion: customEmotion,       // custom Emotion instance
  useVariable: true,            // inject CSS custom properties
  useReset: true,               // inject CSS reset
  useFontImport: true,          // inject @font-face declarations
  useIconSprite: true,          // create SVG icon sprite
  useDocumentTheme: true,       // apply document-level theme
  useSvgSprite: true,           // create SVG sprite sheet
  useDefaultConfig: false,      // use built-in default config
  globalTheme: 'auto',          // 'auto' (system preference), 'dark', 'light', or custom theme name
  useThemeSuffixedVars: false,  // also generate --theme-name-dark-prop vars (opt-in)
  verbose: false                // enable verbose logging
})
```

## Additional Exports

```javascript
import {
  // Re-initialization
  reinit,        // re-apply config changes
  applyCSS,      // inject global CSS
  updateVars,    // update CSS custom properties

  // Constants
  DEFAULT_CONTEXT,
  DESIGN_SYSTEM_OPTIONS,
  ROUTER_OPTIONS
} from 'smbls'
```

## Page Metadata

Define SEO metadata on your app or individual pages. Values can be static or functions:

```javascript
// app.js — app-level defaults
export default {
  metadata: {
    title: 'My App',
    description: 'Built with Symbols',
    'og:image': '/social.png'
  }
}

// pages/about.js — page-level overrides
export const about = {
  metadata: {
    title: 'About Us',
    description: (el, s) => s.aboutDescription
  },
  // ... page content
}
```

Metadata is applied at runtime (updates `<title>` and `<meta>` tags in the DOM) and during SSR (generates `<head>` HTML via brender). See [`@symbo.ls/helmet`](../../plugins/helmet/) for the full API.

## CLI

This package also provides the `smbls` CLI binary:

```bash
smbls init          # Initialize a project
smbls start         # Start dev server
smbls build         # Build for production
smbls deploy        # Deploy to hosting
smbls fetch         # Fetch remote config
smbls push          # Push changes to platform
smbls ask           # AI assistant
```

See the [@symbo.ls/cli](../cli/) package for the full command reference.

## Documentation

## Define System

The define system (`context.define` and `element.define`) maps special keys to handler functions. When a key with a matching define handler appears on an element, `throughInitialDefine` calls the handler instead of treating the key as a child or prop.

### Built-in define handlers (in `defaultDefine`)

| Key | Purpose |
|-----|---------|
| `routes` | Route definitions — passed through as-is |
| `metadata` | SEO metadata — resolves and applies `<title>` and `<meta>` tags via helmet |
| `$router` | Router content — wraps params in a fragment and calls `el.set()` |

### Collection define handlers (deprecated in v3)

The following collection define handlers existed in v2 but are **deprecated in v3**:

| Key (deprecated) | Data source | v3 replacement |
|-------------------|-------------|----------------|
| `$collection` | Direct data array/object | Use `children` + `childExtends` |
| `$propsCollection` | `element.props` as data source | Use `children: ({ props }) => props.items` |
| `$stateCollection` | `element.state` as data source | Use `children: ({ state }) => state.items` |
| `$setCollection` | Uses `set()` to update content | Use `content` or `children` |

Some older projects still use these handlers via project-level `context.define`. The framework's propertization layer (`@domql/utils/props.js`) is define-aware to avoid moving these keys into `props` when define handlers are present.

> **Lesson learned:** The `$` prefix overlaps between css-in-props selectors and define handlers. The propertization in `props.js` checks for define handlers before applying `CSS_SELECTOR_PREFIXES` to prevent define keys from being swallowed into props. This matters for backwards compatibility with v2 projects that still use `$propsCollection` etc.

## Emotion Integration (`prepare.js`)

`prepareDesignSystem()` calls `initEmotion()` from `@symbo.ls/emotion/initEmotion.js` to initialize the CSS-in-JS engine. This import must be present for Emotion to work.

```javascript
import { initEmotion } from '@symbo.ls/emotion/initEmotion.js'

export const prepareDesignSystem = (key, context) => {
  const [scratchDesignSystem, emotion, registry] = initEmotion(key, context)
  return [scratchDesignSystem, emotion, registry]
}
```

> **Lesson learned:** If the `initEmotion` import is missing or broken, no CSS classes are generated and components render unstyled (Bazaar rendering issue).

## Documentation

For full documentation visit [symbols.app/developers](https://symbols.app/developers).
