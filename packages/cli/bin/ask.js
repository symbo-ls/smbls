'use strict'

import fs from 'fs'
import path from 'path'
import os from 'os'
import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { createInterface } from 'readline'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { updateLegacySymbolsJson } from '../helpers/config.js'

const AI_PROVIDERS = [
  { name: 'Symbols AI — native Symbols assistant (coming soon)', value: 'symbols', disabled: 'Soon' },
  { name: 'Claude     — Anthropic Claude', value: 'claude' },
  { name: 'OpenAI     — GPT models', value: 'openai' },
  { name: 'Gemini     — Google Gemini', value: 'gemini' },
  { name: 'Ollama     — local models (no API key)', value: 'ollama' }
]

const PROVIDER_MODELS = {
  claude: [
    { name: 'claude-sonnet-4-6 (recommended)', value: 'claude-sonnet-4-6' },
    { name: 'claude-opus-4-6', value: 'claude-opus-4-6' },
    { name: 'claude-haiku-4-5-20251001', value: 'claude-haiku-4-5-20251001' }
  ],
  openai: [
    { name: 'gpt-4o (recommended)', value: 'gpt-4o' },
    { name: 'gpt-4o-mini', value: 'gpt-4o-mini' },
    { name: 'o3-mini', value: 'o3-mini' }
  ],
  gemini: [
    { name: 'gemini-2.5-pro (recommended)', value: 'gemini-2.5-pro' },
    { name: 'gemini-2.5-flash', value: 'gemini-2.5-flash' }
  ],
  ollama: [
    { name: 'llama3.3 (recommended)', value: 'llama3.3' },
    { name: 'codellama', value: 'codellama' },
    { name: 'mistral', value: 'mistral' },
    { name: 'deepseek-coder-v2', value: 'deepseek-coder-v2' }
  ]
}

const PROVIDER_ENDPOINTS = {
  claude: 'https://api.anthropic.com/v1/messages',
  openai: 'https://api.openai.com/v1/chat/completions',
  gemini: 'https://generativelanguage.googleapis.com/v1beta/models',
  ollama: 'http://localhost:11434/api/chat'
}

const ENV_KEY_NAMES = {
  claude: 'ANTHROPIC_API_KEY',
  openai: 'OPENAI_API_KEY',
  gemini: 'GEMINI_API_KEY'
}

const AI_CONFIG_PATH = path.join(os.homedir(), '.smblsrc')

function loadAiConfig () {
  try {
    const data = JSON.parse(fs.readFileSync(AI_CONFIG_PATH, 'utf8'))
    return data.ai || {}
  } catch (_) {
    return {}
  }
}

function saveAiConfig (aiConfig) {
  let data = {}
  try {
    data = JSON.parse(fs.readFileSync(AI_CONFIG_PATH, 'utf8'))
  } catch (_) {}
  data.ai = { ...data.ai, ...aiConfig }
  fs.writeFileSync(AI_CONFIG_PATH, JSON.stringify(data, null, 2) + '\n')
}

const DEPRECATED_MODELS = {
  'claude-sonnet-4-5-20250514': 'claude-sonnet-4-6'
}

function getApiKey (provider) {
  const envName = ENV_KEY_NAMES[provider]
  if (envName && process.env[envName]) return process.env[envName]
  const config = loadAiConfig()
  return config[`${provider}ApiKey`] || null
}

// ── MCP Configuration ──

const MCP_CONFIG_PATHS = {
  claude: path.join(os.homedir(), '.claude', 'claude_desktop_config.json'),
  cursor: path.join(os.homedir(), '.cursor', 'mcp.json'),
  windsurf: path.join(os.homedir(), '.windsurf', 'mcp.json')
}

function getMcpEditors () {
  const found = []
  for (const [name, p] of Object.entries(MCP_CONFIG_PATHS)) {
    const dir = path.dirname(p)
    if (fs.existsSync(dir)) found.push({ name, configPath: p })
  }
  return found
}

function checkMcpConnection () {
  try {
    execSync('uvx symbols-mcp --help', { timeout: 10000, stdio: 'pipe' })
    return 'connected'
  } catch (_) {
    try {
      execSync('which uvx', { stdio: 'pipe' })
      return 'installed but not responding'
    } catch (_) {
      return 'uvx not found'
    }
  }
}

function setupMcp (editors, { statusOnly } = {}) {
  const mcpEntry = {
    command: 'uvx',
    args: ['symbols-mcp']
  }

  const status = checkMcpConnection()
  const statusColor = status === 'connected' ? chalk.green : chalk.yellow
  console.log(`  symbols-mcp: ${statusColor(status)}`)

  for (const editor of editors) {
    let config = {}
    try {
      config = JSON.parse(fs.readFileSync(editor.configPath, 'utf8'))
    } catch (_) {}

    const key = 'mcpServers'
    if (!config[key]) config[key] = {}

    const configured = config[key]['symbols-mcp'] || config[key].symbols
    if (configured) {
      console.log(chalk.green('  ✓') + chalk.dim(` ${editor.name}: configured`))
      if (statusOnly) continue
      continue
    }

    if (statusOnly) {
      console.log(chalk.yellow('  ✗') + chalk.dim(` ${editor.name}: not configured`))
      continue
    }

    config[key]['symbols-mcp'] = mcpEntry
    fs.mkdirSync(path.dirname(editor.configPath), { recursive: true })
    fs.writeFileSync(editor.configPath, JSON.stringify(config, null, 2) + '\n')
    console.log(chalk.green('  ✓') + ` ${editor.name}: added symbols-mcp to ${editor.configPath}`)
  }
}

// ── Agent Tools ──

const AGENT_TOOLS = [
  {
    name: 'read_file',
    description: 'Read the contents of a file from the project',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'File path (relative to project root or absolute)' }
      },
      required: ['path']
    }
  },
  {
    name: 'list_files',
    description: 'List files and directories in a path (excludes node_modules and .git)',
    input_schema: {
      type: 'object',
      properties: {
        path: { type: 'string', description: 'Directory path (default: .)' }
      },
      required: ['path']
    }
  },
  {
    name: 'run_command',
    description: 'Run a shell command in the project directory',
    input_schema: {
      type: 'object',
      properties: {
        command: { type: 'string', description: 'Shell command to execute' }
      },
      required: ['command']
    }
  }
]

let _permissionMode = 'ask'
let _rl = null

function isInsideWorkspace (filePath) {
  const resolved = path.resolve(filePath)
  const cwd = process.cwd()
  return resolved.startsWith(cwd + path.sep) || resolved === cwd
}

async function requestPermission (action, detail) {
  if (_permissionMode === 'auto') {
    console.log(chalk.dim(`  ⚙ ${action}: ${detail}`))
    return true
  }
  return new Promise(resolve => {
    process.stdout.write(chalk.yellow(`  ⚙ ${action}`) + chalk.dim(`: ${detail}\n`))
    _rl.question(chalk.dim('  Allow? (Y/n) '), answer => {
      resolve(answer.trim().toLowerCase() !== 'n')
    })
  })
}

async function executeTool (name, input) {
  switch (name) {
    case 'read_file': {
      const resolved = path.resolve(input.path)
      // Auto-allow reads inside workspace, ask for outside files
      if (!isInsideWorkspace(resolved)) {
        if (!await requestPermission('read_file (outside workspace)', input.path)) return 'Permission denied by user'
      } else {
        console.log(chalk.dim(`  ⚙ read_file: ${input.path}`))
      }
      try {
        const content = fs.readFileSync(resolved, 'utf8')
        return content.length > 50000 ? content.slice(0, 50000) + '\n... (truncated)' : content
      } catch (e) { return `Error: ${e.message}` }
    }
    case 'list_files': {
      const resolved = path.resolve(input.path)
      // Auto-allow listing inside workspace
      if (!isInsideWorkspace(resolved)) {
        if (!await requestPermission('list_files (outside workspace)', input.path)) return 'Permission denied by user'
      } else {
        console.log(chalk.dim(`  ⚙ list_files: ${input.path}`))
      }
      try {
        const result = execSync(
          `find '${resolved.replace(/'/g, "'\\''")}' -type f -not -path '*/node_modules/*' -not -path '*/.git/*' 2>/dev/null | head -200 | sort`,
          { encoding: 'utf8', timeout: 5000 }
        )
        return result || '(empty directory)'
      } catch (e) { return `Error: ${e.message}` }
    }
    case 'run_command': {
      if (!await requestPermission('run_command', input.command)) return 'Permission denied by user'
      try {
        return execSync(input.command, { encoding: 'utf8', timeout: 30000, cwd: process.cwd() })
      } catch (e) { return (e.stdout || '') + (e.stderr || '') || `Error: ${e.message}` }
    }
    default: return `Unknown tool: ${name}`
  }
}

// ── AI Chat ──

const SYSTEM_PROMPT = `You are a Symbols.app development assistant. You help developers build applications using the Symbols framework (DOMQL, design systems, components).

IMPORTANT: Always use the symbols-mcp MCP server to search Symbols documentation and get framework rules before answering. Use the search_symbols_docs tool to find relevant docs and get_project_rules for framework conventions. Do not guess — look it up first.

You have access to tools that let you read files, list directories, and run commands in the user's project. Use them proactively — when the user asks to audit code or explore structure, read the files directly instead of asking them to paste code.

Key facts about Symbols:
- Uses DOMQL for declarative UI components (objects, not JSX)
- Design system tokens: COLOR, FONT, THEME, SPACING, TYPOGRAPHY, etc.
- Components use props like: text, icon, color, background, padding, etc.
- Shared Libraries provide reusable component collections
- Entry point is typically symbols/index.js with app.js, state.js, pages/, components/
- Build tools: Parcel (default), Vite, or browser-native ES modules
- CLI commands: smbls start, build, deploy, push, fetch, sync, config

Be concise and direct. When showing code, use DOMQL syntax unless asked otherwise.`

// ── Claude Agent (tool use) ──

async function streamClaudeWithTools (messages, apiKey, model) {
  const fetch = (await import('node-fetch')).default
  const res = await fetch(PROVIDER_ENDPOINTS.claude, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model,
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages,
      tools: AGENT_TOOLS,
      stream: true
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Claude API error ${res.status}: ${err}`)
  }

  let textContent = ''
  const toolUseBlocks = []
  let currentToolBlock = null
  let currentToolJson = ''
  let stopReason = null
  let buffer = ''

  for await (const chunk of res.body) {
    buffer += chunk.toString()
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const raw = line.slice(6).trim()
      if (raw === '[DONE]') continue

      let data
      try { data = JSON.parse(raw) } catch (_) { continue }

      if (data.type === 'content_block_start') {
        if (data.content_block?.type === 'tool_use') {
          currentToolBlock = { id: data.content_block.id, name: data.content_block.name }
          currentToolJson = ''
        }
      } else if (data.type === 'content_block_delta') {
        if (data.delta?.type === 'text_delta' && data.delta.text) {
          process.stdout.write(data.delta.text)
          textContent += data.delta.text
        } else if (data.delta?.type === 'input_json_delta') {
          currentToolJson += data.delta.partial_json
        }
      } else if (data.type === 'content_block_stop') {
        if (currentToolBlock) {
          try { currentToolBlock.input = JSON.parse(currentToolJson) } catch (_) { currentToolBlock.input = {} }
          toolUseBlocks.push(currentToolBlock)
          currentToolBlock = null
          currentToolJson = ''
        }
      } else if (data.type === 'message_delta') {
        stopReason = data.delta?.stop_reason
      }
    }
  }

  return { textContent, toolUseBlocks, stopReason }
}

async function claudeAgentLoop (messages, apiKey, model) {
  while (true) {
    const result = await streamClaudeWithTools(messages, apiKey, model)

    const assistantContent = []
    if (result.textContent) assistantContent.push({ type: 'text', text: result.textContent })
    for (const tool of result.toolUseBlocks) {
      assistantContent.push({ type: 'tool_use', id: tool.id, name: tool.name, input: tool.input })
    }
    messages.push({ role: 'assistant', content: assistantContent.length === 1 && assistantContent[0].type === 'text' ? result.textContent : assistantContent })

    if (result.stopReason !== 'tool_use' || !result.toolUseBlocks.length) {
      return result.textContent
    }

    process.stdout.write('\n')
    const toolResults = []
    for (const tool of result.toolUseBlocks) {
      const output = await executeTool(tool.name, tool.input)
      toolResults.push({ type: 'tool_result', tool_use_id: tool.id, content: output })
    }
    messages.push({ role: 'user', content: toolResults })
    process.stdout.write('\n')
  }
}

// ── Simple streaming (non-Claude) ──

async function streamOpenAI (messages, apiKey, model) {
  const fetch = (await import('node-fetch')).default
  const plainMessages = messages.map(m => ({
    role: m.role,
    content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
  }))
  const res = await fetch(PROVIDER_ENDPOINTS.openai, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...plainMessages],
      stream: true
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI API error ${res.status}: ${err}`)
  }

  return parseSSE(res.body, (data) => {
    if (data.choices?.[0]?.delta?.content) {
      return data.choices[0].delta.content
    }
    return null
  })
}

async function streamGemini (messages, apiKey, model) {
  const fetch = (await import('node-fetch')).default
  const url = `${PROVIDER_ENDPOINTS.gemini}/${model}:streamGenerateContent?alt=sse&key=${apiKey}`
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
  }))

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error ${res.status}: ${err}`)
  }

  return parseSSE(res.body, (data) => {
    if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
      return data.candidates[0].content.parts[0].text
    }
    return null
  })
}

async function streamOllama (messages, model) {
  const fetch = (await import('node-fetch')).default
  const plainMessages = messages.map(m => ({
    role: m.role,
    content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
  }))
  const res = await fetch(PROVIDER_ENDPOINTS.ollama, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...plainMessages],
      stream: true
    })
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Ollama error ${res.status}: ${err}`)
  }

  return parseNDJSON(res.body, (data) => {
    if (data.message?.content) return data.message.content
    return null
  })
}

async function * parseSSE (body, extract) {
  let buffer = ''
  for await (const chunk of body) {
    buffer += chunk.toString()
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.startsWith('data: ')) continue
      const raw = line.slice(6).trim()
      if (raw === '[DONE]') return
      try {
        const data = JSON.parse(raw)
        const text = extract(data)
        if (text) yield text
      } catch (_) {}
    }
  }
}

async function * parseNDJSON (body, extract) {
  let buffer = ''
  for await (const chunk of body) {
    buffer += chunk.toString()
    const lines = buffer.split('\n')
    buffer = lines.pop() || ''
    for (const line of lines) {
      if (!line.trim()) continue
      try {
        const data = JSON.parse(line)
        const text = extract(data)
        if (text) yield text
      } catch (_) {}
    }
  }
}

async function simpleChat (provider, model, apiKey, messages) {
  switch (provider) {
    case 'openai': return streamOpenAI(messages, apiKey, model)
    case 'gemini': return streamGemini(messages, apiKey, model)
    case 'ollama': return streamOllama(messages, model)
    default: throw new Error(`Unknown provider: ${provider}`)
  }
}

// ── Init / Setup ──

async function runInit () {
  console.log(chalk.bold('\n  Symbols AI Setup\n'))

  const { provider } = await inquirer.prompt([{
    type: 'list',
    name: 'provider',
    message: 'AI provider:',
    choices: AI_PROVIDERS,
    default: 'claude'
  }])

  const models = PROVIDER_MODELS[provider]
  const { model } = await inquirer.prompt([{
    type: 'list',
    name: 'model',
    message: 'Model:',
    choices: models
  }])

  let apiKey = null
  if (provider !== 'ollama') {
    const envName = ENV_KEY_NAMES[provider]
    const existingKey = getApiKey(provider)
    const { key } = await inquirer.prompt([{
      type: 'password',
      name: 'key',
      message: `API key${envName ? ` (or set ${envName})` : ''}:`,
      default: existingKey ? '••••' + existingKey.slice(-4) : undefined,
      mask: '•'
    }])
    apiKey = key.startsWith('••••') ? existingKey : key
  }

  const config = { provider, model }
  if (apiKey) config[`${provider}ApiKey`] = apiKey
  saveAiConfig(config)
  console.log(chalk.green('✓') + ' AI configuration saved')

  // MCP setup
  const editors = getMcpEditors()
  if (editors.length) {
    console.log(chalk.dim('\nDetected AI editors:'), editors.map(e => e.name).join(', '))
    const { setupMcpNow } = await inquirer.prompt([{
      type: 'confirm',
      name: 'setupMcpNow',
      message: 'Configure symbols-mcp for these editors?',
      default: true
    }])
    if (setupMcpNow) setupMcp(editors)
  } else {
    console.log(chalk.dim('\nNo AI editors detected. You can manually add symbols-mcp:'))
    console.log(chalk.dim('  pip install symbols-mcp'))
    console.log(chalk.dim('  Add to your editor\'s MCP config:'))
    console.log(chalk.dim('  { "mcpServers": { "symbols-mcp": { "command": "uvx", "args": ["symbols-mcp"] } } }'))
  }

  // Save to symbols.json too
  const symbolsConfig = await loadSymbolsConfig({ required: false, validateKey: false, silent: true }) || {}
  updateLegacySymbolsJson({ ...symbolsConfig, ai: { provider, model } })

  console.log(chalk.green('\n✓ Setup complete. Run ') + chalk.cyan('smbls ask') + chalk.green(' to start chatting.\n'))
}

// ── Chat History ──

const CHAT_DIR = path.join(process.cwd(), '.symbols_cache', 'chat')

function getChatSessionId () {
  return new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19)
}

function saveChatHistory (sessionId, messages, meta) {
  fs.mkdirSync(CHAT_DIR, { recursive: true })
  const filePath = path.join(CHAT_DIR, `${sessionId}.json`)
  const data = {
    ...meta,
    updatedAt: new Date().toISOString(),
    messages: messages.map(m => ({
      role: m.role,
      content: typeof m.content === 'string' ? m.content : JSON.stringify(m.content)
    }))
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n')
}

function loadChatSessions () {
  try {
    const files = fs.readdirSync(CHAT_DIR).filter(f => f.endsWith('.json')).sort().reverse()
    return files.map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(CHAT_DIR, f), 'utf8'))
        return { id: f.replace('.json', ''), ...data }
      } catch (_) { return null }
    }).filter(Boolean)
  } catch (_) {
    return []
  }
}

function getSessionPreview (session) {
  const firstUserMsg = session.messages?.find(m => m.role === 'user')
  if (!firstUserMsg) return '(empty)'
  const text = typeof firstUserMsg.content === 'string' ? firstUserMsg.content : ''
  // Strip context prefix
  const clean = text.replace(/^\[Context:.*?\]\n\n/s, '')
  return clean.length > 60 ? clean.slice(0, 60) + '...' : clean
}

// ── Prompt & Status Bar ──

function getModeLabel () {
  if (_permissionMode === 'auto') {
    return chalk.dim.green(' Automatic ')
  }
  return chalk.dim.yellow(' Ask ')
}

function getPrompt () {
  return getModeLabel() + chalk.cyan(' ❯ ')
}

function renderStatusBar () {
  const cols = process.stdout.columns || 80
  const toggle = 'Ctrl+T: switch mode'
  const commands = '/exit /clear /config /mcp /mode'
  const modeText = _permissionMode === 'auto' ? 'Automatic' : 'Ask Permissions'
  const left = ` ${modeText}`
  const right = `${toggle}  ${commands} `
  const pad = Math.max(0, cols - left.length - right.length)
  const color = _permissionMode === 'auto' ? chalk.dim.green : chalk.dim.yellow
  const bar = color(left + ' '.repeat(pad) + right)
  process.stdout.write(bar + '\n')
}

function toggleMode () {
  _permissionMode = _permissionMode === 'ask' ? 'auto' : 'ask'
  if (_rl) {
    _rl.setPrompt(getPrompt())
    // Clear line, show notification, re-render prompt
    process.stdout.write('\r\x1b[K')
    console.log(chalk.dim(`  Mode: ${_permissionMode === 'auto' ? 'Automatic' : 'Ask Permissions'}`))
    _rl.prompt(true)
  }
}

// ── Autocomplete ──

const SLASH_COMMANDS = ['/exit', '/quit', '/clear', '/config', '/mcp', '/mode', '/history']

function completer (line) {
  if (line.startsWith('/')) {
    const hits = SLASH_COMMANDS.filter(c => c.startsWith(line))
    return [hits.length ? hits : SLASH_COMMANDS, line]
  }
  // File path autocomplete when line contains a path-like string
  const match = line.match(/(\S*)$/)
  if (match && match[1] && (match[1].includes('/') || match[1].startsWith('.'))) {
    const partial = match[1]
    const dir = path.dirname(partial)
    const base = path.basename(partial)
    try {
      const resolved = path.resolve(dir)
      const entries = fs.readdirSync(resolved)
      const hits = entries
        .filter(e => e.startsWith(base) && e !== 'node_modules' && e !== '.git')
        .map(e => {
          const full = path.join(dir, e)
          try {
            return fs.statSync(path.resolve(full)).isDirectory() ? full + '/' : full
          } catch (_) { return full }
        })
      return [hits, partial]
    } catch (_) {}
  }
  return [[], line]
}

// ── Interactive REPL ──

async function startChat (opts) {
  let aiConfig = loadAiConfig()
  let provider = opts.provider || aiConfig.provider
  let model = opts.model || aiConfig.model
  let apiKey = provider ? getApiKey(provider) : null

  // Auto-migrate deprecated model IDs
  if (model && DEPRECATED_MODELS[model]) {
    const newModel = DEPRECATED_MODELS[model]
    console.log(chalk.yellow(`  Model ${model} is deprecated, switching to ${newModel}`))
    model = newModel
    saveAiConfig({ model })
  }

  // First-time setup
  if (!provider || (provider !== 'ollama' && !apiKey)) {
    console.log(chalk.yellow('AI not configured yet.'))
    await runInit()
    aiConfig = loadAiConfig()
    provider = aiConfig.provider
    model = aiConfig.model
    apiKey = getApiKey(provider)
  }

  // Load project context
  let projectContext = ''
  try {
    const symbolsConfig = await loadSymbolsConfig({ required: false, validateKey: false, silent: true })
    if (symbolsConfig) {
      projectContext = `\nProject: ${symbolsConfig.key || 'unnamed'}, bundler: ${symbolsConfig.bundler || 'parcel'}, dir: ${symbolsConfig.dir || './symbols'}`
    }
  } catch (_) {}

  // Single question mode
  if (opts.args?.length) {
    const question = opts.args.join(' ')
    const messages = [{ role: 'user', content: projectContext ? `[Context: ${projectContext}]\n\n${question}` : question }]
    try {
      if (provider === 'claude') {
        _permissionMode = 'auto'
        await claudeAgentLoop(messages, apiKey, model)
      } else {
        const stream = await simpleChat(provider, model, apiKey, messages)
        for await (const text of stream) process.stdout.write(text)
      }
      process.stdout.write('\n')
      saveChatHistory(getChatSessionId(), messages, { provider, model, createdAt: new Date().toISOString() })
    } catch (err) {
      console.error(chalk.red(err.message))
      process.exit(1)
    }
    return
  }

  // Interactive mode — permission mode selection
  const { permMode } = await inquirer.prompt([{
    type: 'list',
    name: 'permMode',
    message: 'Permission mode:',
    choices: [
      { name: 'Ask Permissions — confirm before reading files or running commands', value: 'ask' },
      { name: 'Automatic       — allow all actions without asking', value: 'auto' }
    ]
  }])
  _permissionMode = permMode

  // Chat history — resume or new session
  let sessionId = getChatSessionId()
  let messages = []
  const sessionMeta = { provider, model, createdAt: new Date().toISOString() }

  const sessions = loadChatSessions()
  if (sessions.length) {
    const { resume } = await inquirer.prompt([{
      type: 'list',
      name: 'resume',
      message: 'Chat session:',
      choices: [
        { name: 'New conversation', value: null },
        ...sessions.slice(0, 10).map(s => ({
          name: `${s.id}  ${chalk.dim(getSessionPreview(s))}`,
          value: s.id
        }))
      ]
    }])
    if (resume) {
      const session = sessions.find(s => s.id === resume)
      if (session) {
        sessionId = resume
        messages = session.messages || []
        console.log(chalk.dim(`  Resumed session ${resume} (${messages.length} messages)`))
      }
    }
  }

  console.log(chalk.bold(`\n  smbls ask`) + chalk.dim(` — ${provider}/${model}\n`))
  renderStatusBar()
  console.log()
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: getPrompt(),
    completer
  })
  _rl = rl

  // Ctrl+T to toggle permission mode
  const origEmit = process.stdin.emit.bind(process.stdin)
  process.stdin.emit = function (event, ...args) {
    if (event === 'keypress') {
      const key = args[1]
      if (key && key.ctrl && key.name === 't') {
        toggleMode()
        return true
      }
    }
    return origEmit(event, ...args)
  }

  rl.prompt()

  rl.on('line', async (line) => {
    const input = line.trim()
    if (!input) { rl.prompt(); return }

    if (input === '/exit' || input === '/quit') {
      console.log(chalk.dim('  Goodbye.'))
      rl.close()
      process.exit(0)
    }

    if (input === '/clear') {
      messages.length = 0
      sessionId = getChatSessionId()
      sessionMeta.createdAt = new Date().toISOString()
      console.log(chalk.dim('  Conversation cleared. New session: ' + sessionId))
      rl.prompt()
      return
    }

    if (input === '/config') {
      await runInit()
      aiConfig = loadAiConfig()
      provider = aiConfig.provider
      model = aiConfig.model
      apiKey = getApiKey(provider)
      console.log(chalk.dim(`  Now using ${provider}/${model}`))
      rl.prompt()
      return
    }

    if (input === '/mcp') {
      const editors = getMcpEditors()
      if (editors.length) {
        console.log()
        setupMcp(editors, { statusOnly: true })
        console.log()
      } else {
        console.log(chalk.dim('  No AI editors detected. Add symbols-mcp manually:'))
        console.log(chalk.dim('  { "mcpServers": { "symbols-mcp": { "command": "uvx", "args": ["symbols-mcp"] } } }'))
      }
      rl.prompt()
      return
    }

    if (input === '/history') {
      const sessions = loadChatSessions()
      if (!sessions.length) {
        console.log(chalk.dim('  No chat history found.'))
      } else {
        console.log()
        for (const s of sessions.slice(0, 15)) {
          const active = s.id === sessionId ? chalk.green(' (current)') : ''
          console.log(`  ${chalk.dim(s.id)}${active}  ${getSessionPreview(s)}`)
        }
        console.log()
      }
      rl.prompt()
      return
    }

    if (input === '/mode') {
      _permissionMode = _permissionMode === 'ask' ? 'auto' : 'ask'
      rl.setPrompt(getPrompt())
      renderStatusBar()
      rl.prompt()
      return
    }

    const userContent = projectContext && messages.length === 0
      ? `[Context: ${projectContext}]\n\n${input}`
      : input

    messages.push({ role: 'user', content: userContent })

    try {
      process.stdout.write('\n')
      if (provider === 'claude') {
        await claudeAgentLoop(messages, apiKey, model)
      } else {
        const stream = await simpleChat(provider, model, apiKey, messages)
        let response = ''
        for await (const text of stream) {
          process.stdout.write(text)
          response += text
        }
        messages.push({ role: 'assistant', content: response })
      }
      process.stdout.write('\n\n')
      saveChatHistory(sessionId, messages, sessionMeta)
    } catch (err) {
      console.error(chalk.red('\n  Error: ' + err.message))
      messages.pop()
    }

    rl.setPrompt(getPrompt())
    rl.prompt()
  })

  rl.on('close', () => process.exit(0))
}

program
  .command('ask [question...]')
  .description('Chat with AI about your Symbols project')
  .option('--provider <provider>', 'AI provider: claude, openai, gemini, ollama')
  .option('--model <model>', 'Model name')
  .option('--init', 'Configure AI settings and MCP')
  .action(async (question, opts) => {
    if (opts.init) {
      await runInit()
      return
    }
    await startChat({ ...opts, args: question?.length ? question : null })
  })
