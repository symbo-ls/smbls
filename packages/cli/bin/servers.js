#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import { program } from './program.js'
import { CredentialManager } from '../helpers/credentialManager.js'

program
  .command('servers')
  .description('List and switch Symbols CLI servers (API base URLs)')
  .option('-s, --select', 'Interactively select active server')
  .action(async (opts) => {
    const cm = new CredentialManager()
    const profiles = cm.getProfiles()
    const current = cm.getCurrentApiBaseUrl()

    const urls = Object.keys(profiles || {})

    if (!urls.length) {
      console.log(chalk.yellow('No servers configured yet. Run `smbls login` first.'))
      return
    }

    console.log(chalk.bold('\nConfigured servers:'))
    urls.forEach((apiBaseUrl) => {
      const profile = profiles[apiBaseUrl] || {}
      const marker = apiBaseUrl === current ? chalk.green('●') : '○'
      const email = profile.email ? chalk.dim(`  (${profile.email})`) : ''
      console.log(`${marker} ${chalk.cyan(apiBaseUrl)}${email}`)
    })

    if (!opts.select) return

    const { next } = await inquirer.prompt([
      {
        type: 'list',
        name: 'next',
        message: 'Select active server:',
        choices: urls.map((url) => ({
          name: `${url}${url === current ? ' (current)' : ''}`,
          value: url
        }))
      }
    ])

    cm.setCurrentApiBaseUrl(next)
    console.log(chalk.green(`\nActive server set to ${next}`))
  })

