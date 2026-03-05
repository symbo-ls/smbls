import * as vscode from 'vscode'
import { DomqlCompletionProvider } from './providers/completionProvider'
import { DomqlHoverProvider } from './providers/hoverProvider'
import { DomqlDefinitionProvider } from './providers/definitionProvider'
import { invalidateCache } from './providers/workspaceScanner'

const LANGUAGES = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact']

// Output channel for diagnostics
let output: vscode.OutputChannel

export function activate(context: vscode.ExtensionContext): void {
  output = vscode.window.createOutputChannel('Symbols.app')
  output.appendLine('Symbols.app extension activating...')

  const completionProvider = new DomqlCompletionProvider()
  const hoverProvider = new DomqlHoverProvider()
  const definitionProvider = new DomqlDefinitionProvider()

  for (const lang of LANGUAGES) {
    const selector = { language: lang, scheme: 'file' }

    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        selector,
        completionProvider,
        '.', ' ', '\n', ',', ':', "'", '"'
      )
    )

    context.subscriptions.push(
      vscode.languages.registerHoverProvider(selector, hoverProvider)
    )

    context.subscriptions.push(
      vscode.languages.registerDefinitionProvider(selector, definitionProvider)
    )
  }

  const watcher = vscode.workspace.createFileSystemWatcher('**/*.{js,ts,jsx,tsx}')
  watcher.onDidChange(() => invalidateCache())
  watcher.onDidCreate(() => invalidateCache())
  watcher.onDidDelete(() => invalidateCache())
  context.subscriptions.push(watcher)

  context.subscriptions.push(
    vscode.commands.registerCommand('symbolsApp.toggle', () => {
      const config = vscode.workspace.getConfiguration('symbolsApp')
      const current: boolean = config.get('enable', true)
      config.update('enable', !current, vscode.ConfigurationTarget.Global)
      vscode.window.showInformationMessage(
        `Symbols.app ${!current ? 'enabled' : 'disabled'}`
      )
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('symbolsApp.diagnose', () => {
      output.show()
      output.appendLine('--- Diagnostics ---')
      output.appendLine(`Workspace folders: ${vscode.workspace.workspaceFolders?.map(f => f.uri.fsPath).join(', ')}`)
      const editor = vscode.window.activeTextEditor
      if (editor) {
        output.appendLine(`Active file: ${editor.document.uri.fsPath}`)
        output.appendLine(`Language: ${editor.document.languageId}`)
        const text = editor.document.getText()
        output.appendLine(`File length: ${text.length}`)
        output.appendLine(`Has DOMQL import: ${/from\s+['"](@domql\/|domql|@symbo\.ls\/|smbls)/.test(text)}`)
        output.appendLine(`Has extends/childExtends: ${/\b(extends|childExtends|childExtendsRecursive|onRender|onStateUpdate|onInit)\s*:/.test(text)}`)
        output.appendLine(`Has design system props: ${/\b(flow|theme|round|boxSize|childExtend|widthRange|heightRange)\s*:\s*['"\`]/.test(text)}`)
        output.appendLine(`Has component export: ${/export\s+(?:const|let|var)\s+[A-Z][a-zA-Z0-9]+\s*=\s*\{/.test(text)}`)
      }
      output.appendLine('--- End ---')
      vscode.window.showInformationMessage('Symbols.app: Check Output panel (Symbols.app channel)')
    })
  )

  output.appendLine('Symbols.app extension activated successfully')
  vscode.window.showInformationMessage('Symbols.app IntelliSense active')
}

export function deactivate(): void {}
