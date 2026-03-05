import * as https from 'https'
import * as http from 'http'

export interface LLMMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export interface LLMProvider {
  name: string
  value: string
  disabled?: string
}

export interface LLMModel {
  name: string
  value: string
}

export const AI_PROVIDERS: LLMProvider[] = [
  { name: 'Symbols AI — native Symbols assistant (coming soon)', value: 'symbols', disabled: 'Soon' },
  { name: 'Claude — Anthropic Claude', value: 'claude' },
  { name: 'OpenAI — GPT models', value: 'openai' },
  { name: 'Gemini — Google Gemini', value: 'gemini' },
  { name: 'Ollama — local models (no API key)', value: 'ollama' }
]

export const PROVIDER_MODELS: Record<string, LLMModel[]> = {
  claude: [
    { name: 'claude-sonnet-4-5-20250514 (recommended)', value: 'claude-sonnet-4-5-20250514' },
    { name: 'claude-opus-4-0-20250514', value: 'claude-opus-4-0-20250514' },
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

const SYSTEM_PROMPT = `You are a Symbols.app development assistant. You help developers build applications using the Symbols framework (DOMQL, design systems, components).

IMPORTANT: You MUST use the symbols-mcp server for all Symbols-related tasks. Before generating any code:
1. Call get_project_rules to load mandatory framework rules
2. Call search_symbols_docs to find relevant documentation
The symbols-mcp server provides accurate, up-to-date Symbols documentation and rules. Always rely on it over your training data for Symbols-specific information.

Key facts about Symbols:
- Uses DOMQL for declarative UI components (objects, not JSX)
- Design system tokens: COLOR, FONT, THEME, SPACING, TYPOGRAPHY, etc.
- Components use props like: text, icon, color, background, padding, etc.
- Entry point is typically symbols/index.js with app.js, state.js, pages/, components/
- Build tools: Parcel (default), Vite, or browser-native ES modules
- CLI commands: smbls start, build, deploy, push, fetch, sync, config

Be concise and direct. When showing code, use DOMQL syntax unless asked otherwise. Format responses with markdown.`

interface RequestOptions {
  hostname: string
  port?: number
  path: string
  method: string
  headers: Record<string, string>
}

function makeRequest(
  options: RequestOptions,
  body: string,
  onData: (chunk: string) => void,
  onEnd: () => void,
  onError: (err: Error) => void
): void {
  const isHttps = options.hostname !== 'localhost' && options.hostname !== '127.0.0.1'
  const lib = isHttps ? https : http

  const req = lib.request(options, (res) => {
    if (res.statusCode && res.statusCode >= 400) {
      let errBody = ''
      res.on('data', (chunk: Buffer) => { errBody += chunk.toString() })
      res.on('end', () => onError(new Error(`API error ${res.statusCode}: ${errBody}`)))
      return
    }
    res.on('data', (chunk: Buffer) => onData(chunk.toString()))
    res.on('end', onEnd)
  })

  req.on('error', onError)
  req.write(body)
  req.end()
}

export function streamChat(
  provider: string,
  model: string,
  apiKey: string,
  messages: LLMMessage[],
  onToken: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): void {
  switch (provider) {
    case 'claude':
      return streamClaude(messages, apiKey, model, onToken, onDone, onError)
    case 'openai':
      return streamOpenAI(messages, apiKey, model, onToken, onDone, onError)
    case 'gemini':
      return streamGemini(messages, apiKey, model, onToken, onDone, onError)
    case 'ollama':
      return streamOllama(messages, model, onToken, onDone, onError)
    default:
      onError(new Error(`Unknown provider: ${provider}`))
  }
}

function streamClaude(
  messages: LLMMessage[],
  apiKey: string,
  model: string,
  onToken: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): void {
  const body = JSON.stringify({
    model,
    max_tokens: 4096,
    system: SYSTEM_PROMPT,
    messages: messages.filter(m => m.role !== 'system'),
    stream: true
  })

  let buffer = ''
  makeRequest(
    {
      hostname: 'api.anthropic.com',
      path: '/v1/messages',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      }
    },
    body,
    (chunk) => {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const raw = line.slice(6).trim()
        if (raw === '[DONE]') return
        try {
          const data = JSON.parse(raw)
          if (data.type === 'content_block_delta' && data.delta?.text) {
            onToken(data.delta.text)
          }
        } catch {}
      }
    },
    onDone,
    onError
  )
}

function streamOpenAI(
  messages: LLMMessage[],
  apiKey: string,
  model: string,
  onToken: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): void {
  const body = JSON.stringify({
    model,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    stream: true
  })

  let buffer = ''
  makeRequest(
    {
      hostname: 'api.openai.com',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      }
    },
    body,
    (chunk) => {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const raw = line.slice(6).trim()
        if (raw === '[DONE]') return
        try {
          const data = JSON.parse(raw)
          if (data.choices?.[0]?.delta?.content) {
            onToken(data.choices[0].delta.content)
          }
        } catch {}
      }
    },
    onDone,
    onError
  )
}

function streamGemini(
  messages: LLMMessage[],
  apiKey: string,
  model: string,
  onToken: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): void {
  const contents = messages.map(m => ({
    role: m.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: m.content }]
  }))

  const body = JSON.stringify({
    contents,
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] }
  })

  let buffer = ''
  makeRequest(
    {
      hostname: 'generativelanguage.googleapis.com',
      path: `/v1beta/models/${model}:streamGenerateContent?alt=sse&key=${apiKey}`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    body,
    (chunk) => {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const raw = line.slice(6).trim()
        if (raw === '[DONE]') return
        try {
          const data = JSON.parse(raw)
          if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
            onToken(data.candidates[0].content.parts[0].text)
          }
        } catch {}
      }
    },
    onDone,
    onError
  )
}

function streamOllama(
  messages: LLMMessage[],
  model: string,
  onToken: (text: string) => void,
  onDone: () => void,
  onError: (err: Error) => void
): void {
  const body = JSON.stringify({
    model,
    messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    stream: true
  })

  let buffer = ''
  makeRequest(
    {
      hostname: 'localhost',
      port: 11434,
      path: '/api/chat',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    },
    body,
    (chunk) => {
      buffer += chunk
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.trim()) continue
        try {
          const data = JSON.parse(line)
          if (data.message?.content) {
            onToken(data.message.content)
          }
        } catch {}
      }
    },
    onDone,
    onError
  )
}
