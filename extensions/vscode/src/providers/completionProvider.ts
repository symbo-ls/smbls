import * as vscode from 'vscode'
import { DOMQL_ALL_KEYS } from '../data/domqlKeys'
import { DOM_EVENTS, DOMQL_LIFECYCLE_EVENTS } from '../data/events'
import { ALL_CSS_PROPS } from '../data/cssProperties'
import { ALL_COMPONENTS } from '../data/components'
import { ELEMENT_METHODS, STATE_METHODS, HTML_ATTRIBUTES } from '../data/elementMethods'
import {
  SPACING_SCALE, SPACING_TOKENS, TYPOGRAPHY_TOKENS, TIMING_TOKENS,
  SEQUENCE_CONFIGS, FONT_SIZE_SCALE, COLOR_TOKENS, COLOR_TOKEN_MAP, COLOR_MODIFIERS,
  GRADIENT_TOKENS, THEME_TOKENS, THEME_MODIFIERS, ICON_NAMES,
  MEDIA_TOKENS, HTML_TAGS, CSS_VALUE_ENUMS,
  COLOR_PROPERTIES, SPACING_PROPERTIES, FONT_SIZE_PROPERTIES,
  INPUT_TYPES, TARGET_VALUES, REL_VALUES, AUTOCOMPLETE_VALUES,
  BOOLEAN_VALUES, LOADING_VALUES
} from '../data/designSystemValues'
import { scanWorkspaceComponents } from './workspaceScanner'

// Patterns that indicate a file uses DOMQL / Symbols.app
const DOMQL_IMPORT_RE = /from\s+['"](@domql\/|domql|@symbo\.ls\/|smbls)/
const DOMQL_SIGNATURE_RE = /\b(extends|childExtends|childExtendsRecursive|onRender|onStateUpdate|onInit)\s*:/
// Design system patterns: flow, theme, round, boxSize, align + PascalCase component keys
const DESIGN_SYSTEM_RE = /\b(flow|theme|round|boxSize|childExtend|widthRange|heightRange)\s*:\s*['"`]/
const COMPONENT_EXPORT_RE = /export\s+(?:const|let|var)\s+[A-Z][a-zA-Z0-9]+\s*=\s*\{/

export function isDomqlFile(text: string, detectByImports: boolean): boolean {
  if (DOMQL_IMPORT_RE.test(text)) return true
  if (!detectByImports) return true
  if (DOMQL_SIGNATURE_RE.test(text)) return true
  if (DESIGN_SYSTEM_RE.test(text)) return true
  if (COMPONENT_EXPORT_RE.test(text)) return true
  return false
}

type DomqlContext =
  | 'element-key'
  | 'element-value'
  | 'attr-key'
  | 'attr-value'
  | 'state-key'
  | 'on-key'
  | 'define-key'
  | 'el-method'
  | 'state-method'
  | 'call-arg'
  | 'none'

interface ContextInfo {
  type: DomqlContext
  propertyName?: string   // the key whose value we're completing
  enclosingKey?: string   // parent object key (attr, state, on, etc.)
  enclosingTag?: string   // detected tag for the element
}

/**
 * Walk backwards from `offset` and find the property key that owns the `{`
 * immediately enclosing the cursor position.
 */
function findEnclosingKey(text: string, offset: number): string | null {
  let depth = 0
  for (let i = offset - 1; i >= 0; i--) {
    const ch = text[i]
    if (ch === '}' || ch === ']') {
      depth++
    } else if (ch === '{' || ch === '[') {
      if (depth === 0) {
        const before = text.substring(0, i).trimEnd()
        const m = before.match(/(\w+)\s*:\s*$/)
        return m ? m[1] : null
      }
      depth--
    }
  }
  return null
}

/** Returns true when the cursor is at a key position (no colon yet on this property). */
function isAtKeyPosition(linePrefix: string): boolean {
  const afterDelim = linePrefix.split(/[,{]/).pop() ?? ''
  return !/:/.test(afterDelim)
}

/** Extract the property name before the colon when cursor is in value position */
function getPropertyNameBeforeColon(linePrefix: string): string | null {
  // Match: `  propertyName: ` or `  propertyName: 'partial` or `  propertyName: "partial`
  const m = linePrefix.match(/(\w+)\s*:\s*['"]?[^,{}]*$/)
  return m ? m[1] : null
}

/** Try to find the `tag` property in the current element scope */
function findTagInScope(text: string, offset: number): string | null {
  // Find the enclosing `{` at element level
  let depth = 0
  let braceStart = -1
  for (let i = offset - 1; i >= 0; i--) {
    const ch = text[i]
    if (ch === '}') depth++
    else if (ch === '{') {
      if (depth === 0) { braceStart = i; break }
      depth--
    }
  }
  if (braceStart === -1) return null

  // Search within this scope for tag: "..."
  const scope = text.substring(braceStart, Math.min(offset + 500, text.length))
  const tagMatch = scope.match(/tag\s*:\s*['"](\w+)['"]/)
  return tagMatch ? tagMatch[1] : null
}

/** Check if we're inside el.call("...") */
function isInsideCallArgs(linePrefix: string): boolean {
  return /\.call\(\s*['"][^'"]*$/.test(linePrefix)
}

/** Check if cursor is inside a string value (after an opening quote with no closing quote) */
function isInsideStringValue(linePrefix: string): boolean {
  // Count unescaped quotes — odd count means we're inside a string
  const singleQuotes = (linePrefix.match(/(?<![\\])'/g) || []).length
  const doubleQuotes = (linePrefix.match(/(?<![\\])"/g) || []).length
  return singleQuotes % 2 === 1 || doubleQuotes % 2 === 1
}

/** Extract the property name when cursor is inside a string: `propName: 'cursor|` */
function getPropertyForStringValue(linePrefix: string): string | null {
  // Match: word : (optional space) quote ... cursor (no closing quote)
  const m = linePrefix.match(/(\w+)\s*:\s*['"][^'"]*$/)
  return m ? m[1] : null
}

export function detectContext(
  document: vscode.TextDocument,
  position: vscode.Position
): ContextInfo {
  const linePrefix = document.lineAt(position).text.substring(0, position.character)

  // el.call("...") argument
  if (isInsideCallArgs(linePrefix)) return { type: 'call-arg' }

  // Method access: el. or state.
  if (/\bel\.\s*$/.test(linePrefix)) return { type: 'el-method' }
  if (/\bstate\.\s*$/.test(linePrefix)) return { type: 'state-method' }

  const fullText = document.getText()
  const config = vscode.workspace.getConfiguration('symbolsApp')
  if (!isDomqlFile(fullText, config.get('detectByImports', true))) return { type: 'none' }

  const offset = document.offsetAt(position)
  const enclosingKey = findEnclosingKey(fullText, offset)
  const tag = findTagInScope(fullText, offset) ?? undefined

  // Inside a string value — provide string-level completions
  if (isInsideStringValue(linePrefix)) {
    const prop = getPropertyForStringValue(linePrefix)
    if (prop) {
      if (enclosingKey === 'attr') {
        return { type: 'attr-value', propertyName: prop, enclosingTag: tag }
      }
      return { type: 'element-value', propertyName: prop, enclosingKey: enclosingKey ?? undefined, enclosingTag: tag }
    }
  }

  // Check if we're in value position (after colon)
  const atKeyPos = isAtKeyPosition(linePrefix)
  const propertyName = !atKeyPos ? getPropertyNameBeforeColon(linePrefix) : null

  if (enclosingKey === 'attr') {
    if (atKeyPos) return { type: 'attr-key', enclosingTag: tag }
    return { type: 'attr-value', propertyName: propertyName ?? undefined, enclosingTag: tag }
  }
  if (enclosingKey === 'state') return { type: 'state-key' }
  if (enclosingKey === 'on') return { type: 'on-key' }
  if (enclosingKey === 'define') return { type: 'define-key' }

  if (!atKeyPos && propertyName) {
    return { type: 'element-value', propertyName, enclosingKey: enclosingKey ?? undefined, enclosingTag: tag }
  }

  if (atKeyPos) return { type: 'element-key' }
  return { type: 'none' }
}

// ---------------------------------------------------------------------------
// Completion item builders
// ---------------------------------------------------------------------------

function mkItem(
  label: string,
  kind: vscode.CompletionItemKind,
  detail: string,
  docs: string,
  snippet?: string,
  sort = '5'
): vscode.CompletionItem {
  const item = new vscode.CompletionItem(label, kind)
  item.detail = detail
  const md = new vscode.MarkdownString(docs)
  md.isTrusted = true
  item.documentation = md
  if (snippet) item.insertText = new vscode.SnippetString(snippet)
  item.sortText = sort + label
  return item
}

function mkValueItem(
  label: string,
  detail: string,
  docs?: string,
  sort = '1'
): vscode.CompletionItem {
  const item = new vscode.CompletionItem(label, vscode.CompletionItemKind.Value)
  item.detail = detail
  if (docs) {
    const md = new vscode.MarkdownString(docs)
    md.isTrusted = true
    item.documentation = md
  }
  item.sortText = sort + label
  // Ensure items show up inside strings
  item.filterText = label
  item.range = undefined
  return item
}

function getElementKeyCompletions(): vscode.CompletionItem[] {
  const config = vscode.workspace.getConfiguration('symbolsApp')
  const items: vscode.CompletionItem[] = []

  // 1 - DOMQL built-in keys
  for (const k of DOMQL_ALL_KEYS) {
    items.push(mkItem(k.label, vscode.CompletionItemKind.Property, k.detail, k.documentation, k.snippet, '1'))
  }

  // 2 - Lifecycle events
  for (const ev of DOMQL_LIFECYCLE_EVENTS) {
    items.push(mkItem(ev.label, vscode.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, '2'))
  }

  // 3 - DOM events
  for (const ev of DOM_EVENTS) {
    items.push(mkItem(ev.label, vscode.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, '3'))
  }

  // 4 - Built-in components / atoms (PascalCase children)
  for (const c of ALL_COMPONENTS) {
    items.push(mkItem(c.label, vscode.CompletionItemKind.Class, c.detail, c.documentation, c.snippet, '4'))
  }

  // 5 - CSS properties
  if (config.get('completeCssProps', true)) {
    for (const p of ALL_CSS_PROPS) {
      items.push(mkItem(p.label, vscode.CompletionItemKind.Property, p.detail, p.documentation ?? '', undefined, '5'))
    }
  }

  return items
}

function getAttrKeyCompletions(tag?: string): vscode.CompletionItem[] {
  return HTML_ATTRIBUTES.map(attr => {
    const item = new vscode.CompletionItem(attr, vscode.CompletionItemKind.Property)
    item.detail = `HTML attribute: ${attr}`
    const needsQuotes = attr.includes('-')
    item.insertText = new vscode.SnippetString(
      needsQuotes ? `"${attr}": \${1:},` : `${attr}: \${1:},`
    )
    return item
  })
}

function getOnKeyCompletions(): vscode.CompletionItem[] {
  return [...DOM_EVENTS, ...DOMQL_LIFECYCLE_EVENTS].map(ev => {
    const raw = ev.label.charAt(2).toLowerCase() + ev.label.slice(3)
    const item = new vscode.CompletionItem(raw, vscode.CompletionItemKind.Event)
    item.detail = `on.${raw} (v2 — prefer top-level ${ev.label})`
    const md = new vscode.MarkdownString(`**v2 style** — prefer \`${ev.label}\` in v3.\n\n${ev.documentation}`)
    md.isTrusted = true
    item.documentation = md
    const sig = ev.isDomqlLifecycle ? `${raw}: (el, state) => {\n  \${1:}\n},` : `${raw}: (event, el, state) => {\n  \${1:}\n},`
    item.insertText = new vscode.SnippetString(sig)
    return item
  })
}

function getElementMethodCompletions(): vscode.CompletionItem[] {
  return ELEMENT_METHODS.map(m => {
    const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method)
    item.detail = m.detail
    const md = new vscode.MarkdownString(m.documentation)
    md.isTrusted = true
    item.documentation = md
    item.insertText = new vscode.SnippetString(m.snippet)
    return item
  })
}

function getStateMethodCompletions(): vscode.CompletionItem[] {
  return STATE_METHODS.map(m => {
    const item = new vscode.CompletionItem(m.label, vscode.CompletionItemKind.Method)
    item.detail = m.detail
    const md = new vscode.MarkdownString(m.documentation)
    md.isTrusted = true
    item.documentation = md
    item.insertText = new vscode.SnippetString(m.snippet)
    return item
  })
}

function getStateKeyCompletions(): vscode.CompletionItem[] {
  const common: [string, string, string][] = [
    ['loading', 'false', 'Loading flag'],
    ['error', 'null', 'Error message or null'],
    ['data', 'null', 'Fetched data'],
    ['open', 'false', 'Open/closed toggle'],
    ['active', 'null', 'Currently active item key'],
    ['selected', 'null', 'Currently selected value'],
    ['count', '0', 'Numeric counter'],
    ['items', '[]', 'Array of items'],
    ['value', "''", 'Input value'],
  ]
  return common.map(([key, def, desc]) => {
    const item = new vscode.CompletionItem(key, vscode.CompletionItemKind.Property)
    item.detail = `${key}: ${def}`
    item.documentation = new vscode.MarkdownString(desc)
    item.insertText = new vscode.SnippetString(`${key}: \${1:${def}},`)
    return item
  })
}

// ---------------------------------------------------------------------------
// Value completions — the smart part
// ---------------------------------------------------------------------------

function getColorCompletions(): vscode.CompletionItem[] {
  const items: vscode.CompletionItem[] = []

  for (const c of COLOR_TOKEN_MAP) {
    const hexInfo = c.hex ? ` → ${c.hex}` : ''
    const desc = c.description || ''
    const detail = c.hex ? `${c.hex}` : (c.description || 'Color token')
    const docs = c.hex
      ? `\`${c.label}\` → \`${c.hex}\`\n\nModifiers: \`${c.label}.5\` (opacity), \`${c.label}+16\` (lighten), \`${c.label}-16\` (darken), \`${c.label}=50\` (set lightness)`
      : `${desc}\n\nModifiers: \`${c.label}.5\` (opacity)`
    items.push(mkValueItem(c.label, detail, docs, '1'))
  }

  for (const g of GRADIENT_TOKENS) {
    items.push(mkValueItem(g, `Gradient: ${g}`, 'Design system gradient token', '2'))
  }

  return items
}

function getSpacingCompletions(): vscode.CompletionItem[] {
  const cfg = SEQUENCE_CONFIGS.spacing
  return SPACING_TOKENS.map((token, i) => {
    const sort = String(i).padStart(2, '0')
    return mkValueItem(token.label, `${token.label} → ${token.approxValue}`, `**Spacing** \`${token.label}\` ≈ **${token.approxValue}**\n\nBase: A = ${cfg.base}px, ratio: ${cfg.ratio} (golden ratio)\n\nScale: W X Y Z **A** B C D E F G H\n\nSub-steps: A1, A2 interpolate between A and B\n\nOperations: \`A+B\`, \`A-Z\`, \`A*2\`, \`-A\` (negative)`, sort)
  })
}

function getFontSizeCompletions(): vscode.CompletionItem[] {
  const cfg = SEQUENCE_CONFIGS.typography
  return TYPOGRAPHY_TOKENS.map((token, i) => {
    const sort = String(i).padStart(2, '0')
    return mkValueItem(token.label, `${token.label} → ${token.approxValue}`, `**Typography** \`${token.label}\` ≈ **${token.approxValue}**\n\nBase: A = ${cfg.base}px, ratio: ${cfg.ratio} (major third)\n\nScale: X Y Z **A** B C D E F G H`, sort)
  })
}

function getThemeCompletions(): vscode.CompletionItem[] {
  const items: vscode.CompletionItem[] = []

  for (const t of THEME_TOKENS) {
    items.push(mkValueItem(t, `Theme: ${t}`, `Apply design system theme.\n\nModifiers: \`"${t} .child"\`, \`"${t} .color-only"\``, '1'))
  }

  // Theme with modifier combinations
  for (const t of ['primary', 'secondary', 'card', 'dialog', 'label']) {
    for (const mod of THEME_MODIFIERS) {
      items.push(mkValueItem(`${t} ${mod}`, `Theme modifier: ${t} ${mod}`, `Theme \`${t}\` with modifier \`${mod}\``, '3'))
    }
  }

  return items
}

function getIconCompletions(): vscode.CompletionItem[] {
  return ICON_NAMES.map(name =>
    mkValueItem(name, `Icon: ${name}`, `Default icon from design system`, '1')
  )
}

function getExtendsCompletions(workspaceComponents: string[]): vscode.CompletionItem[] {
  const items: vscode.CompletionItem[] = []

  // Built-in components first
  for (const c of ALL_COMPONENTS) {
    items.push(mkValueItem(c.label, c.detail, c.documentation, '1'))
  }

  // Workspace components
  for (const name of workspaceComponents) {
    // Skip if already in built-in
    if (ALL_COMPONENTS.some(c => c.label === name)) continue
    items.push(mkValueItem(name, `Project component: ${name}`, 'Detected from workspace', '2'))
  }

  return items
}

function getTagCompletions(): vscode.CompletionItem[] {
  return HTML_TAGS.map(tag =>
    mkValueItem(tag, `HTML tag: <${tag}>`, undefined, '1')
  )
}

function getCssEnumCompletions(property: string): vscode.CompletionItem[] {
  const values = CSS_VALUE_ENUMS[property]
  if (!values) return []
  return values.map(v => mkValueItem(v, `${property}: ${v}`, undefined, '1'))
}

function getAttrValueCompletions(attrName: string): vscode.CompletionItem[] {
  switch (attrName) {
    case 'type':
      return INPUT_TYPES.map(t => mkValueItem(t, `type="${t}"`, undefined, '1'))
    case 'target':
      return TARGET_VALUES.map(t => mkValueItem(t, `target="${t}"`, undefined, '1'))
    case 'rel':
      return REL_VALUES.map(r => mkValueItem(r, `rel="${r}"`, undefined, '1'))
    case 'autocomplete':
      return AUTOCOMPLETE_VALUES.map(a => mkValueItem(a, `autocomplete="${a}"`, undefined, '1'))
    case 'loading':
      return LOADING_VALUES.map(l => mkValueItem(l, `loading="${l}"`, undefined, '1'))
    case 'disabled': case 'checked': case 'required': case 'readonly':
    case 'multiple': case 'hidden': case 'draggable': case 'contenteditable':
    case 'spellcheck': case 'novalidate': case 'autofocus':
      return BOOLEAN_VALUES.map(b => mkValueItem(b, `${attrName}="${b}"`, undefined, '1'))
    case 'role':
      // Common ARIA roles
      return ['button', 'link', 'dialog', 'alert', 'navigation', 'menu', 'menuitem',
        'tab', 'tablist', 'tabpanel', 'checkbox', 'radio', 'listbox', 'option',
        'textbox', 'search', 'progressbar', 'slider', 'switch', 'tooltip', 'img',
        'heading', 'list', 'listitem', 'group', 'region', 'banner', 'main',
        'complementary', 'contentinfo', 'form', 'presentation', 'none'
      ].map(r => mkValueItem(r, `role="${r}"`, undefined, '1'))
    case 'dir':
      return ['ltr', 'rtl', 'auto'].map(d => mkValueItem(d, `dir="${d}"`, undefined, '1'))
    case 'method':
      return ['get', 'post', 'put', 'delete', 'patch'].map(m => mkValueItem(m, `method="${m}"`, undefined, '1'))
    case 'enctype':
      return ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain']
        .map(e => mkValueItem(e, `enctype="${e}"`, undefined, '1'))
    default:
      return []
  }
}

function getCallArgCompletions(): vscode.CompletionItem[] {
  // Common context function names
  const fns = [
    ['exec', 'Execute a dynamic prop value'],
    ['fetchData', 'Fetch data from API'],
    ['router', 'Navigate to a route'],
    ['isString', 'Check if value is string'],
    ['isObject', 'Check if value is object'],
    ['isArray', 'Check if value is array'],
    ['isNumber', 'Check if value is number'],
    ['isFunction', 'Check if value is function'],
    ['isBoolean', 'Check if value is boolean'],
    ['isDefined', 'Check if value is defined'],
    ['isUndefined', 'Check if value is undefined'],
    ['isNull', 'Check if value is null'],
    ['isEmpty', 'Check if value is empty'],
    ['deepMerge', 'Deep merge objects'],
    ['deepClone', 'Deep clone an object'],
    ['getSystemTheme', 'Get current system color scheme'],
    ['setTheme', 'Set application theme'],
  ]
  return fns.map(([name, desc]) =>
    mkValueItem(name, desc, `Context function: \`el.call("${name}", ...args)\`\n\nResolution: utils → functions → methods → snippets`, '1')
  )
}

async function getValueCompletions(ctx: ContextInfo): Promise<vscode.CompletionItem[]> {
  const prop = ctx.propertyName
  if (!prop) return []

  // extends / childExtends / childExtendsRecursive → component names
  if (prop === 'extends' || prop === 'childExtends' || prop === 'childExtendsRecursive' || prop === 'childExtend') {
    const wsComponents = await scanWorkspaceComponents()
    return getExtendsCompletions(wsComponents)
  }

  // tag → HTML tags
  if (prop === 'tag') return getTagCompletions()

  // theme → theme tokens
  if (prop === 'theme') return getThemeCompletions()

  // icon / name (inside Icon component) → icon names
  if (prop === 'icon' || prop === 'name') return getIconCompletions()

  // Color properties → color tokens
  if (COLOR_PROPERTIES.has(prop)) return getColorCompletions()

  // Spacing/size properties → spacing tokens
  if (SPACING_PROPERTIES.has(prop)) return getSpacingCompletions()

  // Font size properties → font size tokens
  if (FONT_SIZE_PROPERTIES.has(prop)) return getFontSizeCompletions()

  // CSS enum values (display, position, etc.)
  const enumItems = getCssEnumCompletions(prop)
  if (enumItems.length > 0) return enumItems

  // Timing properties → timing tokens
  if (prop === 'transition' || prop === 'transitionDuration' || prop === 'animationDuration') {
    const cfg = SEQUENCE_CONFIGS.timing
    const items = TIMING_TOKENS.map((t, i) => {
      const sort = String(i).padStart(2, '0')
      return mkValueItem(t.label, `${t.label} → ${t.approxValue}`, `**Timing** \`${t.label}\` ≈ **${t.approxValue}**\n\nBase: A = ${cfg.base}ms, ratio: ${cfg.ratio} (perfect fourth)`, sort)
    })
    if (prop === 'transition') {
      items.push(mkValueItem('A defaultBezier', 'transition: A defaultBezier', 'Common transition with default easing'))
    }
    return items
  }

  return []
}

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export class DomqlCompletionProvider implements vscode.CompletionItemProvider {
  async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.CompletionList | vscode.CompletionItem[]> {
    if (!vscode.workspace.getConfiguration('symbolsApp').get('enable', true)) return []

    const ctx = detectContext(document, position)
    let items: vscode.CompletionItem[]

    switch (ctx.type) {
      case 'el-method':    items = getElementMethodCompletions(); break
      case 'state-method': items = getStateMethodCompletions(); break
      case 'call-arg':     items = getCallArgCompletions(); break
      case 'attr-key':     items = getAttrKeyCompletions(ctx.enclosingTag); break
      case 'attr-value':   items = ctx.propertyName ? getAttrValueCompletions(ctx.propertyName) : []; break
      case 'on-key':       items = getOnKeyCompletions(); break
      case 'state-key':    items = getStateKeyCompletions(); break
      case 'define-key':
        items = [mkItem(
          'propName',
          vscode.CompletionItemKind.Property,
          '(param, el, state, context) => void',
          'Custom property transformer — runs when this key appears on any element.',
          'propName: (param, el, state) => {\n  ${1:}\n},',
          '1'
        )]
        break
      case 'element-value': items = await getValueCompletions(ctx); break
      case 'element-key': {
        items = getElementKeyCompletions()
        const wsComponents = await scanWorkspaceComponents()
        for (const name of wsComponents) {
          if (ALL_COMPONENTS.some(c => c.label === name)) continue
          items.push(mkItem(
            name,
            vscode.CompletionItemKind.Class,
            `Project component: ${name}`,
            'Detected from workspace files',
            `${name}: {\n  \${1:}\n},`,
            '4'
          ))
        }
        break
      }
      default: return []
    }

    if (items.length === 0) return []

    // Use CompletionList with isIncomplete so VSCode shows items inside strings
    return new vscode.CompletionList(items, true)
  }
}
