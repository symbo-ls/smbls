# Symbols / DOMQL Framework Reference

Symbols is a Design System framework using DOMQL - unifies HTML, CSS, JavaScript into single object syntax. No compilation required.

**Full documentation:** See `symbols_docs_full.md` for detailed API reference and examples.

## Version Note

**This codebase uses smbls v2.34.4** which uses v2 syntax:

| Keyword | Usage |
|---------|-------|
| `extend` | Inherit from component(s) |
| `childExtend` | Apply extend to all children |
| `props: { ... }` | CSS/HTML properties (can also be flattened at root) |
| `onClick`, `onRender` | Event handlers (v3 style - both work in v2) |

**Note:** Event handlers can use either `onClick: fn` (v3 style) or `on: { click: fn }` (v2 style). Both work.

## Quick Start

```js
import { create } from 'smbls'

create({
  // Root element props (CSS flattened in object)
  theme: 'document',
  padding: 'C1',
  flow: 'y',  // shorthand for flexFlow: 'column'

  // Child elements (PascalCase = component)
  Header: {
    extend: 'Flex',
    align: 'center space-between',
    Logo: { text: 'MyApp', href: '/' },
    Nav: {
      childExtend: 'Link',
      Home: { href: '/', text: 'Home' },
      About: { href: '/about', text: 'About' }
    }
  },

  Main: {
    padding: 'C',
    H1: { text: 'Welcome' },
    P: { text: 'Hello world' }
  }
}, context)
```

## Reserved Keywords

DOMQL reserved keywords (everything else becomes a child element or CSS property):

| Keyword | Purpose |
|---------|---------|
| `tag` | HTML tag to render |
| `extend` | Inherit from component(s) - v3 |
| `extend` | Inherit from component(s) - v2 legacy |
| `childExtend` | Apply extends to all children - v3 |
| `childExtend` | Apply extends to all children - v2 legacy |
| `childExtendsRecursive` | Apply extends recursively to all descendants |
| `childProps` | Apply props to all children |
| `props` | Element properties object (v2: nested, v3: optional) |
| `state` | Component state |
| `scope` | Shared scope across component |
| `children` | Array of child elements |
| `childrenAs` | Map children to 'props' or 'state' |
| `context` | Application context |
| `key` | Element key identifier |
| `query` | Query binding |
| `data` | Data binding |

**Standard properties** (also reserved, documented in examples):
| `attr` | HTML attributes object |
| `class` | CSS classes object |
| `style` | Inline styles object |
| `on` | Event handlers object (v2 legacy) |

## Element Structure

```js
{
  // HTML tag (auto-detected from PascalCase key if matches HTML tag)
  tag: 'section',

  // Inheritance - string, array, or object
  extend: 'Button',              // extend: ['Link', 'Button']
  childExtend: 'Li',             // All children extend this

  // Props (CSS + HTML + custom in one flat object)
  padding: 'B C',
  background: 'primary',
  borderRadius: 'A',

  // Alternative: explicit props object (v2 style, still supported)
  props: { isActive: true },

  // Functional props - receive state/element as argument
  props: ({ state }) => ({
    Icon: { name: state.icon },
    Text: { text: state.title }
  }),

  // State management
  state: { count: 0, items: [] },

  // HTML attributes
  attr: { id: 'my-id', 'data-value': '123', role: 'button' },

  // CSS classes (static or dynamic)
  class: {
    active: true,
    disabled: (el, state) => state.loading
  },

  // Lifecycle hooks
  onInit: (element, state) => {},
  onRender: (element, state) => {},
  onUpdate: (element, state) => {},
  onBeforeUpdate: (changes, element, state) => {},

  // DOM events - all standard events supported (v3 syntax)
  onClick: (event, element, state, context) => {},
  onInput: (event, element, state, context) => {},
  onMouseover: (event, element, state) => {},
  onKeydown: (event, element, state) => {},
  onDblclick: (e) => { e.stopPropagation() },

  // Legacy v2 event syntax (still works)
  on: {
    click: (event, element, state) => {},
    render: (element) => {},
    frame: (element, state) => {},
  },

  // Child elements - any PascalCase key
  Header: {},
  Content: { Article: {}, Sidebar: {} },
  Footer: {}
}
```

## Props (CSS-in-Props)

CSS properties, HTML attributes, and component props unified:

```js
{
  // CSS (camelCase)
  padding: 'C2 A',
  margin: 'B',
  background: 'gray',
  borderRadius: 'C',
  fontSize: 'B',
  fontWeight: '600',
  color: 'white',
  display: 'flex',
  flexFlow: 'column',        // or 'y'
  gap: 'B',
  alignItems: 'center',
  justifyContent: 'space-between',
  position: 'absolute',
  inset: '0',
  zIndex: '10',
  opacity: '.8',
  overflow: 'hidden',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',

  // Shorthand props
  flow: 'y',                      // flexFlow: 'column'
  flow: 'x',                      // flexFlow: 'row'
  flow: 'row wrap',               // flexFlow: 'row wrap'
  align: 'center space-between',  // alignItems + justifyContent
  round: 'B',                     // borderRadius
  size: 'C',                      // width + height
  wrap: 'wrap',                   // flexWrap

  // CSS selectors
  ':hover': { background: 'blue', transform: 'scale(1.02)' },
  ':focus': { outline: '2px solid blue' },
  ':active': { transform: 'scale(0.98)' },
  '& > span': { color: 'red' },
  '&:first-child': { marginTop: '0' },

  // Media queries (defined in designSystem.media)
  '@mobile': { fontSize: 'A', padding: 'A' },
  '@tablet': { fontSize: 'B' },
  '@desktop': { maxWidth: '1200px' },
  '@print': { display: 'none' },
  '@tv': { fontSize: 'D' },

  // Theme modes (built-in)
  '@dark': { background: 'gray-900', color: 'white' },
  '@light': { background: 'white', color: 'gray-900' },

  // Custom media queries (define in designSystem.media)
  '@custom': { /* styles */ },  // uses media['custom'] query

  // Conditional cases (. prefix for props, $ for global cases)
  isActive: true,
  '.isActive': { background: 'primary', color: 'white' },
  '!isActive': { opacity: '.5' },
  '.isLoading': { pointerEvents: 'none', opacity: '.6' },

  // Global cases (defined in designSystem.cases)
  '$ios': { fontFamily: '-apple-system' },
  '$android': { fontFamily: 'Roboto' },
  '$localhost': { border: '1px solid red' },

  // Override children props
  Button: { theme: 'secondary' },
  Icon: { name: 'check', size: 'B' },

  // Apply props to all children
  childProps: { padding: 'A', color: 'inherit' }
}
```

## Spacing Scale

Ratio-based system (default: base 16px, ratio 1.618 golden ratio):

| Token | ~px | Token | ~px | Token | ~px |
|-------|-----|-------|-----|-------|-----|
| Z | 10 | A | 16 | B | 26 |
| Z1 | 12 | A1 | 20 | B1 | 32 |
| Z2 | 14 | A2 | 22 | B2 | 36 |
| | | | | C | 42 |
| | | | | C1 | 52 |
| | | | | C2 | 55 |
| | | | | C3 | 58 |

```js
{ padding: 'A B', gap: 'C', borderRadius: 'Z', fontSize: 'B1' }
// padding: 16px 26px, gap: 42px, borderRadius: 10px, fontSize: 32px
```

**Timing tokens** (for transitions/animations, same A-Z scale):
```js
{ transition: 'A color ease' }      // ~150ms
{ transition: 'B background ease' } // ~190ms
{ animation: 'fadeIn C ease' }      // ~240ms
```

## Sequence (Full Scale)

The spacing scale extends beyond C3. Full sequence with base 16px, ratio 1.618:

| Token | ~px | Token | ~px | Token | ~px |
|-------|-----|-------|-----|-------|-----|
| X | 3 | A | 16 | D | 67 |
| Y | 6 | B | 26 | E | 109 |
| Z | 10 | C | 42 | F | 177 |

Configure in designSystem:
```js
{
  space: {
    base: 16,
    ratio: 1.618,        // golden ratio
    range: [-3, 12],     // X to L
    subSequence: true    // enables A1, A2, B1, etc.
  }
}
```

## Unit

Configure global units for different devices:
```js
{
  unit: {
    unit: 'em',          // default unit for all sizing
    autoScale: true,     // auto-convert px to em

    '@print': 'mm',      // use mm for print
    '@tv': 'vmax'        // use vmax for TV screens
  }
}
```

## Typography

Configure type scale (same A-Z tokens as spacing):
```js
// In designSystem.typography
{
  typography: {
    base: 16,
    ratio: 1.125,        // or named: 'major-second', 'golden-ratio'
    range: [-5, 12],
    subSequence: true,
    h1Matches: 'E',      // <h1> uses 'E' size, h2='D', h3='C', etc.

    '@mobile': {
      base: 15,
      ratio: 1.13
    }
  }
}

// Usage in components
{
  H1: { fontSize: 'E', text: 'Large Headline' },   // ~33px
  H2: { fontSize: 'D', text: 'Subheadline' },      // ~27px
  P: { fontSize: 'A', text: 'Body text' },         // 16px
  Small: { fontSize: 'Z', text: 'Caption' }        // ~13px
}
```

## Font

Define custom fonts:
```js
// In designSystem.font
{
  font: {
    SourceSans: [
      { url: '/fonts/SourceSans-Light.woff', fontWeight: 300 },
      { url: '/fonts/SourceSans-Regular.woff', fontWeight: 400 },
      { url: '/fonts/SourceSans-Bold.woff', fontWeight: 600 }
    ],
    Avenir: [
      { url: '/fonts/AvenirVariable.woff', isVariable: true }
    ]
  },

  // Font families with fallbacks
  font_family: {
    PromoFonts: {
      isDefault: true,
      value: '"SourceSans"',
      type: 'serif'        // adds system serif fallbacks
    },
    Code: {
      value: '"Fira Code"',
      type: 'monospace'    // adds system monospace fallbacks
    }
  }
}

// Usage in components
{
  Hero: { fontFamily: 'PromoFonts' },
  Code: { fontFamily: 'Code' }
}
```

## Shape

Define CSS clip-path shapes:
```js
// In designSystem.shape
{
  shape: {
    tag: 'polygon(...)',
    tooltip: 'polygon(...)',
    hexagon: 'polygon(...)'
  }
}

// Usage in components
{
  Badge: {
    shape: 'tag',
    shapeModifier: 'west',     // direction: west, east, north, south
    text: 'New'
  },
  Tooltip: {
    shape: 'tooltip',
    shapeModifier: {
      position: 'block center',
      direction: 'north west'
    }
  }
}
```

## Colors

```js
// Define in designSystem.colors
{
  colors: {
    primary: '#0066CC',
    secondary: '#6B7280',
    success: '#10B981',
    error: '#EF4444',
    oceanblue: '#123',
    surface: ['#ffffff', '#1a1a1a'],  // [light-mode, dark-mode]
  }
}

// Usage in components
{
  color: 'primary',
  background: 'surface',
  borderColor: 'secondary 0.5',      // with opacity
  boxShadow: '0 2px 8px error 0.2',  // color in shadow
}
```

## Themes

Reusable style bundles:

```js
// Define in designSystem.themes
{
  themes: {
    primary: {
      color: 'white',
      background: 'primary',
      '@dark': { background: 'primary 0.9' },
      ':hover': { background: 'primary 0.8' }
    },
    secondary: {
      color: 'primary',
      background: 'primary 0.1',
      border: '1px solid primary 0.2'
    },
    ghost: {
      background: 'transparent',
      ':hover': { background: 'gray 0.1' }
    }
  }
}

// Usage
{ Button: { theme: 'primary', text: 'Submit' } }
```

## Components & Extends

```js
// Define reusable components in context.components
{
  components: {
    // Extend built-in components
    Button: {
      extend: 'smbls.Button',
      padding: 'A B',
      round: 'A',
      cursor: 'pointer'
    },

    // Compose components
    IconButton: {
      extend: 'Button',
      Icon: { size: 'B' },
      Span: {}
    },

    // Navigation patterns
    NavLink: {
      extend: 'Link',
      padding: 'A B',
      isActive: el => el.props.href === window.location.pathname,
      '.isActive': { background: 'primary 0.1', color: 'primary' }
    },

    Nav: {
      extend: 'Flex',
      gap: 'A',
      childExtend: 'NavLink'  // All children extend NavLink
    },

    // Layout components
    Card: {
      padding: 'C',
      background: 'surface',
      round: 'B',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }
  }
}

// Usage - PascalCase keys auto-extend from components
{
  Nav: {
    Home: { href: '/', text: 'Home' },
    About: { href: '/about', text: 'About' }
  },
  Card: {
    H2: { text: 'Title' },
    P: { text: 'Content...' }
  }
}
```

## Children

```js
{
  // Static array
  children: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3', class: 'special' }
  ],

  // Dynamic from function
  children: (el, state) => state.items,

  // Async data fetching
  children: async (el, state, ctx) => {
    const data = await fetch('/api/items').then(r => r.json())
    return data.items
  },

  // Map children to state/props automatically (avoids .map())
  childrenAs: 'state',  // Each child receives its array item as state

  // Template for all children
  childExtend: 'ListItem',
  childProps: { padding: 'A', borderBottom: '1px solid gray 0.2' }
}

// Complete pattern
{
  List: {
    extend: 'Ul',
    children: (el, state) => state.todos,
    childrenAs: 'state',
    childExtend: 'Li',
    childProps: {
      padding: 'A B',
      Checkbox: { checked: (el, s) => s.done },
      Span: { text: (el, s) => s.title }
    }
  }
}
```

## State

```js
{
  state: {
    count: 0,
    items: [],
    loading: false,
    user: null
  },

  // Initialize state async
  onInit: async (el, state) => {
    state.loading = true
    const data = await fetch('/api/data').then(r => r.json())
    state.update({ items: data, loading: false })
  },

  // React to state changes
  onStateUpdate: (changes, el, state) => {
    console.log('State changed:', changes)
  },

  // Use state in props
  '.loading': { opacity: '.5', pointerEvents: 'none' },

  Button: {
    text: (el, state) => `Count: ${state.count}`,
    onClick: (e, el, state) => {
      state.update({ count: state.count + 1 })
    }
  }
}
```

## Pages & Routing

```js
// Define pages in context.pages
{
  pages: {
    '/': {
      Head: {
        Title: { text: 'Home — MyApp' },
        Meta_desc: { tag: 'meta', name: 'description', content: 'Welcome' },
        Meta_og: { tag: 'meta', property: 'og:title', content: 'Home' }
      },
      H1: { text: 'Welcome' }
    },
    '/about': {
      H1: { text: 'About Us' }
    },
    '/users/:id': {
      // Dynamic route parameter
      H1: { text: (el, state) => `User ${state.id}` }
    }
  }
}

// Nested routes with shared layout
{
  extend: 'Layout',
  routes: {
    '/': { H1: { text: 'Home' } },
    '/about': { H1: { text: 'About' } },
    '/product/*': {
      onRender: (el, state) => {
        state.productId = window.location.pathname.split('/')[2]
      },
      H2: { text: (el, s) => `Product: ${s.productId}` }
    }
  },
  onRender: el => el.call('router', window.location.pathname, el, {}, { level: 1 })
}

// Navigation with Link component
{
  Nav: {
    childExtend: 'Link',
    Home: { href: '/', text: 'Home' },
    About: { href: '/about', text: 'About' }
  }
}

// Programmatic navigation
{
  Button: {
    text: 'Go to About',
    onClick: el => el.call('router', '/about', el, {}, { level: 1 })
  }
}
```

## Functions

```js
// Define reusable functions in context.functions
{
  functions: {
    addClick: (current) => (typeof current === 'number' ? current : 0) + 1,
    getRandomColor: () => {
      const r = Math.floor(Math.random() * 256)
      const g = Math.floor(Math.random() * 256)
      const b = Math.floor(Math.random() * 256)
      return `rgb(${r},${g},${b})`
    },
    formatDate: (date) => new Date(date).toLocaleDateString()
  }
}

// Call functions from components with element.call()
{
  Clicker: {
    state: { clicks: 0 },
    Button: {
      text: (el, state) => `Clicks: ${state.clicks}`,
      onClick: (e, el, state) => {
        const newCount = el.call('addClick', state.clicks)
        state.update({ clicks: newCount })
      }
    }
  },

  ColorButton: {
    text: 'Random Color',
    onClick: (e, el) => {
      const color = el.call('getRandomColor')
      el.setProps({ background: color })
    }
  }
}
```

## Icons

```js
// Define icons in designSystem.icons
{
  designSystem: {
    icons: {
      arrowUp: '<svg>...</svg>',
      arrowDown: '<svg>...</svg>',
      search: '<svg>...</svg>',
      searchOutline: '<svg>...</svg>'
    }
  }
}

// Use in components
{
  Icon: { name: 'arrowUp' },
  Icon: { name: 'search', iconModifier: 'outline' },  // searchOutline

  // With size
  Icon: { name: 'arrowDown', size: 'B' }
}
```

## Context Structure

```js
create(rootElement, {
  // Design System - global styling config
  designSystem: {
    colors: { /* color definitions */ },
    themes: { /* theme definitions */ },
    typography: { /* font configs */ },
    space: { base: 16, ratio: 1.618 },
    media: {
      // Breakpoints
      screen: '(max-width: 1680px)',
      tablet: '(max-width: 1366px)',
      mobile: '(max-width: 768px)',
      // Theme modes
      dark: '(prefers-color-scheme: dark)',
      light: '(prefers-color-scheme: light)',
      // Other media
      print: 'print',
      tv: '(min-width: 1920px)',
      // Custom - use as @myCustom in components
      myCustom: '(orientation: landscape)',
    },
    icons: { /* SVG icon definitions */ },
    cases: {
      ios: () => /iPad|iPhone|iPod/.test(navigator.userAgent),
      android: () => /android/i.test(navigator.userAgent),
      localhost: () => location.hostname === 'localhost'
    }
  },

  // Reusable components
  components: { /* component definitions */ },

  // Route-based pages
  pages: {
    '/': { /* home page */ },
    '/about': { /* about page */ },
    '/users/:id': { /* dynamic route */ }
  },

  // Global state
  state: { user: null, theme: 'light' },

  // Functions available globally
  functions: {
    formatDate: (date) => new Date(date).toLocaleDateString(),
    api: (path) => fetch(`/api${path}`).then(r => r.json())
  }
})
```

## Element Methods

```js
element.update(newProps)         // Update element with new props
element.setProps(props)          // Update only props
element.set(content)             // Set content
element.remove()                 // Remove from DOM
element.lookup('key')            // Find ancestor by key
element.spotByPath(['a','b'])    // Find element by path
element.keys()                   // Get all child keys
element.nextElement()            // Get next sibling
element.previousElement()        // Get previous sibling
element.parse()                  // Get purified object (1 level)
element.parseDeep()              // Get deep purified object

// State methods
state.update({ key: value })     // Update state and re-render
state.set(key, value)            // Set single key
```

## HTML Tag Mapping

PascalCase keys auto-map to HTML tags:

| Key | Tag | Key | Tag | Key | Tag |
|-----|-----|-----|-----|-----|-----|
| Header | `<header>` | Nav | `<nav>` | Main | `<main>` |
| Section | `<section>` | Article | `<article>` | Aside | `<aside>` |
| Footer | `<footer>` | H1-H6 | `<h1>`-`<h6>` | P | `<p>` |
| Span | `<span>` | Div | `<div>` | A/Link | `<a>` |
| Ul/Ol | `<ul>`/`<ol>` | Li | `<li>` | Table | `<table>` |
| Form | `<form>` | Input | `<input>` | Button | `<button>` |
| Select | `<select>` | Option | `<option>` | Textarea | `<textarea>` |
| Img | `<img>` | Video | `<video>` | Audio | `<audio>` |
| Canvas | `<canvas>` | Svg | `<svg>` | Path | `<path>` |

Non-matching PascalCase = `<div>` (or extends from components).

## Legacy v2 Syntax (still supported)

```js
// v2: Nested props object
{
  extend: 'Flex',           // singular
  childExtend: 'ListItem',  // singular
  props: {
    padding: 'A B',
    background: 'surface',
  },
  on: {
    render: (el) => {},
    click: (e, el, state) => {},
    frame: (el, state) => {},
  },
}

// v3: Flattened (preferred)
{
  extend: 'Flex',          // plural
  childExtend: 'ListItem', // plural
  padding: 'A B',
  background: 'surface',
  onRender: (el) => {},
  onClick: (e, el, state) => {},
  onFrame: (el, state) => {},
}
```

## Common Patterns

```js
// Flex layouts
{ extend: 'Flex', flow: 'y', gap: 'B', align: 'center stretch' }

// Grid (extend Grid component for shorthands)
{
  extend: 'Grid',
  columns: '1fr 2fr',           // gridTemplateColumns
  rows: '100px 1fr',            // gridTemplateRows
  gap: 'B',                     // gap
  area: '2 / 1 / span 2',       // gridArea
  template: '100px 1fr / 50px', // gridTemplate
}

// Grid with dynamic children
{
  extend: 'Grid',
  columns: 'repeat(3, 1fr)',
  gap: 'C',
  children: items,
  childrenAs: 'state',
  childProps: (el, state) => ({
    H3: { text: state.title },
    P: { text: state.description }
  })
}

// Responsive
{
  padding: 'C',
  '@tablet': { padding: 'B' },
  '@mobile': { padding: 'A' }
}

// Conditional visibility (use display or cases)
{
  display: (el, state) => state.show ? 'block' : 'none',
  // or with cases
  isHidden: (el, state) => !state.isLoggedIn,
  '.isHidden': { display: 'none' }
}

// Event handling
{
  onClick: (e, el, state) => state.update({ active: true }),
  onInput: (e, el, state) => state.update({ value: e.target.value })
}

// Form binding
{
  Input: {
    value: (el, state) => state.email,
    onInput: (e, el, state) => state.update({ email: e.target.value })
  }
}
```

## Examples (Cookbook Patterns)

```js
// Toggling State
{
  state: { isOpen: false },
  Button: {
    text: (el, s) => s.isOpen ? 'Close' : 'Open',
    onClick: (e, el, s) => s.update({ isOpen: !s.isOpen })
  }
}

// Counter
{
  state: { count: 0 },
  Display: { text: (el, s) => `Count: ${s.count}` },
  Increment: { text: '+', onClick: (e, el, s) => s.update({ count: s.count + 1 }) },
  Decrement: { text: '-', onClick: (e, el, s) => s.update({ count: s.count - 1 }) }
}

// Async Fetch
{
  state: { items: [], loading: true },
  onInit: async (el, state) => {
    const data = await fetch('/api/items').then(r => r.json())
    state.update({ items: data, loading: false })
  },
  '.loading': { opacity: '.5' },
  List: {
    children: (el, s) => s.items,
    childrenAs: 'state',
    childProps: { text: (el, s) => s.name }
  }
}

// Form Input
{
  state: { value: '' },
  Input: {
    value: (el, s) => s.value,
    onInput: (e, el, s) => s.update({ value: e.target.value })
  },
  Preview: { text: (el, s) => `You typed: ${s.value}` }
}

// Tabs
{
  state: { activeTab: 'home' },
  Nav: {
    childExtend: 'Button',
    Home: {
      text: 'Home',
      onClick: (e, el, s) => s.update({ activeTab: 'home' })
    },
    About: {
      text: 'About',
      onClick: (e, el, s) => s.update({ activeTab: 'about' })
    }
  },
  Content: {
    HomeContent: {
      display: (el, s) => s.activeTab === 'home' ? 'block' : 'none',
      text: 'Home content'
    },
    AboutContent: {
      display: (el, s) => s.activeTab === 'about' ? 'block' : 'none',
      text: 'About content'
    }
  }
}

// Modal
{
  state: { showModal: false },
  OpenButton: {
    text: 'Open Modal',
    onClick: (e, el, s) => s.update({ showModal: true })
  },
  Modal: {
    display: (el, s) => s.showModal ? 'flex' : 'none',
    position: 'fixed',
    inset: '0',
    background: 'black 0.5',
    align: 'center center',
    Dialog: {
      background: 'white',
      padding: 'C',
      round: 'B',
      H2: { text: 'Modal Title' },
      CloseButton: {
        text: 'Close',
        onClick: (e, el, s) => s.update({ showModal: false })
      }
    }
  }
}

// Theme Switcher
{
  state: { theme: 'light' },
  Button: {
    text: (el, s) => s.theme === 'light' ? '🌙 Dark' : '☀️ Light',
    onClick: (e, el, s) => {
      const newTheme = s.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', newTheme)
      s.update({ theme: newTheme })
    }
  }
}

// Todo App
{
  state: { todos: [], input: '' },
  Form: {
    Input: {
      value: (el, s) => s.input,
      onInput: (e, el, s) => s.update({ input: e.target.value })
    },
    AddButton: {
      text: 'Add',
      onClick: (e, el, s) => {
        if (s.input.trim()) {
          s.update({
            todos: [...s.todos, { text: s.input, done: false }],
            input: ''
          })
        }
      }
    }
  },
  List: {
    children: (el, s) => s.todos,
    childrenAs: 'state',
    childProps: {
      Checkbox: {
        tag: 'input',
        attr: { type: 'checkbox' },
        checked: (el, s) => s.done
      },
      Text: {
        text: (el, s) => s.text,
        '.done': { textDecoration: 'line-through' }
      }
    }
  }
}
```

---
Full docs: https://symbols.app/docs/framework
Detailed reference: ./symbols_docs_full.md
