# @domql Packages — Full Audit

**Date:** 2026-03-03
**Scope:** All packages and plugins in `/smbls/packages/` and `/smbls/plugins/` with `@domql` scope
**Method:** Function-by-function source analysis across every file

---

## Packages Audited

| Package | Location | Version |
|---|---|---|
| `@domql/utils` | `packages/utils/` | 3.2.3 |
| `@domql/element` | `packages/element/` | 3.2.3 |
| `@domql/state` | `packages/state/` | 3.2.3 |
| `domql` | `packages/domql/` | 3.2.3 |
| `@domql/report` | `plugins/report/` | 3.2.3 |
| `@domql/router` | `plugins/router/` | 3.2.3 |
| `@domql/emotion` | `plugins/emotion/` | 3.2.3 |
| `@domql/parse` | `plugins/parse/` | 3.2.3 |
| `@domql/performance` | `plugins/performance/` | 3.2.3 |

---

## Dependency Graph

```
@domql/utils        (no deps — base)
@domql/report       (no deps — base)

@domql/emotion      → @domql/utils
@domql/performance  → (none declared; uses window.performance global)
@domql/parse        → @domql/element

@domql/state        → @domql/utils, @domql/report, @domql/element  ←┐ CIRCULAR
@domql/element      → @domql/utils, @domql/report, @domql/state    ←┘ CIRCULAR

@domql/router       → @domql/utils, @domql/element

domql               → @domql/utils, @domql/element, @domql/state
```

---

## Critical Issues (Top Priority)

### 1. CIRCULAR DEPENDENCY — element ↔ state

- `packages/element/create.js` imports `createState` from `@domql/state`
- `packages/element/update.js` imports `createState` from `@domql/state`
- `packages/state/create.js` imports `triggerEventOn` from `@domql/element`
- `packages/state/updateState.js` imports `triggerEventOnUpdate` from `@domql/element`

**Risk:** ESM module graph can deadlock during init; bundlers resolve it silently but the runtime order is fragile.
**Fix:** Extract event triggering into a shared `@domql/events` micro-package, or use lazy imports.

### 2. `classList` read-only property assignment — `element/mixins/classList.js:46` & `plugins/emotion/classList.js:46`

```js
node.classList = className  // ❌ DOMTokenList is read-only
```

**Fix:**
```js
node.className = className  // ✅
```

### 3. `text.js` logic error — `element/mixins/text.js:17`

```js
if (param !== undefined || param !== null)  // always true
```

**Fix:**
```js
if (param !== undefined && param !== null)
```

### 4. `update.js` operator precedence bug — `element/update.js:171`

```js
(preventStateUpdate && param) === 'state'  // always false
```

**Fix:**
```js
preventStateUpdate && param === 'state'
```

### 5. `attr.js` isNot() called without argument — `element/mixins/attr.js:12`

```js
isNot('object')  // checks the string 'object', not params
```

**Fix:**
```js
isNot(params)('object')
```

### 6. `node.js` duplicate content check — `element/node.js:93`

```js
element.content || element.content  // both sides identical
```

Likely should be:
```js
element.children || element.content
```

### 7. `performance.js` console.group logic broken — `plugins/performance/index.js:14-32`

```js
console.group() || console.error() || console.groupEnd()
```
All three always execute because `console.*` returns `undefined`, and `undefined || x` always evaluates `x`.
**Fix:** Use explicit sequential calls:
```js
console.group(key)
console.error(...)
console.groupEnd()
```

### 8. `performance.js` misleading async name

`measurePromise()` is a copy of `measure()` — it calls `func` synchronously and is not promise-aware.
**Fix:** Either make it actually `async`/`.then()` aware or rename it.

### 9. `report.js` missing guard on registry lookup — `plugins/report/index.js:67-71`

```js
const errObj = ERRORS_REGISTRY[lang][err]
// if err is not in registry, errObj is undefined
// then errObj.description throws
```

**Fix:** Add guard before accessing `.description`.

### 10. `state/methods.js:150` — `setPathCollection` uses `Promise.resolve` incorrectly

The `reduce()` uses `Promise.resolve({})` as an accumulator but never chains `.then()` properly — code is synchronous inside but wrapped in a promise that is never awaited.
**Fix:** Remove the Promise wrapper and batch synchronously, or convert the full function to `async/await`.

### 11. `state/methods.js:207` — `applyReplace` calls undefined method

```js
state.replace(func(state))  // replace() may not exist on state
```

**Fix:** Verify `state.replace` is declared in `applyStateMethods`, or call `state.set()`.

### 12. `@domql/parse` — duplicate dependency

`plugins/parse/package.json` lists `@domql/element` twice in `dependencies`. Second key silently overwrites first (JSON spec). Clean up.

### 13. `render/cache.js` — `window.nodeCaches` pollution + unbounded cache

```js
window.nodeCaches = window.nodeCaches || {}
```

Cache accumulates indefinitely. No LRU, no cleanup, no size limit. Pollutes the global `window` object.
**Fix:** Use a module-level `Map` with a bounded size or WeakMap.

### 14. `element/mixins/html.js` — no HTML sanitization (XSS)

```js
node.innerHTML = param  // raw assignment
```

No sanitization before setting innerHTML. Any string from user or external data is a potential XSS vector.
**Fix:** Sanitize via DOMPurify or an equivalent before assigning.

### 15. `element/mixins/state.js` — core functionality commented out

```js
// element.state[v] = element.state[v]  // line 12, commented
```

The state mixin handler body does nothing. If this was intentional, the function should be removed; if not, it needs to be implemented.

---

## Package-by-Package Audit

---

### `@domql/utils`

**Files:** `key.js`, `env.js`, `types.js`, `object.js`, `function.js`, `array.js`, `node.js`, `if.js`, `log.js`, `string.js`, `globals.js`, `cookie.js`, `tags.js`, `component.js`, `props.js`, `extends.js`, `element.js`, `state.js`, `keys.js`, `scope.js`, `methods.js`, `cache.js`, `update.js`, `events.js`

#### `key.js`
- `generateKey()` / `createSnapshotId` — simple counter closure. Redundant alias creates ambiguity. Counter never resets.
- `createKey(element, parent, key)` — missing null check on `element` before `.key` access. `exec()` may return `undefined`, causing `.toString()` to throw.

#### `env.js`
- `NODE_ENV` / `ENV` — frozen at import time. In browser environments, `process.env.NODE_ENV` may be undefined.

#### `types.js`
- Multiple `is*` checks. Generally solid. No issues identified.

#### `object.js`
- `deepClone`, `overwriteShallow`, `overwriteDeep` — no circular reference protection in deepClone. Can stack-overflow on deeply nested objects.

#### `methods.js`
- **TODO at lines 11, 32:** "update these files" — unresolved.

#### `props.js`
- **TODO at line 137:** "check bind with promise" — unresolved.

#### `keys.js`
- Exports `DOMQ_PROPERTIES` — the canonical list of built-in domql property names. This is the single source of truth replacing the old `REGISTRY` object check in hacks code.

#### `state.js`
- Exports `STATE_METHODS` — used for filtering out non-data keys in state parse/clean.

#### General gaps across utils
- No JSDoc / type annotations
- `methods.js` and `props.js` have unresolved TODOs

---

### `@domql/element`

#### `create.js`

Function: `create(props, parentEl, passedKey, options, attachOptions)`

- `visitedElements` WeakMap grows unbounded — potential memory accumulation over app lifetime
- `path.splice()` on line 154 may throw if `ref.path` is not initialized as array
- Line 155: `path.includes('ComponentsGrid')` on an array works, but is a hardcoded string comparison that will need to change if renamed
- `renderElement()` catches errors but only logs — no propagation in production, silent failures

#### `update.js`

Function: `update(params, opts)`

- `(preventStateUpdate && param) === 'state'` — **always false** (see Critical #4)
- `element.props.lazyLoad` access without null check on `props`
- `params.children` vs `element.children` priority is inconsistent between lines 214-218
- Full property iteration on every update — no dirty-checking before iterating
- requestAnimationFrame batching can accumulate if children update triggers parent update triggers child update

#### `set.js`

- `removeContent`: line 77 — `child.node.parentNode.removeChild()` can throw if node has no parentNode
- `set()`: `window.requestAnimationFrame` will throw in non-browser environments
- `deepContains()` called on every `set()` — expensive comparison on large trees

#### `node.js`

- Line 93: `element.content || element.content` — identical sides (see Critical #6)
- `createNode` iterates all properties O(n) on every creation with no caching

#### `extend.js`

- `mainExtend` is a **module-level singleton** (line 73). Only correct for a single rendering context. If multiple app instances exist, they share state.
- Multiple merge operations back-to-back — could be reduced to a single deep merge pass

#### `iterate.js`

- `throughInitialExec`: promise resolution has no error handling (`.then()` only, no `.catch()`)
- `throughInitialDefine`: define handler can double-execute the element property (line 118 + line 136)
- `throughUpdatedDefine`: uses cached exec value but calls `exec()` on it again — risk of re-executing functions

#### `children.js`

- **JSON.stringify for diffing (line 71)** — O(n) deep traversal on every `set()` call, breaks on circular refs and functions
- `deepClone()` called twice (lines 75, 83)
- `children === 'state'` hardcoded string (line 34)

#### `extend.js`

- No circular reference detection in extend stack — deeply nested or circular extends will stack overflow

#### `mixins/html.js`

- **No sanitization** — raw innerHTML assignment (see Critical #14)
- SVG check on line 15: `node.nodeName === 'SVG'` — SVG elements have lowercase `nodeName` `'svg'`

#### `mixins/state.js`

- Body is effectively empty — core logic commented out (see Critical #15)

#### `mixins/classList.js`

- `node.classList = className` — read-only property (see Critical #2)
- **TODO at line 38:** "fails on string" — known unresolved bug

#### `mixins/attr.js`

- `isNot('object')` called without argument (see Critical #5)

#### `mixins/data.js`

- Reports error on line 14 but continues processing — inconsistent error flow

#### `event/on.js`

- `applyEventsOnNode`: addEventListener in loop creates closures without capturing `param` correctly — all listeners may reference last `param` value
- No event listener cleanup/removal on element destroy
- No `.preventDefault()` / `.stopPropagation()` control mechanism

#### `event/animationFrame.js`

- `initAnimationFrame()` starts an infinite `requestAnimationFrame` loop that never stops
- If called multiple times, multiple loops run simultaneously — memory/CPU leak
- `element.parent.node.contains(element.node)` — parent may not exist

#### `render/cache.js`

- `window.nodeCaches` — pollutes global, unbounded accumulation (see Critical #13)
- Hardcoded SVG tag list (`svg`, `path`) — not extensible for other SVG elements (e.g. `rect`, `circle`, `polygon`)

#### `render/append.js`

- `appendNode`: silent error (try-catch logs but still returns node)
- `assignNode`: assigns `parent[key]` before potentially failing to append — no rollback

---

### `@domql/state`

#### `state/create.js`

Function: `applyInitialState(element, parent, options)`

- If `stateInit` event handler returns `false`, state methods are never applied — elements left without state API
- `parent.state || {}` fallback used before parent may be initialized — potential initialization order issue
- No null check on `element` parameter entry

#### `state/updateState.js`

Function: `updateState(obj, options)`

- `options.updateByState` merge logic (line 30): merges defaults but condition doesn't re-evaluate after merge — defaults may not take effect
- `preventInheritAtCurrentState` pattern uses implicit stateful flag — confusing re-entrance guard
- `hoistStateUpdate()` → `parent.state.update()` can recurse infinitely if parent also propagates
- `applyElementUpdate()` → `element.update()` can cascade — state update → element update → state update loop

Function: `hoistStateUpdate(state, obj, options)`

- `hasNotUpdated` variable name is inverted — `!preventHoistElementUpdate` should be named more clearly
- `createNestedObjectByKeyPath()` return value used without null check (line 87)
- Boolean state type checked (line 79) but falsy boolean `false` would fail

#### `state/methods.js`

- `parse()` — returns `undefined` for non-object/non-array state (inconsistent return type)
- `clean()` — deletes in `for...in` loop; generally safe but fragile pattern
- `destroy()` — uses `Object.setPrototypeOf({parent: ...})` which does not attach methods correctly; should use `Object.create` or `applyStateMethods` equivalent
- `remove()` — calls both `removeFromArray` AND `removeFromObject` sequentially without `else` (line 126); one will always silently fail
- `setPathCollection()` — `Promise.resolve({})` accumulator is not properly chained; code is synchronous but wrapped in unresolved promise (see Critical #10)
- `applyReplace()` — calls `state.replace()` which may not be defined (see Critical #11)
- `keys(obj)` / `values(obj)` — `obj` parameter is declared but never used
- `applyStateMethods()` — `__children` and root properties are enumerable (unlike methods), causing them to appear in iteration

---

### `domql` (wrapper)

#### `domql/index.js`

Function: `create(element, parent, key, options)`

- Handles both `DOM.default.create` and `DOM.create` — fragile export format detection
- `complete` and `onComplete` hooks both called — duplicate hook invocations
- If any hook throws, execution stops without cleanup
- Hooks `initInspect` and `initSync` called without documentation

---

### `@domql/report`

#### `report/index.js`

Function: `report(err, arg, element)`

- Hardcoded language `'en'` — no i18n
- If `err` key not in registry, `errObj` is `undefined` → `.description` access throws
- `new Error(msg, file, line)` — JS `Error` constructor only uses first argument; extra args are ignored
- Parameters `arg` and `element` are declared but never used
- Function name implies logging but it only creates and returns an Error — misleading API
- Typo in registry: `"preferances"` should be `"preferences"` (line 20 of registry)

---

### `@domql/router`

#### `router/index.js`

Function: `getActiveRoute(level, route)`

- Negative `level` silently returns undefined — no validation
- `route.split('/')` creates empty first element — works but surprising

Function: `router(path, el, state, options)`

- `lastLevel = opts.lastLevel` (line 40) — updates module-level singleton, affects subsequent calls
- `new win.URL()` (line 53) — throws if `win` is undefined or path is invalid; no try-catch
- Path/hash logic (line 73): `if (pathChanged || !hashChanged)` — condition appears inverted for hash-only navigation; hash changes without path change will skip content update
- Scroll offset calculation (line 113-115):
  ```js
  .top + rootNode.scrollTop - opts.scrollToOffset || 0
  ```
  Parsed as `(...- scrollToOffset) || 0` — if `scrollToOffset` is 0, `|| 0` makes the whole expression 0 when it shouldn't. Should add parentheses:
  ```js
  .top + rootNode.scrollTop - (opts.scrollToOffset || 0)
  ```
- No return value — callers can't detect navigation failure
- Wildcard route `element.routes['/*']` — good fallback pattern, but no 404 handler if that's also missing

---

### `@domql/emotion`

#### `emotion/index.js`

Function: `transformEmotionStyle(emotion)`

- Assigns `ref.__class.style` without checking `ref.__class` is initialized
- No error handling if `emotion.css()` throws

Function: `transformEmotionClass(emotion)`

- `if (element.style && !flag)` early return — intent is unclear; could cause emotion classes to be silently skipped
- `emotion.css(prop)` called without try-catch — malformed CSS-in-JS will throw

Function: `transformDOMQLEmotion(emotion, options)`

- Creates emotion instance with hardcoded key `'smbls'` — will conflict if two instances initialized

#### `emotion/classList.js`

- `applyClassListOnNode`: `node.classList = className` — read-only (see Critical #2)
- `classify()`: iterates without `hasOwnProperty` — inherited properties could be included
- `classList()`: mutates `element.classlist` as side effect (lines 35-36)
- **TODO at line 38** — "fails on string" — known unresolved bug

---

### `@domql/parse`

#### `parse/index.js`

Function: `parse(element)`

- Creates a real DOM `div` node for every parse call — performance cost
- Not SSR-compatible (`innerHTML` is browser-only)
- No cleanup of the virtual container node after use
- Package.json has duplicate `@domql/element` dependency (JSON key collision)

---

### `@domql/performance`

#### `performance/index.js`

Function: `measure(key, func, options)`

- `console.group() || console.error() || console.groupEnd()` — all three always execute (see Critical #7)
- Passes `perf` (start timestamp) to `func` — unclear purpose
- 5 repeated `if` blocks could be a lookup table
- `window.performance.now()` — not available in non-browser environments; no guard

Function: `measurePromise(key, func, options)`

- Identical to `measure()` — not promise-aware despite the name (see Critical #8)

---

## TODO / FIXME Inventory

| File | Line | Comment |
|---|---|---|
| `utils/methods.js` | 11, 32 | "TODO: update these files" |
| `utils/props.js` | 137 | "TODO: check bind with promise" |
| `element/mixins/classList.js` | 38 | "TODO: fails on string" |
| `element/render/cache.js` | 14 | "TODO: change that" (SVG/path handling) |
| `element/render/cache.js` | 16 | "TODO: allow strict mode to check validity" |
| `element/node.js` | 77 | "TODO: test this with promise" |
| `state/updateState.js` | 83 | "check with createNestedObjectByKeyPath" |

---

## Performance Hotspots

| Location | Issue | Severity |
|---|---|---|
| `element/children.js:71` | `JSON.stringify` diff on every `set()` | High |
| `element/render/cache.js` | Unbounded `window.nodeCaches` | High |
| `element/create.js:127` | `visitedElements` WeakMap grows forever | Medium |
| `element/extend.js:73` | `mainExtend` singleton, recomputed on every creation | Medium |
| `element/update.js` | Full property iteration on every update (no dirty check) | Medium |
| `state/updateState.js` | Multiple event triggers per update, no batching | Medium |
| `state/methods.js (parse)` | O(n×m) with `STATE_METHODS.includes()` in array filter | Low |
| `element/event/animationFrame.js` | Multiple `initAnimationFrame()` calls = multiple loops | High |

---

## Memory Leak Risks

| Location | Issue |
|---|---|
| `element/render/cache.js` | `window.nodeCaches` — no eviction |
| `element/event/on.js` | Event listeners never removed from DOM nodes |
| `element/event/animationFrame.js` | Infinite rAF loop; `frameListeners` Set grows |
| `element/create.js` | `visitedElements` WeakMap — cleared by GC only if refs are released |

---

## Security

| Location | Issue | Severity |
|---|---|---|
| `element/mixins/html.js` | Raw `innerHTML` — XSS vector | Critical |
| `element/methods/set.js` | `Object.setPrototypeOf` from user data — prototype pollution risk | Medium |

---

## Recommended Fixes by Priority

### Immediate (bugs / correctness)

1. `classList.js` × 2 — change `node.classList = x` → `node.className = x`
2. `text.js:17` — `||` → `&&` in null check
3. `update.js:171` — fix operator precedence
4. `attr.js:12` — pass `params` to `isNot()`
5. `node.js:93` — `element.content || element.content` → `element.children || element.content`
6. `report.js` — add guard before `errObj.description`
7. `state/methods.js:126` — add `else` between `removeFromArray` / `removeFromObject`
8. `state/methods.js:207` — verify `state.replace` exists or replace with `state.set`
9. `performance.js:14-32` — fix console.group chaining
10. `router.js:115` — add parentheses to scroll offset math

### Short-term (design / gaps)

11. Extract event trigger functions (`triggerEventOn`, `triggerEventOnUpdate`) into a shared module to break the element ↔ state circular dependency
12. Replace `JSON.stringify` diff in `children.js` with structural comparison
13. Replace `window.nodeCaches` with a module-level bounded `Map`
14. Add HTML sanitization in `html.js`
15. Fix `state/methods.js:150` — `setPathCollection` promise accumulator
16. Fix `state/methods.js` — `destroy()` prototype assignment
17. Add try-catch to animation frame loop to prevent one bad element killing the whole loop
18. `parse.js` — add SSR guard / cleanup virtual container

### Long-term (architecture)

19. Implement dirty-checking in `update.js` before full property iteration
20. Batch state updates — debounce or microtask queue before triggering element re-renders
21. Make `router.js` state module-instance-scoped (remove `lastPathname`/`lastLevel` globals)
22. Make `mainExtend` in `extend.js` context-scoped
23. Add event listener cleanup on element removal
24. Implement LRU for `nodeCaches`
25. Make `measurePromise` actually async-aware or remove it

---

## Package.json Issues

| Package | Issue |
|---|---|
| `@domql/parse` | `@domql/element` listed twice in `dependencies` |
| `@domql/performance` | Uses `window.performance` but declares no dependencies |
| `@domql/report` | `arg` and `element` params documented but unused |
