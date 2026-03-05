# Chrome Inspect2 — Session Log

Full development session covering major features added to the Symbols Connect Chrome DevTools extension.

---

## Architecture Overview

- **Chrome Extension Manifest V3**: DevTools panel, service worker, content scripts
- **Files**: `static/panel.js` (main UI logic), `static/panel.html`, `static/panel.css`, `static/page-agent.js` (injected into page), `static/picker.js` (folder picker tab), `static/auth.js`, `src/service_worker.js`
- **IndexedDB v3**: Three stores — `handles` (folder handles), `files` (file caches), `threads` (chat threads with `project` index)
- **Connection modes**: `local` (folder picker), `platform` (symbols.app), `runtime` (auto-detect DOMQL page)

---

## Features Implemented (in order)

### 1. Source/Code Editor Tab Fix
- `.tab-panel.active` used `display: block` but code editor needed flex layout
- Fixed with `#tab-source.active { display: flex; flex-direction: column; height: 100%; }`

### 2. AI System (replaced broken smart-assistant)
- **Starter AI** (`starterAI()`): Local rule-based command parser (free tier) — handles set/change, add, remove, colors, themes, flow, text, spacing, hide/show
- **Claude API**: Direct call to `api.anthropic.com/v1/messages` with own API key, or proxy through `api.symbols.app/v1/ai/claude` if signed in
- **Service worker**: `declarativeNetRequest` rule to remove Origin header for Anthropic API (CORS)
- **AI Settings dialog**: Gear button next to model selector, stores API key in `chrome.storage.local`
- **Model selector**: Starter (free) / Claude / Chrome AI (local)

### 3. Folder Picker Fix
- `showDirectoryPicker()` was auto-called on page load (no user gesture) — removed auto-call, only triggers on button click

### 4. Chat Threads with Persistence
- Thread model: `{ id, project, title, messages[], createdAt, updatedAt }`
- Saved per-project in IndexedDB, survives reloads
- Thread tabs bar, new thread button, thread history panel
- Editor AI bar prompts also saved to threads

### 5. Universal Data Flow for AI Changes
- `applyChanges(parsed, scope)`: Single function that applies changes to DOM via `pageEval` AND refreshes panel via `selectElement`
- Supports both element and section scope

### 6. Scope Switcher (Element / Section)
- Toggle in both AI input rows (editor + chat)
- Element: applies to selected element only
- Section: walks DOMQL tree children via `pageEval` and applies changes to all descendants

### 7. Add New Props/State Values
- `createAddButton(type)`: Inline key:value editor for adding new props or state entries
- Appears at bottom of props and state tabs

### 8. State Tree Tab
- Added as second tab in tree pane alongside Active Nodes
- `renderStateTree()`: Uses `pageEval` with `findRoot()` to walk actual DOMQL elements
- **State nesting fix**: Only shows elements with their OWN state (different from parent's state). Elements that inherit the same state are skipped but their children are still traversed to find deeper state boundaries.
- `renderStateTreeNode()`: Renders tree with badges (state key count), click-to-select, collapsible
- **Click fix**: Clicking state values no longer re-renders the entire tree. Selection highlighting done via CSS class toggling without full rebuild.

### 9. Auto-Refresh
- `chrome.devtools.network.onNavigated` listener + 2-second polling for tree hash changes
- Re-loads tree and re-selects current element on page navigation

### 10. Props Sub-tabs: Computed / Original
- **Computed**: Shows rendered prop values from the live DOM
- **Original**: Shows definition values from `__ref`/extends chain
- **Function detection**: Walks `__ref` and extends chain in `page-agent.js` to identify `typeof def.props[key] === 'function'`
- Function props marked with `f()` badge, non-editable, tooltip explains it's dynamic

### 11. Methods Inline
- Element methods appended at bottom of Computed props panel under "Methods" header
- State methods appended at bottom of State tab under "State Methods" header
- Removed standalone Methods tab

### 12. Design System Tab
- Third tab in tree pane: Active Nodes / State Tree / Design System
- **Runtime extraction**: `getDesignSystem()` in `page-agent.js` reads `root.context.designSystem` or any child element's context
- Custom serializer handles DOM nodes, circular refs, skips `parent`/`node`/`context`/`__element`
- **File fallback**: Scans `fileCache` for files with "designSystem" in path
- **Categorized display**: Known categories (color, theme, spacing, typography, etc.) shown first
- **Color swatches**: Hex/rgb/hsl values show color preview
- **Inline editing**: Click leaf values to edit, updates `root.context.designSystem` in live page
- Retry logic if page not ready yet

### 13. Auto-Connect for Symbols Sites
- On panel init, checks if inspected page has `__DOMQL_INSPECTOR__`
- If yes, skips connect screen → enters `runtime` mode immediately
- Shows "Connect" button in header bar for saving changes
- Connect dialog: "Local Folder" or "Platform (sign in)"
- Picking folder while in runtime mode seamlessly upgrades to `local` mode
- `connectionMode` now supports: `'local'` | `'platform'` | `'runtime'`

### 14. Object/Array Props Editor
- Props with object/array values open structured inline editor (not flat text input)
- Each key-value pair gets its own row with type-preserving inputs
- `parsePreservingType()` tracks original type (string, number, boolean, null, json) and converts back correctly
- Add/remove entries, Save/Cancel buttons
- Inline key input for adding new object keys (replaced `prompt()` which doesn't work in DevTools panels)

---

## Key Functions Reference

### panel.js
| Function | Purpose |
|---|---|
| `tryAutoConnect()` | Check if page is DOMQL site, auto-enter runtime mode |
| `connectLocal(name, cache)` | Connect with local folder |
| `connectPlatform(project)` | Connect with symbols.app platform |
| `connectRuntime()` | Auto-connect without folder/platform |
| `showConnectDialog()` | Dropdown to choose local/platform |
| `updateConnectButton()` | Show/hide Connect button in header |
| `loadTree()` | Load DOMQL element tree from page |
| `selectElement(path)` | Select element by key path |
| `renderDetail()` | Render selected element's detail pane |
| `renderPropsTab()` | Render Computed/Original props with function detection |
| `renderStateTab()` | Render state values + state methods |
| `renderStateTree()` | Build state tree from runtime (only own-state elements) |
| `renderDesignSystem()` | Load and render design system from runtime/files |
| `startEditing()` | Inline text editor for primitive values |
| `startObjectEditing()` | Structured editor for objects/arrays |
| `createPropRow()` | Create a property row with key:value display |
| `applyChanges(parsed, scope)` | Apply AI changes to DOM + refresh panel |
| `starterAI(query, context)` | Local rule-based AI command parser |
| `callClaudeAPI(prompt, context)` | Call Claude API (own key or platform proxy) |
| `handleAIPrompt()` | Editor AI bar handler |
| `handleChatPrompt()` | Chat mode handler |
| `initAutoRefresh()` | Set up navigation + polling refresh |

### page-agent.js
| Function | Purpose |
|---|---|
| `findRoot()` | Find root DOMQL element |
| `getElementInfo(el)` | Serialize element info (props, state, methods, originalProps, functionProps) |
| `getDesignSystem(el)` | Extract designSystem from element context |
| `updateProp(path, key, value)` | Update a prop value on live element |
| `updateState(path, key, value)` | Update a state value on live element |
| `navigatePath(path)` | Navigate to element by dot-separated key path |

---

### 15. Design System Original/Computed Tabs
- **Original tab**: Reads from source files (`fileCache` designSystem folder) — individual category files like `color.js`, `theme.js`, `spacing.js`
- **Computed tab**: Reads from runtime `context.designSystem` (post-processed by framework)
- Improved `buildDesignSystemFromFiles()`: Sort index files last, category files first; handle both lowercase (color.js) and uppercase (COLOR.js) naming
- Source file editing: Edits in Original tab update the source files via regex replacement
- DS tokens cached in `cachedDesignSystem` for use by autocomplete
- If no source files connected, defaults to Computed tab

### 16. IntelliSense/Autocomplete from Design System Tokens
- **`getSuggestionsForProp()`** now pulls real tokens from `cachedDesignSystem`:
  - Color props → DS color tokens with hex swatches
  - Theme → DS theme names with modifiers
  - Spacing props → DS spacing tokens (from base/ratio config)
  - Font size → DS typography tokens
  - Timing → DS timing values
  - Font family → DS font_family entries
  - Falls back to hardcoded defaults if DS not loaded
- **DS value editing autocomplete**: `editDSValue()` now has autocomplete dropdown with `getDSSuggestionsForPath()`
- **Add property IntelliSense**: `createAddButton()` now has:
  - Key input with dropdown of all known CSS/DOMQL property names (filtered by what's already set)
  - Value input with context-aware suggestions (based on selected key → pulls from `getSuggestionsForProp`)
  - Arrow key navigation, Tab to move between key/value

### 17. updateDesignSystem Pattern (from platform)
- Researched platform's `updateDesignSystem(key, val, opts)` in `platform/uikit/functions/design-system.js`
- Path pattern: dot-notation like `'COLOR.primary'` → array `['designSystem', 'COLOR', 'primary']`
- Categories are uppercase: COLOR, GRADIENT, THEME, FONT, TYPOGRAPHY, SPACING, TIMING, etc.
- DS files follow modular structure: `designSystem/color.js`, `designSystem/theme.js`, etc. with `index.js` aggregating all
- Extension now uses same path convention for source file updates

---

## Pending / Not Yet Done

1. **Verify Claude API works end-to-end** — Integration added but not confirmed by user
2. **Platform proxy endpoint** — `api.symbols.app/v1/ai/claude` may not exist on backend yet
3. **Runtime error** — User reported "Saved 1 file(s), 1 error(s)" but specific error message unknown.
4. **Platform remote DS data** — Currently only local folder files supported for Original tab. Platform API integration for remote DS data pending.

---

## File Changes Summary

| File | Changes |
|---|---|
| `static/panel.html` | Added: tree pane tabs (3 tabs), thread bar, thread history, scope toggle, AI settings dialog, props sub-tabs, design system panel, model selectors |
| `static/panel.css` | Added: tree pane tabs, thread bar, scope toggle, props sub-tabs, function badges, state tree, design system, AI dialog, connect dialog, object editor styles |
| `static/panel.js` | Major: IndexedDB v3, thread system, starterAI, Claude API, scope system, auto-connect, state tree (own-state only), design system tab, object/array editor, auto-refresh, universal applyChanges |
| `static/page-agent.js` | Added: `originalProps`/`functionProps` extraction, `getDesignSystem()` with custom serializer |
| `static/picker.js` | Bumped IndexedDB to v3, removed auto-call to `pickFolder()` |
| `src/service_worker.js` | Replaced smart-assistant rule with Anthropic API CORS rule |
