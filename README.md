# Symbols
With Symbols, you can create a [Design System](https://github.com/symbo-ls/smbls/tree/main/packages/scratch) and use it in [DOMQL](https://github.com/symbo-ls/smbls/tree/main/uikit/domql), [React](https://github.com/symbo-ls/smbls/tree/main/uikit/react) and soon others components ([ask](https://github.com/orgs/symbo-ls/discussions/categories/feature-request)).

For more in-depth exmplanation check out the official [documentation page](https://symbols.app/developers).

[![npm version](https://badge.fury.io/js/smbls.svg)](https://badge.fury.io/js/smbls)

## Index
- [Installation](#installation)
- [Initialization](#initialization)
- [Design System](#design-system)
- [Components](#components)


## Installation
Install the CLI

```bash
npm i @symbo.ls/cli -g
```

or inside the project of your frontend

```bash
npm i smbls --save
```

## Initialization

Initialize Symbols design system externally, or [inject it](https://symbols.app/docs/intro#configuration) in your already existing application.

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

More about these config at the [Initialization](https://symbols.app/docs/intro#initialization) page.

## Deployment

Deploy your project with a single command:

```bash
npx smbls deploy
```

On first run, you'll be prompted to choose a deploy target:

- **Symbols** — push to the Symbols platform (default, same as `smbls push`)
- **Cloudflare** — deploy to Cloudflare Pages (generates `wrangler.jsonc`)
- **Vercel** — deploy to Vercel (generates `vercel.json`)
- **Netlify** — deploy to Netlify (generates `netlify.toml`)
- **GitHub Pages** — deploy via GitHub Actions (generates workflow)

Your choice is saved to `symbols.json` so subsequent deploys run without prompts.

To only generate the config files without deploying:

```bash
npx smbls deploy --init
```

You can also set the deploy target in `smbls config` or pass it directly:

```bash
npx smbls deploy --provider cloudflare
```

## AI Assistant

Ask questions about your Symbols project directly from the terminal:

```bash
npx smbls ask "how do I add a new page?"
```

Or start an interactive chat session:

```bash
npx smbls ask
```

On first run, you'll be guided through setup:

1. **Choose an AI provider** — Claude, OpenAI, Gemini, Ollama (local), or Symbols AI (coming soon)
2. **Select a model** and enter your API key
3. **Auto-configure symbols-mcp** for your AI editors (Claude Code, Cursor, Windsurf)

The [symbols-mcp](https://github.com/symbo-ls/symbols-mcp) server gives AI assistants access to Symbols documentation and framework rules — no API key required.

To reconfigure at any time:

```bash
npx smbls ask --init
```


# Design System

Symbols provides advanced design system tools to support configuring all nessessary tokens in the web application.

You can create a `designSystem.js` file and insert following:

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

Each token has a individual config parameters. For example colors receive following config:

```javascript
const colors = {
  blue: '#112233',
  gray: ['#111', '#CCC'], // light mode, dark mode
  modal: '--gray .1', // references with gray and applies 0.1 opacity
  bg: {
    '@dark': 'black',
    '@light': 'white'
  }
}
```

Fonts configuration looks like this:

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

Icons receive pure SVG objects as follows:

```javascript
const icons = {
  arrow: '<svg viewbox="...'
}
```

Although you can configure your bundler in a way that it inlines SVG imports [Parcel](https://github.com/ewanmellor/parcel-plugin-inline-svg), [Vite](https://www.npmjs.com/package/vite-svg-loader).

The example of the [default-config](https://github.com/symbo-ls/smbls/tree/main/packages/default-config) page. You can read more at [Design System](https://symbols.app/docs/design-system) page.

---

# Components

You can directly use this configuration in [DOMQL](https://github.com/symbo-ls/smbls/tree/main/uikit/domql) and [React](https://github.com/symbo-ls/smbls/tree/main/uikit/react) components.

The color and fonts use would be like:

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

Symbols provide all nessessary atoms and components. You can check more at our [uikit](https://symbols.app/components) library.

How components work at [components](https://symbols.app/docs/components) page.

---

For more in-depth exmplanation check out the official [documentation page](https://symbols.app/developers).
