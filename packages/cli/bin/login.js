'use strict'

import inquirer from 'inquirer'
import fs from 'fs'
import path from 'path'
import os from 'os'
import chalk from 'chalk'
import { program } from './program.js'
import { getApiUrl } from '../helpers/config.js'

const RC_FILE = '.smblsrc'

// Helper to manage credentials
export class CredentialManager {
  constructor () {
    this.rcPath = path.join(os.homedir(), RC_FILE)
  }

  // Load credentials from rc file
  loadCredentials () {
    try {
      const data = fs.readFileSync(this.rcPath, 'utf8')
      return JSON.parse(data)
    } catch (err) {
      return {}
    }
  }

  // Save credentials to rc file
  saveCredentials (credentials) {
    try {
      fs.writeFileSync(this.rcPath, JSON.stringify(credentials, null, 2))
      return true
    } catch (err) {
      console.error('Failed to save credentials:', err)
      return false
    }
  }

  // Get stored auth token
  getAuthToken () {
    const creds = this.loadCredentials()
    return creds.authToken
  }

  // Clear stored credentials
  clearCredentials () {
    try {
      fs.unlinkSync(this.rcPath)
      return true
    } catch (err) {
      return false
    }
  }
}

program
  .command('login')
  .description('Sign in to Symbols')
  .action(async () => {
    console.log('yo login')

    console.log(getApiUrl())

    // Prompt for credentials
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Enter your email:',
        validate: input => input.includes('@') || 'Please enter a valid email'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your password:',
        validate: input => input.length >= 6 || 'Password must be at least 6 characters'
      }
    ])

    try {
      // Make login request
      const response = await fetch(`${getApiUrl()}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: answers.email,
          password: answers.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed')
      }

      // Save credentials
      const credManager = new CredentialManager()
      credManager.saveCredentials({
        authToken: data.token,
        userId: data.userId,
        email: answers.email
      })

      console.log(chalk.green('\nSuccessfully logged in!'))
      console.log(chalk.dim(`Credentials saved to ${credManager.rcPath}`))
    } catch (error) {
      console.error(chalk.red('\nLogin failed:'), error.message)
      process.exit(1)
    }
  })
