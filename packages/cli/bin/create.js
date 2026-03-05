'use strict'

import { program } from './program.js'
import { runProjectCreate } from './project/commands/create.js'

program
  .command('create')
  .description('Create and initialize a new project (alias for `project create`)')
  .argument('[dir]', 'Project directory')
  .option('--create-new', 'Force create new platform project', false)
  .option('--link-existing', 'Force link to existing platform project', false)
  .option('--local-only', 'Local-only (no platform)', false)
  .option('--non-interactive', 'Disable prompts (require flags)', false)
  .option('--name <name>', 'Platform project name')
  .option('--type <projectType>', 'Platform projectType (API-required)')
  .option('--key <projectKey>', 'Platform project key')
  .option('--id <projectId>', 'Platform project id (for link mode)')
  .option('--visibility <visibility>', 'Platform visibility', 'private')
  .option('--language <language>', 'Platform language', 'javascript')
  .option('--platform-framework <framework>', 'Platform framework field', 'platform')
  .option('--branch <branch>', 'Local branch for .symbols/config.json', 'main')
  .option('--verbose', 'Verbose output', false)
  .option('--remote', 'Clone feature/remote branch when cloning templates', true)
  .option('--domql', 'Use DOMQL template (default)', true)
  .option('--template <gitUrl>', 'Override template git repo URL')
  .option('--package-manager <manager>', 'Choose the package manager (npm/yarn)', 'npm')
  .option('--clean-from-git', 'Remove starter-kit git repository', true)
  .option('--no-dependencies', 'Skip installing dependencies')
  .option('--no-clone', 'Create folder instead of cloning from git')
  .option('--blank-shared-libraries', 'Create project with blank shared libraries', false)
  .action(async (dir, opts) => {
    await runProjectCreate(dir, {
      ...opts,
      createNew: !!opts.createNew,
      linkExisting: !!opts.linkExisting
    })
  })
