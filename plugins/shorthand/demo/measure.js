/**
 * Measure token/char savings for every component in examples/default/
 * comparing original vs stringify() output.
 * Writes results to size-comparison.md.
 *
 * Usage: node demo/measure.js
 */
import { shorten, stringify } from '../src/index.js'
import * as defaultComponents from '../examples/default/index.js'
import * as landingComponents from '../examples/landing/index.js'
import { DashboardPage } from './big-component.js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

function serialize(obj, indent = 0) {
  const pad = '  '.repeat(indent)
  const pad1 = '  '.repeat(indent + 1)
  if (obj === null) return 'null'
  if (obj === undefined) return 'undefined'
  if (typeof obj === 'function')
    return obj.toString().replace(/\n/g, '\n' + pad)
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    const items = obj.map((i) => pad1 + serialize(i, indent + 1))
    return '[\n' + items.join(',\n') + '\n' + pad + ']'
  }
  if (typeof obj === 'object') {
    const keys = Object.keys(obj)
    if (keys.length === 0) return '{}'
    const entries = keys.map((k) => {
      const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k)
        ? k
        : JSON.stringify(k)
      return pad1 + safeKey + ': ' + serialize(obj[k], indent + 1)
    })
    return '{\n' + entries.join(',\n') + '\n' + pad + '}'
  }
  if (typeof obj === 'string') return "'" + obj.replace(/'/g, "\\'") + "'"
  return String(obj)
}

function tokens(str) {
  return Math.ceil(str.length / 4)
}

function lines(str) {
  return str.split('\n').length
}

function fmt(n) {
  return n.toLocaleString()
}

// ── 1. DashboardPage (big component) ──

const bigOrig = serialize(DashboardPage)
const bigShort = serialize(shorten(DashboardPage))
const bigStrfy = serialize(stringify(DashboardPage))

const bigRows = [
  { label: 'Original', code: bigOrig },
  { label: 'Shortened (shorten)', code: bigShort },
  { label: 'Stringified (stringify)', code: bigStrfy }
].map((r) => ({
  Variant: r.label,
  chars: r.code.length,
  lines: lines(r.code),
  tokens: tokens(r.code)
}))

console.log('\n── DashboardPage ──\n')
console.table(bigRows)

const bigShortenSaving = ((1 - bigShort.length / bigOrig.length) * 100).toFixed(
  1
)
const bigStrfySaving = ((1 - bigStrfy.length / bigOrig.length) * 100).toFixed(1)
console.log(
  `shorten  savings: ${fmt(bigOrig.length - bigShort.length)} chars (${bigShortenSaving}%)`
)
console.log(
  `stringify savings: ${fmt(bigOrig.length - bigStrfy.length)} chars (${bigStrfySaving}%)`
)

// ── 2. Measure a collection of components ──

function measureCollection(label, components) {
  const rows = []
  let totalOrigChars = 0
  let totalStrfyChars = 0
  let totalOrigTokens = 0
  let totalStrfyTokens = 0

  for (const [name, comp] of Object.entries(components)) {
    const origCode = serialize(comp)
    const strfyCode = serialize(stringify(comp))

    const origChars = origCode.length
    const strfyChars = strfyCode.length
    const origTok = tokens(origCode)
    const strfyTok = tokens(strfyCode)
    const saving = ((1 - strfyChars / origChars) * 100).toFixed(1)

    totalOrigChars += origChars
    totalStrfyChars += strfyChars
    totalOrigTokens += origTok
    totalStrfyTokens += strfyTok

    rows.push({ name, origChars, strfyChars, origTok, strfyTok, saving })
  }

  rows.sort((a, b) => b.origChars - a.origChars)

  const totalSaving = ((1 - totalStrfyChars / totalOrigChars) * 100).toFixed(1)

  console.log(`\n── ${label} — ${rows.length} components ──\n`)
  console.table(
    rows.map((r) => ({
      Component: r.name,
      'Orig chars': r.origChars,
      'Strfy chars': r.strfyChars,
      'Orig ~tok': r.origTok,
      'Strfy ~tok': r.strfyTok,
      'Saving %': r.saving + '%'
    }))
  )
  console.log(
    `\nTotal original:    ${fmt(totalOrigChars)} chars  (~${fmt(totalOrigTokens)} tokens)`
  )
  console.log(
    `Total stringified: ${fmt(totalStrfyChars)} chars  (~${fmt(totalStrfyTokens)} tokens)`
  )
  console.log(
    `Savings:           ${fmt(totalOrigChars - totalStrfyChars)} chars  (~${fmt(totalOrigTokens - totalStrfyTokens)} tokens)  ${totalSaving}%`
  )

  const top10 = rows.slice(0, 10)
  const best5 = [...rows]
    .sort((a, b) => parseFloat(b.saving) - parseFloat(a.saving))
    .slice(0, 5)
  const worst5 = [...rows]
    .sort((a, b) => parseFloat(a.saving) - parseFloat(b.saving))
    .slice(0, 5)
  const avgSaving = (
    rows.reduce((s, r) => s + parseFloat(r.saving), 0) / rows.length
  ).toFixed(1)
  const medianSaving = (() => {
    const sorted = rows.map((r) => parseFloat(r.saving)).sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)
    return sorted.length % 2
      ? sorted[mid].toFixed(1)
      : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(1)
  })()

  return {
    label,
    rows,
    totalOrigChars,
    totalStrfyChars,
    totalOrigTokens,
    totalStrfyTokens,
    totalSaving,
    top10,
    best5,
    worst5,
    avgSaving,
    medianSaving
  }
}

const defaultStats = measureCollection('examples/default', defaultComponents)
const landingStats = measureCollection('examples/landing', landingComponents)

// ── 3. Write size-comparison.md ──

function collectionMd(s) {
  return [
    `## ${s.label} — ${s.rows.length} components`,
    '',
    '### Aggregate',
    '',
    '| Metric | Original | Stringified | Saved |',
    '|--------|----------|-------------|-------|',
    `| Characters | ${fmt(s.totalOrigChars)} | ${fmt(s.totalStrfyChars)} | ${fmt(s.totalOrigChars - s.totalStrfyChars)} (${s.totalSaving}%) |`,
    `| ~Tokens | ${fmt(s.totalOrigTokens)} | ${fmt(s.totalStrfyTokens)} | ${fmt(s.totalOrigTokens - s.totalStrfyTokens)} (${s.totalSaving}%) |`,
    `| Components | ${s.rows.length} | ${s.rows.length} | — |`,
    '',
    `- **Average saving per component:** ${s.avgSaving}%`,
    `- **Median saving:** ${s.medianSaving}%`,
    '',
    '### Top 10 largest components',
    '',
    '| # | Component | Orig chars | Strfy chars | Orig ~tok | Strfy ~tok | Saving |',
    '|---|-----------|-----------|-------------|-----------|-----------|--------|',
    ...s.top10.map(
      (r, i) =>
        `| ${i + 1} | ${r.name} | ${fmt(r.origChars)} | ${fmt(r.strfyChars)} | ${r.origTok} | ${r.strfyTok} | ${r.saving}% |`
    ),
    '',
    '### Best compression (top 5)',
    '',
    '| Component | Orig chars | Strfy chars | Saving |',
    '|-----------|-----------|-------------|--------|',
    ...s.best5.map(
      (r) =>
        `| ${r.name} | ${fmt(r.origChars)} | ${fmt(r.strfyChars)} | **${r.saving}%** |`
    ),
    '',
    '### Least compression (bottom 5)',
    '',
    '| Component | Orig chars | Strfy chars | Saving |',
    '|-----------|-----------|-------------|--------|',
    ...s.worst5.map(
      (r) =>
        `| ${r.name} | ${fmt(r.origChars)} | ${fmt(r.strfyChars)} | ${r.saving}% |`
    ),
    '',
    '### All components',
    '',
    '| # | Component | Orig chars | Strfy chars | Orig ~tok | Strfy ~tok | Saving |',
    '|---|-----------|-----------|-------------|-----------|-----------|--------|',
    ...s.rows.map(
      (r, i) =>
        `| ${i + 1} | ${r.name} | ${fmt(r.origChars)} | ${fmt(r.strfyChars)} | ${r.origTok} | ${r.strfyTok} | ${r.saving}% |`
    ),
    ''
  ]
}

const allRows = [...defaultStats.rows, ...landingStats.rows]
const grandOrigChars = defaultStats.totalOrigChars + landingStats.totalOrigChars
const grandStrfyChars =
  defaultStats.totalStrfyChars + landingStats.totalStrfyChars
const grandOrigTokens =
  defaultStats.totalOrigTokens + landingStats.totalOrigTokens
const grandStrfyTokens =
  defaultStats.totalStrfyTokens + landingStats.totalStrfyTokens
const grandSaving = ((1 - grandStrfyChars / grandOrigChars) * 100).toFixed(1)

const md = [
  '# @symbo.ls/shorthand — Size Comparison',
  '',
  '> Auto-generated by `node demo/measure.js`',
  '',
  '---',
  '',
  '## DashboardPage (big component benchmark)',
  '',
  '| Variant | Characters | Lines | ~Tokens |',
  '|---------|-----------|-------|---------|',
  ...bigRows.map(
    (r) => `| ${r.Variant} | ${fmt(r.chars)} | ${r.lines} | ${fmt(r.tokens)} |`
  ),
  '',
  `- **shorten** savings: ${fmt(bigOrig.length - bigShort.length)} chars (${bigShortenSaving}%)`,
  `- **stringify** savings: ${fmt(bigOrig.length - bigStrfy.length)} chars (${bigStrfySaving}%)`,
  '',
  '---',
  '',
  '## Grand total (all collections)',
  '',
  '| Metric | Original | Stringified | Saved |',
  '|--------|----------|-------------|-------|',
  `| Characters | ${fmt(grandOrigChars)} | ${fmt(grandStrfyChars)} | ${fmt(grandOrigChars - grandStrfyChars)} (${grandSaving}%) |`,
  `| ~Tokens | ${fmt(grandOrigTokens)} | ${fmt(grandStrfyTokens)} | ${fmt(grandOrigTokens - grandStrfyTokens)} (${grandSaving}%) |`,
  `| Components | ${allRows.length} | ${allRows.length} | — |`,
  '',
  '---',
  '',
  ...collectionMd(defaultStats),
  '',
  '---',
  '',
  ...collectionMd(landingStats),
  ''
].join('\n')

writeFileSync(join(__dirname, 'size-comparison.md'), md)
console.log('\nWrote demo/size-comparison.md')
