import fs from 'fs'
import path from 'path'

function ensureDir (dir) {
  try {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  } catch (_) {
    // ignore
  }
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
  const symbolsDir = path.join(root, '.symbols')
  return {
    root,
    symbolsDir,
    configPath: path.join(symbolsDir, 'config.json'),
    legacySymbolsJson: path.join(root, 'symbols.json')
  }
}

export function linkWorkspaceToProject ({
  baseDir,
  apiBaseUrl,
  projectKey,
  projectId,
  branch = 'main'
}) {
  const paths = getProjectConfigPaths(baseDir)
  const currentConfig = readJsonSafe(paths.configPath) || {}
  const nextConfig = {
    ...currentConfig,
    apiBaseUrl: apiBaseUrl || currentConfig.apiBaseUrl,
    projectKey: projectKey || currentConfig.projectKey,
    projectId: projectId || currentConfig.projectId,
    branch: branch || currentConfig.branch || 'main'
  }
  writeJsonSafe(paths.configPath, nextConfig)

  const legacy = readJsonSafe(paths.legacySymbolsJson) || {}
  const nextLegacy = {
    ...legacy,
    key: projectKey || legacy.key,
    branch: branch || legacy.branch || 'main'
  }
  writeJsonSafe(paths.legacySymbolsJson, nextLegacy)

  return { paths, config: nextConfig, legacy: nextLegacy }
}
