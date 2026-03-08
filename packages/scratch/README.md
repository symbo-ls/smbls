# Scratch framework

Scratch is CSS framework and methodology to build web, mobile and TV applications with one code base. 

[![npm version](https://badge.fury.io/js/%40rackai%2Fscratch.svg)](https://badge.fury.io/js/%40rackai%2Fscratch)

Recevies a configuration and outputs the system of design related properties. It also applies reset by default and receives a few options:

| option | default | description |
| --- | --- | --- |
| `verbose` | `false` | Output the warning logs in console (only in `dev`, `test` enviroment) |
| `useReset` | `true` | Apply CSS reset to the document |
| `useVariable` | `true` | Output CSS variables in properties |
| `globalTheme` | `'auto'` | Theme mode: `'auto'` (system preference), `'dark'`, `'light'`, or any custom theme name |
| `useThemeSuffixedVars` | `false` | Also generate suffixed vars like `--theme-document-dark-background` |

A design system configuration of the following systems:

```javascript
import { set } from '@symbo.ls/scratch'

set({
  color: {},
  theme: {},
  typography: {},
  space: {},
  media: {},
  icons:{},
  font: {},
  font_family: {},
  timing: {},
  reset: {}
}, {
  // options
})
```

## Theme System

Themes with `@dark`/`@light` (or custom `@ocean`, `@sunset`, etc.) variants automatically generate non-suffixed CSS variables that switch via CSS — no JavaScript re-renders needed.

```javascript
set({
  theme: {
    document: {
      '@dark': { color: 'white', background: 'black' },
      '@light': { color: 'black', background: 'white' },
      '@ocean': { color: 'white', background: '#0a2e4e' }
    }
  }
})
```

Generated CSS:

```css
/* System theme auto-switching (when no data-theme attribute is set) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) { --theme-document-background: #000; --theme-document-color: #fff; }
}
@media (prefers-color-scheme: light) {
  :root:not([data-theme]) { --theme-document-background: #fff; --theme-document-color: #000; }
}

/* Explicit theme forcing via data-theme attribute */
[data-theme="dark"]  { --theme-document-background: #000; --theme-document-color: #fff; }
[data-theme="light"] { --theme-document-background: #fff; --theme-document-color: #000; }
[data-theme="ocean"] { --theme-document-background: #0a2e4e; --theme-document-color: #fff; }
```

### Theme switching

- **Auto** (default): system `prefers-color-scheme` drives dark/light switching
- **Force a theme**: set `data-theme` attribute on the root element — instant CSS switch, zero re-renders
- **Custom themes**: add any `@name` variant to your theme config, activate with `data-theme="name"`
- **Per-component override**: use `themeModifier` prop to force a specific scheme on individual components

### `globalTheme` option

| Value | Behavior |
| --- | --- |
| `'auto'` (default) | `@dark`/`@light` use `prefers-color-scheme` media queries. Custom themes use `[data-theme]` selectors. |
| `'dark'` / `'light'` / `'custom'` | Non-suffixed vars are set directly in `:root` with the forced theme's values. |

### `useThemeSuffixedVars` option

When `true`, also generates suffixed variables like `--theme-document-dark-background` alongside the non-suffixed `--theme-document-background`. Disabled by default to reduce CSS variable count.

Read more at [docs](https://www.symbols.app/developersdesign-system)

### TODO:
- [ ] Accessibility (WCAG) automated  tests
- [x] Scratch on `node`
