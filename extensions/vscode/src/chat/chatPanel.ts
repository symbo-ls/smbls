import * as vscode from 'vscode'
import * as fs from 'fs'
import * as path from 'path'
import { execSync } from 'child_process'
import { streamChat, AI_PROVIDERS, PROVIDER_MODELS, LLMMessage } from './llmProvider'
import { loadAiConfig, saveAiConfig, getApiKey, setApiKey } from './configManager'
import { getMcpStatus, installMcpForEditor, removeMcpForEditor, checkMcpServerAvailable } from './mcpManager'
import { listAvailableLibraries, listProjectLibraries, addProjectLibraries, removeProjectLibraries, isAuthenticated, resolveProjectId } from './librariesApi'

export class ChatViewProvider implements vscode.WebviewViewProvider {
  public static readonly viewType = 'symbolsChat'
  private _view?: vscode.WebviewView
  private _messages: LLMMessage[] = []

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void {
    this._view = webviewView
    webviewView.webview.options = { enableScripts: true, localResourceRoots: [this._extensionUri] }
    webviewView.webview.html = this._getHtmlFromFile()

    webviewView.webview.onDidReceiveMessage(async (msg) => {
      switch (msg.type) {
        case 'sendMessage': await this._handleSendMessage(msg.text); break
        case 'getConfig': this._sendConfig(); break
        case 'setProvider':
          saveAiConfig({ provider: msg.provider, model: msg.model })
          this._sendConfig()
          break
        case 'setApiKey':
          setApiKey(msg.provider, msg.key)
          this._sendConfig()
          break
        case 'getMcpStatus': this._sendMcpStatus(); break
        case 'installMcp': this._handleInstallMcp(msg.editorName); break
        case 'removeMcp': this._handleRemoveMcp(msg.editorName); break
        case 'clearChat': this._messages = []; break
        case 'openSettings': vscode.commands.executeCommand('workbench.action.openSettings', 'symbolsApp'); break
        case 'insertCode': this._insertCode(msg.code); break
        case 'listAvailableLibs': this._listAvailableLibs(msg.search, msg.page); break
        case 'listProjectLibs': this._listProjectLibs(); break
        case 'addLib': this._addLib(msg.libraryId); break
        case 'removeLib': this._removeLib(msg.libraryId); break
        case 'getProjectConfig': this._sendProjectConfig(); break
        case 'saveProjectConfig': this._saveProjectConfig(msg.config); break
        case 'getProjectStatus': this._sendProjectStatus(); break
        case 'runCliCommand': this._runCliCommand(msg.command); break
      }
    })

    setTimeout(() => {
      this._sendConfig()
      this._sendMcpStatus()
      this._sendAuthStatus()
    }, 150)
  }

  private _getHtmlFromFile(): string {
    // Try multiple paths: out/webview.html (built), src/chat/webview.html (dev)
    const candidates = [
      path.join(__dirname, 'webview.html'),
      path.join(this._extensionUri.fsPath, 'out', 'webview.html'),
      path.join(this._extensionUri.fsPath, 'src', 'chat', 'webview.html')
    ]
    for (const filePath of candidates) {
      if (fs.existsSync(filePath)) {
        try { return fs.readFileSync(filePath, 'utf8') } catch {}
      }
    }
    return `<!DOCTYPE html><html><body><p style="color:red;padding:20px">Failed to load webview HTML. Looked in: ${candidates.join(', ')}</p></body></html>`
  }

  private _post(msg: any): void {
    this._view?.webview.postMessage(msg)
  }

  private _sendConfig(): void {
    const config = loadAiConfig()
    const providers = AI_PROVIDERS.filter(p => !p.disabled)
    const models = config.provider ? PROVIDER_MODELS[config.provider] || [] : []
    const hasKey = config.provider ? (config.provider === 'ollama' || !!getApiKey(config.provider)) : false
    this._post({
      type: 'config',
      provider: config.provider || '',
      model: config.model || '',
      providers, models,
      hasApiKey: hasKey,
      needsSetup: !config.provider || (!hasKey && config.provider !== 'ollama')
    })
  }

  private _sendAuthStatus(): void {
    this._post({
      type: 'authStatus',
      authenticated: isAuthenticated(),
      hasProject: !!this._getProjectId()
    })
  }

  private _sendMcpStatus(): void {
    const status = getMcpStatus()
    let server: { available: boolean; method: string; detail: string }
    try {
      server = checkMcpServerAvailable()
    } catch {
      server = { available: false, method: 'none', detail: 'Could not check availability' }
    }
    this._post({ type: 'mcpStatus', editors: status.editors, summary: status.summary, server })
  }

  private _handleInstallMcp(name: string): void {
    const ed = getMcpStatus().editors.find(e => e.name === name)
    if (ed) {
      const r = installMcpForEditor(ed)
      vscode.window.showInformationMessage(r.message)
      this._sendMcpStatus()
    }
  }

  private _handleRemoveMcp(name: string): void {
    const ed = getMcpStatus().editors.find(e => e.name === name)
    if (ed) {
      const r = removeMcpForEditor(ed)
      vscode.window.showInformationMessage(r.message)
      this._sendMcpStatus()
    }
  }

  private async _listAvailableLibs(search?: string, page?: number): Promise<void> {
    try {
      const libs = await listAvailableLibraries({ search, page: page || 1, limit: 20 })
      this._post({ type: 'availableLibs', libs, search: search || '' })
    } catch (err: any) {
      this._post({ type: 'libsError', text: err.message })
    }
  }

  private async _listProjectLibs(): Promise<void> {
    const pid = this._getProjectId()
    if (!pid) { this._post({ type: 'libsError', text: 'No project linked. Run smbls project link first.' }); return }
    try {
      const libs = await listProjectLibraries(pid)
      this._post({ type: 'projectLibs', libs })
    } catch (err: any) {
      this._post({ type: 'libsError', text: err.message })
    }
  }

  private async _addLib(id: string): Promise<void> {
    const pid = this._getProjectId()
    if (!pid) { this._post({ type: 'libsError', text: 'No project linked.' }); return }
    try {
      await addProjectLibraries(pid, [id])
      vscode.window.showInformationMessage('Shared library added')
      this._listProjectLibs()
    } catch (err: any) {
      this._post({ type: 'libsError', text: err.message })
    }
  }

  private async _removeLib(id: string): Promise<void> {
    const pid = this._getProjectId()
    if (!pid) { this._post({ type: 'libsError', text: 'No project linked.' }); return }
    try {
      await removeProjectLibraries(pid, [id])
      vscode.window.showInformationMessage('Shared library removed')
      this._listProjectLibs()
    } catch (err: any) {
      this._post({ type: 'libsError', text: err.message })
    }
  }

  private _getProjectId(): string | null {
    const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    return resolveProjectId(root)
  }

  private _sendProjectConfig(): void {
    const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    if (!root) {
      this._post({ type: 'projectConfig', found: false, config: {} })
      return
    }
    const cfgPath = path.join(root, 'symbols.json')
    try {
      if (fs.existsSync(cfgPath)) {
        const config = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
        this._post({ type: 'projectConfig', found: true, config })
      } else {
        this._post({ type: 'projectConfig', found: false, config: {} })
      }
    } catch {
      this._post({ type: 'projectConfig', found: false, config: {} })
    }
  }

  private _saveProjectConfig(config: any): void {
    const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    if (!root) {
      this._post({ type: 'projectConfigError', text: 'No workspace folder open' })
      return
    }
    const cfgPath = path.join(root, 'symbols.json')
    try {
      let existing: any = {}
      if (fs.existsSync(cfgPath)) {
        existing = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
      }
      const merged = { ...existing, ...config }
      // Remove empty string values to keep config clean
      for (const key of Object.keys(merged)) {
        if (merged[key] === '') delete merged[key]
      }
      fs.writeFileSync(cfgPath, JSON.stringify(merged, null, 2) + '\n', 'utf8')
      this._post({ type: 'projectConfigSaved' })
    } catch (err: any) {
      this._post({ type: 'projectConfigError', text: err.message })
    }
  }

  private _sendProjectStatus(): void {
    const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    const projectId = this._getProjectId()
    const authenticated = isAuthenticated()
    const { editors } = getMcpStatus()
    const mcpConfigured = editors.some(e => e.hasSymbolsMcp)

    let cliVersion = ''
    try {
      cliVersion = execSync('smbls --version 2>/dev/null', { timeout: 3000, stdio: 'pipe' }).toString().trim()
    } catch {
      cliVersion = 'not installed'
    }

    let nodeVersion = ''
    try {
      nodeVersion = execSync('node --version 2>/dev/null', { timeout: 2000, stdio: 'pipe' }).toString().trim()
    } catch {}

    this._post({
      type: 'projectStatus',
      authenticated,
      mcpConfigured,
      projectId: projectId || null,
      cliVersion,
      nodeVersion,
      workspace: root ? path.basename(root) : null
    })
  }

  private _runCliCommand(command: string): void {
    const terminal = vscode.window.terminals.find(t => t.name === 'Symbols CLI') ||
      vscode.window.createTerminal('Symbols CLI')
    terminal.show()
    terminal.sendText(command)
  }

  private async _handleSendMessage(text: string): Promise<void> {
    const trimmed = text.trim()

    // Slash commands
    if (trimmed.startsWith('/')) {
      const parts = trimmed.split(/\s+/)
      const cmd = parts[0].toLowerCase()
      const args = parts.slice(1)

      if (cmd === '/libraries' || cmd === '/libs') {
        const sub = args[0]?.toLowerCase()
        if (sub === 'available' || sub === 'search') {
          this._post({ type: 'switchTab', tab: 'libraries' })
          await this._listAvailableLibs(args.slice(1).join(' ') || undefined)
        } else if (sub === 'add' && args[1]) {
          await this._addLib(args[1])
        } else if (sub === 'remove' && args[1]) {
          await this._removeLib(args[1])
        } else {
          this._post({ type: 'switchTab', tab: 'libraries' })
          this._listProjectLibs()
          this._listAvailableLibs()
        }
        return
      }
      if (cmd === '/cli') { this._post({ type: 'switchTab', tab: 'cli' }); return }
      if (cmd === '/mcp') { this._post({ type: 'switchTab', tab: 'mcp' }); this._sendMcpStatus(); return }
      if (cmd === '/project') { this._post({ type: 'switchTab', tab: 'project' }); this._sendProjectConfig(); return }
      if (cmd === '/clear') { this._messages = []; this._post({ type: 'chatCleared' }); return }
      if (cmd === '/config' || cmd === '/settings') { this._post({ type: 'switchTab', tab: 'settings' }); return }
      if (cmd === '/help') {
        this._post({ type: 'systemMessage', text: '**Commands:** /libraries, /mcp, /project, /cli, /config, /clear, /help' })
        return
      }
    }

    // LLM chat
    const config = loadAiConfig()
    if (!config.provider || !config.model) {
      this._post({ type: 'error', text: 'Configure your AI provider in the Settings tab first.' })
      return
    }
    const apiKey = config.provider === 'ollama' ? '' : getApiKey(config.provider)
    if (config.provider !== 'ollama' && !apiKey) {
      this._post({ type: 'error', text: `No API key for ${config.provider}. Set it in Settings tab.` })
      return
    }

    let content = text
    if (this._messages.length === 0) {
      const ctx = this._getWorkspaceContext()
      if (ctx) content = `[Context: ${ctx}]\n\n${text}`
    }
    this._messages.push({ role: 'user', content })
    this._post({ type: 'streamStart' })

    let response = ''
    streamChat(config.provider, config.model, apiKey || '', this._messages,
      (token) => { response += token; this._post({ type: 'streamToken', text: token }) },
      () => { this._messages.push({ role: 'assistant', content: response }); this._post({ type: 'streamEnd' }) },
      (err) => {
        this._messages.pop()
        this._post({ type: 'error', text: err.message })
        this._post({ type: 'streamEnd' })
      }
    )
  }

  private _getWorkspaceContext(): string {
    const root = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath
    if (!root) return ''
    try {
      const cfgPath = path.join(root, 'symbols.json')
      if (fs.existsSync(cfgPath)) {
        const c = JSON.parse(fs.readFileSync(cfgPath, 'utf8'))
        return `Project: ${c.key || 'unnamed'}, bundler: ${c.bundler || 'parcel'}, dir: ${c.dir || './symbols'}`
      }
    } catch {}
    return `Workspace: ${path.basename(root)}`
  }

  private _insertCode(code: string): void {
    const editor = vscode.window.activeTextEditor
    if (editor) editor.edit(b => b.insert(editor.selection.active, code))
  }
}
