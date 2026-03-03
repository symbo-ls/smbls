import * as vscode from 'vscode'
import { DomqlCompletionProvider } from './providers/completionProvider'
import { DomqlHoverProvider } from './providers/hoverProvider'

const LANGUAGES = ['javascript', 'typescript', 'javascriptreact', 'typescriptreact']

export function activate(context: vscode.ExtensionContext): void {
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
    vscode.commands.registerCommand('domqlIntelliSense.toggle', () => {
      const config = vscode.workspace.getConfiguration('domqlIntelliSense')
      const current: boolean = config.get('enable', true)
      config.update('enable', !current, vscode.ConfigurationTarget.Global)
      vscode.window.showInformationMessage(
        `DOMQL IntelliSense ${!current ? 'enabled' : 'disabled'}`
      )
    })
  )

  // Add toggle command to contributes
  vscode.window.setStatusBarMessage('DOMQL IntelliSense active', 3000)
}

export function deactivate(): void {
  // cleanup handled by subscriptions
}
