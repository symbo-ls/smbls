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

program
  .command('login')
  .description('Sign in to Symbols')
  .action(async () => {
    console.log(chalk.cyan('\n🔑 Welcome to Symbols CLI'))
    console.log(chalk.white('\nPlease sign in with your Symbols account:'))
    console.log(chalk.dim('Don\'t have an account? Visit https://symbols.app/signup\n'))

    // Prompt for credentials
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: input => input.includes('@') || '❌ Please enter a valid email address'
      },
      {
        type: 'password',
        name: 'password',
        message: 'Password:',
        validate: input => input.length >= 6 || '❌ Password must be at least 6 characters'
      }
    ])

    try {
      // Make login request
      console.log(chalk.dim('\nAuthenticating...'))
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

      console.log(chalk.green('\n✨ Successfully logged in!'))
      console.log(chalk.white('\nYou can now use Symbols CLI commands:'))
      console.log(chalk.cyan('  smbls fetch    ') + chalk.dim('Fetch your design system'))
      console.log(chalk.cyan('  smbls sync     ') + chalk.dim('Sync local changes'))
      console.log(chalk.cyan('  smbls push     ') + chalk.dim('Push updates to Symbols'))

      console.log(chalk.dim(`\nCredentials saved to ${credManager.rcPath}`))
      console.log(chalk.dim('For more commands, run: smbls --help\n'))

    } catch (error) {
      console.log(chalk.red('\n❌ Login failed'))
      console.log(chalk.yellow('\nPossible issues:'))
      console.log(chalk.dim('• Invalid email or password'))
      console.log(chalk.dim('• Network connection problem'))
      console.log(chalk.dim('• Server may be temporarily unavailable'))

      console.log(chalk.white('\nNeed help?'))
      console.log(chalk.dim('• Reset password: https://symbols.app/reset-password'))
      console.log(chalk.dim('• Contact support: support@symbols.app'))
      console.log(chalk.dim('• Documentation: https://symbols.app/docs/cli\n'))

      process.exit(1)
    }
  })
