# DOMQL Element
Takes object and creates DOMQL element.

[![npm version](https://badge.fury.io/js/%40domql%2Felement.svg)](https://badge.fury.io/js/%40domql%2Felement)

### Example:
```javascript
import DOM from 'domql'

const Poster = {
  extends: [Link, Img],
  boxSize: [100, 200],
  borderRadius: 12,
  padding: 16,
  background: '#fff'
}

DOM.create(Poster, document.body)
```

### html mixin

The `html` mixin sets raw HTML content on an element. It supports both direct assignment and props:

```javascript
// Direct assignment (el.html)
const MyComponent = {
  html: '<strong>Hello</strong>'
}

// Via props (el.props.html) — works as an alias
const MyComponent = {
  props: { html: '<strong>Hello</strong>' }
}
```

`el.html` takes priority when both are set. `props.html` is used as a fallback when `el.html` is not defined.

## REGISTRY (`mixins/registry.js`)

The `REGISTRY` object defines which keys are recognized as framework properties (rather than child elements). Any key **not** in REGISTRY and starting with an uppercase letter is treated as a child element.

**Every framework-level key must be listed here.** If a key like `childExtend` is missing from REGISTRY, it gets interpreted as a child element name, causing silent rendering failures (e.g., cart components not rendering in Archy).

Current framework keys that must remain in REGISTRY:

```
extends, children, content,
childExtend (deprecated), childExtends,
childExtendRecursive (deprecated), childExtendsRecursive,
props, if, define,
__name, __ref, __hash, __text, key, tag, query, parent, node,
variables, on, component, context
```

Plus mixin handlers: `attr`, `style`, `text`, `html`, `data`, `classlist`, `state`, `scope`, `deps`.

> **v3 note:** `childExtend` (singular) is deprecated v2 syntax — use `childExtends` (plural) in new code. The singular forms remain in REGISTRY for backwards compatibility with older projects. If a key is missing from REGISTRY, it gets interpreted as a child element name, causing silent rendering failures.

## set.js — Content Setting

### Fragment forwarding

When `set()` receives content with `tag: 'fragment'`, the fragment itself doesn't create a DOM node — its children are inserted directly. This means:

1. **childExtends forwarding** — The parent's `childExtends` must be forwarded to the fragment's params so that fragment children inherit the correct extends:
   ```javascript
   if (tag === 'fragment') {
     const elementChildExtends = element.childExtends || element.childExtend
     if (!childExtends && elementChildExtends) {
       params.childExtends = elementChildExtends
     }
   }
   ```
   (Also checks deprecated `childExtend` for backwards compatibility with v2 projects.)

2. **childProps forwarding** — Similarly, `childProps` from the parent must be explicitly passed through the fragment to its children.

3. **ignoreChildProps** — When forwarding `childProps` through a fragment, set `props.ignoreChildProps = true` on the fragment itself to prevent the fragment from inheriting the parent's `childProps` via `inheritParentProps`. The `childProps` are already forwarded explicitly for the fragment's children.

### Infinite loop guard

`set()` includes a re-entrancy guard via `ref.__settingContent`. Without this, define handlers (like `$router`) that call `el.set()` can trigger infinite recursion when content-setting triggers another content-set cycle.

```javascript
if (ref.__settingContent) return element
ref.__settingContent = true
try {
  return _setInner(params, options, element)
} finally {
  ref.__settingContent = false
}
```