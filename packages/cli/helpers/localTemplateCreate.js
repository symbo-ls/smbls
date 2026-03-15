import chalk from 'chalk'
import fs from 'fs'
import os from 'os'
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

function copyDirRecursive (src, dest) {
  fs.mkdirSync(dest, { recursive: true })
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function writeSymbolsLocal (absDest, packageManager) {
  const symbolsLocalDir = path.join(absDest, '.symbols_local')
  if (!fs.existsSync(symbolsLocalDir)) fs.mkdirSync(symbolsLocalDir, { recursive: true })

  const configJsonPath = path.join(symbolsLocalDir, 'config.json')
  const existingConfig = (() => {
    try { return JSON.parse(fs.readFileSync(configJsonPath, 'utf8')) } catch (_) { return {} }
  })()
  writeJson(configJsonPath, {
    ...existingConfig,
    runtime: existingConfig.runtime || 'node',
    bundler: existingConfig.bundler || 'parcel',
    packageManager: packageManager || existingConfig.packageManager || 'npm',
    deploy: existingConfig.deploy || 'symbols'
  })

  const lockJsonPath = path.join(symbolsLocalDir, 'lock.json')
  if (!fs.existsSync(lockJsonPath)) {
    writeJson(lockJsonPath, { branch: 'main', version: '1.0.0' })
  }
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

/**
 * Clone starter-kit to a temp dir and return its path.
 * Caller is responsible for cleanup.
 */
function cloneToTemp ({ cloneUrl, branch, verbose }) {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'smbls-template-'))
  execSync(
    `git clone${branch ? ` -b ${branch}` : ''} --depth 1 ${cloneUrl} ${tmpDir}`,
    { stdio: verbose ? 'inherit' : 'ignore' }
  )
  return tmpDir
}

/**
 * Workspace mode: scaffolds only the symbols source files into destDir.
 * The dest folder IS the symbols dir — no symbols/ subdirectory nesting.
 *
 * Result:
 *   packages/canvas/
 *     symbols.json        { key: "canvas.symbo.ls", dir: "." }
 *     .symbols_local/     config.json, lock.json
 *     app.js
 *     context.js
 *     index.js
 *     index.html
 *     components/
 *     ...
 */
const RUNNER_FILES = ['index.js', 'app.js', 'index.html']

export async function createWorkspaceTemplate ({
  destDir,
  framework = 'domql',
  packageManager = 'npm',
  verbose = false,
  skipRunnerFiles = false,
  templateUrl
}) {
  const absDest = path.resolve(destDir || 'symbols-workspace')
  const destName = path.basename(absDest)

  if (folderExists(absDest)) {
    console.error(chalk.red(`Folder already exists: ${absDest}`))
    process.exit(1)
  }

  const cloneUrl = templateUrl || DEFAULT_REPO_URLS[framework] || DEFAULT_REPO_URLS.domql

  console.log(`Scaffolding workspace ${chalk.cyan(destName)}...`)
  const tmpDir = cloneToTemp({ cloneUrl, branch: 'next', verbose })

  try {
    // Find the symbols source dir in the cloned template
    let templateSymbolsDir
    const tmpSymbolsJson = path.join(tmpDir, 'symbols.json')
    if (fs.existsSync(tmpSymbolsJson)) {
      try {
        const cfg = JSON.parse(fs.readFileSync(tmpSymbolsJson, 'utf8'))
        const dir = cfg.dir || './symbols'
        templateSymbolsDir = path.resolve(tmpDir, dir)
      } catch (_) {}
    }
    if (!templateSymbolsDir || !fs.existsSync(templateSymbolsDir)) {
      templateSymbolsDir = path.join(tmpDir, 'symbols')
    }

    if (!fs.existsSync(templateSymbolsDir)) {
      throw new Error('Template has no symbols/ directory')
    }

    // Copy symbols source files directly into dest (flat — no nesting)
    copyDirRecursive(templateSymbolsDir, absDest)

    // Remove runner files for library/platform projects
    if (skipRunnerFiles) {
      for (const file of RUNNER_FILES) {
        const filePath = path.join(absDest, file)
        try { if (fs.existsSync(filePath)) fs.unlinkSync(filePath) } catch (_) {}
      }
    }

    // symbols.json with dir: "." — the dest folder IS the source dir
    writeJson(path.join(absDest, 'symbols.json'), {
      key: `${destName}.symbo.ls`,
      dir: '.'
    })

    // .symbols_local config
    writeSymbolsLocal(absDest, packageManager)
  } finally {
    // Clean up temp clone
    try { fs.rmSync(tmpDir, { recursive: true, force: true }) } catch (_) {}
  }

  console.log()
  console.log(chalk.green.bold(destName), 'workspace created!')
  console.log(chalk.dim(`  symbols.json  → dir: "."`))
  console.log(chalk.dim(`  Source files live directly in ${destName}/`))

  return { absDest, symbolsPath: path.join(absDest, 'symbols.json') }
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
    console.error(chalk.red(`Folder already exists: ${absDest}`))
    process.exit(1)
  }

  const cloneUrl = templateUrl || DEFAULT_REPO_URLS[framework] || DEFAULT_REPO_URLS.domql

  if (clone) {
    console.log(`Cloning ${cloneUrl} into '${absDest}'...`)
    execSync(
      `git clone${remote ? ' -b next' : ''} ${cloneUrl} ${absDest}`,
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
      dir: './symbols'
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
      key: current.key || `${destName}.symbo.ls`,
      dir: current.dir || './symbols'
    })
  }

  writeSymbolsLocal(absDest, packageManager)

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
