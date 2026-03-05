import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { DomqlCompletionProvider } from './providers/completionProvider'
import { DomqlHoverProvider } from './providers/hoverProvider'

const LANGUAGES = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact']

function hasSymbolsJson(dir: string): boolean {
  let current = dir
  while (true) {
    if (fs.existsSync(path.join(current, 'symbols.json'))) return true
    const parent = path.dirname(current)
    if (parent === current) return false
    current = parent
  }
}

export function activate(context: vscode.ExtensionContext): void {
  const workspaceFolders = vscode.workspace.workspaceFolders
  if (!workspaceFolders || !workspaceFolders.some(f => hasSymbolsJson(f.uri.fsPath))) return

  const completionProvider = new DomqlCompletionProvider()
  const hoverProvider = new DomqlHoverProvider()

  for (const lang of LANGUAGES) {
    // Completion: trigger on any character (key position detection handles context)
    context.subscriptions.push(
      vscode.languages.registerCompletionItemProvider(
        { language: lang, scheme: 'file' },
        completionProvider,
        '.', // trigger for el. / state. method completions
        ' ', // trigger inside objects
        '\n',
        ','
      )
    )

    // Hover provider
    context.subscriptions.push(
      vscode.languages.registerHoverProvider(
        { language: lang, scheme: 'file' },
        hoverProvider
      )
    )
  }

  // Command: toggle the extension on/off
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

  // Add toggle command to contributes
  vscode.window.setStatusBarMessage('Symbols.app active', 3000)
}

export function deactivate(): void {
  // cleanup handled by subscriptions
}
