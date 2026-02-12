import { program } from './program.js'

function detectShell () {
  const shell = String(process.env.SHELL || '').toLowerCase()
  if (shell.includes('zsh')) return 'zsh'
  if (shell.includes('bash')) return 'bash'
  return 'zsh'
}

function getCommandNames (cmd) {
  const names = new Set()
  try {
    if (typeof cmd?.name === 'function') {
      const n = cmd.name()
      if (n) names.add(n)
    }
  } catch (_) {}

  try {
    if (typeof cmd?.aliases === 'function') {
      for (const a of cmd.aliases() || []) names.add(a)
    } else if (Array.isArray(cmd?._aliases)) {
      for (const a of cmd._aliases) names.add(a)
    }
  } catch (_) {}

  return [...names].filter(Boolean)
}

function findSubcommand (cmd, token) {
  if (!cmd?.commands?.length) return null
  const t = String(token || '').trim()
  if (!t) return null
  for (const sub of cmd.commands) {
    const names = getCommandNames(sub)
    if (names.includes(t)) return sub
  }
  return null
}

function collectOptionFlags (cmd) {
  const out = new Set()

  // Commander help option exists even if not explicitly configured.
  out.add('-h')
  out.add('--help')

  for (const c of [program, cmd].filter(Boolean)) {
    const options = Array.isArray(c?.options) ? c.options : []
    for (const opt of options) {
      if (opt?.short) out.add(opt.short)
      if (opt?.long) out.add(opt.long)
    }
  }

  return [...out]
}

function collectSubcommands (cmd) {
  const out = new Set()
  const subs = Array.isArray(cmd?.commands) ? cmd.commands : []
  for (const sub of subs) {
    for (const name of getCommandNames(sub)) {
      // Hide internal hooks (e.g. "__complete") from user-facing suggestions.
      if (String(name).startsWith('_')) continue
      out.add(name)
    }
  }
  return [...out]
}

function resolveCommandAtWords (words) {
  let cmd = program
  for (const w of words) {
    const token = String(w || '')
    if (!token || token === '--') continue
    if (token.startsWith('-')) break

    const next = findSubcommand(cmd, token)
    if (!next) break
    cmd = next
  }
  return cmd
}

function uniqSorted (items) {
  return [...new Set(items.filter(Boolean))].sort((a, b) => a.localeCompare(b))
}

function safeWrite (text) {
  try {
    process.stdout.write(text)
  } catch (err) {
    // Completion is best-effort; avoid crashing on broken pipes (e.g. piping to missing commands).
    if (err && (err.code === 'EPIPE' || err.errno === -32)) return
    throw err
  }
}

function filterByPrefix (items, prefix) {
  const p = String(prefix || '')
  if (!p) return items
  return items.filter(x => String(x).startsWith(p))
}

function renderCompletionScriptBash () {
  // Uses hidden `__complete` command to produce newline-separated candidates.
  return [
    '# smbls bash completion',
    '# Usage (current shell):',
    '#   source <(smbls completion bash)',
    '# Persist (bashrc):',
    "#   echo 'source <(smbls completion bash)' >> ~/.bashrc",
    '',
    '_smbls_complete() {',
    '  local cur',
    '  cur="$' + '{COMP_WORDS[COMP_CWORD]}"',
    '  COMPREPLY=()',
    '',
    '  local IFS=$\'\\n\'',
    '  local suggestions',
    '  suggestions="$(smbls __complete -- "' + '$' + '{COMP_WORDS[@]:1:$COMP_CWORD}" 2>/dev/null)"',
    '  if [[ -z "$suggestions" ]]; then',
    '    return 0',
    '  fi',
    '',
    '  COMPREPLY=($(compgen -W "$suggestions" -- "$cur"))',
    '  return 0',
    '}',
    '',
    'complete -F _smbls_complete smbls',
    ''
  ].join('\n')
}

function renderCompletionScriptZsh () {
  return [
    '#compdef smbls',
    '',
    '# smbls zsh completion',
    '# Usage (current shell):',
    '#   source <(smbls completion zsh)',
    '# Persist (~/.zshrc):',
    "#   echo 'source <(smbls completion zsh)' >> ~/.zshrc",
    '',
    '_smbls() {',
    '  local -a suggestions',
    '  suggestions=(' + '$' + '{(f)"$(smbls __complete -- "' + '$' + '{(@)words[2,$CURRENT]}" 2>/dev/null)"}' + ')',
    '  compadd -a suggestions',
    '}',
    '',
    '# Register completion (requires compinit).',
    'if whence -w compdef >/dev/null 2>&1; then',
    '  compdef _smbls smbls',
    'fi',
    ''
  ].join('\n')
}

function renderInstallInstructions (shell) {
  if (shell === 'bash') {
    return [
      'To enable bash completion:',
      '',
      '  # For this session',
      '  source <(smbls completion bash)',
      '',
      '  # Persist',
      '  echo \'source <(smbls completion bash)\' >> ~/.bashrc',
      '',
      '  # Then restart your shell',
      ''
    ].join('\n')
  }

  // zsh
  return [
    'To enable zsh completion:',
    '',
    '  # Ensure compinit is enabled (usually already is)',
    '  autoload -U compinit && compinit',
    '',
    '  # For this session',
    '  source <(smbls completion zsh)',
    '',
    '  # Persist',
    '  echo \'source <(smbls completion zsh)\' >> ~/.zshrc',
    '',
    '  # Then restart your shell',
    ''
  ].join('\n')
}

// Public command: prints shell completion script.
program
  .command('completion')
  .description('Generate shell completion script for smbls')
  .argument('[shell]', 'bash|zsh', detectShell())
  .option('--install', 'Print install instructions (no file writes)', false)
  .action((shell, opts) => {
    const sh = String(shell || '').toLowerCase()
    const target = (sh === 'bash' || sh === 'zsh') ? sh : detectShell()

    if (opts.install) {
      safeWrite(renderInstallInstructions(target))
      return
    }

    if (target === 'bash') safeWrite(renderCompletionScriptBash())
    else safeWrite(renderCompletionScriptZsh())
  })

// Hidden hook called by the shell completion function.
// Example:
//   smbls __complete -- project cr
// should output matching subcommands/options for current context.
const completeCmd = program
  .command('__complete')
  .description('Internal: shell completion hook')
  .argument('[words...]')
  .allowExcessArguments(true)
  .allowUnknownOption(true)
  .action((words = []) => {
    const ws = Array.isArray(words) ? words.map(String) : []
    const prefix = ws.length ? ws[ws.length - 1] : ''
    const contextWords = ws.length ? ws.slice(0, -1) : []

    const cmd = resolveCommandAtWords(contextWords)
    const suggestions = (String(prefix).startsWith('-'))
      ? collectOptionFlags(cmd)
      : [
          ...collectSubcommands(cmd),
          ...collectOptionFlags(cmd)
        ]

    const filtered = uniqSorted(filterByPrefix(suggestions, prefix))
    safeWrite(filtered.join('\n'))
  })

// Best-effort hiding from help output across commander versions.
try {
  if (typeof completeCmd.hideHelp === 'function') completeCmd.hideHelp()
} catch (_) {}
