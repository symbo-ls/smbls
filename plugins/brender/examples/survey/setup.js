#!/usr/bin/env node
// Automates full Supabase setup for ai-survey
// Reads/writes credentials from/to .env
//
// Usage:
//   node setup.js
//
// Requires SUPABASE_ACCESS_TOKEN in .env (or exported in shell)
// Get it at: https://supabase.com/dashboard/account/tokens

const https = require('https')
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

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

function saveEnv (file, values) {
  var existing = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : ''
  var lines = existing ? existing.split('\n') : []
  Object.keys(values).forEach(function (key) {
    var idx = lines.findIndex(function (l) { return l.match(new RegExp('^' + key + '=')) })
    var line = key + '=' + values[key]
    if (idx >= 0) lines[idx] = line
    else lines.push(line)
  })
  fs.writeFileSync(file, lines.join('\n').replace(/\n{3,}/g, '\n\n').trimEnd() + '\n')
}

var envFile = path.join(__dirname, '.env')
var env = loadEnv(envFile)
var token = process.env.SUPABASE_ACCESS_TOKEN || env.SUPABASE_ACCESS_TOKEN

if (!token) {
  console.error('\nMissing SUPABASE_ACCESS_TOKEN\n')
  console.error('  1. Go to https://supabase.com/dashboard/account/tokens')
  console.error('  2. Add it to .env:  SUPABASE_ACCESS_TOKEN=sbp_xxx')
  console.error('  3. Run: node setup.js\n')
  process.exit(1)
}

const SQL = `
CREATE TABLE IF NOT EXISTS survey_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  data jsonb NOT NULL
);
ALTER TABLE survey_submissions ENABLE ROW LEVEL SECURITY;
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'survey_submissions' AND policyname = 'public_insert'
  ) THEN
    CREATE POLICY "public_insert" ON survey_submissions FOR INSERT WITH CHECK (true);
  END IF;
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'survey_submissions' AND policyname = 'public_select'
  ) THEN
    CREATE POLICY "public_select" ON survey_submissions FOR SELECT USING (true);
  END IF;
END $$;
`

function api (method, p, body) {
  return new Promise(function (resolve, reject) {
    var data = body ? JSON.stringify(body) : null
    var opts = {
      hostname: 'api.supabase.com',
      path: p,
      method: method,
      headers: Object.assign(
        { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json' },
        data ? { 'Content-Length': Buffer.byteLength(data) } : {}
      )
    }
    var req = https.request(opts, function (res) {
      var buf = ''
      res.on('data', function (c) { buf += c })
      res.on('end', function () {
        try { resolve({ status: res.statusCode, data: JSON.parse(buf) }) }
        catch (e) { resolve({ status: res.statusCode, data: buf }) }
      })
    })
    req.on('error', reject)
    if (data) req.write(data)
    req.end()
  })
}

function sleep (ms) {
  return new Promise(function (resolve) { setTimeout(resolve, ms) })
}

async function waitForProject (ref) {
  process.stdout.write('Waiting for project to be ready')
  for (var i = 0; i < 40; i++) {
    await sleep(5000)
    var r = await api('GET', '/v1/projects/' + ref)
    process.stdout.write('.')
    if (r.data && r.data.status === 'ACTIVE_HEALTHY') {
      process.stdout.write(' ready\n')
      return
    }
  }
  process.stdout.write('\n')
  console.error('Timed out. Resume with: node setup.js --ref ' + ref)
  process.exit(1)
}

async function main () {
  var existingRef = env.SUPABASE_PROJECT_REF || null
  var refFlag = process.argv.indexOf('--ref')
  if (refFlag !== -1) existingRef = process.argv[refFlag + 1]

  var projectRef

  if (existingRef) {
    projectRef = existingRef
    console.log('\nUsing existing project:', projectRef)
  } else {
    console.log('\nFetching organisations...')
    var orgs = await api('GET', '/v1/organizations')
    if (orgs.status !== 200 || !orgs.data.length) {
      console.error('Failed to fetch organisations:', orgs.data)
      process.exit(1)
    }
    var org = orgs.data[0]
    console.log('Organisation:', org.name + (orgs.data.length > 1 ? ' (first of ' + orgs.data.length + ')' : ''))

    console.log('Creating project "ai-survey"...')
    var dbPass = crypto.randomBytes(16).toString('hex') + 'Aa1!'
    var preferredOrgId = env.SUPABASE_ORG_ID || null
    if (preferredOrgId) {
      var preferred = orgs.data.find(function (o) { return o.id === preferredOrgId })
      if (preferred) orgs.data = [preferred].concat(orgs.data.filter(function (o) { return o.id !== preferredOrgId }))
    }
    var created = null
    for (var i = 0; i < orgs.data.length; i++) {
      var candidate = orgs.data[i]
      process.stdout.write('  Trying org: ' + candidate.name + ' ... ')
      var res = await api('POST', '/v1/projects', {
        name: 'ai-survey',
        organization_id: candidate.id,
        plan: 'free',
        region: 'us-east-1',
        db_pass: dbPass
      })
      if (res.status === 201) {
        process.stdout.write('ok\n')
        created = res
        break
      }
      process.stdout.write('denied (' + (res.data && res.data.message || res.status) + ')\n')
    }
    if (!created) {
      console.error('\nFailed to create project in any organisation.')
      console.error('You can create the project manually at https://supabase.com and then run:')
      console.error('  node setup.js --ref <project-ref>\n')
      process.exit(1)
    }
    projectRef = created.data.id
    console.log('Project created:', projectRef)
    saveEnv(envFile, { SUPABASE_PROJECT_REF: projectRef })
    await waitForProject(projectRef)
  }

  console.log('Running SQL migration...')
  var sql = await api('POST', '/v1/projects/' + projectRef + '/database/query', { query: SQL })
  if (sql.status !== 200 && sql.status !== 201) {
    console.error('SQL failed (' + sql.status + '):', sql.data)
    console.error('Resume with: node setup.js --ref ' + projectRef)
    process.exit(1)
  }
  console.log('Table + policies created')

  console.log('Fetching API keys...')
  var keys = await api('GET', '/v1/projects/' + projectRef + '/api-keys')
  if (keys.status !== 200) {
    console.error('Failed to fetch keys:', keys.data)
    process.exit(1)
  }
  var anonKey = (keys.data.find(function (k) { return k.name === 'anon' }) || {}).api_key
  if (!anonKey) {
    console.error('Could not find anon key:', keys.data)
    process.exit(1)
  }

  var url = 'https://' + projectRef + '.supabase.co'
  saveEnv(envFile, { SUPABASE_URL: url, SUPABASE_ANON_KEY: anonKey })

  console.log('\n✓ Supabase ready')
  console.log('  Project :', projectRef)
  console.log('  URL     :', url)
  console.log('  .env    : SUPABASE_URL + SUPABASE_ANON_KEY saved\n')
}

main().catch(function (err) {
  console.error('Unexpected error:', err)
  process.exit(1)
})
