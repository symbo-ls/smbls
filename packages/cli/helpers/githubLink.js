import fs from 'fs'
import path from 'path'

import { getConfigPaths, loadCliConfig } from './config.js'

function readJsonSafe (filePath) {
  try {
    if (!fs.existsSync(filePath)) return null
    const raw = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(raw)
  } catch (_) {
    return null
  }
}

function writeJsonSafe (filePath, data) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getGitHubLinkPath () {
  const { symbolsDir } = getConfigPaths()
  return path.join(symbolsDir, 'github.json')
}

export function loadGitHubLink () {
  const p = getGitHubLinkPath()
  const raw = readJsonSafe(p)
  return raw && typeof raw === 'object' ? raw : null
}

export function saveGitHubLink (partial) {
  const existing = loadGitHubLink() || {}
  const cliConfig = loadCliConfig()
  const next = {
    apiBaseUrl: partial.apiBaseUrl || existing.apiBaseUrl || cliConfig.apiBaseUrl,
    projectId: partial.projectId || existing.projectId || cliConfig.projectId || null,
    integrationId: partial.integrationId || existing.integrationId || null,
    connectorId: partial.connectorId || existing.connectorId || null,
    repository: partial.repository || existing.repository || null
  }
  const p = getGitHubLinkPath()
  writeJsonSafe(p, next)
  return next
}
