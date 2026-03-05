# Symbols / DOMQL v3 — Framework Usage Notes

Collected issues, conventions, and gotchas discovered while building the AI Survey app.

---

## Critical API Differences (v2 → v3)

### `extends:` not `extend:`
```js
// CORRECT (v3)
{ extends: 'Flex' }

// WRONG (v2 legacy)
{ extend: 'Flex' }
```

### `onClick:` not `on: { click: fn }`
```js
// CORRECT
onClick: (e, el, s) => { ... }

// WRONG
on: { click: (e, el, s) => { ... } }
```

### No `props: {}` wrapper — all props at root
```js
// CORRECT
{ extends: 'Flex', flow: 'y', gap: 'B' }

// WRONG
{ extends: 'Flex', props: { flow: 'y', gap: 'B' } }
```

---

## State Management

- **Never mutate state directly** — always use `s.update({ key: value })`
- `s.update()` is available on the state object passed as second arg to handlers
- In functions called via `el.call('fnName', s)`, state arrives as the first argument to the function
- Do NOT pass `el` as an argument to `el.call()` — it is already bound as `this`

```js
// Function called from component:
el.call('myFn', s)

// Function definition:
export const myFn = function myFn (s) {
  // `this` = DOMQL element, `s` = state
  s.update({ foo: 'bar' })
}
```

---

## `onStateUpdate` Reliability

`onStateUpdate` is defined in the framework but **not reliably called** on all components during normal state updates. Do not depend on it for interactive UI feedback (button active states, upload previews, etc.).

**Pattern that works reliably:** Direct DOM manipulation in the event handler itself:

```js
btn.addEventListener('click', function () {
  // Update siblings directly — don't wait for onStateUpdate
  grid.querySelectorAll('button').forEach(function (b) {
    b.style.background = b === btn ? '#eef2ff' : 'white'
  })
  s.update({ myField: value })
})
```

---

## `onRender` Guard Pattern

Always guard `onRender` to prevent double-execution:

```js
onRender: (el, s) => {
  if (el.__init) return
  el.__init = true
  // ... build DOM
}
```

---

## View / Phase Switching

Switching between views (survey/dashboard/success) and phases must be done via direct DOM IDs — reactive `display` bindings on full component trees are unreliable at scale:

```js
// Correct approach: DOM IDs + direct style manipulation
document.getElementById('view-survey').style.display = 'none'
document.getElementById('view-dashboard').style.display = 'block'

// Also directly update interactive elements that onStateUpdate may miss:
document.querySelectorAll('button[data-phase]').forEach(btn => {
  btn.style.background = parseInt(btn.dataset.phase) === phase ? '#4f46e5' : 'transparent'
})
```

---

## Component Scope Pattern

Use `scope` for component-local helper functions:

```js
export const MyComponent = {
  extends: 'Flex',
  scope: {
    buildSection: function (label) { ... },
    buildOptionButtons: function (s, node, field, opts) { ... }
  },
  onRender: (el, s) => {
    el.scope.buildSection('My Label')
  }
}
```

---

## Color / Theme Tokens

- Color tokens are defined in `smbls/designSystem/COLOR.js`
- No opacity modifier syntax (no `'white .7'`) — define named colors instead
- Border shorthand `'none'` works; split complex borders: `borderWidth`, `borderStyle`, `borderColor`
- `flexAlign: 'center center'` — NOT `align:`

---

## Import Conventions

- Pages and components reference each other by PascalCase key name — **no direct imports between component files**
- Functions ARE regular ES modules and CAN import from each other
- `index.js` uses `export *` (NOT `export * as`)
- State is imported in the app entry point, not by components

---

## Build / Tooling

- Bundler: **Parcel 2** (from starter-kit)
- Port conflicts: Parcel defaults to 1234; specify explicitly with `--port XXXX`
- Empty files (0 bytes) can't be written with Write tool — use Bash `printf` as fallback

---

## Supabase Integration

The Supabase REST API works cleanly with plain `fetch()` — no SDK needed:

```js
// POST
fetch(URL + '/rest/v1/table', {
  method: 'POST',
  headers: {
    apikey: KEY,
    Authorization: 'Bearer ' + KEY,
    'Content-Type': 'application/json',
    Prefer: 'return=minimal'
  },
  body: JSON.stringify({ data: payload })
})

// GET
fetch(URL + '/rest/v1/table?select=*&order=created_at.desc', {
  headers: { apikey: KEY, Authorization: 'Bearer ' + KEY }
})
```
