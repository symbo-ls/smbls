import * as https from 'https'
import * as fs from 'fs'
import * as path from 'path'
import * as os from 'os'

const DEFAULT_API = 'https://api.symbols.app'
const RC_PATH = path.join(os.homedir(), '.smblsrc')

interface RcState {
  profiles?: Record<string, any>
  currentApiBaseUrl?: string
  authToken?: string
  token?: string
  accessToken?: string
  jwt?: string
}

function loadRcState(): RcState {
  try {
    return JSON.parse(fs.readFileSync(RC_PATH, 'utf8'))
  } catch {
    return {}
  }
}

export function getApiBaseUrl(): string {
  const env = process.env.SYMBOLS_API_BASE_URL || process.env.SMBLS_API_URL
  if (env) return env
  const state = loadRcState()
  return state.currentApiBaseUrl || DEFAULT_API
}

export function getAuthToken(): string | null {
  const env = process.env.SYMBOLS_TOKEN || process.env.SMBLS_TOKEN
  if (env) return env

  const state = loadRcState()
  const baseUrl = state.currentApiBaseUrl || DEFAULT_API

  if (state.profiles && typeof state.profiles === 'object') {
    const profile = state.profiles[baseUrl] || {}
    return profile.authToken || profile.token || profile.accessToken || profile.jwt || null
  }

  return state.authToken || state.token || state.accessToken || state.jwt || null
}

export function getProjectKey(): string | null {
  // Check workspace symbols.json first
  const env = process.env.SYMBOLS_PROJECT_KEY
  if (env) return env
  return null
}

export interface LibraryItem {
  id?: string
  _id?: string
  name?: string
  key?: string
  description?: string
  framework?: string
  deprecated?: boolean
}

interface ApiResponse {
  items?: LibraryItem[]
  data?: LibraryItem[]
  libraries?: LibraryItem[]
}

function apiRequest(
  method: string,
  pathname: string,
  query?: Record<string, string>,
  body?: any
): Promise<any> {
  return new Promise((resolve, reject) => {
    const baseUrl = getApiBaseUrl()
    const url = new URL(`${baseUrl}${pathname.startsWith('/') ? '' : '/'}${pathname}`)
    if (query) {
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null && v !== '') {
          url.searchParams.set(k, v)
        }
      }
    }

    const authToken = getAuthToken()
    const headers: Record<string, string> = {}
    if (authToken) headers['Authorization'] = `Bearer ${authToken}`
    if (body) headers['Content-Type'] = 'application/json'

    const bodyStr = body ? JSON.stringify(body) : undefined

    const options = {
      hostname: url.hostname,
      port: url.port || undefined,
      path: url.pathname + url.search,
      method,
      headers
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', (chunk: Buffer) => { data += chunk.toString() })
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) {
          try {
            const parsed = JSON.parse(data)
            reject(new Error(parsed.message || `API error ${res.statusCode}`))
          } catch {
            reject(new Error(`API error ${res.statusCode}: ${data}`))
          }
          return
        }
        try {
          const json = JSON.parse(data)
          resolve(json.data || json)
        } catch {
          resolve(data)
        }
      })
    })

    req.on('error', reject)
    if (bodyStr) req.write(bodyStr)
    req.end()
  })
}

function extractItems(payload: any): LibraryItem[] {
  if (Array.isArray(payload?.items)) return payload.items
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.data)) return payload.data
  if (Array.isArray(payload?.libraries)) return payload.libraries
  return []
}

export async function listAvailableLibraries(opts?: {
  page?: number
  limit?: number
  search?: string
  framework?: string
}): Promise<LibraryItem[]> {
  const query: Record<string, string> = {}
  if (opts?.page) query.page = String(opts.page)
  if (opts?.limit) query.limit = String(opts.limit)
  if (opts?.search) query.search = opts.search
  if (opts?.framework) query.framework = opts.framework

  const payload = await apiRequest('GET', '/core/projects/libraries/available', query)
  return extractItems(payload)
}

export async function listProjectLibraries(projectId: string): Promise<LibraryItem[]> {
  const payload = await apiRequest('GET', `/core/projects/${encodeURIComponent(projectId)}/libraries`)
  return extractItems(payload)
}

export async function addProjectLibraries(projectId: string, libraryIds: string[]): Promise<any> {
  return apiRequest('POST', `/core/projects/${encodeURIComponent(projectId)}/libraries`, undefined, { libraryIds })
}

export async function removeProjectLibraries(projectId: string, libraryIds: string[]): Promise<any> {
  return apiRequest('DELETE', `/core/projects/${encodeURIComponent(projectId)}/libraries`, undefined, { libraryIds })
}

export function isAuthenticated(): boolean {
  return !!getAuthToken()
}

export function resolveProjectId(workspaceRoot?: string): string | null {
  // Try env
  const envId = process.env.SYMBOLS_PROJECT_ID
  if (envId) return envId

  if (!workspaceRoot) return null

  // Try .symbols_cache/config.json
  try {
    const configPath = path.join(workspaceRoot, '.symbols_cache', 'config.json')
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
    if (config.projectId) return config.projectId
  } catch {}

  // Try .symbols_cache/lock.json
  try {
    const lockPath = path.join(workspaceRoot, '.symbols_cache', 'lock.json')
    const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'))
    if (lock.projectId) return lock.projectId
  } catch {}

  return null
}
