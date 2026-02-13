import chalk from 'chalk'

export function pickEnvironmentsData (payload) {
  const root = payload?.data || payload || {}
  const data = root?.data || root
  return data || {}
}

export function formatEnvConfigSummary (envKey, cfg) {
  const enabled = cfg?.enabled !== false
  const mode = cfg?.mode || ''
  const branch = cfg?.branch || ''
  const version = cfg?.version || ''
  const label = cfg?.label || ''
  const host = cfg?.host || ''

  const parts = [
    chalk.bold(envKey),
    enabled ? chalk.green('enabled') : chalk.dim('disabled'),
    mode && chalk.cyan(mode),
    mode === 'branch' && branch && chalk.dim(`branch=${branch}`),
    mode === 'version' && version && chalk.dim(`version=${version}`),
    label && String(label),
    host && chalk.dim(`host=${host}`)
  ].filter(Boolean)

  return parts.join('  ')
}

export function buildEnvConfigFromFlags (opts, { base = {}, allowMode = true } = {}) {
  const cfg = { ...(base || {}) }

  if (allowMode && opts.mode) cfg.mode = opts.mode
  if (opts.branch !== undefined) cfg.branch = opts.branch
  if (opts.version !== undefined) cfg.version = opts.version
  if (opts.label !== undefined) cfg.label = opts.label
  if (opts.host !== undefined) cfg.host = opts.host

  if (opts.enabled && opts.disabled) {
    console.error(chalk.red('Use either --enabled or --disabled (not both).'))
    process.exit(1)
  }
  if (opts.enabled) cfg.enabled = true
  if (opts.disabled) cfg.enabled = false

  return cfg
}

export function buildPatchBodyFromFlags (opts) {
  const body = {}
  if (opts.mode) body.mode = opts.mode
  if (opts.branch !== undefined) body.branch = opts.branch
  if (opts.version !== undefined) body.version = opts.version
  if (opts.label !== undefined) body.label = opts.label
  if (opts.host !== undefined) body.host = opts.host

  if (opts.enabled && opts.disabled) {
    console.error(chalk.red('Use either --enabled or --disabled (not both).'))
    process.exit(1)
  }
  if (opts.enabled) body.enabled = true
  if (opts.disabled) body.enabled = false

  return body
}
