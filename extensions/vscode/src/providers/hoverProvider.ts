import * as vscode from 'vscode'
import { DOMQL_ALL_KEYS } from '../data/domqlKeys'
import { ALL_EVENTS } from '../data/events'
import { ELEMENT_METHODS, STATE_METHODS } from '../data/elementMethods'
import { ALL_COMPONENTS } from '../data/components'
import { ALL_CSS_PROPS } from '../data/cssProperties'
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

export class DomqlHoverProvider implements vscode.HoverProvider {
  provideHover(
    document: vscode.TextDocument,
    position: vscode.Position
  ): vscode.Hover | null {
    if (!vscode.workspace.getConfiguration('symbolsApp').get('enable', true)) return null

    const fullText = document.getText()
    const config = vscode.workspace.getConfiguration('symbolsApp')
    if (!isDomqlFile(fullText, config.get('detectByImports', true))) return null

    const wordRange = document.getWordRangeAtPosition(position, /[\w.]+/)
    if (!wordRange) return null

    const word = document.getText(wordRange)

    // Check for `state.method` pattern first
    const docs = keyMap.get(word) ?? keyMap.get(word)
    if (!docs) return null

    const md = new vscode.MarkdownString(docs)
    md.isTrusted = true
    return new vscode.Hover(md, wordRange)
  }
}
