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

export function showBuildErrorMessages(error) {
  console.log(chalk.bold.red('\nBuild Failed ❌'))
  console.log(chalk.white('\nError details:'))
  console.log(chalk.yellow(error.message))

  // Extract useful information from the error
  const errorLocation = error.errors?.[0]?.location || {}
  if (errorLocation.file) {
    console.log(chalk.white('\nError location:'))
    console.log(chalk.gray(`File: ${chalk.cyan(errorLocation.file)}`))
    if (errorLocation.line) {
      console.log(chalk.gray(`Line: ${chalk.cyan(errorLocation.line)}`))
    }
  }

  console.log(chalk.white('\nPossible solutions:'))

  // Common build issues and their solutions
  if (error.message.includes('instanceof')) {
    console.log(chalk.gray('• Check if you are using browser-specific APIs in Node.js environment'))
    console.log(chalk.gray('  Consider using conditional checks: typeof window !== "undefined"'))
  }
  if (error.message.includes('Could not resolve')) {
    console.log(chalk.gray('• Verify all dependencies are installed: npm install'))
    console.log(chalk.gray('• Check import/require paths are correct'))
  }
  if (error.message.includes('Unexpected token')) {
    console.log(chalk.gray('• Ensure the code syntax is compatible with the target environment'))
    console.log(chalk.gray('• Check for syntax errors in the indicated file'))
  }

  console.log(chalk.white('\nNext steps:'))
  console.log(chalk.gray('1. Fix the build errors in your local project'))
  console.log(chalk.gray('2. Ensure all dependencies are properly installed'))
  console.log(chalk.gray('3. Run the command again'))

  console.log(chalk.gray('\nFor more help, please check the documentation or report this issue on GitHub'))
}