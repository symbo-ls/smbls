# DOMQL Functions Reference
> Generated for v3 migration audit. All packages under `/domql/packages/`.

---

## Package Overview

| Package | Files | Purpose |
|---------|-------|---------|
| `domql` | 1 | Root entry point wrapper |
| `element` | ~35 | Core element lifecycle (create, update, set, iterate, mixins, props, methods, utils, cache) |
| `event` | 5 | Event attachment, lifecycle triggers, animation frames |
| `render` | 3 | DOM node creation, caching, appending |
| `state` | 5 | State creation, update, inheritance, methods |
| `utils` | 16 | Shared primitives: types, objects, arrays, strings, functions, etc. |

---

## Package: `domql`

**File:** `packages/domql/index.js`

### `create(element, parent, key, options)`
- **Purpose:** Entry point to create a DOMQL element. Calls element.create, then runs completion/init callbacks and syncs events.
- **Returns:** Element instance
- **Migration notes:** Check callback handling matches v3 lifecycle events (`onInit`, `onRender`)

---

## Package: `element`

### `create.js`

#### `create(element, parent, key, options, attachOptions)`
- **Purpose:** Main element creation pipeline. Validates, resolves extends, builds props, initializes state, creates DOM node.
- **Returns:** Element object with DOM node attached
- **Migration notes:** Core pipeline — verify extends resolution handles v3 `extends`/`childExtends` (not v2 `extend`/`childExtend`)

#### `validateElement(value, options)`
- **Purpose:** Guards against dangerous input — rejects DOM instances, globals, prototypes.
- **Returns:** Boolean or throws

#### `cacheOptions(element, options)`
- **Purpose:** Stores creation options on element for later use.
- **Returns:** void

#### `createKey(element, parent, key)`
- **Purpose:** Generates unique element key (uses `generateKey()` from utils).
- **Returns:** String key

#### `addRef(element, parent)`
- **Purpose:** Creates `element.__ref` with root, path, and parent pointers.
- **Returns:** void

#### `switchDefaultOptions(element, parent, options)`
- **Purpose:** Pushes updated default options to the registry.
- **Returns:** void

#### `addElementIntoParentChildren(element, parent)`
- **Purpose:** Registers this element in parent's children list.
- **Returns:** void

#### `renderElement(element, parent, options, attachOptions)`
- **Purpose:** Calls `createNode`, catches errors, triggers render events.
- **Returns:** Element

#### `createBasedOnType(element, parent, key, options)`
- **Purpose:** Handles non-object inputs — converts string/function/array to element object.
- **Returns:** Normalized element object

#### `redefineElement(element, parent, key, options)`
- **Purpose:** Resolves `extends` chain and applies media query overrides.
- **Returns:** Element with merged extends

#### `redefineParent(element, parent, key, options)`
- **Purpose:** Normalizes parent reference; handles root parent.
- **Returns:** Parent element

#### `applyContext(element, parent, options)`
- **Purpose:** Copies context from parent/root to element.
- **Returns:** void

#### `createScope(element, parent)`
- **Purpose:** Initializes `element.scope` from parent or creates fresh.
- **Returns:** void

#### `createIfConditionFlag(element, parent)`
- **Purpose:** Sets `element.__if` flag for conditional rendering.
- **Returns:** void

#### `addCaching(element, parent)`
- **Purpose:** Initializes `__exec`, `__cached`, `__class`, `__attr` internal caches.
- **Returns:** void

#### `onlyResolveExtends(element, parent, key, options)`
- **Purpose:** Alternative path that resolves extends without full render (used for dry-run lookups).
- **Returns:** Element with extends merged

---

### `define.js`

#### `default(params, options)`
- **Purpose:** Registers component definitions into the global REGISTRY.
- **Returns:** void
- **Migration notes:** This is how components are globally registered — must be called before any component reference by name.

---

### `extend.js`

#### `applyExtend(element, parent, options)`
- **Purpose:** Resolves the full extends chain (`extends`, `childExtends`) and deep-merges them into the element.
- **Returns:** Extended element
- **Migration notes:** **Critical v3 area.** Must use `extends`/`childExtends`. Any v2 `extend`/`childExtend` keys will be silently ignored or misprocessed here.

---

### `node.js`

#### `createNode(element, options)`
- **Purpose:** Creates the actual DOM node, attaches event listeners, iterates children.
- **Returns:** DOM Node
- **Migration notes:** Entry point for DOM rendering — children iteration happens here.

---

### `tree.js`

#### `ROOT`
- **Purpose:** Reference to `document.body` as root tree node.

#### `TREE`
- **Purpose:** Alias for `ROOT`.

---

### `update.js`

#### `update(params, opts)` *(async)*
- **Purpose:** Updates element props and triggers re-renders. Runs storm detection, snapshot capture, conditional render checks, state inheritance.
- **Returns:** Updated element
- **Migration notes:** `onUpdate` and `onStateUpdate` events should fire via v3 `onX` prefix. Verify no v2 `on.update` references.

#### `checkIfStorm(element, options)`
- **Purpose:** Detects and breaks infinite update loops.
- **Returns:** Boolean

#### `captureSnapshot(element, options)`
- **Purpose:** Captures element state snapshot to skip redundant updates.
- **Returns:** Snapshot object

#### `checkIfOnUpdate(element, parent, options)`
- **Purpose:** Evaluates `if` condition during updates for conditional rendering.
- **Returns:** Boolean

#### `inheritStateUpdates(element, options)`
- **Purpose:** Propagates state changes to elements that inherit state.
- **Returns:** void

#### `createStateUpdate(element, parent, options)`
- **Purpose:** Recreates state object while preserving inherited state links.
- **Returns:** State object

---

### `set.js`

#### `resetElement(params, element, options)`
- **Purpose:** Removes existing DOM content and creates fresh content.
- **Returns:** Element

#### `reset(options)`
- **Purpose:** Resets element to its original definition.
- **Returns:** void

#### `set(params, options, el)`
- **Purpose:** Sets element content — handles lazy loading and content caching.
- **Returns:** Element

---

### `iterate.js`

#### `throughInitialExec(element, exclude)`
- **Purpose:** Iterates element properties on creation, executes any function-valued props.
- **Returns:** void

#### `throughUpdatedExec(element, options)`
- **Purpose:** Re-executes function-valued props on updates.
- **Returns:** void

#### `throughExecProps(element, opts)`
- **Purpose:** Executes function props specifically within the props object.
- **Returns:** void

#### `throughInitialDefine(element, opts)`
- **Purpose:** Applies REGISTRY define transformers on element creation.
- **Returns:** void

#### `throughUpdatedDefine(element, opts)`
- **Purpose:** Re-applies REGISTRY define transformers on updates.
- **Returns:** void

---

### Methods: `element/methods/`

#### `spotByPath(path)`
- **Purpose:** Traverses element tree to find element at given path array.
- **Returns:** Element or undefined

#### `lookup(param)`
- **Purpose:** Walks up ancestor chain to find element by key name or predicate function.
- **Returns:** Element or null
- **Usage:** `el.lookup('Modal')` or `el.lookup(el => el.props.isRoot)`

#### `lookdown(param)`
- **Purpose:** Finds first matching descendant by key or predicate.
- **Returns:** Element or null

#### `lookdownAll(param, results)`
- **Purpose:** Collects all matching descendants.
- **Returns:** Array of elements

#### `setNodeStyles(params)`
- **Purpose:** Applies style properties to DOM node recursively.
- **Returns:** void

#### `remove(opts)`
- **Purpose:** Removes element from DOM tree and cleans up references.
- **Returns:** void

#### `get(param)`
- **Purpose:** Gets element property by key.
- **Returns:** Property value

#### `setProps(param, opts)`
- **Purpose:** Updates element props and triggers re-render.
- **Returns:** void

#### `getRef(key)`
- **Purpose:** Gets `__ref` reference data.
- **Returns:** Reference value

#### `getChildren()`
- **Purpose:** Returns all direct children elements.
- **Returns:** Array of elements

#### `getPath()`
- **Purpose:** Returns path array from root to this element.
- **Returns:** String array

#### `keys()`
- **Purpose:** Returns element keys (excluding internals).
- **Returns:** String array

#### `parse(excl)`
- **Purpose:** Converts element to plain serializable object.
- **Returns:** Plain object

#### `parseDeep(excl)`
- **Purpose:** Deep converts element tree to plain object.
- **Returns:** Nested plain object

#### `verbose(element, ...args)`
- **Purpose:** Logs detailed element info for debugging.
- **Returns:** void

#### `groupLog(...params)` / `groupLogEnd(...params)`
- **Purpose:** Console group wrapper for structured logging.
- **Returns:** void

#### `log(...params)` / `warn(...params)` / `error(...params)`
- **Purpose:** Logging utilities bound to element context.
- **Returns:** void

#### `nextElement()`
- **Purpose:** Returns next sibling element in parent's children.
- **Returns:** Element or null

#### `append(el, key, opts)`
- **Purpose:** Appends a new child element.
- **Returns:** New child element

#### `previousElement(el)`
- **Purpose:** Returns previous sibling element.
- **Returns:** Element or null

#### `variables(obj)`
- **Purpose:** Tracks variable changes on element.
- **Returns:** void

#### `call(fnKey, ...args)`
- **Purpose:** Calls a registered global function from context by name.
- **Returns:** Function return value
- **Usage:** `el.call('fetchData', '/api/users')`

---

### Root Methods: `element/methods/root.js`

#### `getRootState(param)`
- **Purpose:** Navigates to root state — equivalent to `state.root`.
- **Returns:** Root state object

#### `getRoot(key)`
- **Purpose:** Returns root element of the tree.
- **Returns:** Root element

#### `getRootData(key)`
- **Purpose:** Gets data from root element.
- **Returns:** Data value

#### `getRootContext(key)`
- **Purpose:** Gets context from root.
- **Returns:** Context value

#### `getContext(key)`
- **Purpose:** Gets context from current element.
- **Returns:** Context value

---

### Legacy: `element/methods/v2.js`
> **v2 only — do not use in v3 code.**

Contains: `defineSetter`, `keys`, `parse`, `parseDeep`, `log`, `nextElement`, `previousElement`

---

### Mixins: `element/mixins/`

#### `attr(params, element, node, opts)`
- **Purpose:** Sets HTML attributes (`id`, `data-*`, etc.) on DOM node.
- **Returns:** void

#### `assignKeyAsClassname(element)`
- **Purpose:** Automatically assigns element key as CSS class name.
- **Returns:** void

#### `classify(obj, element, opts)`
- **Purpose:** Converts class object to final CSS class string.
- **Returns:** String

#### `classList(params, element, opts)`
- **Purpose:** Processes `class` param into CSS class string.
- **Returns:** String

#### `applyClassListOnNode(params, element, node, opts)`
- **Purpose:** Applies final class list to DOM node.
- **Returns:** void

#### `updateContent(params, options)`
- **Purpose:** Updates element content (for dynamic `content` prop).
- **Returns:** void

#### `removeContent(el, opts)`
- **Purpose:** Removes and destroys content element.
- **Returns:** void

#### `setContent(param, element, node, opts)`
- **Purpose:** Sets element content via `content` prop function.
- **Returns:** void

#### `data(params, element, node)`
- **Purpose:** Applies `data-*` attributes to DOM node.
- **Returns:** void

#### `html(param, element, node, opts)`
- **Purpose:** Sets raw HTML content via `innerHTML`.
- **Returns:** void

#### `scope(params, element, node)`
- **Purpose:** Assigns `scope` object properties to element and binds functions.
- **Returns:** void

#### `state(params, element, node, opts)`
- **Purpose:** Initializes state binding on element.
- **Returns:** void

#### `style(params, element, node)`
- **Purpose:** Maps `style` object to DOM node's inline styles.
- **Returns:** void

#### `text(param, element, node, opts)`
- **Purpose:** Creates text nodes; handles `{{ }}` template literal bindings.
- **Returns:** void

---

### Props: `element/props/`

#### `syncProps(props, element, opts)`
- **Purpose:** Merges props stack from extends chain and executes dynamic prop functions.
- **Returns:** Resolved props object

#### `createProps(element, parent, options)`
- **Purpose:** Builds final props from inherited stack.
- **Returns:** Props object

#### `updateProps(newProps, element, parent, opts)`
- **Purpose:** Updates props with inheritance from parent.
- **Returns:** void

#### `IGNORE_PROPS_PARAMS`
- **Purpose:** Array of keys excluded from props processing (internals like `__ref`, `state`, etc.)

#### `inheritParentProps(element, parent)`
- **Purpose:** Extracts props that should be inherited from parent element.
- **Returns:** Props object

---

### Utils: `element/utils/`

#### `applyParam(param, element, options)`
- **Purpose:** Runs REGISTRY transformer for a single property key.
- **Returns:** Transformed value

#### `createValidDomqlObjectFromSugar(el, parent, key, options)`
- **Purpose:** Converts shorthand (sugar) component syntax to valid DOMQL object.
- **Returns:** Normalized element object

#### `overwriteVariant(element, variant, variantProps)`
- **Purpose:** Applies variant-specific prop overrides.
- **Returns:** Element

#### `applyVariant(element)`
- **Purpose:** Processes all `.variantName` conditional variant properties.
- **Returns:** Element

#### `generateHash()`
- **Purpose:** Creates random 6-character hash string.
- **Returns:** String

#### `getHashedExtend(extend)` / `setHashedExtend(extend, stack)`
- **Purpose:** Cache layer for extends stacks to avoid recomputation.
- **Returns:** Cached extend stack or void

#### `extractArrayExtend(extend, stack, context)`
- **Purpose:** Flattens an array of extends into a single stack.
- **Returns:** Stack array

#### `deepExtend(extend, stack, context)`
- **Purpose:** Recursively processes nested extends.
- **Returns:** Stack array

#### `flattenExtend(extend, stack, context)`
- **Purpose:** Flattens entire extends chain into flat stack.
- **Returns:** Stack array

#### `deepMergeExtend(element, extend)`
- **Purpose:** Deep merges extends objects into element.
- **Returns:** Merged element

#### `cloneAndMergeArrayExtend(stack)`
- **Purpose:** Clones and merges array of extends.
- **Returns:** Merged object

#### `fallbackStringExtend(extend, context, options, variant)`
- **Purpose:** Resolves string-based extends (e.g. `'Button'`) to component from REGISTRY.
- **Returns:** Component object

#### `jointStacks(extendStack, childExtendStack)`
- **Purpose:** Combines `extends` and `childExtends` stacks.
- **Returns:** Combined stack

#### `getExtendStack(extend, context)`
- **Purpose:** Gets the full resolved extend stack.
- **Returns:** Array of extends

#### `getExtendMerged(extend)`
- **Purpose:** Gets merged result of full extend chain.
- **Returns:** Merged object

#### `deepMerge(element, extend, exclude)` *(object.js)*
- **Purpose:** Deep-merges two objects.
- **Returns:** Merged object

#### `clone(obj, exclude)`
- **Purpose:** Shallow clones object.
- **Returns:** Cloned object

#### `overwrite(element, params, options)`
- **Purpose:** Overwrites element with params, using internal caching.
- **Returns:** Element

#### `overwriteShallow(obj, params, exclude)`
- **Purpose:** Shallow overwrite without caching.
- **Returns:** Object

#### `overwriteDeep(obj, params, exclude)`
- **Purpose:** Deep overwrite.
- **Returns:** Object

#### `mergeIfExisted(a, b)`
- **Purpose:** Merges b into a only if a exists.
- **Returns:** Merged object or a

#### `mergeArray(arr, exclude)`
- **Purpose:** Merges array of objects into one.
- **Returns:** Merged object

#### `mergeAndCloneIfArray(obj)`
- **Purpose:** Clones if array, returns as-is if object.
- **Returns:** Object

#### `flattenRecursive(param, prop, stack)`
- **Purpose:** Flattens recursive nested structures.
- **Returns:** Flat array

#### `propagateEventsFromProps(element)`
- **Purpose:** Converts `onX` prop keys to DOM `addEventListener` calls.
- **Returns:** void
- **Migration notes:** **v3 critical.** This function enables the `onClick`, `onKeydown`, etc. prop pattern. Verify it does NOT look for v2 `on: { }` syntax.

---

## Package: `event`

### `on.js`

#### `applyEvent(fnValue, element, state, context, options)`
- **Purpose:** Calls an event handler function with element/state/context.
- **Returns:** Return value of handler

#### `triggerEventOn(param, element, options)`
- **Purpose:** Triggers a named lifecycle event (e.g. `onRender`, `onInit`).
- **Returns:** void
- **Migration notes:** Must use `onRender`, `onInit` — not v2 `on.render`, `on.init`.

#### `applyEventUpdate(fnValue, updatedObj, element, state, context, options)`
- **Purpose:** Calls update event handler with diff object.
- **Returns:** Return value

#### `triggerEventOnUpdate(param, updatedObj, element, options)`
- **Purpose:** Triggers `onStateUpdate` or `onUpdate` with change diff.
- **Returns:** void

#### `applyEventsOnNode(element, options)`
- **Purpose:** Attaches all DOM event listeners from element props (reads `onX` keys).
- **Returns:** void
- **Migration notes:** **v3 event attachment.** This reads `onClick`, `onInput`, etc. from props. Any v2 `on: { click }` will be ignored here.

---

### `can.js`

#### `canRenderTag(tag)`
- **Purpose:** Validates if a string is a safe/known HTML tag.
- **Returns:** Boolean

---

### `animationFrame.js`

#### `registerFrameListener(el)`
- **Purpose:** Registers element into animation frame update loop.
- **Returns:** void

#### `applyAnimationFrame(element, options)`
- **Purpose:** Sets up `onFrame` handler for continuous updates.
- **Returns:** void

#### `initAnimationFrame(ctx)`
- **Purpose:** Starts global `requestAnimationFrame` loop.
- **Returns:** void

---

### `legacy.js`
> **v2 only — audit and remove references.**

Contains: `init`, `render`, `createState`, `updateStateInit`, `updateState`, `propsUpdated`, `update`

These are v2 event names. In v3 they are replaced by `onInit`, `onRender`, `onStateUpdate`, `onUpdate`.

---

## Package: `render`

### `cache.js`

#### `createHTMLNode(element)`
- **Purpose:** Creates HTML or SVG DOM node based on tag.
- **Returns:** DOM Node

#### `detectTag(element)`
- **Purpose:** Determines tag from `tag` prop, `extends`, or key name.
- **Returns:** Tag string

#### `cacheNode(element)`
- **Purpose:** Stores a cloned copy of node for performance (avoids recreating complex nodes).
- **Returns:** Cached node

---

### `append.js`

#### `appendNode(node, parentNode, el)`
- **Purpose:** Appends node to parent DOM node.
- **Returns:** void

#### `insertNodeAfter(node, siblingNode, parentNode)`
- **Purpose:** Inserts node after a sibling.
- **Returns:** void

#### `insertNodeBefore(node, siblingNode, parentNode)`
- **Purpose:** Inserts node before a sibling.
- **Returns:** void

#### `assignNode(element, parent, key, attachOptions)`
- **Purpose:** Decides where in DOM to place element's node (after, before, or append).
- **Returns:** void

---

## Package: `state`

### `create.js`

#### `createState(element, parent, options)`
- **Purpose:** Creates and initializes state for an element. Handles inheritance, root state, and method attachment.
- **Returns:** State object

#### `applyInitialState(element, parent, options)`
- **Purpose:** Applies initial state values and triggers `onInit` state events.
- **Returns:** void

---

### `updateState.js`

#### `updateState(obj, options)`
- **Purpose:** Main state update function. Merges new values, notifies dependent elements, triggers re-renders.
- **Returns:** Updated state

---

### `methods.js`

#### `parse()`
- **Purpose:** Returns state as plain object (strips methods and internal keys).
- **Returns:** Plain object

#### `clean(options)`
- **Purpose:** Clears all state properties.
- **Returns:** void

#### `destroy(options)`
- **Purpose:** Destroys state and severs element relationship.
- **Returns:** void

#### `parentUpdate(obj, options)`
- **Purpose:** Updates parent element's state.
- **Returns:** void

#### `rootUpdate(obj, options)`
- **Purpose:** Updates root application state.
- **Returns:** void

#### `add(value, options)`
- **Purpose:** Pushes item to state array.
- **Returns:** void

#### `toggle(key, options)`
- **Purpose:** Flips boolean state property.
- **Returns:** void

#### `remove(key, options)`
- **Purpose:** Removes property from state.
- **Returns:** void

#### `set(val, options)`
- **Purpose:** Replaces entire state with new value.
- **Returns:** void

#### `setByPath(path, val, options)`
- **Purpose:** Sets nested property using dot-path string.
- **Returns:** void

#### `setPathCollection(changes, options)`
- **Purpose:** Batch updates multiple nested paths.
- **Returns:** void

#### `removeByPath(path, options)`
- **Purpose:** Removes nested property by path.
- **Returns:** void

#### `removePathCollection(changes, options)`
- **Purpose:** Batch removes multiple nested paths.
- **Returns:** void

#### `getByPath(path, options)`
- **Purpose:** Gets nested property value by path.
- **Returns:** Value

#### `reset(options)`
- **Purpose:** Resets state to initial values.
- **Returns:** void

#### `apply(func, options)`
- **Purpose:** Mutates state with a function (for array pushes, etc.).
- **Returns:** void

#### `applyReplace(func, options)`
- **Purpose:** Applies function then replaces state.
- **Returns:** void

#### `applyFunction(func, options)`
- **Purpose:** Async version of apply.
- **Returns:** Promise

#### `quietUpdate(obj, options)`
- **Purpose:** Updates state WITHOUT triggering listeners/re-renders.
- **Returns:** void

#### `replace(obj, options)`
- **Purpose:** Replaces state values without full reset.
- **Returns:** void

#### `quietReplace(obj, options)`
- **Purpose:** Replaces values without triggering listeners.
- **Returns:** void

#### `keys()`
- **Purpose:** Returns state property keys.
- **Returns:** String array

#### `values()`
- **Purpose:** Returns state property values.
- **Returns:** Array

---

### `inherit.js`

#### `getRootStateInKey(stateKey, parentState)`
- **Purpose:** Resolves `~/` path prefix to navigate from root state.
- **Returns:** State value

#### `getParentStateInKey(stateKey, parentState)`
- **Purpose:** Resolves `../` path prefix to navigate to parent state.
- **Returns:** State value

#### `getChildStateInKey(stateKey, parentState, options)`
- **Purpose:** Resolves nested state key path.
- **Returns:** State value

#### `findInheritedState(element, parent, options)`
- **Purpose:** Walks ancestor chain to find state to inherit.
- **Returns:** State object or null

#### `createInheritedState(element, parent)`
- **Purpose:** Creates a copy of inherited state for child element.
- **Returns:** State object

#### `checkIfInherits(element)`
- **Purpose:** Checks if element's `state` prop is a string (inheritance reference).
- **Returns:** Boolean

#### `isState(state)`
- **Purpose:** Validates that object has state methods (is a proper state).
- **Returns:** Boolean

#### `createNestedObjectByKeyPath(path, value)`
- **Purpose:** Creates `{ a: { b: value } }` from `'a.b'` path.
- **Returns:** Nested object

---

## Package: `utils`

### `types.js`

| Function | Input | Output |
|----------|-------|--------|
| `isObject(v)` | any | Boolean — `typeof v === 'object' && !isArray && !isNull` |
| `isString(v)` | any | Boolean |
| `isNumber(v)` | any | Boolean |
| `isFunction(v)` | any | Boolean |
| `isBoolean(v)` | any | Boolean |
| `isNull(v)` | any | Boolean |
| `isArray(v)` | any | Boolean |
| `isDate(v)` | any | Boolean |
| `isObjectLike(v)` | any | Boolean — object or array |
| `isDefined(v)` | any | Boolean — not undefined |
| `isUndefined(v)` | any | Boolean |
| `is(type)` | string | Returns type checker function |
| `isNot(type)` | string | Returns negated type checker |

---

### `object.js`

#### `exec(val, element, state)`
- **Purpose:** If val is a function, calls it with `(element, state)`. Otherwise returns val as-is.
- **Returns:** Resolved value
- **Usage:** Used throughout to handle dynamic prop functions.

#### `map(obj, fn)`
- **Purpose:** Maps over object values like `Array.map`.
- **Returns:** New object with mapped values

#### `merge(a, b)` / `deepMerge(a, b, exclude)`
- **Purpose:** Merges objects. `deepMerge` handles nested objects recursively.
- **Returns:** Merged object

#### `clone(obj, exclude)`
- **Purpose:** Shallow clone with optional key exclusions.
- **Returns:** Cloned object

#### `deepClone(obj)`
- **Purpose:** Full deep clone.
- **Returns:** Deep cloned object

#### `deepStringifyFunctions(obj)` / `deepDestringifyFunctions(obj)`
- **Purpose:** Serializes/deserializes functions to/from strings (for storage/transfer).
- **Returns:** Object with stringified/parsed functions

#### `diffObjects(a, b)` / `deepDiff(a, b)` / `diff(a, b)`
- **Purpose:** Computes diff between two objects.
- **Returns:** Diff object (keys that changed)

#### `hasFunction(obj)`
- **Purpose:** Returns true if object has any function values.
- **Returns:** Boolean

#### `isEmpty(v)` / `isEmptyObject(obj)`
- **Purpose:** Checks if value or object is empty.
- **Returns:** Boolean

#### `removeFromObject(obj, keys)`
- **Purpose:** Returns object without specified keys.
- **Returns:** New object

#### `setInObjectByPath(obj, path, value)`
- **Purpose:** Sets nested value by dot-path string.
- **Returns:** Object

#### `getInObjectByPath(obj, path)`
- **Purpose:** Gets nested value by dot-path string.
- **Returns:** Value

#### `detectInfiniteLoop(obj)` / `isCyclic(obj)`
- **Purpose:** Detects circular references.
- **Returns:** Boolean

#### `excludeKeysFromObject(obj, keys)`
- **Purpose:** Returns object without excluded keys.
- **Returns:** Filtered object

---

### `array.js`

| Function | Purpose | Returns |
|----------|---------|---------|
| `arrayContainsOtherArray(a, b)` | Checks if array a contains all items of b | Boolean |
| `getFrequencyInArray(arr, val)` | Count occurrences of val | Number |
| `removeFromArray(arr, item)` | Remove single item | Array |
| `swapItemsInArray(arr, i, j)` | Swap two positions | Array |
| `joinArrays(...arrs)` | Concatenate arrays | Array |
| `mergeArray(arr, exclude)` | Merge array of objects | Object |
| `mergeAndCloneIfArray(obj)` | Clone if array else return | Object/Array |
| `cutArrayBeforeValue(arr, val)` | Slice before value | Array |
| `cutArrayAfterValue(arr, val)` | Slice after value | Array |
| `removeValueFromArray(arr, val)` | Remove first occurrence | Array |
| `removeValueFromArrayAll(arr, val)` | Remove all occurrences | Array |
| `addItemAfterEveryElement(arr, item)` | Intersperse item | Array |
| `reorderArrayByValues(arr, order)` | Sort arr by order values | Array |
| `arraysEqual(a, b)` | Deep equality check | Boolean |
| `filterArrays(a, b)` | Keep items in both | Array |
| `filterArraysFast(a, b)` | Fast intersection | Array |
| `checkIfStringIsInArray(str, arr)` | Check string membership | Boolean |

---

### `string.js`

#### `stringIncludesAny(str, arr)`
- **Purpose:** Returns true if string contains any value from arr.
- **Returns:** Boolean

#### `trimStringFromSymbols(str, symbols)`
- **Purpose:** Strips specified characters from string ends.
- **Returns:** String

#### `replaceLiteralsWithObjectFields(str, obj)`
- **Purpose:** Replaces `{{ key }}` placeholders with object values.
- **Returns:** String
- **Usage:** Powers the template binding system `{ text: '{{ name }}' }`

#### `lowercaseFirstLetter(str)`
- **Purpose:** Lowercases first character.
- **Returns:** String

#### `findKeyPosition(str, key)`
- **Purpose:** Finds position of key in string.
- **Returns:** Number

#### `replaceOctalEscapeSequences(str)` / `encodeNewlines(str)` / `decodeNewlines(str)`
- **Purpose:** Handles newline encoding for safe string serialization.
- **Returns:** String

#### `customEncodeURIComponent(str)` / `customDecodeURIComponent(str)`
- **Purpose:** Extended URI encoding handling extra characters.
- **Returns:** String

---

### `function.js`

#### `debounce(func, wait, immediate)`
- **Purpose:** Standard debounce — delays execution until after wait ms of inactivity.
- **Returns:** Debounced function

#### `debounceOnContext(element, func, timeout)`
- **Purpose:** Debounce bound to element context (uses `element.__debounce`).
- **Returns:** void

#### `memoize(fn)`
- **Purpose:** Caches function results by arguments.
- **Returns:** Memoized function

#### `isStringFunction(inputString)`
- **Purpose:** Detects if a string looks like a serialized function.
- **Returns:** Boolean

#### `cloneFunction(fn, win)`
- **Purpose:** Clones function and copies properties.
- **Returns:** Cloned function

#### `getContextFunction(fnKey)`
- **Purpose:** Retrieves function by key from context.
- **Returns:** Function or undefined

---

### `component.js`

#### `checkIfKeyIsComponent(key)`
- **Purpose:** Returns true if key is PascalCase (component).
- **Returns:** Boolean
- **Usage:** Core to DOMQL's PascalCase = component rule.

#### `checkIfKeyIsProperty(key)`
- **Purpose:** Returns true if key is camelCase/lowercase (property).
- **Returns:** Boolean

#### `addAdditionalExtend(newExtend, element)`
- **Purpose:** Pushes additional extend into element's extends stack.
- **Returns:** void

#### `checkIfSugar(element, parent, key)`
- **Purpose:** Detects shorthand "sugar" syntax that needs normalization.
- **Returns:** Boolean

#### `extractComponentKeyFromKey(key)`
- **Purpose:** Strips suffix from keys like `Button_add` → `Button`.
- **Returns:** String

#### `extendizeByKey(element, parent, key)`
- **Purpose:** Auto-extends element by its PascalCase key name.
- **Returns:** Element

#### `getCapitalCaseKeys(element)`
- **Purpose:** Returns only PascalCase keys (child components).
- **Returns:** String array

#### `addChildrenIfNotInOriginal(element, parent)`
- **Purpose:** Copies children from extends if not defined.
- **Returns:** void

#### `applyKeyComponentAsExtend(element, parent, key, options)`
- **Purpose:** Automatically applies key as `extends` when key is PascalCase.
- **Returns:** Element

#### `applyComponentFromContext(element, parent, key, options)`
- **Purpose:** Resolves component from context/REGISTRY by key name.
- **Returns:** Component object

#### `isVariant(key)`
- **Purpose:** Returns true if key starts with `.` (conditional variant).
- **Returns:** Boolean

#### `hasVariantProp(element)`
- **Purpose:** Checks if element has any variant props.
- **Returns:** Boolean

#### `getChildrenComponentsByKey(element)`
- **Purpose:** Returns only PascalCase child components from element.
- **Returns:** Object

#### `getExtendsInElement(element)`
- **Purpose:** Extracts and normalizes the extends value.
- **Returns:** Array or string

#### `setContentKey(element, parent)`
- **Purpose:** Sets content key for dynamic content rendering.
- **Returns:** void

---

### `cookie.js`

| Function | Purpose | Returns |
|----------|---------|---------|
| `isMobile()` | Detects mobile user agent | Boolean |
| `setCookie(name, value, days)` | Sets browser cookie | void |
| `getCookie(name)` | Gets cookie value | String or null |
| `removeCookie(name)` | Removes cookie | void |
| `getLocalStorage(key)` | Gets parsed localStorage value | Any |
| `setLocalStorage(key, value)` | Sets serialized localStorage value | void |

---

### `env.js`

| Export | Purpose |
|--------|---------|
| `NODE_ENV` | Current environment string |
| `isProduction` | Boolean — production check |
| `isTest` / `isTesting` | Boolean — test env check |
| `isStaging` | Boolean — staging check |
| `isLocal` / `isDevelopment` | Boolean — local dev check |
| `isNotProduction` | Boolean — not production |
| `getNev(key)` | Gets env variable |

---

### `node.js`

| Function | Purpose | Returns |
|----------|---------|---------|
| `isNode(v)` | Checks if value is a Node.js `process` object | Boolean |
| `isHtmlElement(v)` | Checks if value is HTMLElement | Boolean |
| `isDOMNode(v)` | Checks if value is any DOM node | Boolean |

---

### `tags.js`

#### `HTML_TAGS`
- **Purpose:** Array of all valid HTML tag strings.

#### `isValidHtmlTag(arg)`
- **Purpose:** Returns true if arg is in HTML_TAGS list.
- **Returns:** Boolean

---

### `key.js`

#### `generateKey()`
- **Purpose:** Returns incrementing integer ID as string.
- **Returns:** String

#### `createSnapshotId`
- **Purpose:** Alias for `generateKey`.
- **Returns:** String

---

### `log.js`

#### `logIf(bool, ...arg)`
- **Purpose:** `console.log` only if `bool` is true.
- **Returns:** void

#### `logGroupIf(bool, key, ...arg)`
- **Purpose:** `console.group` only if `bool` is true.
- **Returns:** void

---

### `globals.js`

Exports safe cross-platform references to `global`, `self`, `window`, `document` (handles Node.js vs browser).

---

## v2 → v3 Migration Checklist

### Critical keyword renames

| v2 (REMOVE) | v3 (USE) | Location in codebase |
|------------|----------|----------------------|
| `extend` | `extends` | `extend.js` — `applyExtend()` |
| `childExtend` | `childExtends` | `extend.js` — `applyExtend()` |
| `on: { click: fn }` | `onClick: fn` | `event/on.js` — `applyEventsOnNode()` |
| `on: { render: fn }` | `onRender: fn` | `event/on.js` — `triggerEventOn()` |
| `on: { init: fn }` | `onInit: fn` | `event/on.js` — `triggerEventOn()` |
| `on: { update: fn }` | `onUpdate: fn` | `event/on.js` — `triggerEventOnUpdate()` |
| `props: { ... }` | Flat props | `props/create.js` — `createProps()` |

### Files with v2 legacy code (audit required)

| File | Risk | Notes |
|------|------|-------|
| `event/legacy.js` | HIGH | All v2 event names — should not be referenced in v3 |
| `element/methods/v2.js` | HIGH | v2 method implementations — verify not called from v3 paths |
| `element/extend.js` | HIGH | Core — verify only reads `extends`/`childExtends` |
| `event/on.js` | HIGH | Verify `applyEventsOnNode` reads only `onX` props |
| `element/iterate.js` | MEDIUM | Verify `throughInitialExec` skips `on:` keys |
| `element/props/ignore.js` | MEDIUM | Verify `IGNORE_PROPS_PARAMS` excludes v2 `on`, `props`, `extend` |

### State API (stable across v2/v3)

These state methods are consistent — no migration needed:
- `s.update()`, `s.apply()`, `s.replace()`, `s.quietUpdate()`, `s.quietReplace()`, `s.toggle()`, `s.root`, `s.parent`

### Functions that are safe (no v2 patterns)

All `utils/` package functions are v2/v3 agnostic — pure utilities with no syntax preferences.

---

## Quick Reference: Where Things Live

| Need to... | Go to |
|-----------|-------|
| Register a component globally | `element/define.js` |
| Resolve extends chain | `element/extend.js` → `element/utils/extendUtils.js` |
| Create DOM node | `render/cache.js` → `createHTMLNode` |
| Attach DOM events | `event/on.js` → `applyEventsOnNode` |
| Trigger lifecycle events | `event/on.js` → `triggerEventOn` |
| Update element | `element/update.js` → `update` |
| Set content dynamically | `element/mixins/content.js` → `setContent` |
| Handle template `{{ }}` | `utils/string.js` → `replaceLiteralsWithObjectFields` |
| Execute dynamic props | `utils/object.js` → `exec` |
| Check if key is component | `utils/component.js` → `checkIfKeyIsComponent` |
| Auto-extend by key | `utils/component.js` → `applyKeyComponentAsExtend` |
| State update with re-render | `state/updateState.js` → `updateState` |
| Quiet state update | `state/methods.js` → `quietUpdate` |
| Find ancestor element | `element/methods/index.js` → `lookup` |
| Find descendant element | `element/methods/index.js` → `lookdown` |
