# Scratch LLM instructions

These notes explain how to use the Scratch package APIs in this repo. Use them when generating or modifying code so the design system configuration and runtime helpers are used correctly.

## What Scratch is

Scratch consumes a design system config and produces:

- a normalized config in memory
- CSS variables in `CONFIG.CSS_VARS`
- helpers for colors, themes, spacing, typography, timing, shadows, and SVG sprites
- a document theme and reset styles applied automatically

All public exports are re-exported from the package entry.

## Core exports

From [src/index.js](src/index.js):

- `set(recivedConfig, options)`
- `setEach(factoryName, props)`
- `setValue(FACTORY_NAME, value, key)`
- `activateConfig(def)`
- `getActiveConfig(def)`
- `setActiveConfig(newConfig)`
- `CONFIG`, `FACTORY`, `CSS_VARS`
- `scratchUtils`, `scratchSystem`
- all utils, system helpers, transforms

### Configuration lifecycle

Use `set()` for normal usage. It merges your config into the cached default config and rebuilds derived data.

```js
import { set } from '@symbo.ls/scratch'

set({
  color: {
    primary: '#1f6feb',
    text: ['#0b0b0b', '#f5f5f5']
  },
  theme: {
    document: {
      color: 'text',
      background: 'primary 0.02'
    },
    button: {
      color: 'text',
      background: 'primary',
      ':hover': { background: 'primary 0.85' }
    }
  },
  typography: {
    base: 16,
    ratio: 1.25
  },
  spacing: {
    base: 16,
    ratio: 1.618
  },
  timing: {
    base: 150,
    ratio: 1.4
  },
  icons: {
    search: '<svg>...</svg>'
  },
  svg: {
    logo: '<svg>...</svg>'
  }
})
```

If you need a clean config, use the `options.newConfig` flag:

```js
set({ color: { primary: '#000' } }, { newConfig: {} })
```

### Options supported by `set()`

`set()` accepts these top-level options in the config object (not nested in `options`):

- `verbose`: toggles console warnings
- `useVariable`: output CSS variables for values
- `useReset`: apply CSS reset
- `useSvgSprite`: convert SVGs into a sprite
- `useFontImport`: allow `@font-face` output
- `useIconSprite`: use sprite for icons
- `useDocumentTheme`: apply `THEME.document` to the document
- `globalTheme`: preferred theme name (example: `dark`)
- `useDefaultConfig`: keeps default config as base
- `SEMANTIC_ICONS`: map for icons that should skip sprite conversion

The `options` argument supports:

- `newConfig`: if provided, it becomes the new base for the active config.

### Config keys and value transformers

`set()` accepts keys case-insensitively; the package maps them by `toUpperCase()` for config lookup and by `toLowerCase()` for value transform selection.

Supported config keys and their transformers are defined in [src/set.js](src/set.js):

- `color` -> `setColor`
- `gradient` -> `setGradient`
- `font` -> `setFont`
- `font_family` -> `setFontFamily`
- `theme` -> `setTheme`
- `icons` -> `setSvgIcon`
- `semantic_icons` -> passthrough
- `svg` -> `setSVG`
- `svg_data` -> passthrough
- `typography` -> passthrough + `applyTypographySequence()`
- `spacing` -> passthrough + `applySpacingSequence()`
- `timing` -> passthrough + `applyTimingSequence()`
- `shadow` -> `setShadow`
- `cases` -> resolves functions
- `media`, `grid`, `class`, `reset`, `unit`, `animation` -> passthrough

After applying config, `set()` always calls:

- `applyDocument()`
- `applyReset()`

## System helpers (design system math)

### Colors and gradients

From [src/system/color.js](src/system/color.js):

- `setColor(value, key)` accepts strings, arrays `[light, dark]`, or objects with `@light`/`@dark` keys. It writes CSS vars to `CONFIG.CSS_VARS` if `useVariable` is true.
- `setGradient(value, key)` is the same idea for gradients.
- `getColor("name alpha tone")` resolves configured colors. Examples:
  - `"primary"` -> `var(--color-primary)` or a rgb value
  - `"primary 0.5"` -> rgba with alpha
  - `"primary +5"` -> lightness shift
- `getMediaColor(value, globalTheme)` resolves light/dark or media-aware variants.

### Themes

From [src/system/theme.js](src/system/theme.js):

- `setTheme(themeObj, key)` and `setMediaTheme(themeObj, key)` normalize theme values and create CSS vars if `useVariable` is true.
- `getTheme(value, modifier)` resolves theme values when `useVariable` is false.
- `getMediaTheme(value, modifier)` resolves theme values when `useVariable` is true.

Theme objects may include:

- `@dark`/`@light` media variants
- `:hover`/`:active` state variants (prefixed as `:`)
- helper themes under `.` (for reuse)

### Spacing

From [src/system/spacing.js](src/system/spacing.js):

- `applySpacingSequence()` generates the spacing sequence and CSS vars.
- `getSpacingByKey(value, propertyName)` resolves values like `A`, `B2`, `-C` and math like `A+Z`.
- `getSpacingBasedOnRatio(props, propertyName)` uses a custom ratio if `props.spacingRatio` exists.
- `splitSpacedValue()` expands spacing values to include `_default` for CSS variables.

### Typography

From [src/system/typography.js](src/system/typography.js):

- `applyTypographySequence()` generates the typography scale and heading styles.
- `getFontSizeByKey(value)` returns the resolved `fontSize` value.

### Timing

From [src/system/timing.js](src/system/timing.js):

- `applyTimingSequence()` generates timing values.
- `getTimingByKey(value)` resolves sequence values.
- `getTimingFunction(value)` resolves named timing functions.

### Shadows

From [src/system/shadow.js](src/system/shadow.js):

- `setShadow(value, key)` supports arrays or objects for media variants; writes to CSS vars.
- `getShadow(value, globalTheme)` resolves a configured shadow.

### Fonts

From [src/system/font.js](src/system/font.js):

- `setFont(val, key)` builds font metadata. Handles three formats:
  - **Array of weights**: `[{ url, fontWeight }, ...]` → generates multiple `@font-face` rules
  - **Single object**: `{ url }` → generates one `@font-face` rule
  - **Variable font**: `{ url, isVariable: true, fontWeight: '100 900' }` → generates `@import url(...)` for Google Fonts CSS URLs, or `@font-face` with weight range for self-hosted `.woff2` files
- `setFontFamily(val, key)` normalizes font family tokens.
- `getFontFamily(key)` gets the default or named family.

Variable font config options: `url`, `isVariable`, `fontWeight` (range string like `'100 900'`), `fontStretch` (e.g. `'75% 125%'`), `fontDisplay` (defaults to `'swap'` for self-hosted).

### Document + reset

- `applyDocument()` merges theme and typography into `CONFIG.DOCUMENT`.
- `applyReset()` merges defaults into `CONFIG.RESET` and builds normalized HTML/body rules. It uses the document theme if `useDocumentTheme` is true.

### SVG and icons

From [src/system/svg.js](src/system/svg.js):

- `setSVG(val, key)` optionally converts SVG to a symbol when `useSvgSprite` is true.
- `setSvgIcon(val, key)` uses sprites unless a key is in `SEMANTIC_ICONS`.
- `appendSVGSprite()` and `appendSvgIconsSprite()` append the sprite to the document.

From [src/utils/sprite.js](src/utils/sprite.js):

- `convertSvgToSymbol(key, code)` converts a full SVG to a `symbol`.
- `generateSprite(icons)` concatenates symbols into a sprite string.

## Transform utilities (property parsing)

From [src/transforms/index.js](src/transforms/index.js):

- `transformBorder(value)` converts border tokens into CSS.
- `transformTextStroke(value)` resolves color and px values.
- `transformShadow(value, globalTheme)` and `transformBoxShadow()` map tokens to CSS shadows.
- `transformBackgroundImage(value, globalTheme)` resolves named gradients and URLs.
- `transfromGap(value)` resolves spacing tokens to gap values.
- `transformTransition(value)` and `splitTransition(value)` resolve timing tokens.
- `transformDuration(value)` resolves timing tokens for durations.
- `transformSize(propertyName, value, props, opts)` resolves spacing tokens with optional ratios.
- `transformSizeRatio(propertyName, props)` uses ratio-based spacing.

Use these helpers when converting design-system tokens into CSS values.

## Utilities you can call directly

From [src/utils](src/utils):

- `getSequenceValue()` and `getSequenceValuePropertyPair()` to resolve tokens to CSS values.
- `generateSequence()` and `generateSequencePosition()` to build scaling sequences.
- `getSubratio()` to compute subsequence ratios.
- `colorStringToRgbaArray()`, `mixTwoColors()`, `opacify()` for color math.
- `getFontFaceString()` for `@font-face` blocks.

## Practical guidance for LLM usage

When modifying code that uses Scratch:

1. Prefer calling `set()` once at startup, not on every render.
2. Pass config keys in lower-case (common) or upper-case (supported). Do not mix camelCase (use `font_family`, not `fontFamily`).
3. Use design tokens like `A`, `B2`, `C+Z` for spacing and typography. Use `transformSize()` or `getSpacingByKey()` if you need to resolve tokens into CSS strings.
4. When introducing new colors/themes, update config with `set()` instead of mutating `CONFIG` directly.
5. Use `getMediaTheme()` when `useVariable` is true; use `getTheme()` when it is false.
6. When emitting CSS variables, read `CONFIG.CSS_VARS` and handle `@media ...` keys for media-scoped variables.
7. For SVG icons, use `setSvgIcon()` and append sprites via `appendSvgIconsSprite()` in browser environments.

## Common pitfalls

- Do not pass `props` wrappers or nested config blocks to `set()`; it expects flat top-level config keys.
- Tokens like `B2` only resolve correctly when sequences are generated. Ensure `applyTypographySequence()` or `applySpacingSequence()` ran (this happens in `set()` when you include `typography` or `spacing`).
- `useVariable` changes how colors/themes are returned. Ensure downstream consumers expect `var(--...)` when enabled.
