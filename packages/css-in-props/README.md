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
