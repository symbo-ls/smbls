#!/usr/bin/env node

import { program } from './program.js'
import { registerGitHubConnectCommand } from './github/commands/connect.js'
import { registerGitHubInitActionsCommand } from './github/commands/initActions.js'
import { registerGitHubSyncCommand } from './github/commands/sync.js'

const githubCmd = program
  .command('github')
  .description('GitHub integration helpers (connectors + CI sync)')

registerGitHubConnectCommand(githubCmd)
registerGitHubInitActionsCommand(githubCmd)
registerGitHubSyncCommand(githubCmd)
