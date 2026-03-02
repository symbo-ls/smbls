import { CredentialManager } from './credentialManager.js'
import chalk from 'chalk'

const COMPLETION_SESSION_ENV = 'SMBLS_COMPLETION'
const ONBOARDING_KEY = 'onboarding'
const COMPLETION_HINT_SHOWN_AT = 'completionHintShownAt'
const COMPLETION_TIP = () => {
  // In some environments chalk may not detect color support even in a TTY.
  // Since we already gate on `process.stderr.isTTY`, it's safe to force level 1.
  if (process.stderr.isTTY && chalk.level === 0) chalk.level = 1

  const tip = chalk.cyanBright.bold('Tip:')
  const cmd = chalk.whiteBright('smbls completion --install')
  return `${tip} enable shell autocompletion with: ${cmd}\n`
}

let tipScheduled = false

function isObject (v) {
  return v != null && typeof v === 'object' && !Array.isArray(v)
}

function getCommandName (cmd) {
  try {
    if (cmd && typeof cmd.name === 'function') return cmd.name()
  } catch (_) {}
  return cmd && typeof cmd._name === 'string' ? cmd._name : ''
}

export function maybeShowCompletionHint (actionCommand) {
  // Only show tips in interactive contexts.
  if (!process.stderr.isTTY) return
  if (process.env.CI) return

  // If completion is already loaded in this shell session, don't show the hint.
  if (process.env[COMPLETION_SESSION_ENV]) return

  // Don't show the hint when the user is explicitly using completion commands.
  const name = String(getCommandName(actionCommand) || '')
  if (name === 'completion' || name === '__complete') return

  const cm = new CredentialManager()
  const state = cm.loadState() || {}
  const onboarding = isObject(state[ONBOARDING_KEY]) ? state[ONBOARDING_KEY] : {}
  if (onboarding[COMPLETION_HINT_SHOWN_AT]) return

  try {
    const next = {
      ...state,
      [ONBOARDING_KEY]: {
        ...onboarding,
        [COMPLETION_HINT_SHOWN_AT]: new Date().toISOString()
      }
    }
    cm.saveRaw(next)
  } catch (_) {
    // If we can't persist, still don't break the user's command.
  }

  // Print at process exit so it's at the bottom, after command logs.
  if (tipScheduled) return
  tipScheduled = true
  process.once('exit', () => {
    if (!process.stderr.isTTY) return
    if (process.env.CI) return
    if (process.env[COMPLETION_SESSION_ENV]) return
    try {
      process.stderr.write(COMPLETION_TIP())
    } catch (_) {
      // best-effort; ignore broken pipes, etc.
    }
  })
}
