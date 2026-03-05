# Symbols.app Connect

VSCode extension for [Symbols.app](https://symbols.app) and [DOMQL](https://domql.com) — smart completions, hover docs, go-to-definition, and design system token awareness.

## Features

### Completions

**Element keys** — all DOMQL properties with snippets:
- `extends`, `tag`, `text`, `attr`, `state`, `if`, `define`, `style`, `props`, `childProps`, `childrenAs`, `children`, `childExtends`, `content`, `data`, `scope`, `key`, `query`

**Events** — lifecycle and DOM:
- Lifecycle: `onRender`, `onInit`, `onUpdate`, `onStateUpdate`, `onCreate`, `onDestroy`
- DOM: `onClick`, `onChange`, `onKeydown`, `onSubmit`, `onFocus`, `onScroll`, etc.

**CSS-in-props** — all CSS properties promoted to element root:
- `color`, `padding`, `fontSize`, `display`, `flow`, `align`, `round`, `boxSize`, `widthRange`, etc.

**Pseudo-selectors and media queries:**
- `:hover`, `:active`, `:focus`, `:focus-visible`, `:before`, `:after`, `:first-child`, `:last-child`
- `@dark`, `@light`, `@mobile`, `@tablet`, `@desktop`

**Components** — built-in atoms and your workspace components:
- Built-in: `Box`, `Flex`, `Grid`, `Text`, `Button`, `Icon`, `Field`, `Modal`, `Dropdown`, etc.
- Auto-detected PascalCase exports from your project files

### Smart Value Completions

Values adapt based on the property type:

| Property | Suggested values |
|----------|-----------------|
| `extends`, `childExtends` | All built-in + project components |
| `color`, `background`, `fill` | Color tokens with hex previews (`blue → #213eb0`) |
| `theme` | Theme tokens with modifiers (`primary .child`) |
| `padding`, `margin`, `gap`, `width` | Spacing tokens with px values (`B → ~25.9px`) |
| `fontSize`, `lineHeight` | Typography tokens with px values (`B → ~20px`) |
| `transition`, `transitionDuration` | Timing tokens with ms values (`A → ~150ms`) |
| `icon`, `name` | Icon names (`chevronRight`, `search`, `plus`) |
| `tag` | HTML tags (`div`, `button`, `a`, `section`) |
| `display`, `position`, `flow`, `cursor` | CSS enum values |
| `attr.type`, `attr.role`, `attr.target` | Attribute-specific values |

**Design system scales** use different configs per type:

| Type | Base | Ratio | Example |
|------|------|-------|---------|
| Spacing | 16px | 1.618 (golden ratio) | `A` = 16px, `B` ≈ 25.9px |
| Typography | 16px | 1.25 (major third) | `A` = 16px, `B` ≈ 20px |
| Timing | 150ms | 1.333 (perfect fourth) | `A` ≈ 150ms, `B` ≈ 200ms |

**Color tokens** show real hex values:
- `blue → #213eb0`, `green → #389d34`, `red → #e15c55`, `yellow → #EDCB38`, `orange → #e97c16`, `gray → #4e4e50`
- Modifiers: `blue.5` (opacity), `gray+16` (lighten), `gray-26` (darken), `gray=50` (set lightness)

**In-string completions** — works inside quotes:
```js
extends: '|'  // suggests components
color: '|'    // suggests color tokens
theme: '|'    // suggests theme tokens
```

### Go to Definition

`Cmd+Click` (or `F12`) on component names to jump to their source file:
- Object keys: `CategoryTabs: { ... }` → navigates to `components/CategoryTabs.js`
- String refs: `extends: 'Button'` → navigates to the component file
- Searches `symbols.json` → `dir` → `components/` directory, then workspace-wide

### Method Completions

- `el.` → `lookup`, `update`, `set`, `call`, `setProps`, `remove`, `append`, etc.
- `state.` → `update`, `toggle`, `set`, `reset`, `apply`, `setByPath`, etc.
- `el.call("` → context function suggestions

### Hover Documentation

Hover any DOMQL key, event, component, CSS property, or design token value for inline docs with examples.

## Settings

| Setting | Default | Description |
|---------|---------|-------------|
| `symbolsApp.enable` | `true` | Enable/disable the extension |
| `symbolsApp.detectByImports` | `true` | Only activate in files with DOMQL/smbls imports or patterns |
| `symbolsApp.completeCssProps` | `true` | Suggest CSS properties as element keys |

## Commands

- **Symbols.app: Toggle Connect** — enable/disable
- **Symbols.app: Diagnose Connect** — output debug info

## Development

```bash
npm run compile    # build once
npm run watch      # auto-rebuild on save
npm run package    # create .vsix file
```

Install the `.vsix` locally:
```bash
code --install-extension symbols-app-connect-3.2.4.vsix
```

Or reload after rebuilding: `Cmd+Shift+P` → "Developer: Reload Window"
