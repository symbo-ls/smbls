#!/usr/bin/env node

import { program } from './program.js'
import { registerProjectCreateCommand } from './project/commands/create.js'
import { registerProjectLinkCommand } from './project/commands/link.js'
import { registerProjectDeleteCommand } from './project/commands/delete.js'
import { registerProjectUpdateCommand } from './project/commands/update.js'
import { registerProjectListCommand } from './project/commands/list.js'
import { registerProjectLibsCommand } from './project/commands/libs/index.js'
import { registerProjectDuplicateCommand } from './project/commands/duplicate.js'

const projectCmd = program
  .command('project')
  .description('Project lifecycle management')

registerProjectCreateCommand(projectCmd)
registerProjectLinkCommand(projectCmd)
registerProjectDeleteCommand(projectCmd)
registerProjectUpdateCommand(projectCmd)
registerProjectListCommand(projectCmd)
registerProjectLibsCommand(projectCmd)
registerProjectDuplicateCommand(projectCmd)
