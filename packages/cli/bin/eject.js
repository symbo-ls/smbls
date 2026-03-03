import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'
import { spawn } from 'child_process'
import { createRequire } from 'module'
import chalk from 'chalk'
import { program } from './program.js'
import { getSymbols } from './bundler.js'

const require = createRequire(import.meta.url)

program
  .command('eject')
  .description('Eject from @symbo.ls/runner to explicit dependencies')
  .option('--no-install', 'Skip npm install after ejecting')
  .action((opts) => {
    const cwd = process.cwd()

    // Find runner's dependency lists
    let runnerPkg
    try {
      runnerPkg = require(resolve(cwd, 'node_modules/@symbo.ls/runner/package.json'))
    } catch {
      console.error(chalk.red('Could not find @symbo.ls/runner in node_modules'))
      process.exit(1)
    }

    const symbols = getSymbols(cwd)
    const bundler = symbols.bundler || 'parcel'
    const bundlerDeps = runnerPkg.bundlers?.[bundler] || {}

    // Update package.json
    const pkgPath = resolve(cwd, 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'))

    if (pkg.devDependencies?.['@symbo.ls/runner']) {
      const { '@symbo.ls/runner': _removed, ...restDevDeps } = pkg.devDependencies
      pkg.devDependencies = {
        ...restDevDeps,
        ...(runnerPkg.buildDependencies || {}),
        ...bundlerDeps
      }
    }

    // Update scripts based on bundler
    const SCRIPTS = {
      parcel: { start: 'parcel index.html', build: 'parcel build index.html' },
      vite: { start: 'vite', build: 'vite build' },
      browser: { start: 'node -e "require(\'@symbo.ls/runner/server\')"', build: 'echo "No build step for browser mode"' }
    }
    const scripts = SCRIPTS[bundler] || SCRIPTS.parcel
    if (pkg.scripts?.start === 'smbls start') pkg.scripts.start = scripts.start
    if (pkg.scripts?.build === 'smbls build') pkg.scripts.build = scripts.build

    writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
    console.log(chalk.green('✓') + ' Updated package.json')

    // Expand .parcelrc for parcel bundler
    if (bundler === 'parcel') {
      const parcelrcPath = resolve(cwd, '.parcelrc')
      if (existsSync(parcelrcPath)) {
        const parcelrc = JSON.parse(readFileSync(parcelrcPath, 'utf8'))
        if (parcelrc.extends === '@symbo.ls/runner') {
          const expanded = {
            extends: '@parcel/config-default',
            transformers: {
              '*.woff2': ['@parcel/transformer-raw'],
              '*.otf': ['@parcel/transformer-raw'],
              '*.svg': ['@parcel/transformer-inline-string']
            }
          }
          writeFileSync(parcelrcPath, JSON.stringify(expanded, null, 2) + '\n')
          console.log(chalk.green('✓') + ' Expanded .parcelrc')
        }
      }
    }

    if (opts.install === false) {
      console.log(chalk.green('Ejected! Run npm install to complete.'))
      return
    }

    console.log('Running npm install...')
    const child = spawn('npm', ['install'], { stdio: 'inherit', cwd })
    child.on('exit', code => {
      if (code === 0) console.log(chalk.green('✓') + ` Ejected to ${bundler} successfully!`)
      else process.exit(code || 1)
    })
  })
