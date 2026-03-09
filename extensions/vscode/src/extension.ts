import * as vscode from 'vscode'
import { DomqlCompletionProvider } from './providers/completionProvider'
import { DomqlHoverProvider } from './providers/hoverProvider'
import { DomqlDefinitionProvider } from './providers/definitionProvider'
import { invalidateCache } from './providers/workspaceScanner'
import { ChatViewProvider } from './chat/chatPanel'
import { checkMcpServerAvailable, getMcpStatus, installMcpForEditor } from './chat/mcpManager'
import { isAuthenticated } from './chat/librariesApi'
import { SyncServer } from './chat/syncServer'

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

  // Chat panel
  const chatProvider = new ChatViewProvider(context.extensionUri)
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(ChatViewProvider.viewType, chatProvider)
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('symbolsApp.openChat', () => {
      vscode.commands.executeCommand('symbolsChat.focus')
    })
  )

  // Sync server for Chrome extension communication
  const syncServer = new SyncServer()
  syncServer.start()

  // Update sync server with project info
  const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
  if (root) {
    try {
      const cfgPath = require('path').join(root, 'symbols.json')
      const fs = require('fs')
      if (fs.existsSync(cfgPath)) {
        const cfg = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
        syncServer.updateProject(root, cfg.key || null)
      } else {
        syncServer.updateProject(root, null)
      }
    } catch {
      syncServer.updateProject(root, null)
    }
  }

  // When Chrome sends element selection, navigate to source
  syncServer.onSelection((path, info) => {
    output.appendLine(`Chrome sync: selected ${path}`)
    if (info?.sourceFile) {
      const filePath = require('path').isAbsolute(info.sourceFile)
        ? info.sourceFile
        : require('path').join(root || '', info.sourceFile)
      vscode.workspace.openTextDocument(filePath).then(doc => {
        vscode.window.showTextDocument(doc, { preview: true })
      }).catch(() => {})
    }
  })

  context.subscriptions.push({ dispose: () => syncServer.stop() })

  // Auto-connect: offer to install MCP and connect to platform
  autoConnect(context, output)

  output.appendLine('Symbols.app extension activated successfully')
  vscode.window.showInformationMessage('Symbols.app Connect active')
}

async function autoConnect(context: vscode.ExtensionContext, output: vscode.OutputChannel): Promise<void> {
  const SKIP_KEY = 'symbolsApp.skipAutoConnect'

  // Check if user previously dismissed
  if (context.globalState.get<boolean>(SKIP_KEY)) return

  // Auto-install MCP for detected editors that don't have it
  try {
    const server = checkMcpServerAvailable()
    if (server.available) {
      const { editors } = getMcpStatus()
      const unconfigured = editors.filter(e => e.exists && !e.hasSymbolsMcp)
      if (unconfigured.length > 0) {
        const names = unconfigured.map(e => e.label).join(', ')
        const choice = await vscode.window.showInformationMessage(
          `Symbols MCP server available. Install for ${names}?`,
          'Install', 'Not now', "Don't ask again"
        )
        if (choice === 'Install') {
          for (const ed of unconfigured) {
            const r = installMcpForEditor(ed)
            output.appendLine(r.message)
          }
          vscode.window.showInformationMessage('symbols-mcp installed for detected editors')
        } else if (choice === "Don't ask again") {
          context.globalState.update(SKIP_KEY, true)
        }
      }
    } else {
      output.appendLine('symbols-mcp not found — install via: pip install symbols-mcp or npm i -g @symbo.ls/mcp')
    }
  } catch (err: any) {
    output.appendLine(`Auto-connect MCP check failed: ${err.message}`)
  }

  // Check platform auth and suggest login
  if (!isAuthenticated()) {
    const choice = await vscode.window.showInformationMessage(
      'Symbols.app: Sign in to sync projects and shared libraries.',
      'Run smbls login', 'Later', "Don't ask again"
    )
    if (choice === 'Run smbls login') {
      const terminal = vscode.window.createTerminal('Symbols Login')
      terminal.show()
      terminal.sendText('smbls login')
    } else if (choice === "Don't ask again") {
      context.globalState.update(SKIP_KEY, true)
    }
  }
}

export function deactivate(): void {}
