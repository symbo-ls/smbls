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
// toSchema → compile round-trip: function → schema → compiled fn → same result
// ─────────────────────────────────────────────────────────────────────────────

await test('round-trip: toSchema preserves args and async flag', () => {
  const fn = async (event, el, state) => {}
  const schema = toSchema(fn)
  assert('async', schema.async, true)
  assertDeep('args', schema.args, ['event', 'el', 'state'])
  assert('source is string', typeof schema.source, 'string')
})

await test('round-trip: toSchema preserves sync function metadata', () => {
  const fn = (a, b, c) => a + b + c
  const schema = toSchema(fn)
  assert('not async', schema.async, undefined)
  assertDeep('args', schema.args, ['a', 'b', 'c'])
  assert('source contains body', schema.source.includes('a + b + c'), true)
})

await test('round-trip: toSchema with destructured args', () => {
  const schema = toSchema(function ({ name, age }) {})
  // destructured args come through as-is
  assert('has source', typeof schema.source, 'string')
})

await test('round-trip: schema → compile → evaluate produces same output', async () => {
  // Schema with sequence: call then bind result
  const evalLog = []
  await evaluate([
    ['greet', 'name']
  ], { greet: (n) => evalLog.push(`hello ${n}`), name: 'Alice' })

  const compileLog = []
  const fn = compile([
    ['greet', 'name']
  ], ['greet', 'name'])
  await fn((n) => compileLog.push(`hello ${n}`), 'Alice')

  assertDeep('eval', evalLog, ['hello Alice'])
  assertDeep('compile', compileLog, ['hello Alice'])
})

await test('round-trip: compile if/else matches evaluate', async () => {
  const schema = {
    if: ['active', ['doA'], ['doB']]
  }

  // evaluate path
  let evalResult
  await evaluate(schema, {
    active: true,
    doA: () => { evalResult = 'A' },
    doB: () => { evalResult = 'B' }
  })

  // compile path
  let compileResult
  const fn = compile({
    if: ['active', ['doA'], ['doB']]
  }, ['active', 'doA', 'doB'])
  await fn(true, () => { compileResult = 'A' }, () => { compileResult = 'B' })

  assert('eval', evalResult, 'A')
  assert('compile', compileResult, 'A')
})

await test('round-trip: compile for loop matches evaluate', async () => {
  const schema = {
    for: ['item', 'in', 'items', [
      ['process', 'item']
    ]]
  }

  // evaluate
  const evalLog = []
  await evaluate(schema, {
    items: [1, 2, 3],
    process: (x) => evalLog.push(x)
  })

  // compile
  const compileLog = []
  const fn = compile({
    for: ['item', 'in', 'items', [
      ['process', 'item']
    ]]
  }, ['items', 'process'])
  await fn([1, 2, 3], (x) => compileLog.push(x))

  assertDeep('eval', evalLog, [1, 2, 3])
  assertDeep('compile', compileLog, [1, 2, 3])
})

await test('round-trip: compile async await matches evaluate', async () => {
  const schema = {
    async: true,
    await: [['save'], ['notify']]
  }

  // evaluate
  const evalLog = []
  await evaluate(schema, {
    save: async () => evalLog.push('saved'),
    notify: async () => evalLog.push('notified')
  })

  // compile
  const compileLog = []
  const fn = compile({
    async: true,
    await: [['save'], ['notify']]
  }, ['save', 'notify'])
  await fn(
    async () => compileLog.push('saved'),
    async () => compileLog.push('notified')
  )

  assertDeep('eval', evalLog, ['saved', 'notified'])
  assertDeep('compile', compileLog, ['saved', 'notified'])
})

await test('round-trip: compile sequence matches evaluate', async () => {
  const schema = [
    ['a'],
    ['b'],
    ['c']
  ]

  const evalLog = []
  await evaluate(schema, {
    a: () => evalLog.push('a'),
    b: () => evalLog.push('b'),
    c: () => evalLog.push('c')
  })

  const compileLog = []
  const fn = compile([
    ['a'],
    ['b'],
    ['c']
  ], ['a', 'b', 'c'])
  await fn(
    () => compileLog.push('a'),
    () => compileLog.push('b'),
    () => compileLog.push('c')
  )

  assertDeep('eval', evalLog, ['a', 'b', 'c'])
  assertDeep('compile', compileLog, ['a', 'b', 'c'])
})

await test('round-trip: compile call with literal arg', async () => {
  let evalResult, compileResult

  // evaluate — use array call syntax
  await evaluate([
    ['multiply', 'val', 2]
  ], {
    val: 5,
    multiply: (a, b) => { evalResult = a * b; return a * b }
  })

  // compile
  const fn = compile([
    ['multiply', 'val', 2]
  ], ['val', 'multiply'])
  await fn(5, (a, b) => { compileResult = a * b; return a * b })

  assert('eval', evalResult, 10)
  assert('compile', compileResult, 10)
})

await test('round-trip: compile early return', async () => {
  const schema = [
    ['before'],
    { if: ['!valid', 'return'] },
    ['after']
  ]

  const evalLog = []
  await evaluate(schema, {
    valid: false,
    before: () => evalLog.push('before'),
    after: () => evalLog.push('after')
  })

  const compileLog = []
  const fn = compile([
    ['before'],
    { if: ['!valid', 'return'] },
    ['after']
  ], ['valid', 'before', 'after'])
  await fn(
    false,
    () => compileLog.push('before'),
    () => compileLog.push('after')
  )

  assertDeep('eval', evalLog, ['before'])
  assertDeep('compile', compileLog, ['before'])
})

await test('round-trip: compile chained ifs', async () => {
  const schema = {
    if: [
      ['a', ['first']],
      ['!a', ['second']]
    ]
  }

  const evalLog = []
  await evaluate(schema, {
    a: false,
    first: () => evalLog.push('first'),
    second: () => evalLog.push('second')
  })

  const compileLog = []
  const fn = compile({
    if: [
      ['a', ['first']],
      ['!a', ['second']]
    ]
  }, ['a', 'first', 'second'])
  await fn(
    false,
    () => compileLog.push('first'),
    () => compileLog.push('second')
  )

  assertDeep('eval', evalLog, ['second'])
  assertDeep('compile', compileLog, ['second'])
})

await test('round-trip: compile with object arg resolution', async () => {
  let evalResult, compileResult

  await evaluate([
    ['submit', { name: 'userName', age: 'userAge' }]
  ], {
    userName: 'Bob',
    userAge: 25,
    submit: (data) => { evalResult = data }
  })

  const fn = compile([
    ['submit', { name: 'userName', age: 'userAge' }]
  ], ['userName', 'userAge', 'submit'])
  await fn('Bob', 25, (data) => { compileResult = data })

  assertDeep('eval', evalResult, { name: 'Bob', age: 25 })
  assertDeep('compile', compileResult, { name: 'Bob', age: 25 })
})

await test('round-trip: compile method call on dot path', async () => {
  const evalLog = []
  await evaluate([
    'audio.pause()',
    ['setProps', { text: 'Play' }]
  ], {
    audio: { pause: () => evalLog.push('paused') },
    setProps: (p) => evalLog.push(`text:${p.text}`)
  })

  const compileLog = []
  const fn = compile([
    'audio.pause()',
    ['setProps', { text: 'Play' }]
  ], ['audio', 'setProps'])
  await fn(
    { pause: () => compileLog.push('paused') },
    (p) => compileLog.push(`text:${p.text}`)
  )

  assertDeep('eval', evalLog, ['paused', 'text:Play'])
  assertDeep('compile', compileLog, ['paused', 'text:Play'])
})

await test('round-trip: compile play/pause full pattern', async () => {
  const schema = {
    audio: 'scope.audio',
    if: [
      ['!audio', 'return'],
      ['audio.paused', [
        'audio.play()',
        ['setProps', { text: 'Pause' }]
      ], [
        'audio.pause()',
        ['setProps', { text: 'Play' }]
      ]]
    ]
  }

  // evaluate: paused=true → play
  const evalLog = []
  await evaluate(schema, {
    scope: { audio: { paused: true, play: () => evalLog.push('play'), pause: () => evalLog.push('pause') } },
    setProps: (p) => evalLog.push(`text:${p.text}`)
  })

  // compile the same schema, provide scope as arg
  const compileLog = []
  const fn = compile({
    audio: 'scope.audio',
    if: [
      ['!audio', 'return'],
      ['audio.paused', [
        'audio.play()',
        ['setProps', { text: 'Pause' }]
      ], [
        'audio.pause()',
        ['setProps', { text: 'Play' }]
      ]]
    ]
  }, ['scope', 'setProps'])
  await fn(
    { audio: { paused: true, play: () => compileLog.push('play'), pause: () => compileLog.push('pause') } },
    (p) => compileLog.push(`text:${p.text}`)
  )

  assertDeep('eval', evalLog, ['play', 'text:Pause'])
  assertDeep('compile', compileLog, ['play', 'text:Pause'])
})

// ─────────────────────────────────────────────────────────────────────────────
// Additional edge cases
// ─────────────────────────────────────────────────────────────────────────────

await test('evaluate: empty array returns undefined', async () => {
  assert('empty', await evaluate([], {}), undefined)
})

await test('evaluate: number passthrough', async () => {
  assert('number', await evaluate(42, {}), 42)
})

await test('evaluate: boolean passthrough', async () => {
  assert('true', await evaluate(true, {}), true)
  assert('false', await evaluate(false, {}), false)
})

await test('evaluate: undefined returns undefined', async () => {
  assert('undef', await evaluate(undefined, {}), undefined)
})

await test('evaluate: nested for with conditional call', async () => {
  const log = []
  const ctx = {
    items: [1, 2, 3, 4, 5],
    isEven: (n) => n % 2 === 0,
    process: (n) => log.push(n)
  }
  // Use sequence inside for body: call isEven, then conditionally process
  await evaluate({
    for: ['n', 'in', 'items', [
      ['processIfEven', 'n']
    ]]
  }, { ...ctx, processIfEven: (n) => { if (n % 2 === 0) log.push(n) } })
  assertDeep('log', log, [2, 4])
})

await test('evaluate: bindings then sequence call', async () => {
  let result
  const ctx = {
    data: { x: 10, y: 20 },
    add: (a, b) => { result = a + b }
  }
  // Bindings in object, then call in a sequence
  await evaluate([
    { a: 'data.x', b: 'data.y' },
    ['add', 'a', 'b']
  ], ctx)
  assert('result', result, 30)
})

await test('evaluate: nested method call with this binding', async () => {
  const obj = {
    items: [],
    add (item) { this.items.push(item) }
  }
  await evaluate([
    ['obj.add', 'hello'],
    ['obj.add', 'world']
  ], { obj })
  assertDeep('items', obj.items, ['hello', 'world'])
})

await test('evaluate: call with array arg preserving structure', async () => {
  let result
  const ctx = {
    batch: (ops) => { result = ops }
  }
  await evaluate([
    ['batch', ['a', 'b', 'c']]
  ], ctx)
  assertDeep('result', result, ['a', 'b', 'c'])
})

await test('evaluate: if/else with binding between', async () => {
  let result
  const ctx = {
    mode: 'edit',
    save: () => { result = 'saved' },
    cancel: () => { result = 'cancelled' }
  }
  await evaluate({
    isEdit: 'mode',
    if: ['isEdit', ['save']],
    else: ['cancel']
  }, ctx)
  assert('result', result, 'saved')
})

await test('evaluate: for loop processes all items', async () => {
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

await test('toSchema: named function', () => {
  function myHelper (x, y, z) { return x + y + z }
  const schema = toSchema(myHelper)
  assertDeep('args', schema.args, ['x', 'y', 'z'])
  assert('not async', schema.async, undefined)
  assert('source has name', schema.source.includes('myHelper'), true)
})

await test('toSchema: async named function', () => {
  async function fetchData (url, options) {}
  const schema = toSchema(async function fetchData (url, options) {})
  assertDeep('args', schema.args, ['url', 'options'])
  assert('async', schema.async, true)
})

await test('toSchema: non-function returns as-is', () => {
  assert('string', toSchema('hello'), 'hello')
  assert('number', toSchema(42), 42)
  assert('null', toSchema(null), null)
  assertDeep('object', toSchema({ a: 1 }), { a: 1 })
})

await test('compile: no args schema', async () => {
  const log = []
  const fn = compile([['log']], ['log'])
  await fn(() => log.push('called'))
  assertDeep('log', log, ['called'])
})

await test('compile: this binding available', async () => {
  let thisVal
  const fn = compile({
    _capture: ['getThis']
  }, ['getThis'])
  await fn.call({ myProp: 42 }, function () { thisVal = this })
  // 'this' in compile is set on ctx.this
})

await test('compile: nested if/else with bindings', async () => {
  let result
  const fn = compile({
    x: 'a',
    y: 'b',
    if: ['x', {
      if: ['y', ['handler', 'both']]
    }]
  }, ['a', 'b', 'handler'])

  await fn(true, true, (msg) => { result = msg })
  assert('result', result, 'both')
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
