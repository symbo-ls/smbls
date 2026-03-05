import * as vscode from 'vscode'
import { DOMQL_ALL_KEYS } from '../data/domqlKeys'
import { ALL_EVENTS } from '../data/events'
import { ELEMENT_METHODS, STATE_METHODS } from '../data/elementMethods'
import { ALL_COMPONENTS } from '../data/components'
import { ALL_CSS_PROPS } from '../data/cssProperties'
import {
  COLOR_TOKENS, GRADIENT_TOKENS, THEME_TOKENS,
  ICON_NAMES, SPACING_SCALE, COLOR_PROPERTIES,
  SPACING_PROPERTIES, FONT_SIZE_PROPERTIES
} from '../data/designSystemValues'
import { isDomqlFile } from './completionProvider'

// Build lookup maps once
const keyMap = new Map<string, string>()

for (const k of DOMQL_ALL_KEYS) {
  keyMap.set(k.label, `**${k.detail}**\n\n${k.documentation}`)
}
for (const ev of ALL_EVENTS) {
  keyMap.set(ev.label, `**${ev.detail}**\n\n${ev.documentation}`)
}
for (const m of ELEMENT_METHODS) {
  keyMap.set(m.label, `**${m.detail}**\n\n${m.documentation}`)
}
for (const m of STATE_METHODS) {
  keyMap.set(`state.${m.label}`, `**${m.detail}**\n\n${m.documentation}`)
}
for (const c of ALL_COMPONENTS) {
  keyMap.set(c.label, `**${c.detail}**\n\n${c.documentation}`)
}
for (const p of ALL_CSS_PROPS) {
  if (p.documentation) keyMap.set(p.label, `**${p.detail}**\n\n${p.documentation}`)
}

// Design system value hover info
const valueHints = new Map<string, string>()

for (const c of COLOR_TOKENS) {
  if (c !== 'inherit' && c !== 'none' && c !== 'currentColor') {
    valueHints.set(c, `**Color token:** \`${c}\`\n\nModifiers: \`${c}.5\` (opacity), \`${c}+16\` (lighten), \`${c}-16\` (darken), \`${c}=50\` (set lightness)`)
  }
}
for (const g of GRADIENT_TOKENS) {
  valueHints.set(g, `**Gradient token:** \`${g}\``)
}
for (const t of THEME_TOKENS) {
  valueHints.set(t, `**Theme:** \`${t}\`\n\nUsage: \`theme: "${t}"\`\n\nModifiers: \`"${t} .child"\`, \`"${t} .color-only"\``)
}

/** Detect if the hovered word is in a value position and what property it belongs to */
function getPropertyContext(document: vscode.TextDocument, position: vscode.Position): string | null {
  const line = document.lineAt(position).text
  const colonIdx = line.indexOf(':')
  if (colonIdx === -1 || position.character <= colonIdx) return null
  const beforeColon = line.substring(0, colonIdx).trim()
  const m = beforeColon.match(/(\w+)$/)
  return m ? m[1] : null
}

export class DomqlHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | null {
    if (!vscode.workspace.getConfiguration('symbolsApp').get('enable', true)) return null

    const fullText = document.getText()
    const config = vscode.workspace.getConfiguration('symbolsApp')
    if (!isDomqlFile(fullText, config.get('detectByImports', true))) return null

    const wordRange = document.getWordRangeAtPosition(position, /[\w.@:-]+/)
    if (!wordRange) return null

    const word = document.getText(wordRange)

    // Check key docs
    const docs = keyMap.get(word)
    if (docs) {
      const md = new vscode.MarkdownString(docs)
      md.isTrusted = true
      return new vscode.Hover(md, wordRange)
    }

    // Check if it's a design system value in a value position
    const prop = getPropertyContext(document, position)
    if (prop) {
      // Spacing tokens
      if ((SPACING_PROPERTIES.has(prop) || FONT_SIZE_PROPERTIES.has(prop)) && SPACING_SCALE.includes(word)) {
        const md = new vscode.MarkdownString(`**Design token:** \`${word}\`\n\nScale: W < X < Y < Z < **A** (base=16px) < B < C < D < E\n\nSub-steps: A1, A2 between A and B`)
        md.isTrusted = true
        return new vscode.Hover(md, wordRange)
      }

      // Color values
      if (COLOR_PROPERTIES.has(prop) || prop === 'background') {
        const hint = valueHints.get(word)
        if (hint) {
          const md = new vscode.MarkdownString(hint)
          md.isTrusted = true
          return new vscode.Hover(md, wordRange)
        }
      }

      // Theme values
      if (prop === 'theme') {
        const hint = valueHints.get(word)
        if (hint) {
          const md = new vscode.MarkdownString(hint)
          md.isTrusted = true
          return new vscode.Hover(md, wordRange)
        }
      }

      // Icon names
      if ((prop === 'icon' || prop === 'name') && ICON_NAMES.includes(word)) {
        const md = new vscode.MarkdownString(`**Icon:** \`${word}\`\n\nDefault icon from design system sprite`)
        md.isTrusted = true
        return new vscode.Hover(md, wordRange)
      }
    }

    // General value hints (color/gradient/theme tokens anywhere)
    const generalHint = valueHints.get(word)
    if (generalHint) {
      const md = new vscode.MarkdownString(generalHint)
      md.isTrusted = true
      return new vscode.Hover(md, wordRange)
    }

    return null
  }
}
