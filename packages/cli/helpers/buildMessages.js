import chalk from 'chalk'

const CREATE_PROJECT_URL = 'https://symbols.app/create'

export const showAuthRequiredMessages = () => {
  console.log('\n' + chalk.yellow('⚠️  Authentication Required'))
  console.log(chalk.white('\nTo access Symbols resources, please log in first:'))
  console.log(chalk.cyan('\n  smbls login'))

  console.log('\nNeed help?')
  console.log(chalk.dim('• Make sure you have a Symbols account'))
  console.log(chalk.dim('• Visit https://symbols.app/docs/cli for more information'))
  console.log(chalk.dim('• Contact support@symbols.app if you continue having issues\n'))
}

export const showProjectNotFoundMessages = (appKey) => {
  console.error(chalk.bold.red('\nProject not found or access denied.'))
  console.error(chalk.bold.yellow('\nPossible reasons:'))
  console.error(chalk.gray('1. The project does not exist'))
  console.error(chalk.gray("2. You don't have access to this project"))
  console.error(chalk.gray('3. The app key in symbols.json might be incorrect'))

  console.error(chalk.bold.yellow('\nTo resolve this:'))
  console.error(chalk.white(
    `1. Visit ${chalk.cyan.underline(
      CREATE_PROJECT_URL
      )} to create a new project`
  ))
  console.error(chalk.white(
    '2. After creating the project, update your symbols.json with the correct information:'
  ))
  console.error(chalk.gray(`   - Verify the app key: ${chalk.cyan(appKey)}`))
  console.error(chalk.gray('   - Make sure you have the correct permissions'))

  console.error(chalk.bold.yellow('\nThen try again:'))
  console.error(chalk.cyan('$ smbls push'))
}