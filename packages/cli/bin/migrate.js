'use strict'

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { detectV2Project, generateV3IndexJs } from './init-helpers/v2detect.js'
import { runInstall } from '../helpers/packageManager.js'
import { runConfigPrompts } from '../helpers/configPrompts.js'

function getLatestSmblsVersion () {
  try {
    return execSync('npm show smbls version', { encoding: 'utf8', stdio: 'pipe' }).trim()
  } catch {
    return null
  }
}

function isV2VersionRange (range) {
  if (!range) return true
  const clean = range.replace(/^[\^~>=<]/, '')
  return parseInt(clean.split('.')[0], 10) < 3
}

function writeFile (filePath, content, label) {
  fs.writeFileSync(filePath, content)
  console.log(chalk.green('write  ') + label)
}

function ensureDir (dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

program
  .command('migrate')
  .description('Migrate a v2 Symbols project to v3')
  .option('--yes', 'Skip confirmation prompt')
  .action(async (opts) => {
    const cwd = process.cwd()
    const info = detectV2Project(cwd)
    const symbolsDir = path.join(cwd, 'symbols')

    if (!info.isV2) {
      console.log(chalk.green('This project is already on v3. Nothing to migrate.'))
      return
    }

    console.log(chalk.bold('\nSymbols v2 → v3 Migration\n'))
    console.log('Detected:')
    if (info.hasLegacyCacheDir) console.log(chalk.yellow('  • .symbols/') + chalk.dim(' → will rename to .symbols_cache/'))
    if (info.hasLegacySmblsDir) console.log(chalk.yellow('  • smbls/') + chalk.dim(' → will rename to symbols/'))
    if (!info.hasAppJs) console.log(chalk.yellow('  • symbols/app.js missing') + chalk.dim(' → will create'))
    if (info.hasIndexJs && !info.hasCreateCall) console.log(chalk.yellow('  • symbols/index.js') + chalk.dim(' → will rewrite to v3 format'))
    console.log()

    if (!opts.yes) {
      const { confirm } = await inquirer.prompt([{
        type: 'confirm',
        name: 'confirm',
        message: 'Proceed with migration?',
        default: true
      }])
      if (!confirm) {
        console.log(chalk.dim('Migration cancelled.'))
        return
      }
    }

    console.log()

    // 1. Rename .symbols → .symbols_cache
    const legacyCacheDir = path.join(cwd, '.symbols')
    const newCacheDir = path.join(cwd, '.symbols_cache')
    if (fs.existsSync(legacyCacheDir) && !fs.existsSync(newCacheDir)) {
      fs.renameSync(legacyCacheDir, newCacheDir)
      console.log(chalk.green('rename ') + '.symbols → .symbols_cache')
    }

    // 2. Rename smbls/ → symbols/ (old source dir name)
    const legacySmblsDir = path.join(cwd, 'smbls')
    if (fs.existsSync(legacySmblsDir) && !fs.existsSync(symbolsDir)) {
      fs.renameSync(legacySmblsDir, symbolsDir)
      console.log(chalk.green('rename ') + 'smbls → symbols')
    }

    // Resolved source dir to work with
    ensureDir(symbolsDir)

    // 3. Create symbols/app.js if missing
    const appJsPath = path.join(symbolsDir, 'app.js')
    if (!fs.existsSync(appJsPath)) {
      writeFile(appJsPath, 'export default {}\n', 'symbols/app.js')
    } else {
      console.log(chalk.dim('skip   symbols/app.js (exists)'))
    }

    // 4. Rewrite symbols/index.js to v3 format
    const indexJsPath = path.join(symbolsDir, 'index.js')
    const v3Index = generateV3IndexJs(symbolsDir)
    if (v3Index) {
      writeFile(indexJsPath, v3Index, 'symbols/index.js')
    } else {
      console.log(chalk.yellow('skip   symbols/index.js (no known modules found)'))
    }

    // 5. Create symbols/index.html if missing
    const symbolsHtml = path.join(symbolsDir, 'index.html')
    if (!fs.existsSync(symbolsHtml)) {
      const htmlTemplate = `<html background="#000">
<head>
  <title>Symbols App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta charset="UTF-8">
</head>
<body>
  <script type="module" src="./index.js"></script>
</body>
</html>
`
      writeFile(symbolsHtml, htmlTemplate, 'symbols/index.html')
    } else {
      console.log(chalk.dim('skip   symbols/index.html (exists)'))
    }

    // 6. Update package.json scripts
    const pkgPath = path.join(cwd, 'package.json')
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
      let changed = false
      pkg.scripts = pkg.scripts || {}
      if (!pkg.scripts.start || !pkg.scripts.start.includes('smbls')) {
        pkg.scripts.start = 'smbls start'
        changed = true
      }
      if (!pkg.scripts.build || !pkg.scripts.build.includes('smbls')) {
        pkg.scripts.build = 'smbls build'
        changed = true
      }
      pkg.dependencies = pkg.dependencies || {}
      if (!pkg.dependencies.smbls || isV2VersionRange(pkg.dependencies.smbls)) {
        const latest = getLatestSmblsVersion()
        pkg.dependencies.smbls = latest ? `^${latest}` : 'latest'
        changed = true
      }
      if (changed) {
        fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
        console.log(chalk.green('update ') + 'package.json')
      }
    }

    // 7. Run config prompts to set up symbols.json (bundler, packageManager, etc.)
    const symbolsPath = path.join(cwd, 'symbols.json')
    const existingSymbols = fs.existsSync(symbolsPath)
      ? JSON.parse(fs.readFileSync(symbolsPath, 'utf8'))
      : {}
    if (!existingSymbols.distDir || existingSymbols.distDir === './smbls') {
      existingSymbols.distDir = './symbols'
    }
    console.log(chalk.bold('\nConfigure your project:\n'))
    const { packageManager: pm, bundler } = await runConfigPrompts(existingSymbols)
    console.log()

    // 8. Install dependencies (skip for browser bundler)
    if (bundler === 'browser') {
      console.log(chalk.dim('Browser mode — skipping install.'))
    } else {
      console.log(chalk.bold(`Installing dependencies with ${pm}...\n`))
      const installResult = runInstall(pm, cwd)
      if (installResult.status !== 0) {
        console.log(chalk.yellow(`Install exited with code ${installResult.status}. Run \`${pm} install\` manually.`))
      }
    }

    console.log()
    console.log(chalk.green.bold('Migration complete!'))
    console.log(chalk.dim('Run `smbls start` to start the development server.'))
    console.log()
    console.log(chalk.bold('Next steps:'))
    console.log(chalk.dim('  • Review symbols/app.js — add your app config (routes, theme, etc.)'))
    console.log(chalk.dim('  • Check that symbols/index.js imports match your actual files'))
    console.log(chalk.dim('  • Update extend → extends, childExtend → childExtends in components'))
  })
