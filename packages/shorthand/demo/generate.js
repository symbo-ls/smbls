import { shorten, stringify, stringifyFurther } from '../src/index.js'
import * as defaultComponents from '../examples/default/index.js'
import * as landingComponents from '../examples/landing/index.js'
import { DashboardPage } from './big-component.js'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

const components = { ...defaultComponents, ...landingComponents }

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

function countTokens(str) {
  return Math.ceil(str.length / 4)
}

function countChars(str) {
  return str.length
}

function countLines(str) {
  return str.split('\n').length
}

function fmt(n) {
  return n.toLocaleString()
}

function pct(part, total) {
  return ((1 - part / total) * 100).toFixed(1)
}

function ratio(part, total) {
  return (part / total).toFixed(2)
}

// ── 1. Process individual components ──

let src = ''
let dest = ''
let strfy = ''
let strfyFurther = ''

let aggOrig = 0
let aggShort = 0
let aggStrfy = 0
let aggStrfyF = 0

for (const [name, comp] of Object.entries(components)) {
  const short = shorten(comp)
  const strd = stringify(comp)
  const strdF = stringifyFurther(comp)

  const origCode = serialize(comp)
  const shortCode = serialize(short)
  const strfyCode = serialize(strd)
  const strfyFCode = serialize(strdF)

  aggOrig += origCode.length
  aggShort += shortCode.length
  aggStrfy += strfyCode.length
  aggStrfyF += strfyFCode.length

  src += '// ── ' + name + ' ──\n'
  src += 'export const ' + name + ' = ' + origCode + '\n\n'

  dest += '// ── ' + name + ' ──\n'
  dest += 'export const ' + name + ' = ' + shortCode + '\n\n'

  strfy += '// ── ' + name + ' ──\n'
  strfy += 'export const ' + name + ' = ' + strfyCode + '\n\n'

  strfyFurther += '// ── ' + name + ' ──\n'
  strfyFurther += 'export const ' + name + ' = ' + strfyFCode + '\n\n'
}

writeFileSync(join(__dirname, 'source.js'), src)
writeFileSync(join(__dirname, 'shortened.js'), dest)
writeFileSync(join(__dirname, 'stringified.js'), strfy)
writeFileSync(join(__dirname, 'stringifiedFurther.js'), strfyFurther)

// ── 2. Big Component: Original vs Optimized ──

const bigSource = serialize(DashboardPage)
const bigShortened = serialize(shorten(DashboardPage))
const bigStringified = serialize(stringify(DashboardPage))
const bigStringifiedFurther = serialize(stringifyFurther(DashboardPage))

writeFileSync(
  join(__dirname, 'big-source.js'),
  '// Original DashboardPage component\n' +
    'export const DashboardPage = ' +
    bigSource +
    '\n'
)
writeFileSync(
  join(__dirname, 'big-shortened.js'),
  '// Shortened DashboardPage (shorten)\n' +
    'export const DashboardPage = ' +
    bigShortened +
    '\n'
)
writeFileSync(
  join(__dirname, 'big-stringified.js'),
  '// Stringified DashboardPage (stringify)\n' +
    'export const DashboardPage = ' +
    bigStringified +
    '\n'
)
writeFileSync(
  join(__dirname, 'big-stringifiedFurther.js'),
  '// StringifiedFurther DashboardPage (stringifyFurther)\n' +
    'export const DashboardPage = ' +
    bigStringifiedFurther +
    '\n'
)

// ── 3. Measurements ──

const bigO = countChars(bigSource)
const bigS = countChars(bigShortened)
const bigSt = countChars(bigStringified)
const bigSF = countChars(bigStringifiedFurther)

const bigOL = countLines(bigSource)
const bigSL = countLines(bigShortened)
const bigStL = countLines(bigStringified)
const bigSFL = countLines(bigStringifiedFurther)

const bigOT = countTokens(bigSource)
const bigST = countTokens(bigShortened)
const bigStT = countTokens(bigStringified)
const bigSFT = countTokens(bigStringifiedFurther)

const compCount = Object.keys(components).length
const defCount = Object.keys(defaultComponents).length
const landCount = Object.keys(landingComponents).length

// ── 3b. Per-collection metrics ──

function measureCollection(label, comps) {
  let orig = 0,
    short = 0,
    strfied = 0,
    strfiedF = 0
  for (const comp of Object.values(comps)) {
    orig += serialize(comp).length
    short += serialize(shorten(comp)).length
    strfied += serialize(stringify(comp)).length
    strfiedF += serialize(stringifyFurther(comp)).length
  }
  return {
    label,
    count: Object.keys(comps).length,
    orig,
    short,
    strfied,
    strfiedF
  }
}

const defStats = measureCollection('examples/default', defaultComponents)
const landStats = measureCollection('examples/landing', landingComponents)

console.log('\nGenerated demo files')
console.log('\n── DashboardPage Size Comparison ──\n')
console.table([
  { Variant: 'Original', Chars: bigO, Lines: bigOL, '~Tokens': bigOT },
  { Variant: 'Shortened', Chars: bigS, Lines: bigSL, '~Tokens': bigST },
  { Variant: 'Stringified', Chars: bigSt, Lines: bigStL, '~Tokens': bigStT },
  {
    Variant: 'StringifiedFurther',
    Chars: bigSF,
    Lines: bigSFL,
    '~Tokens': bigSFT
  }
])

for (const s of [defStats, landStats]) {
  console.log(`\n── ${s.label} (${s.count} components) ──\n`)
  console.table([
    { Variant: 'Original', Chars: s.orig },
    { Variant: 'Shortened', Chars: s.short },
    { Variant: 'Stringified', Chars: s.strfied },
    { Variant: 'StringifiedFurther', Chars: s.strfiedF }
  ])
}

// ── 4. Helper functions for markdown ──

function tok(chars) {
  return Math.ceil(chars / 4)
}

function variantTable(orig, short, strfied, strfiedF) {
  return [
    '| Variant | Characters | ~Tokens | Ratio | Reduction |',
    '|---------|-----------|---------|-------|-----------|',
    `| Original | ${fmt(orig)} | ${fmt(tok(orig))} | 1.00x | — |`,
    `| Shortened | ${fmt(short)} | ${fmt(tok(short))} | ${ratio(short, orig)}x | ${pct(short, orig)}% |`,
    `| Stringified | ${fmt(strfied)} | ${fmt(tok(strfied))} | ${ratio(strfied, orig)}x | ${pct(strfied, orig)}% |`,
    `| StringifiedFurther | ${fmt(strfiedF)} | ${fmt(tok(strfiedF))} | ${ratio(strfiedF, orig)}x | ${pct(strfiedF, orig)}% |`
  ]
}

function collectionMd(s) {
  return [
    `## ${s.label} — ${s.count} components`,
    '',
    ...variantTable(s.orig, s.short, s.strfied, s.strfiedF),
    '',
    '| Transform | Chars saved | Reduction |',
    '|-----------|------------|-----------|',
    `| shorten | ${fmt(s.orig - s.short)} | ${pct(s.short, s.orig)}% |`,
    `| stringify | ${fmt(s.orig - s.strfied)} | ${pct(s.strfied, s.orig)}% |`,
    `| stringifyFurther | ${fmt(s.orig - s.strfiedF)} | ${pct(s.strfiedF, s.orig)}% |`
  ]
}

// ── 5. Write size-comparison.md ──

const md = [
  '# @symbo.ls/shorthand — Size Comparison',
  '',
  '> Auto-generated by `node demo/generate.js`',
  '',
  '---',
  '',
  '## DashboardPage (big component benchmark)',
  '',
  '| Variant | Characters | Lines | ~Tokens | Ratio |',
  '|---------|-----------|-------|---------|-------|',
  `| Original | ${fmt(bigO)} | ${fmt(bigOL)} | ${fmt(bigOT)} | 1.00x |`,
  `| Shortened (shorten) | ${fmt(bigS)} | ${fmt(bigSL)} | ${fmt(bigST)} | ${ratio(bigS, bigO)}x |`,
  `| Stringified (stringify) | ${fmt(bigSt)} | ${fmt(bigStL)} | ${fmt(bigStT)} | ${ratio(bigSt, bigO)}x |`,
  `| StringifiedFurther (stringifyFurther) | ${fmt(bigSF)} | ${fmt(bigSFL)} | ${fmt(bigSFT)} | ${ratio(bigSF, bigO)}x |`,
  '',
  '### Savings vs Original',
  '',
  '| Transform | Chars saved | Tokens saved | Reduction |',
  '|-----------|------------|-------------|-----------|',
  `| shorten | ${fmt(bigO - bigS)} | ${fmt(bigOT - bigST)} | ${pct(bigS, bigO)}% |`,
  `| stringify | ${fmt(bigO - bigSt)} | ${fmt(bigOT - bigStT)} | ${pct(bigSt, bigO)}% |`,
  `| stringifyFurther | ${fmt(bigO - bigSF)} | ${fmt(bigOT - bigSFT)} | ${pct(bigSF, bigO)}% |`,
  '',
  '### Incremental savings (each step)',
  '',
  '| Step | From | To | Chars saved | Reduction vs Original |',
  '|------|------|----|------------|----------------------|',
  `| shorten | Original | Shortened | ${fmt(bigO - bigS)} | ${pct(bigS, bigO)}% |`,
  `| stringify | Shortened | Stringified | ${fmt(bigS - bigSt)} | ${pct(bigSt, bigO)}% |`,
  `| stringifyFurther | Stringified | StringifiedFurther | ${fmt(bigSt - bigSF)} | ${pct(bigSF, bigO)}% |`,
  '',
  '---',
  '',
  ...collectionMd(defStats),
  '',
  '---',
  '',
  ...collectionMd(landStats),
  '',
  '---',
  '',
  `## All ${compCount} components — Aggregate`,
  '',
  ...variantTable(aggOrig, aggShort, aggStrfy, aggStrfyF),
  '',
  '---',
  '',
  '## Combined totals (DashboardPage + All Components)',
  '',
  (() => {
    const tO = bigO + aggOrig
    const tS = bigS + aggShort
    const tSt = bigSt + aggStrfy
    const tSF = bigSF + aggStrfyF
    return variantTable(tO, tS, tSt, tSF).join('\n')
  })(),
  ''
].join('\n')

writeFileSync(join(__dirname, 'size-comparison.md'), md)
console.log('\nWrote demo/size-comparison.md')
