import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { exec, execSync } from 'child_process'

const DEFAULT_REPO_URLS = {
  domql: 'https://github.com/symbo-ls/starter-kit',
  react: 'https://github.com/symbo-ls/create-react-app.git',
  angular: 'https://github.com/symbo-ls/create-angular-app.git',
  vue2: 'https://github.com/symbo-ls/create-vue2-app.git',
  vue3: 'https://github.com/symbo-ls/create-vue3-app.git'
}

function folderExists (p) {
  try {
    fs.accessSync(p, fs.constants.F_OK)
    return true
  } catch (_) {
    return false
  }
}

function writeJson (filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

async function runInstall ({ cwd, packageManager, verbose }) {
  const cmd = packageManager === 'yarn' ? 'yarn' : 'npm i'
  const child = exec(cmd, { cwd })

  if (verbose) {
    child.stdout?.on('data', (data) => console.log(data))
    child.stderr?.on('data', (data) => console.error(data))
  } else {
    console.log(chalk.dim('Use --verbose to print the output'))
  }

  await new Promise((resolve, reject) => {
    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`Dependency install failed (${code})`))
    })
  })
}

export async function createLocalTemplate ({
  destDir,
  framework = 'domql',
  packageManager = 'npm',
  clone = true,
  remote = true,
  cleanFromGit = true,
  dependencies = true,
  verbose = false,
  templateUrl
}) {
  const absDest = path.resolve(destDir || 'symbols-starter-kit')
  const destName = path.basename(absDest)

  if (folderExists(absDest)) {
    throw new Error(`Folder already exists: ${absDest}`)
  }

  const cloneUrl = templateUrl || DEFAULT_REPO_URLS[framework] || DEFAULT_REPO_URLS.domql

  if (clone) {
    console.log(`Cloning ${cloneUrl} into '${absDest}'...`)
    execSync(
      `git clone${remote ? ' -b feature/remote' : ''} ${cloneUrl} ${absDest}`,
      { stdio: verbose ? 'inherit' : 'ignore' }
    )
  } else {
    console.log(`Creating directory '${absDest}'...`)
    fs.mkdirSync(absDest, { recursive: true })
  }

  const symbolsPath = path.join(absDest, 'symbols.json')
  if (!clone) {
    writeJson(symbolsPath, {
      key: `${destName}.symbo.ls`,
      packageManager
    })
    console.log('Created symbols.json file')
  } else {
    const current = (() => {
      try {
        const c = fs.readFileSync(symbolsPath, 'utf8')
        return JSON.parse(c)
      } catch (_) {
        return {}
      }
    })()
    writeJson(symbolsPath, {
      ...current,
      key: current.key || `${destName}.symbo.ls`,
      packageManager
    })
  }

  if (dependencies) {
    console.log(`Installing dependencies using ${packageManager}...`)
    console.log()
    await runInstall({ cwd: absDest, packageManager, verbose })
    console.log()
    console.log(chalk.green.bold(destName), 'successfuly created!')
    console.log(
      `Done! run \`${chalk.bold(
        `cd ${destName}; ${packageManager} start`
      )}\` to start the development server.`
    )
  } else {
    console.log(chalk.dim('Skipping dependency installation (--no-dependencies)'))
    console.log()
    console.log(chalk.green.bold(destName), 'successfuly created!')
    console.log(`Done! Now run \`${chalk.bold(`cd ${destName}`)}\` and install dependencies manually.`)
  }

  if (cleanFromGit && clone) {
    try {
      fs.rmSync(path.join(absDest, '.git'), { recursive: true, force: true })
    } catch (_) {
      // ignore
    }
  }

  return { absDest, symbolsPath }
}
