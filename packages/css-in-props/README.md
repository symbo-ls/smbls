# css-in-props

CSS properties as component props for DOMQL elements. Transforms design-system-aware props into CSS classes via Emotion.

## What it does

- Transforms component props (`theme`, `color`, `background`, `border`, `shadow`, etc.) into resolved CSS
- Resolves design system tokens (colors, spacing, typography, themes) from `@symbo.ls/scratch`
- Handles media queries (`@dark`, `@mobileS`, etc.) and pseudo selectors (`:hover`, `:focus`) as prop prefixes
- Generates Emotion CSS classes for optimized rendering

## Theme prop

The `theme` prop resolves theme definitions into CSS variables. Theme switching is handled entirely by CSS — no DOMQL re-renders needed.

```javascript
const Card = {
  theme: 'primary',           // uses --theme-primary-* CSS vars
  // themeModifier: 'dark',   // optional: force a specific scheme on this component
}
```

When `globalTheme` is `'auto'` (default), CSS variables switch automatically via `prefers-color-scheme` media queries and `[data-theme]` selectors.

## Props reference

| Category | Props |
|----------|-------|
| Theme | `theme`, `color`, `background`, `backgroundColor`, `borderColor` |
| Border | `border`, `borderLeft`, `borderTop`, `borderRight`, `borderBottom`, `outline` |
| Shadow | `shadow`, `boxShadow`, `textShadow` |
| Text | `textStroke` |
| Image | `backgroundImage` |
| Layout | `outlineOffset` |

## Media and selector props

Props can be prefixed with media queries or selectors:

```javascript
const Button = {
  background: 'blue',
  ':hover': { background: 'darkblue' },
  '@mobileS': { padding: 'A' },
  '.active': { background: 'green' }
}
```

### `transformersByPrefix`

The prefix-to-handler registry that powers media queries, selectors, conditionals, and variables. Each key is a single-character prefix that triggers a specific transformer when found at the start of a prop key:

| Prefix | Handler | Example |
|--------|---------|---------|
| `@` | Media query | `@mobileS`, `@dark`, `@print` |
| `:` | Pseudo selector | `:hover`, `:focus`, `:first-child` |
| `[` | Attribute selector | `[disabled]`, `[data-active]` |
| `>` | Child combinator | `> .child` |
| `&` | Self selector | `&.active` |
| `$` | Case conditional | `$isActive` |
| `.` | Truthy conditional | `.visible` |
| `!` | Falsy conditional | `!hidden` |
| `-` | CSS variable | `--my-var` |
| `*`, `+`, `~` | CSS combinators | `* div`, `+ .sibling`, `~ .general` |

```javascript
import { transformersByPrefix } from 'css-in-props'
```

## Interaction with the define system

The `$` prefix is used both by css-in-props (`$isActive` case conditional) and by the define system (e.g. `$router`, and deprecated v2 handlers like `$propsCollection`, `$collection`). The propertization layer in `@domql/utils/props.js` uses `CSS_SELECTOR_PREFIXES` to decide which keys to move into `props`.

**The `$` prefix requires special handling:**

Keys starting with `$` that have a matching define handler (either `element.define[key]` or `context.define[key]`) must **stay at the element root** so that `throughInitialDefine` can process them. Only `$`-prefixed keys without define handlers should be moved into `props` for css-in-props processing. This matters for the built-in `$router` handler and for backwards compatibility with older v2 projects using deprecated collection handlers.

```javascript
// In props.js — check define handlers BEFORE checking CSS_SELECTOR_PREFIXES
const defineValue = this.define?.[key]
const globalDefineValue = this.context?.define?.[key]
if (isFunction(defineValue) || isFunction(globalDefineValue)) continue

// Only then check the prefix
if (CSS_SELECTOR_PREFIXES.has(firstChar)) {
  obj.props[key] = value  // move to props for css-in-props
}
```

> **Lesson learned:** Without the define-awareness check, keys like `$propsCollection` were moved into `props` and became invisible to the define system, breaking collection-based rendering in projects like Rosi and BigBrother.
