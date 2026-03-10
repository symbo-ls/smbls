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

Using `create-smbls`:

```bash
npx create-smbls my-app
cd my-app
npm start
```

Using the CLI:

```bash
npm i -g @symbo.ls/cli
smbls create my-app
cd my-app
npm start
```

The CLI version gives you an interactive prompt to choose between local-only, creating a new platform project, or linking to an existing one.

### Add to an existing project

Run `smbls init` inside any project with a `package.json`:

```bash
smbls init
```

This will interactively merge Symbols config files into your project, run `smbls config` to set up your project key and settings, and install dependencies. If a v2 project is detected, it offers to migrate to v3 automatically.

You can also set up manually:

```bash
npm install smbls
```

Create a `designSystem/index.js` file and initialize:

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
      ':hover': { opacity: '0.85' }
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
export const Card = {
  extends: 'Flex',
  theme: 'primary',
  padding: 'A',
  flow: 'column',

  Header: {
    extends: 'Flex',
    flexAlign: 'center start',
    gap: 'A',
    Title: { tag: 'h3', text: 'Hello Symbols' }
  },

  Content: {
    P: { text: 'Components are just objects.' }
  },

  Footer: {
    Button: {
      text: 'Get Started',
      onClick: (ev, el) => console.log('clicked!')
    }
  }
}
```

### Render your app

```javascript
import { create } from 'smbls'
// pages/index.js defines routes:
// import { main } from './main.js'
// export default { '/': main, '/about': about }

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
  modalBg: 'rgba(17, 17, 17, 0.1)', // define opacity colors as named tokens
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
    ':hover': { opacity: '0.85' },
    ':active': { opacity: '0.7' }
  },
  secondary: {
    color: 'blue',
    background: 'transparent',
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: 'blue'
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

Use inline SVG in components via `Svg: { viewBox: '0 0 24 24', html: '<path d="..." fill="currentColor"/>' }`. SVGs can also be inlined via bundler plugins ([Parcel](https://github.com/ewanmellor/parcel-plugin-inline-svg), [Vite](https://www.npmjs.com/package/vite-svg-loader)).

See the [default-config](https://github.com/symbo-ls/smbls/tree/main/packages/default-config) for a complete example.

## Components

Components are plain JavaScript objects. CSS properties and HTML attributes work directly as props:

### DOMQL

```javascript
export const Hero = {
  extends: 'Flex',
  tag: 'section',
  padding: 'D',
  flow: 'column',
  flexAlign: 'center center',

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
    extends: 'Flex',
    flow: 'row',
    gap: 'B',

    Primary: {
      extends: 'Button',
      text: 'Get Started',
      theme: 'primary'
    },

    Secondary: {
      extends: 'Button',
      text: 'Learn More',
      theme: 'secondary'
    }
  }
}
```

### React

The same design system works with [`@symbo.ls/react`](https://github.com/symbo-ls/react):

```jsx
import { Flex, Button, H1 } from '@symbo.ls/react'

const Hero = () => (
  <Flex tag="section" flow="column" flexAlign="center center" padding="D">
    <H1 text="Build faster" fontSize="E" fontWeight="700" />
    <Button text="Get Started" theme="primary" />
  </Flex>
)
```

### Children from data

Map arrays or objects to child elements using `children` and `childrenAs`:

```javascript
export const UserList = {
  extends: 'Flex',
  flow: 'column',
  childExtends: 'UserCard',
  children: ({ state }) => state.users
}

// childrenAs controls how each item maps to child elements:
// 'props' (default) — item becomes child props
// 'state' — item becomes child state
// 'element' — item is used directly as element definition
export const StateList = {
  childrenAs: 'state',
  children: ({ state }) => state.items
}
```

### Page metadata

Define SEO metadata on pages or app. Values can be functions:

```javascript
export const about = {
  metadata: {
    title: 'About Us',
    description: (el, s) => s.aboutText,
    'og:image': '/about.png'
  },
  // ... page content
}
```

Metadata works at runtime (updates `<head>` tags) and during SSR (generates HTML via brender). See [`@symbo.ls/helmet`](plugins/helmet/).

Learn more at the [components](https://symbols.app/docs/components) page.

## UIKit

Ready-to-use components built on [Scratch](packages/scratch/) and DOMQL:

| Component | Package | Component | Package |
|-----------|---------|-----------|---------|
| Avatar | `@symbo.ls/avatar` | Link | `@symbo.ls/link` |
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

## Migrating from v2

If you have an existing v2 Symbols project, there are two ways to upgrade:

### Automatic migration

```bash
smbls migrate
```

This will:
- Rename `smbls/` directory to `symbols/` and `.symbols/` to `.symbols_cache/`
- Lowercase all `designSystem/` files (e.g. `COLOR.js` → `color.js`)
- Rewrite `designSystem/index.js` to v3 format (lowercase keys, shorthand exports)
- Move config options (`useReset`, `useVariable`, etc.) from designSystem to `config.js`
- Create `symbols/app.js` if missing
- Rewrite `symbols/index.js` to v3 format
- Update `package.json` scripts and dependencies

### Via `smbls init`

Running `smbls init` in a v2 project auto-detects the old structure and offers to migrate:

```bash
cd my-v2-project
smbls init
# → "Existing v2 Symbols project detected."
# → Choose: Migrate to v3 / Init anyway / Create subfolder
```

### Key v3 syntax changes

| v2 | v3 |
|----|-----|
| `extend: 'X'` | `extends: 'X'` |
| `childExtend: 'X'` | `childExtends: 'X'` |
| `on: { click: fn }` | `onClick: fn` |
| `props: { color: 'red' }` | `color: 'red'` (flattened) |
| `align: 'center center'` | `flexAlign: 'center center'` |
| `color: 'white .7'` | Define as named token in `designSystem/color.js` |
| `border: '1px solid blue'` | `borderWidth: '1px'`, `borderStyle: 'solid'`, `borderColor: 'blue'` |

After migration, review your components and update any remaining v2 patterns.

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
| [`css-in-props`](packages/css-in-props/) | CSS properties as props |
| [`attrs-in-props`](packages/attrs-in-props/) | HTML attributes as props |
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
| [`@symbo.ls/helmet`](plugins/helmet/) | SEO metadata — shared between runtime and SSR |
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
