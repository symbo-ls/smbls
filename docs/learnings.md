# DOMQL / smbls v3 — Learnings & Best Practices

> Use this file as context when working on domql, smbls, or any project consuming them.
> Every section records a real bug, its root cause, and the correct v3 pattern.

---

## 1. Package & Workspace Layout

```
next/
├── smbls/                        # monorepo submodule
│   ├── packages/
│   │   ├── element/              # @domql/element  — core renderer
│   │   ├── utils/                # @domql/utils    — shared utilities
│   │   ├── state/                # @domql/state
│   │   ├── uikit/                # @symbo.ls/uikit + per-component packages
│   │   │   └── Link/             # @symbo.ls/link
│   │   └── emotion/              # @symbo.ls/emotion
│   └── plugins/
│       └── router/               # @domql/router
├── platform/                     # internal platform app
├── rita/, bazaar/, survey/, ...  # consumer apps
└── bigbrother/                   # fleet management app (submodule)
```

**Key rules:**
- All packages version-locked at `3.2.3` across the monorepo.
- Consumer apps depend on `"smbls": "3.2.3"` (workspace-resolved).
- Build each package with `npm run build:esm` after source changes.
- Root runner scripts use `--watch-dir=../smbls/packages` so parcel rebuilds apps on smbls source changes.

---

## 2. Element Lifecycle (create.js → node.js)

```
create(props, parent, key, options)
  │
  ├── createElement()          creates bare element: { ...props, key, props:{}, on:{}, context, parent }
  ├── applyExtends()           merges extends stack into element (deep merge, element wins)
  ├── propertizeElement()      v3 event routing + CSS prop promotion (see §4)
  ├── addMethods()             attaches prototype with set/update/lookup/getRootState etc.
  ├── initProps()              builds props from propsStack (extends + parent + childProps)
  ├── pickupElementFromProps() re-lifts component-named/builtin props that entered via childProps
  └── createNode()
        ├── throughInitialExec()     executes function props
        ├── propagateEventsFromProps() (safety net for any remaining props.onXxx)
        ├── propagateEventsFromElement() (safety net for any remaining top-level onXxx)
        ├── applyEventsOnNode()      binds element.on.* to DOM addEventListener
        └── iterates children → create() recursively
```

**Critical ordering**: `propertizeElement` runs BEFORE `addMethods`. Element has no prototype methods when `propertizeElement` runs — do not rely on them there.

---

## 3. extends / extend

Both `extends:` and `extend:` are supported (checked in `applyExtend`):

```js
// v3 preferred
export const RouteLink = { extends: [Link, RouterLink] }

// v2 legacy — still works
export const RouteLink = { extend: [Link, RouterLink] }
```

**Merge semantics** (`deepMergeExtends`):
- Element property wins over extend property (extends never overwrite).
- Plain objects are deep-merged recursively.
- Arrays are concatenated.
- Functions are NOT merged — element's function wins.

String extends (`extends: 'Focusable'`) are resolved from `context.components`.

---

## 4. v3 Event System — `onXxx` at Top Level

### The v3 Pattern (correct)

```js
export const MyButton = {
  onClick: (event, el, state) => { /* ... */ },
  onRender: (el, state) => { /* ... */ },
  onStateUpdate: (el, state) => { /* ... */ }
}
```

### v2 Pattern (deprecated but supported via compatibility)

```js
// v2 — avoid in new code
export const MyButton = {
  on: { click: fn },
  props: { onClick: fn }
}
```

### How v3 events flow (after our fixes)

1. `propertizeElement → pickupPropsFromElement` detects top-level `onXxx` functions:
   - Moves them directly to `element.on[eventName]` (e.g. `onClick` → `on.click`)
   - Deletes the top-level key
2. DOMQL lifecycle events (`onRender` → `on.render`, `onInit` → `on.init`) and DOM events (`onClick` → `on.click`) both land in `element.on`
3. `applyEventsOnNode` skips keys listed in `DOMQL_EVENTS` and calls `node.addEventListener` for the rest

### Detection rule in `pickupPropsFromElement`

```js
const isEventHandler = key.length > 2 &&
  key.startsWith('on') &&
  key[2] === key[2].toUpperCase() &&  // e.g. onClick, onRender — NOT "one", "only"
  isFunction(value)
```

### DOMQL_EVENTS (lifecycle — never bound to DOM)

```
init, beforeClassAssign, render, renderRouter, attachNode,
stateInit, stateCreated, beforeStateUpdate, stateUpdate,
beforeUpdate, done, create, complete, frame, update
```

### `event.preventDefault()` must come BEFORE the router call

```js
if (href && !linkIsExternal) {
  event.preventDefault()   // ← always first
  try {
    router(href, root, {}, options)
  } catch (e) {
    console.warn(e)
  }
}
```

---

## 5. REGISTRY & DOMQ_PROPERTIES

`REGISTRY` (`element/mixins/registry.js`) lists properties handled by DOMQL mixins:

```
attr, style, text, html, data, classlist, state, scope, deps,
extends, children, content, childExtends, childExtendsRecursive,
props, if, define, __name, __ref, __hash, __text,
key, tag, query, parent, node, variables, on, component, context
```

`DOMQ_PROPERTIES` (`utils/keys.js`) is the same list used by `propertizeElement`.

**Rule**: Any key NOT in this list and not a component name (uppercase first letter) or numeric → gets promoted to `element.props` by `propertizeElement`. This is how `fontWeight: 'bold'` at element root becomes `props.fontWeight`.

---

## 6. Methods System

### Registering new methods

Three places must be updated in sync:

1. **Implement** in `smbls/packages/utils/methods.js`
2. **Register on prototype** in `smbls/packages/element/methods/set.js` (`addMethods` → `proto`)
3. **Add to METHODS array** in `smbls/packages/utils/keys.js`

**Why step 3 is critical**: `throughInitialExec` in `iterate.js` iterates element properties and calls any function it finds (with `element` as first arg, not `this`). `isMethod(param, element)` guards against this. If a method isn't in `METHODS`, it gets called as a plain function → `this` is undefined in strict mode → TypeError.

```js
// keys.js — METHODS array must include all prototype methods
export const METHODS = [
  'set', 'reset', 'update', 'remove', /* ... */,
  'getRootState', 'getRoot', 'getRootData', 'getRootContext',
  'getContext', 'getChildren',
  'nextElement', 'previousElement'
]
```

### `el.call(fnKey, ...args)` — context function lookup

```js
export function call (fnKey, ...args) {
  const context = this.context
  return (
    context.utils?.[fnKey] ||
    context.functions?.[fnKey] ||
    context.methods?.[fnKey] ||
    context.snippets?.[fnKey]
  )?.call(this, ...args)
}
```

Use `el.call('exec', value, el)` to execute a potentially-function prop. `exec` must be registered in context utils.

### `getRootState` — how root state is found

```js
export function getRootState (param) {
  let state = null
  const hasRootState = (obj) => obj.__element && obj.root?.isRootState
  // 1. check if element itself IS the root state
  // 2. check element.state or parent.state
  // 3. fallback: window.platformState || window.smblsApp?.state
  return param ? state?.[param] : state  // always use optional chaining
}
```

---

## 7. Router Integration

### smbls RouterLink pattern (correct)

```js
import { router as defaultRouter } from '@domql/router'

export const RouterLink = {
  onClick: (event, el) => {
    const { props, context: ctx } = el
    let href = el.call('exec', props.href, el)
    // ...
    if (href && !linkIsExternal) {
      event.preventDefault()                    // FIRST
      const { utils, snippets, functions } = ctx
      const router = functions?.router || snippets?.router || utils?.router || defaultRouter
      try { router(href, el.__ref.root, {}, options) }
      catch (e) { console.warn(e) }
    }
  }
}
```

**Platform apps** provide their router via `context.utils.router` or `context.functions.router`.
**Non-platform apps** fall back to `defaultRouter` from `@domql/router`.

### `RouteLink` = `Link` + `RouterLink`

```js
export const RouteLink = { extends: [Link, RouterLink] }
```

`Link` handles `attr.href` (sets DOM attribute), `RouterLink` handles click interception.

---

## 8. HTML Mixin & SVG Icons

### The SVG `nodeName` trap

- HTML elements: `node.nodeName` is **UPPERCASE** (`'DIV'`, `'SPAN'`)
- SVG elements created with `createElementNS`: `node.nodeName` is **lowercase** (`'svg'`, `'path'`)

```js
// html.js — correct
if (node.nodeName === 'SVG') node.textContent = prop  // uppercase → never matches real SVGs
else node.innerHTML = prop                             // always used → SVG icons render correctly
```

Using `node.nodeName === 'svg'` (lowercase) would match every SVG element and render content as plain text instead of SVG markup — icons would appear as path string text.

---

## 9. `propertizeElement` Flow Summary

```
pickupPropsFromElement(obj):
  for each key in obj:
    if onXxx && isFunction  → obj.on[eventName] = fn; delete obj[key]   (v3 event)
    if not component/builtin/define → obj.props[key] = val; delete obj[key]  (CSS prop)

pickupElementFromProps(obj):
  for each key in obj.props:
    if props.onXxx && isFunction → addEventFromProps → on[eventName] = fn   (v2 compat)
    if component/builtin/define  → lift back to obj root
```

This runs in `create.js` BEFORE `initProps`. After `initProps` rebuilds `props` from the stack, `pickupElementFromProps` runs again to handle anything that entered props via `childProps`/`inheritParentProps`.

---

## 10. Common Mistakes & Fixes

| Mistake | Symptom | Fix |
|---------|---------|-----|
| New method missing from `METHODS` | `TypeError: fn is not a function` or `this` is undefined | Add to `METHODS` in `keys.js` |
| New method not in `addMethods` proto | `el.myMethod is not a function` | Add to `proto` in `element/methods/set.js` |
| `defaultRouter` not imported | Click silently fails, page reloads | Import from `@domql/router` |
| `event.preventDefault()` inside try after router call | Page reloads on router error | Move `preventDefault()` before `try` |
| `onClick` at element root not binding | No click response | Fixed in `pickupPropsFromElement` — now routes to `on.click` |
| SVG `nodeName` lowercase check | Icons render as text strings | Use `'SVG'` (uppercase) in html mixin |
| `state?.[param]` vs `state[param]` | TypeError when state is null | Always use optional chaining |
| Method called without `this` | TypeError in strict mode | Ensure method is in `METHODS` array |

---

## 11. CSS Props Promotion

Top-level non-special properties become `props.*`:

```js
// element definition
export const Link = {
  fontWeight: 'bold',      // → props.fontWeight
  color: 'currentColor',   // → props.color
  tag: 'a',                // stays at root (in DOMQ_PROPERTIES)
  attr: { href: ... }      // stays at root (in REGISTRY)
}
```

The emotion/CSS system reads `element.props` for styling. This is why `propertizeElement` must run before styling.

---

## 12. Build Order

When changing smbls source, rebuild affected packages in dependency order:

```bash
# utils first (element depends on utils)
cd smbls/packages/utils && npm run build:esm

# then element
cd smbls/packages/element && npm run build:esm

# consumer apps pick up via parcel --watch-dir=../smbls/packages
```

Packages export `dist/esm/index.js`. Parcel resolves via `"exports"."import"` in package.json.
