# @symbo.ls/fetch

Declarative data fetching plugin for DOMQL. Pluggable database adapters (Supabase, REST, local) with a unified interface.

## Setup

Configure `db` in your `config.js` (which ends up in context). The adapter is resolved lazily — only the adapter you use gets loaded.

```js
// Supabase
{
  db: {
    adapter: 'supabase',
    projectId: 'your-project-id',
    key: 'your-anon-key'
  }
}

// REST API
{
  db: {
    adapter: 'rest',
    url: 'https://api.example.com',
    headers: { Authorization: 'Bearer token' }
  }
}

// Local (prototyping / offline)
{
  db: {
    adapter: 'local',
    data: { articles: [{ id: 1, title: 'Hello' }] },
    persist: true  // saves to localStorage
  }
}
```

## Usage with `fetch` property

### Basic usage

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
```

### State key mapping with `as`

Use `as` to place fetched data at a specific key in state (instead of replacing the entire state):

```js
{
  state: { articles: [], loading: false },
  fetch: {
    from: 'articles',
    as: 'articles'   // sets state.articles, preserves state.loading
  }
}
```

### RPC calls

```js
// Simple RPC
{ state: 'stats', fetch: { method: 'rpc', from: 'get_dashboard_stats' } }

// RPC with params and state key
{
  state: { articles: [] },
  fetch: {
    method: 'rpc',
    from: 'get_content_rows',
    params: { p_table: 'articles', p_order_column: 'published_at', p_order_asc: false, p_limit: 50 },
    as: 'articles',
    cache: '5m'
  }
}
```

### Transform

Use `transform` to reshape data before it hits state:

```js
{
  state: { featured: null, items: [] },
  fetch: {
    from: 'videos',
    transform: (data) => {
      const featured = data.find(v => v.is_featured) || data[0]
      const items = data.filter(v => !v.is_featured)
      return { featured, items }
    }
  }
}
```

### Detail pages with dynamic params

Use a function for `params` to resolve values at fetch time:

```js
{
  state: { item: null },
  fetch: {
    method: 'rpc',
    from: 'get_content_rows',
    params: (el) => ({
      p_table: 'articles',
      p_id: window.location.pathname.split('/').pop()
    }),
    transform: (data) => ({ item: data && data[0] || null })
  }
}
```

### Array fetch (multiple operations)

Use an array to run multiple fetches on the same element:

```js
{
  state: { articles: [], events: [], campaigns: [] },
  fetch: [
    {
      method: 'rpc',
      from: 'get_content_rows',
      params: { p_table: 'articles' },
      as: 'articles',
      cache: '5m'
    },
    {
      method: 'rpc',
      from: 'get_content_rows',
      params: { p_table: 'events' },
      as: 'events',
      cache: '5m'
    },
    {
      method: 'rpc',
      from: 'get_content_rows',
      params: { p_table: 'campaigns' },
      as: 'campaigns',
      cache: '5m'
    }
  ]
}
```

### Triggers with `on`

Control when fetch fires:

```js
// on: 'create' — fires on element creation (default)
{ fetch: { from: 'articles' } }

// on: 'submit' — fires on form submit, collects form data
{
  tag: 'form',
  fetch: {
    method: 'insert',
    from: 'contacts',
    on: 'submit'
  },
  children: [
    { tag: 'input', attr: { name: 'email', type: 'email' } },
    { tag: 'input', attr: { name: 'message' } },
    { tag: 'button', text: 'Send', attr: { type: 'submit' } }
  ]
}

// on: 'click' — fires on click
{
  extends: 'Button',
  text: 'Delete',
  fetch: {
    method: 'delete',
    from: 'items',
    params: (el) => ({ id: el.state.itemId }),
    on: 'click'
  }
}

// on: 'stateChange' — re-fetches when state updates
{
  state: 'search_results',
  fetch: {
    from: 'articles',
    params: (el, s) => ({ title: { ilike: '%' + s.query + '%' } }),
    on: 'stateChange'
  }
}
```

### Mutations (insert, update, delete)

```js
// Insert from form
{
  tag: 'form',
  fetch: {
    method: 'insert',
    from: 'articles',
    on: 'submit',
    fields: true,  // collect all form fields
    transform: (data) => ({ ...data, status: 'draft' })
  }
}

// Insert specific fields only
{
  tag: 'form',
  fetch: {
    method: 'insert',
    from: 'contacts',
    on: 'submit',
    fields: ['name', 'email', 'message']
  }
}

// Upsert from state
{
  fetch: {
    method: 'upsert',
    from: 'settings',
    on: 'click'
  }
}
```

### Auth requirement

```js
// Require authentication before fetching
{ fetch: { from: 'profile', auth: true } }

// Skip auth check (default is auth: false for reads)
{ fetch: { from: 'public_data', auth: false } }
```

### Realtime subscribe

```js
{
  state: 'messages',
  fetch: {
    method: 'subscribe',
    from: 'messages',
    subscribeOn: 'INSERT'  // INSERT | UPDATE | DELETE | *
  }
}
```

### Callbacks via props

```js
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
import { setup } from '@symbo.ls/fetch/supabase'
import { setup as setupRest } from '@symbo.ls/fetch/rest'
import { setup as setupLocal } from '@symbo.ls/fetch/local'
import { createAdapter } from '@symbo.ls/fetch'
```

## Element method: `getDB()`

Any element can access the resolved adapter:

```js
const db = await this.getDB()
const { data, error } = await db.select({ from: 'articles' })
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
import { createAdapter } from '@symbo.ls/fetch'

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

Cache works for both `select` and `rpc` methods. Stale-while-revalidate: if data is stale but not expired, the cached version is served immediately while a background refetch happens.
