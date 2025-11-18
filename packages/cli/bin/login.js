'use strict'

import inquirer from 'inquirer'
import chalk from 'chalk'
import { program } from './program.js'
import { getApiUrl, saveCliConfig, loadCliConfig } from '../helpers/config.js'
import { CredentialManager } from '../helpers/credentialManager.js'

function websiteFromApi(apiBaseUrl) {
  try {
    const u = new URL(apiBaseUrl)
    const host = u.host
    if (apiBaseUrl.startsWith('http://localhost')) return 'http://localhost:1024'
    if (host === 'api.dev.symbols.app') return 'https://dev.symbols.app'
    if (host === 'api.staging.symbols.app') return 'https://staging.symbols.app'
    if (host === 'api.test.symbols.app') return 'https://test.symbols.app'
    if (host === 'api.symbols.app') return 'https://symbols.app'
    // Fallback: strip leading api.
    if (host.startsWith('api.')) return `https://${host.replace(/^api\./, '')}`
    return `${u.protocol}//${host}`
  } catch (_) {
    return 'https://symbols.app'
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
    const currentConfig = loadCliConfig()
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiBaseUrl',
        message: 'API Base URL:',
        default: currentConfig.apiBaseUrl || getApiUrl(),
        validate: input => /^https?:\/\//.test(input) || '❌ Please enter a valid URL'
      },
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
      const response = await fetch(`${answers.apiBaseUrl}/core/auth/login`, {
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
        const msg = data?.message || data?.error || `Authentication failed (${response.status})`
        const err = new Error(msg)
        err.response = { status: response.status, data }
        throw err
      }

      // Extract token from various possible shapes
      const user = data?.data?.user || data?.user
      const tokens = data?.data?.tokens || data?.tokens || {}
      const token =
        tokens?.accessToken ||
        data?.token ||
        data?.accessToken ||
        data?.jwt ||
        data?.data?.token ||
        data?.data?.accessToken ||
        data?.data?.jwt
      if (!token) {
        throw new Error('Login succeeded but no token was returned by the server')
      }
      const refreshToken = tokens?.refreshToken || null
      const accessTokenExp = tokens?.accessTokenExp?.expiresAt || null

      // Save credentials
      const credManager = new CredentialManager()
      credManager.saveCredentials({
        authToken: token,
        refreshToken,
        authTokenExpiresAt: accessTokenExp,
        userId: user?.id || data?.userId,
        email: user?.email || answers.email
      })

      // Persist API base URL to local config
      saveCliConfig({ apiBaseUrl: answers.apiBaseUrl })

      console.log(chalk.green('\n✨ Successfully logged in!'))
      console.log(chalk.white('\nYou can now use Symbols CLI commands:'))
      console.log(chalk.cyan('  smbls fetch    ') + chalk.dim('Fetch your design system'))
      console.log(chalk.cyan('  smbls sync     ') + chalk.dim('Sync local changes'))
      console.log(chalk.cyan('  smbls push     ') + chalk.dim('Push updates to Symbols'))

      console.log(chalk.dim(`\nCredentials saved to ${credManager.rcPath}`))
      console.log(chalk.dim('For more commands, run: smbls --help\n'))

    } catch (error) {
      const website = websiteFromApi(answers.apiBaseUrl)
      console.log(chalk.red('\n❌ Login failed'))
      console.log(chalk.white('\nError:'))
      console.log(chalk.yellow(error.message || 'Unknown error'))

      console.log(chalk.white('\nNeed help?'))
      console.log(chalk.dim(`• Reset password: ${website}/reset-password`))
      console.log(chalk.dim('• Contact support: support@symbols.app'))
      console.log(chalk.dim(`• Documentation: ${website}/docs/cli\n`))

      process.exit(1)
    }
  })
