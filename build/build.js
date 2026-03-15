import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'))
const buildScripts = Object.keys(pkg.scripts || {}).filter(k => k.startsWith('build:'))

execSync('rimraf dist', { stdio: 'inherit' })

// bundled builds (iife, browser) run after non-bundled to ensure dep dist/ files exist
const bundled = ['build:iife', 'build:browser']
const parallel = buildScripts.filter(s => !bundled.includes(s))
const sequential = buildScripts.filter(s => bundled.includes(s))

if (parallel.length) {
  const args = parallel.map(s => `"npm:${s}"`).join(' ')
  execSync(`concurrently ${args}`, { stdio: 'inherit' })
}
if (sequential.length) {
  const args = sequential.map(s => `"npm:${s}"`).join(' ')
  execSync(`concurrently ${args}`, { stdio: 'inherit' })
}
