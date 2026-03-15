'use strict'

import chalk from 'chalk'
import { program } from './program.js'
import { ensureAuthenticated, isAuthError } from '../helpers/authEnsure.js'
import { loadCliConfig } from '../helpers/config.js'
import { showAuthRequiredMessages } from '../helpers/buildMessages.js'
import { SERVICE_METHODS } from '@symbo.ls/sdk/utils/services'
import SDK from '@symbo.ls/sdk'

// Group methods by service for display
function getMethodsByService () {
  const grouped = {}
  for (const [method, service] of Object.entries(SERVICE_METHODS)) {
    if (!grouped[service]) grouped[service] = []
    grouped[service].push(method)
  }
  return grouped
}

function parseArgs (args) {
  if (!args.length) return []
  // Try to parse each arg as JSON, fall back to string
  return args.map(arg => {
    try {
      return JSON.parse(arg)
    } catch (_) {
      return arg
    }
  })
}

const sdkCommand = program
  .command('sdk')
  .description('Proxy SDK service methods')
  .arguments('[method] [args...]')
  .option('-l, --list', 'List all available SDK methods')
  .option('-s, --service <name>', 'Filter methods by service name')
  .action(async (method, args, opts) => {
    // List mode
    if (opts.list || !method) {
      const grouped = getMethodsByService()
      const serviceFilter = opts.service?.toLowerCase()

      console.log(chalk.cyan('\nAvailable SDK methods:\n'))

      for (const [service, methods] of Object.entries(grouped)) {
        if (serviceFilter && service.toLowerCase() !== serviceFilter) continue
        console.log(chalk.bold.white(`  ${service}:`))
        for (const m of methods) {
          console.log(chalk.dim(`    ${m}`))
        }
        console.log()
      }

      if (serviceFilter && !Object.keys(grouped).some(s => s.toLowerCase() === serviceFilter)) {
        console.log(chalk.yellow(`  No service named "${opts.service}" found.\n`))
      }

      console.log(chalk.dim('Usage: smbls sdk <method> [args...]\n'))
      console.log(chalk.dim('Example: smbls sdk getProjects'))
      console.log(chalk.dim('Example: smbls sdk getProjectByKey \'{"key":"my-project"}\'\n'))
      return
    }

    // Validate method exists
    const serviceName = SERVICE_METHODS[method]
    if (!serviceName) {
      console.error(chalk.red(`\nUnknown SDK method: ${method}`))
      console.log(chalk.dim('Run `smbls sdk --list` to see available methods.\n'))
      process.exit(1)
    }

    // Authenticate
    const cliConfig = loadCliConfig()
    let authToken
    try {
      const ensured = await ensureAuthenticated({ apiBaseUrl: cliConfig.apiBaseUrl })
      authToken = ensured.authToken
    } catch (err) {
      if (isAuthError(err)) {
        showAuthRequiredMessages()
        process.exit(1)
      }
      throw err
    }

    // Initialize SDK
    const sdk = new SDK({
      apiUrl: cliConfig.apiBaseUrl
    })
    await sdk.initialize({ authToken })

    // Call the method
    const parsedArgs = parseArgs(args)
    try {
      const result = await sdk[method](...parsedArgs)
      if (result !== undefined) {
        console.log(JSON.stringify(result, null, 2))
      }
    } catch (err) {
      console.error(chalk.red(`\nSDK error (${serviceName}.${method}):`))
      console.error(chalk.yellow(err.message || err))
      process.exit(1)
    }
  })

export { sdkCommand }
