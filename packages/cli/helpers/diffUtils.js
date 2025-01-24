import chalk from 'chalk'
import { spawn } from 'child_process'

export function formatValue(value) {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2)
  }
  return String(value)
}

export function generateDiffDisplay(type, path, oldValue, newValue) {
  const pathStr = path.join('.')
  let output = chalk.dim(`@ ${pathStr}\n`)

  switch (type) {
    case 'update':
      if (oldValue !== undefined) {
        output += chalk.red(`- ${formatValue(oldValue)}\n`)
      }
      output += chalk.green(`+ ${formatValue(newValue)}\n`)
      break
    case 'delete':
      output += chalk.red(`- ${formatValue(oldValue)}\n`)
      break
    default:
      output += chalk.green(`+ ${formatValue(newValue)}\n`)
  }

  return output
}

export async function showDiffPager(diffs) {
  return new Promise((resolve, reject) => {
    const formattedDiffs = diffs.join('\n' + chalk.dim('---') + '\n')

    const less = spawn('less', ['-R'], {
      stdio: ['pipe', process.stdout, process.stderr]
    })

    less.stdin.on('error', (error) => {
      if (error.code === 'EPIPE') {
        resolve()
        return
      }
      reject(error)
    })

    less.on('close', () => {
      resolve()
    })

    less.stdin.write(formattedDiffs)
    less.stdin.end()
  })
}