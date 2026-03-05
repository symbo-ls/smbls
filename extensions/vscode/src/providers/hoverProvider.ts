import * as vscode from 'vscode'
import { DOMQL_ALL_KEYS } from '../data/domqlKeys'
import { ALL_EVENTS } from '../data/events'
import { ELEMENT_METHODS, STATE_METHODS } from '../data/elementMethods'
import { ALL_COMPONENTS } from '../data/components'
import { ALL_CSS_PROPS } from '../data/cssProperties'
import {
  COLOR_TOKENS, COLOR_TOKEN_MAP, GRADIENT_TOKENS, THEME_TOKENS,
  ICON_NAMES, SPACING_SCALE, SPACING_TOKENS, TYPOGRAPHY_TOKENS, TIMING_TOKENS,
  SEQUENCE_CONFIGS, COLOR_PROPERTIES,
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

for (const c of COLOR_TOKEN_MAP) {
  if (c.label !== 'inherit' && c.label !== 'none' && c.label !== 'currentColor') {
    const hexInfo = c.hex ? ` → \`${c.hex}\`` : ''
    const desc = c.description ? `\n\n${c.description}` : ''
    valueHints.set(c.label, `**Color token:** \`${c.label}\`${hexInfo}${desc}\n\nModifiers: \`${c.label}.5\` (opacity), \`${c.label}+16\` (lighten), \`${c.label}-16\` (darken), \`${c.label}=50\` (set lightness)`)
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
      if (SPACING_PROPERTIES.has(prop)) {
        const token = SPACING_TOKENS.find(t => t.label === word)
        if (token) {
          const cfg = SEQUENCE_CONFIGS.spacing
          const md = new vscode.MarkdownString(`**Spacing token:** \`${word}\` ≈ **${token.approxValue}**\n\nBase: A = ${cfg.base}px, ratio: ${cfg.ratio} (golden ratio)\n\nScale: W X Y Z **A** B C D E F G H\n\nOperations: \`A+B\`, \`A-Z\`, \`A*2\`, \`-A\` (negative)`)
          md.isTrusted = true
          return new vscode.Hover(md, wordRange)
        }
      }

      // Typography tokens
      if (FONT_SIZE_PROPERTIES.has(prop)) {
        const token = TYPOGRAPHY_TOKENS.find(t => t.label === word)
        if (token) {
          const cfg = SEQUENCE_CONFIGS.typography
          const md = new vscode.MarkdownString(`**Typography token:** \`${word}\` ≈ **${token.approxValue}**\n\nBase: A = ${cfg.base}px, ratio: ${cfg.ratio} (major third)\n\nScale: X Y Z **A** B C D E F G H`)
          md.isTrusted = true
          return new vscode.Hover(md, wordRange)
        }
      }

      // Timing tokens
      if (prop === 'transition' || prop === 'transitionDuration' || prop === 'animationDuration') {
        const token = TIMING_TOKENS.find(t => t.label === word)
        if (token) {
          const cfg = SEQUENCE_CONFIGS.timing
          const md = new vscode.MarkdownString(`**Timing token:** \`${word}\` ≈ **${token.approxValue}**\n\nBase: A = ${cfg.base}ms, ratio: ${cfg.ratio} (perfect fourth)`)
          md.isTrusted = true
          return new vscode.Hover(md, wordRange)
        }
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
