import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'
import { execSync } from 'child_process'

export interface McpServerEntry {
  command: string
  args: string[]
  env?: Record<string, string>
}

export interface McpEditorConfig {
  name: string
  label: string
  configPath: string
  exists: boolean
  hasSymbolsMcp: boolean
  config?: Record<string, any>
}

const MCP_EDITORS: { name: string; label: string; configPath: string }[] = [
  {
    name: 'claude',
    label: 'Claude Desktop',
    configPath: path.join(os.homedir(), '.claude', 'claude_desktop_config.json')
  },
  {
    name: 'cursor',
    label: 'Cursor',
    configPath: path.join(os.homedir(), '.cursor', 'mcp.json')
  },
  {
    name: 'windsurf',
    label: 'Windsurf',
    configPath: path.join(os.homedir(), '.windsurf', 'mcp.json')
  },
  {
    name: 'claude-code',
    label: 'Claude Code',
    configPath: path.join(os.homedir(), '.claude', 'claude_desktop_config.json')
  }
]

export function detectMcpEditors(): McpEditorConfig[] {
  const results: McpEditorConfig[] = []

  for (const editor of MCP_EDITORS) {
    const dir = path.dirname(editor.configPath)
    const exists = fs.existsSync(dir)
    let hasSymbolsMcp = false
    let config: Record<string, any> | undefined

    if (exists) {
      try {
        config = JSON.parse(fs.readFileSync(editor.configPath, 'utf8'))
        const servers = config?.mcpServers || {}
        hasSymbolsMcp = !!(servers['symbols-mcp'] || servers.symbols)
      } catch {}
    }

    results.push({
      name: editor.name,
      label: editor.label,
      configPath: editor.configPath,
      exists,
      hasSymbolsMcp,
      config
    })
  }

  return results
}

export function getSymbolsMcpEntry(): McpServerEntry {
  return {
    command: 'uvx',
    args: ['symbols-mcp']
  }
}

export function installMcpForEditor(editor: McpEditorConfig): { success: boolean; message: string } {
  try {
    let config: Record<string, any> = {}
    try {
      config = JSON.parse(fs.readFileSync(editor.configPath, 'utf8'))
    } catch {}

    if (!config.mcpServers) config.mcpServers = {}

    if (config.mcpServers['symbols-mcp'] || config.mcpServers.symbols) {
      return { success: true, message: `${editor.label}: symbols-mcp already configured` }
    }

    config.mcpServers['symbols-mcp'] = getSymbolsMcpEntry()
    fs.mkdirSync(path.dirname(editor.configPath), { recursive: true })
    fs.writeFileSync(editor.configPath, JSON.stringify(config, null, 2) + '\n')
    return { success: true, message: `${editor.label}: symbols-mcp installed` }
  } catch (err: any) {
    return { success: false, message: `${editor.label}: ${err.message}` }
  }
}

export function removeMcpForEditor(editor: McpEditorConfig): { success: boolean; message: string } {
  try {
    let config: Record<string, any> = {}
    try {
      config = JSON.parse(fs.readFileSync(editor.configPath, 'utf8'))
    } catch {
      return { success: true, message: `${editor.label}: no config file found` }
    }

    if (!config.mcpServers) {
      return { success: true, message: `${editor.label}: no MCP servers configured` }
    }

    delete config.mcpServers['symbols-mcp']
    delete config.mcpServers.symbols
    fs.writeFileSync(editor.configPath, JSON.stringify(config, null, 2) + '\n')
    return { success: true, message: `${editor.label}: symbols-mcp removed` }
  } catch (err: any) {
    return { success: false, message: `${editor.label}: ${err.message}` }
  }
}

export function checkMcpServerAvailable(): { available: boolean; method: string; detail: string } {
  // Check if symbols-mcp is directly installed
  try {
    execSync('which symbols-mcp 2>/dev/null || where symbols-mcp 2>nul', { timeout: 2000, stdio: 'pipe' })
    return { available: true, method: 'direct', detail: 'symbols-mcp installed' }
  } catch {}

  // Check if uvx is available (Python/PyPI install)
  try {
    execSync('which uvx 2>/dev/null || where uvx 2>nul', { timeout: 2000, stdio: 'pipe' })
    return { available: true, method: 'uvx', detail: 'uvx available — will run via uvx symbols-mcp' }
  } catch {}

  // Check if npx is available (Node.js install)
  try {
    execSync('which npx 2>/dev/null || where npx 2>nul', { timeout: 2000, stdio: 'pipe' })
    return { available: true, method: 'npx', detail: 'npx available — will run via npx @symbo.ls/mcp' }
  } catch {}

  return { available: false, method: 'none', detail: 'symbols-mcp not found. Install: pip install symbols-mcp or npm i -g @symbo.ls/mcp' }
}

export function getMcpStatus(): { editors: McpEditorConfig[]; summary: string } {
  const editors = detectMcpEditors()
  const detected = editors.filter(e => e.exists)
  const configured = editors.filter(e => e.hasSymbolsMcp)

  let summary: string
  if (configured.length > 0) {
    summary = `MCP active in: ${configured.map(e => e.label).join(', ')}`
  } else if (detected.length > 0) {
    summary = `Editors detected: ${detected.map(e => e.label).join(', ')} (MCP not configured)`
  } else {
    summary = 'No AI editors detected'
  }

  return { editors, summary }
}
