# DOMQL Syntax — Usage Guide & Best Practices

> Practical reference for writing DOMQL elements correctly.
> Every pattern here is derived from real working code in the smbls/bigbrother codebase.

---

## 1. Element Anatomy

A DOMQL element is a plain JS object. Every key has a specific meaning:

```js
export const MyCard = {
  // ── Composition ───────────────────────────────────────────────
  extends: 'Flex',            // extend from registered component(s)

  // ── DOM ───────────────────────────────────────────────────────
  tag: 'section',             // HTML tag (default: div)

  // ── CSS props (top-level, go to props via propertizeElement) ──
  padding: 'B C',             // design-token value
  gap: 'A',
  flow: 'column',
  theme: 'dialog',
  round: 'C',

  // ── HTML attributes ───────────────────────────────────────────
  attr: {
    role: 'region',
    'aria-label': ({ props }) => props.label
  },

  // ── State ─────────────────────────────────────────────────────
  state: { open: false },

  // ── Events (v3 style) ─────────────────────────────────────────
  onClick: (event, el, state) => { state.update({ open: !state.open }) },
  onRender: (el, state) => { console.log('rendered') },

  // ── Child elements ────────────────────────────────────────────
  Header: {
    extends: 'Flex',
    text: ({ props }) => props.title
  },
  Body: {
    html: ({ props }) => props.content
  }
}
```

---

## 2. CSS / Style Props

### Top-level CSS props → become `props.*`

```js
export const Card = {
  // These are ALL promoted to props automatically:
  padding: 'B C',
  margin: '0',
  gap: 'Z',
  display: 'flex',
  flow: 'column',          // shorthand for flexDirection
  align: 'center center',  // shorthand for alignItems + justifyContent
  fontSize: 'A',
  fontWeight: '500',
  color: 'currentColor',
  background: 'codGray',
  borderRadius: 'C2',
  round: 'C',              // border-radius token
  opacity: '0.85',
  overflow: 'hidden',
  transition: 'B defaultBezier',
  transitionProperty: 'opacity, transform',
  zIndex: 10
}
```

### Pseudo-classes and pseudo-elements

```js
export const Hoverable = {
  opacity: 0.85,
  ':hover':  { opacity: 0.9, transform: 'scale(1.015)' },
  ':active': { opacity: 1,   transform: 'scale(1.015)' },
  ':focus-visible': { outline: 'solid, X, blue .3' },
  ':not(:first-child)': {
    '@dark':  { border: 'gray4 .65, solid' },
    '@light': { border: 'gray11, solid' },
    borderWidth: '1px 0 0'
  }
}
```

### CSS class state modifiers (emotion `.className`)

```js
export const Item = {
  opacity: 0.6,
  '.active':   { opacity: 1, fontWeight: '600' },
  '.disabled': { opacity: 0.3, pointerEvents: 'none' },
  '.hidden':   { transform: 'translate3d(0,10%,0)', opacity: 0, visibility: 'hidden' }
}
```

### Raw style object (escape hatch for complex selectors)

```js
export const DropdownParent = {
  style: {
    '&:hover': {
      zIndex: 1000,
      '& [dropdown]': {
        transform: 'translate3d(0,0,0)',
        opacity: 1,
        visibility: 'visible'
      }
    },
    svg: { opacity: '0.5' }
  }
}
```

### Theme

```js
// Applies the design system theme token
export const Dialog = { theme: 'dialog' }
export const Field  = { theme: 'field' }
export const Item   = { theme: 'quaternary .child' }  // sub-theme variant
```

---

## 3. Extending & Composing

### Single extend

```js
export const PrimaryButton = { extends: 'Button' }
```

### Multiple extends — order matters (first = highest priority)

```js
export const RouteLink = { extends: [Link, RouterLink] }
export const Button    = { extends: ['IconText', 'FocusableComponent'] }
```

### String reference (resolved from `context.components`)

```js
export const MyItem = { extends: 'Hoverable' }
```

### Object/direct reference

```js
import { Flex } from './layout'
export const Card = { extends: Flex }
```

### v2 legacy syntax — still works

```js
export const Card = { extend: 'Flex' }  // singular "extend"
```

### Merge semantics

- Element's own properties **always win** over extended properties
- Objects are deep-merged (both sides preserved)
- Functions are NOT merged — element's function replaces extend's

---

## 4. Children

### Named children (most common)

```js
export const Card = {
  extends: 'Flex',
  Header: {
    extends: 'Flex',
    Title: { text: ({ props }) => props.title },
    Subtitle: { text: ({ props }) => props.subtitle }
  },
  Body: {
    html: ({ props }) => props.content
  },
  Footer: {
    extends: 'Flex',
    CloseButton: { extends: 'SquareButton', icon: 'x' }
  }
}
```

**Rule**: Child keys that start with uppercase or are numeric are treated as child elements. All other keys are CSS props or builtins.

### `childExtends` — apply extend to all direct children

```js
export const List = {
  extends: 'Flex',
  flow: 'column',
  childExtends: {
    extends: 'Button',
    padding: 'Z2 C',
    round: '0'
  }
}
```

### `childExtendRecursive` — apply to ALL descendants

```js
export const Tree = {
  childExtendRecursive: { fontSize: 'A' }
}
```

### `children` — dynamic child list from props

```js
export const DropdownList = {
  children: ({ props }) => props.options || [],
  childrenAs: 'props',   // each item's value becomes its props
  childExtends: {
    extends: 'Button',
    text: ({ props }) => props.label
  }
}
```

### `content` — single dynamic child

```js
export const Page = {
  content: ({ props }) => props.page  // renders a dynamic element
}
```

---

## 5. Props

### Passing props (consumer side)

```js
// Inline
const instance = {
  extends: 'Button',
  props: {
    text: 'Submit',
    href: '/dashboard',
    disabled: false
  }
}
```

### Accessing props inside element definitions

```js
export const Input = {
  attr: {
    placeholder: ({ props }) => props.placeholder,
    value: (el) => el.props.value,
    disabled: ({ props }) => props.disabled || null
  },
  text: ({ props }) => props.label
}
```

### Dynamic props (function returning value)

```js
export const Button = {
  disabled: (el) => el.call('exec', el.props.disabled),
  type: ({ props }) => props.type
}
```

### `childProps` — inject props into named children from parent props

```js
// Parent passes `headerTitle` → child Header receives it
export const Layout = {
  Header: {
    text: ({ props }) => props.title  // gets from parent childProps or direct props
  }
}
```

### Boolean / conditional props

```js
export const MyComponent = {
  isActive: ({ key, state }) => state.active === key,  // computed boolean
  hasIcon:  ({ props }) => Boolean(props.icon),
  useCache: true  // static boolean
}
```

`is*`, `has*`, `use*` prefixed props are treated as boolean flags and watched via `execProps`.

---

## 6. State

### Defining state

```js
export const Counter = {
  state: { count: 0, open: false, selected: null },
  // ...
}
```

### Reading state in element definitions

```js
export const Item = {
  text:    ({ state }) => state.label,
  opacity: ({ state }) => state.loading ? 0.5 : 1,
  isActive: ({ key, state }) => state.active === key
}
```

### Updating state from events

```js
export const Toggle = {
  state: { on: false },
  onClick: (event, el, state) => {
    state.update({ on: !state.on })
  }
}
```

### State methods

```js
state.update({ key: value })       // partial update
state.set({ key: value })          // replace
state.reset()                      // reset to initial
state.toggle('open')               // toggle boolean
state.remove()                     // remove state node
```

### Accessing root state

```js
// In event handlers
onClick: (event, el) => {
  const rootState = el.getRootState()
  const user = el.getRootState('user')
}

// In definitions
text: (el) => el.getRootState('currentPage')
```

### Async state update (from lifecycle event)

```js
export const DataView = {
  state: { data: null, loading: true },
  onRender: async (el, state) => {
    const data = await el.call('fetchData')
    state.update({ data, loading: false })
  }
}
```

---

## 7. Events

### v3 syntax — top-level `onXxx`

```js
export const MyForm = {
  // DOM events
  onClick:    (event, el, state) => { /* ... */ },
  onChange:   (event, el, state) => { /* ... */ },
  onInput:    (event, el, state) => { state.update({ value: event.target.value }) },
  onSubmit:   (event, el, state) => { event.preventDefault(); /* ... */ },
  onKeydown:  (event, el, state) => { if (event.key === 'Enter') /* ... */ },
  onMouseover:(event, el, state) => { /* ... */ },
  onBlur:     (event, el, state) => { /* ... */ },
  onFocus:    (event, el, state) => { /* ... */ },

  // DOMQL lifecycle events
  onRender:       (el, state) => { /* after element renders */ },
  onInit:         (el, state) => { /* before render */ },
  onUpdate:       (el, state) => { /* after state/props update */ },
  onStateUpdate:  (el, state) => { /* specifically after state update */ },
  onCreate:       (el, state) => { /* after full creation */ }
}
```

### Event handler signature

```js
onClick: (event, el, state, context, options) => {
  // event   — native DOM Event (has .preventDefault(), .stopPropagation())
  // el      — the DOMQL element (has .props, .state, .context, .call(), .update(), etc.)
  // state   — el.state shorthand
  // context — el.context (contains components, functions, utils, etc.)
}
```

### Async events

```js
onRender: async (el, state) => {
  try {
    const result = await el.call('fetchData', el.props.id)
    state.update({ data: result })
  } catch (e) {
    state.update({ error: e.message })
  }
}
```

### Stopping propagation

```js
onClick: (event, el) => {
  if (el.props.stopPropagation) event.stopPropagation()
  // ...
}
```

---

## 8. `attr` — HTML Attributes

```js
export const Input = {
  tag: 'input',
  attr: {
    // Static
    type: 'text',
    autocomplete: 'off',

    // From props
    placeholder: ({ props }) => props.placeholder,
    name:        ({ props }) => props.name,
    disabled:    ({ props }) => props.disabled || null,  // null removes the attr

    // Computed
    value: (el) => {
      const val = el.call('exec', el.props.value, el)
      if (el.call('isString', val) && val.includes('{{')) {
        return el.call('replaceLiteralsWithObjectFields', val)
      }
      return val
    },

    // Boolean
    required: ({ props }) => props.required,
    readonly: ({ props }) => props.readonly,
    checked:  (el) => el.call('exec', el.props.checked, el),

    // ARIA
    role:       'button',
    'aria-label': ({ props }) => props.aria?.label || props.text,
    tabIndex:   ({ props }) => props.tabIndex
  }
}
```

**Rule**: Returning `null` or `undefined` from an attr function removes the attribute from the DOM.

---

## 9. `text` and `html`

```js
// Plain text content
export const Label = { text: ({ props }) => props.label }
export const Badge = { text: 'New' }

// Raw HTML (use sparingly — XSS risk)
export const RichText = { html: ({ props }) => props.html }

// Dynamic text with template literals
export const Price = { text: ({ state }) => `$${state.amount.toFixed(2)}` }
```

---

## 10. `define` — Custom Property Transformers

`define` registers computed properties that run like mixins when a matching key is used.

```js
// In context or element:
define: {
  isActive: (param, el, state, context) => {
    // param = the value of el.isActive
    // Must update the element here
    if (param) el.classList.add('active')
    else el.classList.remove('active')
  },

  $collection: async (param, el, state) => {
    // runs when el.$collection is set — renders a dynamic list
    const items = await exec(param, el)
    // ... render logic
  }
}
```

Usage in elements:
```js
export const MenuItem = {
  isActive: ({ key, state }) => state.selected === key  // triggers define.isActive
}
```

---

## 11. `if` — Conditional Rendering

```js
export const AuthView = {
  if: (el, state) => state.isAuthenticated,

  // children only render if condition is true
  Dashboard: { /* ... */ }
}

// Shorthand with props
export const ErrorMsg = {
  if: ({ props }) => Boolean(props.error),
  text: ({ props }) => props.error
}
```

---

## 12. `on` — Lifecycle Object (v2 compatible)

The `on` object is the v2 way to attach lifecycle and DOM events. Supported but prefer top-level `onXxx` in v3.

```js
// v2 style (still works)
export const MyEl = {
  on: {
    render: (el, state) => { /* ... */ },
    click: (event, el, state) => { /* ... */ }
  }
}

// v3 style (preferred)
export const MyEl = {
  onRender: (el, state) => { /* ... */ },
  onClick: (event, el, state) => { /* ... */ }
}
```

---

## 13. `el.call()` — Calling Context Functions

```js
// Calling a registered utility/function/snippet
el.call('router', href, root, {}, options)
el.call('exec', value, el)
el.call('isString', value)
el.call('isDefined', value)
el.call('fetchData', id)
el.call('replaceLiteralsWithObjectFields', template)
```

`el.call(fnKey, ...args)` looks up `fnKey` in:
`context.utils → context.functions → context.methods → context.snippets`

---

## 14. Element Methods (available on every element)

```js
// Navigation
el.lookup('key')              // find ancestor by key or predicate
el.lookdown('key')            // find first descendant by key or predicate
el.lookdownAll('key')         // find all descendants
el.nextElement()              // sibling after this element
el.previousElement()          // sibling before this element

// Updates
el.update({ key: value })     // partial update of element properties
el.set({ key: value })        // full replacement
el.setProps({ key: value })   // update props specifically

// Content
el.updateContent(newContent)
el.removeContent()

// State
el.getRootState()             // get the app-level root state
el.getRootState('key')        // get specific key from root state
el.getRoot()                  // get root element
el.getRoot('data')            // get specific property from root element
el.getContext('key')          // get from element's context

// DOM
el.setNodeStyles({ key: value }) // apply inline styles
el.remove()                   // remove element from DOM and parent

// Debugging
el.parse()                    // serialize element to plain object
el.parseDeep()                // deep serialize
el.keys()                     // list element's own keys
el.verbose()                  // log element in console
```

---

## 15. Context Functions Pattern

Context is the app-wide registry. Register functions, utilities, snippets there:

```js
// App setup (index.js or equivalent)
create({}, {
  designSystem,
  components,
  pages,
  functions: {
    router,          // must be here for RouteLink to work
    fetchData: async (id) => { /* ... */ },
    auth: async () => { /* ... */ }
  },
  utils: {
    exec,
    isString,
    isDefined,
    replaceLiteralsWithObjectFields
  },
  snippets: {
    formatDate: (date) => new Date(date).toLocaleDateString()
  }
})
```

Access in elements:
```js
onRender: async (el) => {
  const result = await el.call('fetchData', el.props.id)
}
```

---

## 16. Router (Navigation)

### Declaring pages

```js
export default {
  '/':          homePage,
  '/dashboard': dashboardPage,
  '/user':      userPage
}
```

### Navigation (RouteLink)

```js
export const NavItem = {
  extends: 'RouteLink',
  text: ({ props }) => props.label,
  props: { href: '/dashboard' }
}
```

### Programmatic navigation

```js
onClick: (event, el) => {
  event.preventDefault()
  el.call('router', '/dashboard', el.__ref.root, {}, {
    scrollToTop: true,
    scrollToOptions: { behavior: 'instant' }
  })
}
```

---

## 17. Icons

```js
// Named icon from design system ICONS registry
export const CloseBtn = { extends: 'SquareButton', icon: 'x' }
export const StarIcon = { extends: 'Icon', icon: 'star' }

// Dynamic icon from props
export const DynamicIcon = {
  extends: 'Icon',
  icon: ({ props }) => props.icon
}

// As part of a button
export const SaveButton = {
  extends: 'Button',
  icon: 'save',
  text: 'Save'
}
```

Icons are rendered as SVG via `innerHTML` (not `textContent`). The svg tag matching is case-sensitive — always use the component system, do not manually set `innerHTML` on SVG elements.

---

## 18. Scope

```js
// scope: 'state' — element.scope becomes element.state
export const Form = {
  scope: 'state',
  state: { name: '', email: '' }
}

// scope: 'props' — element.scope becomes element.props
export const Card = {
  scope: 'props'
}

// Nested scope object
export const Widget = {
  scope: { theme: 'dark', locale: 'en' }
}
```

---

## 19. `data` — Non-reactive Data

```js
export const Chart = {
  data: {
    chartInstance: null,
    rawValues: []
  },
  onRender: (el) => {
    el.data.chartInstance = new Chart(el.node, { /* ... */ })
  }
}
```

`data` is for storing mutable references that should NOT trigger re-renders.

---

## 20. Common Patterns

### Loading state

```js
export const DataList = {
  state: { items: [], loading: true, error: null },

  Loader: {
    if: ({ state }) => state.loading,
    extends: 'Spinner'
  },
  Error: {
    if: ({ state }) => Boolean(state.error),
    text: ({ state }) => state.error
  },
  Items: {
    if: ({ state }) => !state.loading && !state.error,
    $collection: ({ state }) => state.items,
    childExtends: { extends: 'ListItem' }
  },

  onRender: async (el, state) => {
    try {
      const items = await el.call('fetchItems')
      state.update({ items, loading: false })
    } catch (e) {
      state.update({ error: e.message, loading: false })
    }
  }
}
```

### Toggle/accordion

```js
export const Accordion = {
  state: { open: false },
  Header: {
    extends: 'Flex',
    onClick: (ev, el) => {
      el.parent.state.toggle('open')
    }
  },
  Body: {
    if: ({ state }) => state.open,
    html: ({ props }) => props.content
  }
}
```

### Active list item

```js
export const Menu = {
  state: { active: null },
  childExtends: {
    extends: 'Button',
    isActive: ({ key, state }) => state.active === key,
    '.active': { fontWeight: '600', color: 'primary' },
    onClick: (ev, el, state) => {
      state.update({ active: el.key })
    }
  }
}
```

### Dynamic class toggle

```js
export const Button = {
  '.active': { background: 'primary', color: 'white' },
  isActive: ({ props }) => props.active  // adds/removes .active class
}
```

### Template literals in props

```js
// Use {{ }} for string interpolation resolved by context util
export const Greeting = {
  text: 'Hello, {{user.name}}!'
  // resolved via el.call('replaceLiteralsWithObjectFields', template)
}
```

---

## 21. DO / DON'T

### Events

```js
// ✅ DO — v3 top-level, args in right order
onClick: (event, el, state) => { event.preventDefault() }

// ❌ DON'T — v2 nested (still works but avoid in new code)
on: { click: fn }

// ❌ DON'T — preventDefault after router call
onClick: (event, el) => {
  router(href)
  event.preventDefault()  // too late if router throws
}
```

### Extends

```js
// ✅ DO — array for multiple
extends: ['IconText', 'FocusableComponent']

// ✅ DO — string for single registered component
extends: 'Button'

// ❌ DON'T — import and use the same package (circular)
import { Button } from 'smbls'
export const MyBtn = { extends: Button }  // prefer string reference
```

### Props access

```js
// ✅ DO — destructure in signature
attr: { placeholder: ({ props }) => props.placeholder }

// ✅ DO — full element access when needed
attr: { value: (el) => el.call('exec', el.props.value, el) }

// ❌ DON'T — use `this` (arrow functions, no `this` context)
attr: { placeholder: function() { return this.props.placeholder } }
```

### State updates

```js
// ✅ DO — partial update
state.update({ count: state.count + 1 })

// ✅ DO — async update
onRender: async (el, state) => {
  const data = await el.call('fetch', '/api/data')
  state.update({ data, loading: false })
}

// ❌ DON'T — mutate state directly (bypasses reactivity)
state.count = 5
```
