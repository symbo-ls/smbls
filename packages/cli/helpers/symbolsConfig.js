import path from 'path'
import chalk from 'chalk'
import { loadModule } from '../bin/require.js'

const RC_PATH = process.cwd() + '/symbols.json'

export const loadSymbolsConfig = async (options = {}) => {
  const {
    required = true,
    validateKey = true,
    silent = false
  } = options

  try {
    const config = await loadModule(RC_PATH, { json: true })

    if (validateKey && (!config || !config.key)) {
      throw new Error('Missing app key in symbols.json')
    }

    return config
  } catch (error) {
    if (error.message.includes('Missing app key')) {
      console.error(chalk.bold.red('\nInvalid symbols.json configuration:'))
      console.error(chalk.white('The file must contain a valid app key.'))
      console.error(chalk.bold.yellow('\nExample symbols.json:'))
      console.error(chalk.cyan(JSON.stringify({ key: 'your.app.key' }, null, 2)))
    } else if (!silent) {
      console.error(chalk.bold.red('Please include symbols.json in your repository root'))
    }

    if (required) process.exit(1)
    return null
  }
}

/**
 * Resolve the effective dist directory for the current workspace.
 *
 * Precedence:
 *  - explicit override (e.g. CLI flag)
 *  - symbols.json.distDir
 *
 * Returns an absolute path when possible; null when no distDir
 * configuration is available so callers can decide on a default.
 */
export function resolveDistDir (symbolsConfig, options = {}) {
  const cfg = symbolsConfig || {}
  const {
    // Prefer explicit override from callers (e.g. CLI flag)
    distDirOverride,
    distDir: overrideDistDir,
    cwd = process.cwd()
  } = options

  const raw =
    distDirOverride ||
    overrideDistDir ||
    cfg.distDir

  if (!raw) return null

  // If already absolute, return as-is; otherwise resolve against cwd
  if (path.isAbsolute(raw)) return raw
  return path.resolve(cwd, raw)
}
