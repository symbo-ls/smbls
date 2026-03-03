import { registerProjectVersionsListCommand } from './list.js'
import { registerProjectVersionsLatestCommand } from './latest.js'
import { registerProjectVersionsGetCommand } from './get.js'
import { registerProjectVersionsCreateCommand } from './create.js'
import { registerProjectVersionsUpdateCommand } from './update.js'
import { registerProjectVersionsSnapshotCommand } from './snapshot.js'
import { registerProjectVersionsPublishCommand } from './publish.js'

export function registerProjectVersionsCommand (projectCmd) {
  const versionsCmd = projectCmd
    .command('versions')
    .description('Project version history and publishing')

  registerProjectVersionsListCommand(versionsCmd)
  registerProjectVersionsLatestCommand(versionsCmd)
  registerProjectVersionsGetCommand(versionsCmd)
  registerProjectVersionsCreateCommand(versionsCmd)
  registerProjectVersionsUpdateCommand(versionsCmd)
  registerProjectVersionsSnapshotCommand(versionsCmd)
  registerProjectVersionsPublishCommand(versionsCmd)
}
