# Symbols

[![npm version](https://img.shields.io/npm/v/smbls.svg)](https://www.npmjs.com/package/smbls)
[![npm downloads](https://img.shields.io/npm/dm/smbls.svg)](https://www.npmjs.com/package/smbls)
[![bundle size](https://img.shields.io/bundlephobia/minzip/smbls)](https://bundlephobia.com/package/smbls)
[![license](https://img.shields.io/npm/l/smbls.svg)](https://github.com/symbo-ls/smbls/blob/main/LICENSE)
[![node](https://img.shields.io/node/v/smbls.svg)](https://nodejs.org)
[![ESM](https://img.shields.io/badge/module-ESM%20%7C%20CJS-blue)](https://www.npmjs.com/package/smbls)

Create a [Design System](https://github.com/symbo-ls/smbls/tree/main/packages/scratch) and use it in [DOMQL](https://github.com/symbo-ls/smbls/tree/main/packages/domql) and [React](https://github.com/symbo-ls/smbls/tree/main/packages/react) components.

For more details check the official [documentation](https://symbols.app/developers).

## Table of Contents

- [Installation](#installation)
- [Initialization](#initialization)
- [CLI](#cli)
- [Design System](#design-system)
- [Components](#components)
- [UIKit](#uikit)
- [Deployment](#deployment)
- [AI Assistant](#ai-assistant)
- [Extensions](#extensions)
- [Packages](#packages)

## Installation

Install the CLI globally:

```bash
npm i @symbo.ls/cli -g
```

Or add to your project:

```bash
npm i smbls --save
```

## Initialization

Initialize the Symbols design system, or [inject it](https://symbols.app/docs/intro#configuration) into an existing application:

```javascript
import { init } from 'smbls'

const color = {
  oceanblue: '#112233'
}
const theme = {
  primary: {
    text: 'white',
    background: 'oceanblue 0.9',
    ':hover': {
      background: 'oceanblue'
    }
  }
}

init({ color, theme })
```

More at the [Initialization](https://symbols.app/docs/intro#initialization) page.

## CLI

The `smbls` CLI provides commands for the full project lifecycle:

### Project

```bash
smbls init              # Initialize a new project
smbls create            # Create new components/projects
smbls install            # Install dependencies
smbls clean              # Clean build artifacts
smbls eject              # Eject from Symbols configuration
```

### Development

```bash
smbls start              # Start development server
smbls build              # Build project
smbls deploy             # Deploy project
```

### Sync & Collaboration

```bash
smbls fetch              # Fetch configuration from Symbols.app
smbls sync               # Synchronize with Symbols
smbls push               # Push changes to Symbols
smbls config             # Manage configuration
smbls collab             # Collaboration features
smbls login / logout     # Authentication
```

### Utilities

```bash
smbls convert            # Convert legacy code
smbls migrate            # Migrate projects
smbls ask                # AI assistant
smbls completion         # Shell completion setup
smbls link-packages      # Link local packages
```

## Design System

Symbols provides design system tools for configuring all necessary tokens. Create a `designSystem.js` file:

```javascript
export default {
  color: {},
  theme: {},
  typography: {},
  space: {},
  media: {},
  icons: {},
  font: {},
  font_family: {},
  timing: {},
  reset: {}
}
```

### Colors

```javascript
const color = {
  blue: '#112233',
  gray: ['#111', '#CCC'],           // [light mode, dark mode]
  modal: '--gray .1',               // reference gray with 0.1 opacity
  bg: {
    '@dark': 'black',
    '@light': 'white'
  }
}
```

### Fonts

```javascript
const font = {
  OpenSans: [{
    url: 'https://...',
    isVariable: true,
    fontStyle: 'normal',
    fontDisplay: 'swap',
    unicodeRange: 'U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF'
  }]
}
```

### Icons

```javascript
const icons = {
  arrow: '<svg viewbox="...'
}
```

SVG imports can also be inlined via bundler plugins ([Parcel](https://github.com/ewanmellor/parcel-plugin-inline-svg), [Vite](https://www.npmjs.com/package/vite-svg-loader)).

See the [default-config](https://github.com/symbo-ls/smbls/tree/main/packages/default-config) for a full example. More at the [Design System](https://symbols.app/docs/design-system) page.

## Components

Use design tokens directly in DOMQL and React components:

### DOMQL

```javascript
const MyComponent = {
  H1: { text: 'Hello!' },
  Button: {
    icon: 'arrow',
    text: 'Read More!',
    color: 'white',
    background: 'blue'
  }
}
```

### React

```javascript
const MyComponent = () => {
  <H1 text="Hello"/>
  <Button
    icon="arrow"
    text="Read More!"
    color="white"
    background="blue"
  />
}
```

How components work at the [components](https://symbols.app/docs/components) page.

## UIKit

The UIKit provides ready-to-use components built on Scratch and DOMQL:

| Component | Package |
|-----------|---------|
| Atoms | `@symbo.ls/atoms` |
| Avatar | `@symbo.ls/avatar` |
| Button | `@symbo.ls/button` |
| Datepicker | `@symbo.ls/datepicker` |
| Dialog | `@symbo.ls/dialog` |
| Dropdown | `@symbo.ls/dropdown` |
| Icon | `@symbo.ls/icon` |
| Input | `@symbo.ls/input` |
| Link | `@symbo.ls/link` |
| Notification | `@symbo.ls/notification` |
| Range | `@symbo.ls/range` |
| Select | `@symbo.ls/select` |
| TimePicker | `@symbo.ls/timepicker` |
| Tooltip | `@symbo.ls/tooltip` |

Browse all components at the [UIKit library](https://symbols.app/components).

## Deployment

Deploy with a single command:

```bash
npx smbls deploy
```

On first run, choose a deploy target:

- **Symbols** — push to the Symbols platform (default)
- **Cloudflare** — deploy to Cloudflare Pages
- **Vercel** — deploy to Vercel
- **Netlify** — deploy to Netlify
- **GitHub Pages** — deploy via GitHub Actions

Your choice is saved to `symbols.json` for subsequent deploys.

```bash
npx smbls deploy --init              # Generate config files only
npx smbls deploy --provider cloudflare  # Set provider directly
```

## AI Assistant

Ask questions about your Symbols project from the terminal:

```bash
npx smbls ask "how do I add a new page?"
npx smbls ask                          # interactive chat
npx smbls ask --init                   # reconfigure
```

On first run, you'll set up:

1. **AI provider** — Claude, OpenAI, Gemini, Ollama (local), or Symbols AI
2. **Model** and API key
3. **symbols-mcp** auto-configuration for AI editors (Claude Code, Cursor, Windsurf)

The [symbols-mcp](https://github.com/symbo-ls/symbols-mcp) server gives AI assistants access to Symbols documentation and framework rules.

## Extensions

### VSCode — Symbols.app Connect

IntelliSense for DOMQL/Symbols.app syntax including properties, events, components, and element methods autocomplete. Also includes AI chat integration and MCP support.

Location: [`extensions/vscode/`](extensions/vscode/)

### Chrome DevTools

Chrome extension for inspecting Symbols components.

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
| [`@symbo.ls/default-config`](packages/default-config/) | Default design system configuration |
| [`@symbo.ls/default-icons`](packages/icons/) | Default icon set |
| [`@symbo.ls/uikit`](packages/uikit/) | Complete UI component library |

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
| [`brender`](plugins/brender/) | Browser rendering utilities |
| [`emotion`](plugins/emotion/) | Emotion CSS plugin |
| [`parse`](plugins/parse/) | Parser utilities |
| [`performance`](plugins/performance/) | Performance monitoring |
| [`router`](plugins/router/) | Routing plugin |

---

For more details check the official [documentation](https://symbols.app/developers).
