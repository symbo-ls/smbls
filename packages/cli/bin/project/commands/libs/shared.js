import chalk from 'chalk'
import { loadCliConfig, readLock } from '../../../../helpers/config.js'
import { loadSymbolsConfig } from '../../../../helpers/symbolsConfig.js'
import { listAvailableLibraries } from '../../../../helpers/projectsApi.js'
import { resolveProjectIdOrExit } from '../../shared.js'
import { fetchFromCli } from '../../../fetch.js'

function isProbablyObjectId (value) {
  const s = String(value || '').trim()
  return /^[0-9a-fA-F]{24}$/.test(s)
}

function pickLibId (lib) {
  return lib?.id || lib?._id || null
}

export async function resolveWorkspaceProjectIdOrExit ({ projectArg, authToken }) {
  if (projectArg) {
    return await resolveProjectIdOrExit({ value: projectArg, authToken })
  }

  const lock = readLock()
  if (lock?.projectId) return lock.projectId

  const cliConfig = loadCliConfig()
  if (cliConfig?.projectId) return String(cliConfig.projectId)

  let symbolsConfig = {}
  try {
    symbolsConfig = await loadSymbolsConfig()
  } catch (_) {}

  const fallbackKey = cliConfig?.projectKey || symbolsConfig?.key
  if (fallbackKey) {
    return await resolveProjectIdOrExit({ value: fallbackKey, authToken })
  }

  console.error(chalk.red('Unable to resolve project. Link a workspace first (smbls project link) or pass --project <keyOrId>.'))
  process.exit(1)
}

export async function resolveLibraryIdsOrExit (rawArgs = [], authToken) {
  const args = Array.isArray(rawArgs) ? rawArgs : []
  if (!args.length) {
    console.error(chalk.red('Missing library identifiers. Provide one or more library ids or keys.'))
    process.exit(1)
  }

  const ids = []
  for (const raw of args) {
    const token = String(raw || '').trim()
    if (!token) continue
    if (isProbablyObjectId(token)) {
      ids.push(token)
      continue
    }

    // Treat as a library key; resolve via available list.
    const payload = await listAvailableLibraries({ search: token, page: 1, limit: 50 }, authToken)
    const items = Array.isArray(payload?.items)
      ? payload.items
      : (Array.isArray(payload) ? payload : (payload?.data || payload?.libraries || []))

    const exact =
      items.find((lib) => String(lib?.key || '').toLowerCase() === token.toLowerCase()) ||
      items.find((lib) => String(lib?.name || '').toLowerCase() === token.toLowerCase()) ||
      (items.length === 1 ? items[0] : null)

    const id = pickLibId(exact)
    if (!id) {
      console.error(chalk.red('Unable to resolve library:'), token)
      if (items?.length) {
        console.error(chalk.dim('Candidates:'))
        for (const lib of items.slice(0, 10)) {
          const name = lib?.name || ''
          const key = lib?.key || ''
          const lid = pickLibId(lib) || ''
          console.error(`- ${chalk.bold(name || key || lid)}  ${chalk.cyan(key)}  ${chalk.dim(lid)}`.trim())
        }
      }
      process.exit(1)
    }
    ids.push(String(id))
  }

  // Dedupe while preserving order
  return Array.from(new Set(ids))
}

export async function refreshWorkspaceProjectFiles ({ verbose } = {}) {
  // After library changes we only need to refresh shared libraries locally.
  // Avoid doing a full project overwrite (components/pages/etc) which can clobber local edits.
  await fetchFromCli({
    update: true,
    force: true,
    convert: false,
    metadata: false,
    ignoreEtag: true,
    verbose: !!verbose,
    scope: 'libs',
    skipConfirm: true
  })
}
