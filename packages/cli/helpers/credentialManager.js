import fs from 'fs'
import path from 'path'
import os from 'os'

const RC_FILE = '.smblsrc'

export class CredentialManager {
  constructor() {
    this.rcPath = path.join(os.homedir(), RC_FILE)
  }

  // Load credentials from rc file
  loadCredentials() {
    try {
      const data = fs.readFileSync(this.rcPath, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      return {}
    }
  }

  // Save credentials to rc file
  saveCredentials(credentials) {
    try {
      const existing = this.loadCredentials()
      const merged = { ...existing, ...credentials }
      fs.writeFileSync(this.rcPath, JSON.stringify(merged, null, 2))
      return true
    } catch (err) {
      console.error('Failed to save credentials:', err)
      return false
    }
  }

  // Get stored auth token
  getAuthToken() {
    const envToken = process.env.SYMBOLS_TOKEN || process.env.SMBLS_TOKEN
    if (envToken) return envToken
    const creds = this.loadCredentials()
    return creds.authToken || creds.token || creds.accessToken || creds.jwt
  }

  // Ensure token presence; returns token or null
  ensureAuthToken() {
    const token = this.getAuthToken()
    return token || null
  }

  // Optional: get refresh token if present
  getRefreshToken() {
    const envToken = process.env.SYMBOLS_REFRESH_TOKEN
    if (envToken) return envToken
    const creds = this.loadCredentials()
    return creds.refreshToken || null
  }

  // Clear stored credentials
  clearCredentials() {
    try {
      fs.unlinkSync(this.rcPath)
      return true
    } catch (err) {
      return false
    }
  }
}