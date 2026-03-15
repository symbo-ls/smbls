# Uikit — DOMQL v3 Migration Learnings

## Picture Component — `element.parent.src` vs `element.parent.props.src`
In v3, lowercase props like `src` on a component that extends Picture move to `element.props` (not directly on the element root). The Img child's `src` function was:
```js
src: (element, state) => element.parent.src || state.src
```
This fails because `element.parent.src` is `undefined` — the value is at `element.parent.props.src`.

**Fix**: Updated to `element.parent.props?.src || element.parent.src || state.src`

## Img Component — `/files/` Path Resolution
The Img `attr.src` function resolves file paths through `context.files[src]`. However, components use paths like `/files/map-dark.svg` while the files registry keys are just filenames like `"map-dark.svg"`.

**Fix**: Strip `/files/` prefix when looking up in context.files:
```js
const fileSrc = src && src.startsWith('/files/') ? src.slice(7) : src
const file = context.files && (context.files[src] || context.files[fileSrc])
```

## `<picture>` Tag and `src` Attribute
The HTML `<picture>` tag does NOT support `src` as an attribute. When components set `src` on a Picture element, `applyPropsAsAttrs` correctly filters it out. But the Img child needs to read it from `element.parent.props.src`, not from the DOM attribute.

## `<map>` Tag Auto-Detection
Component keys like `Map` get auto-detected as `<map>` HTML tag (for HTML image maps), which defaults to `display: inline`. Projects using a `Map` component for geographic maps need to explicitly set `tag: 'div'`.
