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

It also includes the `@symbo.ls/cli` binary, `@symbo.ls/fetch`, `@symbo.ls/sync`, and `@domql/router`.

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
  globalTheme: 'dark',          // set global theme
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

For full documentation visit [symbols.app/developers](https://symbols.app/developers).
