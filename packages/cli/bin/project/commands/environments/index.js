import { registerProjectEnvironmentsListCommand } from './list.js'
import { registerProjectEnvironmentsActivateCommand } from './activate.js'
import { registerProjectEnvironmentsUpsertCommand } from './upsert.js'
import { registerProjectEnvironmentsUpdateCommand } from './update.js'
import { registerProjectEnvironmentsPublishCommand } from './publish.js'
import { registerProjectEnvironmentsDeleteCommand } from './delete.js'

export function registerProjectEnvironmentsCommand (projectCmd) {
  const envCmd = projectCmd
    .command('environments')
    .description('Multiple environment slots and publishing')

  registerProjectEnvironmentsListCommand(envCmd)
  registerProjectEnvironmentsActivateCommand(envCmd)
  registerProjectEnvironmentsUpsertCommand(envCmd)
  registerProjectEnvironmentsUpdateCommand(envCmd)
  registerProjectEnvironmentsPublishCommand(envCmd)
  registerProjectEnvironmentsDeleteCommand(envCmd)
}
