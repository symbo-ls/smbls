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
      fs.writeFileSync(this.rcPath, JSON.stringify(credentials, null, 2))
      return true
    } catch (err) {
      console.error('Failed to save credentials:', err)
      return false
    }
  }

  // Get stored auth token
  getAuthToken() {
    const creds = this.loadCredentials()
    return creds.authToken
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