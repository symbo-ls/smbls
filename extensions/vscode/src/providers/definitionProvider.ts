import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { isDomqlFile } from './completionProvider'

const PASCAL_CASE_RE = /^[A-Z][a-zA-Z0-9]+$/

/** Walk up from a file to find symbols.json, return its dir and location */
function findSymbolsConfig(fromPath: string): { root: string; dir: string } | null {
  let current = path.dirname(fromPath)
  while (true) {
    const configPath = path.join(current, 'symbols.json')
    if (fs.existsSync(configPath)) {
      try {
        const json = JSON.parse(fs.readFileSync(configPath, 'utf-8'))
        return { root: current, dir: json.dir || './symbols' }
      } catch {
        return { root: current, dir: './symbols' }
      }
    }
    const parent = path.dirname(current)
    if (parent === current) break
    current = parent
  }
  return null
}

export class DomqlDefinitionProvider implements vscode.DefinitionProvider {
  async provideDefinition(
    document: vscode.TextDocument,
    position: vscode.Position
  ): Promise<vscode.Definition | null> {
    if (!vscode.workspace.getConfiguration('symbolsApp').get('enable', true)) return null

    const fullText = document.getText()
    const config = vscode.workspace.getConfiguration('symbolsApp')
    if (!isDomqlFile(fullText, config.get('detectByImports', true))) return null

    const wordRange =
      document.getWordRangeAtPosition(position, /[A-Z][a-zA-Z0-9]+/) ||
      document.getWordRangeAtPosition(position, /[a-zA-Z][a-zA-Z0-9]+/)
    if (!wordRange) return null

    const word = document.getText(wordRange)
    if (!PASCAL_CASE_RE.test(word)) return null

    const line = document.lineAt(position).text

    const insideString = isInsideQuotes(line, wordRange.start.character)
    const isObjKey = line.substring(wordRange.end.character).trimStart().startsWith(':')
    const textBefore = line.substring(0, wordRange.start.character)
    const isDirectRef = /(?:extends|childExtends|childExtendsRecursive|childExtend)\s*:\s*$/.test(textBefore.trimEnd())
    const isArrayRef = /(?:extends|childExtends)\s*:\s*\[/.test(textBefore)

    if (!insideString && !isObjKey && !isDirectRef && !isArrayRef) return null

    // 1. Fast: convention-based lookup from symbols.json
    const conventionResult = this.findByConvention(word, document.uri.fsPath)
    if (conventionResult) return conventionResult

    // 2. Slow: workspace-wide search
    return this.findByWorkspaceSearch(word, document.uri)
  }

  private findByConvention(name: string, filePath: string): vscode.Location | null {
    const symConfig = findSymbolsConfig(filePath)

    // Collect all candidate directories to search
    const searchDirs: string[] = []

    if (symConfig) {
      const symbolsBase = path.resolve(symConfig.root, symConfig.dir)
      searchDirs.push(
        path.join(symbolsBase, 'components'),
        symbolsBase,
        path.join(symConfig.root, 'components'),
      )
    }

    // Also check relative to current file
    const fileDir = path.dirname(filePath)
    searchDirs.push(
      path.join(fileDir, '..', 'components'), // sibling components dir
      path.join(fileDir, 'components'),
      fileDir,
    )

    // Also check workspace folders
    const folders = vscode.workspace.workspaceFolders
    if (folders) {
      for (const f of folders) {
        searchDirs.push(
          path.join(f.uri.fsPath, 'components'),
          path.join(f.uri.fsPath, 'symbols', 'components'),
        )
      }
    }

    const extensions = ['.js', '.ts', '.jsx', '.tsx']

    for (const dir of searchDirs) {
      // Try direct file: components/Name.js
      for (const ext of extensions) {
        const candidate = path.join(dir, `${name}${ext}`)
        const loc = this.resolveFile(candidate, name)
        if (loc) return loc
      }
      // Try directory: components/Name/index.js
      for (const ext of extensions) {
        const candidate = path.join(dir, name, `index${ext}`)
        const loc = this.resolveFile(candidate, name)
        if (loc) return loc
      }
    }

    return null
  }

  private resolveFile(filePath: string, name: string): vscode.Location | null {
    if (!fs.existsSync(filePath)) return null
    try {
      const text = fs.readFileSync(filePath, 'utf-8')
      const lines = text.split('\n')
      const pattern = new RegExp(`(?:export\\s+)?(?:const|let|var|function)\\s+${name}\\b`)
      for (let i = 0; i < lines.length; i++) {
        if (pattern.test(lines[i])) {
          return new vscode.Location(vscode.Uri.file(filePath), new vscode.Position(i, 0))
        }
      }
      // File matches by name, go to top
      return new vscode.Location(vscode.Uri.file(filePath), new vscode.Position(0, 0))
    } catch {
      return new vscode.Location(vscode.Uri.file(filePath), new vscode.Position(0, 0))
    }
  }

  private async findByWorkspaceSearch(
    name: string,
    currentUri: vscode.Uri
  ): Promise<vscode.Location | null> {
    try {
      // Targeted filename search first
      const nameFiles = await vscode.workspace.findFiles(
        `**/${name}.{js,ts,jsx,tsx}`,
        '{**/node_modules/**,**/dist/**,**/out/**,**/build/**}',
        10
      )

      for (const file of nameFiles) {
        try {
          const doc = await vscode.workspace.openTextDocument(file)
          const text = doc.getText()
          if (!text.includes(name)) continue
          const lines = text.split('\n')
          for (let i = 0; i < lines.length; i++) {
            if (new RegExp(`(?:export\\s+)?(?:const|let|var|function)\\s+${name}\\s*[=({]`).test(lines[i])) {
              return new vscode.Location(file, new vscode.Position(i, 0))
            }
          }
          return new vscode.Location(file, new vscode.Position(0, 0))
        } catch { /* skip */ }
      }

      // Broader search
      const files = await vscode.workspace.findFiles(
        '**/*.{js,ts,jsx,tsx}',
        '{**/node_modules/**,**/dist/**,**/out/**,**/build/**,.next/**}',
        300
      )

      for (const file of files) {
        try {
          const doc = await vscode.workspace.openTextDocument(file)
          const text = doc.getText()
          if (!text.includes(name)) continue
          const lines = text.split('\n')
          for (let i = 0; i < lines.length; i++) {
            if (new RegExp(`^export\\s+(?:const|let|var)\\s+${name}\\s*=`).test(lines[i])) {
              return new vscode.Location(file, new vscode.Position(i, 0))
            }
          }
        } catch { /* skip */ }
      }
    } catch { /* failed */ }

    return null
  }
}

function isInsideQuotes(line: string, charIndex: number): boolean {
  let inSingle = false
  let inDouble = false
  for (let i = 0; i < charIndex; i++) {
    const ch = line[i]
    const prev = i > 0 ? line[i - 1] : ''
    if (prev === '\\') continue
    if (ch === "'" && !inDouble) inSingle = !inSingle
    if (ch === '"' && !inSingle) inDouble = !inDouble
  }
  return inSingle || inDouble
}
