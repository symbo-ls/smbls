import fs from 'fs'
import path from 'path'

export const getApiUrl = () => {
  if (process.env.SMBLS_API_URL) {
    return process.env.SMBLS_API_URL
  }

  const configPath = path.join(process.cwd(), '.smblsrc.json')
  if (fs.existsSync(configPath)) {
    try {
      const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))
      if (config.apiUrl) return config.apiUrl
    } catch (err) {
      // Silently fail and use defaults if config file is invalid
    }
  }

  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.production-domain.com'
    case 'staging':
      return 'https://api.staging-domain.com'
    default:
      return 'http://localhost:13335'
  }
}