# @domql/utils

Core utility functions for the DOMQL element system.

## Propertization (`props.js`)

The propertization system normalizes element definitions by sorting keys between the element root (child elements, framework keys) and `props` (CSS properties, design tokens, custom data).

### Two-phase process

1. **`pickupPropsFromElement`** — Scans element root keys and moves non-element, non-builtin keys into `props`
2. **`pickupElementFromProps`** — Scans `props` keys and moves element-like or builtin keys back to the element root

### Key classification rules

| Pattern | Classification | Example |
|---------|---------------|---------|
| Starts with uppercase | Child element | `Header`, `Button`, `Nav` |
| Numeric key | Child element | `0`, `1`, `2` |
| In `DOMQ_PROPERTIES` | Framework builtin | `tag`, `extends`, `on` |
| In `CSS_SELECTOR_PREFIXES` | CSS-in-props | `:hover`, `@mobileS`, `$isActive` |
| Has define handler | Define key (stays at root) | `$router`, deprecated: `$propsCollection` |
| `childProps` | Always in props | `childProps` |
| `onXxx` + function | Event handler | `onClick`, `onSubmit` |
| Everything else | Prop | `padding`, `theme`, `color` |

### CSS_SELECTOR_PREFIXES

```javascript
const CSS_SELECTOR_PREFIXES = new Set([
  ':', '@', '[', '*', '+', '~', '&', '>', '$', '-', '.', '!'
])
```

These single-character prefixes identify keys that should be processed by `css-in-props` via `transformersByPrefix`. When a key starts with one of these characters, it gets moved into `props`.

### Define-awareness

The `$` prefix is shared between css-in-props conditionals (`$isActive`) and define handlers (built-in `$router`, plus deprecated v2 handlers like `$propsCollection`, `$collection` that some older projects still use). The propertization must check for define handlers **before** applying prefix rules:

```javascript
// Check define handlers first — these stay at root
const defineValue = this.define?.[key]
const globalDefineValue = this.context?.define?.[key]
if (isFunction(defineValue) || isFunction(globalDefineValue)) continue

// Only then apply prefix-based classification
if (CSS_SELECTOR_PREFIXES.has(firstChar)) {
  obj.props[key] = value
}
```

Without this check, define keys like `$router` (or deprecated `$propsCollection` in older projects) get moved into `props` and become invisible to `throughInitialDefine`, breaking routing and collection-based rendering.

### childProps handling

`childProps` is a framework property that configures child element props. It must always stay in `props` (consumed by `inheritParentProps`) even though its value may contain uppercase keys that look like child elements:

```javascript
// childProps: { Icon: { name: 'star' }, Hgroup: { ... } }
// The uppercase keys inside are NOT child elements
if (key === 'childProps') {
  obj.props[key] = value
  delete obj[key]
  continue
}
```

### ignoreChildProps

When set on `element.props`, prevents the element from inheriting `childProps` from its parent via `inheritParentProps`. Used by fragment elements to avoid double-application of childProps (since fragments explicitly forward childProps to their children).

## Key Sets (`keys.js`)

- **`DOMQ_PROPERTIES`** — Framework-level keys that stay at element root
- **`PROPS_METHODS`** — Keys on the props prototype (update, __element)
- **`STATE_METHODS`** — State management methods (update, parse, set, toggle, etc.)
