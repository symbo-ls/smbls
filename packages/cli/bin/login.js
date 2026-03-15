'use strict'

import inquirer from 'inquirer'
import chalk from 'chalk'
import crypto from 'crypto'
import { spawn } from 'child_process'
import { program } from './program.js'
import { getApiUrl, saveCliConfig, loadCliConfig } from '../helpers/config.js'
import { CredentialManager } from '../helpers/credentialManager.js'

function websiteFromApi(apiBaseUrl) {
  try {
    const u = new URL(apiBaseUrl)
    const host = u.host
    if (apiBaseUrl.startsWith('http://localhost')) return 'https://2dd379117f83.ngrok-free.app'
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

function openBrowser(url) {
  try {
    const platform = process.platform
    if (platform === 'darwin') {
      spawn('open', [url], { stdio: 'ignore', detached: true }).unref()
      return true
    }
    if (platform === 'win32') {
      // Use cmd's "start" to open default browser
      spawn('cmd', ['/c', 'start', '', url], { stdio: 'ignore', detached: true }).unref()
      return true
    }
    // linux, etc.
    spawn('xdg-open', [url], { stdio: 'ignore', detached: true }).unref()
    return true
  } catch (_) {
    return false
  }
}

function extractAuthFromResponse(data) {
  const user = data?.data?.user || data?.user
  const tokens = data?.data?.tokens || data?.tokens || {}
  const accessToken =
    tokens?.accessToken ||
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.accessToken ||
    data?.data?.jwt
  const refreshToken = tokens?.refreshToken || null
  const accessTokenExp = tokens?.accessTokenExp?.expiresAt || tokens?.accessTokenExp || null
  return { user, accessToken, refreshToken, accessTokenExp }
}

function randomVerifier(len = 64) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~'
  let out = ''
  for (let i = 0; i < len; i++) out += chars.charAt(Math.floor(Math.random() * chars.length))
  return out
}

function base64urlFromBuffer(buf) {
  return Buffer.from(buf)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '')
}

function sha256Base64url(input) {
  const digest = crypto.createHash('sha256').update(input).digest()
  return base64urlFromBuffer(digest)
}

function extractSessionStatus(data) {
  return (
    data?.status ||
    data?.data?.status ||
    data?.state ||
    data?.data?.state ||
    null
  )
}

function extractConfirmToken(data) {
  return (
    data?.access_token ||
    data?.data?.access_token ||
    data?.token ||
    data?.data?.token ||
    null
  )
}

function withCliSessionKeyHeaders(headers, cliSessionKey) {
  if (!cliSessionKey) return headers
  return { ...headers, 'X-Symbols-Cli-Session-Key': cliSessionKey }
}

program
  .command('login')
  .description('Sign in to Symbols')
  .option('--non-interactive', 'Disable prompts (require --token or --email + --password)', false)
  .option('--api-base-url <url>', 'API base URL')
  .option('--token <token>', 'Auth token (for CI/scripts)')
  .option('--email <email>', 'Email for password login')
  .option('--password <password>', 'Password for password login')
  .action(async (opts) => {
    const currentConfig = loadCliConfig()
    const credManager = new CredentialManager()
    const interactive = !!(process.stdin?.isTTY && process.stdout?.isTTY && !opts.nonInteractive)
    const envApiBaseUrl = process.env.SYMBOLS_API_BASE_URL || process.env.SMBLS_API_URL
    const defaultApiBaseUrl =
      envApiBaseUrl || credManager.getCurrentApiBaseUrl() || currentConfig.apiBaseUrl || getApiUrl()

    // Non-interactive token login (for CI)
    if (opts.token) {
      const apiBaseUrl = opts.apiBaseUrl || defaultApiBaseUrl
      credManager.saveCredentials({
        apiBaseUrl,
        authToken: opts.token,
        refreshToken: null,
        authTokenExpiresAt: null,
        userId: null,
        email: opts.email || null
      })
      saveCliConfig({ apiBaseUrl })
      console.log(chalk.green('Token saved.'))
      console.log(chalk.dim(`API: ${apiBaseUrl}`))
      return
    }

    // Non-interactive password login
    if (!interactive && opts.email && opts.password) {
      const apiBaseUrl = opts.apiBaseUrl || defaultApiBaseUrl
      try {
        console.log(chalk.dim('Authenticating...'))
        const response = await fetch(`${apiBaseUrl}/core/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: opts.email, password: opts.password })
        })
        const data = await response.json()
        if (!response.ok) {
          throw new Error(data?.message || data?.error || `Authentication failed (${response.status})`)
        }
        const { user, accessToken, refreshToken, accessTokenExp } = extractAuthFromResponse(data)
        if (!accessToken) throw new Error('Login succeeded but no token was returned')
        credManager.saveCredentials({
          apiBaseUrl,
          authToken: accessToken,
          refreshToken,
          authTokenExpiresAt: accessTokenExp,
          userId: user?.id || data?.userId,
          email: user?.email || opts.email
        })
        saveCliConfig({ apiBaseUrl })
        console.log(chalk.green('Successfully logged in!'))
        return
      } catch (error) {
        console.error(chalk.red('Login failed:'), error.message)
        process.exit(1)
      }
    }

    if (!interactive) {
      console.error(chalk.red('Login requires --token or --email + --password when prompts are disabled.'))
      console.error(chalk.dim('Re-run with credentials or use an interactive terminal.'))
      process.exit(1)
    }

    console.log(chalk.cyan('\n🔑 Welcome to Symbols CLI'))
    console.log(chalk.white('\nPlease sign in with your Symbols account:'))
    console.log(chalk.dim('Don\'t have an account? Visit https://symbols.app/signup\n'))

    const first = await inquirer.prompt([
      {
        type: 'input',
        name: 'apiBaseUrl',
        message: 'API Base URL:',
        default: opts.apiBaseUrl || defaultApiBaseUrl,
        validate: input => /^https?:\/\//.test(input) || '❌ Please enter a valid URL'
      },
      {
        type: 'list',
        name: 'method',
        message: 'Sign in method:',
        choices: [
          { name: 'Email + Password', value: 'password' },
          { name: 'Continue with Google (opens browser)', value: 'google_browser' },
          { name: 'Continue with GitHub (opens browser)', value: 'github_browser' },
        ],
        default: 'password',
      },
    ])

    try {
      let data
      let apiBaseUrl = first.apiBaseUrl

      if (first.method === 'password') {
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

        // Make login request
        console.log(chalk.dim('\nAuthenticating...'))
        const response = await fetch(`${apiBaseUrl}/core/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: answers.email, password: answers.password })
        })

        data = await response.json()

        if (!response.ok) {
          const msg = data?.message || data?.error || `Authentication failed (${response.status})`
          const err = new Error(msg)
          err.response = { status: response.status, data }
          throw err
        }
      } else if (first.method === 'google_browser' || first.method === 'github_browser') {
        const defaultCliSessionKey = credManager.getCliSessionKey(apiBaseUrl) || ''
        const { cliSessionKey } = await inquirer.prompt([
          {
            type: 'input',
            name: 'cliSessionKey',
            message: 'CLI session key (for long-lived tokens, optional):',
            default: defaultCliSessionKey,
            filter: (v) => (v || '').trim()
          }
        ])

        // Persist per-server key so users can change it per environment
        // (empty value clears and disables long-lived token request)
        credManager.setCliSessionKey(apiBaseUrl, cliSessionKey)

        const sessionId = crypto.randomUUID()
        const codeVerifier = randomVerifier(64)
        const codeChallenge = sha256Base64url(codeVerifier)

        console.log(chalk.dim('\nCreating secure sign-in session...'))
        const sessionResp = await fetch(`${apiBaseUrl}/core/auth/session`, {
          method: 'POST',
          headers: withCliSessionKeyHeaders({ 'Content-Type': 'application/json' }, cliSessionKey),
          body: JSON.stringify({
            session_id: sessionId,
            code_challenge: codeChallenge,
            plugin_info: { version: 'cli', figma_env: 'cli' },
            ...(cliSessionKey ? { cli_session_key: cliSessionKey } : {})
          })
        })

        const sessionData = await sessionResp.json().catch(async () => ({ message: await sessionResp.text() }))
        if (!sessionResp.ok) {
          const msg = sessionData?.message || sessionData?.error || `Failed to create session (${sessionResp.status})`
          throw new Error(msg)
        }

        const website = websiteFromApi(apiBaseUrl)
        const signinUrl = `${website.replace(/\/+$/,'')}/signin?session=${encodeURIComponent(sessionId)}`

        console.log(chalk.dim('\nOpening your browser to complete sign-in...'))
        if (!openBrowser(signinUrl)) {
          console.log(chalk.yellow('\nCould not auto-open a browser. Please open this URL manually:\n'))
          console.log(chalk.cyan(signinUrl) + '\n')
        }

        console.log(chalk.gray('Waiting for you to finish signing in (Ctrl+C to cancel)...'))

        const startedAt = Date.now()
        const timeoutMs = 3 * 60 * 1000
        const pollMs = 1500

        // Poll until server says session is ready_for_confirm
        // (Website login/register will attach ?session=... to mark the session ready)
        while (true) {
          if (Date.now() - startedAt > timeoutMs) {
            throw new Error('Timed out waiting for sign-in to complete in the browser')
          }

          const statusResp = await fetch(
            `${apiBaseUrl}/core/auth/session/status?session=${encodeURIComponent(sessionId)}`,
            { headers: withCliSessionKeyHeaders({}, cliSessionKey) }
          )
          const statusData = await statusResp.json().catch(async () => ({ message: await statusResp.text() }))

          if (!statusResp.ok) {
            const msg = statusData?.message || statusData?.error || `Failed to check session status (${statusResp.status})`
            throw new Error(msg)
          }

          const status = extractSessionStatus(statusData)
          if (status === 'ready_for_confirm') break
          if (status === 'expired' || status === 'revoked' || status === 'invalid') {
            throw new Error(`Session became unusable (${status})`)
          }

          await new Promise(resolve => setTimeout(resolve, pollMs))
        }

        console.log(chalk.dim('Confirming session...'))
        const confirmResp = await fetch(`${apiBaseUrl}/core/auth/session/confirm`, {
          method: 'POST',
          headers: withCliSessionKeyHeaders({ 'Content-Type': 'application/json' }, cliSessionKey),
          body: JSON.stringify({
            session_id: sessionId,
            code_verifier: codeVerifier,
            ...(cliSessionKey ? { cli_session_key: cliSessionKey } : {})
          })
        })

        const confirmData = await confirmResp.json().catch(async () => ({ message: await confirmResp.text() }))
        if (!confirmResp.ok) {
          const msg = confirmData?.message || confirmData?.error || `Failed to confirm session (${confirmResp.status})`
          throw new Error(msg)
        }

        const token = extractConfirmToken(confirmData)
        if (!token) {
          throw new Error('Sign-in succeeded but no access token was returned by the server')
        }

        // Normalize shape to reuse existing credential save logic
        data = { token }
      } else {
        throw new Error('Unknown login method')
      }

      const { user, accessToken, refreshToken, accessTokenExp } = extractAuthFromResponse(data)
      if (!accessToken) {
        throw new Error('Login succeeded but no token was returned by the server')
      }

      // Save credentials
      credManager.saveCredentials({
        apiBaseUrl,
        authToken: accessToken,
        refreshToken,
        authTokenExpiresAt: accessTokenExp,
        userId: user?.id || data?.userId,
        email: user?.email || null
      })

      // Persist API base URL to local config for this project as well
      saveCliConfig({ apiBaseUrl })

      console.log(chalk.green('\n✨ Successfully logged in!'))
      console.log(chalk.white('\nYou can now use Symbols CLI commands:'))
      console.log(chalk.cyan('  smbls fetch    ') + chalk.dim('Fetch your design system'))
      console.log(chalk.cyan('  smbls sync     ') + chalk.dim('Sync local changes'))
      console.log(chalk.cyan('  smbls push     ') + chalk.dim('Push updates to Symbols'))
      console.log(chalk.cyan('  smbls collab   ') + chalk.dim('Connect to team on platform in realtime'))

      console.log(chalk.dim(`\nCredentials saved to ${credManager.rcPath}`))
      console.log(chalk.dim('For more commands, run: smbls --help\n'))

    } catch (error) {
      const website = websiteFromApi(first.apiBaseUrl)
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
