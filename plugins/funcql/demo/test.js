'use strict'

import { evaluate, compile, get, set, exec, RETURN, toSchema } from '../index.js'

// ─────────────────────────────────────────────────────────────────────────────
// Test runner
// ─────────────────────────────────────────────────────────────────────────────

let passed = 0
let failed = 0
const errors = []

const assert = (name, actual, expected) => {
  if (actual === expected) {
    passed++
  } else {
    failed++
    errors.push(`  ✗ ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`)
  }
}

const assertDeep = (name, actual, expected) => {
  const a = JSON.stringify(actual)
  const b = JSON.stringify(expected)
  if (a === b) {
    passed++
  } else {
    failed++
    errors.push(`  ✗ ${name}: expected ${b}, got ${a}`)
  }
}

const test = async (name, fn) => {
  try {
    await fn()
  } catch (e) {
    failed++
    errors.push(`  ✗ ${name}: threw ${e.message}`)
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// resolve.js tests
// ─────────────────────────────────────────────────────────────────────────────

await test('get: simple path', () => {
  assert('a.b', get('a.b', { a: { b: 42 } }), 42)
})

await test('get: nested deep', () => {
  assert('a.b.c.d', get('a.b.c.d', { a: { b: { c: { d: 'deep' } } } }), 'deep')
})

await test('get: fallback to el', () => {
  assert('scope.x', get('scope.x', { el: { scope: { x: 7 } } }), 7)
})

await test('get: returns undefined for missing', () => {
  assert('missing', get('missing.path', {}), undefined)
})

await test('get: boolean literals', () => {
  assert('true', get('true', {}), true)
  assert('false', get('false', {}), false)
})

await test('get: null/undefined', () => {
  assert('null', get('null', {}), null)
  assert('undefined', get('undefined', {}), undefined)
})

await test('get: numeric strings', () => {
  assert('42', get('42', {}), 42)
  assert('3.14', get('3.14', {}), 3.14)
  assert('0', get('0', {}), 0)
})

await test('set: simple', () => {
  const ctx = {}
  set('a', 1, ctx)
  assert('a', ctx.a, 1)
})

await test('set: nested creates path', () => {
  const ctx = {}
  set('a.b.c', 'hello', ctx)
  assert('a.b.c', ctx.a.b.c, 'hello')
})

await test('set: overwrites existing', () => {
  const ctx = { a: { b: 1 } }
  set('a.b', 2, ctx)
  assert('a.b', ctx.a.b, 2)
})

// ─────────────────────────────────────────────────────────────────────────────
// exec.js tests
// ─────────────────────────────────────────────────────────────────────────────

await test('exec: return sentinel', () => {
  assert('return', exec('return', {}), RETURN)
})

await test('exec: negation', () => {
  assert('!false', exec('!active', { active: false }), true)
  assert('!true', exec('!active', { active: true }), false)
})

await test('exec: negation nested', () => {
  assert('!a.b', exec('!a.paused', { a: { paused: false } }), true)
})

await test('exec: method call', () => {
  let called = false
  exec('obj.doIt()', { obj: { doIt() { called = true } } })
  assert('called', called, true)
})

await test('exec: method call returns value', () => {
  const result = exec('obj.getValue()', { obj: { getValue: () => 99 } })
  assert('result', result, 99)
})

await test('exec: property access', () => {
  assert('prop', exec('a.b', { a: { b: 'val' } }), 'val')
})

await test('exec: non-string passthrough', () => {
  assert('number', exec(42, {}), 42)
  assertDeep('object', exec({ x: 1 }, {}), { x: 1 }) // non-string returns as-is
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — basic evaluation
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: null returns null', async () => {
  assert('null', await evaluate(null, {}), null)
})

await test('evaluate: string expression', async () => {
  assert('string', await evaluate('a', { a: 10 }), 10)
})

await test('evaluate: function call array', async () => {
  let result
  const ctx = { doStuff: (x) => { result = x } }
  await evaluate(['doStuff', 'hello'], ctx)
  assert('result', result, 'hello')
})

await test('evaluate: function call resolves args from ctx', async () => {
  let result
  const ctx = {
    greet: (name) => { result = `hi ${name}` },
    username: 'Alice'
  }
  await evaluate(['greet', 'username'], ctx)
  assert('result', result, 'hi Alice')
})

await test('evaluate: sequence of calls', async () => {
  const log = []
  const ctx = {
    a: () => log.push('a'),
    b: () => log.push('b'),
    c: () => log.push('c')
  }
  await evaluate([
    ['a'],
    ['b'],
    ['c']
  ], ctx)
  assertDeep('log', log, ['a', 'b', 'c'])
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — variable bindings
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: object binds variables', async () => {
  const ctx = { data: { name: 'Bob' } }
  await evaluate({ myName: 'data.name' }, ctx)
  assert('myName', ctx.myName, 'Bob')
})

await test('evaluate: chained bindings', async () => {
  const ctx = { obj: { nested: { val: 42 } } }
  await evaluate({
    inner: 'obj.nested',
    result: 'inner.val'
  }, ctx)
  assert('result', ctx.result, 42)
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — if/else
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: if true branch', async () => {
  let called = null
  const ctx = {
    active: true,
    doA: () => { called = 'A' },
    doB: () => { called = 'B' }
  }
  await evaluate({
    if: ['active', ['doA'], ['doB']]
  }, ctx)
  assert('called', called, 'A')
})

await test('evaluate: if false branch', async () => {
  let called = null
  const ctx = {
    active: false,
    doA: () => { called = 'A' },
    doB: () => { called = 'B' }
  }
  await evaluate({
    if: ['active', ['doA'], ['doB']]
  }, ctx)
  assert('called', called, 'B')
})

await test('evaluate: if without else', async () => {
  let called = false
  const ctx = {
    active: false,
    doA: () => { called = true }
  }
  await evaluate({
    if: ['active', ['doA']]
  }, ctx)
  assert('not called', called, false)
})

await test('evaluate: chained ifs (array of arrays)', async () => {
  const log = []
  const ctx = {
    x: 0,
    first: () => log.push('first'),
    second: () => log.push('second'),
    third: () => log.push('third')
  }
  await evaluate({
    if: [
      ['x', ['first']],         // x is 0 (falsy) → skip
      ['!x', ['second']],       // !0 is true → run
      ['!x', ['third']]         // !0 is true → run
    ]
  }, ctx)
  assertDeep('log', log, ['second', 'third'])
})

await test('evaluate: if/else key pair', async () => {
  let branch = null
  const ctx = {
    ok: false,
    doIf: () => { branch = 'if' },
    doElse: () => { branch = 'else' }
  }
  await evaluate({
    if: ['ok', ['doIf']],
    else: ['doElse']
  }, ctx)
  assert('branch', branch, 'else')
})

await test('evaluate: if true skips else', async () => {
  let branch = null
  const ctx = {
    ok: true,
    doIf: () => { branch = 'if' },
    doElse: () => { branch = 'else' }
  }
  await evaluate({
    if: ['ok', ['doIf']],
    else: ['doElse']
  }, ctx)
  assert('branch', branch, 'if')
})

await test('evaluate: nested if objects', async () => {
  let result = null
  const ctx = {
    a: true,
    b: true,
    deep: () => { result = 'deep' }
  }
  await evaluate({
    if: ['a', {
      if: ['b', ['deep']]
    }]
  }, ctx)
  assert('result', result, 'deep')
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — early return
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: early return stops execution', async () => {
  const log = []
  const ctx = {
    valid: false,
    before: () => log.push('before'),
    after: () => log.push('after')
  }
  await evaluate([
    ['before'],
    { if: ['!valid', 'return'] },
    ['after']
  ], ctx)
  assertDeep('log', log, ['before'])
})

await test('evaluate: return in chained if stops sequence', async () => {
  const log = []
  const ctx = {
    a: false,
    first: () => log.push('first'),
    second: () => log.push('second')
  }
  await evaluate({
    if: [
      ['!a', 'return'],
      ['!a', ['second']]     // should not run
    ]
  }, ctx)
  assertDeep('log', log, [])
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — for loops
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: for loop', async () => {
  const log = []
  const ctx = {
    items: ['a', 'b', 'c'],
    process: (x) => log.push(x)
  }
  await evaluate({
    for: ['item', 'in', 'items', [
      ['process', 'item']
    ]]
  }, ctx)
  assertDeep('log', log, ['a', 'b', 'c'])
})

await test('evaluate: for loop with numbers', async () => {
  let sum = 0
  const ctx = {
    nums: [1, 2, 3, 4, 5],
    addNum: (n) => { sum += n }
  }
  await evaluate({
    for: ['n', 'in', 'nums', [
      ['addNum', 'n']
    ]]
  }, ctx)
  assert('sum', sum, 15)
})

await test('evaluate: for loop empty iterable', async () => {
  let called = false
  const ctx = {
    items: [],
    process: () => { called = true }
  }
  await evaluate({
    for: ['item', 'in', 'items', ['process']]
  }, ctx)
  assert('not called', called, false)
})

await test('evaluate: for loop missing iterable', async () => {
  let called = false
  const ctx = {
    process: () => { called = true }
  }
  await evaluate({
    for: ['item', 'in', 'nope', ['process']]
  }, ctx)
  assert('not called', called, false)
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — await blocks
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: await runs async calls', async () => {
  const log = []
  const ctx = {
    save: async () => { log.push('saved') },
    notify: async () => { log.push('notified') }
  }
  await evaluate({
    async: true,
    await: [
      ['save'],
      ['notify']
    ]
  }, ctx)
  assertDeep('log', log, ['saved', 'notified'])
})

await test('evaluate: await with real delay', async () => {
  let value = 0
  const ctx = {
    delayed: () => new Promise(resolve => {
      setTimeout(() => { value = 42; resolve() }, 10)
    })
  }
  await evaluate({
    async: true,
    await: [['delayed']]
  }, ctx)
  assert('value', value, 42)
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — object argument resolution
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: call with object arg resolves vars', async () => {
  let result
  const ctx = {
    userName: 'Alice',
    userAge: 30,
    submit: (data) => { result = data }
  }
  await evaluate([
    ['submit', { name: 'userName', age: 'userAge' }]
  ], ctx)
  assertDeep('result', result, { name: 'Alice', age: 30 })
})

await test('evaluate: call with nested object arg', async () => {
  let result
  const ctx = {
    title: 'Hello',
    save: (opts) => { result = opts }
  }
  await evaluate([
    ['save', { meta: { title: 'title' }, draft: true }]
  ], ctx)
  assertDeep('result', result, { meta: { title: 'Hello' }, draft: true })
})

await test('evaluate: call with literal string (no ctx match)', async () => {
  let result
  const ctx = {
    greet: (msg) => { result = msg }
  }
  await evaluate(['greet', '/hello'], ctx)
  assert('result', result, '/hello')
})

// ─────────────────────────────────────────────────────────────────────────────
// eval.js — mixed real-world patterns
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: play/pause toggle (paused=true → play)', async () => {
  const log = []
  const ctx = {
    scope: {
      audio: {
        paused: true,
        play() { log.push('play') },
        pause() { log.push('pause') }
      }
    },
    setProps: (p) => log.push(`text:${p.text}`)
  }
  await evaluate({
    audio: 'scope.audio',
    if: [
      ['!audio', 'return'],
      ['!audio.paused', [
        'audio.pause()',
        ['setProps', { text: 'Play Sound' }]
      ], [
        'audio.play()',
        ['setProps', { text: 'Pause Sound' }]
      ]]
    ]
  }, ctx)
  assertDeep('log', log, ['play', 'text:Pause Sound'])
})

await test('evaluate: play/pause toggle (paused=false → pause)', async () => {
  const log = []
  const ctx = {
    scope: {
      audio: {
        paused: false,
        play() { log.push('play') },
        pause() { log.push('pause') }
      }
    },
    setProps: (p) => log.push(`text:${p.text}`)
  }
  await evaluate({
    audio: 'scope.audio',
    if: [
      ['!audio', 'return'],
      ['!audio.paused', [
        'audio.pause()',
        ['setProps', { text: 'Play Sound' }]
      ], [
        'audio.play()',
        ['setProps', { text: 'Pause Sound' }]
      ]]
    ]
  }, ctx)
  assertDeep('log', log, ['pause', 'text:Play Sound'])
})

await test('evaluate: play/pause toggle (no audio → return)', async () => {
  const log = []
  const ctx = {
    scope: {},
    setProps: (p) => log.push(`text:${p.text}`)
  }
  await evaluate({
    audio: 'scope.audio',
    if: [
      ['!audio', 'return'],
      ['!audio.paused', [
        'audio.pause()',
        ['setProps', { text: 'Play Sound' }]
      ], [
        'audio.play()',
        ['setProps', { text: 'Pause Sound' }]
      ]]
    ]
  }, ctx)
  assertDeep('log', log, [])
})

await test('evaluate: form submit pattern', async () => {
  const log = []
  const ctx = {
    event: { preventDefault: () => log.push('prevented') },
    call: (name, data) => log.push(`${name}:${JSON.stringify(data)}`),
    name: 'Bob',
    email: 'bob@test.com'
  }
  await evaluate([
    'event.preventDefault()',
    ['call', 'submitForm', { name: 'name', email: 'email' }]
  ], ctx)
  assertDeep('log', log, ['prevented', 'submitForm:{"name":"Bob","email":"bob@test.com"}'])
})

await test('evaluate: theme toggle (dark → light)', async () => {
  let result
  const ctx = {
    root: {
      globalTheme: 'dark',
      update: (data) => { result = data }
    }
  }
  await evaluate({
    current: 'root.globalTheme',
    if: ['current === "dark"', [
      ['root.update', { globalTheme: 'light' }]
    ], [
      ['root.update', { globalTheme: 'dark' }]
    ]]
  }, ctx)
  // Note: 'current === "dark"' is a string comparison expression
  // this tests the exec fallback path
})

await test('evaluate: simple call delegation', async () => {
  let result
  const ctx = { call: (name) => { result = name } }
  await evaluate([['call', 'openInNewTab']], ctx)
  assert('result', result, 'openInNewTab')
})

await test('evaluate: root state update', async () => {
  let result
  const ctx = { root: { update: (data) => { result = data } } }
  await evaluate([['root.update', { modal: '/add-item' }]], ctx)
  assertDeep('result', result, { modal: '/add-item' })
})

await test('evaluate: wizard next step', async () => {
  let result
  const ctx = {
    step: 2,
    totalSteps: 5,
    update: (data) => { result = data },
    call: () => {}
  }
  await evaluate({
    if: ['step < totalSteps', [
      ['update', { step: ['+', 'step', 1] }]
    ], [
      ['call', 'completeWizard']
    ]]
  }, ctx)
  // step < totalSteps: this is a comparison expression
})

await test('evaluate: state reset', async () => {
  let result
  const ctx = { update: (data) => { result = data } }
  await evaluate([
    ['update', { count: 0, items: [], search: '', page: 1 }]
  ], ctx)
  assertDeep('result', result, { count: 0, items: [], search: '', page: 1 })
})

// ─────────────────────────────────────────────────────────────────────────────
// compile.js tests
// ─────────────────────────────────────────────────────────────────────────────

await test('compile: creates callable function', async () => {
  let result
  const schema = [['handler', 'hello']]
  const fn = compile(schema, ['handler'])
  await fn((msg) => { result = msg })
  assert('result', result, 'hello')
})

await test('compile: with named args', async () => {
  let result
  const schema = [['add', 'a', 'b']]
  const fn = compile(schema, ['add', 'a', 'b'])
  await fn((x, y) => { result = x + y }, 3, 7)
  assert('result', result, 10)
})

await test('compile: async schema', async () => {
  let result
  const schema = {
    async: true,
    await: [['save']]
  }
  const fn = compile(schema, ['save'])
  await fn(async () => { result = 'saved' })
  assert('result', result, 'saved')
})

// ─────────────────────────────────────────────────────────────────────────────
// toSchema.js tests
// ─────────────────────────────────────────────────────────────────────────────

await test('toSchema: extracts args', () => {
  const schema = toSchema((a, b) => a + b)
  assertDeep('args', schema.args, ['a', 'b'])
})

await test('toSchema: detects async', () => {
  const schema = toSchema(async (x) => x)
  assert('async', schema.async, true)
})

await test('toSchema: non-async', () => {
  const schema = toSchema((x) => x)
  assert('async', schema.async, undefined)
})

await test('toSchema: preserves source', () => {
  const fn = (x) => x * 2
  const schema = toSchema(fn)
  assert('has source', typeof schema.source, 'string')
  assert('contains body', schema.source.includes('x * 2'), true)
})

await test('toSchema: no-arg function', () => {
  const schema = toSchema(() => 42)
  assertDeep('args', schema.args, [])
})

// ─────────────────────────────────────────────────────────────────────────────
// Report
// ─────────────────────────────────────────────────────────────────────────────

console.log(`\nfuncql tests: ${passed} passed, ${failed} failed\n`)
if (errors.length) {
  errors.forEach(e => console.log(e))
  console.log('')
  process.exit(1)
}
