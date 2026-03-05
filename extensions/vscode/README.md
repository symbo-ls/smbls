# Symbols.app Connect — VSCode Extension

IntelliSense for Symbols.app / DOMQL syntax.

## Features

### Key Completions
- DOMQL properties (`extends`, `tag`, `text`, `attr`, `state`, `if`, `define`, `style`, `on`, etc.)
- Lifecycle events (`onRender`, `onInit`, `onUpdate`, `onStateUpdate`, `onCreate`, etc.)
- DOM events (`onClick`, `onChange`, `onKeydown`, `onSubmit`, etc.)
- CSS-in-props (`color`, `padding`, `fontSize`, `display`, `flow`, `align`, `round`, etc.)
- Pseudo-selectors (`:hover`, `:active`, `:focus`, `:before`, `:after`)
- Media queries (`@dark`, `@light`, `@mobile`, `@tablet`, `@desktop`)
- Built-in components (`Box`, `Flex`, `Grid`, `Text`, `Button`, `Icon`, `Field`, `Modal`, etc.)
- Workspace components (auto-detected from your project files)

### Smart Value Completions
- **Colors**: `blue`, `gray`, `title`, `caption`, gradients — with modifier syntax (`.5`, `+16`, `-26`, `=50`)
- **Themes**: `primary`, `dialog`, `field`, `card` — with modifiers (`.child`, `.color-only`)
- **Spacing/Sizing**: design tokens `Z2`, `Z`, `A`, `B`, `C`, `D` scale
- **Typography**: font size tokens on the same letter scale
- **Icons**: `chevronRight`, `search`, `plus`, `arrowDown`, etc.
- **Extends**: all built-in + project components
- **Tags**: full HTML tag list
- **CSS enums**: `display`, `position`, `flexDirection`, `cursor`, `textAlign`, etc.
- **Attr values**: input `type`, `role`, `target`, `rel`, boolean attrs

### Method Completions
- `el.` → `lookup`, `update`, `set`, `call`, `setProps`, `remove`, `append`, etc.
- `state.` → `update`, `toggle`, `set`, `reset`, `apply`, `setByPath`, etc.
- `el.call("` → context function suggestions (`exec`, `router`, `fetchData`, etc.)

### Hover Documentation
- Hover any DOMQL key, event, component, or CSS property for docs
- Hover design tokens in values to see scale/modifier info

## Activation
Extension activates when `symbols.json` exists in the workspace root (or any parent directory).

## Settings
| Setting | Default | Description |
|---------|---------|-------------|
| `symbolsApp.enable` | `true` | Enable/disable the extension |
| `symbolsApp.detectByImports` | `true` | Only activate in files importing domql/smbls packages |
| `symbolsApp.completeCssProps` | `true` | Suggest CSS properties as element keys |

## Commands
- **Symbols.app: Toggle IntelliSense** — enable/disable via command palette

## Development
```bash
npm run compile    # one-time build
npm run watch      # auto-rebuild on save
```

After rebuilding, reload VSCode window: `Cmd+Shift+P` → "Developer: Reload Window"
