import fs from 'fs'
import path from 'path'

function ensureDir (dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch (_) {}
}

function readJsonSafe (filePath) {
  try {
    if (!fs.existsSync(filePath)) return null
    const content = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(content)
  } catch (_) {
    return null
  }
}

function writeJsonSafe (filePath, data) {
  ensureDir(path.dirname(filePath))
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

export function getProjectConfigPaths (baseDir) {
  const root = path.resolve(baseDir || process.cwd())
  const symbolsLocalDir = path.join(root, '.symbols_local')
  return {
    root,
    symbolsLocalDir,
    configPath: path.join(symbolsLocalDir, 'config.json'),
    lockPath: path.join(symbolsLocalDir, 'lock.json'),
    legacySymbolsJson: path.join(root, 'symbols.json')
  }
}

export function linkWorkspaceToProject ({
  baseDir,
  apiBaseUrl,
  projectKey,
  projectId,
  branch = 'main',
  legacyPatch
}) {
  const paths = getProjectConfigPaths(baseDir)

  // Tooling + API → .symbols_local/config.json
  const currentConfig = readJsonSafe(paths.configPath) || {}
  const nextConfig = {
    ...currentConfig,
    apiBaseUrl: apiBaseUrl || currentConfig.apiBaseUrl,
    projectKey: projectKey || currentConfig.projectKey,
    projectId: projectId || currentConfig.projectId
  }
  writeJsonSafe(paths.configPath, nextConfig)

  // Branch + version → .symbols_local/lock.json
  const currentLock = readJsonSafe(paths.lockPath) || {}
  const nextLock = {
    ...currentLock,
    branch: branch || currentLock.branch || 'main',
    projectId: projectId || currentLock.projectId,
    version: legacyPatch?.version || currentLock.version,
    versionId: legacyPatch?.versionId || currentLock.versionId
  }
  writeJsonSafe(paths.lockPath, nextLock)

  // Project identity → symbols.json
  const legacy = readJsonSafe(paths.legacySymbolsJson) || {}
  const nextLegacy = {
    ...legacy,
    key: projectKey || legacy.key
  }
  writeJsonSafe(paths.legacySymbolsJson, nextLegacy)

  return { paths, config: nextConfig, lock: nextLock, legacy: nextLegacy }
}
