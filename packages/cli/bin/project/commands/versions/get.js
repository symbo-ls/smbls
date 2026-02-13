import chalk from 'chalk'
import { getProjectVersion } from '../../../../helpers/projectsApi.js'
import { resolveAuthOrExit } from '../../shared.js'
import { resolveWorkspaceProjectIdOrExit } from '../libs/shared.js'

const DEFAULT_FIELDS = 'value,message,changesCount,hasSnapshot,versionNumber,createdAt'

function isoMaybe (v) {
  if (!v) return ''
  try {
    return new Date(v).toISOString()
  } catch (_) {
    return ''
  }
}

function printVersionSummary (v, { fallbackId } = {}) {
  const value = v?.value || v?.version || v?.versionNumber || fallbackId || ''
  const id = v?.id || v?._id || ''
  const branch = v?.branch || ''
  const createdAt = isoMaybe(v?.createdAt)
  const message = v?.message || ''
  const changesCount = v?.changesCount
  const hasSnapshot = v?.hasSnapshot
  const versionNumber = v?.versionNumber

  console.log(chalk.bold(String(value || id || '(version)')))
  if (branch) console.log('branch:', chalk.cyan(branch))
  if (versionNumber !== undefined && versionNumber !== null && String(versionNumber) !== '') {
    console.log('versionNumber:', chalk.dim(String(versionNumber)))
  }
  if (createdAt) console.log('createdAt:', chalk.dim(createdAt))
  if (changesCount !== undefined && changesCount !== null && String(changesCount) !== '') {
    console.log('changesCount:', chalk.dim(String(changesCount)))
  }
  if (hasSnapshot !== undefined && hasSnapshot !== null && String(hasSnapshot) !== '') {
    console.log('hasSnapshot:', chalk.dim(String(hasSnapshot)))
  }
  if (message) console.log('message:', String(message))
  if (id) console.log('id:', chalk.dim(String(id)))
}

function isUsefulVersionSummary (v) {
  if (!v || typeof v !== 'object') return false
  return (
    v.value ||
    v.version ||
    v.message ||
    v.createdAt ||
    v.changesCount !== undefined ||
    v.hasSnapshot !== undefined ||
    v.versionNumber !== undefined
  )
}

export function registerProjectVersionsGetCommand (versionsCmd) {
  versionsCmd
    .command('get <versionId>')
    .description('Fetch a specific version by id (or server-supported identifier)')
    .option('--project <projectKeyOrId>', 'Override project (defaults to linked workspace)')
    .option('--branch <branch>', 'Branch name (if server supports it)', 'main')
    .option('--fields <fields>', 'Fields projection (comma-separated)', DEFAULT_FIELDS)
    .option('--json', 'Output raw JSON', false)
    .action(async (versionId, opts) => {
      const { authToken } = resolveAuthOrExit()
      const projectId = await resolveWorkspaceProjectIdOrExit({ projectArg: opts.project, authToken })

      let payload = await getProjectVersion(
        projectId,
        versionId,
        { branch: opts.branch, fields: opts.fields || DEFAULT_FIELDS },
        authToken
      )

      if (opts.json) {
        console.log(JSON.stringify(payload, null, 2))
        return
      }

      // Best-effort friendly output (avoid data/schemaData unless --json).
      let v = payload?.data || payload
      if (!isUsefulVersionSummary(v)) {
        // Some server deployments may respond with a minimal payload when fields are passed.
        // Retry without fields to ensure we can print a useful summary.
        payload = await getProjectVersion(projectId, versionId, { branch: opts.branch }, authToken)
        v = payload
      }
      printVersionSummary(v, { fallbackId: versionId })
    })
}
