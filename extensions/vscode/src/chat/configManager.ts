import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

export interface AiConfig {
  provider?: string
  model?: string
  claudeApiKey?: string
  openaiApiKey?: string
  geminiApiKey?: string
}

const CONFIG_PATH = path.join(os.homedir(), '.smblsrc')

const ENV_KEY_NAMES: Record<string, string> = {
  claude: 'ANTHROPIC_API_KEY',
  openai: 'OPENAI_API_KEY',
  gemini: 'GEMINI_API_KEY'
}

export function loadAiConfig(): AiConfig {
  try {
    const data = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
    return data.ai || {}
  } catch {
    return {}
  }
}

export function saveAiConfig(aiConfig: Partial<AiConfig>): void {
  let data: Record<string, any> = {}
  try {
    data = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
  } catch {}
  data.ai = { ...data.ai, ...aiConfig }
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(data, null, 2) + '\n')
}

export function getApiKey(provider: string): string | null {
  const envName = ENV_KEY_NAMES[provider]
  if (envName && process.env[envName]) return process.env[envName]!
  const config = loadAiConfig()
  return (config as any)[`${provider}ApiKey`] || null
}

export function setApiKey(provider: string, key: string): void {
  saveAiConfig({ [`${provider}ApiKey`]: key } as any)
}
