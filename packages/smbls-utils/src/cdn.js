'use strict'

function onlyDotsAndNumbers (str) {
  return /^[0-9.]+$/.test(str) && str !== ''
}

export const CDN_PROVIDERS = {
  skypack: {
    url: 'https://cdn.skypack.dev',
    formatUrl: (pkg, version) =>
      `${CDN_PROVIDERS.skypack.url}/${pkg}${version !== 'latest' ? `@${version}` : ''}`
  },
  esmsh: {
    url: 'https://esm.sh',
    formatUrl: (pkg, version) =>
      `${CDN_PROVIDERS.esmsh.url}/${pkg}${version !== 'latest' ? `@${version}` : ''}`
  },
  unpkg: {
    url: 'https://unpkg.com',
    formatUrl: (pkg, version) =>
      `${CDN_PROVIDERS.unpkg.url}/${pkg}${version !== 'latest' ? `@${version}` : ''}?module`
  },
  jsdelivr: {
    url: 'https://cdn.jsdelivr.net/npm',
    formatUrl: (pkg, version) =>
      `${CDN_PROVIDERS.jsdelivr.url}/${pkg}${version !== 'latest' ? `@${version}` : ''}/+esm`
  },
  symbols: {
    url: 'https://pkg.symbo.ls',
    formatUrl: (pkg, version) => {
      if (pkg.split('/').length > 2 || !onlyDotsAndNumbers(version)) {
        return `${CDN_PROVIDERS.symbols.url}/${pkg}`
      }
      return `${CDN_PROVIDERS.symbols.url}/${pkg}/${version}.js`
    }
  }
}

// Maps symbols.json packageManager values to CDN_PROVIDERS keys
export const PACKAGE_MANAGER_TO_CDN = {
  'esm.sh': 'esmsh',
  'unpkg': 'unpkg',
  'skypack': 'skypack',
  'jsdelivr': 'jsdelivr',
  'pkg.symbo.ls': 'symbols'
}

/**
 * Derive the CDN provider key from a symbols config object.
 * Returns null when packageManager is a local tool (npm/yarn/pnpm/bun).
 */
export const getCdnProviderFromConfig = (symbolsConfig = {}) => {
  const { packageManager } = symbolsConfig
  return PACKAGE_MANAGER_TO_CDN[packageManager] || null
}

export const getCDNUrl = (
  packageName,
  version = 'latest',
  provider = 'esmsh'
) => {
  const cdnConfig = CDN_PROVIDERS[provider] || CDN_PROVIDERS.esmsh
  return cdnConfig.formatUrl(packageName, version)
}

/**
 * Generate an HTML <script type="importmap"> tag from project dependencies.
 */
export const getImportMapScript = (data, defaultProvider = 'skypack') => {
  const dependencies = data.dependencies || {}
  const keys = Object.keys(dependencies)
  if (!keys.length) return ''

  const imports = {}
  for (const pkgName of keys) {
    const version = dependencies[pkgName] || 'latest'
    imports[pkgName] = getCDNUrl(pkgName, version, defaultProvider)
  }

  return `<script type="importmap">{
    "imports": ${JSON.stringify(imports, null, 2)}
  }</script>`
}
