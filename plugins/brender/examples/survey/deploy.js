#!/usr/bin/env node
// Full deploy: Supabase setup → build → Cloudflare Pages deploy
//
// Usage:
//   node deploy.js
//
// Fill in .env before running (copy from .env.example)

const fs = require('fs')
const path = require('path')
const { execSync, spawnSync } = require('child_process')

// --- .env helpers ---
function loadEnv (file) {
  var env = {}
  if (!fs.existsSync(file)) return env
  fs.readFileSync(file, 'utf8').split('\n').forEach(function (line) {
    var m = line.match(/^([^#=\s][^=]*)=(.*)$/)
    if (m) env[m[1].trim()] = m[2].trim()
  })
  return env
}

function run (cmd, opts) {
  console.log('\n$ ' + cmd)
  var result = spawnSync(cmd, { shell: true, stdio: 'inherit', ...opts })
  if (result.status !== 0) {
    console.error('\nCommand failed: ' + cmd)
    process.exit(result.status || 1)
  }
}

var envFile = path.join(__dirname, '.env')

if (!fs.existsSync(envFile)) {
  console.error('\n.env not found. Copy .env.example to .env and fill in your credentials.\n')
  process.exit(1)
}

var env = loadEnv(envFile)

// Inject .env into process.env for child processes (wrangler reads CLOUDFLARE_* from env)
Object.keys(env).forEach(function (k) {
  if (!process.env[k]) process.env[k] = env[k]
})

async function main () {
  // --- Step 1: Supabase setup (if not already configured) ---
  var needsSupabase = !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY
  if (needsSupabase) {
    if (!env.SUPABASE_ACCESS_TOKEN) {
      console.error('\nSUPABASE_ACCESS_TOKEN missing in .env — needed to create Supabase project.')
      console.error('Get it at: https://supabase.com/dashboard/account/tokens\n')
      process.exit(1)
    }
    console.log('\n── Supabase setup ──────────────────────────')
    run('node setup.js')
    // Reload .env after setup.js wrote SUPABASE_URL + SUPABASE_ANON_KEY
    env = loadEnv(envFile)
    process.env.SUPABASE_URL = env.SUPABASE_URL
    process.env.SUPABASE_ANON_KEY = env.SUPABASE_ANON_KEY
  } else {
    console.log('\n── Supabase already configured, skipping setup ──')
    console.log('   ' + env.SUPABASE_URL)
  }

  // --- Step 2: Build ---
  console.log('\n── Build ───────────────────────────────────')
  run('npm run build')

  // --- Step 3: Deploy to Cloudflare Pages ---
  console.log('\n── Cloudflare Pages deploy ─────────────────')
  if (!env.CLOUDFLARE_API_TOKEN) {
    console.log('CLOUDFLARE_API_TOKEN not set — falling back to wrangler login session')
  }
  var accountFlag = env.CLOUDFLARE_ACCOUNT_ID ? ' --account-id ' + env.CLOUDFLARE_ACCOUNT_ID : ''
  run('./node_modules/.bin/wrangler pages deploy dist --project-name ai-survey' + accountFlag)

  console.log('\n✓ Deploy complete!')
}

main().catch(function (err) {
  console.error('Unexpected error:', err)
  process.exit(1)
})
