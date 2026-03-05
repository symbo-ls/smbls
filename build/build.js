import { execSync } from 'child_process'
import { readFileSync } from 'fs'
import { resolve } from 'path'

const pkg = JSON.parse(readFileSync(resolve(process.cwd(), 'package.json'), 'utf8'))
const buildScripts = Object.keys(pkg.scripts || {}).filter(k => k.startsWith('build:'))

execSync('rimraf dist', { stdio: 'inherit' })

// esm, cjs, node etc run in parallel (no bundling, no dep resolution)
const parallel = buildScripts.filter(s => s !== 'build:iife')
// iife bundles deps, so it runs after to ensure dep dist/ files exist
const sequential = buildScripts.filter(s => s === 'build:iife')

if (parallel.length) {
  const args = parallel.map(s => `"npm:${s}"`).join(' ')
  execSync(`concurrently ${args}`, { stdio: 'inherit' })
}
if (sequential.length) {
  execSync('npm run build:iife', { stdio: 'inherit' })
}
