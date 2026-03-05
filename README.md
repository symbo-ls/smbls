# Symbols

[![npm version](https://img.shields.io/npm/v/smbls.svg)](https://www.npmjs.com/package/smbls)
[![npm downloads](https://img.shields.io/npm/dm/smbls.svg)](https://www.npmjs.com/package/smbls)
[![bundle size](https://img.shields.io/bundlephobia/minzip/smbls)](https://bundlephobia.com/package/smbls)
[![license](https://img.shields.io/npm/l/smbls.svg)](https://github.com/symbo-ls/smbls/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/smbls.svg)](https://nodejs.org)
[![ESM](https://img.shields.io/badge/module-ESM%20%7C%20CJS-blue)](https://www.npmjs.com/package/smbls)

> A design-first framework for building web applications. Define your design system, write components as plain objects, and ship to any platform.

[Documentation](https://symbols.app/developers) | [Components](https://symbols.app/components) | [Discussions](https://github.com/orgs/symbo-ls/discussions)

## Getting Started

### Create a new project

```bash
npx create-smbls my-app
cd my-app
npm start
```

This scaffolds a project with a design system, example components, and a dev server.

### Add to an existing project

```bash
npm install smbls
```

Create a `designSystem.js` file and initialize:

```javascript
import { init } from 'smbls'

init({
  color: {
    primary: '#3B82F6',
    secondary: '#10B981',
    gray: ['#1F2937', '#9CA3AF']  // [dark, light]
  },
  theme: {
    primary: {
      color: 'white',
      background: 'primary',
      ':hover': { background: 'primary 0.85' }
    }
  },
  typography: {
    base: 16,
    ratio: 1.2
  }
})
```

### Build your first component

Components are plain objects — no JSX, no template strings:

```javascript
const Card = {
  props: { theme: 'primary', padding: 'A' },

  Header: {
    Icon: { name: 'star' },
    Title: { tag: 'h3', text: 'Hello Symbols' }
  },

  Content: {
    P: { text: 'Components are just objects.' }
  },

  Footer: {
    Button: {
      text: 'Get Started',
      on: { click: (ev, el) => console.log('clicked!') }
    }
  }
}
```

### Render your app

```javascript
import { create } from 'smbls'

const App = {
  routes: {
    '/': { Page: { extend: HomePage } },
    '/about': { Page: { extend: AboutPage } }
  }
}

create(App)
```

## Design System

All design tokens live in a single config that generates CSS custom properties, font faces, SVG sprites, and theme classes automatically.

```javascript
export default {
  color: {},        // Color palette with dark/light mode support
  theme: {},        // Semantic themes (primary, secondary, etc.)
  typography: {},   // Type scale and font settings
  space: {},        // Spacing scale
  media: {},        // Breakpoints
  icons: {},        // SVG icon sprites
  font: {},         // @font-face declarations
  font_family: {},  // Font family stacks
  timing: {},       // Animation timing
  reset: {}         // CSS reset overrides
}
```

### Colors

```javascript
const color = {
  blue: '#112233',
  gray: ['#111', '#CCC'],        // [light mode, dark mode]
  modal: '--gray .1',            // reference gray with 0.1 opacity
  bg: {
    '@dark': 'black',            // dark mode value
    '@light': 'white'            // light mode value
  }
}
```

### Themes

Themes map semantic tokens to colors and styles. Apply with `theme: 'primary'` on any component:

```javascript
const theme = {
  primary: {
    color: 'white',
    background: 'blue',
    ':hover': { background: 'blue 0.8' },
    ':active': { background: 'blue 0.6' }
  },
  secondary: {
    color: 'blue',
    background: 'transparent',
    border: '1px solid blue'
  }
}
```

### Fonts

```javascript
const font = {
  Inter: [{
    url: 'https://fonts.gstatic.com/s/inter/...',
    isVariable: true,
    fontStyle: 'normal',
    fontDisplay: 'swap'
  }]
}
```

### Icons

```javascript
const icons = {
  arrow: '<svg viewBox="0 0 24 24">...</svg>',
  star: '<svg viewBox="0 0 24 24">...</svg>'
}
```

Use in components with `Icon: { name: 'arrow' }`. SVGs can also be inlined via bundler plugins ([Parcel](https://github.com/ewanmellor/parcel-plugin-inline-svg), [Vite](https://www.npmjs.com/package/vite-svg-loader)).

See the [default-config](https://github.com/symbo-ls/smbls/tree/main/packages/default-config) for a complete example.

## Components

Components are plain JavaScript objects. CSS properties and HTML attributes work directly as props:

### DOMQL

```javascript
const Hero = {
  tag: 'section',
  padding: 'D',
  flow: 'column',
  align: 'center center',

  Title: {
    tag: 'h1',
    text: 'Build faster',
    fontSize: 'E',
    fontWeight: '700'
  },

  Subtitle: {
    tag: 'p',
    text: 'Ship to any platform',
    color: 'gray'
  },

  Actions: {
    flow: 'row',
    gap: 'B',

    Primary: {
      extend: Button,
      text: 'Get Started',
      theme: 'primary'
    },

    Secondary: {
      extend: Button,
      text: 'Learn More',
      theme: 'secondary'
    }
  }
}
```

### React

The same design system works in React:

```jsx
import { Button, H1 } from 'smbls'

const Hero = () => (
  <section>
    <H1 text="Build faster" fontSize="E" fontWeight="700" />
    <Button text="Get Started" theme="primary" />
  </section>
)
```

Learn more at the [components](https://symbols.app/docs/components) page.

## UIKit

Ready-to-use components built on [Scratch](packages/scratch/) and DOMQL:

| Component | Package | Component | Package |
|-----------|---------|-----------|---------|
| Atoms | `@symbo.ls/atoms` | Link | `@symbo.ls/link` |
| Avatar | `@symbo.ls/avatar` | Notification | `@symbo.ls/notification` |
| Button | `@symbo.ls/button` | Range | `@symbo.ls/range` |
| Datepicker | `@symbo.ls/datepicker` | Select | `@symbo.ls/select` |
| Dialog | `@symbo.ls/dialog` | TimePicker | `@symbo.ls/timepicker` |
| Dropdown | `@symbo.ls/dropdown` | Tooltip | `@symbo.ls/tooltip` |
| Icon | `@symbo.ls/icon` | Input | `@symbo.ls/input` |

Browse all at the [UIKit library](https://symbols.app/components).

## CLI

Install globally for project-wide commands:

```bash
npm install -g @symbo.ls/cli
```

### Develop

```bash
smbls create my-app      # Scaffold a new project
smbls start              # Start dev server (Parcel, Vite, or browser)
smbls build              # Production build
smbls deploy             # Deploy to Symbols, Cloudflare, Vercel, Netlify, or GitHub Pages
```

### Sync with Symbols.app

```bash
smbls login              # Authenticate with Symbols
smbls fetch              # Pull design system from platform
smbls push               # Push local changes to platform
smbls sync               # Bidirectional sync
smbls collab             # Real-time collaboration via WebSocket
```

### Project Management

```bash
smbls project create     # Create a new project
smbls project list       # List your projects
smbls project members    # Manage team members
smbls project versions   # Version history
smbls project environments  # Manage environments
smbls files upload <paths>  # Upload project files
```

### Utilities

```bash
smbls convert src/ --react  # Convert DOMQL to React/Angular/Vue
smbls migrate               # Migrate v2 project to v3
smbls ask "how do I...?"    # AI assistant
smbls config                # Project settings
smbls eject                 # Eject to explicit dependencies
smbls completion            # Shell completions (bash/zsh)
```

See the full CLI reference in [`@symbo.ls/cli`](packages/cli/).

## Deployment

```bash
smbls deploy
```

On first run, choose a target:

| Provider | Command |
|----------|---------|
| Symbols (default) | `smbls deploy` |
| Cloudflare Pages | `smbls deploy --provider cloudflare` |
| Vercel | `smbls deploy --provider vercel` |
| Netlify | `smbls deploy --provider netlify` |
| GitHub Pages | `smbls deploy --provider github-pages` |

Your choice is saved to `symbols.json`. Use `smbls deploy --init` to generate config files without deploying.

## AI Assistant

```bash
smbls ask "how do I add a new page?"   # single question
smbls ask                              # interactive chat
smbls ask --init                       # configure provider
```

Supports Claude, OpenAI, Gemini, and Ollama (local). On setup, it auto-configures [symbols-mcp](https://github.com/symbo-ls/symbols-mcp) for AI editors (Claude Code, Cursor, Windsurf) — giving your AI access to Symbols documentation and framework rules.

## Server-Side Rendering

Brender provides SSR and hydration for Symbols apps:

```javascript
import { renderElement } from '@symbo.ls/brender'

const result = await renderElement({
  tag: 'div',
  text: 'Hello',
  Child: { tag: 'span', text: 'World' }
})

// result.html -> '<div data-br="br-1">Hello<span data-br="br-2">World</span></div>'
```

Client-side hydration reconnects the static HTML to live DOMQL elements without re-rendering. See [`@symbo.ls/brender`](plugins/brender/) for the full API.

## Extensions

### VSCode — Symbols.app Connect

IntelliSense for DOMQL/Symbols syntax — properties, events, components, and element methods autocomplete. Includes AI chat and MCP integration.

Location: [`extensions/vscode/`](extensions/vscode/)

### Chrome DevTools

Inspect Symbols components in the browser.

Location: [`extensions/chrome-inspect2/`](extensions/chrome-inspect2/)

## Packages

### Core

| Package | Description |
|---------|-------------|
| [`smbls`](packages/smbls/) | Main package — bundles the entire ecosystem |
| [`@domql/element`](packages/domql/) | Core DOMQL framework |
| [`@domql/state`](packages/state/) | State management |
| [`@domql/utils`](packages/utils/) | Utility functions |
| [`@domql/router`](packages/router/) | Application router |

### Styling

| Package | Description |
|---------|-------------|
| [`@symbo.ls/scratch`](packages/scratch/) | CSS framework and methodology |
| [`@symbo.ls/css-in-props`](packages/css-in-props/) | CSS properties as props |
| [`@symbo.ls/attrs-in-props`](packages/attrs-in-props/) | HTML attributes as props |
| [`@symbo.ls/emotion`](packages/emotion/) | Emotion CSS-in-JS integration |
| [`@symbo.ls/shorthand`](packages/shorthand/) | Shorthand syntax transpiler |

### Design System

| Package | Description |
|---------|-------------|
| [`@symbo.ls/default-config`](packages/default-config/) | Default design system tokens |
| [`@symbo.ls/default-icons`](packages/icons/) | Default icon set |
| [`@symbo.ls/uikit`](packages/uikit/) | UI component library |

### Tooling

| Package | Description |
|---------|-------------|
| [`@symbo.ls/cli`](packages/cli/) | Command-line interface |
| [`@symbo.ls/runner`](packages/runner/) | Build runner (Parcel, Vite, live-server) |
| [`@symbo.ls/fetch`](packages/fetch/) | Fetch config from Symbols.app |
| [`@symbo.ls/sync`](packages/sync/) | Real-time sync (browser & Node.js) |
| [`create-smbls`](packages/create-smbls/) | Project scaffolding |

### Plugins

| Plugin | Description |
|--------|-------------|
| [`@symbo.ls/brender`](plugins/brender/) | Server-side rendering & hydration |
| [`emotion`](plugins/emotion/) | Emotion CSS plugin |
| [`parse`](plugins/parse/) | Parser utilities |
| [`performance`](plugins/performance/) | Performance monitoring |
| [`router`](plugins/router/) | Routing plugin |

## Contributing

```bash
git clone https://github.com/symbo-ls/smbls.git
cd smbls
npm install
npm run link:all        # Link all workspaces locally
npm start               # Start development
npm test                # Run tests
```

## License

[MIT](LICENSE)

---

[Documentation](https://symbols.app/developers) | [Components](https://symbols.app/components) | [Discussions](https://github.com/orgs/symbo-ls/discussions)
