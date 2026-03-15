# smbls

[![npm version](https://img.shields.io/npm/v/smbls.svg)](https://www.npmjs.com/package/smbls)
[![npm downloads](https://img.shields.io/npm/dm/smbls.svg)](https://www.npmjs.com/package/smbls)
[![license](https://img.shields.io/npm/l/smbls.svg)](https://github.com/symbo-ls/smbls/blob/main/LICENSE)

The main Symbols package. Bundles the design system framework, UI components, and rendering engine into a single import.

## Install

```bash
npm install smbls
```

## Quick start

```js
import { init, create } from 'smbls'

init({
  color: {
    primary: '#3B82F6',
    gray: ['#1F2937', '#9CA3AF']
  },
  theme: {
    primary: {
      color: 'white',
      background: 'primary'
    }
  }
})

create({
  Header: {
    tag: 'header',
    H1: { text: 'Hello Symbols' }
  },
  Main: {
    Button: {
      text: 'Get Started',
      theme: 'primary'
    }
  }
}, { key: 'my-app' })
```

## Create variants

```js
import { create, createAsync, createSync, createSkeleton } from 'smbls'

create(App, ctx)          // render immediately
createAsync(App, ctx)     // render first, fetch remote config after
await createSync(App, ctx) // fetch remote config first, then render
createSkeleton(App, ctx)  // resolve extends only, no DOM rendering
```

## Themes

Themes switch via CSS custom properties — no JavaScript re-renders:

```js
init({
  theme: {
    document: {
      '@dark': { color: 'white', background: 'black' },
      '@light': { color: 'black', background: 'white' }
    }
  }
})
```

- **Auto** — follows system preference
- **Force** — `document.documentElement.dataset.theme = 'dark'`
- **Custom** — add `@ocean`, `@sunset`, activate with `data-theme="ocean"`

## Init options

```js
init(config, {
  useVariable: true,        // CSS custom properties
  useReset: true,           // CSS reset
  useFontImport: true,      // @font-face declarations
  useIconSprite: true,      // SVG icon sprite
  useDocumentTheme: true,   // document-level theme
  globalTheme: 'auto',      // 'auto', 'dark', 'light', or custom name
  verbose: false
})
```

## Plugins

domql supports a plugin system via `context.plugins`. Plugins hook into the element lifecycle and can extend how event handlers, props, and metadata are processed.

```js
import { funcqlPlugin } from '@domql/funcql'
import { create } from 'smbls'

create(App, {
  plugins: [funcqlPlugin]
})
```

### Plugin interface

A plugin is a plain object with optional lifecycle hooks and a handler resolver:

```js
{
  name: 'my-plugin',

  // Lifecycle hooks — called on every element at each stage
  start (element, options) {},
  init (element, options) {},
  render (element, options) {},
  done (element, options) {},
  create (element, options) {},
  update (element, updatedObj, options) {},

  // Resolve non-function event handlers into callable functions
  resolveHandler (handler, element) {}
}
```

### Available plugins

| Plugin | Package | Purpose |
|--------|---------|---------|
| funcql | `@domql/funcql` | Declare event handlers as JSON schemas instead of functions |
| helmet | `@symbo.ls/helmet` | SEO metadata via lifecycle hooks |
| shorthand | `@symbo.ls/shorthand` | Expand abbreviated component definitions |

```js
import { funcqlPlugin } from '@domql/funcql'

create(App, {
  plugins: [funcqlPlugin]
})

// Now event handlers can be JSON schemas
const Button = {
  text: 'Play',
  on: {
    click: {
      audio: 'scope.audio',
      if: ['audio.paused', 'audio.play()', 'audio.pause()']
    }
  }
}
```

## Included packages

| Package | Description |
|---------|-------------|
| `domql` | Reactive DOM element engine |
| `@domql/utils` | Utility functions |
| `@symbo.ls/scratch` | CSS framework |
| `@symbo.ls/emotion` | Emotion CSS-in-JS integration |
| `@symbo.ls/default-config` | Default design system configuration |
| `@symbo.ls/uikit` | UI component library |
| `@domql/router` | Client-side router |
| `css-in-props` | CSS properties as component props |
| `attrs-in-props` | HTML attributes as component props |

Also includes `@symbo.ls/cli`, `@symbo.ls/fetch`, `@symbo.ls/sync`, and `@symbo.ls/helmet`.

## SEO metadata

Define metadata on your app or pages. Values can be static or functions:

```js
const App = {
  metadata: {
    title: 'My App',
    description: 'Built with Symbols',
    'og:image': '/social.png'
  }
}

const AboutPage = {
  metadata: {
    title: 'About Us',
    description: (el, s) => s.aboutText
  }
}
```

See [`@symbo.ls/helmet`](../../plugins/helmet/) for the full API.

## CLI

```bash
smbls init       # initialize a project
smbls start      # start dev server
smbls build      # build for production
smbls fetch      # fetch remote config
smbls push       # push changes to platform
smbls ask        # AI assistant
```

See [`@symbo.ls/cli`](../cli/) for the full command reference.

## Documentation

[symbols.app/developers](https://symbols.app/developers)

## License

CC-BY-NC-4.0
