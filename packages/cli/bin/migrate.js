'use strict'

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { detectV2Project, generateV3IndexJs, generateContextJs } from './init-helpers/v2detect.js'
import { runInstall } from '../helpers/packageManager.js'
import { runConfigPrompts } from '../helpers/configPrompts.js'

const STARTER_KIT_PKG_URL = 'https://raw.githubusercontent.com/symbo-ls/starter-kit/next/package.json'

function getStarterKitSmblsVersion () {
  try {
    const out = execSync(`curl -sf ${STARTER_KIT_PKG_URL}`, { encoding: 'utf8', stdio: 'pipe' })
    const pkg = JSON.parse(out)
    return pkg.dependencies?.smbls || null
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
    const CDN_PMs = new Set(['esm.sh', 'unpkg', 'skypack', 'jsdelivr', 'pkg.symbo.ls'])
    const info = detectV2Project(cwd)
    const symbolsDir = path.join(cwd, 'symbols')

    if (!info.isV2) {
      console.log(chalk.green('This project is already on v3. Nothing to migrate.'))
      return
    }

    console.log(chalk.bold('\nSymbols v2 → v3 Migration\n'))
    console.log('Detected:')
    if (info.hasLegacyCacheDir) console.log(chalk.yellow('  • .symbols/') + chalk.dim(' → will rename to .symbols_local/'))
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

    // 1. Rename .symbols → .symbols_local
    const legacyCacheDir = path.join(cwd, '.symbols')
    const newLocalDir = path.join(cwd, '.symbols_local')
    if (fs.existsSync(legacyCacheDir) && !fs.existsSync(newLocalDir)) {
      fs.renameSync(legacyCacheDir, newLocalDir)
      console.log(chalk.green('rename ') + '.symbols → .symbols_local')
    }

    // 2. Rename smbls/ → symbols/ (old source dir name)
    const legacySmblsDir = path.join(cwd, 'smbls')
    if (fs.existsSync(legacySmblsDir) && !fs.existsSync(symbolsDir)) {
      fs.renameSync(legacySmblsDir, symbolsDir)
      console.log(chalk.green('rename ') + 'smbls → symbols')
    }

    // Resolved source dir to work with
    ensureDir(symbolsDir)

    // 3a. Lowercase all files in designSystem/ and fix designSystem/index.js format
    const dsDir = path.join(symbolsDir, 'designSystem')
    if (fs.existsSync(dsDir)) {
      const DS_RESERVED = new Set([
        'class', 'default', 'export', 'import', 'return', 'let', 'const', 'var',
        'function', 'new', 'this', 'super', 'extends', 'yield', 'await', 'delete',
        'typeof', 'void', 'in', 'of', 'for', 'while', 'do', 'if', 'else',
        'switch', 'case', 'break', 'continue', 'throw', 'try', 'catch', 'finally',
        'with', 'debugger', 'static'
      ])
      const dsFiles = fs.readdirSync(dsDir)
      let renamedCount = 0
      for (const file of dsFiles) {
        if (file === 'index.js') continue
        const lower = file.toLowerCase()
        if (file !== lower) {
          fs.renameSync(path.join(dsDir, file), path.join(dsDir, lower))
          renamedCount++
        }
      }

      // Update designSystem/index.js
      const dsIndex = path.join(dsDir, 'index.js')
      if (fs.existsSync(dsIndex)) {
        const src = fs.readFileSync(dsIndex, 'utf8')

        // Build mapping: oldVar → { newVar, exportKey } from import lines
        // e.g. `import fontFamily from './FONT_FAMILY.js'` → fontFamily → { newVar: 'font_family', exportKey: 'font_family' }
        // e.g. `import _class from './CLASS.js'`           → _class    → { newVar: '_class',      exportKey: 'class' }
        const importVarMap = {}
        src.replace(/^import\s+(\w+)\s+from\s+'\.\/([^']+?)(?:\.js)?'/gm, (_, oldVar, importPath) => {
          const stem = importPath.toLowerCase().replace(/\.js$/, '')
          const rawName = stem.replace(/-/g, '_')
          const newVar = DS_RESERVED.has(rawName) ? `_${rawName}` : rawName
          importVarMap[oldVar] = { newVar, exportKey: rawName }
        })

        const configEntries = []
        let updated = src

        // 1. Rewrite import variable names using the computed mapping
        updated = updated.replace(/^(import\s+)(\w+)(\s+from)/gm, (_, pre, oldVar, post) => {
          const entry = importVarMap[oldVar]
          return `${pre}${entry ? entry.newVar : oldVar}${post}`
        })

        // 2. Lowercase import paths
        updated = updated.replace(/(from '\.\/)([\w./\\-]+)(')/g, (_, pre, p, post) => {
          return `${pre}${p.toLowerCase()}${post}`
        })

        // 3. Extract config keys from export object and collect for config.js
        updated = updated.replace(
          /^[ \t]+(useReset|useVariable|useFontImport|useIconSprite|useSvgSprite|useDefaultConfig|useDocumentTheme|useDefaultIcons|verbose|globalTheme|version|router)\s*:\s*([^\n,]+?),?\s*$/gm,
          (_, key, rawVal) => {
            let val = rawVal.trim()
            try { val = JSON.parse(val) } catch (_) {}
            configEntries.push([key, val])
            return ''
          }
        )

        // 4. Convert `  UPPER_KEY: oldVar,` → shorthand `  newVar,` or `  exportKey: newVar,`
        updated = updated.replace(/^([ \t]+)([A-Z][A-Z0-9_]*)\s*:\s*(\w+),?$/gm, (_, indent, key, oldVar) => {
          const entry = importVarMap[oldVar]
          if (entry) {
            const { newVar, exportKey } = entry
            return DS_RESERVED.has(exportKey) ? `${indent}${exportKey}: ${newVar},` : `${indent}${newVar},`
          }
          // Fallback: lowercase the key, keep existing var
          return `${indent}${key.toLowerCase()}: ${oldVar},`
        })

        // 5. Handle any remaining shorthand uppercase keys `  UPPER_KEY,`
        updated = updated.replace(/^([ \t]+)([A-Z][A-Z0-9_]+),$/gm, (_, indent, key) => {
          const rawName = key.toLowerCase().replace(/-/g, '_')
          const newVar = DS_RESERVED.has(rawName) ? `_${rawName}` : rawName
          return DS_RESERVED.has(rawName) ? `${indent}${rawName}: ${newVar},` : `${indent}${newVar},`
        })

        // 6. Clean up blank lines from removed config keys
        updated = updated.replace(/\n{3,}/g, '\n\n').replace(/\n\n(\s*\})/g, '\n$1').trimEnd() + '\n'

        fs.writeFileSync(dsIndex, updated)

        // 7. Write config entries to config.js (merge without overwriting existing)
        if (configEntries.length > 0) {
          const configPath = path.join(symbolsDir, 'config.js')
          const existingKeys = new Set()
          let existingContent = ''
          if (fs.existsSync(configPath)) {
            existingContent = fs.readFileSync(configPath, 'utf8')
            for (const m of existingContent.matchAll(/^\s*(\w+)\s*:/gm)) existingKeys.add(m[1])
          }
          const newEntries = configEntries.filter(([k]) => !existingKeys.has(k))
          if (newEntries.length > 0) {
            const lines = newEntries.map(([k, v]) => `  ${k}: ${JSON.stringify(v)},`)
            const newContent = existingContent
              ? existingContent.replace(/\}\s*$/, `  ${lines.join('\n  ')}\n}\n`)
              : `export default {\n${lines.join('\n')}\n}\n`
            fs.writeFileSync(configPath, newContent)
            console.log(chalk.green('write  ') + `symbols/config.js (${newEntries.length} config keys moved)`)
          }
        }
      }
      if (renamedCount) console.log(chalk.green('lower  ') + `designSystem/ (${renamedCount} files renamed to lowercase)`)
    }

    // 3. Create symbols/app.js if missing
    const appJsPath = path.join(symbolsDir, 'app.js')
    if (!fs.existsSync(appJsPath)) {
      writeFile(appJsPath, 'export default {}\n', 'symbols/app.js')
    } else {
      console.log(chalk.dim('skip   symbols/app.js (exists)'))
    }

    // 4. Create sharedLibraries.js if missing (before context.js so it gets picked up)
    const sharedLibsPath = path.join(symbolsDir, 'sharedLibraries.js')
    if (!fs.existsSync(sharedLibsPath)) {
      writeFile(sharedLibsPath, 'export default []\n', 'symbols/sharedLibraries.js')
    }

    // 5. Rewrite symbols/index.js to v3 format
    const indexJsPath = path.join(symbolsDir, 'index.js')
    const earlySymbols = fs.existsSync(path.join(cwd, 'symbols.json'))
      ? JSON.parse(fs.readFileSync(path.join(cwd, 'symbols.json'), 'utf8'))
      : {}
    const isCdnMode = earlySymbols.runtime === 'browser' || CDN_PMs.has(earlySymbols.packageManager)
    // Generate context.js (contains all module imports/exports)
    const contextJsPath = path.join(symbolsDir, 'context.js')
    const contextContent = generateContextJs(symbolsDir)
    if (contextContent) {
      writeFile(contextJsPath, contextContent, 'symbols/context.js')
    }

    const v3Index = generateV3IndexJs(symbolsDir, { isCdnMode })
    if (v3Index) {
      writeFile(indexJsPath, v3Index, 'symbols/index.js')
    } else {
      console.log(chalk.yellow('skip   symbols/index.js (no known modules found)'))
    }

    // 5. Create symbols/index.html if missing
    const symbolsHtml = path.join(symbolsDir, 'index.html')
    if (!fs.existsSync(symbolsHtml)) {
      const cdnHeadTags = isCdnMode ? `  <script type="importmap">
{
  "imports": {
    "smbls": "https://esm.sh/smbls"
  }
}
</script>
  <script type="module">
    import * as smbls from 'smbls'
    Object.assign(globalThis, smbls)
  </script>
` : ''
      const htmlTemplate = `<html background="#000">
<head>
  <title>Symbols App</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta charset="UTF-8">
${cdnHeadTags}</head>
<body>
  <script type="module" src="./index.js"></script>
</body>
</html>
`
      writeFile(symbolsHtml, htmlTemplate, 'symbols/index.html')
    } else {
      console.log(chalk.dim('skip   symbols/index.html (exists)'))
    }

    // 6. Update package.json scripts, deps, and remove bundler-handled devDeps
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
        const smblsVersion = getStarterKitSmblsVersion()
        pkg.dependencies.smbls = smblsVersion || 'latest'
        changed = true
      }
      // Remove devDeps that smbls runner already handles
      const RUNNER_HANDLED = new Set([
        'parcel', 'vite',
        '@babel/core', '@babel/preset-env', '@parcel/babel-preset-env',
        'buffer'
      ])
      if (pkg.devDependencies) {
        for (const dep of RUNNER_HANDLED) {
          if (dep in pkg.devDependencies) {
            delete pkg.devDependencies[dep]
            changed = true
          }
        }
        if (Object.keys(pkg.devDependencies).length === 0) {
          delete pkg.devDependencies
        }
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
    if (!existingSymbols.dir || existingSymbols.dir === './smbls' || existingSymbols.distDir === './smbls') {
      existingSymbols.dir = './symbols'
    }
    delete existingSymbols.distDir
    console.log(chalk.bold('\nConfigure your project:\n'))
    const { packageManager: pm, bundler } = await runConfigPrompts(existingSymbols)
    console.log()

    // 8. Install dependencies (skip for browser/CDN mode)
    if (bundler === 'browser' || CDN_PMs.has(pm)) {
      console.log(chalk.dim('Preparing environment...'))
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
    console.log(chalk.dim('  • Review symbols/index.js — add your app config (routes, theme, etc.)'))
    console.log(chalk.dim('  • Check that symbols/index.js imports match your actual files'))
    console.log(chalk.dim('  • Update extend → extends, childExtend → childExtends in components'))
  })
