import * as vscode from 'vscode'
import { DOMQL_ALL_KEYS } from '../data/domqlKeys'
import { DOM_EVENTS, DOMQL_LIFECYCLE_EVENTS } from '../data/events'
import { ALL_CSS_PROPS } from '../data/cssProperties'
import { ALL_COMPONENTS } from '../data/components'
import { ELEMENT_METHODS, STATE_METHODS, HTML_ATTRIBUTES } from '../data/elementMethods'

// Patterns that indicate a file uses DOMQL
const DOMQL_IMPORT_RE = /from\s+['"](@domql\/|domql|@symbo\.ls\/|smbls)/
const DOMQL_SIGNATURE_RE = /\b(extends|childExtends|childExtendsRecursive|onRender|onStateUpdate|onInit)\s*:/

export function isDomqlFile(text: string, detectByImports: boolean): boolean {
  if (DOMQL_IMPORT_RE.test(text)) return true
  if (!detectByImports) return true
  return DOMQL_SIGNATURE_RE.test(text)
}

type DomqlContext =
  | 'element-key'
  | 'attr-key'
  | 'state-key'
  | 'on-key'
  | 'define-key'
  | 'el-method'
  | 'state-method'
  | 'none'

/**
 * Walk backwards from `offset` and find the property key that owns the `{`
 * immediately enclosing the cursor position.
 * E.g. `attr: { | }` → "attr"
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
  // After the last comma or opening brace, no colon should appear
  const afterDelim = linePrefix.split(/[,{]/).pop() ?? ''
  return !/:/.test(afterDelim)
}

export function detectContext(
  document: vscode.TextDocument,
  position: vscode.Position
): DomqlContext {
  const linePrefix = document.lineAt(position).text.substring(0, position.character)

  // Method access
  if (/\bel\.\s*$/.test(linePrefix)) return 'el-method'
  if (/\bstate\.\s*$/.test(linePrefix)) return 'state-method'

  const fullText = document.getText()
  const config = vscode.workspace.getConfiguration('symbolsApp')
  if (!isDomqlFile(fullText, config.get('detectByImports', true))) return 'none'

  const offset = document.offsetAt(position)
  const enclosingKey = findEnclosingKey(fullText, offset)

  if (enclosingKey === 'attr') return 'attr-key'
  if (enclosingKey === 'state') return 'state-key'
  if (enclosingKey === 'on') return 'on-key'
  if (enclosingKey === 'define') return 'define-key'

  if (isAtKeyPosition(linePrefix)) return 'element-key'
  return 'none'
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

function getElementKeyCompletions(): vscode.CompletionItem[] {
  const config = vscode.workspace.getConfiguration('symbolsApp')
  const items: vscode.CompletionItem[] = []

  // 1 – DOMQL built-in keys
  for (const k of DOMQL_ALL_KEYS) {
    items.push(mkItem(k.label, vscode.CompletionItemKind.Property, k.detail, k.documentation, k.snippet, '1'))
  }

  // 2 – Lifecycle events
  for (const ev of DOMQL_LIFECYCLE_EVENTS) {
    items.push(mkItem(ev.label, vscode.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, '2'))
  }

  // 3 – DOM events
  for (const ev of DOM_EVENTS) {
    items.push(mkItem(ev.label, vscode.CompletionItemKind.Event, ev.detail, ev.documentation, ev.snippet, '3'))
  }

  // 4 – Built-in components / atoms (PascalCase children)
  for (const c of ALL_COMPONENTS) {
    items.push(mkItem(c.label, vscode.CompletionItemKind.Class, c.detail, c.documentation, c.snippet, '4'))
  }

  // 5 – CSS properties
  if (config.get('completeCssProps', true)) {
    for (const p of ALL_CSS_PROPS) {
      items.push(mkItem(p.label, vscode.CompletionItemKind.Property, p.detail, p.documentation ?? '', undefined, '5'))
    }
  }

  return items
}

function getAttrKeyCompletions(): vscode.CompletionItem[] {
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
  const common = [
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
// Provider
// ---------------------------------------------------------------------------

export class DomqlCompletionProvider implements vscode.CompletionItemProvider {
  provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.CompletionItem[] {
    if (!vscode.workspace.getConfiguration('symbolsApp').get('enable', true)) return []

    switch (detectContext(document, position)) {
      case 'el-method':    return getElementMethodCompletions()
      case 'state-method': return getStateMethodCompletions()
      case 'attr-key':     return getAttrKeyCompletions()
      case 'on-key':       return getOnKeyCompletions()
      case 'state-key':    return getStateKeyCompletions()
      case 'define-key':
        return [mkItem(
          'propName',
          vscode.CompletionItemKind.Property,
          '(param, el, state, context) => void',
          'Custom property transformer — runs when this key appears on any element.',
          'propName: (param, el, state) => {\n  ${1:}\n},',
          '1'
        )]
      case 'element-key':  return getElementKeyCompletions()
      default:             return []
    }
  }
}
