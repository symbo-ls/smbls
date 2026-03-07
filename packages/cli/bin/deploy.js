'use strict'

import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import inquirer from 'inquirer'
import { program } from './program.js'
import { loadSymbolsConfig } from '../helpers/symbolsConfig.js'
import { loadCliConfig, updateSymbolsJson } from '../helpers/config.js'
import { resolveBundler, getRunnerConfig, findBin, spawnBin } from './bundler.js'

const DEPLOY_PROVIDERS = [
  { name: 'Symbols    — push to Symbols platform', value: 'symbols' },
  { name: 'Cloudflare — deploy to Cloudflare Pages', value: 'cloudflare' },
  { name: 'Vercel     — deploy to Vercel', value: 'vercel' },
  { name: 'Netlify    — deploy to Netlify', value: 'netlify' },
  { name: 'GitHub     — deploy to GitHub Pages', value: 'github-pages' }
]

function writeWranglerConfig (cwd, name) {
  const configPath = path.join(cwd, 'wrangler.jsonc')
  if (fs.existsSync(configPath)) {
    console.log(chalk.dim('wrangler.jsonc already exists, skipping'))
    return
  }
  const config = {
    name: name || path.basename(cwd),
    compatibility_date: new Date().toISOString().split('T')[0],
    assets: {
      directory: './dist',
      not_found_handling: 'single-page-application'
    }
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n')
  console.log(chalk.green('✓') + ' Created wrangler.jsonc')
}

function writeVercelConfig (cwd) {
  const configPath = path.join(cwd, 'vercel.json')
  if (fs.existsSync(configPath)) {
    console.log(chalk.dim('vercel.json already exists, skipping'))
    return
  }
  const config = {
    buildCommand: 'npx smbls build',
    outputDirectory: 'dist'
  }
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2) + '\n')
  console.log(chalk.green('✓') + ' Created vercel.json')
}

function writeNetlifyConfig (cwd) {
  const configPath = path.join(cwd, 'netlify.toml')
  if (fs.existsSync(configPath)) {
    console.log(chalk.dim('netlify.toml already exists, skipping'))
    return
  }
  const config = `[build]
  command = "npx smbls build"
  publish = "dist"
`
  fs.writeFileSync(configPath, config)
  console.log(chalk.green('✓') + ' Created netlify.toml')
}

function writeGitHubPagesWorkflow (cwd) {
  const dir = path.join(cwd, '.github', 'workflows')
  const configPath = path.join(dir, 'deploy.yml')
  if (fs.existsSync(configPath)) {
    console.log(chalk.dim('.github/workflows/deploy.yml already exists, skipping'))
    return
  }
  fs.mkdirSync(dir, { recursive: true })
  const workflow = `name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm install
      - run: npx smbls build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
        id: deployment
`
  fs.writeFileSync(configPath, workflow)
  console.log(chalk.green('✓') + ' Created .github/workflows/deploy.yml')
}

const waitForExit = (child) => new Promise(resolve => {
  child.on('exit', code => resolve(code || 0))
})

async function initProvider (provider, cwd, config) {
  switch (provider) {
    case 'cloudflare':
      writeWranglerConfig(cwd, config.key?.split('.')[0])
      console.log(chalk.dim('\nTo deploy: npx wrangler pages deploy dist'))
      break
    case 'vercel':
      writeVercelConfig(cwd)
      console.log(chalk.dim('\nTo deploy: npx vercel'))
      break
    case 'netlify':
      writeNetlifyConfig(cwd)
      console.log(chalk.dim('\nTo deploy: npx netlify deploy --prod'))
      break
    case 'github-pages':
      writeGitHubPagesWorkflow(cwd)
      console.log(chalk.dim('\nPush to main branch to trigger deployment'))
      break
  }
}

async function runDeploy (provider, cwd, opts) {
  const config = getRunnerConfig(cwd)
  const outDir = opts.outDir || config.distDir

  switch (provider) {
    case 'symbols': {
      const { pushProjectChanges } = await import('./push.js')
      await pushProjectChanges(opts)
      return
    }
    case 'cloudflare': {
      if (!fs.existsSync(path.join(cwd, 'wrangler.jsonc')) && !fs.existsSync(path.join(cwd, 'wrangler.toml'))) {
        const symbolsConfig = await loadSymbolsConfig({ required: false, validateKey: false, silent: true }) || {}
        writeWranglerConfig(cwd, symbolsConfig.key?.split('.')[0])
      }
      console.log(chalk.dim('Building...'))
      const buildArgs = ['build', config.entry, '--dist-dir', outDir].filter(Boolean)
      const bundler = opts.bundler || await resolveBundler(cwd)
      const buildChild = spawnBin(findBin(bundler === 'vite' ? 'vite' : 'parcel', cwd), bundler === 'vite' ? ['build', '--outDir', outDir] : buildArgs, cwd)
      const buildCode = await waitForExit(buildChild)
      if (buildCode !== 0) return process.exit(buildCode)

      console.log(chalk.dim('Deploying to Cloudflare Pages...'))
      const child = spawnBin(findBin('wrangler', cwd), ['pages', 'deploy', outDir], cwd)
      const code = await waitForExit(child)
      if (code !== 0) return process.exit(code)
      console.log(chalk.green('✓') + ' Deployed to Cloudflare Pages')
      return
    }
    case 'vercel': {
      console.log(chalk.dim('Deploying to Vercel...'))
      const child = spawnBin(findBin('vercel', cwd), ['--prod'], cwd)
      const code = await waitForExit(child)
      if (code !== 0) return process.exit(code)
      console.log(chalk.green('✓') + ' Deployed to Vercel')
      return
    }
    case 'netlify': {
      console.log(chalk.dim('Building...'))
      const buildArgs = ['build', config.entry, '--dist-dir', outDir].filter(Boolean)
      const bundler = opts.bundler || await resolveBundler(cwd)
      const buildChild = spawnBin(findBin(bundler === 'vite' ? 'vite' : 'parcel', cwd), bundler === 'vite' ? ['build', '--outDir', outDir] : buildArgs, cwd)
      const buildCode = await waitForExit(buildChild)
      if (buildCode !== 0) return process.exit(buildCode)

      console.log(chalk.dim('Deploying to Netlify...'))
      const child = spawnBin(findBin('netlify', cwd), ['deploy', '--prod', '--dir', outDir], cwd)
      const code = await waitForExit(child)
      if (code !== 0) return process.exit(code)
      console.log(chalk.green('✓') + ' Deployed to Netlify')
      return
    }
    case 'github-pages': {
      console.log(chalk.yellow('GitHub Pages deploys via CI — push to your main branch to trigger deployment.'))
      if (!fs.existsSync(path.join(cwd, '.github', 'workflows', 'deploy.yml'))) {
        writeGitHubPagesWorkflow(cwd)
      }
      return
    }
  }
}

program
  .command('deploy')
  .description('Deploy project to hosting provider')
  .option('--provider <provider>', 'Deploy target: symbols, cloudflare, vercel, netlify, github-pages')
  .option('--init', 'Initialize deployment config without deploying')
  .option('--out-dir <dir>', 'Output directory for build')
  .option('--bundler <bundler>', 'Force bundler: parcel, vite, browser')
  .action(async (opts) => {
    const cwd = process.cwd()
    const symbolsConfig = await loadSymbolsConfig({ required: false, validateKey: false, silent: true }) || {}
    const cliConfig = loadCliConfig()
    let provider = opts.provider || cliConfig.deploy || symbolsConfig.deploy

    if (!provider) {
      const { selectedProvider } = await inquirer.prompt([{
        type: 'list',
        name: 'selectedProvider',
        message: 'Deploy to:',
        choices: DEPLOY_PROVIDERS,
        default: 'symbols'
      }])
      provider = selectedProvider

      const { save } = await inquirer.prompt([{
        type: 'confirm',
        name: 'save',
        message: `Save "${provider}" as default deploy target?`,
        default: true
      }])

      if (save) {
        updateLegacySymbolsJson({ ...symbolsConfig, deploy: provider })
        console.log(chalk.dim(`Saved to symbols.json`))
      }
    }

    if (opts.init) {
      await initProvider(provider, cwd, symbolsConfig)
      return
    }

    await runDeploy(provider, cwd, opts)
  })
