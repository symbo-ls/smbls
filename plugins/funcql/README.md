# @domql/funcql

Declarative function representation as JSON. Serialize, interpret, and compile functions as data structures.

## Install

```sh
npm install @domql/funcql
```

## API

```js
import { evaluate, compile, toSchema, get, set, exec, RETURN } from '@domql/funcql'
```

### evaluate(schema, ctx)

Evaluates a funcql schema node within a context object.

```js
// string → expression
await evaluate('audio.play()', { audio })

// array → function call
await evaluate(['setProps', { text: 'Play' }], { setProps })

// array of arrays → sequence
await evaluate([
  'audio.pause()',
  ['setProps', { text: 'Play' }]
], ctx)

// object → bindings + control flow
await evaluate({
  audio: 'scope.audio',
  if: ['audio.paused',
    ['setProps', { text: 'Pause' }],
    ['setProps', { text: 'Play' }]
  ]
}, ctx)
```

### compile(schema, argNames?)

Compiles a schema into a callable function.

```js
const fn = compile([['handler', 'message']], ['handler', 'message'])
await fn(console.log, 'hello') // logs 'hello'
```

### toSchema(fn)

Extracts args, async flag, and source from a JavaScript function.

```js
toSchema(async (a, b) => a + b)
// { async: true, args: ['a', 'b'], source: '...' }
```

### get(path, ctx) / set(path, value, ctx)

Dot-path resolution across `ctx` → `ctx.el` → `globalThis`. Handles literals (`true`, `false`, `null`, numbers).

```js
get('a.b.c', { a: { b: { c: 42 } } }) // 42
set('a.b', 'hello', ctx)               // ctx.a.b = 'hello'
```

### exec(expr, ctx)

Execute a string expression: `'return'` sentinel, `'!audio'` negation, `'audio.pause()'` method call, or property access.

## Schema syntax

### Variable bindings

```js
{ audio: 'scope.audio', name: 'state.userName' }
```

### Conditionals

```js
// if / else
{ if: ['active', ['doA'], ['doB']] }

// chained
{ if: [
  ['!audio', 'return'],
  ['audio.paused', 'audio.play()', 'audio.pause()']
] }

// if / else keys
{ if: ['ok', ['save']], else: ['cancel'] }
```

### Loops

```js
{ for: ['item', 'in', 'items', ['process', 'item']] }
```

### Await

```js
{ async: true, await: [['fetchData'], ['render']] }
```

### Function calls

```js
['setProps', { text: 'Play' }]
['sdk.updateData', 'payload']
```

## domql plugin

funcql integrates with domql's plugin system, allowing event handlers to be declared as JSON schemas instead of functions.

```js
import { funcqlPlugin } from '@domql/funcql'

// Register in context
context.plugins = [funcqlPlugin]
```

Once registered, any `on` handler can be a funcql schema:

```js
{
  on: {
    click: {
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
  }
}
```

The plugin builds the evaluation context from the domql element (`el`, `state`, `context`, `scope`, `props`, `parent`, `event`).

### Plugin interface

```js
funcqlPlugin.resolveHandler(handler, element) // → function | handler
```

## License

ISC
