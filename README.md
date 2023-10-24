# Symbols
With Symbols, you can create a [Design System](https://github.com/symbo-ls/smbls/tree/main/packages/scratch) and use it in [DOMQL](https://github.com/symbo-ls/smbls/tree/main/uikit/domql), [React](https://github.com/symbo-ls/smbls/tree/main/uikit/react) and soon others ([ask](https://github.com/orgs/symbo-ls/discussions/categories/feature-request)) components.

For more in-depth exmplanation check out the official [documentation page](https://symbols.app/developers).

[![npm version](https://badge.fury.io/js/smbls.svg)](https://badge.fury.io/js/smbls)

## Index
- [Installation](https://github.com/symbo-ls/smbls#installation)
- [Initialization](https://github.com/symbo-ls/smbls#initialization)
- [Design System](https://github.com/symbo-ls/smbls#design-system)
- [Components](https://github.com/symbo-ls/smbls#components)


## Installation
Install Symbols globally

```bash
npm i smbls -g
```

or inside the project of your frontend

```bash
npm i smbls
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

```javascipt
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
