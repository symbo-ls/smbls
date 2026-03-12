# @symbo.ls/db

Pluggable database adapter layer for DOMQL. Supports Supabase, REST APIs, and local storage with a unified interface.

## Setup

Configure `db` on your root context. The adapter is resolved lazily — only the adapter you use gets loaded.

```js
// Supabase
{
  context: {
    db: {
      adapter: 'supabase',
      projectId: 'your-project-id',
      key: 'your-anon-key'
    }
  }
}

// REST API
{
  context: {
    db: {
      adapter: 'rest',
      url: 'https://api.example.com',
      headers: { Authorization: 'Bearer token' }
    }
  }
}

// Local (prototyping / offline)
{
  context: {
    db: {
      adapter: 'local',
      data: { articles: [{ id: 1, title: 'Hello' }] },
      persist: true  // saves to localStorage
    }
  }
}
```

## Usage with `fetch` property

```js
// Minimal — state key = table name
{ state: 'articles', fetch: true, children: '.' }

// String shorthand for different table name
{ state: 'data', fetch: 'blog_posts', children: '.' }

// With options
{
  state: 'articles',
  fetch: {
    params: { status: 'published' },
    cache: '5m',
    order: { by: 'created_at', asc: false },
    limit: 20
  },
  children: '.'
}

// RPC call
{ state: 'stats', fetch: { method: 'rpc', from: 'get_dashboard_stats' } }

// With auth requirement
{ state: 'profile', fetch: { auth: true } }

// Callbacks via props
{
  state: 'articles',
  fetch: true,
  props: {
    onFetchComplete: (data, el) => console.log('Loaded', data),
    onFetchError: (error, el) => console.error(error),
    onFetchStart: (el) => console.log('Loading...')
  }
}
```

## Direct adapter usage

```js
import { supabaseAdapter } from '@symbo.ls/db/supabase'
import { restAdapter } from '@symbo.ls/db/rest'
import { localAdapter } from '@symbo.ls/db/local'
import { createAdapter } from '@symbo.ls/db'
```

## Adapter interface

All adapters return `{ data, error }` from CRUD operations.

### CRUD

```js
db.select({ from, select, params, limit, offset, order, single })
db.insert({ from, data, select })
db.update({ from, data, params, select })
db.upsert({ from, data, select })         // supabase
db.delete({ from, params })
db.rpc({ from, params })
```

### Params (filters)

```js
// Equals
params: { status: 'published' }

// Operators
params: { age: { gt: 18 } }
params: { price: { gte: 10, lte: 100 } }
params: { name: { neq: 'test' } }
params: { title: { ilike: '%search%' } }

// Array (IN)
params: { id: [1, 2, 3] }

// Null check
params: { deleted_at: null }
```

### Auth

```js
// Supabase
await db.getSession()
await db.getUser()
await db.signIn({ email, password })
await db.signIn({ provider: 'google' })
await db.signUp({ email, password })
await db.signOut()
db.onAuthStateChange((event, session) => {})

// REST
db.setToken('jwt-token')
await db.signIn({ email, password })  // requires auth.signInUrl config
await db.signOut()
await db.getSession()
```

### Realtime (Supabase / Local)

```js
const unsubscribe = db.subscribe(
  { from: 'messages', on: 'INSERT' },
  (newRow, oldRow, payload) => {}
)
// on: 'INSERT' | 'UPDATE' | 'DELETE' | '*'
unsubscribe()
```

### Storage (Supabase)

```js
await db.upload({ bucket: 'avatars', path: 'user/photo.png', file })
await db.download({ bucket: 'avatars', path: 'user/photo.png' })
db.getPublicUrl({ bucket: 'avatars', path: 'user/photo.png' })
```

## Custom adapter

```js
import { createAdapter } from '@symbo.ls/db'

const myAdapter = createAdapter({
  name: 'custom',
  select: async ({ from, params }) => { /* return { data, error } */ },
  insert: async ({ from, data }) => { /* return { data, error } */ },
  update: async ({ from, data, params }) => { /* return { data, error } */ },
  delete: async ({ from, params }) => { /* return { data, error } */ }
})

{ context: { db: myAdapter } }
```

## Cache

```js
fetch: { cache: true }       // 1 minute stale
fetch: { cache: '5m' }       // 5 minute stale
fetch: { cache: 30000 }      // 30 seconds stale
fetch: {
  cache: {
    stale: '1m',              // serve stale data, refetch in background
    expire: '1h',             // hard expiry
    key: 'custom-cache-key'
  }
}
```
