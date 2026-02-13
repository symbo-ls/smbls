import { registerProjectPipelinePromoteCommand } from './promote.js'

export function registerProjectPipelineCommand (projectCmd) {
  const pipelineCmd = projectCmd
    .command('pipeline')
    .description('Simple pipeline management (promotions between environments)')

  registerProjectPipelinePromoteCommand(pipelineCmd)
}
