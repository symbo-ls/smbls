import * as http from 'http'
import * as vscode from 'vscode'

const SYNC_PORT = 24691

export interface SyncState {
  selectedPath: string | null
  selectedInfo: any | null
  workspaceRoot: string | null
  projectKey: string | null
}

type SelectionListener = (path: string, info: any) => void

export class SyncServer {
  private _server: http.Server | null = null
  private _state: SyncState = { selectedPath: null, selectedInfo: null, workspaceRoot: null, projectKey: null }
  private _listeners: SelectionListener[] = []
  private _sseClients: Set<http.ServerResponse> = new Set()

  start(): void {
    if (this._server) return

    this._server = http.createServer((req, res) => {
      // CORS headers for Chrome extension
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

      if (req.method === 'OPTIONS') {
        res.writeHead(204)
        res.end()
        return
      }

      const url = req.url || ''

      if (req.method === 'GET' && url === '/sync/state') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ ...this._state, connected: true }))
        return
      }

      if (req.method === 'GET' && url === '/sync/events') {
        // SSE endpoint for real-time updates
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        })
        res.write('data: ' + JSON.stringify({ type: 'connected', ...this._state }) + '\n\n')
        this._sseClients.add(res)
        req.on('close', () => { this._sseClients.delete(res) })
        return
      }

      if (req.method === 'POST' && url === '/sync/select') {
        let body = ''
        req.on('data', (chunk: Buffer) => { body += chunk.toString() })
        req.on('end', () => {
          try {
            const data = JSON.parse(body)
            if (data.path) {
              this._state.selectedPath = data.path
              this._state.selectedInfo = data.info || null
              this._notifyListeners(data.path, data.info)
              // Broadcast to other SSE clients (other Chrome tabs)
              this._broadcast({ type: 'select', path: data.path, info: data.info })
            }
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ ok: true }))
          } catch {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: 'Invalid JSON' }))
          }
        })
        return
      }

      res.writeHead(404)
      res.end('Not found')
    })

    this._server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        // Port already in use — likely another VSCode instance
        vscode.window.showWarningMessage(`Symbols sync port ${SYNC_PORT} already in use`)
      }
      this._server = null
    })

    this._server.listen(SYNC_PORT, '127.0.0.1', () => {
      // Server started
    })
  }

  stop(): void {
    for (const client of this._sseClients) {
      client.end()
    }
    this._sseClients.clear()
    this._server?.close()
    this._server = null
  }

  /** Update state from VSCode side (e.g., user navigates to a component) */
  updateSelection(path: string, info?: any): void {
    this._state.selectedPath = path
    this._state.selectedInfo = info || null
    this._broadcast({ type: 'select', path, info: info || null })
  }

  updateProject(workspaceRoot: string | null, projectKey: string | null): void {
    this._state.workspaceRoot = workspaceRoot
    this._state.projectKey = projectKey
  }

  /** Register listener for selections coming from Chrome */
  onSelection(listener: SelectionListener): void {
    this._listeners.push(listener)
  }

  get isRunning(): boolean {
    return this._server !== null && this._server.listening
  }

  private _notifyListeners(path: string, info: any): void {
    for (const listener of this._listeners) {
      try { listener(path, info) } catch {}
    }
  }

  private _broadcast(data: any): void {
    const msg = 'data: ' + JSON.stringify(data) + '\n\n'
    for (const client of this._sseClients) {
      try { client.write(msg) } catch {}
    }
  }
}
