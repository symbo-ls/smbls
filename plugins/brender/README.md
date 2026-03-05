# @domql/brender

Server-side renderer and client-side hydrator for DomQL/Symbols apps. Converts DomQL element trees into static HTML on the server, then reconnects that HTML to live DomQL elements in the browser — without re-rendering from scratch.

## How it works

Brender has two phases: **render** (server) and **liquidate** (browser).

### Render (DomQL -> HTML)

On the server (or at build time), brender:

1. Creates a virtual DOM environment using [linkedom](https://github.com/WebReflection/linkedom)
2. Runs DomQL `create()` against that virtual DOM — the full component tree resolves, extends merge, props apply, and real DOM nodes are produced
3. Walks every element node and stamps a `data-br="br-N"` attribute (sequential key)
4. Walks the DomQL element tree and records which `data-br` key belongs to which DomQL element (`__ref.__brKey`)
5. Returns the HTML string, a registry (`{br-key: domqlElement}`), and the element tree

```
DomQL Source                  Virtual DOM                  Output

{ tag: 'div',                 <div>                        <div data-br="br-1">
  Title: {                      <h1>Hello</h1>               <h1 data-br="br-2">Hello</h1>
    tag: 'h1',                  <p>World</p>                 <p data-br="br-3">World</p>
    text: 'Hello'             </div>                       </div>
  },
  Body: {                     + registry:
    tag: 'p',                   br-1 -> root element
    text: 'World'               br-2 -> Title element
  }                             br-3 -> Body element
}
```

### Liquidate (HTML -> DomQL)

In the browser, when the app JS loads:

1. The pre-rendered HTML is already in the DOM — the user sees the page instantly
2. DomQL re-creates the element tree from the same source definitions, but skips DOM creation (the nodes already exist)
3. `hydrate()` walks the DomQL tree and the real DOM simultaneously, matching `data-br` keys
4. For each match: `element.node = domNode` and `domNode.ref = element`
5. DomQL now owns every node — reactive updates, event handlers, and state changes work as if the page was client-rendered

```
Browser DOM (static)              DomQL Tree (no nodes)         After hydrate()

<div data-br="br-1">              root {                        root.node = <div>
  <h1 data-br="br-2">Hello</h1>    __ref: {__brKey: 'br-1'}    Title.node = <h1>
  <p data-br="br-3">World</p>      Title: {                    Body.node = <p>
</div>                                __ref: {__brKey: 'br-2'}
                                    }                           domNode.ref = element
      collectBrNodes()              Body: {                     (bidirectional link)
      {br-1: div,                     __ref: {__brKey: 'br-3'}
       br-2: h1,                    }
       br-3: p}                   }
```

## Files

| File | Purpose |
|------|---------|
| `render.js` | `render()` — full project render via smbls pipeline; `renderElement()` — single component via @domql/element |
| `hydrate.js` | `collectBrNodes()` — scans DOM for data-br nodes; `hydrate()` — reconnects DomQL tree to DOM |
| `env.js` | `createEnv()` — linkedom virtual DOM with browser API stubs (requestAnimationFrame, history, location, etc.) |
| `keys.js` | `resetKeys()`, `assignKeys()` — stamps data-br on DOM nodes; `mapKeysToElements()` — builds registry |
| `metadata.js` | `extractMetadata()`, `generateHeadHtml()` — SEO meta tags from page definitions |
| `load.js` | `loadProject()` — imports a symbols/ directory; `loadAndRenderAll()` — renders every route |
| `index.js` | Re-exports everything |

## API

### `renderElement(elementDef, options?)`

Renders a single DomQL element definition to HTML. Uses `@domql/element` create directly — no full smbls bootstrap needed.

```js
import { renderElement } from '@domql/brender'

const result = await renderElement(
  { tag: 'div', text: 'Hello', Child: { tag: 'span', text: 'World' } }
)

// result.html     -> '<div data-br="br-1">Hello<span data-br="br-2">World</span></div>'
// result.registry -> { 'br-1': rootElement, 'br-2': childElement }
// result.element  -> the DomQL element tree
```

With components and designSystem context:

```js
const result = await renderElement(pageDef, {
  context: {
    components: { Nav, Footer, HeroSection },
    designSystem: { color, font, spacing },
    state: { user: null },
    functions: { initApp },
    methods: { navigate }
  }
})
```

### `render(data, options?)`

Renders a full Symbols project. Requires the smbls pipeline (createDomqlElement) — handles routing, state, designSystem initialization, the full app context.

```js
import { render, loadProject } from '@domql/brender'

const data = await loadProject('/path/to/project')
const result = await render(data, { route: '/about' })

// result.html      -> full page HTML with data-br keys
// result.metadata  -> { title, description, og:image, ... }
// result.registry  -> { br-key: domqlElement }
// result.element   -> root DomQL element
```

### `hydrate(element, options?)`

Client-side. Reconnects a DomQL element tree to existing DOM nodes via data-br keys.

```js
import { collectBrNodes, hydrate } from '@domql/brender/hydrate'

// After DomQL creates the element tree (without DOM nodes):
const hydrated = hydrate(elementTree, { root: document.body })

// Now every element.node points to the real DOM node
// and every domNode.ref points back to the DomQL element
```

### `loadProject(path)`

Imports a standard `symbols/` directory structure:

```
project/
  symbols/
    app.js            -> data.app
    state.js          -> data.state
    config.js         -> data.config
    dependencies.js   -> data.dependencies
    components/
      index.js        -> data.components
    pages/
      index.js        -> data.pages
    designSystem/
      index.js        -> data.designSystem
    functions/
      index.js        -> data.functions
    methods/
      index.js        -> data.methods
    snippets/
      index.js        -> data.snippets
    files/
      index.js        -> data.files
```

### `createEnv(html?)`

Creates a linkedom virtual DOM environment with stubs for browser APIs that DomQL expects:

- `window.requestAnimationFrame` / `cancelAnimationFrame`
- `window.history` (pushState, replaceState)
- `window.location` (pathname, search, hash, origin)
- `window.URL`, `window.scrollTo`
- `globalThis.Node`, `globalThis.HTMLElement`, `globalThis.Window` (for instanceof checks in @domql/utils)

### `generateHeadHtml(metadata)`

Converts a metadata object into HTML head tags:

```js
generateHeadHtml({ title: 'My Page', description: 'About', 'og:image': '/img.png' })
// -> '<meta charset="UTF-8">\n<title>My Page</title>\n<meta name="description" content="About">\n<meta property="og:image" content="/img.png">'
```

## Examples

The `examples/` directory contains runnable experiments. Copy a project's source into `examples/` first (gitignored), then run:

### Render to static HTML

```bash
# Render all routes
node examples/render.js rita

# Render specific route
node examples/render.js rita /about

# Output goes to examples/rita_built/
#   index.html          - static HTML with data-br keys
#   index-tree.json     - DomQL element tree (for inspection)
#   index-registry.json - br-key -> element path mapping
```

### Liquidate (full round-trip)

```bash
node examples/liquidate.js rita /

# Output:
#   Step 1: Render DomQL -> HTML (server side)
#     HTML: 7338 chars
#     data-br keys assigned: 129
#
#   Step 2: Parse HTML into DOM (simulating browser)
#     DOM nodes with data-br: 129
#
#   Step 3: DomQL element tree ready
#     DomQL elements: 201
#
#   Step 4: Hydrate - remap DomQL elements to DOM nodes
#     Linked:   129 elements
#     Unlinked: 0 elements
#
#   Step 5: data-br -> DomQL element mapping
#     br-1     <main    > root
#     br-2     <nav     > root.Nav
#     br-3     <div     > root.Nav.Inner
#     br-4     <div     > root.Nav.Inner.Logo          "Rita Katona"
#     br-11    <section > root.Hero
#     br-15    <h1      > root.Hero.Content.Headline    "Are you looking for..."
#     ...
#
#   Step 6: Mutate via DomQL (proves elements own their nodes)
#     Before: "Rita Katona..."
#     After:  "[LIQUIDATED] Rita Katona..."
#     Same ref: true
```

### npm scripts

```bash
npm run render:rita        # render rita project
npm run render:survey      # render survey project
npm run render:all         # render both
npm run liquidate:rita     # full liquidation round-trip for rita
npm run liquidate:survey   # full liquidation round-trip for survey
```

## Experiment results

Tested against two real Symbols projects:

### rita (portfolio site, 6 routes, 39 components)

| Route | HTML size | data-br keys | DomQL elements | Link rate |
|-------|-----------|-------------|----------------|-----------|
| `/` | 7,338 | 129 | 201 | 100% |
| `/about` | 4,623 | 87 | 133 | 100% |
| `/from-workshops-to-1-on-1s` | 7,043 | 119 | - | 100% |
| `/hire-me-as-a-freelancer` | 5,195 | 82 | - | 100% |
| `/references-and-partners` | 6,102 | 91 | - | 100% |
| `/angel-investment` | 4,800 | 85 | - | 100% |

### survey (benchmark app, 1 route, 7 components)

| Route | HTML size | data-br keys | Link rate |
|-------|-----------|-------------|-----------|
| `/` | 29,625 | 203 | 100% |

The difference between "data-br keys" and "DomQL elements" is that some elements are virtual (text nodes, internal refs) and don't produce HTML element nodes.

## The data-br contract

The `data-br` attribute is the bridge between server and client. The contract:

1. **Sequential**: Keys are assigned in DOM tree order (`br-0`, `br-1`, `br-2`, ...) by depth-first traversal
2. **Deterministic**: Same DomQL input always produces the same key assignments — because DomQL's `create()` is deterministic and `assignKeys()` walks in document order
3. **Element nodes only**: Only `nodeType === 1` (elements) get keys, not text nodes or comments
4. **Bidirectional**: After hydration, `element.node` and `node.ref` point to each other

This means the server and client don't need to exchange the registry — as long as both run the same DomQL source, the keys will match. The registry JSON is exported for debugging and inspection only.

## Architecture notes

- `renderElement()` uses `@domql/element` create directly — lightweight, no smbls bootstrap. Good for individual components
- `render()` uses the full `smbls/src/createDomql.js` pipeline — handles routing, designSystem initialization, uikit defaults, the works. Needed for complete apps
- `hydrate.js` is browser-only code (no linkedom dependency) — it's exported separately via `@domql/brender/hydrate`
- `createEnv()` sets `globalThis.window/document/Node/HTMLElement` because `@domql/utils` `isDOMNode` uses `instanceof` checks against global constructors
- `onRender` callbacks that do network requests or call `s.update()` will error during SSR — this is expected and harmless since the HTML is already produced before those callbacks fire
